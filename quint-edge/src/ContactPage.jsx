import { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import SiteNav from "./SiteNav";

/**
 * Quint Edge AI — Contact Page
 * Faithful replica of the Figma Contact design, reusing the shared design
 * system (Monument Extended + Archivo, red #DF0002). Drop into the same
 * project as the other pages. Fonts resolve from /public/fonts/.
 */

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Archivo:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Syne:wght@400;500;600;700;800&display=swap');
@font-face{font-family:'Monument Extended';src:url('/fonts/MonumentExtended-Regular.woff2') format('woff2'),url('/fonts/MonumentExtended-Regular.otf') format('opentype');font-weight:400;font-style:normal;font-display:swap}
@font-face{font-family:'Monument Extended';src:url('/fonts/MonumentExtended-Ultrabold.woff2') format('woff2'),url('/fonts/MonumentExtended-Ultrabold.otf') format('opentype');font-weight:800;font-style:normal;font-display:swap}

.qe-contact{
  --red:#DF0002;--dark:#161616;--light:#FAFAFA;--t-444:#444444;--t-666:#666666;--t-aaa:#AAAAAA;--bd:#E2E2E2;
  --display:'Monument Extended','Syne',sans-serif;--body:'Archivo',system-ui,sans-serif;
  font-family:var(--body);color:#000;background:#fff;overflow-x:hidden
}
.qe-contact *{margin:0;padding:0;box-sizing:border-box}
.qe-contact .disp{font-family:var(--display)}
.qe-contact .canvas{width:100%;max-width:none;margin:0 auto;position:relative}

/* hero + nav */
.qe-contact .hero{background:var(--dark) url('/hero-bg.webp') center/cover no-repeat;color:#fff;padding-bottom:90px}
.qe-contact .nav{display:flex;align-items:center;justify-content:space-between;padding:32px clamp(20px,5vw,100px) 0;flex-wrap:wrap;gap:16px}
.qe-contact .logo img{height:56px;width:auto;display:block}
.qe-contact .nav-links{display:flex;align-items:center;gap:44px}
.qe-contact .nav-links a{color:#fff;text-decoration:none;font-size:18px;font-weight:500;opacity:.9;transition:opacity .2s}
.qe-contact .nav-links a:hover,.qe-contact .nav-links a.active{color:var(--red);opacity:1}
.qe-contact .btn-contact{background:var(--red);color:#fff;border:none;border-radius:32px;padding:16px 30px;font-family:var(--body);font-size:18px;font-weight:600;cursor:pointer;transition:transform .2s,filter .2s}
.qe-contact .btn-contact:hover{filter:brightness(1.08);transform:translateY(-1px)}
.qe-contact .hero-inner{text-align:center;padding:clamp(50px,7vw,90px) clamp(20px,5vw,100px) 0}
.qe-contact .hero-title{font-family:var(--display);font-weight:800;font-size:clamp(44px,7vw,80px);line-height:1.05;letter-spacing:-1px;display:inline-flex;flex-wrap:wrap;justify-content:center;align-items:center;gap:16px}
.qe-contact .hero-title .hl{background:var(--red);color:#fff;border-radius:14px;padding:4px 24px 12px}
.qe-contact .hero-p{font-family:var(--body);font-size:clamp(16px,1.9vw,22px);line-height:1.7;color:#d8d8d8;max-width:900px;margin:30px auto 0}

/* contact section (white) */
.qe-contact .contact{background:#161616;padding:clamp(60px,8vw,100px) clamp(20px,5vw,100px);display:flex;flex-wrap:wrap;gap:clamp(40px,5vw,80px);align-items:flex-start}
.qe-contact .c-left{flex:1 1 440px;min-width:300px}
.qe-contact .pill{display:inline-block;border:1.5px solid #444;border-radius:30px;padding:10px 24px;font-family:var(--body);font-weight:600;font-size:15px;color:#fff}
.qe-contact .c-left h2{font-family:var(--display);font-weight:400;font-size:clamp(30px,4vw,42px);line-height:1.15;margin-top:24px;color:#fff}
.qe-contact .c-left h2 .r{color:var(--red)}
.qe-contact .c-left .lead{font-family:var(--body);font-size:16px;line-height:1.7;color:#d8d8d8;margin-top:24px;max-width:520px}
.qe-contact .c-info{margin-top:40px;display:flex;flex-direction:column;gap:22px}
.qe-contact .c-row{display:flex;gap:70px;flex-wrap:wrap}
.qe-contact .c-item .k{font-family:var(--body);font-size:14px;color:var(--t-aaa)}
.qe-contact .c-item .v{font-family:var(--body);font-size:16px;color:#fff;margin-top:4px}
.qe-contact .c-soc{display:flex;gap:12px;margin-top:6px}
.qe-contact .c-soc a{width:36px;height:36px;border-radius:50%;background:#111;color:#fff;display:grid;place-items:center;transition:background .2s}
.qe-contact .c-soc a:hover{background:var(--red)}

/* form card */
.qe-contact .c-form{flex:1 1 480px;min-width:320px;background:#1a1a1a;border:1px solid #333;border-radius:16px;padding:clamp(28px,3vw,40px);box-shadow:0 30px 60px rgba(0,0,0,.3)}
.qe-contact .frow{display:flex;flex-wrap:wrap;gap:24px;margin-bottom:22px}
.qe-contact .field{flex:1 1 200px;display:flex;flex-direction:column}
.qe-contact .field.full{flex:1 1 100%}
.qe-contact .field label{font-family:var(--body);font-weight:500;font-size:15px;color:#fff;margin-bottom:10px}
.qe-contact .field input,.qe-contact .field textarea{font-family:var(--body);font-size:15px;color:#fff;background:#252525;border:1px solid #333;border-radius:6px;padding:16px 20px;outline:none;width:100%;transition:border-color .2s}
.qe-contact .field input::placeholder,.qe-contact .field textarea::placeholder{color:#777}
.qe-contact .field input:focus,.qe-contact .field textarea:focus{border-color:var(--red)}
.qe-contact .field textarea{min-height:120px;resize:vertical}
.qe-contact .btn-submit{width:100%;background:var(--red);color:#fff;border:none;border-radius:8px;padding:17px;font-family:var(--body);font-weight:600;font-size:16px;cursor:pointer;margin-top:4px;transition:filter .2s}
.qe-contact .btn-submit:hover{filter:brightness(1.08)}

/* footer (dark) */
.qe-contact .footer{background:var(--dark);color:#fff;padding:60px clamp(20px,5vw,100px) 40px}
.qe-contact .fdivider{display:flex;align-items:center;gap:14px;margin-bottom:56px}
.qe-contact .fdivider .ln{height:2px;background:#3a3a3a;flex:1}
.qe-contact .fdivider .st{color:#fff}
.qe-contact .news{display:flex;flex-wrap:wrap;justify-content:space-between;gap:40px;padding-bottom:40px;border-bottom:1px solid #2c2c2c}
.qe-contact .news-left{flex:1 1 420px;max-width:560px}
.qe-contact .news-left h2{font-family:var(--display);font-weight:400;font-size:clamp(28px,3.4vw,40px);line-height:1.1}
.qe-contact .news-sub{display:flex;align-items:center;gap:14px;border-bottom:1px solid #444;margin-top:34px;max-width:430px}
.qe-contact .news-sub input{flex:1;background:transparent;border:none;outline:none;color:#fff;font-family:var(--body);font-size:16px;padding:12px 4px}
.qe-contact .news-sub input::placeholder{color:#8a8a8a}
.qe-contact .news-sub button{width:42px;height:42px;border-radius:50%;background:var(--red);color:#fff;border:none;display:grid;place-items:center;cursor:pointer;flex:none}
.qe-contact .news-right{flex:0 0 auto;display:flex;flex-direction:column;gap:14px}
.qe-contact .news-right .k{font-family:var(--body);font-size:13px;color:var(--t-aaa)}
.qe-contact .news-right .v{font-family:var(--body);font-size:16px;margin-top:2px}
.qe-contact .news-right .soc{display:flex;gap:12px;margin-top:6px}
.qe-contact .news-right .soc a{width:36px;height:36px;border-radius:50%;background:#262626;color:#fff;display:grid;place-items:center;transition:background .2s}
.qe-contact .news-right .soc a:hover{background:var(--red)}
.qe-contact .fbrand{display:flex;flex-wrap:wrap;justify-content:space-between;gap:40px;align-items:center;padding:44px 0}
.qe-contact .fword{display:flex;align-items:center;gap:16px}
.qe-contact .fword .wm{font-family:var(--display);font-weight:800;font-size:clamp(30px,3.6vw,42px);line-height:1;letter-spacing:1px}
.qe-contact .fword .wm .w{color:#fff}.qe-contact .fword .wm .r{color:var(--red)}
.qe-contact .fword .tagline{display:flex;align-items:center;gap:10px;margin-top:8px}
.qe-contact .fword .tagline .l{height:1px;width:34px;background:var(--red)}
.qe-contact .fword .tagline span{font-family:var(--body);font-size:12px;letter-spacing:.35em;color:#cfcfcf}
.qe-contact .fnav{display:flex;gap:70px}
.qe-contact .fnav ul{list-style:none;display:flex;flex-direction:column;gap:12px}
.qe-contact .fnav a{color:#e6e6e6;text-decoration:none;font-family:var(--body);font-size:15px;transition:color .2s}
.qe-contact .fnav a:hover{color:var(--red)}
.qe-contact .fcopy{text-align:center;border-top:1px solid #2c2c2c;padding-top:28px;font-family:var(--body);font-size:14px;color:#8a8a8a}

@media(max-width:1100px){
  .qe-contact .canvas{max-width:100%}
  .qe-contact .nav-links{display:none}
  .qe-contact .news,.qe-contact .fbrand{flex-direction:column;align-items:flex-start}
}
`;

const Arrow = ({ s = 22 }) => (<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>);
const Star = ({ s = 26 }) => (<svg className="st" width={s} height={s} viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c.6 6 5.4 10.8 12 12-6.6 1.2-11.4 6-12 12-.6-6-5.4-10.8-12-12C6.6 10.8 11.4 6 12 0z" /></svg>);
const QLogo = ({ s = 48 }) => (
  <svg width={s} height={s} viewBox="0 0 64 64" fill="none">
    <path d="M32 5 L57 23 V52 a3 3 0 0 1-3 3 H10 a3 3 0 0 1-3-3 V23 Z" stroke="#fff" strokeWidth="3" />
    <path d="M32 5 L57 23 H42 Z" fill="#DF0002" />
    <circle cx="31" cy="35" r="11" stroke="#fff" strokeWidth="3" />
    <line x1="37" y1="41" x2="45" y2="49" stroke="#DF0002" strokeWidth="4" strokeLinecap="round" />
  </svg>
);
const Fb = () => (<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M14 9h3V5h-3c-2.2 0-4 1.8-4 4v2H7v4h3v6h4v-6h3l1-4h-4V9c0-.6.4-1 1-1z" /></svg>);
const In = () => (<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5A2.5 2.5 0 102.5 6 2.5 2.5 0 004.98 3.5zM3 8.98h4V21H3zM9 8.98h3.8v1.65h.05A4.17 4.17 0 0117 8.5c4 0 4.7 2.6 4.7 6V21h-4v-5.3c0-1.27 0-2.9-1.77-2.9s-2 1.38-2 2.8V21H9z" /></svg>);
const Gh = () => (<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 00-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.1-1.47-1.1-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.5 9.5 0 015 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0012 2z" /></svg>);
const Dr = () => (<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 1010 10A10 10 0 0012 2zm6.6 6.2a8.4 8.4 0 011.9 5.2c-.3-.06-3.2-.66-6.1-.3-.06-.16-.13-.32-.2-.49 3.1-1.27 4.3-3.1 4.4-3.27zM12 3.5a8.5 8.5 0 015.4 1.95c-.1.14-1.2 1.86-4.18 3a44 44 0 00-2.9-4.55A8.6 8.6 0 0112 3.5zM8.7 4.6a52 52 0 012.9 4.5c-3.7 1-7 .95-7.3.95A8.5 8.5 0 018.7 4.6zM3.5 12v-.22c.36 0 4.2.06 8.16-1.13.22.43.43.87.62 1.31-3.9 1.1-6.05 4.45-6.2 4.7A8.5 8.5 0 013.5 12zm8.5 8.5a8.46 8.46 0 01-5.2-1.78c.12-.25 1.6-3.07 5.85-4.56a35.3 35.3 0 011.83 6.5 8.5 8.5 0 01-2.48.84zm3.9-1.62a36.6 36.6 0 00-1.66-6.06c2.73-.43 5.12.28 5.42.38a8.52 8.52 0 01-3.76 5.68z" /></svg>);

export default function ContactPage() {
  const [form, setForm] = useState({ first: "", last: "", email: "", phone: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const handleSubmit = (e) => { e.preventDefault(); setSent(true); };

  return (
    <div className="qe-contact">
      <style>{CSS}</style>
      <div className="canvas">

        {/* HERO */}
        <header className="hero">
          <SiteNav active="contact" />
          <div className="hero-inner">
            <h1 className="hero-title"><span>We&rsquo;re</span><span className="hl">here</span><span>to Help!</span></h1>
            <p className="hero-p">Have a project in mind or a question about automating and growing your business? Reach out and our team will get back to you within one business day.</p>
          </div>
        </header>

        {/* CONTACT */}
        <section className="contact">
          <div className="c-left">
            <span className="pill">Contact Us</span>
            <h2 className="disp">Have <span className="r">Questions?</span><br />We&rsquo;re Here to help!</h2>
            <p className="lead">Whether you want to automate operations, generate more leads, or grow your brand online, we&rsquo;d love to hear from you. Tell us a little about your goals and we&rsquo;ll put together the right plan for your business.</p>
            <div className="c-info">
              <div className="c-row">
                <div className="c-item"><div className="k">Email</div><div className="v">quintedgeai@gmail.com</div></div>
                <div className="c-item"><div className="k">Phone</div><div className="v">+91 8884825886</div></div>
              </div>
              <div className="c-item"><div className="k">Location</div><div className="v">Dharani Homes, Ramanshree California Gardens Layout,<br />Ananthpur Main Road, Yelahanka &ndash; 560064</div></div>
              <div className="c-item">
                <div className="k">Follow Us!</div>
                <div className="c-soc"><a href="#"><Fb /></a><a href="#"><In /></a><a href="#"><Gh /></a><a href="#"><Dr /></a></div>
              </div>
            </div>
          </div>

          <form className="c-form" onSubmit={handleSubmit}>
            <div className="frow">
              <div className="field"><label>First Name</label><input type="text" placeholder="Enter First Name" value={form.first} onChange={set("first")} required /></div>
              <div className="field"><label>Last Name</label><input type="text" placeholder="Enter Last Name" value={form.last} onChange={set("last")} /></div>
            </div>
            <div className="frow">
              <div className="field"><label>Email</label><input type="email" placeholder="Enter your Email" value={form.email} onChange={set("email")} required /></div>
              <div className="field"><label>Phone Number</label><input type="tel" placeholder="Enter your Mobile number" value={form.phone} onChange={set("phone")} /></div>
            </div>
            <div className="frow">
              <div className="field full"><label>Subject</label><input type="text" placeholder="Enter the subject of your message" value={form.subject} onChange={set("subject")} /></div>
            </div>
            <div className="frow">
              <div className="field full"><label>Message</label><textarea placeholder="Enter your Message here.." value={form.message} onChange={set("message")} /></div>
            </div>
            <button type="submit" className="btn-submit">{sent ? "Thank you! We'll be in touch" : "Submit"}</button>
          </form>
        </section>

        {/* FOOTER */}
        <Footer />

      </div>
    </div>
  );
}
