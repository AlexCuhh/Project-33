import { useMemo, useState } from "react";
import "./full-fleet.css";

import jet1 from "../assets/img/jet-1.jpg";
import jet2 from "../assets/img/jet-2.jpg";
import jet3 from "../assets/img/jet-3.jpg";

const AIRCRAFT = [
  {
    id: "cj3",
    class: "Light Jet",
    title: "Citation CJ3+",
    price: 3200,
    rangeNm: 2040,
    speedKts: 416,
    pax: 8,
    img: jet3,
    tags: ["WiFi", "Leather Seating", "Refreshment Center"],
  },
  {
    id: "c350",
    class: "Mid-Size Jet",
    title: "Challenger 350",
    price: 5800,
    rangeNm: 3200,
    speedKts: 448,
    pax: 10,
    img: jet1,
    tags: ["Full Galley", "Spacious Cabin", "Advanced Avionics"],
    featured: true,
  },
  {
    id: "g650",
    class: "Heavy Jet",
    title: "Gulfstream G650",
    price: 12500,
    rangeNm: 7000,
    speedKts: 516,
    pax: 18,
    img: jet2,
    tags: ["Master Suite", "Conference Area", "Dining Lounge"],
  },
];

export default function FullFleet() {
  const [query, setQuery] = useState("");
  const [cls, setCls] = useState("All");
  const [sort, setSort] = useState("price-asc");
  const [pax, setPax] = useState("Any");

  const filtered = useMemo(() => {
    let list = AIRCRAFT.slice();

    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        a =>
          a.title.toLowerCase().includes(q) ||
          a.class.toLowerCase().includes(q) ||
          a.tags.some(t => t.toLowerCase().includes(q))
      );
    }

    if (cls !== "All") list = list.filter(a => a.class === cls);
    if (pax !== "Any") list = list.filter(a => a.pax >= Number(pax));

    switch (sort) {
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "range-desc":
        list.sort((a, b) => b.rangeNm - a.rangeNm);
        break;
      case "range-asc":
        list.sort((a, b) => a.rangeNm - b.rangeNm);
        break;
      default:
        list.sort((a, b) => a.price - b.price); // price-asc
    }

    return list;
  }, [query, cls, sort, pax]);

  return (
    <main className="fleetpage">
      {/* Hero */}
      <section className="fleetpage__hero">
        <div className="container fleetpage__heroInner">
          <h1>Explore Our Fleet</h1>
          <p>
            Select from meticulously maintained aircraft, operated by
            professionals, with premium amenities for a seamless journey.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="fleetpage__filters">
        <div className="container">
          <div className="filters__bar">
            <div className="filters__row">
              <div className="filters__group">
                <label>Search</label>
                <input
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="Name, feature, class…"
                />
              </div>
              <div className="filters__group">
                <label>Class</label>
                <select value={cls} onChange={e => setCls(e.target.value)}>
                  <option>All</option>
                  <option>Light Jet</option>
                  <option>Mid-Size Jet</option>
                  <option>Heavy Jet</option>
                </select>
              </div>
              <div className="filters__group">
                <label>Passengers (min)</label>
                <select value={pax} onChange={e => setPax(e.target.value)}>
                  <option>Any</option>
                  <option>6</option>
                  <option>8</option>
                  <option>10</option>
                  <option>12</option>
                  <option>16</option>
                </select>
              </div>
              <div className="filters__group">
                <label>Sort</label>
                <select value={sort} onChange={e => setSort(e.target.value)}>
                  <option value="price-asc">Price: Low → High</option>
                  <option value="price-desc">Price: High → Low</option>
                  <option value="range-desc">Range: High → Low</option>
                  <option value="range-asc">Range: Low → High</option>
                </select>
              </div>
            </div>
            <div className="filters__meta">
              Showing <strong>{filtered.length}</strong> aircraft
            </div>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="fleetpage__grid">
        <div className="container cards cards--fleetpage">
          {filtered.map(a => (
            <article
              key={a.id}
              className={`card card--catalog ${a.featured ? "card--featured" : ""}`}
            >
              <div className="card__media">
                <img src={a.img} alt={a.title} />
              </div>

              <div className="card__body">
                <div className="card__toprow">
                  <span className="card__pill">{a.class}</span>
                  <div className="card__price">
                    ${a.price.toLocaleString()} <span>/ hr</span>
                  </div>
                </div>

                <h3 className="card__title">{a.title}</h3>

                <ul className="card__specs">
                  <li>👤 {a.pax}</li>
                  <li>📍 {a.rangeNm.toLocaleString()} nm</li>
                  <li>⚡ {a.speedKts} kts</li>
                </ul>

                <div className="card__tags">
                  {a.tags.map(t => (
                    <span key={t}>{t}</span>
                  ))}
                </div>

                <div className="card__actions">
                  <a className="btn btn--ghost" href="#details">Details</a>
                  <a className="btn btn--gold" href="#book">Book Now</a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Concierge CTA */}
      <section className="fleetpage__concierge">
        <div className="container concierge">
          <h3>Need advice choosing the right jet?</h3>
          <p>
            Our concierge can recommend the perfect aircraft for your route, passenger
            count, and budget—often with same-day availability.
          </p>
          <a href="#contact" className="btn btn--gold btn--sm">Talk to Concierge</a>
        </div>
      </section>
    </main>
  );
}
