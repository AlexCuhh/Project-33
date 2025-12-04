// src/pages/Home.jsx
     
import Hero from "../components/Hero.jsx";
import BookingForm from "../components/BookingForm.jsx";
import Fleet from "./Fleet.jsx";
import WhyChoose from "../components/WhyChoose";

export default function Home() {
  return (
    <main>
      <Hero />
      <div className="container" style={{ marginTop: "-10px" }}>
        <BookingForm />
        <Fleet />
        <WhyChoose />
      </div>
    </main>
  );
}

