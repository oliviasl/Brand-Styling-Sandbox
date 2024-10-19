"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
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
  console.log(fonts);
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
  const [tailwindConfig, setTailwindConfig] = useState<object | null>(null);
  const [loadedFonts, setLoadedFonts] = useState<string[]>([]);

  useEffect(() => {
    const handleMessage = event => {
      if (event.data?.tailwindConfig) {
        // Dynamically inject the Tailwind CDN script
        const script = document.createElement("script");
        script.src = "https://cdn.tailwindcss.com";
        script.onload = () => {
          window.tailwind.config = event.data.tailwindConfig;

          // Add Albert font
          window.tailwind.config.theme.extend.fontFamily["albert-sans"] = ["Albert Sans"];

          loadFonts(Object.values(window.tailwind.config.theme.extend.fontFamily).flat() as string[]);

          setTailwindConfig(window.tailwind.config); // Trigger re-render to apply styles
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

  useEffect(() => {
    const height = document.documentElement.scrollHeight;
    window.parent.postMessage({ type: "resize", height }, "*");
  });

  if (!tailwindConfig) return;

  return (
    <div className="p-8">
      <div className="flex flex-col gap-4">
        <Card>
          <div className="flex flex-row items-center gap-2 border-b px-6 py-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 28 28">
              <circle cx="14" cy="14" r="12" fill="#FFC9C9" stroke="#E07676" strokeWidth="4"></circle>
            </svg>
            <CardTitle className="font-albert-sans text-xl font-medium">Colors</CardTitle>
          </div>
          <CardContent className="space-y-2 p-6">
            <div className="grid grid-cols-3 gap-4">
              {["primary", "secondary", "accent", "muted", "background", "foreground"].map(color => (
                <div key={color} className="overflow-hidden rounded border">
                  <div className={`bg-${color} h-24 w-full`} />
                  <div className="border-t p-2">
                    <div>
                      <p>{color}</p>
                      <p className="text-sm opacity-50">
                        {tailwindConfig.theme.extend.colors[color].DEFAULT || "default"}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <div className="flex flex-row items-center gap-2 border-b px-6 py-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 36 36">
              <rect
                width="30.631"
                height="11.116"
                x="10.145"
                y="2.822"
                fill="#EED389"
                stroke="#D59B37"
                strokeWidth="4"
                rx="2"
                transform="rotate(41.204 10.145 2.822)"
              ></rect>
            </svg>
            <CardTitle className="font-albert-sans text-xl font-medium">Typography</CardTitle>
          </div>
          <CardContent className="space-y-2 p-6">
            <h1 className="font-heading text-3xl font-bold">Heading</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
              ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
              fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
              mollit anim id est laborum.
            </p>
          </CardContent>
        </Card>

        <Button color="primary">test</Button>
      </div>
    </div>
  );
}
