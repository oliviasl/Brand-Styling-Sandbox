"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export default function Nested() {
  const [tailwindReady, setTailwindReady] = useState(false);

  useEffect(() => {
    const handleMessage = event => {
      if (event.data?.tailwindConfig) {
        // Dynamically inject the Tailwind CDN script
        const script = document.createElement("script");
        script.src = "https://cdn.tailwindcss.com";
        script.onload = () => {
          tailwind.config = event.data.tailwindConfig;
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

  if (!tailwindReady) {
    return <div>Loading styles...</div>;
  }

  return <Button>test</Button>;
}
