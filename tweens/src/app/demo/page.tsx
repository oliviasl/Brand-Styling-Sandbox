"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const isSystemFont = (font: string) => {
  const systemFonts = [
    "ui-sans-serif",
    "system-ui",
    "-apple-system",
    "BlinkMacSystemFont",
    "Segoe UI",
    "Roboto",
    "Helvetica Neue",
    "Arial",
    "Noto Sans",
    "sans-serif",
    "ui-serif",
    "Georgia",
    "Cambria",
    "Times New Roman",
    "Times",
    "serif",
    "ui-monospace",
    "SFMono-Regular",
    "Menlo",
    "Monaco",
    "Consolas",
    "Liberation Mono",
    "Courier New",
    "monospace",
  ];

  // Check if the font is a system font or a CSS variable
  return systemFonts.includes(font.toLowerCase()) || /var\([^)]+\)/.test(font);
};

const loadFonts = async (fonts: string[]) => {
  const loadedFonts: string[] = [];

  for (const font of fonts) {
    if (!isSystemFont(font)) {
      const fontName = font.replace(/['"]/g, "");

      // Check if the font has already been loaded
      if (!loadedFonts.includes(fontName)) {
        const link = document.createElement("link");
        link.href = `https://fonts.googleapis.com/css2?family=${fontName.replace(/\s+/g, "+")}:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap`;
        link.rel = "stylesheet";
        document.head.appendChild(link);

        // Add the font to the array of loaded fonts
        loadedFonts.push(fontName);
      }
    }
  }
};

export default function Nested() {
  const [tailwindReady, setTailwindReady] = useState(false);
  const [loadedFonts, setLoadedFonts] = useState<string[]>([]);

  useEffect(() => {
    const handleMessage = event => {
      if (event.data?.tailwindConfig) {
        // Dynamically inject the Tailwind CDN script
        const script = document.createElement("script");
        script.src = "https://cdn.tailwindcss.com";
        script.onload = () => {
          window.tailwind.config = event.data.tailwindConfig;

          loadFonts(Object.values(window.tailwind.config.theme.extend.fontFamily).flat() as string[]);

          setTailwindReady(true); // Trigger re-render to apply styles
        };
        document.head.appendChild(script);
      }
    };

    // Add event listener when component mounts
    window.addEventListener("message", handleMessage);

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  if (!tailwindReady) return;

  return (
    <div className="p-4">
      <Button color="primary">test</Button>
    </div>
  );
}
