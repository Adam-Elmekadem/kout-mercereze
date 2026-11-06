export type Product = {
  id: string;
  name: string;
  descriptor: string;
  price: number;
  image: string;
  alt: string;
  material: string;
  fit: string;
};

export const products: Product[] = [
  {
    id: "grand-tourer-coat",
    name: "Grand Tourer coat",
    descriptor: "The statement piece",
    price: 920,
    image: "/images/grand-tourer-coat.webp",
    alt: "Graphite sculptural overcoat with silver seam details and asymmetric collar",
    material: "Bonded wool, technical nylon insets, brushed metal closure",
    fit: "Structured shoulder, long silhouette",
  },
  {
    id: "velocity-bomber",
    name: "Velocity bomber",
    descriptor: "The everyday icon",
    price: 640,
    image: "/images/velocity-bomber.webp",
    alt: "Charcoal leather bomber with nylon sleeves and silver zipper",
    material: "Grained leather, technical nylon, ribbed cotton trim",
    fit: "Cropped body, relaxed sleeve",
  },
  {
    id: "track-knit",
    name: "Track knit",
    descriptor: "The quiet layer",
    price: 310,
    image: "/images/track-knit.webp",
    alt: "Heavyweight charcoal crewneck sweatshirt with a small angular mark",
    material: "Heavyweight loopback cotton, reflective piping",
    fit: "Relaxed, true to size",
  },
];

export const currency = (amount: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(amount);
