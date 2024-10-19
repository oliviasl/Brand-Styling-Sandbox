import { useEffect, useRef, useState } from "react";

export default function NestedDemo({ config }: { config: object }) {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [isIframeLoaded, setIframeLoaded] = useState(false);

  useEffect(() => {
    const handleIframeLoad = () => setIframeLoaded(true);

    const iframe = iframeRef.current;
    if (iframe) {
      iframe.addEventListener("load", handleIframeLoad);
    }

    return () => {
      if (iframe) {
        iframe.removeEventListener("load", handleIframeLoad);
      }
    };
  }, []);

  // Adjust iframe height based on messages from iframe content
  useEffect(() => {
    const handleResize = (event: MessageEvent) => {
      if (
        event.origin === window.location.origin && // Verify origin to ensure safety
        event.data?.type === "resize" &&
        iframeRef.current
      ) {
        iframeRef.current.style.height = `${event.data.height}px`;
      }
    };

    window.addEventListener("message", handleResize);

    return () => {
      window.removeEventListener("message", handleResize);
    };
  }, []);

  // Send Tailwind config to iframe once it's loaded
  useEffect(() => {
    if (isIframeLoaded && iframeRef.current?.contentWindow) {
      iframeRef.current.contentWindow.postMessage(
        { type: "config", tailwindConfig: config },
        "*" // Replace '*' with specific iframe origin if needed
      );
    }
  }, [config, isIframeLoaded]);

  return <iframe ref={iframeRef} src="/demo" className="w-full" />;
}
