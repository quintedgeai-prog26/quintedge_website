import { useState } from "react";
import { Link } from "react-router-dom";

/**
 * Quint Edge AI — Shared site footer.
 * Faithful build of the Figma "footer" frame:
 *   • dark #222 band, full-bleed background, content capped at 1280px
 *   • newsletter row  (heading + email input w/ red send button)  | contact + socials
 *   • brand logo (uploaded /public/footer-logo.webp) | two link columns
 *   • centered copyright line
 * Used on every page so the footer stays identical site-wide.
 */

const FOOTER_CSS = `
.qe-ft{background:#222222;color:#fff;font-family:var(--body,'Archivo',system-ui,sans-serif);width:100%}
.qe-ft *{box-sizing:border-box}
.qe-ft a{color:inherit;text-decoration:none}
.qe-ft-inner{max-width:1280px;margin:0 auto;padding:clamp(48px,6vw,72px) clamp(20px,5vw,80px) 28px}

/* ---------- newsletter row ---------- */
.qe-ft-top{display:flex;flex-wrap:wrap;justify-content:space-between;gap:clamp(32px,5vw,80px);
  padding-bottom:clamp(36px,5vw,56px);border-bottom:1px solid rgba(255,255,255,.16)}
.qe-ft-news{flex:1 1 520px;min-width:280px}
.qe-ft-h2{font-family:var(--display,'Syne',sans-serif);font-weight:600;
  font-size:clamp(28px,3.4vw,44px);line-height:1.12;max-width:14ch}
.qe-ft-form{display:flex;align-items:center;gap:12px;margin-top:clamp(28px,3vw,40px);
  max-width:560px;border-bottom:1.5px solid rgba(255,255,255,.32);padding-bottom:10px}
.qe-ft-form input{flex:1;background:transparent;border:none;outline:none;color:#fff;
  font-family:inherit;font-size:16px;padding:6px 2px}
.qe-ft-form input::placeholder{color:#9a9a9a}
.qe-ft-send{flex:none;width:42px;height:42px;border-radius:50%;border:none;cursor:pointer;
  background:var(--red,#DF0002);color:#fff;display:grid;place-items:center;transition:transform .2s,filter .2s}
.qe-ft-send:hover{transform:translateX(2px);filter:brightness(1.08)}

.qe-ft-contact{flex:0 0 auto;display:flex;flex-direction:column;gap:22px;min-width:220px}
.qe-ft-cline .qe-ft-label{display:block;font-size:14px;color:#9a9a9a;margin-bottom:6px}
.qe-ft-cline a{font-size:17px;color:#fff;transition:color .2s}
.qe-ft-cline a:hover{color:var(--red,#DF0002)}
.qe-ft-socials{display:flex;gap:14px;margin-top:2px}
.qe-ft-socials a{width:38px;height:38px;border-radius:50%;display:grid;place-items:center;
  color:#ddd;border:1px solid rgba(255,255,255,.28);transition:all .2s}
.qe-ft-socials a:hover{background:var(--red,#DF0002);color:#fff;border-color:var(--red,#DF0002)}

/* ---------- brand + links row ---------- */
.qe-ft-mid{display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;
  gap:clamp(32px,5vw,64px);padding:clamp(36px,4vw,48px) 0;border-bottom:1px solid rgba(255,255,255,.16)}
.qe-ft-logo{flex:0 0 auto}
.qe-ft-logo img{display:block;width:686.13px;height:150.63px;max-width:100%;object-fit:contain}
.qe-ft-links{display:flex;gap:clamp(40px,6vw,72px)}
.qe-ft-links ul{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:14px}
.qe-ft-links a{font-size:16px;color:#d6d6d6;transition:color .2s}
.qe-ft-links a:hover{color:#fff}

/* ---------- copyright ---------- */
.qe-ft-copy{text-align:center;font-size:14px;color:#bdbdbd;padding-top:24px}

@media (max-width:760px){
  .qe-ft-mid{justify-content:flex-start}
  .qe-ft-links{gap:48px}
  .qe-ft-h2{max-width:none}
  .qe-ft-logo img{height:auto}
}
`;

const ArrowR = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);
const Fb = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M14 9h3V5h-3c-2.2 0-4 1.8-4 4v2H7v4h3v6h4v-6h3l1-4h-4V9c0-.6.4-1 1-1z" /></svg>);
const In = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5A2.5 2.5 0 102.5 6 2.5 2.5 0 004.98 3.5zM3 8.98h4V21H3zM9 8.98h3.8v1.65h.05A4.17 4.17 0 0117 8.5c4 0 4.7 2.6 4.7 6V21h-4v-5.3c0-1.27 0-2.9-1.77-2.9s-2 1.38-2 2.8V21H9z" /></svg>);
const Gh = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 00-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.1-1.47-1.1-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.5 9.5 0 015 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0012 2z" /></svg>);
const Dr = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 1010 10A10 10 0 0012 2zm6.6 6.2a8.4 8.4 0 011.9 5.2c-.3-.06-3.2-.66-6.1-.3-.06-.16-.13-.32-.2-.49 3.1-1.27 4.3-3.1 4.4-3.27zM12 3.5a8.5 8.5 0 015.4 1.95c-.1.14-1.2 1.86-4.18 3a44 44 0 00-2.9-4.55A8.6 8.6 0 0112 3.5zM8.7 4.6a52 52 0 012.9 4.5c-3.7 1-7 .95-7.3.95A8.5 8.5 0 018.7 4.6zM3.5 12v-.22c.36 0 4.2.06 8.16-1.13.22.43.43.87.62 1.31-3.9 1.1-6.05 4.45-6.2 4.7A8.5 8.5 0 013.5 12zm8.5 8.5a8.46 8.46 0 01-5.2-1.78c.12-.25 1.6-3.07 5.85-4.56a35.3 35.3 0 011.83 6.5 8.5 8.5 0 01-2.48.84zm3.9-1.62a36.6 36.6 0 00-1.66-6.06c2.73-.43 5.12.28 5.42.38a8.52 8.52 0 01-3.76 5.68z" /></svg>);

const EMAIL = "quintedgeai@gmail.com";
const PHONE = "+91 8884825886";

export default function Footer() {
  const [email, setEmail] = useState("");

  const subscribe = () => {
    const subject = encodeURIComponent("Newsletter subscription");
    const body = encodeURIComponent(
      email ? `Please add this email to your newsletter: ${email}` : "I'd like to subscribe to your newsletter."
    );
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
    <footer className="qe-ft">
      <style>{FOOTER_CSS}</style>
      <div className="qe-ft-inner">

        {/* ---- newsletter + contact ---- */}
        <div className="qe-ft-top">
          <div className="qe-ft-news">
            <h2 className="qe-ft-h2">Stay ahead of the curve with bold insights</h2>
            <div className="qe-ft-form">
              <input
                type="email"
                placeholder="Enter your Email here"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && subscribe()}
                aria-label="Email address"
              />
              <button className="qe-ft-send" onClick={subscribe} aria-label="Subscribe">
                <ArrowR />
              </button>
            </div>
          </div>

          <div className="qe-ft-contact">
            <div className="qe-ft-cline">
              <span className="qe-ft-label">Email</span>
              <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            </div>
            <div className="qe-ft-cline">
              <span className="qe-ft-label">Phone</span>
              <a href={`tel:${PHONE.replace(/\s/g, "")}`}>{PHONE}</a>
            </div>
            <div className="qe-ft-socials">
              <a href="#" aria-label="Facebook"><Fb /></a>
              <a href="#" aria-label="LinkedIn"><In /></a>
              <a href="#" aria-label="GitHub"><Gh /></a>
              <a href="#" aria-label="Dribbble"><Dr /></a>
            </div>
          </div>
        </div>

        {/* ---- brand + links ---- */}
        <div className="qe-ft-mid">
          <Link to="/" className="qe-ft-logo" aria-label="Quint Edge AI home">
            <img src="/footer-logo.webp" alt="Quint Edge AI — Digital Agency" />
          </Link>
          <div className="qe-ft-links">
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/services">Service</Link></li>
              <li><a href="#">Works</a></li>
              <li><a href="#">Blogs</a></li>
            </ul>
            <ul>
              <li><Link to="/contact">Contact Us</Link></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms &amp; Condition</a></li>
            </ul>
          </div>
        </div>

        {/* ---- copyright ---- */}
        <div className="qe-ft-copy">&copy; 2026 Quint Edge AI. All Rights Reserved.</div>
      </div>
    </footer>
  );
}
