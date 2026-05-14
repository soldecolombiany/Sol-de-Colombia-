import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["Inicio", "Menú", "Nosotros", "Reservar"];

// ── Paleta de colores ──
const C = {
  bg:         "#F5F0E8",   // crema nude principal
  bgSoft:     "#EDE6D6",   // crema más cálido para secciones alternas
  bgCard:     "#FAF6EE",   // tarjetas
  brown:      "#3B2A1A",   // café oscuro (textos principales)
  brownMid:   "#6B4C2A",   // café medio
  brownLight: "#A08060",   // café claro / muted
  yellow:     "#F5C400",   // amarillo bandera Colombia
  blue:       "#2B3A8C",   // azul bandera Colombia
  blueDark:   "#1A2660",
  red:        "#C41230",   // rojo bandera Colombia
  border:     "rgba(59,42,26,0.12)",
};

const MENU_ITEMS = [
  {
    category: "Appetizers",
    accent: C.yellow,
    items: [
      { name: "Fried Calamari",            desc: "", price: "$20" },
      { name: "Guacamole with Chips",      desc: "", price: "$15" },
      { name: "Grilled Octopus",           desc: "", price: "$25" },
      { name: "Shrimp Cocktail",           desc: "", price: "$22" },
      { name: "Arepitas with Hogao",       desc: "", price: "$15" },
      { name: "Jalea Paisa",               desc: "", price: "$15" },
      { name: "Canastas de la Abuela",     desc: "", price: "$18" },
      { name: "Guacamole with Pork Belly", desc: "", price: "$22" },
      { name: "Crispy Shrimp",             desc: "", price: "$18" },
      { name: "Ceviche de Chicharron",     desc: "", price: "$22" },
    ],
  },
  {
    category: "Breakfast",
    accent: C.red,
    items: [
      { name: "Caleño Breakfast",                      desc: "", price: "$24" },
      { name: "Grilled Steak – Corn Cake with Cheese", desc: "", price: "$20" },
      { name: "Cacerol Eggs",                          desc: "", price: "$18" },
      { name: "American Breakfast",                    desc: "", price: "$18" },
    ],
  },
  {
    category: "Soups & Salads",
    accent: C.blue,
    items: [
      { name: "Caldo de Costilla",         desc: "",                                                              price: "$16" },
      { name: "Chicken Consomé",           desc: "",                                                              price: "$16" },
      { name: "Ensalada Sol with Avocado", desc: "Add grilled chicken +$2 · Add grilled steak +$5 · Add grilled shrimp +$5", price: "$15" },
      { name: "Caesar Salad with Chicken", desc: "",                                                              price: "$17" },
    ],
  },
  {
    category: "Traditional Dishes",
    accent: C.yellow,
    items: [
      { name: "Picada",                     desc: "",                                   price: "$50" },
      { name: "Bandeja Paisa \"El Sol\"",   desc: "",                                   price: "$48" },
      { name: "Chuleta Valluna",            desc: "",                                   price: "$28" },
      { name: "Onion Steak",               desc: "",                                   price: "$25" },
      { name: "Enchiladas",                desc: "Add chicken +$3 · Add steak +$5",    price: "$20" },
      { name: "Bandeja Paisa",             desc: "",                                   price: "$30" },
      { name: "Bandeja Paisa Montañera",   desc: "",                                   price: "$30" },
      { name: "Bistec a Caballo",          desc: "",                                   price: "$28" },
      { name: "Frijolada Paisa",           desc: "",                                   price: "$25" },
      { name: "Mini Picada",               desc: "",                                   price: "$35" },
      { name: "Lomo Saltado Pollo o Carne",desc: "",                                   price: "$27" },
      { name: "Lomo Saltado Entraña",      desc: "",                                   price: "$36" },
    ],
  },
  {
    category: "Chicken",
    accent: C.red,
    items: [
      { name: "Chicken Breast in Mushroom Sauce",  desc: "", price: "$28" },
      { name: "Breaded Breast",                    desc: "", price: "$22" },
      { name: "Chicken Breast in Hawaiian Sauce",  desc: "", price: "$30" },
      { name: "Pechuga al Limón",                  desc: "", price: "$30" },
      { name: "Grilled Chicken",                   desc: "", price: "$21" },
      { name: "Pechuga Gratinada con Maíz",        desc: "", price: "$30" },
      { name: "Pechuga con Camarones",             desc: "", price: "$30" },
    ],
  },
  {
    category: "Grill",
    accent: C.blue,
    items: [
      { name: "Rib-Eye",                    desc: "", price: "$45" },
      { name: "Entraña",                    desc: "", price: "$36" },
      { name: "Costilla a la Parrilla",     desc: "", price: "$34" },
      { name: "Burguer Sol de Colombia",    desc: "", price: "$24" },
      { name: "Chuleton de Cerdo",          desc: "", price: "$25" },
      { name: "Lomo de Cerdo a la Plancha", desc: "", price: "$24" },
      { name: "Grill Steak",                desc: "", price: "$22" },
    ],
  },
  {
    category: "From the Sea",
    accent: C.yellow,
    items: [
      { name: "Grilled Salmon",           desc: "", price: "$30" },
      { name: "Pargo Frito",              desc: "", price: "$42" },
      { name: "Arroz con Camarones",      desc: "", price: "$28" },
      { name: "Cazuela de Mariscos",      desc: "", price: "$35" },
      { name: "Fried Mojarra",            desc: "", price: "$28" },
      { name: "Camarones al Ajillo",      desc: "", price: "$30" },
      { name: "Corvina en Salsa Criolla", desc: "", price: "$25" },
      { name: "Mar y Tierra",             desc: "", price: "$48" },
      { name: "Salmon Cancun",            desc: "", price: "$45" },
    ],
  },
  {
    category: "Tacos & Fajitas",
    accent: C.red,
    items: [
      { name: "Fajitas Chicken",     desc: "", price: "$25" },
      { name: "Skirt Steak Fajitas", desc: "", price: "$35" },
      { name: "Fajitas Shrimp",      desc: "", price: "$32" },
      { name: "Fajitas Mix",         desc: "", price: "$35" },
      { name: "Skirt Steak Tacos",   desc: "", price: "$32" },
      { name: "Shrimp Tacos",        desc: "", price: "$25" },
    ],
  },
  {
    category: "Kids Menu",
    accent: C.blue,
    items: [
      { name: "Salchipapa",       desc: "", price: "$15" },
      { name: "Chicken Fingers",  desc: "", price: "$15" },
      { name: "Chicken Taquitos", desc: "", price: "$18" },
    ],
  },
];

const TESTIMONIALS = [
  { name: "María G.",   accent: C.yellow, text: "El ajiaco me transportó directo a Bogotá. Una experiencia única e irrepetible."           },
  { name: "Carlos R.",  accent: C.blue,   text: "La bandeja paisa es generosa y auténtica. El mejor restaurante colombiano de la ciudad."   },
  { name: "Sofía L.",   accent: C.red,    text: "Ambiente elegante, servicio impecable y sabores que no olvidarás jamás."                  },
];

// Logo embebido como Data URL para que funcione dentro del artifact
function LogoImg({ style = {}, fallbackStyle = {} }) {
  const [ok, setOk] = useState(true);
  return ok ? (
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Simple_smiley.svg/1200px-Simple_smiley.svg.png"
      alt=""
      onLoad={() => setOk(true)}
      onError={() => setOk(false)}
      style={{ display: "none" }}   // hidden probe — actual logo below
    />
  ) : null;
}

// Componente de logo SVG generado a partir del logo real (azul, amarillo, rojo)
function BrandLogo({ height = 48, dark = false }) {
  const textColor = dark ? "#FAF6EE" : C.brown;
  return (
    <svg height={height} viewBox="0 0 220 70" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Sol */}
      <circle cx="110" cy="32" r="18" fill={C.yellow} />
      {/* Rayos */}
      {[0,30,60,90,120,150,180,210,240,270,300,330].map((deg, i) => {
        const r = Math.PI * deg / 180;
        const x1 = 110 + 20 * Math.cos(r); const y1 = 32 + 20 * Math.sin(r);
        const x2 = 110 + 28 * Math.cos(r); const y2 = 32 + 28 * Math.sin(r);
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={C.yellow} strokeWidth="3" strokeLinecap="round" />;
      })}
      {/* S */}
      <text x="18" y="44" fontFamily="Georgia, serif" fontSize="44" fontWeight="300" fill={C.blue} fontStyle="italic">S</text>
      {/* OL */}
      <text x="140" y="44" fontFamily="Georgia, serif" fontSize="44" fontWeight="300" fill={C.blue} fontStyle="italic">l</text>
      {/* De Colombia */}
      <text x="55" y="62" fontFamily="Georgia, serif" fontSize="13" fill={C.red} fontStyle="italic" letterSpacing="1">De Colombia</text>
    </svg>
  );
}

export default function SolDeColombia() {
  const [visibleCards, setVisibleCards] = useState([]);
  const [formData, setFormData] = useState({ name: "", email: "", date: "", guests: "2", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const cardRefs = useRef([]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          const idx = parseInt(e.target.dataset.idx);
          setVisibleCards((p) => [...new Set([...p, idx])]);
        }
      }),
      { threshold: 0.12 }
    );
    cardRefs.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", background: C.bg, color: C.brown, minHeight: "100vh", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Lato:wght@300;400&display=swap');
        * { margin:0; padding:0; box-sizing:border-box; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: ${C.bgSoft}; }
        ::-webkit-scrollbar-thumb { background: ${C.yellow}; border-radius: 2px; }

        @keyframes fadeUp {
          from { opacity:0; transform:translateY(36px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes floatY {
          0%,100% { transform: translateY(0); }
          50%      { transform: translateY(-14px); }
        }

        .a1 { animation: fadeUp 1s 0.1s ease both; }
        .a2 { animation: fadeUp 1s 0.3s ease both; }
        .a3 { animation: fadeUp 1s 0.5s ease both; }
        .a4 { animation: fadeUp 1s 0.7s ease both; }

        .nav-link {
          font-family:'Lato',sans-serif; font-size:0.68rem; letter-spacing:0.22em;
          text-transform:uppercase; color:${C.brownMid}; cursor:pointer;
          background:none; border:none; padding:6px 0; position:relative; transition:color .3s;
        }
        .nav-link::after {
          content:''; position:absolute; bottom:0; left:0; width:0; height:2px;
          background:${C.yellow}; transition:width .3s;
        }
        .nav-link:hover { color:${C.blue}; }
        .nav-link:hover::after { width:100%; }

        .btn-primary {
          display:inline-block; padding:13px 40px; background:${C.blue}; color:#fff;
          font-family:'Lato',sans-serif; font-size:0.7rem; letter-spacing:0.24em;
          text-transform:uppercase; border:none; cursor:pointer;
          transition:background .3s, transform .2s;
        }
        .btn-primary:hover { background:${C.blueDark}; transform:translateY(-2px); }

        .btn-outline {
          display:inline-block; padding:12px 36px; background:transparent; color:${C.brown};
          font-family:'Lato',sans-serif; font-size:0.7rem; letter-spacing:0.24em;
          text-transform:uppercase; border:1.5px solid ${C.brownMid}; cursor:pointer;
          transition:all .3s;
        }
        .btn-outline:hover { background:${C.brown}; color:${C.bgCard}; transform:translateY(-2px); }

        .menu-card {
          background:${C.bgCard}; border:1px solid ${C.border};
          border-top:3px solid ${C.yellow};
          padding:26px 22px; opacity:0; transform:translateY(28px);
          transition:box-shadow .35s, transform .35s;
        }
        .menu-card.vis { animation:fadeUp .65s ease forwards; }
        .menu-card:hover { box-shadow:0 8px 28px rgba(59,42,26,.1); transform:translateY(-4px)!important; }

        .stat-box {
          padding:28px 20px; border:1px solid ${C.border};
          background:${C.bgCard}; text-align:center;
          transition:border-color .3s, box-shadow .3s;
        }
        .stat-box:hover { border-color:${C.yellow}; box-shadow:0 4px 18px rgba(245,196,0,.15); }

        .testi-card {
          padding:34px 30px; border-left:3px solid ${C.yellow};
          background:${C.bgCard}; transition:border-left-color .3s;
        }

        .form-input {
          width:100%; background:${C.bgCard}; border:none;
          border-bottom:2px solid ${C.brownLight}; color:${C.brown};
          padding:13px 4px; font-family:'Cormorant Garamond',Georgia,serif;
          font-size:1.05rem; outline:none; transition:border-bottom-color .3s;
        }
        .form-input:focus { border-bottom-color:${C.blue}; }
        .form-input::placeholder { color:${C.brownLight}; font-style:italic; }

        .section-tag {
          font-family:'Lato',sans-serif; font-size:0.6rem; letter-spacing:0.42em;
          text-transform:uppercase; color:${C.red}; font-weight:400;
        }

        .float-logo { animation: floatY 7s ease-in-out infinite; }
        .flag-bar { display:flex; height:5px; }
      `}</style>

      {/* ════ NAVBAR ════ */}
      <nav style={{
        position:"fixed", top:0, left:0, right:0, zIndex:100,
        height:"66px", padding:"0 6vw",
        display:"flex", alignItems:"center", justifyContent:"space-between",
        background:"rgba(245,240,232,0.96)", backdropFilter:"blur(10px)",
        borderBottom:`1px solid ${C.border}`,
        boxShadow:"0 2px 12px rgba(59,42,26,.07)",
      }}>
        <BrandLogo height={44} />
        <div style={{ display:"flex", gap:"34px", alignItems:"center" }}>
          {NAV_LINKS.map((l) => (
            <button key={l} className="nav-link" onClick={() => scrollTo(l.toLowerCase())}>{l}</button>
          ))}
          <button className="btn-primary" style={{ padding:"9px 22px", fontSize:"0.65rem" }} onClick={() => scrollTo("reservar")}>
            Reservar
          </button>
        </div>
      </nav>

      {/* ════ HERO ════ */}
      <section id="inicio" style={{
        minHeight:"100vh", display:"flex", alignItems:"center",
        padding:"120px 6vw 80px",
        background:`linear-gradient(140deg, ${C.bg} 52%, ${C.bgSoft} 100%)`,
        position:"relative", overflow:"hidden",
      }}>
        {/* Franjas bandera al fondo */}
        <div style={{ position:"absolute", top:0, right:0, width:"35vw", height:"100%", display:"flex", flexDirection:"column", opacity:0.07, pointerEvents:"none" }}>
          <div style={{ flex:2, background:C.yellow }} />
          <div style={{ flex:1, background:C.blue }} />
          <div style={{ flex:1, background:C.red }} />
        </div>

        {/* Logo flotante hero */}
        <div className="float-logo" style={{
          position:"absolute", right:"5vw", top:"50%", transform:"translateY(-50%)",
          width:"clamp(240px,34vw,500px)", opacity:0.95, pointerEvents:"none",
          filter:"drop-shadow(0 16px 48px rgba(245,196,0,.22))",
        }}>
          <BrandLogo height={240} />
        </div>

        {/* Texto */}
        <div style={{ maxWidth:"540px", position:"relative", zIndex:2 }}>
          <p className="section-tag a1" style={{ marginBottom:"20px" }}>Auténtica cocina colombiana</p>

          <h1 className="a2" style={{
            fontFamily:"'Cormorant Garamond',Georgia,serif",
            fontSize:"clamp(3.2rem,8vw,6.5rem)", fontWeight:300,
            lineHeight:0.95, letterSpacing:"-0.02em",
            color:C.brown, marginBottom:"24px",
          }}>
            Sol<br /><em style={{ color:C.blue }}>de</em><br />
            <span style={{ color:C.red }}>Colombia</span>
          </h1>

          {/* Mini franja bandera */}
          <div className="a2 flag-bar" style={{ marginBottom:"26px", borderRadius:"2px", overflow:"hidden", width:"180px" }}>
            <div style={{ flex:2, background:C.yellow }} />
            <div style={{ flex:1, background:C.blue }} />
            <div style={{ flex:1, background:C.red }} />
          </div>

          <p className="a3" style={{
            fontFamily:"'Cormorant Garamond',Georgia,serif",
            fontSize:"clamp(1rem,2vw,1.18rem)", fontStyle:"italic",
            color:C.brownMid, lineHeight:1.85, maxWidth:"400px", marginBottom:"38px",
          }}>
            Donde los sabores del trópico se encuentran con la elegancia. Una experiencia culinaria que honra nuestras raíces y celebra el presente.
          </p>

          <div className="a4" style={{ display:"flex", gap:"14px", flexWrap:"wrap" }}>
            <button className="btn-primary" onClick={() => scrollTo("reservar")}>Reservar Mesa</button>
            <button className="btn-outline" onClick={() => scrollTo("menú")}>Ver Menú</button>
          </div>
        </div>
      </section>

      {/* Franja bandera */}
      <div className="flag-bar">
        <div style={{ flex:2, background:C.yellow }} />
        <div style={{ flex:1, background:C.blue }} />
        <div style={{ flex:1, background:C.red }} />
      </div>

      {/* ════ NOSOTROS ════ */}
      <section id="nosotros" style={{ padding:"100px 6vw", background:C.bgSoft }}>
        <div style={{ maxWidth:"1100px", margin:"0 auto", display:"grid", gridTemplateColumns:"1fr 1fr", gap:"80px", alignItems:"center" }}>
          <div>
            <p className="section-tag" style={{ marginBottom:"16px" }}>Nuestra historia</p>
            <h2 style={{
              fontFamily:"'Cormorant Garamond',Georgia,serif",
              fontSize:"clamp(2.2rem,4.5vw,3.8rem)", fontWeight:300,
              lineHeight:1.1, color:C.brown, marginBottom:"26px",
            }}>
              Un viaje al<br /><em style={{ color:C.blue }}>corazón</em><br />
              de <span style={{ color:C.red }}>Colombia</span>
            </h2>
            <div style={{ width:"52px", height:"3px", background:`linear-gradient(90deg,${C.yellow},${C.red})`, borderRadius:"2px", marginBottom:"26px" }} />
            <p style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:"1.1rem", fontStyle:"italic", color:C.brownMid, lineHeight:1.9, marginBottom:"18px" }}>
              "Fundado con el sueño de llevar los auténticos sabores colombianos a cada mesa, Sol de Colombia es más que un restaurante: es un abrazo a nuestra tierra."
            </p>
            <p style={{ fontFamily:"'Lato',sans-serif", fontSize:"0.84rem", color:C.brownLight, lineHeight:1.85, fontWeight:300 }}>
              Cada plato es preparado con ingredientes seleccionados y recetas heredadas de generación en generación. Desde la costa hasta el interior andino, nuestra cocina es un mapa de sabores, colores y memorias.
            </p>
          </div>

        </div>
      </section>

      {/* ════ MENÚ ════ */}
      <section id="menú" style={{ padding:"100px 6vw", background:C.bg }}>
        <div style={{ maxWidth:"1100px", margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:"68px" }}>
            <p className="section-tag" style={{ marginBottom:"14px" }}>Carta</p>
            <h2 style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:"clamp(2.2rem,4.5vw,3.5rem)", fontWeight:300, color:C.brown, marginBottom:"18px" }}>
              Nuestro <em style={{ color:C.blue }}>Menú</em>
            </h2>
            <div style={{ display:"flex", justifyContent:"center" }}>
              <div style={{ width:"60px", height:"3px", background:`linear-gradient(90deg,${C.yellow},${C.blue},${C.red})`, borderRadius:"2px" }} />
            </div>
          </div>

          {MENU_ITEMS.map((section, si) => (
            <div key={section.category} style={{ marginBottom:"54px" }}>
              <div style={{ display:"flex", alignItems:"center", gap:"14px", marginBottom:"22px" }}>
                <div style={{ width:"12px", height:"12px", borderRadius:"50%", background:section.accent, flexShrink:0 }} />
                <h3 style={{ fontFamily:"'Lato',sans-serif", fontSize:"0.65rem", letterSpacing:"0.36em", textTransform:"uppercase", color:C.brownMid }}>
                  {section.category}
                </h3>
                <div style={{ flex:1, height:"1px", background:C.border }} />
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(270px,1fr))", gap:"14px" }}>
                {section.items.map((item, ii) => {
                  const idx = si * 3 + ii;
                  return (
                    <div
                      key={item.name}
                      className={`menu-card${visibleCards.includes(idx) ? " vis" : ""}`}
                      data-idx={idx}
                      ref={(el) => (cardRefs.current[idx] = el)}
                      style={{ animationDelay:`${ii * 0.1}s`, borderTopColor:section.accent }}
                    >
                      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"10px" }}>
                        <h4 style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:"1.2rem", fontWeight:400, color:C.brown, flex:1, paddingRight:"12px" }}>
                          {item.name}
                        </h4>
                        <span style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:"1.1rem", color:section.accent, fontStyle:"italic", whiteSpace:"nowrap", fontWeight:600 }}>
                          {item.price}
                        </span>
                      </div>
                      <p style={{ fontFamily:"'Lato',sans-serif", fontSize:"0.78rem", color:C.brownLight, lineHeight:1.65, fontWeight:300 }}>
                        {item.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Franja */}
      <div className="flag-bar" style={{ height:"4px" }}>
        <div style={{ flex:2, background:C.yellow }} />
        <div style={{ flex:1, background:C.blue }} />
        <div style={{ flex:1, background:C.red }} />
      </div>

      {/* ════ TESTIMONIOS ════ */}
      <section style={{ padding:"100px 6vw", background:C.bgSoft }}>
        <div style={{ maxWidth:"1100px", margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:"54px" }}>
            <p className="section-tag" style={{ marginBottom:"14px" }}>Experiencias</p>
            <h2 style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:"clamp(2rem,4vw,3rem)", fontWeight:300, color:C.brown }}>
              Lo que dicen nuestros <em style={{ color:C.blue }}>huéspedes</em>
            </h2>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:"20px" }}>
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="testi-card" style={{ borderLeftColor:t.accent }}>
                <p style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:"1.12rem", fontStyle:"italic", color:C.brownMid, lineHeight:1.85, marginBottom:"22px" }}>
                  "{t.text}"
                </p>
                <div style={{ display:"flex", alignItems:"center", gap:"12px" }}>
                  <div style={{ width:"26px", height:"2px", background:t.accent }} />
                  <span style={{ fontFamily:"'Lato',sans-serif", fontSize:"0.65rem", letterSpacing:"0.18em", color:C.brownMid, textTransform:"uppercase" }}>{t.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════ RESERVAR ════ */}
      <section id="reservar" style={{ padding:"100px 6vw", background:C.bg }}>
        <div style={{ maxWidth:"600px", margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:"54px" }}>
            <p className="section-tag" style={{ marginBottom:"14px" }}>Reservaciones</p>
            <h2 style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:"clamp(2.2rem,4.5vw,3.5rem)", fontWeight:300, color:C.brown, marginBottom:"18px" }}>
              Reserve su <em style={{ color:C.blue }}>mesa</em>
            </h2>
            <div style={{ display:"flex", justifyContent:"center" }}>
              <div style={{ width:"60px", height:"3px", background:`linear-gradient(90deg,${C.yellow},${C.blue},${C.red})`, borderRadius:"2px" }} />
            </div>
          </div>

          {submitted ? (
            <div style={{ textAlign:"center", padding:"56px 40px", border:`1px solid ${C.border}`, background:C.bgCard }}>
              <div style={{ fontSize:"3rem", marginBottom:"18px" }}>☀️</div>
              <h3 style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:"1.9rem", fontWeight:300, color:C.blue, marginBottom:"14px" }}>
                ¡Reserva confirmada!
              </h3>
              <p style={{ fontFamily:"'Lato',sans-serif", fontSize:"0.85rem", color:C.brownLight, lineHeight:1.75 }}>
                Gracias, <strong style={{ color:C.brown }}>{formData.name}</strong>. Nos pondremos en contacto para confirmar su reserva. ¡Hasta pronto!
              </p>
            </div>
          ) : (
            <div style={{ display:"flex", flexDirection:"column", gap:"18px" }}>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"16px" }}>
                <input className="form-input" type="text"  placeholder="Nombre completo"    value={formData.name}  onChange={(e)=>setFormData({...formData,name:e.target.value})} />
                <input className="form-input" type="email" placeholder="Correo electrónico" value={formData.email} onChange={(e)=>setFormData({...formData,email:e.target.value})} />
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"16px" }}>
                <input className="form-input" type="date" value={formData.date} onChange={(e)=>setFormData({...formData,date:e.target.value})} />
                <select className="form-input" value={formData.guests} onChange={(e)=>setFormData({...formData,guests:e.target.value})} style={{ cursor:"pointer" }}>
                  {[1,2,3,4,5,6,7,8].map(n=>(
                    <option key={n} value={n} style={{ background:C.bgCard }}>{n} {n===1?"persona":"personas"}</option>
                  ))}
                </select>
              </div>
              <textarea className="form-input" placeholder="Ocasión especial, preferencias o restricciones alimentarias..." rows={4} value={formData.message} onChange={(e)=>setFormData({...formData,message:e.target.value})} style={{ resize:"vertical" }} />
              <div style={{ textAlign:"center", marginTop:"8px" }}>
                <button
                  className="btn-primary"
                  onClick={()=>{ if(formData.name&&formData.email&&formData.date) setSubmitted(true); }}
                >
                  Confirmar Reserva
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ════ FOOTER ════ */}
      <footer style={{ background:C.brown, color:C.bgSoft, padding:"60px 6vw 32px" }}>
        <div style={{ maxWidth:"1100px", margin:"0 auto" }}>
          <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr", gap:"60px", marginBottom:"46px" }}>
            <div>
              <div style={{ marginBottom:"18px" }}>
                <BrandLogo height={52} dark />
              </div>
              <p style={{ fontFamily:"'Lato',sans-serif", fontSize:"0.8rem", color:C.brownLight, lineHeight:1.85, fontWeight:300, maxWidth:"280px" }}>
                Auténtica cocina colombiana en un ambiente de elegancia y calidez. Una experiencia para todos los sentidos.
              </p>
            </div>
            <div>
              <p style={{ fontFamily:"'Lato',sans-serif", fontSize:"0.6rem", letterSpacing:"0.32em", textTransform:"uppercase", color:C.yellow, marginBottom:"16px" }}>Horario</p>
              <div style={{ fontFamily:"'Lato',sans-serif", fontSize:"0.82rem", color:C.brownLight, lineHeight:2.1, fontWeight:300 }}>
                
                <div>Bakery: Daily 6 AM – 10 PM</div>
                <div style={{marginTop:"6px"}}>Lun – Mié: 12 PM – 10 PM</div>
                <div>Jue – Sáb: 12 PM – 11 PM</div>
                <div>Dom: 11 AM – 10 PM</div>
              </div>
            </div>
            <div>
              <p style={{ fontFamily:"'Lato',sans-serif", fontSize:"0.6rem", letterSpacing:"0.32em", textTransform:"uppercase", color:C.yellow, marginBottom:"16px" }}>Contacto</p>
              <div style={{ fontFamily:"'Lato',sans-serif", fontSize:"0.82rem", color:C.brownLight, lineHeight:2.1, fontWeight:300 }}>
                <div>718-819-8135</div>
                <div>@soldecolombiany</div>
                <div style={{marginTop:"6px",color:"#F5C400",fontWeight:400}}>Uber Eats · Grubhub</div>
                <div>Catering for All Occasions</div>
                <div>34-47 Bell Blvd, Bayside NY 11361</div>
              </div>
            </div>
          </div>

          <div className="flag-bar" style={{ height:"3px", marginBottom:"28px", borderRadius:"2px", overflow:"hidden" }}>
            <div style={{ flex:2, background:C.yellow }} />
            <div style={{ flex:1, background:C.blue }} />
            <div style={{ flex:1, background:C.red }} />
          </div>

          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <p style={{ fontFamily:"'Lato',sans-serif", fontSize:"0.63rem", color:C.brownLight, letterSpacing:"0.08em", fontWeight:300 }}>
              © 2026 Sol de Colombia. Todos los derechos reservados.
            </p>
            <p style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:"0.9rem", fontStyle:"italic", color:C.brownLight }}>
              Hecho con amor ☀️
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
