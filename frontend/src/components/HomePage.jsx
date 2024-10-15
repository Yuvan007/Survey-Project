import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate to handle button navigation
import "../style/HomePage.css";

function HomePage() {
  const navigate = useNavigate(); // Initialize navigate

  return (
    <div className="container">
      <header className="header">
        <i className="fa-duotone fa-solid fa-square-poll-horizontal icon"></i>
        <nav className="navigation">
          
          <div className="button-group">
            <button onClick={() => navigate("/login")} className="nav-button">
              Login
            </button>
            <button
              onClick={() => navigate("/register")}
              className="nav-button"
            >
              Register
            </button>
            <button
              onClick={() => navigate("/admin-login")}
              className="nav-button"
            >
              Admin
            </button>
          </div>
        </nav>
      </header>

      <main className="content">
        <h1 className="title">Welcome to the Survey Application</h1>
        <p className="subtitle">
          Join us to share your thoughts and help us enhance our services.
        </p>
        <section className="info-section">
          <h2 className="info-title">Why Your Feedback Matters</h2>
          <p className="info-text">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
            non reprehenderit voluptatem accusamus nulla distinctio repudiandae
            aliquid voluptates, corporis officiis architecto veniam rem quisquam
            recusandae perspiciatis commodi sint adipisci ex.
          </p>

          <h2 className="info-title">How It Works</h2>
          <p className="info-text">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
            corrupti ea nisi officia error labore, dolores nam perferendis
            voluptatem saepe! Iste ipsam laborum sapiente suscipit praesentium
            autem, incidunt quibusdam Lorem, ipsum dolor sit amet consectetur
            adipisicing elit. Quis, est?..
          </p>
        </section>
      </main>

      <footer className="footer">
        <p className="footer-text">
          &copy; 2024 Survey Application. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default HomePage;
