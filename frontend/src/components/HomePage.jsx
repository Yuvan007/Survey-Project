import React from "react";
import { Link } from "react-router-dom";
import "../style/HomePage.css";

function HomePage() {
  return (
    <div className="home-container">
      <header className="header">
        <i className="fa-duotone fa-solid fa-square-poll-horizontal icon"></i>
        <nav className="nav-bar">
          <ul>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/admin-login">Admin</Link>
            </li>
          </ul>
        </nav>
      </header>

      <main className="main-content">
        <h1>Welcome to the Survey Application</h1>
        <p>Join us to share your thoughts and help us enhance our services.</p>
        <section className="info-section">
          <h2>Why Your Feedback Matters</h2>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
            non reprehenderit voluptatem accusamus nulla distinctio repudiandae
            aliquid voluptates, corporis officiis architecto veniam rem quisquam
            recusandae perspiciatis commodi sint adipisci ex.
          </p>

          <h2>How It Works</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
            corrupti ea nisi officia error labore, dolores nam perferendis
            voluptatem saepe! Iste ipsam laborum sapiente suscipit praesentium
            autem, incidunt quibusdam Lorem, ipsum dolor sit amet consectetur
            adipisicing elit. Quis, est?.
          </p>
        </section>
      </main>

      <footer className="footer">
        <p>&copy; 2024 Survey Application. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default HomePage;
