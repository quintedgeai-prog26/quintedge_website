import { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import SiteNav from "./SiteNav";

/**
 * Quint Edge AI — About Page
 * Faithful replica of the Figma About design, reusing the shared design
 * system from the home page (Monument Extended + Archivo, red #DF0002,
 * rotated tags, footer, portfolio carousel).
 *
 * Drop this into the same project as QuintEdgeHome.jsx. Fonts resolve from
 * /public/fonts/ exactly like the home page.
 */

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Archivo:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Syne:wght@400;500;600;700;800&display=swap');

@font-face{font-family:'Monument Extended';src:url('/fonts/MonumentExtended-Regular.woff2') format('woff2'),url('/fonts/MonumentExtended-Regular.otf') format('opentype');font-weight:400;font-style:normal;font-display:swap}
@font-face{font-family:'Monument Extended';src:url('/fonts/MonumentExtended-Ultrabold.woff2') format('woff2'),url('/fonts/MonumentExtended-Ultrabold.otf') format('opentype');font-weight:800;font-style:normal;font-display:swap}

.qe-about{
  --red:#DF0002;--dark:#222222;--card-dark:#2A2A2A;--hero:#161616;--light:#FAFAFA;
  --ph:#E5E7EC;--t-444:#444444;--t-666:#666666;--t-aaa:#AAAAAA;--t-ddd:#DDDDDD;
  --display:'Monument Extended','Syne',sans-serif;--body:'Archivo',system-ui,sans-serif;
  font-family:var(--body);color:#000;background:#fff;overflow-x:hidden
}
.qe-about *{margin:0;padding:0;box-sizing:border-box}
.qe-about .disp{font-family:var(--display)}
.qe-about .ph{background:var(--ph);background-image:linear-gradient(135deg,#eceef2 0%,#dfe2e8 100%);border-radius:32px}
.qe-about .canvas{width:100%;max-width:none;margin:0 auto;position:relative}

/* ---- shared nav ---- */
.qe-about .hero{background:var(--hero) url('/hero-bg.webp') center/cover no-repeat;color:#fff;padding-bottom:120px}
.qe-about .nav{display:flex;align-items:center;justify-content:space-between;padding:40px 100px 0}
.qe-about .logo{display:flex;align-items:center;gap:10px}.qe-about .logo img{height:56px;width:auto;display:block}
.qe-about .nav-links{display:flex;align-items:center;gap:48px}
.qe-about .nav-links a{color:#fff;text-decoration:none;font-size:18px;font-weight:500;opacity:.9;transition:opacity .2s}
.qe-about .nav-links a:hover{opacity:1}
.qe-about .nav-links a.active{color:var(--red);opacity:1}
.qe-about .btn-contact{background:var(--red);color:#fff;border:none;border-radius:32px;padding:18px 30px;font-family:var(--body);font-size:18px;font-weight:600;cursor:pointer;transition:transform .2s,filter .2s}
.qe-about .btn-contact:hover{filter:brightness(1.08);transform:translateY(-1px)}

/* ---- hero ---- */
.qe-about .hero-inner{text-align:center;padding:90px clamp(20px,5vw,100px) 0}
.qe-about .about-title{font-family:var(--display);font-weight:800;font-size:80px;line-height:1;letter-spacing:-1px;display:inline-flex;flex-wrap:wrap;justify-content:center;align-items:center;gap:18px}
.qe-about .about-title .hl{background:var(--red);color:#fff;border-radius:14px;padding:6px 26px 12px}
.qe-about .hero-p{font-family:var(--body);font-size:24px;line-height:1.7;letter-spacing:-.01em;color:#d8d8d8;max-width:980px;margin:34px auto 0}

/* ---- white wrap ---- */
.qe-about .white{background:#161616;border-radius:0;margin-top:0;position:relative;z-index:2;padding:110px clamp(20px,5vw,100px) 0}

/* pill label */
.qe-about .pill{display:inline-block;border:1.5px solid #444;border-radius:30px;padding:12px 26px;font-family:var(--body);font-weight:600;font-size:16px;color:#fff}
.qe-about .pill b{color:var(--red);font-weight:600}

/* why us */
.qe-about .why-head{display:flex;justify-content:space-between;align-items:flex-start;gap:90px}
.qe-about .why-l{max-width:587px}
.qe-about .why-l .pill{margin-bottom:24px}
.qe-about .why-l h2{font-family:var(--display);font-weight:400;font-size:40px;line-height:1.05;color:#fff}
.qe-about .why-l p{font-family:var(--body);font-size:20px;line-height:1.7;letter-spacing:-.01em;color:#d8d8d8;margin-top:26px}
.qe-about .why-img{width:590px;height:480px;flex:none}
.qe-about .stats{display:flex;justify-content:space-between;gap:24px;margin-top:64px}
.qe-about .stat .n{font-family:var(--display);font-weight:400;font-size:64px;line-height:1;color:var(--red)}
.qe-about .stat .l{font-family:var(--body);font-size:20px;color:#fff;margin-top:10px}

/* vision & mission */
.qe-about .vm{margin-top:120px}
.qe-about .vm-head{display:flex;justify-content:space-between;gap:115px;align-items:flex-end}
.qe-about .vm-head h2{font-family:var(--display);font-weight:400;font-size:40px;line-height:1.1;display:flex;flex-wrap:wrap;gap:12px;align-items:center;color:#fff}
.qe-about .vm-head h2 .hl{background:var(--red);color:#fff;border-radius:12px;padding:2px 16px 7px}
.qe-about .vm-head p{font-family:var(--body);font-size:20px;line-height:1.7;letter-spacing:-.01em;color:#d8d8d8;max-width:530px}
.qe-about .vm-cards{display:flex;gap:24px;margin-top:40px}
.qe-about .vmc{flex:1;border-radius:28px;padding:40px;min-height:200px;position:relative}
.qe-about .vmc.dark{background:#1a1a1a;color:#fff;border:1px solid #333}
.qe-about .vmc.red{background:var(--red);color:#fff}
.qe-about .vmc h3{font-family:var(--display);font-weight:400;font-size:28px;letter-spacing:.02em}
.qe-about .vmc p{font-family:var(--body);font-size:18px;line-height:1.7;margin-top:18px;max-width:560px}
.qe-about .vmc .ic{position:absolute;top:36px;right:36px;width:54px;height:54px;border-radius:50%;display:grid;place-items:center}
.qe-about .vmc.dark .ic{background:#000}
.qe-about .vmc.red .ic{background:#b80002}

/* path history (dark) */
.qe-about .hist{background:var(--dark);color:#fff;margin-top:120px;padding:96px clamp(20px,5vw,100px) 120px;position:relative;clip-path:polygon(0 26px,100% 0,100% 100%,0 100%)}
.qe-about .hist .topline{position:absolute;left:0;right:0;top:0;height:26px;background:var(--red);clip-path:polygon(0 100%,100% 0,100% 100%,0 100%)}
.qe-about .tag{position:absolute;left:0;top:120px;writing-mode:vertical-rl;transform:rotate(180deg);color:#fff;font-family:var(--body);font-weight:500;font-size:16px;letter-spacing:.14em;text-transform:uppercase}
.qe-about .hist .center{text-align:center;max-width:760px;margin:0 auto}
.qe-about .hist .center h2{font-family:var(--display);font-weight:400;font-size:40px;line-height:1;display:inline-flex;flex-wrap:wrap;gap:12px;justify-content:center;align-items:center}
.qe-about .hist .center h2 .hl{background:var(--red);color:#fff;border-radius:12px;padding:2px 16px 7px}
.qe-about .hist .center p{font-family:var(--body);font-size:20px;line-height:1.7;color:var(--t-aaa);margin-top:18px}

.qe-about .timeline{position:relative;margin-top:80px;padding:0 60px}
.qe-about .timeline::before{content:"";position:absolute;left:50%;top:0;bottom:0;width:0;border-left:2px dashed var(--red);transform:translateX(-50%)}
.qe-about .tl-row{display:flex;align-items:center;gap:60px;margin-bottom:60px;position:relative}
.qe-about .tl-row .cell{flex:1}
.qe-about .tl-row .tl-img{height:300px}
.qe-about .tl-row .yr{font-family:var(--display);font-weight:400;font-size:34px;color:var(--red)}
.qe-about .tl-row .tt{font-family:var(--display);font-weight:400;font-size:26px;line-height:1.15;margin-top:8px}
.qe-about .tl-row .ds{font-family:var(--body);font-size:18px;line-height:1.7;letter-spacing:-.01em;color:var(--t-ddd);margin-top:14px;max-width:345px}
.qe-about .tl-row .node{position:absolute;left:50%;top:50%;width:28px;height:28px;border-radius:50%;background:var(--red);transform:translate(-50%,-50%);box-shadow:0 0 0 6px rgba(223,0,2,.18)}
.qe-about .tl-row.right .text{text-align:right}
.qe-about .tl-row.right .ds{margin-left:auto}

/* portfolio (light) */
.qe-about .portfolio{background:var(--light);padding:90px clamp(20px,5vw,100px)}
.qe-about .pf-head{display:flex;align-items:center;justify-content:space-between}
.qe-about .pf-head h2{font-family:var(--display);font-weight:800;font-size:44px;line-height:1.05;display:flex;flex-wrap:wrap;gap:12px;align-items:center}
.qe-about .pf-head h2 .hl{background:var(--red);color:#fff;border-radius:12px;padding:2px 14px 6px}
.qe-about .see-more{display:flex;align-items:center;gap:12px;background:#fff;border:1.5px solid #e2e2e2;border-radius:30px;padding:14px 26px;font-family:var(--body);font-weight:600;font-size:16px;cursor:pointer}
.qe-about .pf-stage{display:flex;gap:20px;margin-top:40px;align-items:center}
.qe-about .pf-arrow{width:48px;height:48px;border-radius:50%;border:none;background:#111;color:#fff;display:grid;place-items:center;cursor:pointer;flex:none;font-size:18px;transition:transform .2s}
.qe-about .pf-arrow:hover{transform:scale(1.06)}
.qe-about .pf-cards{display:flex;gap:20px;flex:1;overflow:hidden}
.qe-about .pf-card{flex:1;height:420px}
.qe-about .pf-card .ph{height:100%;border-radius:24px}
.qe-about .pf-caption{text-align:center;max-width:829px;margin:34px auto 0}
.qe-about .pf-tags{display:flex;justify-content:center;gap:10px;margin-bottom:14px}
.qe-about .pf-tags span{background:#f0f0f0;color:#555;border-radius:32px;padding:6px 12px;font-family:var(--body);font-size:13px}
.qe-about .pf-caption h3{font-family:var(--display);font-weight:400;font-size:34px;line-height:1;display:inline-flex;align-items:center;gap:14px}
.qe-about .pf-caption h3 .dot{width:30px;height:30px;border-radius:50%;background:var(--red);display:grid;place-items:center;color:#fff}
.qe-about .pf-caption p{font-family:var(--body);font-size:18px;line-height:1.7;letter-spacing:-.01em;color:var(--t-666);margin-top:14px}

/* footer */
.qe-about .footer{background:#fff;padding:90px 100px 60px}
.qe-about .banner{display:flex;align-items:center;justify-content:center;gap:40px;flex-wrap:wrap}
.qe-about .banner span{font-family:var(--display);font-weight:800;font-size:72px;line-height:1;color:#000}
.qe-about .banner .star{color:var(--red)}
.qe-about .divider{display:flex;align-items:center;gap:14px;margin:44px 0 56px}
.qe-about .divider .ln{height:4px;background:var(--dark);flex:1;border-radius:2px}
.qe-about .divider .st{color:var(--dark)}

/* hiring CTA */
.qe-about .hire{text-align:center;max-width:1240px;margin:0 auto}
.qe-about .hire .pic{height:330px;border-radius:34px;margin-bottom:30px}
.qe-about .hire p{font-family:var(--body);font-size:18px;line-height:1.7;color:#333;max-width:760px;margin:0 auto}
.qe-about .hire-btns{display:flex;justify-content:center;gap:16px;margin-top:26px}
.qe-about .btn-dark{background:#111;color:#fff;border:none;border-radius:40px;padding:16px 34px;font-family:var(--body);font-weight:600;font-size:16px;cursor:pointer}
.qe-about .btn-out{background:#fff;color:#111;border:1.5px solid #d8d8d8;border-radius:40px;padding:16px 34px;font-family:var(--body);font-weight:600;font-size:16px;cursor:pointer}

.qe-about .foot-brand{display:flex;flex-direction:column;align-items:center;text-align:center;margin-top:80px}
.qe-about .foot-word{font-family:var(--display);font-weight:800;font-size:54px;line-height:1;display:inline-flex;align-items:center;gap:18px}
.qe-about .foot-word .r{color:var(--red)}
.qe-about .foot-word .b{color:#000}
.qe-about .foot-tag{font-family:var(--display);font-weight:400;font-size:26px;margin-top:14px}
.qe-about .foot-bottom{display:flex;align-items:center;justify-content:space-between;margin-top:70px}
.qe-about .foot-bottom .cp{font-family:var(--body);font-size:15px;color:#555}
.qe-about .socials{display:flex;gap:14px}
.qe-about .socials a{width:34px;height:34px;border-radius:50%;display:grid;place-items:center;color:#444;border:1px solid #e0e0e0;transition:all .2s}
.qe-about .socials a:hover{background:var(--red);color:#fff;border-color:var(--red)}

@media(max-width:1100px){
  .qe-about .canvas{max-width:100%}
  .qe-about .nav-links{display:none}
  .qe-about .about-title{font-size:48px}
  .qe-about .why-head,.qe-about .vm-head{flex-direction:column;gap:30px;align-items:flex-start}
  .qe-about .why-img{width:100%}
  .qe-about .vm-cards{flex-direction:column}
  .qe-about .stats{flex-wrap:wrap}.qe-about .stat{flex:1 1 40%}
  .qe-about .timeline{padding:0}
  .qe-about .timeline::before{left:8px}
  .qe-about .tl-row{flex-direction:column;align-items:flex-start;gap:16px;padding-left:30px}
  .qe-about .tl-row .node{left:8px}
  .qe-about .tl-row.right .text{text-align:left}
  .qe-about .banner span{font-size:42px}
}
@media(max-width:600px){
  .qe-about .about-title{font-size:34px}
  .qe-about .hero-p{font-size:17px}
  .qe-about .why-l h2,.qe-about .vm-head h2,.qe-about .hist .center h2{font-size:28px}
  .qe-about .vm-head h2{flex-wrap:wrap}
  .qe-about .stat .n{font-size:44px}
  .qe-about .stat .l{font-size:16px}
  .qe-about .why-img{height:280px}
  .qe-about .vmc{padding:28px;min-height:0}
  .qe-about .vmc .ic{top:24px;right:24px;width:44px;height:44px}
  .qe-about .tag{display:none}
  .qe-about .pf-head{flex-direction:column;align-items:flex-start;gap:16px}
  .qe-about .pf-card{height:300px}
  .qe-about .tl-row .tl-img{height:220px}
  .qe-about .banner span{font-size:30px}
}
`;

/* icons */
const Arrow = ({ s = 22 }) => (<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>);
const ArrowUR = ({ s = 22 }) => (<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" /></svg>);
const Star = ({ s = 30 }) => (<svg className="star" width={s} height={s} viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c.6 6 5.4 10.8 12 12-6.6 1.2-11.4 6-12 12-.6-6-5.4-10.8-12-12C6.6 10.8 11.4 6 12 0z" /></svg>);
const Leaf = () => (<svg width="40" height="44" viewBox="0 0 40 44" fill="none"><path d="M19 2C8 6 2 16 6 30c2 7 8 11 13 12 0-12-2-26 0-40z" fill="#DF0002" /><path d="M21 6c10 4 16 13 13 26-1 5-5 9-13 11 1-13 3-25 0-37z" fill="#DF0002" opacity="0.55" /></svg>);
const Eye = () => (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" /><circle cx="12" cy="12" r="3" /></svg>);
const Rocket = () => (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.3-2 5-2 5s3.7-.5 5-2c.7-.8.7-2 0-2.7-.8-.7-2-.7-2.7-.3z" /><path d="M12 15l-3-3a22 22 0 014-9 11.5 11.5 0 015 5 22 22 0 01-9 4z" /><path d="M9 12H4s.5-2.7 2-4 5-1 5-1" /><path d="M12 15v5s2.7-.5 4-2 1-5 1-5" /></svg>);
const Fb = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M14 9h3V5h-3c-2.2 0-4 1.8-4 4v2H7v4h3v6h4v-6h3l1-4h-4V9c0-.6.4-1 1-1z" /></svg>);
const In = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5A2.5 2.5 0 102.5 6 2.5 2.5 0 004.98 3.5zM3 8.98h4V21H3zM9 8.98h3.8v1.65h.05A4.17 4.17 0 0117 8.5c4 0 4.7 2.6 4.7 6V21h-4v-5.3c0-1.27 0-2.9-1.77-2.9s-2 1.38-2 2.8V21H9z" /></svg>);
const Gh = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 00-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.1-1.47-1.1-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.5 9.5 0 015 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0012 2z" /></svg>);
const Dr = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 1010 10A10 10 0 0012 2zm6.6 6.2a8.4 8.4 0 011.9 5.2c-.3-.06-3.2-.66-6.1-.3-.06-.16-.13-.32-.2-.49 3.1-1.27 4.3-3.1 4.4-3.27zM12 3.5a8.5 8.5 0 015.4 1.95c-.1.14-1.2 1.86-4.18 3a44 44 0 00-2.9-4.55A8.6 8.6 0 0112 3.5zM8.7 4.6a52 52 0 012.9 4.5c-3.7 1-7 .95-7.3.95A8.5 8.5 0 018.7 4.6zM3.5 12v-.22c.36 0 4.2.06 8.16-1.13.22.43.43.87.62 1.31-3.9 1.1-6.05 4.45-6.2 4.7A8.5 8.5 0 013.5 12zm8.5 8.5a8.46 8.46 0 01-5.2-1.78c.12-.25 1.6-3.07 5.85-4.56a35.3 35.3 0 011.83 6.5 8.5 8.5 0 01-2.48.84zm3.9-1.62a36.6 36.6 0 00-1.66-6.06c2.73-.43 5.12.28 5.42.38a8.52 8.52 0 01-3.76 5.68z" /></svg>);

const STATS = [["20+", "Projects Completed"], ["95%", "Client Retention Rate"], ["500+", "Lead Generated Monthly"], ["30%", "Average Increase in ROI"]];

const HISTORY = [
  ["2024", "Specializing in Local Digital Marketing", "We started by getting to know our clients, their business goals, and their target audience to deliver focused local campaigns."],
  ["2025", "Gained 25+ Clients with Successful Results", "We grew our portfolio rapidly by pairing data-driven strategy with creative execution that consistently exceeded targets."],
  ["2026", "Recognized as a Top Digital Marketing Agency", "Our work earned industry recognition as we scaled our team and expanded into AI-powered marketing solutions."],
];

export default function AboutPage() {
  const [pf, setPf] = useState(0);

  return (
    <div className="qe-about">
      <style>{CSS}</style>
      <div className="canvas">

        {/* HERO */}
        <header className="hero">
          <SiteNav active="about" />
          <div className="hero-inner">
            <h1 className="about-title"><span>ABOUT</span><span className="hl">QUINT EDGE AI</span></h1>
            <p className="hero-p">Quint Edge AI is a dynamic and innovative design agency that brings creative ideas to life. We work with a wide range of clients to develop unique and effective branding, web design, and graphic design solutions.</p>
          </div>
        </header>

        {/* WHITE */}
        <div className="white">
          {/* WHY US */}
          <section className="whyus">
            <div className="why-head">
              <div className="why-l">
                <span className="pill">Why Us</span>
                <h2 className="disp">Revolutionizing Digital Marketing Excellence</h2>
                <p>Despite being a small team, we believe that our size gives us an advantage, allowing us to be nimble, adaptable, and able to work closely with our clients to deliver truly awesome designs. Our focus on collaboration keeps every project sharp, personal, and results-driven.</p>
              </div>
              <div className="ph why-img" />
            </div>
            <div className="stats">
              {STATS.map(([n, l]) => (
                <div className="stat" key={l}><div className="n disp">{n}</div><div className="l">{l}</div></div>
              ))}
            </div>
          </section>

          {/* VISION & MISSION */}
          <section className="vm">
            <span className="pill">Vision <b>&amp;</b> Mission</span>
            <div className="vm-head">
              <h2 className="disp"><span>Empowering Growth</span><span>with</span><span className="hl">Innovation</span></h2>
              <p>Despite being a small team, we believe that our size gives us an advantage, allowing us to be nimble, adaptable, and able to work closely with our clients to deliver truly awesome designs.</p>
            </div>
            <div className="vm-cards">
              <div className="vmc dark">
                <span className="ic"><Eye /></span>
                <h3 className="disp">OUR VISION</h3>
                <p>To become the most trusted creative partner for ambitious brands — blending design craft with AI to turn bold ideas into measurable growth.</p>
              </div>
              <div className="vmc red">
                <span className="ic"><Rocket /></span>
                <h3 className="disp">OUR MISSION</h3>
                <p>To help businesses of every size compete and win online through thoughtful design, smart strategy, and technology that actually moves the needle.</p>
              </div>
            </div>
          </section>
        </div>

        {/* PATH HISTORY (dark) */}
        <section className="hist">
          <div className="topline" />
          <div className="tag">HOW IT WORKS</div>
          <div className="center">
            <h2 className="disp"><span>Our Path</span><span className="hl">History</span></h2>
            <p>Quint Edge AI follows a collaborative and iterative approach to design, with a focus on understanding and meeting the unique needs of each client.</p>
          </div>
          <div className="timeline">
            {HISTORY.map(([yr, tt, ds], i) => {
              const right = i % 2 === 1;
              const Img = <div className="cell"><div className="ph tl-img" /></div>;
              const Txt = (
                <div className="cell text">
                  <div className="yr disp">{yr}</div>
                  <div className="tt disp">{tt}</div>
                  <div className="ds">{ds}</div>
                </div>
              );
              return (
                <div className={"tl-row" + (right ? " right" : "")} key={yr}>
                  {right ? Txt : Img}
                  <span className="node" />
                  {right ? Img : Txt}
                </div>
              );
            })}
          </div>
        </section>

        {/* PORTFOLIO (reused) */}
        <section className="portfolio">
          <div className="pf-head">
            <h2 className="disp"><span>Our</span><span className="hl">Best Work</span><span>of Successful Projects</span></h2>
            <button className="see-more">See More <Arrow s={18} /></button>
          </div>
          <div className="pf-stage">
            <button className="pf-arrow" onClick={() => setPf(pf - 1)}>&#8592;</button>
            <div className="pf-cards"><div className="pf-card"><div className="ph" /></div><div className="pf-card"><div className="ph" /></div></div>
            <button className="pf-arrow" onClick={() => setPf(pf + 1)}>&#8594;</button>
          </div>
          <div className="pf-caption">
            <div className="pf-tags"><span>UX Research</span><span>Wireframe</span><span>Visual Design</span></div>
            <h3 className="disp">Coca &ndash; Tech Startup Landing Page <span className="dot"><ArrowUR s={16} /></span></h3>
            <p>We start by getting to know our clients, their business goals, and their target audience. This involves conducting research, analyzing data, and discussing ideas with our clients to gain a deep understanding of their needs.</p>
          </div>
        </section>

        {/* FOOTER */}
        <Footer />

      </div>
    </div>
  );
}
