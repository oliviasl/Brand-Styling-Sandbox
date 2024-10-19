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

  useEffect(() => {
    if (isIframeLoaded && iframeRef.current?.contentWindow) {
      iframeRef.current.contentWindow!.postMessage(
        { tailwindConfig: config },
        "*" // Replace '*' with the specific iframe origin if needed
      );
    }
  }, [config, isIframeLoaded]);

  return <iframe ref={iframeRef} src="/demo" className="w-full" />;
}
