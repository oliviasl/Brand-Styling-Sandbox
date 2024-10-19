import NestedDemo from "./nested-demo";
import { Button } from "@/components/ui/button";
import { Download, LoaderCircle, RefreshCw, Shapes } from "lucide-react";
import { useState } from "react";
import { useAsync } from "react-use";

export default function StyleGuideDisplay({ designTokens }: { designTokens: any }) {
  const [config, setConfig] = useState<object | null>(null);

  useAsync(async () => {
    setConfig(null);

    const res = await fetch("/api/generate-tailwind-config", {
      method: "POST",
      body: JSON.stringify({ designTokens }),
    });

    setConfig(JSON.parse((await res.json()).output));
  }, [setConfig, designTokens]);

  return (
    <div className="flex">
      <div className="flex shrink-0 flex-col gap-4 p-4">
        <h2 className="text-4xl font-medium">Style Guide</h2>
        <Button variant={"secondary"} className="border shadow">
          <Shapes />
          Design Tokens
        </Button>
        <Button variant={"secondary"} className="border shadow">
          <Download />
          Export
        </Button>
        <Button
          variant={"ghost"}
          size="sm"
          onClick={() => {
            setConfig({ ...config });
          }}
        >
          <RefreshCw />
          Reload
        </Button>
      </div>
      {config ? (
        <NestedDemo config={config} />
      ) : (
        <div className="flex w-full items-center justify-center gap-4 p-4">
          <LoaderCircle className="h-10 w-10 animate-spin" />
          <p className="text-2xl font-medium">Generating styles...</p>
        </div>
      )}
    </div>
  );
}
