import { Link } from "react-router-dom";
import SiteNav from "./SiteNav";
import Footer from "./Footer";

/**
 * Blogs page — built to the Figma "Blogs" frame specs:
 *   • Dark hero with a red "BLOGS" badge (410×119, radius 16) + centered intro
 *   • "Recent Post (08)": featured image 580×378 (r20) + dark card 578px
 *       (bg #222, r20, pad 20, border 1px #252525); title 30/500/-4%,
 *       excerpt 18/1.6/-2% #828282; outlined tag pills
 *   • "Weekly Most Read 🔥": 3-col grid, 70px gap, 380px cards on white
 *
 * Blog images are placeholders — drop real images into /public/blog/ and set
 * the `img` field on each post below to e.g. "/blog/post-1.webp".
 */

const CSS = `
.qe-blog{font-family:var(--body,'Archivo',system-ui,sans-serif);background:#fff;overflow-x:hidden}
.qe-blog *{box-sizing:border-box}
.qe-blog .canvas{width:100%;max-width:none;margin:0 auto;position:relative}

/* ---------- HERO ---------- */
.qe-blog .hero{background:var(--dark,#161616) url('/hero-bg.webp') center/cover no-repeat;
  color:#fff;padding-bottom:clamp(90px,11vw,150px)}
.qe-blog .hero-inner{padding:clamp(56px,8vw,96px) clamp(20px,5vw,100px) 0;text-align:center}
.qe-blog .blogs-badge{display:inline-flex;align-items:center;justify-content:center;
  background:var(--red,#DF0002);border-radius:16px;padding:14px clamp(36px,5vw,56px)}
.qe-blog .blogs-badge span{font-family:var(--display,'Syne',sans-serif);font-weight:800;
  font-size:clamp(46px,8vw,82px);line-height:1;color:#0c0c0c;letter-spacing:3px}
.qe-blog .hero-p{max-width:660px;margin:clamp(26px,3vw,38px) auto 0;
  font-size:clamp(16px,1.6vw,20px);line-height:1.6;color:#cfcfcf}

/* ---------- WHITE CONTENT ---------- */
.qe-blog .content{position:relative;background:#fff;color:#111;margin-top:-2px;
  padding:clamp(48px,7vw,86px) clamp(20px,5vw,100px) clamp(70px,9vw,120px);
  clip-path:polygon(0 24px,100% 0,100% 100%,0 100%)}
.qe-blog .sec-h{font-family:var(--display,'Syne',sans-serif);font-weight:700;
  font-size:clamp(24px,3vw,30px);color:#111;margin:0 0 clamp(22px,3vw,30px)}
.qe-blog .wmr-h{margin-top:clamp(54px,7vw,82px)}

/* meta + tags (shared) */
.qe-blog .meta{font-size:14px;color:#9a9a9a;display:flex;align-items:center;gap:8px}
.qe-blog .meta .dot{width:4px;height:4px;border-radius:50%;background:currentColor;display:inline-block;opacity:.7}
.qe-blog .tags{display:flex;gap:10px;flex-wrap:wrap}
.qe-blog .tag-pill{border-radius:8px;padding:7px 14px;font-size:14px;line-height:1;white-space:nowrap}

/* ---------- FEATURED ---------- */
.qe-blog .feat{display:flex;gap:clamp(22px,3vw,36px);align-items:stretch}
.qe-blog .feat-img{flex:1 1 0;min-width:0;border-radius:20px;overflow:hidden;
  aspect-ratio:580/378;background:linear-gradient(135deg,#e9edf2,#d7dee7)}
.qe-blog .feat-img img{width:100%;height:100%;object-fit:cover;display:block}
.qe-blog .feat-card{flex:0 0 578px;max-width:578px;background:#222;border:1px solid #252525;
  border-radius:20px;padding:20px;display:flex;flex-direction:column;gap:16px;
  box-shadow:0 5px 26px rgba(0,0,0,.20)}
.qe-blog .feat-card .title{font-weight:600;font-size:clamp(24px,3vw,30px);line-height:1.04;
  letter-spacing:-.04em;color:#fff;margin:0}
.qe-blog .feat-card .exc{font-size:18px;line-height:1.6;letter-spacing:-.02em;color:#828282;margin:0}
.qe-blog .feat-card .tag-pill{border:1px solid #3a3a3a;color:#cfcfcf}

/* ---------- WEEKLY GRID ---------- */
.qe-blog .wmr-grid{display:grid;grid-template-columns:repeat(3,1fr);
  column-gap:clamp(24px,4.5vw,70px);row-gap:clamp(36px,5vw,60px)}
.qe-blog .bcard{display:flex;flex-direction:column;gap:12px}
.qe-blog .bcard-img{border-radius:20px;overflow:hidden;aspect-ratio:380/214;
  background:linear-gradient(135deg,#e9edf2,#d7dee7)}
.qe-blog .bcard-img img{width:100%;height:100%;object-fit:cover;display:block}
.qe-blog .bcard .title{font-weight:600;font-size:20px;line-height:1.2;letter-spacing:-.02em;color:#141414;margin:0}
.qe-blog .bcard .exc{font-size:15px;line-height:1.6;letter-spacing:-.02em;color:#828282;margin:0}
.qe-blog .bcard .tag-pill{border:1px solid #d9d9d9;color:#555}

/* ---------- RESPONSIVE ---------- */
@media(max-width:980px){
  .qe-blog .feat{flex-direction:column}
  .qe-blog .feat-card{flex:0 0 auto;max-width:none;width:100%}
  .qe-blog .wmr-grid{grid-template-columns:1fr 1fr}
}
@media(max-width:600px){
  .qe-blog .wmr-grid{grid-template-columns:1fr}
  .qe-blog .blogs-badge span{letter-spacing:2px}
}
`;

const FEATURED = {
  date: "22 July 2024",
  read: "4 min",
  title: "How Remote work drastically Improved my Design Skills",
  excerpt:
    "Remote work has drastically improved my design skills by giving me the freedom to experiment, focus, and learn at my own pace. Without the daily commute and office distractions, I found more time for deep, uninterrupted work, allowing me to refine my design techniques and creativity. Collaborating with a global team challenged me",
  tags: ["Design", "Product", "Frameworks"],
  img: null, // e.g. "/blog/featured.webp"
};

const WEEKLY = [
  { title: "Our SaaS Product Just Launched!", date: "22 July 2024", read: "4 min", tags: ["Design", "Product"], img: null },
  { title: "Our SaaS Product Just Launched!", date: "22 July 2024", read: "4 min", tags: ["Design", "Product"], img: null },
  { title: "Our SaaS Product Just Launched!", date: "22 July 2024", read: "4 min", tags: ["Design", "Product"], img: null },
  { title: "Our SaaS Product Just Launched!", date: "22 July 2024", read: "4 min", tags: ["Design", "Product"], img: null },
  { title: "Our SaaS Product Just Launched!", date: "22 July 2024", read: "4 min", tags: ["Design", "Product"], img: null },
  { title: "Our SaaS Product Just Launched!", date: "22 July 2024", read: "4 min", tags: ["Design", "Product"], img: null },
];

const EXCERPT_SHORT =
  "Remote work has drastically improved my design skills by giving me the freedom to experiment, focus, and learn at my own pace.";

const Meta = ({ date, read }) => (
  <div className="meta">{date}<span className="dot" />{read}</div>
);

export default function BlogsPage() {
  return (
    <div className="qe-blog">
      <style>{CSS}</style>
      <div className="canvas">

        {/* HERO */}
        <header className="hero">
          <SiteNav active="blogs" />
          <div className="hero-inner">
            <div className="blogs-badge"><span>BLOGS</span></div>
            <p className="hero-p">
              Quint Edge AI is a dynamic and innovative digital agency that brings creative ideas to life.
              Explore our latest insights on AI automation, digital marketing, design and growth.
            </p>
          </div>
        </header>

        {/* CONTENT */}
        <div className="content">

          {/* RECENT POST (featured) */}
          <h2 className="sec-h">Recent Post (08)</h2>
          <article className="feat">
            <div className="feat-img">
              {FEATURED.img && <img src={FEATURED.img} alt={FEATURED.title} />}
            </div>
            <div className="feat-card">
              <Meta date={FEATURED.date} read={FEATURED.read} />
              <h3 className="title">{FEATURED.title}</h3>
              <p className="exc">{FEATURED.excerpt}</p>
              <div className="tags">
                {FEATURED.tags.map((t) => (
                  <span className="tag-pill" key={t}>{t}</span>
                ))}
              </div>
            </div>
          </article>

          {/* WEEKLY MOST READ */}
          <h2 className="sec-h wmr-h">Weekly Most Read 🔥</h2>
          <div className="wmr-grid">
            {WEEKLY.map((p, i) => (
              <article className="bcard" key={i}>
                <div className="bcard-img">
                  {p.img && <img src={p.img} alt={p.title} />}
                </div>
                <Meta date={p.date} read={p.read} />
                <h3 className="title">{p.title}</h3>
                <p className="exc">{EXCERPT_SHORT}</p>
                <div className="tags">
                  {p.tags.map((t) => (
                    <span className="tag-pill" key={t}>{t}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}
