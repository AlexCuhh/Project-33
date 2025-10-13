import { Link } from "react-router-dom";
export default function Navbar() {
  return (
    <header className="topbar">
      <div className="container topbar__inner">
        <div className="brand">
          <div className="brand__icon">✈️</div>
          <div>
            <div className="brand__title">Altitude</div>
            <div className="brand__subtitle">Premium Charter Services</div>
          </div>
        </div>

        <nav className="nav">
          <Link to="/" className="nav__link">Home</Link>
          <Link to="/full-fleet" className="nav__link">Our Fleet</Link>
          <a className="nav__link" href="#services">Services</a>
          <a className="nav__link" href="#about">About</a>
          <Link to="/contact" className="nav__link">Contact</Link>
        </nav>

        <div className="topbar__cta">
          <a className="btn btn--gold btn--sm" href="#booking">Book Now</a>
        </div>
      </div>
    </header>
  );
}
