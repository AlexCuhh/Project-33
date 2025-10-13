// src/components/BookingForm.jsx (structure only; keep your current handlers)
export default function BookingForm() {
  return (
    <section id="booking" className="booking">
      <div className="container">
        <form className="booking__grid">
          <label className="field">
            <span className="field__label">From</span>
            <div className="field__input">
              <span className="field__icon">📍</span>
              <input className="input" name="from" placeholder="Departure City" />
            </div>
          </label>

          <label className="field">
            <span className="field__label">To</span>
            <div className="field__input">
              <span className="field__icon">📍</span>
              <input className="input" name="to" placeholder="Arrival City" />
            </div>
          </label>

          <label className="field">
            <span className="field__label">Departure</span>
            <div className="field__input">
              <span className="field__icon">📅</span>
              <input className="input" type="date" name="depart" />
            </div>
          </label>

          <label className="field">
            <span className="field__label">Return (Optional)</span>
            <div className="field__input">
              <span className="field__icon">📅</span>
              <input className="input" type="date" name="return" />
            </div>
          </label>

          <label className="field">
            <span className="field__label">Passengers</span>
            <div className="field__input">
              <span className="field__icon">🛫</span>
              <input className="input" type="number" min="1" defaultValue="1" />
            </div>
          </label>

          <div className="booking__cta">
            <button type="submit" className="btn btn--gold btn--full">Search Flights</button>
          </div>
        </form>
      </div>
    </section>
  );
}
