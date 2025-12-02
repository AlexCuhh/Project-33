import { useState } from "react";
import "./contact.css";

export default function Contact() {
  const [status, setStatus] = useState({ state: "idle", msg: "" });

  function handleSubmit(e) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);

    // very light validation
    const name = fd.get("name")?.trim();
    const email = fd.get("email")?.trim();
    const message = fd.get("message")?.trim();
    if (!name || !email || !message) {
      setStatus({ state: "error", msg: "Please fill in all required fields." });
      return;
    }

    // mock submit (replace with real endpoint if you like)
    setStatus({ state: "loading", msg: "Sending…" });
    setTimeout(() => {
      setStatus({ state: "success", msg: "Message sent! We’ll get back shortly." });
      e.currentTarget.reset();
    }, 900);
  }

  return (
    <main className="contact">
      {/* Hero / Banner */}
      <section className="contact__hero">
        <div className="container">
          <h1 className="contact__title">Get in Touch</h1>
          <p className="contact__lead">
            Tell us about your trip, schedule, or preferences. Our concierge team is available 24/7.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="contact__wrap">
        <div className="container contact__grid">
          {/* Left: Form */}
          <article className="contact__card contact__formcard">
            <header className="contact__cardhead">
              <h2>Send a Message</h2>
              <p>We typically reply within an hour.</p>
            </header>

            <form onSubmit={handleSubmit} className="contact__form" noValidate>
              <div className="form__row">
                <div className="form__group">
                  <label htmlFor="name">Full Name *</label>
                  <input id="name" name="name" type="text" placeholder="Avery Collins" required />
                </div>
                <div className="form__group">
                  <label htmlFor="email">Email *</label>
                  <input id="email" name="email" type="email" placeholder="avery@email.com" required />
                </div>
              </div>

              <div className="form__row">
                <div className="form__group">
                  <label htmlFor="phone">Phone</label>
                  <input id="phone" name="phone" type="tel" placeholder="+1 (555) 013-0145" />
                </div>
                <div className="form__group">
                  <label htmlFor="topic">Topic</label>
                  <select id="topic" name="topic" defaultValue="Charter Inquiry">
                    <option>Charter Inquiry</option>
                    <option>Membership</option>
                    <option>Partnership</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>

              <div className="form__group">
                <label htmlFor="message">Message *</label>
                <textarea id="message" name="message" rows="6" placeholder="Tell us about your itinerary, dates, and passengers." required />
              </div>

              <div className="form__actions">
                <button className="btn btn--gold" disabled={status.state === "loading"}>
                  {status.state === "loading" ? "Sending…" : "Send Message"}
                </button>
                {status.state !== "idle" && (
                  <span
                    className={
                      status.state === "success"
                        ? "form__status form__status--ok"
                        : status.state === "error"
                        ? "form__status form__status--err"
                        : "form__status"
                    }
                    role="status"
                    aria-live="polite"
                  >
                    {status.msg}
                  </span>
                )}
              </div>
            </form>
          </article>

          {/* Right: Concierge / Info */}
          <aside className="contact__card contact__infocard">
            <header className="contact__cardhead">
              <h2>Concierge</h2>
              <p>Direct lines to our 24/7 flight desk.</p>
            </header>

            <ul className="contact__list">
              <li>
                <div className="contact__pill">Phone</div>
                <a href="tel:+15550130145" className="contact__link">+1 (555) 013-0145</a>
              </li>
              <li>
                <div className="contact__pill">Email</div>
                <a href="mailto:concierge@altitudecharter.com" className="contact__link">
                  concierge@altitudecharter.com
                </a>
              </li>
              <li>
                <div className="contact__pill">HQ</div>
                <div>501 Skyway Blvd, Suite 300<br/>Scottsdale, AZ 85260</div>
              </li>
              <li>
                <div className="contact__pill">Hours</div>
                <div>Always open — 24/7</div>
              </li>
            </ul>

            <div className="contact__divider" />

            <div className="contact__mini">
              <h3>Flight Preferences</h3>
              <p>Prefer a specific cabin layout, pet-friendly crew, or on-board catering? Include it in your message—we’ll tailor the aircraft and service.</p>
            </div>

            <div className="contact__badge">
              <span>🛡️ Altitude Certified</span>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
