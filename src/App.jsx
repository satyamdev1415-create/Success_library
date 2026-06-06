import { useState, useEffect, useRef } from "react";

import pic1 from "./assets/pic1.jpeg";
import pic2 from "./assets/pic2.jpeg";
import pic3 from "./assets/pic3.jpeg";
import pic4 from "./assets/pic4.jpeg";
import pic5 from "./assets/pic5.jpeg";
import pic6 from "./assets/pic6.jpeg";
import pic7 from "./assets/pic7.jpeg";
import pic8 from "./assets/pic8.jpeg";
import pic9 from "./assets/pic9.jpeg";
import pic10 from "./assets/pic10.jpeg";



const NAV_LINKS = ["Home", "About", "Services", "Gallery", "Contact"];

const FEATURES = [
  { icon: "🕐", title: "24×7 Open", desc: "Study anytime, day or night, at your convenience." },
  { icon: "❄️", title: "Air Conditioned", desc: "Stay cool and focused in our fully AC environment." },
  { icon: "📶", title: "High Speed WiFi", desc: "Seamless internet for research and online studies." },
  { icon: "💧", title: "Clean Drinking Water", desc: "Fresh and cold purified water always available." },
  { icon: "🤫", title: "Peaceful Environment", desc: "Zero distraction zone for deep concentration." },
  { icon: "✨", title: "Neat & Clean Space", desc: "Hygienic and well-maintained study hall daily." },
  { icon: "🪑", title: "Comfortable Seating", desc: "Ergonomic chairs for long study sessions." },
  { icon: "🏆", title: "Exam Friendly Atmosphere", desc: "Curated atmosphere for competitive exam prep." },
];

const SERVICES = [
  { icon: "📚", title: "Peaceful Study Environment", desc: "A disciplined, noise-free space designed to maximize your focus and academic performance." },
  { icon: "❄️", title: "Fully Air Conditioned Hall", desc: "Stay comfortable throughout your study hours with centralized air conditioning." },
  { icon: "🌐", title: "High-Speed WiFi", desc: "Reliable and fast internet connectivity for research, online tests, and learning resources." },
  { icon: "💧", title: "Clean Drinking Water", desc: "Cold and purified drinking water available round the clock to keep you hydrated." },
  { icon: "🌙", title: "24 Hours Open", desc: "We never close. Study at 2AM or 2PM — your schedule, your success." },
  { icon: "🛋️", title: "Comfortable Study Space", desc: "Well-lit, spacious desks and ergonomic seating for productive long-hour sessions." },
  { icon: "🔇", title: "Silent Reading Zone", desc: "Dedicated silent zones where only the sound of turning pages is allowed." },
  { icon: "🌟", title: "Motivational Atmosphere", desc: "Inspiring quotes, positive energy, and a community of driven students around you." },
];

const GALLERY_IMAGES = [
  { url: pic1, label: "Library Image 1", size: "tall" },
  { url: pic2, label: "Library Image 2", size: "wide" },
  { url: pic3, label: "Library Image 3", size: "normal" },
  { url: pic4, label: "Library Image 4", size: "normal" },
  { url: pic5, label: "Library Image 5", size: "tall" },
  { url: pic6, label: "Library Image 6", size: "wide" },
  { url: pic7, label: "Library Image 7", size: "normal" },
  { url: pic8, label: "Library Image 8", size: "normal" },
  { url: pic9, label: "Library Image 9", size: "wide" },
  { url: pic10, label: "Library Image 10", size: "normal" },

];

const STATS = [
  { value: 500, label: "Happy Students", suffix: "+" },
  { value: 24, label: "Hours Open", suffix: "/7" },
  { value: 80, label: "Study Seats", suffix: "+" },
  { value: 1, label: "Year of Excellence", suffix: "" },
];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function useCounter(target, active) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = 0;
    const step = target / 60;
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 20);
    return () => clearInterval(timer);
  }, [active, target]);
  return count;
}

function Counter({ value, label, suffix }) {
  const [ref, visible] = useInView(0.3);
  const count = useCounter(value, visible);
  return (
    <div ref={ref} style={{ textAlign: "center", padding: "2rem" }}>
      <div style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", fontFamily: "'Playfair Display', serif", fontWeight: 700, color: "#f5c842", lineHeight: 1 }}>
        {count}{suffix}
      </div>
      <div style={{ color: "rgba(255,255,255,0.75)", marginTop: "0.5rem", fontSize: "0.95rem", letterSpacing: "0.05em", textTransform: "uppercase" }}>{label}</div>
    </div>
  );
}

function Navbar({ dark, setDark, active, setActive }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  const bg = scrolled
    ? (dark ? "rgba(10,10,20,0.92)" : "rgba(255,255,255,0.92)")
    : "transparent";
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: bg, backdropFilter: scrolled ? "blur(20px)" : "none",
      borderBottom: scrolled ? (dark ? "1px solid rgba(245,200,66,0.15)" : "1px solid rgba(0,0,0,0.08)") : "none",
      transition: "all 0.4s ease", padding: "1rem 2rem",
      display: "flex", alignItems: "center", justifyContent: "space-between",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <div style={{
          width: 44, height: 44, borderRadius: "12px",
          background: "linear-gradient(135deg, #f5c842, #e8720c)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "1.4rem", boxShadow: "0 4px 15px rgba(245,200,66,0.4)"
        }}>📖</div>
        <div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 800, fontSize: "1.1rem", color: dark ? "#fff" : "#111", lineHeight: 1.1 }}>SUCCESS</div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "0.7rem", letterSpacing: "0.3em", color: "#f5c842", fontWeight: 600 }}>LIBRARY</div>
        </div>
      </div>

      {/* Desktop Nav */}
      <div style={{ display: "flex", gap: "2rem", alignItems: "center" }} className="desktop-nav">
        {NAV_LINKS.map(l => (
          <button key={l} onClick={() => { setActive(l); setMenuOpen(false); document.getElementById(l.toLowerCase())?.scrollIntoView({ behavior: "smooth" }); }}
            style={{
              background: "none", border: "none", cursor: "pointer",
              color: active === l ? "#f5c842" : (dark ? "rgba(255,255,255,0.8)" : "#333"),
              fontFamily: "'Outfit', sans-serif", fontSize: "0.95rem", fontWeight: active === l ? 600 : 400,
              letterSpacing: "0.03em", padding: "0.25rem 0",
              borderBottom: active === l ? "2px solid #f5c842" : "2px solid transparent",
              transition: "all 0.25s",
            }}>
            {l}
          </button>
        ))}
        <button onClick={() => setDark(!dark)} style={{
          background: dark ? "rgba(245,200,66,0.15)" : "rgba(0,0,0,0.08)",
          border: "none", borderRadius: "50%", width: 38, height: 38,
          cursor: "pointer", fontSize: "1.1rem", display: "flex", alignItems: "center", justifyContent: "center",
          transition: "all 0.3s",
        }}>{dark ? "☀️" : "🌙"}</button>
        <button onClick={() => window.open("https://docs.google.com/forms/d/e/1FAIpQLSf-MHfq7UkwyAvtEVl76uhq4jECFEe7tc4lUSlgzLPT0_HX7Q/viewform", "_blank")}
          style={{
            background: "linear-gradient(135deg, #f5c842, #e8720c)", border: "none", borderRadius: "25px",
            padding: "0.55rem 1.4rem", color: "#fff", fontFamily: "'Outfit', sans-serif",
            fontWeight: 600, cursor: "pointer", fontSize: "0.9rem", boxShadow: "0 4px 15px rgba(245,200,66,0.35)",
            transition: "transform 0.2s, box-shadow 0.2s",
          }} onMouseOver={e => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = "0 8px 25px rgba(245,200,66,0.5)"; }}
          onMouseOut={e => { e.target.style.transform = ""; e.target.style.boxShadow = "0 4px 15px rgba(245,200,66,0.35)"; }}>
          Join Now
        </button>
      </div>

      {/* Mobile Hamburger */}
      <div style={{ display: "none" }} className="mobile-nav-btn">
        <button onClick={() => setMenuOpen(!menuOpen)} style={{ background: "none", border: "none", fontSize: "1.5rem", cursor: "pointer", color: dark ? "#fff" : "#111" }}>
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{
          position: "absolute", top: "100%", left: 0, right: 0,
          background: dark ? "rgba(10,10,20,0.98)" : "rgba(255,255,255,0.98)",
          backdropFilter: "blur(20px)", padding: "1rem 2rem",
          display: "flex", flexDirection: "column", gap: "1rem",
          borderBottom: "1px solid rgba(245,200,66,0.2)",
        }}>
          {NAV_LINKS.map(l => (
            <button key={l} onClick={() => { setActive(l); setMenuOpen(false); document.getElementById(l.toLowerCase())?.scrollIntoView({ behavior: "smooth" }); }}
              style={{
                background: "none", border: "none", textAlign: "left", cursor: "pointer",
                color: active === l ? "#f5c842" : (dark ? "#fff" : "#333"),
                fontFamily: "'Outfit', sans-serif", fontSize: "1rem", fontWeight: active === l ? 600 : 400, padding: "0.5rem 0",
              }}>{l}</button>
          ))}
          <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
            <button onClick={() => setDark(!dark)} style={{ background: "none", border: "1px solid rgba(245,200,66,0.4)", borderRadius: "8px", padding: "0.4rem 0.8rem", cursor: "pointer", color: dark ? "#fff" : "#333", fontFamily: "'Outfit', sans-serif" }}>{dark ? "☀️ Light" : "🌙 Dark"}</button>
          </div>
        </div>
      )}
    </nav>
  );
}

function FeatureCard({ icon, title, desc, dark, index }) {
  const [ref, visible] = useInView(0.1);
  const [hovered, setHovered] = useState(false);
  return (
    <div ref={ref} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{
        opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(40px)",
        transition: `all 0.6s ease ${index * 0.08}s`,
        background: hovered
          ? "linear-gradient(135deg, rgba(245,200,66,0.18), rgba(232,114,12,0.12))"
          : (dark ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.7)"),
        border: hovered ? "1px solid rgba(245,200,66,0.5)" : (dark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.06)"),
        borderRadius: "20px", padding: "1.75rem", backdropFilter: "blur(10px)",
        boxShadow: hovered ? "0 20px 40px rgba(245,200,66,0.15)" : "0 4px 20px rgba(0,0,0,0.06)",
        cursor: "default", transition: "all 0.35s ease",
      }}>
      <div style={{ fontSize: "2.5rem", marginBottom: "1rem", display: "block", transform: hovered ? "scale(1.1)" : "scale(1)", transition: "transform 0.3s" }}>{icon}</div>
      <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", fontWeight: 700, color: dark ? "#fff" : "#111", marginBottom: "0.5rem" }}>{title}</h3>
      <p style={{ color: dark ? "rgba(255,255,255,0.6)" : "#666", fontSize: "0.88rem", lineHeight: 1.6, margin: 0 }}>{desc}</p>
    </div>
  );
}

function ServiceCard({ icon, title, desc, dark, index }) {
  const [ref, visible] = useInView(0.1);
  const [hovered, setHovered] = useState(false);
  return (
    <div ref={ref} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{
        opacity: visible ? 1 : 0, transform: visible ? "translateY(0) scale(1)" : "translateY(50px) scale(0.97)",
        transition: `all 0.55s cubic-bezier(0.34,1.56,0.64,1) ${index * 0.1}s`,
        background: dark ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.85)",
        border: dark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.06)",
        borderRadius: "24px", padding: "2rem", backdropFilter: "blur(15px)",
        boxShadow: hovered ? "0 25px 50px rgba(245,200,66,0.2), 0 0 0 1px rgba(245,200,66,0.3)" : "0 4px 20px rgba(0,0,0,0.05)",
        transform: hovered ? "translateY(-8px)" : "translateY(0)",
        transition: "all 0.35s ease",
      }}>
      <div style={{
        width: 60, height: 60, borderRadius: "16px", fontSize: "1.8rem",
        background: hovered ? "linear-gradient(135deg, #f5c842, #e8720c)" : (dark ? "rgba(245,200,66,0.1)" : "rgba(245,200,66,0.15)"),
        display: "flex", alignItems: "center", justifyContent: "center",
        marginBottom: "1.25rem", transition: "all 0.3s",
      }}>{icon}</div>
      <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", fontWeight: 700, color: dark ? "#fff" : "#111", marginBottom: "0.6rem" }}>{title}</h3>
      <p style={{ color: dark ? "rgba(255,255,255,0.55)" : "#777", fontSize: "0.87rem", lineHeight: 1.65, margin: 0 }}>{desc}</p>
    </div>
  );
}

function GalleryImage({ item, index }) {
  const [ref, visible] = useInView(0.05);
  const [hovered, setHovered] = useState(false);
  return (
    <div ref={ref} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{
        opacity: visible ? 1 : 0, transform: visible ? "scale(1)" : "scale(0.93)",
        transition: `all 0.6s ease ${index * 0.06}s`,
        borderRadius: "16px", overflow: "hidden", position: "relative", cursor: "pointer",
        gridRow: item.size === "tall" ? "span 2" : "span 1",
        gridColumn: item.size === "wide" ? "span 2" : "span 1",
        minHeight: item.size === "tall" ? "320px" : "160px",
        boxShadow: hovered ? "0 25px 50px rgba(0,0,0,0.35)" : "0 6px 20px rgba(0,0,0,0.15)",
      }}>
      <img src={item.url} alt={item.label} style={{
        width: "100%", height: "100%", objectFit: "cover",
        transform: hovered ? "scale(1.08)" : "scale(1)", transition: "transform 0.5s ease",
        display: "block",
      }} />
      <div style={{
        position: "absolute", inset: 0,
        background: hovered ? "linear-gradient(to top, rgba(0,0,0,0.7), transparent)" : "transparent",
        transition: "all 0.4s",
        display: "flex", alignItems: "flex-end", padding: "1rem",
      }}>
        {hovered && <span style={{ color: "#fff", fontFamily: "'Outfit', sans-serif", fontWeight: 500, fontSize: "0.9rem", letterSpacing: "0.03em" }}>{item.label}</span>}
      </div>
    </div>
  );
}

function Section({ id, children, style = {} }) {
  return <section id={id} style={{ ...style }}>{children}</section>;
}

export default function App() {
  const [dark, setDark] = useState(true);
  const [active, setActive] = useState("Home");
  const [loading, setLoading] = useState(true);
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });
  const [formSent, setFormSent] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 2200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const links = ["@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;0,900;1,700&family=Outfit:wght@300;400;500;600;700&display=swap');"];
    const style = document.createElement("style");
    style.textContent = `
      ${links[0]}
      * { box-sizing: border-box; margin: 0; padding: 0; }
      html { scroll-behavior: smooth; }
      body { font-family: 'Outfit', sans-serif; }
      @media (max-width: 768px) { .desktop-nav { display: none !important; } .mobile-nav-btn { display: block !important; } }
      @media (min-width: 769px) { .mobile-nav-btn { display: none !important; } }
      @keyframes fadeUp { from { opacity:0; transform: translateY(30px); } to { opacity:1; transform: translateY(0); } }
      @keyframes shimmer { 0%,100% { opacity:0.5; } 50% { opacity:1; } }
      @keyframes float { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-12px); } }
      @keyframes spin { to { transform: rotate(360deg); } }
      @keyframes pulse { 0%,100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(245,200,66,0.4); } 50% { transform: scale(1.05); box-shadow: 0 0 0 10px rgba(245,200,66,0); } }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const bg = dark
    ? "linear-gradient(135deg, #0a0a14 0%, #0f0f1f 40%, #0d1020 70%, #0a0f1a 100%)"
    : "linear-gradient(135deg, #f8f6f0 0%, #fdf9f0 40%, #f5f0e8 100%)";

  if (loading) return (
    <div style={{
      position: "fixed", inset: 0, background: "#0a0a14",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "2rem",
      zIndex: 9999,
    }}>
      <div style={{ fontSize: "3rem", animation: "float 2s ease-in-out infinite" }}>📖</div>
      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 5vw, 2.8rem)", fontWeight: 800, color: "#fff", textAlign: "center", lineHeight: 1.2 }}>
        SUCCESS <span style={{ color: "#f5c842" }}>LIBRARY</span>
      </div>
      <div style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'Outfit', sans-serif", fontSize: "0.9rem", letterSpacing: "0.15em", animation: "shimmer 1.5s ease-in-out infinite" }}>
        YOUR PATH TO SUCCESS STARTS HERE
      </div>
      <div style={{ width: 60, height: 4, background: "rgba(255,255,255,0.1)", borderRadius: 2, marginTop: "1rem", overflow: "hidden" }}>
        <div style={{ height: "100%", background: "linear-gradient(90deg, #f5c842, #e8720c)", borderRadius: 2, animation: "shimmer 2s ease-in-out infinite", width: "100%" }} />
      </div>
    </div>
  );

  return (
    <div style={{ background: bg, minHeight: "100vh", color: dark ? "#fff" : "#111", transition: "all 0.4s ease" }}>
      <Navbar dark={dark} setDark={setDark} active={active} setActive={setActive} />

      {/* ─── HERO ─── */}
      <Section id="home" style={{ minHeight: "100vh", position: "relative", display: "flex", alignItems: "center", overflow: "hidden" }}>
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `url('https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=1600&q=80')`,
          backgroundSize: "cover", backgroundPosition: "center",
          filter: "brightness(0.25)",
        }} />
        {/* Gradient overlay */}
        <div style={{ position: "absolute", inset: 0, background: dark ? "linear-gradient(135deg, rgba(10,10,20,0.85) 0%, rgba(10,15,30,0.6) 50%, rgba(245,200,66,0.05) 100%)" : "linear-gradient(135deg, rgba(10,10,20,0.75) 0%, rgba(10,15,30,0.5) 100%)" }} />

        {/* Decorative circles */}
        {[...Array(3)].map((_, i) => (
          <div key={i} style={{
            position: "absolute",
            width: `${300 + i * 150}px`, height: `${300 + i * 150}px`,
            borderRadius: "50%",
            border: `1px solid rgba(245,200,66,${0.06 - i * 0.015})`,
            top: `${-50 + i * 20}px`, right: `${-50 + i * 30}px`,
            animation: `spin ${20 + i * 10}s linear infinite`,
          }} />
        ))}

        <div style={{ position: "relative", zIndex: 1, maxWidth: 900, margin: "0 auto", padding: "8rem 2rem 4rem", textAlign: "center" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", background: "rgba(245,200,66,0.12)", border: "1px solid rgba(245,200,66,0.3)", borderRadius: "50px", padding: "0.4rem 1.2rem", marginBottom: "2rem", animation: "fadeUp 0.6s ease forwards" }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#f5c842", display: "block", animation: "pulse 2s ease-in-out infinite" }} />
            <span style={{ color: "#f5c842", fontSize: "0.85rem", fontWeight: 500, letterSpacing: "0.1em" }}>NOW OPEN · EST. FEBRUARY 2026</span>
          </div>

          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(2.5rem, 7vw, 5.5rem)",
            fontWeight: 900, color: "#fff", lineHeight: 1.1, marginBottom: "1.25rem",
            animation: "fadeUp 0.8s ease 0.2s forwards", opacity: 0,
          }}>
            Welcome to<br /><span style={{ color: "#f5c842", WebkitTextStroke: "1px rgba(245,200,66,0.3)" }}>SUCCESS</span> LIBRARY
          </h1>
          <p style={{
            fontSize: "clamp(1rem, 2vw, 1.25rem)", color: "rgba(255,255,255,0.7)", lineHeight: 1.7, maxWidth: 600, margin: "0 auto 2.5rem",
            animation: "fadeUp 0.8s ease 0.4s forwards", opacity: 0,
            fontStyle: "italic",
          }}>
            A Peaceful and Modern Study Environment<br />for Serious Aspirants
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap", animation: "fadeUp 0.8s ease 0.6s forwards", opacity: 0 }}>
            <button onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}
              style={{
                background: "linear-gradient(135deg, #f5c842, #e8720c)", border: "none", borderRadius: "50px",
                padding: "0.9rem 2.5rem", color: "#fff", fontFamily: "'Outfit', sans-serif",
                fontWeight: 600, fontSize: "1rem", cursor: "pointer",
                boxShadow: "0 8px 30px rgba(245,200,66,0.4)", transition: "all 0.3s",
              }} onMouseOver={e => { e.target.style.transform = "translateY(-3px)"; e.target.style.boxShadow = "0 15px 40px rgba(245,200,66,0.5)"; }}
              onMouseOut={e => { e.target.style.transform = ""; e.target.style.boxShadow = "0 8px 30px rgba(245,200,66,0.4)"; }}>
              Explore Now ✨
            </button>
            <button onClick={() => window.open("https://docs.google.com/forms/d/e/1FAIpQLSf-MHfq7UkwyAvtEVl76uhq4jECFEe7tc4lUSlgzLPT0_HX7Q/viewform", "_blank")}
              style={{
                background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.25)", borderRadius: "50px",
                padding: "0.9rem 2.5rem", color: "#fff", fontFamily: "'Outfit', sans-serif",
                fontWeight: 600, fontSize: "1rem", cursor: "pointer", backdropFilter: "blur(10px)",
                transition: "all 0.3s",
              }} onMouseOver={e => { e.target.style.background = "rgba(255,255,255,0.15)"; e.target.style.transform = "translateY(-3px)"; }}
              onMouseOut={e => { e.target.style.background = "rgba(255,255,255,0.08)"; e.target.style.transform = ""; }}>
              Join Library 🎓
            </button>
          </div>

          <div style={{ marginTop: "5rem", display: "flex", gap: "2rem", justifyContent: "center", flexWrap: "wrap" }}>
            {["📍 Gopalganj, Bihar", "🕐 24×7 Open", "❄️ AC Study Hall"].map((item, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: "0.4rem",
                color: "rgba(255,255,255,0.65)", fontSize: "0.9rem",
                background: "rgba(255,255,255,0.05)", backdropFilter: "blur(10px)",
                padding: "0.4rem 1rem", borderRadius: "50px", border: "1px solid rgba(255,255,255,0.1)",
              }}>{item}</div>
            ))}
          </div>
        </div>
      </Section>

      {/* ─── FEATURES ─── */}
      <Section id="features" style={{ padding: "6rem 2rem" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <div style={{ color: "#f5c842", fontSize: "0.85rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "0.75rem" }}>Why Choose Us</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, color: dark ? "#fff" : "#111", lineHeight: 1.2 }}>
              Everything You Need to <span style={{ color: "#f5c842" }}>Succeed</span>
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.25rem" }}>
            {FEATURES.map((f, i) => <FeatureCard key={i} {...f} dark={dark} index={i} />)}
          </div>
        </div>
      </Section>

      {/* ─── STATS ─── */}
      <Section id="stats" style={{ padding: "5rem 2rem", background: "linear-gradient(135deg, #1a1200, #0a0a14, #1a0d00)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: `url('https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1200&q=40')`, backgroundSize: "cover", backgroundPosition: "center", opacity: 0.05 }} />
        <div style={{ position: "relative", maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: "#fff", fontWeight: 800 }}>Our <span style={{ color: "#f5c842" }}>Numbers</span> Speak</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
            {STATS.map((s, i) => <Counter key={i} {...s} />)}
          </div>
        </div>
      </Section>

      {/* ─── ABOUT ─── */}
      <Section id="about" style={{ padding: "6rem 2rem" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }}>
          <div>
            <div style={{ color: "#f5c842", fontSize: "0.85rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "0.75rem" }}>Our Story</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 3.5vw, 3rem)", fontWeight: 800, color: dark ? "#fff" : "#111", lineHeight: 1.2, marginBottom: "1.5rem" }}>
              About <span style={{ color: "#f5c842" }}>SUCCESS LIBRARY</span>
            </h2>
            <p style={{ color: dark ? "rgba(255,255,255,0.65)" : "#555", lineHeight: 1.8, marginBottom: "1.25rem", fontSize: "0.97rem" }}>
              SUCCESS LIBRARY was established on <strong style={{ color: "#f5c842" }}>27 February 2026</strong> with the vision of creating a peaceful, disciplined and motivating study environment for students preparing for competitive examinations and academic success.
            </p>
            <p style={{ color: dark ? "rgba(255,255,255,0.65)" : "#555", lineHeight: 1.8, marginBottom: "2rem", fontSize: "0.97rem" }}>
              We believe every student deserves a world-class study space. Our library brings together the finest amenities — air conditioning, high-speed WiFi, comfortable seating, and a community of serious aspirants — in the heart of Gopalganj.
            </p>

            {/* Mission & Vision */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "2rem" }}>
              {[
                { icon: "🎯", title: "Our Mission", text: "To provide a distraction-free, clean, comfortable and productive study environment where every student can focus on achieving their goals." },
                { icon: "🔭", title: "Our Vision", text: "To become the most trusted and student-friendly study library in Gopalganj and inspire thousands of students to achieve excellence." }
              ].map((item, i) => (
                <div key={i} style={{
                  background: dark ? "rgba(245,200,66,0.05)" : "rgba(245,200,66,0.08)",
                  border: "1px solid rgba(245,200,66,0.2)", borderRadius: "16px", padding: "1.25rem",
                  display: "flex", gap: "1rem", alignItems: "flex-start",
                }}>
                  <span style={{ fontSize: "1.5rem" }}>{item.icon}</span>
                  <div>
                    <div style={{ fontWeight: 700, color: dark ? "#fff" : "#111", marginBottom: "0.3rem", fontFamily: "'Playfair Display', serif" }}>{item.title}</div>
                    <div style={{ color: dark ? "rgba(255,255,255,0.6)" : "#666", fontSize: "0.88rem", lineHeight: 1.6, fontStyle: "italic" }}>"{item.text}"</div>
                  </div>
                </div>
              ))}
            </div>

            {/* People */}
            <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
              {[{ label: "Founder", name: "Chandrashekhar Prasad", icon: "👤" }, { label: "Managed By", name: "Shubham Sir", icon: "🎓" }].map((p, i) => (
                <div key={i} style={{ background: dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)", borderRadius: "14px", padding: "1rem 1.5rem", border: dark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.06)" }}>
                  <div style={{ fontSize: "1.5rem", marginBottom: "0.25rem" }}>{p.icon}</div>
                  <div style={{ fontSize: "0.75rem", color: "#f5c842", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>{p.label}</div>
                  <div style={{ fontWeight: 700, color: dark ? "#fff" : "#111", fontFamily: "'Playfair Display', serif", fontSize: "1rem" }}>{p.name}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div>
            <div style={{ position: "relative", paddingLeft: "2rem" }}>
              <div style={{ position: "absolute", left: "1rem", top: 0, bottom: 0, width: 2, background: "linear-gradient(to bottom, #f5c842, rgba(245,200,66,0.1))" }} />
              {[
                { year: "Feb 2026", title: "Foundation", desc: "SUCCESS LIBRARY was conceptualized by Chandrashekhar Prasad with a mission to transform how students study in Gopalganj.", icon: "🌱" },
                { year: "27 Feb 2026", title: "Grand Launch", desc: "The doors opened to the first batch of students in a beautifully designed, fully air-conditioned study hall.", icon: "🚀" },
                { year: "Mar 2026", title: "First 100 Students", desc: "Within weeks, over 100 students enrolled, forming a community of driven and focused aspirants.", icon: "🎉" },
                { year: "Ongoing", title: "Growing Community", desc: "Continuously adding features, seats, and resources to serve more students on their path to success.", icon: "🏆" },
              ].map((item, i) => (
                <div key={i} style={{ marginBottom: "2rem", position: "relative", paddingLeft: "1.5rem" }}>
                  <div style={{
                    position: "absolute", left: "-0.85rem", top: "0.2rem",
                    width: 28, height: 28, borderRadius: "50%", fontSize: "0.9rem",
                    background: "linear-gradient(135deg, #f5c842, #e8720c)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    boxShadow: "0 0 15px rgba(245,200,66,0.4)",
                  }}>{item.icon}</div>
                  <div style={{ background: dark ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.8)", borderRadius: "16px", padding: "1.25rem 1.5rem", border: dark ? "1px solid rgba(255,255,255,0.07)" : "1px solid rgba(0,0,0,0.06)" }}>
                    <div style={{ color: "#f5c842", fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.25rem" }}>{item.year}</div>
                    <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, color: dark ? "#fff" : "#111", marginBottom: "0.4rem" }}>{item.title}</div>
                    <div style={{ color: dark ? "rgba(255,255,255,0.55)" : "#666", fontSize: "0.87rem", lineHeight: 1.6 }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ─── SERVICES ─── */}
      <Section id="services" style={{ padding: "6rem 2rem", background: dark ? "rgba(0,0,0,0.2)" : "rgba(0,0,0,0.03)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <div style={{ color: "#f5c842", fontSize: "0.85rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "0.75rem" }}>What We Offer</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, color: dark ? "#fff" : "#111", lineHeight: 1.2, marginBottom: "1rem" }}>
              Premium <span style={{ color: "#f5c842" }}>Services</span> for Students
            </h2>
            <p style={{ color: dark ? "rgba(255,255,255,0.55)" : "#777", maxWidth: 500, margin: "0 auto", fontSize: "0.97rem", lineHeight: 1.7 }}>
              Everything meticulously designed to help you study smarter, stay focused, and achieve more every single day.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.5rem" }}>
            {SERVICES.map((s, i) => <ServiceCard key={i} {...s} dark={dark} index={i} />)}
          </div>
        </div>
      </Section>

      {/* ─── GALLERY ─── */}
      <Section id="gallery" style={{ padding: "6rem 2rem" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <div style={{ color: "#f5c842", fontSize: "0.85rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "0.75rem" }}>Visual Tour</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, color: dark ? "#fff" : "#111", lineHeight: 1.2 }}>
              Inside <span style={{ color: "#f5c842" }}>SUCCESS LIBRARY</span>
            </h2>
          </div>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gridAutoRows: "200px",
            gap: "1rem",
          }}>
            {GALLERY_IMAGES.map((item, i) => <GalleryImage key={i} item={item} index={i} />)}
          </div>
        </div>
      </Section>

      {/* ─── JOIN / ADMISSION ─── */}
      <Section id="join" style={{ padding: "6rem 2rem", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, #1a0f00, #0a0a14, #001a10)", opacity: dark ? 1 : 0.85 }} />
        <div style={{ position: "absolute", inset: 0, backgroundImage: `url('https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&q=40')`, backgroundSize: "cover", backgroundPosition: "center", opacity: 0.07 }} />
        <div style={{ position: "relative", textAlign: "center", maxWidth: 700, margin: "0 auto" }}>
          <div style={{ fontSize: "3rem", marginBottom: "1.5rem", animation: "float 3s ease-in-out infinite" }}>🎓</div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 900, color: "#fff", lineHeight: 1.2, marginBottom: "1.25rem" }}>
            Join <span style={{ color: "#f5c842" }}>SUCCESS LIBRARY</span> Today
          </h2>
          <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "1.05rem", lineHeight: 1.8, marginBottom: "2.5rem" }}>
            Start your journey towards success with a peaceful and productive study environment. Join hundreds of serious aspirants who have made SUCCESS LIBRARY their second home.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={() => window.open("https://docs.google.com/forms/d/e/1FAIpQLSf-MHfq7UkwyAvtEVl76uhq4jECFEe7tc4lUSlgzLPT0_HX7Q/viewform", "_blank")}
              style={{
                background: "linear-gradient(135deg, #f5c842, #e8720c)",
                border: "none", borderRadius: "50px", padding: "1rem 3rem",
                color: "#fff", fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: "1.1rem",
                cursor: "pointer", boxShadow: "0 10px 40px rgba(245,200,66,0.45)", transition: "all 0.3s",
                letterSpacing: "0.03em",
              }} onMouseOver={e => { e.target.style.transform = "translateY(-4px)"; e.target.style.boxShadow = "0 20px 60px rgba(245,200,66,0.6)"; }}
              onMouseOut={e => { e.target.style.transform = ""; e.target.style.boxShadow = "0 10px 40px rgba(245,200,66,0.45)"; }}>
              Apply Now →
            </button>
          </div>
          <div style={{ marginTop: "2.5rem", display: "flex", gap: "2rem", justifyContent: "center", flexWrap: "wrap" }}>
            {["📞 Call Now", "💬 WhatsApp"].map((item, i) => (
              <div key={i} style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.9rem", display: "flex", alignItems: "center", gap: "0.4rem", cursor: "pointer" }}
                onClick={() => window.open(i === 0 ? "tel:9693744830" : "https://wa.me/919693744830", "_blank")}>
                {item}
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ─── CONTACT ─── */}
      <Section id="contact" style={{ padding: "6rem 2rem" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <div style={{ color: "#f5c842", fontSize: "0.85rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "0.75rem" }}>Get In Touch</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, color: dark ? "#fff" : "#111", lineHeight: 1.2 }}>
              Contact <span style={{ color: "#f5c842" }}>SUCCESS LIBRARY</span>
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", alignItems: "start" }}>
            {/* Contact Info */}
            <div>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", marginBottom: "2rem" }}>
                {[
                  { icon: "📍", title: "Address", text: "Badheya More, Barauli Road,\nGopalganj, Bihar" },
                  { icon: "📞", title: "Phone", text: "9693744830" },
                  { icon: "💬", title: "WhatsApp", text: "9693744830" },
                  { icon: "📸", title: "Instagram", text: "@ll_success_library_ll12" },
                ].map((item, i) => (
                  <div key={i} style={{
                    display: "flex", gap: "1rem", alignItems: "flex-start",
                    background: dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)",
                    borderRadius: "16px", padding: "1.25rem",
                    border: dark ? "1px solid rgba(255,255,255,0.07)" : "1px solid rgba(0,0,0,0.06)",
                  }}>
                    <span style={{ fontSize: "1.5rem", flexShrink: 0 }}>{item.icon}</span>
                    <div>
                      <div style={{ fontWeight: 700, color: dark ? "#fff" : "#111", marginBottom: "0.2rem", fontSize: "0.9rem" }}>{item.title}</div>
                      <div style={{ color: dark ? "rgba(255,255,255,0.6)" : "#666", fontSize: "0.88rem", whiteSpace: "pre-line" }}>{item.text}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {[
                  { label: "📞 Call Now", color: "#16a34a", action: () => window.open("tel:9693744830") },
                  { label: "💬 WhatsApp Us", color: "#25d366", action: () => window.open("https://wa.me/919693744830", "_blank") },
                  { label: "📸 Follow on Instagram", color: "#e1306c", action: () => window.open("https://www.instagram.com/ll_success_library_ll12/", "_blank") },
                ].map((btn, i) => (
                  <button key={i} onClick={btn.action} style={{
                    background: btn.color, border: "none", borderRadius: "12px", padding: "0.85rem 1.5rem",
                    color: "#fff", fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: "0.97rem",
                    cursor: "pointer", transition: "all 0.3s", textAlign: "left",
                  }} onMouseOver={e => { e.target.style.opacity = "0.85"; e.target.style.transform = "translateX(4px)"; }}
                  onMouseOut={e => { e.target.style.opacity = "1"; e.target.style.transform = ""; }}>
                    {btn.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Contact Form + Map */}
            <div>
              <div style={{
                background: dark ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.85)",
                border: dark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.08)",
                borderRadius: "24px", padding: "2rem", backdropFilter: "blur(10px)", marginBottom: "1.5rem",
              }}>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, color: dark ? "#fff" : "#111", marginBottom: "1.5rem", fontSize: "1.3rem" }}>Send a Message</h3>
                {formSent ? (
                  <div style={{ textAlign: "center", padding: "2rem", color: "#f5c842", fontSize: "1.1rem" }}>
                    ✅ Message sent! We'll get back to you soon.
                  </div>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                    {["name", "email"].map(field => (
                      <input key={field} type={field === "email" ? "email" : "text"} placeholder={field === "name" ? "Your Name" : "Your Email"}
                        value={contactForm[field]} onChange={e => setContactForm({ ...contactForm, [field]: e.target.value })}
                        style={{
                          background: dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.04)",
                          border: dark ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(0,0,0,0.1)",
                          borderRadius: "12px", padding: "0.9rem 1.1rem", color: dark ? "#fff" : "#111",
                          fontFamily: "'Outfit', sans-serif", fontSize: "0.95rem", outline: "none",
                        }} />
                    ))}
                    <textarea placeholder="Your Message" rows={4} value={contactForm.message}
                      onChange={e => setContactForm({ ...contactForm, message: e.target.value })}
                      style={{
                        background: dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.04)",
                        border: dark ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(0,0,0,0.1)",
                        borderRadius: "12px", padding: "0.9rem 1.1rem", color: dark ? "#fff" : "#111",
                        fontFamily: "'Outfit', sans-serif", fontSize: "0.95rem", outline: "none", resize: "vertical",
                      }} />
                    <button onClick={() => { if (contactForm.name && contactForm.email && contactForm.message) setFormSent(true); }}
                      style={{
                        background: "linear-gradient(135deg, #f5c842, #e8720c)", border: "none", borderRadius: "12px",
                        padding: "0.9rem", color: "#fff", fontFamily: "'Outfit', sans-serif", fontWeight: 600,
                        fontSize: "1rem", cursor: "pointer", transition: "all 0.3s",
                      }}>Send Message →</button>
                  </div>
                )}
              </div>

              {/* Map */}
              <div style={{ borderRadius: "20px", overflow: "hidden", border: dark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.08)", height: 250 }}>
                <iframe
                  title="SUCCESS LIBRARY Location"
                  width="100%" height="100%" frameBorder="0" style={{ border: 0 }}
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3568.5!2d84.4333!3d26.4714!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3992d700000000%3A0x0!2sGopalganj%2C+Bihar!5e0!3m2!1sen!2sin!4v1"
                  allowFullScreen referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ─── FOOTER ─── */}
      <footer style={{
        background: dark ? "#050508" : "#111",
        color: "rgba(255,255,255,0.7)", padding: "4rem 2rem 2rem",
        borderTop: "1px solid rgba(245,200,66,0.15)",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "2.5rem", marginBottom: "3rem" }}>
            {/* Brand */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
                <div style={{ width: 44, height: 44, borderRadius: "12px", background: "linear-gradient(135deg, #f5c842, #e8720c)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.4rem" }}>📖</div>
                <div>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 800, fontSize: "1.1rem", color: "#fff", lineHeight: 1.1 }}>SUCCESS</div>
                  <div style={{ fontSize: "0.65rem", letterSpacing: "0.3em", color: "#f5c842", fontWeight: 600 }}>LIBRARY</div>
                </div>
              </div>
              <p style={{ fontSize: "0.87rem", lineHeight: 1.7, maxWidth: 220 }}>Your path to success starts here. A premium study space for serious aspirants in Gopalganj.</p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 style={{ color: "#f5c842", fontWeight: 700, marginBottom: "1rem", fontFamily: "'Playfair Display', serif", fontSize: "1rem" }}>Quick Links</h4>
              {NAV_LINKS.map(l => (
                <div key={l} style={{ marginBottom: "0.6rem" }}>
                  <button onClick={() => document.getElementById(l.toLowerCase())?.scrollIntoView({ behavior: "smooth" })}
                    style={{ background: "none", border: "none", color: "rgba(255,255,255,0.6)", cursor: "pointer", fontFamily: "'Outfit', sans-serif", fontSize: "0.9rem", padding: 0, transition: "color 0.2s" }}
                    onMouseOver={e => e.target.style.color = "#f5c842"} onMouseOut={e => e.target.style.color = "rgba(255,255,255,0.6)"}>
                    → {l}
                  </button>
                </div>
              ))}
            </div>

            {/* Services */}
            <div>
              <h4 style={{ color: "#f5c842", fontWeight: 700, marginBottom: "1rem", fontFamily: "'Playfair Display', serif", fontSize: "1rem" }}>Services</h4>
              {["24/7 Open", "AC Study Hall", "High-Speed WiFi", "Clean Water", "Silent Zone", "Motivational Space"].map(s => (
                <div key={s} style={{ marginBottom: "0.6rem", fontSize: "0.9rem", color: "rgba(255,255,255,0.6)" }}>✓ {s}</div>
              ))}
            </div>

            {/* Contact */}
            <div>
              <h4 style={{ color: "#f5c842", fontWeight: 700, marginBottom: "1rem", fontFamily: "'Playfair Display', serif", fontSize: "1rem" }}>Contact</h4>
              <div style={{ fontSize: "0.88rem", lineHeight: 1.9 }}>
                <div>📍 Badheya More, Barauli Road</div>
                <div style={{ paddingLeft: "1.5rem" }}>Gopalganj, Bihar</div>
                <div>📞 9693744830</div>
                <div>⏰ Open 24 Hours, 7 Days</div>
              </div>
              <div style={{ display: "flex", gap: "0.75rem", marginTop: "1.25rem" }}>
                {[
                  { icon: "📸", url: "https://www.instagram.com/ll_success_library_ll12/" },
                  { icon: "💬", url: "https://wa.me/919693744830" },
                  { icon: "📞", url: "tel:9693744830" },
                ].map((s, i) => (
                  <button key={i} onClick={() => window.open(s.url, "_blank")} style={{
                    width: 38, height: 38, borderRadius: "10px", background: "rgba(245,200,66,0.1)",
                    border: "1px solid rgba(245,200,66,0.2)", cursor: "pointer", fontSize: "1rem",
                    display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.25s",
                  }} onMouseOver={e => { e.target.style.background = "rgba(245,200,66,0.25)"; }}
                  onMouseOut={e => { e.target.style.background = "rgba(245,200,66,0.1)"; }}>
                    {s.icon}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
            <div style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.4)" }}>© 2026 SUCCESS LIBRARY. All Rights Reserved.</div>
            <div style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.35)" }}>Made with ❤️ for @satyadevloper</div>
          </div>
        </div>
      </footer>

      {/* ─── FLOATING WHATSAPP ─── */}
      <button onClick={() => window.open("https://wa.me/919693744830", "_blank")}
        style={{
          position: "fixed", bottom: "2rem", right: "2rem", zIndex: 50,
          width: 60, height: 60, borderRadius: "50%", background: "#25d366",
          border: "none", cursor: "pointer", fontSize: "1.6rem",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 8px 30px rgba(37,211,102,0.5)",
          animation: "pulse 2.5s ease-in-out infinite",
        }} title="Chat on WhatsApp">
        💬
      </button>

      <style>{`
        @media (max-width: 900px) {
          #about > div > div { grid-template-columns: 1fr !important; }
          #contact > div > div > div:last-child { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 768px) {
          #contact > div > div { grid-template-columns: 1fr !important; }
          #gallery > div > div { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 480px) {
          #gallery > div > div { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
