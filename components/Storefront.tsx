"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { currency, products, type Product } from "@/lib/products";

type Theme = "night" | "atelier";
type BagItem = { productId: string; size: string };

const sizes = ["XS", "S", "M", "L", "XL"];
const otherWorlds = [
  { name: "Couture-Cola", note: "Retro pop couture", number: "02" },
  { name: "Rebelle", note: "Y2K racing", number: "03" },
  { name: "Jaguère", note: "Nocturnal tailoring", number: "04" },
  { name: "Jaoudé", note: "Contemporary resortwear", number: "05" },
];

function Mark({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <path d="M7 49 19 15 31 38 43 15 57 49" stroke="currentColor" strokeWidth="5" strokeLinecap="square" strokeLinejoin="miter" />
      <path d="M31 38 35 30" stroke="var(--surface)" strokeWidth="5" />
    </svg>
  );
}

export default function Storefront() {
  const [theme, setTheme] = useState<Theme>("night");
  const [selected, setSelected] = useState<Product | null>(null);
  const [size, setSize] = useState("M");
  const [bag, setBag] = useState<BagItem[]>([]);
  const quickViewRef = useRef<HTMLDialogElement>(null);
  const bagRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const saved = window.localStorage.getItem("mercereze-theme");
    if (saved === "atelier") {
      setTheme("atelier");
      document.documentElement.dataset.theme = "atelier";
    }
  }, []);

  useEffect(() => {
    if (selected && !quickViewRef.current?.open) quickViewRef.current?.showModal();
  }, [selected]);

  function toggleTheme() {
    const next: Theme = theme === "night" ? "atelier" : "night";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    window.localStorage.setItem("mercereze-theme", next);
  }

  function openProduct(product: Product) {
    setSize("M");
    setSelected(product);
  }

  function addToBag() {
    if (!selected) return;
    setBag((current) => [...current, { productId: selected.id, size }]);
    quickViewRef.current?.close();
  }

  const total = bag.reduce((sum, item) => {
    const product = products.find((candidate) => candidate.id === item.productId);
    return sum + (product?.price ?? 0);
  }, 0);

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>

      <header className="site-header">
        <a href="#top" className="brand-lockup" aria-label="Mercereze, back to top">
          <Mark className="brand-mark" />
          <span>mercereze</span>
        </a>

        <nav className="primary-nav" aria-label="Main navigation">
          <a href="#capsule">Collection</a>
          <a href="#code">The code</a>
          <a href="#lookbook">Lookbook</a>
        </nav>

        <div className="header-actions">
          <button type="button" className="mode-button" onClick={toggleTheme} aria-label={`Switch to ${theme === "night" ? "atelier" : "night"} mode`}>
            <span className="mode-dot" aria-hidden="true" />
            <span>{theme === "night" ? "Atelier" : "Night"}</span>
          </button>
          <button type="button" className="bag-button" onClick={() => bagRef.current?.showModal()} aria-label={`Open demo bag, ${bag.length} ${bag.length === 1 ? "item" : "items"}`}>
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 8h16l-1 12H5L4 8Z" stroke="currentColor" strokeWidth="1.5"/><path d="M9 9V6a3 3 0 0 1 6 0v3" stroke="currentColor" strokeWidth="1.5"/></svg>
            <span>{bag.length}</span>
          </button>
        </div>
      </header>

      <main id="main">
        <section id="top" className="hero" aria-labelledby="hero-title">
          <Image className="hero-photo" src="/images/hero.webp" alt="Model wearing the Mercereze Grand Tourer coat in a dark architectural studio" fill priority sizes="100vw" />
          <div className="hero-shade" aria-hidden="true" />
          <div className="hero-content">
            <p className="hero-kicker">Independent fashion study · Capsule 01</p>
            <p className="hero-statement">Tailoring<br />in motion.</p>
            <a className="button button-accent" href="#capsule">Explore the capsule</a>
          </div>
          <h1 id="hero-title" className="hero-wordmark">MERCEREZE</h1>
          <span className="hero-side-note">Cut for the moment before arrival.</span>
        </section>

        <section id="capsule" className="section capsule" aria-labelledby="capsule-title">
          <div className="section-heading">
            <div>
              <p className="section-index">01 / The capsule</p>
              <h2 id="capsule-title">Made to move.<br /><em>Made to hold a line.</em></h2>
            </div>
            <p className="section-intro">Three pieces built around structure, ease, and the detail you notice when you get closer.</p>
          </div>

          <div className="product-grid">
            {products.map((product, index) => (
              <article className={`product-card product-card-${index + 1}`} key={product.id}>
                <button type="button" className="product-open" onClick={() => openProduct(product)} aria-label={`View ${product.name}`}>
                  <span className="product-image-wrap">
                    <Image src={product.image} alt={product.alt} fill sizes={index === 0 ? "(max-width: 800px) 100vw, 50vw" : "(max-width: 800px) 100vw, 25vw"} />
                  </span>
                  <span className="product-view-label">Quick view</span>
                </button>
                <div className="product-info">
                  <div><p>{product.descriptor}</p><h3>{product.name}</h3></div>
                  <span>{currency(product.price)}</span>
                </div>
              </article>
            ))}
          </div>
          <p className="concept-note">Concept garments and indicative prices. This portfolio store does not process orders.</p>
        </section>

        <section id="code" className="section code-section" aria-labelledby="code-title">
          <div className="code-copy">
            <p className="section-index">02 / The code</p>
            <h2 id="code-title">Precision is<br /><em>a feeling.</em></h2>
            <p className="code-intro">Our starting point is the line of a garment in motion: a shoulder that holds, a seam that leads, hardware that earns its place.</p>
            <dl className="material-list">
              <div><dt>01</dt><dd>Structured wool</dd><span>Form without stiffness</span></div>
              <div><dt>02</dt><dd>Technical insets</dd><span>Ease where it matters</span></div>
              <div><dt>03</dt><dd>Brushed metal</dd><span>Quiet, deliberate detail</span></div>
            </dl>
          </div>
          <div className="code-visual">
            <Image src="/images/grand-tourer-coat.webp" alt="Close view of the Grand Tourer coat construction" fill sizes="(max-width: 800px) 100vw, 50vw" />
            <span className="image-caption">Grand Tourer / study of form</span>
          </div>
        </section>

        <section id="lookbook" className="lookbook" aria-labelledby="lookbook-title">
          <div className="lookbook-image">
            <Image src="/images/editorial.webp" alt="Model in Mercereze leather bomber against a citron studio backdrop" fill sizes="(max-width: 800px) 100vw, 55vw" />
          </div>
          <div className="lookbook-copy">
            <p className="section-index">03 / Lookbook</p>
            <h2 id="lookbook-title">Never<br />standing<br />still.</h2>
            <p>One sharp signal against a quieter system. The collection moves between controlled form and the energy of the street.</p>
            <a href="#capsule" className="text-link">Explore the capsule <span aria-hidden="true">↗</span></a>
          </div>
        </section>

        <section className="section worlds" aria-labelledby="worlds-title">
          <div className="worlds-heading">
            <p className="section-index">Kout Project / The wider world</p>
            <h2 id="worlds-title">Five worlds.<br />One point of view.</h2>
            <p>Mercereze opens the series. Four more independent fashion concepts are taking shape.</p>
          </div>
          <div className="world-list">
            {otherWorlds.map((world) => (
              <div className="world-row" key={world.name}>
                <span>{world.number}</span><strong>{world.name}</strong><span>{world.note}</span><small>In development</small>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div><Mark className="footer-mark" /><span>MERCEREZE</span></div>
        <p>An independent fashion concept from Kout Project. No affiliation with the brands that inspired the broader series.</p>
        <a href="#top">Back to top</a>
      </footer>

      <dialog ref={quickViewRef} className="product-dialog" onClose={() => setSelected(null)} onClick={(event) => { if (event.target === quickViewRef.current) quickViewRef.current?.close(); }}>
        {selected && (
          <div className="dialog-layout">
            <button type="button" className="dialog-close product-dialog-close" onClick={() => quickViewRef.current?.close()} aria-label="Close quick view">×</button>
            <div className="dialog-photo"><Image src={selected.image} alt={selected.alt} fill sizes="(max-width: 700px) 100vw, 50vw" /></div>
            <div className="dialog-copy">
              <p className="section-index">Mercereze / Capsule 01</p>
              <h2>{selected.name}</h2>
              <p className="dialog-price">{currency(selected.price)}</p>
              <p>{selected.descriptor}. Engineered lines and considered materials for a composed silhouette.</p>
              <dl><div><dt>Materials</dt><dd>{selected.material}</dd></div><div><dt>Fit</dt><dd>{selected.fit}</dd></div></dl>
              <fieldset className="size-picker"><legend>Choose a size</legend><div>{sizes.map((option) => <button key={option} type="button" aria-pressed={size === option} onClick={() => setSize(option)}>{option}</button>)}</div></fieldset>
              <button type="button" className="button button-accent dialog-add" onClick={addToBag}>Add to demo bag</button>
              <p className="dialog-disclaimer">Portfolio demonstration only. No payment or order is taken.</p>
            </div>
          </div>
        )}
      </dialog>

      <dialog ref={bagRef} className="bag-dialog" onClick={(event) => { if (event.target === bagRef.current) bagRef.current?.close(); }}>
        <div className="bag-panel">
          <div className="bag-panel-top"><div><p className="section-index">Mercereze</p><h2>Demo bag <span>({bag.length})</span></h2></div><button type="button" className="dialog-close" onClick={() => bagRef.current?.close()} aria-label="Close bag">×</button></div>
          {bag.length === 0 ? <p className="bag-empty">Your bag is empty. Explore the capsule to add a concept piece.</p> : (
            <ul className="bag-items">{bag.map((item, index) => {
              const product = products.find((candidate) => candidate.id === item.productId);
              if (!product) return null;
              return <li key={`${item.productId}-${item.size}-${index}`}><Image src={product.image} alt="" width={78} height={92} /><div><strong>{product.name}</strong><span>Size {item.size}</span><span>{currency(product.price)}</span></div><button type="button" onClick={() => setBag((current) => current.filter((_, currentIndex) => currentIndex !== index))} aria-label={`Remove ${product.name}, size ${item.size}`}>Remove</button></li>;
            })}</ul>
          )}
          <div className="bag-bottom"><div><span>Concept total</span><strong>{currency(total)}</strong></div><p>This is a portfolio demo. Checkout is not enabled.</p></div>
        </div>
      </dialog>
    </>
  );
}
