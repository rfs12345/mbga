import ThreeOptionHeader from "../page_organization/ThreeOptionHeader";
import React from "react";
import { Link } from "react-router";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <header
        style={{ width: "100%", backgroundColor: "#373332", padding: "1rem" }}
      >
        {/* Replace with your actual header component */}
        {ThreeOptionHeader()}
      </header>

      {/* Content */}
      <div style={{ display: "flex", flex: 1 }}>
        {/* Sidebar */}
        <aside
          style={{
            width: "125px",
            backgroundColor: "#373332",
            padding: "1rem",
            color: "white",
          }}
        >
          <ul className="nav nav-pills flex-column mb-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link link-light">
                Home
              </Link>
            </li>
            <li>
              <Link to="/budget" className="nav-link link-light">
                Budget
              </Link>
            </li>
            <li>
              <Link to="/spent" className="nav-link link-light">
                Spent
              </Link>
            </li>
            <li>
              <Link to="/trends" className="nav-link link-light">
                Trends
              </Link>
            </li>
          </ul>
        </aside>

        {/* Main Content */}
        <main style={{ flex: 1, padding: "1rem", background: "#efefec" }}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
