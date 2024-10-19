import { useEffect, useRef } from "react";

export default function NestedPart() {
  const iframeRef = useRef(null);

  useEffect(() => {
    if (iframeRef.current) {
      console.log("ajlhskdfgja");
      iframeRef.current.contentWindow.postMessage(
        {
          tailwindConfig: {
            darkMode: ["class"],
            theme: {
              extend: {
                fontFamily: {
                  sans: ["monospace"],
                },
                colors: {
                  clifford: "#da373d",
                },
              },
            },
          },
        },
        "*" // Replace '*' with the specific iframe origin if needed
      );
    }
  }, [iframeRef.current]);

  return (
    <iframe
      ref={iframeRef}
      src="/nested"
      style={{ width: "100%", height: "500px", border: "1px solid #000" }}
      title="Iframe App"
    />
  );
}
