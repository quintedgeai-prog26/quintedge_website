import { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import SiteNav from "./SiteNav";

/**
 * Quint Edge AI — Services Page
 * Faithful replica of the Figma Services design, reusing the shared design
 * system (Monument Extended + Archivo, red #DF0002, rotated tags, footer).
 * Drop into the same project as QuintEdgeHome.jsx / AboutPage.jsx.
 * Fonts resolve from /public/fonts/ exactly like the other pages.
 */

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Archivo:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Syne:wght@400;500;600;700;800&display=swap');
@font-face{font-family:'Monument Extended';src:url('/fonts/MonumentExtended-Regular.woff2') format('woff2'),url('/fonts/MonumentExtended-Regular.otf') format('opentype');font-weight:400;font-style:normal;font-display:swap}
@font-face{font-family:'Monument Extended';src:url('/fonts/MonumentExtended-Ultrabold.woff2') format('woff2'),url('/fonts/MonumentExtended-Ultrabold.otf') format('opentype');font-weight:800;font-style:normal;font-display:swap}

.qe-svc{
  --red:#DF0002;--dark:#161616;--card:#1c1c1c;--deliver:#222222;--light:#FAFAFA;
  --ph:#E5E7EC;--t-444:#444444;--t-666:#666666;--t-aaa:#AAAAAA;--t-ddd:#DDDDDD;--green:#22C55E;
  --display:'Monument Extended','Syne',sans-serif;--body:'Archivo',system-ui,sans-serif;
  font-family:var(--body);color:#000;background:#fff;overflow-x:hidden
}
.qe-svc *{margin:0;padding:0;box-sizing:border-box}
.qe-svc .disp{font-family:var(--display)}
.qe-svc .ph{background:var(--ph);background-image:linear-gradient(135deg,#eceef2,#dfe2e8);border-radius:32px}
.qe-svc .canvas{width:100%;max-width:none;margin:0 auto;position:relative}

/* nav + hero */
.qe-svc .hero{background:var(--dark) url('/hero-bg.webp') center/cover no-repeat;color:#fff;padding-bottom:90px}
.qe-svc .nav{display:flex;align-items:center;justify-content:space-between;padding:40px 100px 0}
.qe-svc .logo{display:flex;align-items:center;gap:10px}.qe-svc .logo img{height:56px;width:auto;display:block}
.qe-svc .nav-links{display:flex;align-items:center;gap:48px}
.qe-svc .nav-links a{color:#fff;text-decoration:none;font-size:18px;font-weight:500;opacity:.9;transition:opacity .2s}
.qe-svc .nav-links a:hover{opacity:1}
.qe-svc .nav-links a.active{color:var(--red);opacity:1}
.qe-svc .btn-contact{background:var(--red);color:#fff;border:none;border-radius:32px;padding:18px 30px;font-family:var(--body);font-size:18px;font-weight:600;cursor:pointer;transition:transform .2s,filter .2s}
.qe-svc .btn-contact:hover{filter:brightness(1.08);transform:translateY(-1px)}
.qe-svc .hero-inner{text-align:center;padding:90px clamp(20px,5vw,100px) 0}
.qe-svc .svc-title{font-family:var(--display);font-weight:800;font-size:96px;line-height:1;letter-spacing:-1px;display:inline-flex;flex-wrap:wrap;justify-content:center;align-items:center;gap:18px}
.qe-svc .svc-title .hl{background:var(--red);color:#fff;border-radius:16px;padding:6px 30px 16px}
.qe-svc .hero-p{font-family:var(--body);font-size:24px;line-height:1.7;letter-spacing:-.01em;color:#d8d8d8;max-width:980px;margin:34px auto 0}

/* build-strong white section */
.qe-svc .build{background:#161616;border-radius:0;margin-top:0;position:relative;z-index:2;padding:110px clamp(20px,5vw,100px) 0;text-align:center}
.qe-svc .build h2{font-family:var(--display);font-weight:400;font-size:40px;line-height:1.6;color:#fff;max-width:1126px;margin:0 auto}
.qe-svc .build p{font-family:var(--body);font-size:18px;line-height:1.7;color:#d8d8d8;max-width:760px;margin:18px auto 0}
.qe-svc .build-cards{display:flex;justify-content:center;gap:24px;margin-top:60px;padding-bottom:30px}
.qe-svc .bcard{width:298px;height:298px;background:var(--ph);border:none;border-radius:32px;box-shadow:0 24px 50px rgba(0,0,0,.12)}
.qe-svc .bcard:nth-child(1){transform:rotate(-8deg)}
.qe-svc .bcard:nth-child(2){transform:rotate(4deg) translateY(16px)}
.qe-svc .bcard:nth-child(3){transform:rotate(-4deg) translateY(8px)}
.qe-svc .bcard:nth-child(4){transform:rotate(8deg)}

/* expertise (dark) */
.qe-svc .expertise{background:var(--dark);color:#fff;padding:100px clamp(20px,5vw,100px);position:relative;clip-path:polygon(0 22px,100% 0,100% 100%,0 100%)}
.qe-svc .expertise .topline{position:absolute;left:0;right:0;top:0;height:22px;background:var(--red);clip-path:polygon(0 100%,100% 0,100% 100%,0 100%)}
.qe-svc .exp-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:20px}
.qe-svc .ecard{background:#1e1e1e;border-radius:24px;padding:36px 32px;display:flex;flex-direction:column;justify-content:space-between;min-height:240px}
.qe-svc .ecard .icn{color:var(--red)}
.qe-svc .ecard h3{font-family:var(--body);font-weight:500;font-size:24px;line-height:1.15;margin-top:60px}
.qe-svc .exp-head{grid-column:span 2;padding:10px 0 10px 28px;display:flex;flex-direction:column;justify-content:center}
.qe-svc .exp-head h2{font-family:var(--display);font-weight:400;font-size:48px;line-height:1.05}
.qe-svc .exp-head p{font-family:var(--body);font-size:18px;line-height:1.7;color:var(--t-aaa);margin-top:18px;max-width:420px}

/* process (white) */
.qe-svc .process{background:#fff;padding:100px clamp(20px,5vw,100px)}
.qe-svc .timeline{position:relative}
.qe-svc .timeline::before{content:"";position:absolute;left:50%;top:20px;bottom:20px;width:3px;background:var(--red);transform:translateX(-50%);opacity:.85}
.qe-svc .phase{display:flex;align-items:flex-start;gap:70px;margin-bottom:80px}
.qe-svc .phase .side{flex:1;min-width:0}
.qe-svc .phase.rev{flex-direction:row-reverse}
.qe-svc .ph-head{display:flex;align-items:center;gap:20px}
.qe-svc .ph-tile{width:64px;height:64px;border-radius:16px;display:grid;place-items:center;flex:none}
.qe-svc .ph-label{font-family:var(--body);font-size:14px;color:#888}
.qe-svc .ph-title{font-family:var(--display);font-weight:400;font-size:40px;color:var(--red);line-height:1}
.qe-svc .ph-desc{font-family:var(--body);font-size:18px;color:#333;margin-top:18px}
.qe-svc .ph-kt{font-family:var(--body);font-weight:600;font-size:20px;margin-top:26px}
.qe-svc .ph-acts{list-style:none;margin-top:14px;display:flex;flex-direction:column;gap:12px}
.qe-svc .ph-acts li{display:flex;align-items:center;gap:12px;font-family:var(--body);font-size:16px;color:#222}
.qe-svc .ph-acts .ck{color:var(--green);flex:none}
.qe-svc .ph-dur{display:inline-flex;align-items:center;gap:8px;border:1.5px solid #e2e2e2;border-radius:30px;padding:10px 18px;font-family:var(--body);font-size:14px;color:#444;margin-top:26px}
.qe-svc .deliver{background:var(--deliver);color:#fff;border-radius:22px;padding:32px}
.qe-svc .deliver h4{font-family:var(--body);font-weight:600;font-size:24px;margin-bottom:22px}
.qe-svc .deliver .row{display:flex;align-items:center;gap:12px;border:1px solid #3a3a3a;border-radius:10px;padding:14px 16px;margin-bottom:12px;font-family:var(--body);font-size:16px}
.qe-svc .deliver .row .dot{width:7px;height:7px;border-radius:50%;background:var(--red);flex:none}

/* why our process (dark) */
.qe-svc .why{background:var(--dark);color:#fff;padding:100px clamp(20px,5vw,100px);position:relative;clip-path:polygon(0 22px,100% 0,100% 100%,0 100%)}
.qe-svc .why .topline{position:absolute;left:0;right:0;top:0;height:22px;background:var(--red);clip-path:polygon(0 100%,100% 0,100% 100%,0 100%)}
.qe-svc .why .center{text-align:center;max-width:820px;margin:0 auto}
.qe-svc .why h2{font-family:var(--display);font-weight:400;font-size:44px;line-height:1;display:inline-flex;flex-wrap:wrap;gap:12px;justify-content:center;align-items:center}
.qe-svc .why h2 .hl{background:var(--red);color:#fff;border-radius:10px;padding:2px 16px 8px}
.qe-svc .why .sub{font-family:var(--body);font-size:20px;color:var(--t-aaa);margin-top:16px}
.qe-svc .why-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-top:60px}
.qe-svc .bcard2{background:#1f1f1f;border:1px solid #2a2a2a;border-radius:22px;padding:34px}
.qe-svc .bcard2 .tile{width:52px;height:52px;border-radius:14px;background:var(--red);display:grid;place-items:center;color:#fff;margin-bottom:26px}
.qe-svc .bcard2 h3{font-family:var(--body);font-weight:600;font-size:22px}
.qe-svc .bcard2 p{font-family:var(--body);font-size:16px;line-height:1.6;color:var(--t-aaa);margin-top:10px}

/* footer (shared) */
.qe-svc .footer{background:#fff;padding:90px 100px 60px;position:relative;clip-path:polygon(0 22px,100% 0,100% 100%,0 100%)}
.qe-svc .footer .topred{position:absolute;left:0;right:0;top:0;height:22px;background:var(--red);clip-path:polygon(0 100%,100% 0,100% 100%,0 100%)}
.qe-svc .banner{display:flex;align-items:center;justify-content:center;gap:40px;flex-wrap:wrap}
.qe-svc .banner span{font-family:var(--display);font-weight:800;font-size:72px;line-height:1;color:#000}
.qe-svc .banner .star{color:var(--red)}
.qe-svc .divider{display:flex;align-items:center;gap:14px;margin:44px 0 56px}
.qe-svc .divider .ln{height:4px;background:#222;flex:1;border-radius:2px}
.qe-svc .divider .st{color:#222}
.qe-svc .ready{background:linear-gradient(120deg,#262626,#0c0c0c 60%);border-radius:34px;padding:80px 64px;display:flex;align-items:center;justify-content:space-between;gap:40px}
.qe-svc .ready h2{font-family:var(--display);font-weight:400;font-size:64px;line-height:1;color:#fff}
.qe-svc .btn-started{display:flex;align-items:center;gap:16px;background:#fff;color:#111;border:none;border-radius:70px;padding:16px 32px;font-family:var(--body);font-weight:600;font-size:18px;cursor:pointer;transition:transform .2s}
.qe-svc .btn-started:hover{transform:translateY(-2px)}
.qe-svc .foot-brand{display:flex;flex-direction:column;align-items:center;text-align:center;margin-top:80px}
.qe-svc .foot-word{font-family:var(--display);font-weight:800;font-size:54px;line-height:1;display:inline-flex;align-items:center;gap:18px}
.qe-svc .foot-word .r{color:var(--red)}.qe-svc .foot-word .b{color:#000}
.qe-svc .foot-tag{font-family:var(--display);font-weight:400;font-size:26px;margin-top:14px}
.qe-svc .foot-bottom{display:flex;align-items:center;justify-content:space-between;margin-top:70px}
.qe-svc .foot-bottom .cp{font-family:var(--body);font-size:15px;color:#555}
.qe-svc .socials{display:flex;gap:14px}
.qe-svc .socials a{width:34px;height:34px;border-radius:50%;display:grid;place-items:center;color:#444;border:1px solid #e0e0e0;transition:all .2s}
.qe-svc .socials a:hover{background:var(--red);color:#fff;border-color:var(--red)}

@media(max-width:1100px){
  .qe-svc .canvas{max-width:100%}
  .qe-svc .nav-links{display:none}
  .qe-svc .svc-title{font-size:52px}
  .qe-svc .exp-grid{grid-template-columns:1fr 1fr}.qe-svc .exp-head{grid-column:span 2;padding-left:20px}
  .qe-svc .phase,.qe-svc .phase.rev{flex-direction:column;gap:24px}
  .qe-svc .timeline::before{display:none}
  .qe-svc .why-grid{grid-template-columns:1fr}
  .qe-svc .banner span{font-size:42px}.qe-svc .ready{flex-direction:column;text-align:center}.qe-svc .ready h2{font-size:40px}
  .qe-svc .build-cards{flex-wrap:wrap}
}
@media(max-width:600px){
  .qe-svc .svc-title{font-size:40px}
  .qe-svc .hero-p,.qe-svc .build p{font-size:16px}
  .qe-svc .build h2{font-size:26px;line-height:1.35}
  .qe-svc .build-cards{gap:16px}
  .qe-svc .bcard{width:130px;height:130px;border-radius:22px}
  .qe-svc .exp-grid{grid-template-columns:1fr}
  .qe-svc .exp-head{grid-column:span 1;padding-left:0}
  .qe-svc .exp-head h2{font-size:32px}
  .qe-svc .ecard{min-height:0}
  .qe-svc .ecard h3{margin-top:32px;font-size:22px}
  .qe-svc .phase{gap:20px;margin-bottom:54px}
  .qe-svc .ph-title{font-size:30px}
  .qe-svc .why h2{font-size:30px}
  .qe-svc .ready h2{font-size:32px}
}
`;

/* shared icons */
const Arrow = ({ s = 22 }) => (<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>);
const Star = ({ s = 30 }) => (<svg className="star" width={s} height={s} viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c.6 6 5.4 10.8 12 12-6.6 1.2-11.4 6-12 12-.6-6-5.4-10.8-12-12C6.6 10.8 11.4 6 12 0z" /></svg>);
const Leaf = () => (<svg width="40" height="44" viewBox="0 0 40 44" fill="none"><path d="M19 2C8 6 2 16 6 30c2 7 8 11 13 12 0-12-2-26 0-40z" fill="#DF0002" /><path d="M21 6c10 4 16 13 13 26-1 5-5 9-13 11 1-13 3-25 0-37z" fill="#DF0002" opacity="0.55" /></svg>);
const Check = ({ s = 20 }) => (<svg className="ck" width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><polyline points="8.5 12 11 14.5 15.5 9.5" /></svg>);
const Clock = ({ s = 16 }) => (<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><polyline points="12 7 12 12 16 14" /></svg>);
const Fb = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M14 9h3V5h-3c-2.2 0-4 1.8-4 4v2H7v4h3v6h4v-6h3l1-4h-4V9c0-.6.4-1 1-1z" /></svg>);
const In = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5A2.5 2.5 0 102.5 6 2.5 2.5 0 004.98 3.5zM3 8.98h4V21H3zM9 8.98h3.8v1.65h.05A4.17 4.17 0 0117 8.5c4 0 4.7 2.6 4.7 6V21h-4v-5.3c0-1.27 0-2.9-1.77-2.9s-2 1.38-2 2.8V21H9z" /></svg>);
const Gh = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 00-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.1-1.47-1.1-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.5 9.5 0 015 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0012 2z" /></svg>);
const Dr = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 1010 10A10 10 0 0012 2zm6.6 6.2a8.4 8.4 0 011.9 5.2c-.3-.06-3.2-.66-6.1-.3-.06-.16-.13-.32-.2-.49 3.1-1.27 4.3-3.1 4.4-3.27zM12 3.5a8.5 8.5 0 015.4 1.95c-.1.14-1.2 1.86-4.18 3a44 44 0 00-2.9-4.55A8.6 8.6 0 0112 3.5zM8.7 4.6a52 52 0 012.9 4.5c-3.7 1-7 .95-7.3.95A8.5 8.5 0 018.7 4.6zM3.5 12v-.22c.36 0 4.2.06 8.16-1.13.22.43.43.87.62 1.31-3.9 1.1-6.05 4.45-6.2 4.7A8.5 8.5 0 013.5 12zm8.5 8.5a8.46 8.46 0 01-5.2-1.78c.12-.25 1.6-3.07 5.85-4.56a35.3 35.3 0 011.83 6.5 8.5 8.5 0 01-2.48.84zm3.9-1.62a36.6 36.6 0 00-1.66-6.06c2.73-.43 5.12.28 5.42.38a8.52 8.52 0 01-3.76 5.68z" /></svg>);

/* expertise icons — custom SVGs from brand assets */
const SeoIcon = () => (
  <svg width="46" height="43" viewBox="0 0 74 68" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M60.4333 65.3644V19.6861H70.3V65.3644H60.4333ZM41.9333 65.3644V29.5625H51.8V65.3644H41.9333ZM23.4333 65.3644V39.4389H33.3V65.3644H23.4333ZM4.93333 65.3644V50.5498H14.8V65.3644H4.93333ZM72.7666 65.3644V17.217H57.9667V65.3644H54.2667V27.0934H39.4667V65.3644H35.7667V36.9698H20.9667V65.3644H17.2667V48.0807H2.46666V65.3644H1.23333C0.55253 65.3644 0 65.9162 0 66.5989C0 67.2817 0.55253 67.8335 1.23333 67.8335H72.7666C73.4475 67.8335 74 67.2817 74 66.5989C74 65.9162 73.4475 65.3644 72.7666 65.3644Z" fill="#DF0002"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M9.87899 31.1509C10.0868 31.1509 10.2996 31.098 10.4927 30.9861L55.0961 5.23417L52.3044 11.3708C52.0228 11.9894 52.2958 12.7187 52.9144 12.9991C53.0792 13.0753 53.2526 13.1098 53.4235 13.1098C53.8909 13.1098 54.3373 12.8417 54.5439 12.3891L58.9244 2.75982C58.938 2.72908 58.9355 2.69587 58.9466 2.6639C58.9699 2.59872 58.9884 2.536 59.0007 2.46714C59.0068 2.43271 59.0265 2.40441 59.0289 2.36875C59.0302 2.35399 59.024 2.3417 59.0253 2.32694C59.0277 2.28021 59.0228 2.23717 59.0204 2.19043C59.0167 2.12279 59.0056 2.05884 58.9908 1.99121C58.981 1.94448 58.9785 1.89652 58.9626 1.85102C58.9478 1.80675 58.922 1.76985 58.9023 1.7268C58.8863 1.69852 58.8863 1.66531 58.8691 1.6358C58.8519 1.60629 58.8224 1.58907 58.8027 1.56078C58.7769 1.52266 58.7572 1.48207 58.7264 1.44764C58.6945 1.41075 58.6539 1.38492 58.617 1.35172C58.5666 1.30622 58.5162 1.26441 58.4596 1.22751C58.4215 1.20291 58.387 1.17586 58.3452 1.15495C58.3317 1.1488 58.3243 1.1365 58.3108 1.13035C58.28 1.11682 58.2468 1.11928 58.2161 1.10821C58.1484 1.08361 58.082 1.0664 58.0119 1.0541C57.98 1.04795 57.9541 1.02949 57.9209 1.02703L47.3914 0.00631009C46.7089 -0.0625609 46.1137 0.436736 46.0485 1.11067C45.9821 1.78706 46.4777 2.38842 47.1529 2.45361L53.8626 3.10416L9.26289 28.8561C8.67382 29.1955 8.47336 29.9481 8.81278 30.536C9.0403 30.9307 9.4535 31.1509 9.87902 31.1509H9.87899Z" fill="white"/>
  </svg>
);

const WebIcon = () => (
  <svg width="46" height="34" viewBox="0 0 74 55" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M67.8301 44.4C67.1494 44.4 66.5969 43.8475 66.5969 43.1667V3.70001C66.5969 3.02168 66.0444 2.46668 65.3637 2.46668H8.63629C7.95557 2.46668 7.40309 3.02168 7.40309 3.70001V43.1667C7.40309 43.8475 6.85062 44.4 6.16989 44.4C5.48916 44.4 4.93669 43.8475 4.93669 43.1667V3.70001C4.93669 1.66008 6.59659 1e-05 8.6363 1e-05H65.3637C67.4035 1e-05 69.0633 1.66008 69.0633 3.70001V43.1667C69.0633 43.8475 68.5109 44.4 67.8301 44.4H67.8301Z" fill="#DF0002"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M67.8333 54.2634H6.16667C2.76514 54.2634 0 51.4982 0 48.0967C0 47.4159 0.55253 46.8634 1.23333 46.8634H28.3667C29.0475 46.8634 29.6 47.4159 29.6 48.0967C29.6 48.7775 29.0475 49.33 28.3667 49.33H2.67879C3.18692 50.7656 4.55839 51.7967 6.16666 51.7967H67.8333C69.4416 51.7967 70.8131 50.7656 71.3212 49.33H45.6333C44.9525 49.33 44.4 48.7775 44.4 48.0967C44.4 47.4159 44.9525 46.8634 45.6333 46.8634H72.7667C73.4475 46.8634 74 47.4159 74 48.0967C74 51.4982 71.2349 54.2634 67.8333 54.2634Z" fill="#DF0002"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M25.8959 35.2666C25.6074 35.2666 25.3189 35.1655 25.0847 34.9608L15.2216 26.3293C14.9529 26.0951 14.8 25.7597 14.8 25.4021C14.8 25.0445 14.9529 24.7091 15.2216 24.4748L25.0847 15.8434C25.5951 15.3921 26.3718 15.4414 26.8255 15.9593C27.2743 16.4722 27.2225 17.2491 26.7096 17.6979L17.9044 25.4021L26.7071 33.1063C27.22 33.5551 27.2718 34.3319 26.823 34.8449C26.5789 35.1236 26.2386 35.2666 25.8959 35.2666L25.8959 35.2666Z" fill="white"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M33.2981 37.7399C33.1697 37.7399 33.0389 37.7202 32.9081 37.6783C32.2615 37.4611 31.9135 36.7628 32.1282 36.1164L39.5321 13.9093C39.7468 13.2629 40.4403 12.91 41.0919 13.1296C41.7385 13.3468 42.0865 14.045 41.8718 14.6915L34.4679 36.8985C34.2951 37.4118 33.8139 37.7399 33.2981 37.7399Z" fill="white"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M48.0973 35.2666C47.7543 35.2666 47.4139 35.1235 47.1696 34.8449C46.7206 34.332 46.7724 33.5552 47.2856 33.1064L56.0937 25.4026L47.2856 17.6988C46.7724 17.25 46.7206 16.4732 47.1696 15.9602C47.6186 15.4424 48.3983 15.3955 48.9115 15.8443L58.7806 24.4753C59.047 24.7096 59.2 25.045 59.2 25.4026C59.2 25.7601 59.047 26.0955 58.7781 26.3298L48.909 34.9608C48.6746 35.1655 48.386 35.2666 48.0973 35.2666H48.0973Z" fill="white"/>
  </svg>
);

const VideoIcon = () => (
  <svg width="46" height="30" viewBox="0 0 77 50" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M55.4567 41.5833C55.4567 44.9888 52.6956 47.75 49.2902 47.75H7.66649C4.26106 47.75 1.50001 44.9888 1.50001 41.5833V7.66663C1.50001 4.26109 4.26106 1.49996 7.66649 1.49996H49.2902C52.6956 1.49996 55.4567 4.26109 55.4567 7.66663V41.5833Z" stroke="#DF0002" strokeWidth="3" strokeLinecap="round"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M75.5005 7.66326L55.4571 18.457V30.7928L75.5005 41.5866V7.66326Z" stroke="white" strokeWidth="3" strokeLinecap="round"/>
  </svg>
);

const PerformanceIcon = () => (
  <svg width="34" height="50" viewBox="0 0 41 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M26.4252 22.1075C27.3758 22.3814 28.3749 21.8497 28.6649 20.8992C28.9711 19.852 29.1322 18.7565 29.1322 17.6449C29.1322 11.3296 23.992 6.1742 17.6593 6.1742C11.3428 6.1742 6.18639 11.3135 6.18639 17.6449C6.18639 19.0465 6.4281 20.4159 6.92762 21.7047C7.20156 22.4297 7.87832 22.8647 8.60343 22.8647C8.8129 22.8647 9.0224 22.8325 9.23186 22.7519C10.1665 22.3975 10.6337 21.3664 10.2793 20.432C9.94087 19.5459 9.7636 18.6115 9.7636 17.6449C9.7636 13.3111 13.2925 9.76684 17.6432 9.76684C21.9778 9.76684 25.5228 13.295 25.5228 17.6449C25.5228 18.4021 25.41 19.1593 25.2005 19.8842C24.9266 20.8348 25.4744 21.8336 26.4251 22.1075L26.4252 22.1075Z" fill="#A49C9C"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M40.0408 36.024C40.0408 35.9463 40.0279 35.8686 40.002 35.7909C39.4194 33.2663 37.7365 31.6868 35.6134 31.6868C34.992 31.6868 34.3965 31.8163 33.8528 32.0493C33.2702 30.2886 31.6132 29.0068 29.6584 29.0068C28.9334 29.0068 28.2473 29.1881 27.6518 29.4988C26.9269 28.0488 25.4252 27.0648 23.7034 27.0648C23.1597 27.0648 22.6419 27.1684 22.1629 27.3367V21.9508C22.1629 19.5168 20.1822 17.523 17.7355 17.523C15.3017 17.523 13.308 19.5039 13.308 21.9508V40.4129L11.7028 37.6294C11.1073 36.5548 10.1623 35.8168 9.02304 35.532C7.92264 35.2601 6.7446 35.4543 5.77368 36.0628C4.14253 37.0985 3.6247 39.416 4.44028 41.9406C4.44028 41.9536 4.45323 41.9665 4.45323 41.9795C4.62152 42.4844 8.77707 54.253 13.7223 59.1857C14.0071 59.4706 14.3696 59.613 14.745 59.613C15.1204 59.613 15.4829 59.4706 15.7677 59.1857C16.3373 58.6161 16.3244 57.7098 15.7677 57.1401C11.3662 52.7512 7.36599 41.5263 7.18475 41.0344C6.82228 39.895 6.88701 38.7816 7.32717 38.4968C7.62491 38.3155 7.97445 38.2508 8.31104 38.3285C8.67353 38.4191 8.95832 38.6651 9.17839 39.0535L13.4893 46.5238C13.8129 47.0935 14.4861 47.3653 15.1075 47.197C15.7418 47.0287 16.182 46.4591 16.182 45.7988V21.9638C16.182 21.1222 16.8681 20.4231 17.7225 20.4231C18.564 20.4231 19.2631 21.1093 19.2631 21.9638V38.4968C19.2631 39.2995 19.9103 39.9339 20.7 39.9339C21.5026 39.9339 22.137 39.2865 22.137 38.4968V31.3631C22.137 31.3502 22.1499 31.3372 22.1499 31.3243C22.2276 30.5475 22.8878 29.9519 23.6775 29.9519C24.519 29.9519 25.218 30.6381 25.218 31.4926V39.0276C25.218 39.8303 25.8653 40.4647 26.655 40.4647C27.4576 40.4647 28.092 39.8174 28.092 39.0276V33.4476C28.092 32.606 28.7781 31.9069 29.6325 31.9069C30.474 31.9069 31.173 32.5931 31.173 33.4476V39.0406C31.173 39.8433 31.8203 40.4777 32.61 40.4777C33.3997 40.4777 34.047 39.8303 34.047 39.0406V36.1275C34.047 35.286 34.7331 34.5869 35.5875 34.5869C36.5584 34.5869 36.9856 35.7392 37.128 36.3347C37.2057 37.7459 37.8659 50.8739 35.4062 56.9071C35.1085 57.6451 35.458 58.4866 36.1959 58.7844C36.3772 58.8621 36.5584 58.888 36.7397 58.888C37.3093 58.888 37.853 58.5514 38.0731 57.9946C40.947 51.0293 40.0796 36.6325 40.0408 36.024V36.024Z" fill="#DF0002"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M3.56165 26.671C3.83563 26.671 4.1257 26.6066 4.38357 26.4776C5.26995 26.0264 5.60839 24.9467 5.15714 24.0603C4.12572 22.062 3.60999 19.9187 3.60999 17.6464C3.60999 9.89487 9.91138 3.59374 17.6632 3.59374C25.415 3.59374 31.7164 9.89487 31.7164 17.6464C31.7164 18.8712 31.5553 20.0798 31.2491 21.2562C30.9912 22.2232 31.5714 23.2062 32.5222 23.4479C33.4892 23.7058 34.4723 23.1256 34.714 22.1748C35.1008 20.7083 35.2942 19.1935 35.2942 17.6464C35.2942 7.91268 27.3812 1.00002e-05 17.6471 1.00002e-05C7.91299 1.00002e-05 -1.38118e-05 7.91268 -1.38118e-05 17.6464C-1.38118e-05 20.4344 0.676857 23.2223 1.93391 25.688C2.27235 26.3165 2.90088 26.671 3.56164 26.671L3.56165 26.671Z" fill="#A49C9C"/>
  </svg>
);

const SocialIcon = () => (
  <svg width="46" height="46" viewBox="0 0 65 65" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M62.6774 34.4726C62.6774 35.0492 62.2084 35.5172 61.6328 35.5172H49.6531L44.5428 41.6481C44.3359 41.8946 43.8742 41.7285 43.8742 41.4068V35.5172H30.2941C29.7185 35.5172 29.2495 35.0492 29.2495 34.4726V29.2495H30.2941C32.0219 29.2495 33.428 27.8434 33.428 26.1156V10.4462H61.6328C62.2084 10.4462 62.6774 10.9142 62.6774 11.4909L62.6774 34.4726ZM37.6065 55.3651C37.6065 55.9417 37.1374 56.4097 36.5618 56.4097H22.9817V62.2993C22.9817 62.6221 22.52 62.7892 22.3132 62.5406L17.2029 56.4097H5.22312C4.64753 56.4097 4.1785 55.9417 4.1785 55.3651V34.4726C4.1785 33.896 4.64754 33.428 5.22312 33.428H15.5283L16.5301 34.6293C17.0002 35.1934 17.6907 35.5172 18.4251 35.5172C19.6556 35.5172 20.67 34.6084 20.8538 33.428H27.1602V34.4726C27.1602 36.2004 28.5663 37.6065 30.2941 37.6065H37.6065L37.6065 55.3651ZM3.13387 27.1602C2.55828 27.1602 2.08925 26.6922 2.08925 26.1156V3.13387C2.08925 2.55724 2.55829 2.08925 3.13387 2.08925H30.2941C30.8697 2.08925 31.3387 2.55724 31.3387 3.13387V26.1156C31.3387 26.6922 30.8697 27.1602 30.2941 27.1602H18.8032V33.0498C18.8032 33.3726 18.3415 33.5397 18.1347 33.2911L13.0244 27.1602H3.13387ZM61.6328 8.35699H33.428V3.13387C33.428 1.40606 32.0219 0 30.2941 0H3.13387C1.40606 0 0 1.40606 0 3.13387V26.1156C0 27.8434 1.40606 29.2495 3.13387 29.2495H12.0466L13.788 31.3387H5.22312C3.49531 31.3387 2.08925 32.7448 2.08925 34.4726V55.3651C2.08925 57.0929 3.49531 58.4989 5.22312 58.4989H16.2251L20.7086 63.8787C21.1787 64.4428 21.8692 64.7667 22.6036 64.7667C23.9637 64.7667 25.071 63.6594 25.071 62.2993V58.4989H36.5618C38.2896 58.4989 39.6957 57.0929 39.6957 55.3651V37.6065H41.785V41.4068C41.785 42.7669 42.8923 43.8742 44.2524 43.8742C44.9867 43.8742 45.6772 43.5504 46.1473 42.9863L50.6308 37.6065H61.6328C63.3606 37.6065 64.7667 36.2004 64.7667 34.4726V11.4909C64.7667 9.76305 63.3606 8.35699 61.6328 8.35699Z" fill="#DF0002"/>
  </svg>
);

const AiMlIcon = () => (
  <svg width="46" height="47" viewBox="0 0 63 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M51.2024 60.4614H2.72363V11.9826H26.963V9.25906H0.000110006V63.1849H53.9259V32.9537H51.2024L51.2024 60.4614Z" fill="#DF0002"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M47.4776 9.35027L53.5598 15.4325L25.7813 43.1202L19.7899 37.038L47.4776 9.35027ZM59.0065 9.89494L55.4661 13.5261L49.4747 7.4439L53.1059 3.90351L59.0065 9.89494ZM18.0651 39.1259L23.6026 44.7542L16.8849 45.8436L18.0651 39.1259ZM15.614 37.2195L13.7077 49.1116L25.5997 47.2052L26.7799 45.9343L62.91 9.89495L52.9243 0L16.8849 36.0394L15.614 37.2195Z" fill="white"/>
  </svg>
);

/* phase glyphs (colored) */
const G = (c, p) => <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{p}</svg>;
const PhSearch = (c) => G(c, <><circle cx="11" cy="11" r="7" /><line x1="21" y1="21" x2="16.5" y2="16.5" /></>);
const PhPen = (c) => G(c, <><path d="M14 4l6 6L9 21H3v-6L14 4z" /></>);
const PhCode = (c) => G(c, <><polyline points="8 7 3 12 8 17" /><polyline points="16 7 21 12 16 17" /></>);
const PhRocket = (c) => G(c, <><path d="M5 15c-1.5 1.3-2 6-2 6s4.7-.5 6-2c.7-.8.7-2 0-2.7-.8-.7-2-.7-4-1.3z" /><path d="M12 15l-3-3a22 22 0 014-9 11.5 11.5 0 015 5 22 22 0 01-9 4z" /></>);

/* benefit glyphs (white) */
const W = (p) => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{p}</svg>;
const Target = () => W(<><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1.5" /></>);
const ClockW = () => W(<><circle cx="12" cy="12" r="9" /><polyline points="12 7 12 12 16 14" /></>);
const Trend = () => W(<><polyline points="3 17 9 11 13 15 21 7" /><polyline points="15 7 21 7 21 13" /></>);
const Shield = () => W(<><path d="M12 3l8 3v5c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6z" /><polyline points="8.5 12 11 14.5 15.5 9.5" /></>);
const Spark = () => W(<><path d="M12 3l2 6 6 2-6 2-2 6-2-6-6-2 6-2z" /></>);
const ArrowR = () => W(<><line x1="4" y1="12" x2="19" y2="12" /><polyline points="13 6 19 12 13 18" /></>);

const EXPERTISE = [
  [<SeoIcon />, "Search Engine Optimization"],
  [<WebIcon />, "Website design & Development"],
  [<VideoIcon />, "Video editing & Production"],
  [<PerformanceIcon />, "Performance Marketing"],
  [<SocialIcon />, "Social media Marketing"],
  [<AiMlIcon />, "AI & ML Solutions"],
];

const PHASES = [
  { n: "Phase 01", t: "Discovery", c: "#2563EB", bg: "#E8F0FF", icon: PhSearch, d: "Understanding your business, goals, and challenges", dur: "1-2 weeks",
    acts: ["Stakeholder interviews", "Market & competitor research", "User research & personas", "Project requirements gathering", "Technical feasibility assessment"],
    deliver: ["Project brief", "User personas", "Research findings", "Technical specification"] },
  { n: "Phase 02", t: "Design", c: "#10B981", bg: "#E6FAF1", icon: PhPen, d: "Creating beautiful, functional designs", dur: "2-4 weeks",
    acts: ["Information architecture", "Wireframing & user flows", "Visual design & branding", "Interactive prototyping", "Usability testing"],
    deliver: ["Wireframes", "High-fidelity designs", "Interactive prototypes", "Design system"] },
  { n: "Phase 03", t: "Develop", c: "#7C3AED", bg: "#F1EBFF", icon: PhCode, d: "Building your solution with best practices", dur: "4-8 weeks",
    acts: ["Frontend development", "Backend development", "API integration", "Quality assurance testing", "Performance optimization"],
    deliver: ["Functional website/app", "Source code", "Documentation", "Test reports"] },
  { n: "Phase 04", t: "Deploy", c: "#EF4444", bg: "#FDE9E9", icon: PhRocket, d: "Launching and supporting your project", dur: "1-2 weeks",
    acts: ["Deployment & hosting setup", "Performance monitoring", "Team training & handover", "Ongoing maintenance", "Continuous improvement"],
    deliver: ["Live website/app", "Analytics setup", "Maintenance plan", "Support documentation"] },
];

const BENEFITS = [
  [<Target />, "Clear communication at every stage", "Stay informed with regular updates and transparent discussions"],
  [<ClockW />, "On-time delivery", "Structured timelines ensure your project launches when expected"],
  [<Trend />, "Scalable solutions", "Built to grow with your business needs"],
  [<Shield />, "Quality assurance throughout", "Rigorous testing at every phase ensures excellence"],
  [<Spark />, "Collaborative decision-making", "Your input shapes every milestone"],
  [<ArrowR />, "Post-launch support", "We are with you beyond deployment"],
];

export default function ServicesPage() {
  return (
    <div className="qe-svc">
      <style>{CSS}</style>
      <div className="canvas">

        {/* HERO */}
        <header className="hero">
          <SiteNav active="services" />
          <div className="hero-inner">
            <h1 className="svc-title"><span>Our</span><span className="hl">Services</span></h1>
            <p className="hero-p">Quint Edge AI is a dynamic and innovative design agency that brings creative ideas to life. We work with a wide range of clients to develop unique and effective branding, web design, and graphic design solutions.</p>
          </div>
        </header>

        {/* BUILD STRONG */}
        <section className="build">
          <h2 className="disp">We Build Strong, High&ndash;Performing Brands Through Strategic Design</h2>
          <p>Our expert teams deliver this through thoughtful creativity, precise design execution, and reliable production standards. Using modern tools and smart workflows, we ensure faster delivery, transparent processes, and cost-effective results for every project.</p>
          <div className="build-cards"><div className="bcard" /><div className="bcard" /><div className="bcard" /><div className="bcard" /></div>
        </section>

        {/* EXPERTISE (dark) */}
        <section className="expertise">
          <div className="topline" />
          <div className="exp-grid">
            <div className="ecard"><div className="icn">{EXPERTISE[0][0]}</div><h3>{EXPERTISE[0][1]}</h3></div>
            <div className="ecard"><div className="icn">{EXPERTISE[1][0]}</div><h3>{EXPERTISE[1][1]}</h3></div>
            <div className="exp-head">
              <h2 className="disp">Our Digital Marketing Expertise</h2>
              <p>From strategy to execution, our team blends creativity and technology to grow your brand across every digital channel.</p>
            </div>
            {EXPERTISE.slice(2).map(([ic, t]) => (
              <div className="ecard" key={t}><div className="icn">{ic}</div><h3>{t}</h3></div>
            ))}
          </div>
        </section>

        {/* PROCESS (white) */}
        <section className="process">
          <div className="timeline">
            {PHASES.map((p, i) => {
              const content = (
                <div className="side">
                  <div className="ph-head">
                    <div className="ph-tile" style={{ background: p.bg }}>{p.icon(p.c)}</div>
                    <div>
                      <div className="ph-label">{p.n}</div>
                      <div className="ph-title disp">{p.t}</div>
                    </div>
                  </div>
                  <div className="ph-desc">{p.d}</div>
                  <div className="ph-kt">Key Activities</div>
                  <ul className="ph-acts">{p.acts.map((a) => <li key={a}><Check /> {a}</li>)}</ul>
                  <div className="ph-dur"><Clock /> Duration: {p.dur}</div>
                </div>
              );
              const deliver = (
                <div className="side">
                  <div className="deliver">
                    <h4>Deliverables</h4>
                    {p.deliver.map((d) => <div className="row" key={d}><span className="dot" /> {d}</div>)}
                  </div>
                </div>
              );
              const rev = i % 2 === 1;
              return (
                <div className={"phase" + (rev ? " rev" : "")} key={p.n}>
                  {content}
                  {deliver}
                </div>
              );
            })}
          </div>
        </section>

        {/* WHY OUR PROCESS WORKS (dark) */}
        <section className="why">
          <div className="topline" />
          <div className="center">
            <h2 className="disp"><span>Why</span><span className="hl">Our Process</span><span>Works</span></h2>
            <div className="sub">Benefits of working with Quint Edge AI</div>
          </div>
          <div className="why-grid">
            {BENEFITS.map(([ic, t, d]) => (
              <div className="bcard2" key={t}><div className="tile">{ic}</div><h3>{t}</h3><p>{d}</p></div>
            ))}
          </div>
        </section>

        {/* FOOTER */}
        <Footer />

      </div>
    </div>
  );
}
