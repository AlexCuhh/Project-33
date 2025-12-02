// src/components/Fleet.jsx
import jet1 from "../assets/img/jet-1.jpg";
import jet2 from "../assets/img/jet-2.jpg";
import jet3 from "../assets/img/jet-3.jpg";

export default function Fleet() {
  const jets = [
    {
      id: "cj3",
      pill: "Light Jet",
      price: "$3,200",
      unit: "/ hr",
      title: "Citation CJ3+",
      specs: ["👤 8", "📍 2,040 nm", "⚡ 416 kts"],
      tags: ["WiFi", "Refreshment Center", "Leather Seating"],
      img: jet3,
      alt: "Citation CJ3+ on the tarmac",
    },
    {
      id: "c350",
      pill: "Mid-Size Jet",
      price: "$5,800",
      unit: "/ hr",
      title: "Challenger 350",
      specs: ["👤 10", "📍 3,200 nm", "⚡ 448 kts"],
      tags: ["Full Galley", "Spacious Cabin", "Advanced Avionics"],
      img: jet1,
      alt: "Challenger 350 in hangar",
      featured: true, 
    },
    {
      id: "g650",
      pill: "Heavy Jet",
      price: "$12,500",
      unit: "/ hr",
      title: "Gulfstream G650",
      specs: ["👤 18", "📍 7,000 nm", "⚡ 516 kts"],
      tags: ["Master Suite", "Conference Area", "Dining Lounge"],
      img: jet2,
      alt: "Gulfstream G650 taxiing",
    },
  ];

  return (
    <section id="fleet" className="fleet">
      <div className="container">
        <header className="section__header">
          <h2>Our Premium Fleet</h2>
          <p>
            Choose from our carefully curated selection of luxury aircraft, each
            maintained to the highest standards and equipped with premium amenities.
          </p>
        </header>

        <div className="cards">
          {jets.map((j) => (
            <article
              key={j.id}
              className={`card ${j.featured ? "card--featured" : ""}`}
            >
              <div className="card__media">
                <img src={j.img} alt={j.alt} />
              </div>

              <div className="card__body">
                <div className="card__toprow">
                  <span className="card__pill">{j.pill}</span>
                  <div className="card__price">
                    {j.price} <span>{j.unit}</span>
                  </div>
                </div>

                <h3 className="card__title">{j.title}</h3>

                <ul className="card__specs">
                  {j.specs.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>

                <div className="card__tags">
                  {j.tags.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>

                <div className="card__actions">
                  <a href="#booking" className="btn btn--ghost">
                    Details
                  </a>
                  <a href="#booking" className="btn btn--gold">
                    Book Now
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
