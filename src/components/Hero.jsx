// src/components/Hero.jsx
import { Link } from "react-router-dom";
import heroImg from "../assets/img/hero-jet.jpg";

export default function Hero() {
  return (
    <header className="hero" role="banner">
      <div
        className="hero__bg"
        style={{ backgroundImage: `url(${heroImg})` }}
        aria-hidden="true"
      />
      <div className="hero__overlay" aria-hidden="true" />

      <div className="container hero__content">
        <h1 className="hero__title">
          Altitude
          <br />
          <span className="tint">Charter Services</span>
        </h1>

        <p className="hero__subtitle with-underline">
          Experience unparalleled luxury and convenience with our premium private flight
          charter services. Fly on your schedule to any destination worldwide.
        </p>

        <ul className="hero__badges" aria-label="highlights">
          <li>🛡️ Safety Certified</li>
          <li>⏱️ 24/7 Available</li>
          <li>⭐ Premium Service</li>
        </ul>

        <div className="hero__actions">
          <a href="#booking" className="btn btn--gold">Book Your Flight</a>
          {/* FIX: use the canonical path */}
          <Link to="/full-fleet" className="btn btn--ghost">View Fleet</Link>
        </div>
      </div>
    </header>
  );
}
