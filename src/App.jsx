import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Fleet from "./pages/Fleet.jsx";
import FullFleet from "./pages/FullFleet.jsx";   // if you created this page
import Contact from "./pages/Contact.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/fleet" element={<Fleet />} />
        <Route path="/full-fleet" element={<FullFleet />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </>
  );
}
