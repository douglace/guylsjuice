import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Guyl's Juice — Jus Détox Naturels",
    short_name: "Guyl's Juice",
    description: "Jus détox 100% naturels. Livraison Douala & Yaoundé.",
    start_url: "/",
    display: "standalone",
    background_color: "#f0fdf4",
    theme_color: "#16a34a",
    orientation: "portrait",
    icons: [
      {
        src: "/icon",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
