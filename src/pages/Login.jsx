// src/pages/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // simple front-end only “secret code”
  const EMPLOYEE_PASSWORD = "jet2025";

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!email.trim() || !code.trim()) {
      setError("Please enter your email and password.");
      return;
    }

    if (code !== EMPLOYEE_PASSWORD) {
      setError("Invalid password code. Please try again.");
      return;
    }

    // mark user as logged in (front-end only)
    localStorage.setItem("isEmployee", "true");

    alert("Login successful. Redirecting to employee dashboard…");
    navigate("/admin");
  }

  return (
    <main
      className="login"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        background:
          "radial-gradient(circle at top, #192638 0, #050a10 55%)",
        padding: "48px 0",
      }}
    >
      <div className="container" style={{ maxWidth: 480 }}>
        <div className="card" style={{ padding: "24px 24px 28px" }}>
          <h1 style={{ margin: 0, fontSize: "1.8rem" }}>Employee Login</h1>
          <p style={{ margin: "8px 0 20px", color: "#9fb2c0" }}>
            This area is for charter staff and employees to access the internal dashboard.
          </p>

          <form onSubmit={handleSubmit} className="login__form" style={{ display: "grid", gap: 12 }}>
            <div className="form__group">
              <label>Email</label>
              <input
                type="email"
                className="input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@gmail.com"
              />
            </div>

            <div className="form__group">
              <label>Password</label>
              <input
                type="password"
                className="input"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Enter employee password"
              />
            </div>

            {error && (
              <p style={{ color: "#ff9c9c", fontSize: ".9rem", margin: "2px 0 0" }}>
                {error}
              </p>
            )}

            <div style={{ marginTop: 14, display: "flex", justifyContent: "center" }}>
              <button type="submit" className="btn btn--gold">
                Log In
              </button>
            </div>

            {/* <p style={{ marginTop: 10, fontSize: ".8rem", color: "#7f91a4" }}>
              Demo only: this login is front-end based. Next semester we’ll connect it to real
              user accounts in our database.
            </p> */}
          </form>
        </div>
      </div>
    </main>
  );
}
