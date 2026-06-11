import { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import SiteNav from "./SiteNav";

/**
 * Quint Edge — Home Page
 * Faithful replica of the Figma "Digital Agency Landing Page" design,
 * rebranded to Quint Edge. Built on a 1440px artboard with the exact
 * spacing, type sizes, weights, radii and colors captured from Figma.
 *
 * FONTS
 *  - Headings: Monument Extended (you have the license). Drop the files in
 *    /public/fonts/ as referenced in the @font-face block below and they
 *    will render exactly. A wide-display fallback (Syne) loads meanwhile.
 *  - Body: Archivo (free, Google Fonts).
 *
 * IMAGES are neutral placeholders (#E5E7EC) exactly like the source design —
 * swap the .ph blocks for your real <img> tags.
 */

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Archivo:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Syne:wght@400;500;600;700;800&display=swap');

/* When you add your licensed Monument Extended files, these take over the headings. */
@font-face{
  font-family:'Monument Extended';
  src:url('/fonts/MonumentExtended-Regular.woff2') format('woff2'),
      url('/fonts/MonumentExtended-Regular.otf') format('opentype');
  font-weight:400; font-style:normal; font-display:swap;
}
@font-face{
  font-family:'Monument Extended';
  src:url('/fonts/MonumentExtended-Ultrabold.woff2') format('woff2'),
      url('/fonts/MonumentExtended-Ultrabold.otf') format('opentype');
  font-weight:800; font-style:normal; font-display:swap;
}

:root{
  --red:#DF0002;
  --dark:#222222;
  --card-dark:#2A2A2A;
  --hero:#161616;
  --light:#FAFAFA;
  --ph:#E5E7EC;
  --t-444:#444444;
  --t-666:#666666;
  --t-aaa:#AAAAAA;
  --t-ddd:#DDDDDD;
  --display:'Monument Extended','Syne',sans-serif;
  --body:'Archivo',system-ui,sans-serif;
}

*{margin:0;padding:0;box-sizing:border-box}
.qe-root{font-family:var(--body);color:#000;background:#fff;overflow-x:hidden}
.qe-root img{display:block;max-width:100%}
.disp{font-family:var(--display)}

/* generic placeholder image block */
.ph{background:var(--ph);background-image:linear-gradient(135deg,#eceef2 0%,#dfe2e8 100%);border-radius:32px}

/* ===== centered 1440 artboard ===== */
.canvas{width:100%;max-width:none;margin:0 auto;position:relative}

/* ===================== HERO (dark) ===================== */
.hero{background:var(--hero) url('/hero-bg.webp') center/cover fixed no-repeat;color:#fff;position:relative;padding-bottom:160px}
.nav{display:flex;align-items:center;justify-content:space-between;padding:clamp(24px,4vw,48px) clamp(20px,5vw,100px) 0;flex-wrap:wrap;gap:16px}
.logo{display:flex;align-items:center;gap:10px}.logo img{height:56px;width:auto;display:block}
.nav-links{display:flex;align-items:center;gap:56px;padding:8px}
.nav-links a{color:#fff;text-decoration:none;font-size:18px;font-weight:500;opacity:.92;transition:opacity .2s}
.nav-links a.active{color:var(--red);opacity:1}
.nav-links a:hover{opacity:1}
.btn-contact{background:var(--red);color:#fff;border:none;border-radius:32px;padding:20px 32px;font-family:var(--body);font-size:18px;font-weight:600;cursor:pointer;transition:transform .2s,filter .2s}
.btn-contact:hover{filter:brightness(1.08);transform:translateY(-1px)}

.hero-inner{text-align:center;padding:clamp(40px,6vw,80px) clamp(20px,5vw,100px) 0}
.wordmark{font-family:var(--display);font-weight:800;font-size:clamp(48px,8vw,96px);line-height:1;display:inline-flex;align-items:center;gap:14px;letter-spacing:-1px;flex-wrap:wrap;justify-content:center}
.wordmark .hl{background:var(--red);color:#fff;border-radius:16px;padding:6px 22px 12px}
.hero-sub{font-family:var(--display);font-weight:400;font-size:clamp(20px,3.3vw,40px);line-height:1.1;color:#fff;margin-top:18px;white-space:nowrap;margin-left:auto;margin-right:auto}
.hero-p{font-family:var(--body);font-size:clamp(16px,1.9vw,24px);line-height:1.7;letter-spacing:-.01em;color:#d8d8d8;max-width:954px;margin:34px auto 0}

/* tilted hero cards, overlapping into white section */
.hero-cards{display:flex;flex-wrap:wrap;justify-content:center;gap:24px;margin-top:64px;padding:0 20px;position:relative;z-index:3}
.hero-card{width:280px;height:340px;background:var(--ph);border:none;border-radius:32px;box-shadow:0 30px 60px rgba(0,0,0,.35)}
.hero-card:nth-child(1){transform:rotate(-7deg)}
.hero-card:nth-child(2){transform:rotate(4deg) translateY(20px)}
.hero-card:nth-child(3){transform:rotate(-4deg) translateY(10px)}
.hero-card:nth-child(4){transform:rotate(7deg)}

/* ===================== WHITE CONTENT ===================== */
.white-wrap{background:#161616;border-radius:0;margin-top:0;position:relative;z-index:2;padding-top:clamp(80px,10vw,140px)}

/* thinkers row */
.thinkers{display:flex;flex-wrap:wrap;justify-content:space-between;align-items:flex-start;padding:0 clamp(20px,5vw,112px);gap:clamp(28px,4vw,60px)}
.thinkers h2{font-family:var(--display);font-weight:400;font-size:clamp(26px,3.2vw,40px);line-height:1.05;flex:1 1 360px;max-width:552px;color:#fff}
.thinkers p{font-family:var(--body);font-size:clamp(15px,1.6vw,20px);line-height:1.7;letter-spacing:-.01em;color:#d8d8d8;flex:1 1 340px;max-width:536px;margin-top:8px}

/* two feature images */
.feature-imgs{display:flex;flex-wrap:wrap;justify-content:center;gap:clamp(20px,3vw,40px);padding:56px clamp(20px,5vw,100px) clamp(60px,8vw,100px);align-items:flex-end}
.feature-imgs .ph.a{flex:1 1 480px;max-width:757px;aspect-ratio:757/504;margin-top:42px}
.feature-imgs .ph.b{flex:1 1 300px;max-width:443px;aspect-ratio:443/663}

/* ===================== SERVICES ===================== */
.services{padding:clamp(70px,9vw,120px) clamp(20px,5vw,100px) 0;position:relative;background:#161616;color:#fff}
.tag{position:absolute;left:-1px;top:0;writing-mode:vertical-rl;transform:rotate(180deg);background:var(--red);color:#fff;font-family:var(--body);font-weight:600;font-size:16px;letter-spacing:.12em;padding:24px 16px;border-radius:0 8px 8px 0}
.sec-head{font-family:var(--display);font-weight:800;font-size:clamp(28px,4vw,48px);line-height:1.05;display:inline-flex;flex-wrap:wrap;gap:14px;align-items:center}
.sec-head .hl{background:var(--red);color:#fff;border-radius:16px;padding:4px 18px 8px}
.sec-head.dark .hl{color:#fff}
.services .intro{font-family:var(--body);font-size:20px;line-height:1.7;letter-spacing:-.01em;color:#d8d8d8;max-width:456px;margin-top:18px}

.services-grid{display:flex;flex-wrap:wrap;gap:24px;margin-top:48px;align-items:stretch}
.accordion{display:flex;flex-direction:column;gap:24px;flex:1 1 340px;min-width:280px}
.svc{display:flex;align-items:center;justify-content:space-between;border:1.5px solid #333;border-radius:18px;padding:22px 26px;cursor:pointer;transition:all .25s;background:#1a1a1a}
.svc .l{display:flex;align-items:center;gap:26px}
.svc .num{font-family:var(--display);font-weight:400;font-size:22px;color:#fff}
.svc .name{font-family:var(--body);font-weight:600;font-size:22px;color:#fff}
.svc .arr{width:42px;height:42px;display:grid;place-items:center;color:#111;transition:transform .25s}
.svc.active{background:#0E0E0E;border-color:#0E0E0E}
.svc.active .num{color:var(--red)}
.svc.active .name,.svc.active .arr{color:#fff}
.svc.active .arr{transform:translateX(4px)}

.svc-mid{flex:2 1 360px;min-height:400px}
.svc-mid .ph{height:100%;min-height:400px}

.cta-col{display:flex;flex-direction:column;gap:24px;flex:1 1 240px;min-width:220px}
.mini{border-radius:22px;padding:24px;height:278px;display:flex;flex-direction:column;justify-content:space-between}
.mini.dark{background:#161616;color:#fff}
.mini.red{background:var(--red);color:#fff}
.mini p{font-family:var(--body);font-size:18px;line-height:1.7}
.mini.red p{color:#1c1c1c}
.mini .go{display:flex;align-items:center;justify-content:space-between;gap:14px}
.mini .go span{font-family:var(--display);font-weight:400;font-size:22px;line-height:1.15}
.mini .circle{width:46px;height:46px;border-radius:50%;display:grid;place-items:center;flex:none}
.mini.dark .circle{background:#2b2b2b;color:#fff}
.mini.red .circle{background:#fff;color:#111}

/* ===================== PROCESS (dark) ===================== */
.process{background:var(--dark);color:#fff;margin-top:clamp(70px,9vw,120px);padding:clamp(60px,8vw,96px) clamp(20px,6vw,116px);position:relative;clip-path:polygon(0 26px,100% 0,100% 100%,0 100%)}
.process .topline{position:absolute;left:0;right:0;top:0;height:26px;background:var(--red);clip-path:polygon(0 100%,100% 0,100% 100%,0 100%)}
.process .center{text-align:center;max-width:760px;margin:0 auto}
.process .sec-head{justify-content:center}
.process .intro{font-family:var(--body);font-size:20px;line-height:1.7;letter-spacing:-.01em;color:var(--t-aaa);margin-top:20px}
.proc-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-top:70px}
.proc-card{background:#2b2b2b;border-radius:28px;padding:40px}
.proc-card .pnum{font-family:var(--display);font-weight:400;font-size:34px;color:#6b6b6b}
.proc-card .pimg{height:230px;background:#e9ebef;border-radius:20px;margin:26px 0}
.proc-card h3{font-family:var(--display);font-weight:400;font-size:24px;line-height:1}
.proc-card p{font-family:var(--body);font-size:18px;line-height:1.7;letter-spacing:-.01em;color:var(--t-ddd);margin-top:14px}

/* ===================== PORTFOLIO (light) ===================== */
.portfolio{background:var(--light);padding:clamp(60px,8vw,90px) clamp(20px,5vw,100px);position:relative}
.pf-head{display:flex;flex-wrap:wrap;gap:20px;align-items:center;justify-content:space-between}
.pf-head h2{font-family:var(--display);font-weight:800;font-size:clamp(26px,3.6vw,44px);line-height:1.05;display:flex;flex-wrap:wrap;gap:12px;align-items:center}
.pf-head h2 .hl{background:var(--red);color:#fff;border-radius:12px;padding:2px 14px 6px}
.see-more{display:flex;align-items:center;gap:12px;background:#fff;border:1.5px solid #e2e2e2;border-radius:30px;padding:14px 26px;font-family:var(--body);font-weight:600;font-size:16px;cursor:pointer}
.pf-stage{display:flex;gap:20px;margin-top:40px;position:relative;align-items:center}
.pf-arrow{width:48px;height:48px;border-radius:50%;border:1.5px solid #cfcfcf;background:#fff;display:grid;place-items:center;cursor:pointer;flex:none;transition:background .2s,color .2s}
.pf-arrow:hover{background:#111;color:#fff;border-color:#111}
.pf-cards{display:flex;gap:20px;flex:1;overflow:hidden}
.pf-card{flex:1;min-width:0;aspect-ratio:535/463;background:#fff;border-radius:24px;overflow:hidden}
.pf-card .ph{height:100%;width:100%;border-radius:24px}
.pf-caption{text-align:center;max-width:829px;margin:34px auto 0}
.pf-tags{display:flex;justify-content:center;gap:10px;margin-bottom:14px}
.pf-tags span{background:#eef0f3;color:#555;border-radius:8px;padding:6px 14px;font-family:var(--body);font-size:13px}
.pf-caption h3{font-family:var(--display);font-weight:400;font-size:clamp(22px,3vw,34px);line-height:1.1;display:inline-flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:14px}
.pf-caption h3 .dot{width:30px;height:30px;border-radius:50%;background:var(--red);display:grid;place-items:center;color:#fff}
.pf-caption p{font-family:var(--body);font-size:18px;line-height:1.7;letter-spacing:-.01em;color:var(--t-666);margin-top:14px}

/* ===================== CONTACT FORM (red band) ===================== */
.formband{background:var(--red);padding:clamp(40px,5vw,60px) clamp(18px,4vw,52px)}
.formcard{background:#fff;border-radius:36px;padding:clamp(36px,5vw,72px);display:flex;flex-wrap:wrap;gap:clamp(32px,5vw,64px);align-items:center;justify-content:space-between}
.form-left{flex:1 1 340px;max-width:440px}
.form-left h2{font-family:var(--display);font-weight:800;font-size:clamp(38px,5vw,60px);line-height:1.02;color:#0e0e0e}
.form-left p{font-family:var(--body);font-size:16px;line-height:1.7;color:var(--t-666);margin-top:22px;max-width:340px}
.form-fields{flex:1 1 460px;max-width:570px;display:flex;flex-direction:column;gap:clamp(24px,3vw,36px)}
.form-row{display:flex;flex-wrap:wrap;gap:24px}
.form-row .qe-input{flex:1 1 200px}
.qe-input{font-family:var(--body);font-size:16px;color:#222;background:transparent;border:none;border-bottom:1px solid #A8A8A8;padding:14px 10px;outline:none;width:100%}
.qe-input::placeholder{color:#9a9a9a}
.qe-input:focus{border-bottom-color:var(--red)}
textarea.qe-input{min-height:96px;resize:vertical}
.form-actions{display:flex;justify-content:flex-end}
.btn-project{display:inline-flex;align-items:center;gap:14px;background:#161616;color:#fff;border:none;border-radius:40px;padding:8px 26px 8px 8px;font-family:var(--body);font-weight:600;font-size:16px;cursor:pointer;transition:transform .2s,filter .2s}
.btn-project:hover{filter:brightness(1.2);transform:translateY(-1px)}
.btn-project .bp-circle{width:40px;height:40px;border-radius:50%;background:#fff;color:#111;display:grid;place-items:center;flex:none}
@media(max-width:560px){.form-actions{justify-content:stretch}.btn-project{width:100%;justify-content:center}}

/* ===================== TESTIMONIALS (dark) ===================== */
.testi{background:var(--hero);color:#fff;padding:clamp(60px,8vw,90px) clamp(20px,5vw,100px);position:relative;overflow:hidden}
.testi .center{text-align:center;max-width:780px;margin:0 auto}
.testi .sec-head{justify-content:center;font-size:40px}
.testi .intro{font-family:var(--body);font-size:20px;line-height:1.7;color:var(--t-aaa);margin-top:18px}
.testi-stage{display:flex;align-items:center;justify-content:center;gap:24px;margin-top:54px}
.testi-card{background:var(--card-dark);border-radius:32px;padding:24px clamp(24px,3vw,40px);width:min(680px,80vw);flex:none;transition:opacity .3s,transform .3s}
.testi-card.side{opacity:.32;transform:scale(.94);width:min(420px,46vw)}
.testi-top{display:flex;align-items:flex-start;justify-content:space-between}
.testi-who{display:flex;align-items:center;gap:16px}
.av{width:54px;height:54px;border-radius:50%;background:#3a3a3a;flex:none}
.testi-who .nm{font-family:var(--body);font-weight:600;font-size:20px}
.testi-who .role{font-family:var(--body);font-size:14px;color:#9b9b9b}
.quote{font-family:var(--display);font-size:46px;color:#3d3d3d;line-height:.6}
.testi-card .body{font-family:var(--body);font-style:italic;font-size:20px;line-height:1.7;margin-top:18px;color:#f0f0f0}
.testi-nav{display:flex;justify-content:center;gap:16px;margin-top:40px}
.testi-nav button{width:48px;height:48px;border-radius:50%;border:1.5px solid #4a4a4a;background:transparent;color:#fff;display:grid;place-items:center;cursor:pointer;transition:background .2s}
.testi-nav button:hover{background:#fff;color:#111}

/* ===================== FOOTER ===================== */
.footer{background:#fff;padding:clamp(60px,8vw,90px) clamp(20px,5vw,100px) 60px;position:relative;clip-path:polygon(0 22px,100% 0,100% 100%,0 100%)}
.footer .topred{position:absolute;left:0;right:0;top:0;height:22px;background:var(--red);clip-path:polygon(0 100%,100% 0,100% 100%,0 100%)}
.banner{display:flex;align-items:center;justify-content:center;gap:40px;flex-wrap:wrap}
.banner span{font-family:var(--display);font-weight:800;font-size:clamp(34px,6vw,72px);line-height:1;color:#000}
.banner .star{width:32px;height:32px;color:var(--red)}
.divider{display:flex;align-items:center;gap:14px;margin:44px 0 56px}
.divider .ln{height:4px;background:var(--dark);flex:1;border-radius:2px}
.divider .st{width:24px;height:24px;color:var(--dark)}
/* Brand banner (Innovate · Inspire · Create) */
.brand-band{position:relative;background:#fff;padding:clamp(58px,8vw,92px) clamp(20px,5vw,100px) clamp(40px,6vw,64px)}
.brand-band .topred2{position:absolute;left:0;right:0;top:0;height:22px;background:var(--red);clip-path:polygon(0 100%,100% 0,100% 100%,0 100%)}
.brand-band .banner svg{color:var(--red)}
.brand-band .divider{max-width:1120px;margin:clamp(30px,4vw,46px) auto 0}
.brand-band .divider .ln{height:2px}
.brand-band .divider svg{color:#161616}
.ready{background:linear-gradient(120deg,#262626 0%,#0c0c0c 60%);border-radius:34px;padding:clamp(40px,6vw,80px) clamp(28px,5vw,64px);display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:32px;position:relative;overflow:hidden}
.ready::after{content:"";position:absolute;inset:0;background:radial-gradient(600px 200px at 70% 40%,rgba(255,255,255,.10),transparent 70%);pointer-events:none}
.ready h2{font-family:var(--display);font-weight:400;font-size:clamp(30px,5vw,64px);line-height:1.05;color:#fff;position:relative}
.btn-started{display:flex;align-items:center;gap:16px;background:#fff;color:#111;border:none;border-radius:70px;padding:16px 32px;font-family:var(--body);font-weight:600;font-size:18px;cursor:pointer;position:relative;transition:transform .2s}
.btn-started:hover{transform:translateY(-2px)}

.foot-brand{display:flex;flex-direction:column;align-items:center;text-align:center;margin-top:80px}
.foot-word{font-family:var(--display);font-weight:800;font-size:clamp(30px,5vw,56px);line-height:1;display:inline-flex;flex-wrap:wrap;justify-content:center;align-items:center;gap:18px}
.foot-word .r{color:var(--red)}
.foot-word .b{color:#000}
.foot-tag{font-family:var(--display);font-weight:400;font-size:26px;margin-top:14px}
.foot-bottom{display:flex;flex-wrap:wrap;gap:18px;align-items:center;justify-content:space-between;margin-top:70px}
.foot-bottom .cp{font-family:var(--body);font-size:15px;color:#555}
.socials{display:flex;gap:14px}
.socials a{width:34px;height:34px;border-radius:50%;display:grid;place-items:center;color:#444;border:1px solid #e0e0e0;transition:all .2s}
.socials a:hover{background:var(--red);color:#fff;border-color:var(--red)}

/* ===== Quint Edge AI additions ===== */
.hero-cta{display:flex;justify-content:center;gap:16px;margin-top:38px;flex-wrap:wrap}
.btn-primary{display:inline-flex;align-items:center;gap:10px;background:var(--red);color:#fff;border:none;border-radius:40px;padding:18px 30px;font-family:var(--body);font-weight:600;font-size:17px;cursor:pointer;transition:transform .2s,filter .2s}
.btn-primary:hover{filter:brightness(1.08);transform:translateY(-1px)}
.btn-ghost{background:transparent;color:#fff;border:1.5px solid rgba(255,255,255,.35);border-radius:40px;padding:18px 30px;font-family:var(--body);font-weight:600;font-size:17px;cursor:pointer;transition:border-color .2s}
.btn-ghost:hover{border-color:#fff}
.hero-trust{display:flex;justify-content:center;align-items:center;flex-wrap:wrap;gap:18px;margin-top:30px;color:var(--t-aaa);font-family:var(--body);font-size:15px}
.hero-trust i{width:5px;height:5px;border-radius:50%;background:var(--red);display:inline-block}

/* hero benefit cards (override the plain frame) */
.hero-card{flex:1 1 230px;max-width:280px;height:320px;background:#fff;border:none;border-radius:28px;box-shadow:0 30px 60px rgba(0,0,0,.35);padding:32px;display:flex;flex-direction:column;justify-content:flex-end;gap:14px;text-align:left}
.hc-h{font-family:var(--display);font-weight:400;font-size:25px;line-height:1.1;color:#111}
.hc-p{font-family:var(--body);font-size:16px;line-height:1.55;color:var(--t-444)}

/* services live description panel */
.svc-mid .svc-panel{height:100%;min-height:400px;background:#0E0E0E;border-radius:24px;padding:40px;display:flex;flex-direction:column;color:#fff}
.svc-panel h3{font-family:var(--display);font-weight:400;font-size:28px;line-height:1.1;color:#fff}
.svc-panel p{font-family:var(--body);font-size:17px;line-height:1.7;color:var(--t-ddd);margin-top:18px}
.svc-panel ul{list-style:none;margin-top:24px;display:flex;flex-direction:column;gap:14px}
.svc-panel li{display:flex;align-items:flex-start;gap:12px;font-family:var(--body);font-size:16px;color:#f0f0f0}
.svc-panel li svg{color:var(--red);flex:none;margin-top:2px}

/* process outcome */
.proc-card .outcome{margin-top:18px;font-family:var(--body);font-size:15px;line-height:1.6;color:#cfcfcf;border-top:1px solid #3a3a3a;padding-top:16px}
.proc-card .outcome .ol{display:inline-block;font-weight:700;font-size:11px;letter-spacing:.14em;color:var(--red);margin-right:8px}

/* FAQ */
.faq{background:#fff;padding:clamp(64px,8vw,100px) clamp(20px,5vw,100px);display:flex;flex-wrap:wrap;gap:clamp(36px,5vw,80px);align-items:flex-start}
.faq-left{flex:1 1 300px;min-width:280px;max-width:420px}
.faq-left h2{font-family:var(--display);font-weight:800;font-size:clamp(30px,4vw,46px);line-height:1.05;color:#111}
.faq-left p{font-family:var(--body);font-size:17px;line-height:1.7;color:var(--t-666);margin-top:22px}
.faq-btns{display:flex;align-items:center;gap:24px;margin-top:30px}
.btn-pill{background:#fff;border:1.5px solid #111;border-radius:40px;padding:14px 28px;font-family:var(--body);font-weight:600;font-size:15px;cursor:pointer}
.faq-link{font-family:var(--body);font-weight:600;font-size:15px;color:#111;text-decoration:underline;text-underline-offset:4px}
.faq-list{flex:2 1 420px;min-width:300px}
.faq-item{border-bottom:1px solid #e4e4e4}
.faq-q{width:100%;background:none;border:none;display:flex;align-items:center;justify-content:space-between;gap:24px;text-align:left;padding:24px 0;cursor:pointer;font-family:var(--body);font-weight:600;font-size:19px;color:#111;line-height:1.4}
.faq-sign{font-size:24px;color:#111;flex:none;line-height:1}
.faq-a{font-family:var(--body);font-size:16px;line-height:1.7;color:var(--t-666);padding:0 40px 26px 0;margin:0}

/* Blog */
.blog{background:var(--hero);color:#fff;padding:clamp(64px,8vw,96px) clamp(20px,5vw,100px) 130px;position:relative}
.blog .center{text-align:center;max-width:760px;margin:0 auto}
.blog .sec-head{justify-content:center}
.blog .intro{font-family:var(--body);font-size:20px;line-height:1.7;color:var(--t-aaa);margin-top:18px}
.blog-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-top:64px}
.blog-card{background:#222;border-radius:24px;padding:32px;display:flex;flex-direction:column;text-decoration:none;color:#fff;transition:transform .2s,background .2s;min-height:300px}
.blog-card:hover{transform:translateY(-4px);background:#262626}
.blog-top{display:flex;align-items:center;justify-content:space-between}
.blog-dot{width:14px;height:14px;border-radius:50%;display:inline-block}
.blog-read{font-family:var(--body);font-size:13px;color:var(--t-aaa)}
.blog-card h3{font-family:var(--body);font-weight:700;font-size:21px;line-height:1.35;margin-top:26px}
.blog-card p{font-family:var(--body);font-size:15px;line-height:1.65;color:var(--t-aaa);margin-top:14px;flex:1}
.blog-go{width:46px;height:46px;border-radius:50%;border:1.5px solid var(--red);color:var(--red);display:grid;place-items:center;margin-top:24px;transition:background .2s,color .2s}
.blog-card:hover .blog-go{background:var(--red);color:#fff}

/* final CTA copy */
.ready-copy{position:relative;max-width:680px}
.ready-sub{font-family:var(--body);font-size:17px;line-height:1.7;color:#cfcfcf;margin-top:18px}

/* ===================== DIGITAL MARKETING EXPERTISE (dark) ===================== */
.dm-exp{padding:clamp(60px,8vw,100px) clamp(20px,5vw,112px)}
.dm-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:20px}
.dm-card{background:#222;border:1px solid #2c2c2c;border-radius:24px;padding:36px 32px;display:flex;flex-direction:column;justify-content:space-between;min-height:240px}
.dm-icn{height:64px;display:flex;align-items:flex-end}
.dm-icn img{height:54px;width:auto;max-width:64px;display:block}
.dm-card h3{font-family:var(--body);font-weight:500;font-size:24px;line-height:1.15;margin-top:56px;color:#fff}
.dm-head{grid-column:span 2;display:flex;flex-direction:column;justify-content:center;padding:10px 0 10px 28px}
.dm-head h2{font-family:var(--display);font-weight:800;font-size:clamp(28px,4vw,48px);line-height:1.05;color:#fff}
.dm-head p{font-family:var(--body);font-size:18px;line-height:1.7;color:var(--t-aaa);margin-top:18px;max-width:430px}
@media(max-width:1024px){.dm-grid{grid-template-columns:1fr 1fr}.dm-head{grid-column:span 2;padding-left:0}}
@media(max-width:600px){.dm-grid{grid-template-columns:1fr}.dm-head{grid-column:span 1}.dm-head h2{font-size:30px}.dm-card{min-height:0}.dm-card h3{margin-top:32px;font-size:22px}}

/* ===== Responsive cascade: desktop holds its multi-column shape, ===== */
/* ===== only collapsing on tablet/mobile. ===== */
@media(max-width:1024px){
  .hero{background-attachment:scroll}
  .blog-grid{grid-template-columns:repeat(2,1fr)}
  .testi-card.side{display:none}
  .testi-card{width:min(680px,92vw)}
  .svc-mid{order:3}
}
@media(max-width:900px){
  .hero-sub{white-space:normal}
}
@media(max-width:760px){
  .proc-grid{grid-template-columns:1fr}
  .blog-grid{grid-template-columns:1fr}
  .feature-imgs .ph.a,.feature-imgs .ph.b{flex-basis:100%;max-width:100%}
  .foot-bottom{flex-direction:column;text-align:center}
  .ready{flex-direction:column;align-items:flex-start}
  .hero-card{flex:1 1 100%;max-width:360px;height:auto;min-height:240px;margin:0 auto}
  .hero-card:nth-child(n){transform:none}
  .pf-cards{flex-wrap:wrap}.pf-card{flex:1 1 100%}
}
@media(max-width:600px){
  .tag{display:none}
  .hero-cta{flex-direction:column}
  .hero-cta .btn-primary,.hero-cta .btn-ghost{width:100%;justify-content:center}
  .proc-card{padding:28px}
  .formcard{padding:28px}
  .testi .sec-head{font-size:30px}
  .banner span{font-size:34px}
}
`;

/* ---- tiny inline icons ---- */
const Arrow = ({ s = 22 }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
);
const ArrowUR = ({ s = 22 }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" /></svg>
);
const Tick = ({ s = 18 }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
);
const Star = ({ s = 32 }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c.6 6 5.4 10.8 12 12-6.6 1.2-11.4 6-12 12-.6-6-5.4-10.8-12-12C6.6 10.8 11.4 6 12 0z" /></svg>
);
const Leaf = () => (
  <svg width="40" height="44" viewBox="0 0 40 44" fill="none">
    <path d="M19 2C8 6 2 16 6 30c2 7 8 11 13 12 0-12-2-26 0-40z" fill="#DF0002" />
    <path d="M21 6c10 4 16 13 13 26-1 5-5 9-13 11 1-13 3-25 0-37z" fill="#DF0002" opacity="0.55" />
  </svg>
);
const Fb = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M14 9h3V5h-3c-2.2 0-4 1.8-4 4v2H7v4h3v6h4v-6h3l1-4h-4V9c0-.6.4-1 1-1z" /></svg>);
const In = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5A2.5 2.5 0 102.5 6 2.5 2.5 0 004.98 3.5zM3 8.98h4V21H3zM9 8.98h3.8v1.65h.05A4.17 4.17 0 0117 8.5c4 0 4.7 2.6 4.7 6V21h-4v-5.3c0-1.27 0-2.9-1.77-2.9s-2 1.38-2 2.8V21H9z" /></svg>);
const Gh = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 00-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.1-1.47-1.1-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.5 9.5 0 015 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0012 2z" /></svg>);
const Dr = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 1010 10A10 10 0 0012 2zm6.6 6.2a8.4 8.4 0 011.9 5.2c-.3-.06-3.2-.66-6.1-.3-.06-.16-.13-.32-.2-.49 3.1-1.27 4.3-3.1 4.4-3.27zM12 3.5a8.5 8.5 0 015.4 1.95c-.1.14-1.2 1.86-4.18 3a44 44 0 00-2.9-4.55A8.6 8.6 0 0112 3.5zM8.7 4.6a52 52 0 012.9 4.5c-3.7 1-7 .95-7.3.95A8.5 8.5 0 018.7 4.6zM3.5 12v-.22c.36 0 4.2.06 8.16-1.13.22.43.43.87.62 1.31-3.9 1.1-6.05 4.45-6.2 4.7A8.5 8.5 0 013.5 12zm8.5 8.5a8.46 8.46 0 01-5.2-1.78c.12-.25 1.6-3.07 5.85-4.56a35.3 35.3 0 011.83 6.5 8.5 8.5 0 01-2.48.84zm3.9-1.62a36.6 36.6 0 00-1.66-6.06c2.73-.43 5.12.28 5.42.38a8.52 8.52 0 01-3.76 5.68z" /></svg>);

/* 4 hero benefit cards (map onto the 4 tilted cards) */
const BENEFITS = [
  ["Save 20+ hrs / week", "Automate repetitive tasks, follow-ups & data entry so your team focuses on growth."],
  ["Capture leads 24/7", "AI chatbots & WhatsApp automation respond instantly — even at 2 AM."],
  ["Rank higher on Google", "Local & technical SEO that puts you in front of buyers in Bangalore and beyond."],
  ["Lower cost per lead", "Performance marketing optimised every week to spend less and convert more."],
];

/* Services accordion — name, 50-word description, benefits */
const SERVICES = [
  {
    name: "AI Automation Solutions",
    desc: "We design AI-powered automation systems that handle your repetitive work — lead routing, follow-ups, data entry, scheduling and support. By connecting your tools into intelligent workflows, Quint Edge AI helps Bangalore businesses cut manual effort, reduce errors and respond faster — freeing your team to focus on what actually grows the company.",
    benefits: ["Save 20+ hours of manual work weekly", "Eliminate human error in repetitive processes", "Connect CRM, email, WhatsApp & tools in one flow", "Scale operations without hiring more staff"],
  },
  {
    name: "Digital Marketing Services",
    desc: "As a full-service digital marketing agency in Bangalore, we run data-driven campaigns across Google, Meta and beyond. From performance marketing and social media to content and lead generation, we build funnels that attract the right audience, lower your cost per lead and turn attention into measurable, predictable revenue growth.",
    benefits: ["Lower cost per lead with weekly optimisation", "Reach the right audience on Google & Meta", "Full-funnel strategy from awareness to sale", "Transparent reporting on spend, leads & ROI"],
  },
  {
    name: "SEO Services",
    desc: "Our SEO services help your business rank on Google where your customers are searching. We combine technical SEO, local SEO and content strategy to grow organic traffic that converts. Whether you target \u201Cnear me\u201D searches in Bangalore or competitive national keywords, we build sustainable rankings that deliver leads month after month.",
    benefits: ["Rank for high-intent local & national keywords", "Win Google Map Pack & \u201Cnear me\u201D visibility", "Technical fixes that improve speed & crawlability", "Organic leads that compound without ad spend"],
  },
  {
    name: "AI Chatbot Development",
    desc: "We build AI chatbots that talk to your customers like your best salesperson — instantly, around the clock. Deployed on your website, WhatsApp or social channels, our chatbots qualify leads, answer questions, book appointments and hand off to your team when needed. Never lose a lead to a slow reply again.",
    benefits: ["Respond to every lead instantly, 24/7", "Qualify & capture leads automatically", "Book appointments & answer FAQs without staff", "Seamless handoff to humans for complex queries"],
  },
];

/* NOTE: replace with REAL, attributable client testimonials before publishing.
   Fabricated reviews violate Google policy and damage trust. */
const TESTIMONIALS = [
  ["Rohan Mehta", "Real Estate Firm, Bangalore", "Quint Edge AI automated our entire lead follow-up process. We went from losing enquiries to responding in seconds — and our site visits jumped 40% within the first month."],
  ["Dr. Ananya Rao", "Healthcare Clinic", "The AI chatbot handles most of our appointment booking now — 60% fully automated. Our front desk is finally free to focus on patients instead of the phone."],
  ["Priya Nair", "D2C E-commerce Brand", "Their team understands both automation and marketing — a rare combination. Our ad costs dropped, our ROAS hit 2.4x, and our sales actually went up."],
  ["Karan Shah", "SaaS Startup, Bangalore", "We plugged Quint Edge AI's WhatsApp automation into our onboarding and our trial-to-paid conversions climbed almost 30%. Setup was fast and the team actually understood our funnel."],
  ["Sneha Reddy", "Restaurant Group", "Reservations and FAQs are fully handled by the chatbot now. Walk-ins still get answered at midnight, and our staff finally stopped living on the phone."],
  ["Vikram Iyer", "Real Estate Developer", "Their performance marketing brought us genuinely qualified site-visit leads, not junk clicks. Cost per lead dropped by a third and the pipeline has stayed full for months."],
  ["Aisha Khan", "Boutique Fashion Label", "We went from invisible to ranking on the first page for our key Bangalore searches. Organic orders now come in every day without us touching the ad budget."],
  ["Arjun Desai", "EdTech Company", "The CRM automation they built nurtures every enquiry on its own. No lead slips through, follow-ups happen instantly, and our counsellors only talk to people ready to enrol."],
];

/* FAQs — written for featured snippets, voice search & AI engines */
const FAQS = [
  ["What does an AI automation company in Bangalore do?", "An AI automation company in Bangalore builds intelligent systems that handle repetitive business tasks automatically. Quint Edge AI automates lead follow-ups, customer support, appointment booking, data entry and workflows using AI chatbots, WhatsApp automation and CRM integrations — helping businesses save time, reduce errors and respond to customers instantly."],
  ["How much do digital marketing services cost in Bangalore?", "Digital marketing in Bangalore typically ranges from \u20B925,000 to \u20B92,00,000+ per month, depending on services, ad budget and goals. At Quint Edge AI we build custom packages around your objectives and budget. Book a free strategy call for a transparent, tailored quote."],
  ["What is AI chatbot development?", "AI chatbot development is the process of designing intelligent chat assistants that talk to your customers automatically. These chatbots answer questions, qualify leads, book appointments and provide 24/7 support on your website, WhatsApp or social channels — capturing leads even when your team is offline."],
  ["How can WhatsApp automation help my business?", "WhatsApp automation helps your business respond instantly, follow up automatically and never miss a lead. It can send appointment reminders, recover abandoned carts, qualify enquiries and answer FAQs on WhatsApp — the channel most Indian customers already use — improving response times and conversions."],
  ["How long does SEO take to show results?", "SEO usually takes 3 to 6 months to show meaningful results, with stronger growth after 6 months. Local SEO and \u201Cnear me\u201D rankings can improve within weeks. Unlike paid ads, SEO results compound over time, delivering organic leads long after the work is done."],
  ["What is the difference between SEO and performance marketing?", "SEO grows free, organic traffic over time, while performance marketing uses paid ads to generate leads immediately. SEO is a compounding long-term investment; performance marketing delivers fast, measurable results. Most businesses get the best ROI by combining both — which Quint Edge AI does."],
  ["Can small businesses and startups afford AI automation?", "Yes. AI automation is now affordable and accessible for small businesses and startups. Automations like WhatsApp follow-ups, chatbots and lead routing often pay for themselves quickly by saving staff hours and capturing leads that would otherwise be lost. Quint Edge AI scales solutions to your budget."],
  ["How does AI automation generate more leads?", "AI automation generates more leads by responding to every enquiry instantly, qualifying prospects automatically and nurturing them with timely follow-ups. Because most leads go cold within minutes, instant AI responses on your website and WhatsApp sharply increase how many enquiries convert into customers."],
  ["Which industries benefit most from AI automation and digital marketing?", "Real estate, healthcare, education, e-commerce and service-based businesses benefit most. Any business that handles enquiries, books appointments or runs ad campaigns can save time and increase conversions by automating follow-ups and optimising marketing — exactly what Quint Edge AI specialises in."],
  ["Why choose Quint Edge AI over other agencies in Bangalore?", "Quint Edge AI combines AI automation and digital marketing under one roof, so your chatbots, campaigns and CRM work together seamlessly. We focus on real outcomes — leads, conversions and hours saved — with transparent reporting, WhatsApp-first automation built for Indian businesses and a local Bangalore team."],
];

/* Blog cards */
const BLOGS = [
  ["#3B82F6", "How AI Automation Helps Small Businesses in Bangalore Save Time", "From WhatsApp follow-ups to AI chatbots, here's how small businesses save 20+ hours a week and never miss a lead — without a big budget or a tech team.", "/blog/ai-automation-small-business-bangalore"],
  ["#DF0002", "WhatsApp Automation vs AI Chatbots: Which One Do You Need?", "They sound similar but solve different problems. We break down what each does, what they cost, and how to choose the right one to convert more enquiries.", "/blog/whatsapp-automation-vs-ai-chatbots"],
  ["#8B5CF6", "How to Lower Your Cost Per Lead with Performance Marketing", "A high cost per lead quietly kills profitability. Here are the funnel fixes, targeting tweaks and automation moves that consistently lower cost per lead.", "/blog/lower-cost-per-lead-performance-marketing"],
];

/* JSON-LD structured data for SEO / AEO / GEO */
const SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "ProfessionalService", "LocalBusiness"],
      "name": "Quint Edge AI",
      "description": "AI automation company and digital marketing agency in Bangalore. We automate business tasks, generate leads and grow revenue with AI chatbots, WhatsApp automation, SEO and performance marketing.",
      "url": "https://quintedge.ai/",
      "areaServed": "Bangalore, Karnataka, India",
      "address": { "@type": "PostalAddress", "addressLocality": "Bangalore", "addressRegion": "Karnataka", "addressCountry": "IN" },
      "sameAs": ["https://www.facebook.com/", "https://www.linkedin.com/", "https://www.instagram.com/"],
    },
    {
      "@type": "FAQPage",
      "mainEntity": FAQS.map(([q, a]) => ({ "@type": "Question", "name": q, "acceptedAnswer": { "@type": "Answer", "text": a } })),
    },
    ...SERVICES.map((s) => ({ "@type": "Service", "name": s.name, "provider": { "@type": "Organization", "name": "Quint Edge AI" }, "areaServed": "Bangalore, India", "description": s.desc })),
  ],
};

export default function QuintEdgeHome() {
  const [t, setT] = useState(0);
  const [pf, setPf] = useState(0);
  const [faq, setFaq] = useState(0);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const handleSubmit = (e) => { e.preventDefault(); setSent(true); };

  const center = ((t % TESTIMONIALS.length) + TESTIMONIALS.length) % TESTIMONIALS.length;
  const left = (center + TESTIMONIALS.length - 1) % TESTIMONIALS.length;
  const right = (center + 1) % TESTIMONIALS.length;

  return (
    <div className="qe-root">
      <style>{CSS}</style>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
      <div className="canvas">

        {/* ---------- HERO ---------- */}
        <header className="hero">
          <SiteNav active="home" />

          <div className="hero-inner">
            <div className="wordmark"><span className="hl">Quint</span><span>Edge AI</span></div>
            <h1 className="hero-sub disp">AI Automation Company &amp; Digital Marketing Agency in Bangalore</h1>
            <p className="hero-p">We help businesses automate operations, generate qualified leads and grow faster with AI. From AI chatbots and WhatsApp automation to SEO and performance marketing, Quint Edge AI builds measurable growth engines for startups, real estate, healthcare, education, e-commerce and service businesses across India.</p>

            <div className="hero-cta">
              <button className="btn-primary">Book a Free Strategy Call <Arrow s={18} /></button>
              <button className="btn-ghost">See How We Work</button>
            </div>

            <div className="hero-trust">
              <span>100+ projects delivered</span><i />
              <span>Bangalore-based · India-wide</span><i />
              <span>Trusted across 6+ industries</span><i />
              <span>4.9/5 client rating</span>
            </div>

            <div className="hero-cards">
              {BENEFITS.map(([h, p]) => (
                <div className="hero-card" key={h}>
                  <div className="hc-h disp">{h}</div>
                  <div className="hc-p">{p}</div>
                </div>
              ))}
            </div>
          </div>
        </header>

        {/* ---------- WHITE CONTENT ---------- */}
        <div className="white-wrap">
          <section className="thinkers">
            <h2 className="disp">AI automation and digital marketing, under one roof.</h2>
            <p>Most agencies do one thing. Quint Edge AI does the two that matter most — together. We build intelligent systems that handle the repetitive work while our marketing team drives qualified traffic, so every lead is captured, nurtured and converted automatically. One accountable team, built for businesses that want to scale without scaling chaos.</p>
          </section>

          {/* ---------- DIGITAL MARKETING EXPERTISE ---------- */}
          <section className="dm-exp">
            <div className="dm-grid">
              <div className="dm-card"><div className="dm-icn"><img src="/icons/seo.svg" alt="" /></div><h3>Search Engine Optimization</h3></div>
              <div className="dm-card"><div className="dm-icn"><img src="/icons/website.svg" alt="" /></div><h3>Website Design &amp; Development</h3></div>
              <div className="dm-head">
                <h2 className="disp">Our Digital Marketing Expertise</h2>
                <p>From strategy to execution, our team blends creativity and technology to grow your brand across every digital channel.</p>
              </div>
              <div className="dm-card"><div className="dm-icn"><img src="/icons/video.svg" alt="" /></div><h3>Video Editing &amp; Production</h3></div>
              <div className="dm-card"><div className="dm-icn"><img src="/icons/performance.svg" alt="" /></div><h3>Performance Marketing</h3></div>
              <div className="dm-card"><div className="dm-icn"><img src="/icons/social.svg" alt="" /></div><h3>Social Media Marketing</h3></div>
              <div className="dm-card"><div className="dm-icn"><img src="/icons/aiml.svg" alt="" /></div><h3>AI &amp; ML Solutions</h3></div>
            </div>
          </section>

          <section className="feature-imgs">
            <div className="ph a" /><div className="ph b" />
          </section>

        </div>


        {/* ---------- PORTFOLIO (light) ---------- */}
        <section className="portfolio">
          <div className="tag">PORTFOLIO</div>
          <div className="pf-head">
            <h2 className="disp"><span>Our</span><span className="hl">Best Work</span><span>&amp; Real Results</span></h2>
            <button className="see-more">See More <Arrow s={18} /></button>
          </div>
          <div className="pf-stage">
            <button className="pf-arrow" onClick={() => setPf(pf - 1)}>&#8592;</button>
            <div className="pf-cards"><div className="pf-card"><div className="ph" /></div><div className="pf-card"><div className="ph" /></div></div>
            <button className="pf-arrow" onClick={() => setPf(pf + 1)}>&#8594;</button>
          </div>
          <div className="pf-caption">
            <div className="pf-tags"><span>Real Estate</span><span>WhatsApp Automation</span><span>AI Chatbot</span><span>Performance Marketing</span></div>
            <h3 className="disp">Real Estate Lead Engine &mdash; Bangalore <span className="dot"><ArrowUR s={16} /></span></h3>
            <p>A residential developer was losing leads because portal and ad enquiries weren't followed up fast enough. We deployed WhatsApp automation and an AI chatbot to respond instantly and qualify buyers, plus location-targeted campaigns &mdash; delivering 3x faster response, a 40% rise in qualified site visits, and 28% lower cost per qualified lead in 90 days.</p>
          </div>
        </section>

        {/* ---------- CONTACT FORM (red band) ---------- */}
        <section className="formband">
          <div className="formcard">
            <div className="form-left">
              <h2 className="disp">Let&rsquo;s Make It Bold</h2>
              <p>Building strong brand foundations through bold strategies, powerful visuals, and seamless execution.</p>
            </div>
            <form className="form-fields" onSubmit={handleSubmit}>
              <div className="form-row">
                <input className="qe-input" type="text" placeholder="Full Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                <input className="qe-input" type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
              </div>
              <textarea className="qe-input" placeholder="Message" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
              <div className="form-actions">
                <button type="submit" className="btn-project">
                  <span className="bp-circle"><Arrow s={18} /></span>
                  {sent ? "Thank you! We'll be in touch" : "Start your Project"}
                </button>
              </div>
            </form>
          </div>
        </section>

        {/* ---------- TESTIMONIALS (dark) ---------- */}
        <section className="testi">
          <div className="tag" style={{ left: 0 }}>TESTIMONIALS</div>
          <div className="center">
            <h2 className="sec-head dark"><span className="hl">Testimonials</span><span>that</span><br /><span>Speak to Our Results</span></h2>
            <p className="intro">See why startups, real estate, healthcare and e-commerce brands across Bangalore trust Quint Edge AI to automate their operations and grow their leads.</p>
          </div>

          <div className="testi-stage">
            {[left, center, right].map((idx, pos) => {
              const [nm, role, body] = TESTIMONIALS[idx];
              const isCenter = pos === 1;
              return (
                <div key={pos} className={"testi-card" + (isCenter ? "" : " side")}>
                  <div className="testi-top">
                    <div className="testi-who"><span className="av" /><div><div className="nm">{nm}</div><div className="role">{role}</div></div></div>
                    <span className="quote disp">&rdquo;</span>
                  </div>
                  <div className="body">{body}</div>
                </div>
              );
            })}
          </div>
          <div className="testi-nav">
            <button onClick={() => setT(t - 1)}>&#8592;</button>
            <button onClick={() => setT(t + 1)}>&#8594;</button>
          </div>
        </section>

        {/* ---------- FAQ ---------- */}
        <section className="faq">
          <div className="faq-left">
            <h2 className="disp">AI Automation &amp; Marketing FAQs</h2>
            <p>As a leading AI automation company and digital marketing agency in Bangalore, we answer the questions businesses ask most before they grow with us.</p>
            <div className="faq-btns">
              <button className="btn-pill">More Questions</button>
              <a href="#contact" className="faq-link">Contact Us</a>
            </div>
          </div>
          <div className="faq-list">
            {FAQS.map(([q, a], i) => (
              <div key={q} className={"faq-item" + (i === faq ? " open" : "")}>
                <button className="faq-q" onClick={() => setFaq(i === faq ? -1 : i)}>
                  <span>{q}</span><span className="faq-sign">{i === faq ? "\u2212" : "+"}</span>
                </button>
                {i === faq && <p className="faq-a">{a}</p>}
              </div>
            ))}
          </div>
        </section>

        {/* ---------- BLOG ---------- */}
        <section className="blog">
          <div className="tag" style={{ left: 0 }}>BLOGS</div>
          <div className="center">
            <h2 className="sec-head dark"><span className="hl">Insights</span><span>That Grow Traffic</span><br /><span>&amp; Increase Revenue</span></h2>
            <p className="intro">Practical guides on AI automation, lead generation and digital marketing for businesses in Bangalore.</p>
          </div>
          <div className="blog-grid">
            {BLOGS.map(([dot, title, excerpt, slug]) => (
              <a key={slug} href={slug} className="blog-card">
                <div className="blog-top"><span className="blog-dot" style={{ background: dot }} /><span className="blog-read">5 min read</span></div>
                <h3>{title}</h3>
                <p>{excerpt}</p>
                <span className="blog-go"><ArrowUR s={18} /></span>
              </a>
            ))}
          </div>
        </section>

        {/* ---------- BRAND BANNER (Innovate · Inspire · Create) ---------- */}
        <section className="brand-band">
          <div className="topred2" />
          <div className="banner">
            <span>Innovate</span><Star s={42} /><span>Inspire</span><Star s={42} /><span>Create</span>
          </div>
          <div className="divider"><div className="ln" /><Star s={22} /><div className="ln" /></div>
        </section>

        {/* ---------- FOOTER ---------- */}
        <Footer />

      </div>
    </div>
  );
}
