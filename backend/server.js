const express = require("express");
const sql = require("mssql");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const config = {
  user: "user_new",
  password: "1234",
  server: "localhost",
  database: "SurveyDB",
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

async function connectToDB() {
  return sql.connect(config);
}

app.get("/users", async (req, res) => {
  let pool = await connectToDB();
  let result = await pool.request().query("SELECT * FROM users");
  res.json(
    result.recordset.length > 0
      ? { status: "Success", data: result.recordset }
      : { status: "error", message: "No users found" }
  );
});

app.post("/register", async (req, res) => {
  const { name, email, password, level } = req.body;
  let pool = await connectToDB();
  await pool
    .request()
    .query(
      `INSERT INTO users (name, email, password, level) VALUES ('${name}', '${email}', '${password}', '${level}')`
    );
  res.json({ status: "Success", message: "User registered successfully" });
});

app.post("/login", async (req, res) => {
  const { email, password, level } = req.body;
  let pool = await connectToDB();
  let result = await pool
    .request()
    .query(`SELECT * FROM users WHERE email = '${email}'`);
  const user = result.recordset[0];

  if (user && user.password === password && user.level === level) {
    res.json({
      status: "Success",
      message: "Login successful",
      redirectTo: `${level}-survey`,
    });
  } else {
    res.json({ status: "error", message: "Invalid credentials or level" });
  }
});

app.post("/admin/login", (req, res) => {
  const { email, password } = req.body;
  if (email === "admin@mail.com" && password === "1234") {
    res.json({ status: "Success", message: "Admin login successful" });
  } else {
    res.json({ status: "error", message: "Invalid admin credentials" });
  }
});

app.post("/admin/create-survey", async (req, res) => {
  const { level, questions } = req.body;
  let pool = await connectToDB();
  for (let question of questions) {
    await pool
      .request()
      .query(
        `INSERT INTO surveys (level, question) VALUES ('${level}', '${question}')`
      );
  }
  res.json({ status: "Success", message: "Survey created successfully" });
});

app.get("/admin/view-responses", async (req, res) => {
  let pool = await connectToDB();
  let result = await pool
    .request()
    .query(
      "SELECT level, question, answer FROM surveys WHERE answer IS NOT NULL"
    );
  res.json(
    result.recordset.length > 0
      ? { status: "Success", data: result.recordset }
      : { status: "error", message: "No responses found" }
  );
});

app.get("/survey/fresher-questions", async (req, res) => {
  let pool = await connectToDB();
  let result = await pool
    .request()
    .query("SELECT question FROM surveys WHERE level = 'Fresher'");
  res.json(
    result.recordset.length > 0
      ? { status: "Success", data: result.recordset.map((q) => q.question) }
      : { status: "error", message: "No questions found for freshers" }
  );
});

app.get("/survey/experienced-questions", async (req, res) => {
  let pool = await connectToDB();
  let result = await pool
    .request()
    .query("SELECT question FROM surveys WHERE level = 'Experienced'");
  res.json(
    result.recordset.length > 0
      ? { status: "Success", data: result.recordset.map((q) => q.question) }
      : {
          status: "error",
          message: "No questions found for experienced professionals",
        }
  );
});

app.post("/survey/submit-answers", async (req, res) => {
  const { level, answers } = req.body;
  let pool = await connectToDB();
  for (let i = 0; i < answers.length; i++) {
    await pool
      .request()
      .query(
        `UPDATE surveys SET answer = '${answers[i]}' WHERE level = '${level}' AND question = (SELECT question FROM surveys WHERE level = '${level}' ORDER BY id OFFSET ${i} ROWS FETCH NEXT 1 ROWS ONLY)`
      );
  }
  res.json({
    status: "Success",
    message: "Survey answers submitted successfully",
  });
});

sql.connect(config).then(() => {
  console.log("Connected to SQL Server");
  app.listen(3000, () => {
    console.log("Server is running on port 3000...");
  });
});
