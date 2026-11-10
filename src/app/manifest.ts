import type { MetadataRoute } from "next";
import { site } from "@/config/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.legalName,
    short_name: site.name,
    description: site.description,
    start_url: "/",
    display: "browser",
    dir: "rtl",
    lang: "ar",
    background_color: "#f6f7f4",
    theme_color: "#03343b",
    icons: [{ src: "/icon.png", sizes: "192x192", type: "image/png" }],
  };
}
