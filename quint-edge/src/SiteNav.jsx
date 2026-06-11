import { useState } from "react";
import { Link } from "react-router-dom";

/**
 * Shared, fully-responsive top navigation.
 * Desktop: logo · inline links · red "Contact Us" pill.
 * Mobile (<=860px): logo · animated hamburger that opens a full-width dropdown
 *   containing the links and the Contact button.
 * Sits transparently over each page's dark hero. Pass `active` to highlight
 * the current page ("home" | "about" | "services").
 */

const NAV_CSS = `
.qe-nav{display:flex;align-items:center;justify-content:space-between;gap:16px;
  position:relative;z-index:50;
  padding:clamp(20px,4vw,40px) clamp(20px,5vw,100px) 0;
  font-family:var(--body,'Archivo',system-ui,sans-serif)}
.qe-nav-logo{display:flex;align-items:center;flex:none}
.qe-nav-logo img{height:clamp(40px,5vw,56px);width:auto;display:block}

.qe-nav-menu{display:flex;align-items:center;gap:clamp(28px,4vw,52px)}
.qe-nav-links{display:flex;align-items:center;gap:clamp(28px,4vw,52px)}
.qe-nav-links a{color:#fff;text-decoration:none;font-size:18px;font-weight:500;
  opacity:.92;transition:opacity .2s,color .2s;white-space:nowrap}
.qe-nav-links a:hover{opacity:1}
.qe-nav-links a.active{color:var(--red,#DF0002);opacity:1}
.qe-nav-cta{background:var(--red,#DF0002);color:#fff;text-decoration:none;border:none;
  border-radius:32px;padding:16px 30px;font-size:17px;font-weight:600;cursor:pointer;
  white-space:nowrap;transition:transform .2s,filter .2s;display:inline-block}
.qe-nav-cta:hover{filter:brightness(1.08);transform:translateY(-1px)}

.qe-nav-burger{display:none;flex-direction:column;gap:6px;background:none;border:none;
  cursor:pointer;padding:8px;flex:none;z-index:60}
.qe-nav-burger span{width:26px;height:3px;background:#fff;border-radius:2px;
  transition:transform .3s ease,opacity .3s ease}
.qe-nav-burger.open span:nth-child(1){transform:translateY(9px) rotate(45deg)}
.qe-nav-burger.open span:nth-child(2){opacity:0}
.qe-nav-burger.open span:nth-child(3){transform:translateY(-9px) rotate(-45deg)}

@media(max-width:860px){
  .qe-nav-burger{display:flex}
  .qe-nav-menu{position:absolute;top:100%;left:0;right:0;flex-direction:column;
    align-items:stretch;gap:0;background:#161616;overflow:hidden;max-height:0;
    padding:0 clamp(20px,5vw,100px);
    transition:max-height .35s ease,padding .35s ease;
    box-shadow:0 18px 30px rgba(0,0,0,.45)}
  .qe-nav-menu.open{max-height:480px;padding:8px clamp(20px,5vw,100px) 26px}
  .qe-nav-links{flex-direction:column;align-items:stretch;gap:0;width:100%}
  .qe-nav-links a{padding:16px 2px;font-size:18px;border-bottom:1px solid rgba(255,255,255,.08)}
  .qe-nav-cta{margin-top:20px;text-align:center;padding:16px 30px}
}
`;

const LINKS = [
  { label: "Home", to: "/", key: "home" },
  { label: "About", to: "/about", key: "about" },
  { label: "Services", to: "/services", key: "services" },
  { label: "Blogs", to: "/blogs", key: "blogs" },
];
export default function SiteNav({ active = "" }) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <nav className="qe-nav">
      <style>{NAV_CSS}</style>

      <Link to="/" className="qe-nav-logo" onClick={close} aria-label="Quint Edge AI home">
        <img src="/logo.webp" alt="Quint Edge AI" />
      </Link>

      <button
        className={`qe-nav-burger ${open ? "open" : ""}`}
        onClick={() => setOpen((o) => !o)}
        aria-label="Toggle menu"
        aria-expanded={open}
      >
        <span /><span /><span />
      </button>

      <div className={`qe-nav-menu ${open ? "open" : ""}`}>
        <div className="qe-nav-links">
          {LINKS.map((l) =>
            l.to === "#" ? (
              <a key={l.key} href="#" onClick={close}>{l.label}</a>
            ) : (
              <Link
                key={l.key}
                to={l.to}
                className={active === l.key ? "active" : ""}
                onClick={close}
              >
                {l.label}
              </Link>
            )
          )}
        </div>
        <Link to="/contact" className="qe-nav-cta" onClick={close}>Contact Us</Link>
      </div>
    </nav>
  );
}
