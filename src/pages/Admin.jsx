// src/pages/Admin.jsx
import { useMemo, useState } from "react";
import React from "react";

const recentQuotes = [
  { id: "Q-1024", route: "AUS → DFW", jet: "Citation CJ3+", date: "2025-12-01", status: "New" },
  { id: "Q-1023", route: "AUS → LAS", jet: "Gulfstream G650", date: "2025-11-30", status: "Pending" },
  { id: "Q-1022", route: "JFK → MIA", jet: "Challenger 350", date: "2025-11-29", status: "Approved" },
];

export default function Admin() {
  const totalQuotes = recentQuotes.length;
  const newToday = 1;
  const pending = recentQuotes.filter(q => q.status === "Pending").length;

  return (
    <main className="admin" style={{ minHeight: "100vh", background: "radial-gradient(circle at top, #182533 0, #050a10 55%)" }}>
      {/* Hero / title */}
      <section style={{ padding: "72px 0 24px" }}>
        <div className="container">
          <h1 style={{ margin: 0, fontSize: "2.2rem" }}>Employee Dashboard</h1>
          <p style={{ margin: "6px 0 0", color: "#9fb2c0" }}>
            Internal overview of recent quote requests and key metrics.
          </p>
        </div>
      </section>

      {/* Content */}
      <section style={{ padding: "8px 0 48px" }}>
        <div
          className="container"
          style={{
            display: "grid",
            gap: "18px",
            gridTemplateColumns: "minmax(0, 1.2fr) minmax(0, 2fr)",
          }}
        >

        {/* LEFT COLUMN — redesigned summary cards */}
        <div style={{ display: "grid", gap: "18px" }}>

        {/* TOTAL QUOTES */}
        <div className="card" style={{ padding: "20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
                <h2 style={{ margin: 0, fontSize: "1rem", color: "#9fb2c0", textTransform: "uppercase", letterSpacing: ".5px" }}>
                Total Quotes
                </h2>
                <p style={{ margin: "10px 0 0", fontSize: "2rem", fontWeight: 800 }}>
                {totalQuotes}
                </p>
            </div>
            <div style={{ fontSize: "2rem", opacity: 0.8 }}>📄</div>
            </div>
        </div>

        {/* NEW TODAY */}
        <div className="card" style={{ padding: "20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
                <h2 style={{ margin: 0, fontSize: "1rem", color: "#9fb2c0", textTransform: "uppercase", letterSpacing: ".5px" }}>
                New Today
                </h2>
                <p style={{ margin: "10px 0 0", fontSize: "2rem", fontWeight: 800 }}>
                {newToday}
                </p>
            </div>
            <div style={{ fontSize: "2rem", opacity: 0.8 }}>🕒</div>
            </div>
        </div>

        {/* PENDING REQUESTS */}
        <div className="card" style={{ padding: "20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
                <h2 style={{ margin: 0, fontSize: "1rem", color: "#9fb2c0", textTransform: "uppercase", letterSpacing: ".5px" }}>
                Pending Requests
                </h2>
                <p style={{ margin: "10px 0 0", fontSize: "2rem", fontWeight: 800 }}>
                {pending}
                </p>
            </div>
            <div style={{ fontSize: "2rem", opacity: 0.8 }}>⏳</div>
            </div>
        </div>

        {/* QUICK ACTIONS */}
        <div className="card" style={{ padding: "20px" }}>
            <h2 style={{ margin: 0, fontSize: "1rem", color: "#9fb2c0", textTransform: "uppercase", letterSpacing: ".5px" }}>
            Quick Actions
            </h2>
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginTop: "12px" }}>
            <a href="/quotes" className="btn btn--gold">View Quotes</a>
            <a href="/full-fleet" className="btn btn--ghost">View Fleet</a>
            </div>
        </div>

        </div>


          {/* Right: recent quotes table (mock data) */}
          <div className="card" style={{ padding: "16px 18px", overflowX: "auto" }}>
            <h2 style={{ margin: 0, fontSize: "1rem", color: "#9fb2c0" }}>Recent quote activity (demo)</h2>
            <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "10px", fontSize: "0.9rem" }}>
              <thead>
                <tr style={{ textAlign: "left", borderBottom: "1px solid rgba(255,255,255,.08)" }}>
                  <th style={{ padding: "6px 4px" }}>ID</th>
                  <th style={{ padding: "6px 4px" }}>Route</th>
                  <th style={{ padding: "6px 4px" }}>Aircraft</th>
                  <th style={{ padding: "6px 4px" }}>Date</th>
                  <th style={{ padding: "6px 4px" }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentQuotes.map((q) => (
                  <tr key={q.id} style={{ borderBottom: "1px solid rgba(255,255,255,.04)" }}>
                    <td style={{ padding: "6px 4px" }}>{q.id}</td>
                    <td style={{ padding: "6px 4px" }}>{q.route}</td>
                    <td style={{ padding: "6px 4px" }}>{q.jet}</td>
                    <td style={{ padding: "6px 4px" }}>{q.date}</td>
                    <td style={{ padding: "6px 4px", color: q.status === "New" ? "#ffd27a" : "#cfe0ea" }}>
                      {q.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p style={{ marginTop: "8px", fontSize: "0.8rem", color: "#768799" }}>
              * Demo data only – wired to real database in a future sprint.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
