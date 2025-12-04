// src/components/WhyChoose.jsx
export default function WhyChoose() {
  const items = [
    {
      title: "Safety First",
      text:
        "All aircraft undergo rigorous maintenance and safety inspections. Our pilots are highly trained professionals with thousands of flight hours.",
    },
    {
      title: "Luxury Experience",
      text:
        "Every flight includes premium amenities, personalized service, and attention to detail that exceeds expectations.",
    },
    {
      title: "Global Access",
      text:
        "Access to over 5,000 airports worldwide with flexible scheduling and immediate availability for urgent travel needs.",
    },
  ];

  return (
    <section className="why">
      <div className="container">
        <header className="why__header">
          <h2>Why Choose Elite Aviation</h2>
        </header>

        <div className="why__grid">
          {items.map((it) => (
            <article className="why__card" key={it.title}>
              <h3>{it.title}</h3>
              <p>{it.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
