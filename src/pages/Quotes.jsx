import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./quotes.css";


// --- tiny airport db (add more as needed) ---
const AIRPORTS = {
  AUS: { name: "Austin-Bergstrom", lat: 30.1975, lon: -97.6664 },
  DFW: { name: "Dallas/Fort Worth", lat: 32.8968, lon: -97.038 } ,
  IAH: { name: "Houston Bush", lat: 29.9902, lon: -95.3368 },
  LAX: { name: "Los Angeles", lat: 33.9416, lon: -118.4085 },
  JFK: { name: "New York JFK", lat: 40.6413, lon: -73.7781 },
  MIA: { name: "Miami", lat: 25.7959, lon: -80.2870 },
  DEN: { name: "Denver", lat: 39.8561, lon: -104.6737 },
  ORD: { name: "Chicago O'Hare", lat: 41.9742, lon: -87.9073 },
  LAS: { name: "Las Vegas", lat: 36.0840, lon: -115.1537 },
  SEA: { name: "Seattle", lat: 47.4502, lon: -122.3088 },
};

// --- reuse the aircraft info you already show on FullFleet ---
const AIRCRAFT = [
  { id:"cj3",  class:"Light Jet",   title:"Citation CJ3+",  price:3200,  speedKts:416, pax:8 },
  { id:"c350", class:"Mid-Size Jet",title:"Challenger 350", price:5800,  speedKts:448, pax:10 },
  { id:"g650", class:"Heavy Jet",   title:"Gulfstream G650",price:12500, speedKts:516, pax:18 },
];

// --- helpers ---
function toRad(d){ return (d*Math.PI)/180; }
function nmDistance(a, b){
  // Haversine, returns nautical miles
  const R_km = 6371;
  const toNm = 0.539957;
  const dLat = toRad(b.lat - a.lat);
  const dLon = toRad(b.lon - a.lon);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const h = Math.sin(dLat/2)**2 + Math.cos(lat1)*Math.cos(lat2)*Math.sin(dLon/2)**2;
  const d_km = 2 * R_km * Math.asin(Math.sqrt(h));
  return d_km * toNm;
}

export default function Quote(){
  const [form, setForm] = useState({
    from:"AUS", to:"DFW", pax:4, klass:"Auto", tripType:"oneway", date:""
  });
  const [selectedJet, setSelectedJet] = useState("auto");
  const [manualNm, setManualNm] = useState("");

  const navigate = useNavigate();   // ⬅️ new

  function handleQuoteSubmit(e) {
    e.preventDefault();

    // here you could later send data to a backend

    alert("Your quote request has been submitted successfully!");
    navigate("/");   // go back to homepage
  }


  // estimate logic lives in frontend for now
  const estimate = useMemo(() => {
    let legs = form.tripType === "round" ? 2 : 1;

    // distance nm: prefer airport db if both codes known, else manual
    let nm = 0;
    const A = AIRPORTS[form.from?.toUpperCase()];
    const B = AIRPORTS[form.to?.toUpperCase()];
    if (A && B) nm = Math.max(1, Math.round(nmDistance(A, B)));
    else if (manualNm) nm = Math.max(1, Number(manualNm));

    // choose jets that fit pax & class (or auto)
    let candidates = AIRCRAFT.filter(j => j.pax >= Number(form.pax));
    if (form.klass !== "Auto") candidates = candidates.filter(j => j.class === form.klass);
    if (selectedJet !== "auto") candidates = candidates.filter(j => j.id === selectedJet);
    if (candidates.length === 0) return null;

    // compute for each candidate, pick cheapest total
    const padFactor = 1.2;           // airways/ATC padding
    const taxiBlockHr = 0.5;         // taxi/turn time per leg
    const landingFee = 400;          // per leg, simple model
    const fboFee = 150;              // per leg

    const priced = candidates.map(j => {
      const flightHours = (nm / j.speedKts) * padFactor;   // block time (enroute)
      const blockPerLeg = flightHours + taxiBlockHr;
      const totalBlock = blockPerLeg * legs;
      const base = totalBlock * j.price;
      const fees = (landingFee + fboFee) * legs;
      const subtotal = base + fees;
      const tax = subtotal * 0.075;  // 7.5% excise (illustrative)
      const total = Math.round(subtotal + tax);

      return {
        jet: j,
        nm, legs,
        timeHr: Number(totalBlock.toFixed(2)),
        base: Math.round(base),
        fees, tax: Math.round(tax),
        total
      };
    });

    // pick best (lowest total)
    return priced.sort((a,b)=>a.total-b.total)[0];
  }, [form, selectedJet, manualNm]);



  return (
    <main className="quote" style={{padding:"32px 0"}}>
      <section className="quote__hero">
        <div className="container">
          <h1 className="quote__title">Request an Order</h1>
          <p className="quote__lead">
            Enter your route and passengers. We’ll estimate flight time and cost based on our fleet.
          </p>
        </div>
      </section>

       {/* =================== CONTENT SECTION =================== */}
      <section className="quote__wrap">
        <div className="container quote__grid">
          {/* ========== LEFT: FORM CARD ========== */}
          <article className="card quote__formcard">
            <header className="quote__cardhead">
              <h2>Trip details</h2>
              <p>Choose your route, passengers, and jet preferences.</p>
            </header>

            {/* ⬇️ CHANGED: use quote-form + form__group grid classes, NO inline grid style */}
            <form
              className="quote-form"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="form__group">
                <label>From (IATA)</label>
                <select
                  value={form.from}
                  onChange={e =>
                    setForm(prev => ({ ...prev, from: e.target.value }))
                  }
                >
                  {Object.entries(AIRPORTS).map(([code, airport]) => (
                    <option key={code} value={code}>
                      {code} — {airport.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form__group">
                <label>To (IATA)</label>
                <select
                  value={form.to}
                  onChange={e =>
                    setForm(prev => ({ ...prev, to: e.target.value }))
                  }
                >
                  {Object.entries(AIRPORTS).map(([code, airport]) => (
                    <option key={code} value={code}>
                      {code} — {airport.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form__group">
                <label>Date</label>
                <input
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                />
              </div>

              <div className="form__group">
                <label>Passengers</label>
                <select
                  value={form.pax}
                  onChange={(e) => setForm({ ...form, pax: e.target.value })}
                >
                  {[1, 2, 3, 4, 5, 6, 8, 10].map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form__group">
                <label>Class</label>
                <select
                  value={form.klass}
                  onChange={(e) => setForm({ ...form, klass: e.target.value })}
                >
                  <option>Auto</option>
                  <option>Light Jet</option>
                  <option>Mid-Size Jet</option>
                  <option>Heavy Jet</option>
                </select>
              </div>

              <div className="form__group">
                <label>Trip type</label>
                <select
                  value={form.tripType}
                  onChange={(e) => setForm({ ...form, tripType: e.target.value })}
                >
                  <option value="oneway">One-way</option>
                  <option value="round">Round trip</option>
                </select>
              </div>

              {/* full-width row */}
              <details className="quote__advanced form__span-3">
                <summary>Airport not listed? Enter distance manually</summary>
                <div className="form__group" style={{ marginTop: 8 }}>
                  <label>Distance (nautical miles)</label>
                  <input placeholder="e.g. 165" />
                </div>
              </details>

              {/* buttons row */}
              <div className="form__actions">
                <button
                  type="button"
                  className="btn btn--gold"
                  onClick={() => {
                    alert("Your quote request has been submitted successfully!");
                    navigate("/");   // send user back to homepage
                  }}
                >
                  Request Order
                </button>
                {/* you can add a small status text here if needed */}
              </div>
            </form>
          </article>

          {/* ========== RIGHT: ESTIMATE CARD ========== */}
          <aside className="card quote__estimate">
            {!estimate ? (
              <p>Enter your trip details to see an estimate.</p>
            ) : (
              <>
                <header>
                  <h2 style={{ margin: 0 }}>{estimate.jet.title}</h2>
                  <div className="quote__total">
                    ${estimate.total.toLocaleString()}
                    <span> total</span>
                  </div>
                </header>

                <div className="quote__meta">
                  <div>
                    Distance: <strong>{estimate.nm.toLocaleString()} nm</strong>
                  </div>
                  <div>
                    Legs: <strong>{estimate.legs}</strong>
                  </div>
                  <div>
                    Block time: <strong>{estimate.timeHr} hr</strong>
                  </div>
                  <div>
                    Rate: <strong>${estimate.jet.price.toLocaleString()}/hr</strong>
                  </div>
                </div>

                <div className="divider" />

                <ul className="quote__breakdown">
                  <li>Base (time × rate): ${estimate.base.toLocaleString()}</li>
                  <li>Fees (landing/FBO): ${estimate.fees.toLocaleString()}</li>
                  <li>Tax (7.5%): ${estimate.tax.toLocaleString()}</li>
                </ul>

                <div className="quote__buttons">
                  <a href="/contact" className="btn btn--ghost">
                    Talk to Concierge
                  </a>
                  <a href="/full-fleet" className="btn btn--gold">
                    See Fleet
                  </a>
                </div>
              </>
            )}
          </aside>
        </div>
      </section>
    </main>
  );
}
