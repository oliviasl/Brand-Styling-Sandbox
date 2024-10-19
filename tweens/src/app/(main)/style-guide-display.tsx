import NestedDemo from "./nested-demo";
import DesignTokenEditor from "@/components/design-token-editor";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerPortal } from "@/components/ui/drawer";
import { Download, LoaderCircle, RefreshCw, Shapes } from "lucide-react";
import { useEffect, useState } from "react";
import { useAsyncFn } from "react-use";
import * as BaseDrawer from "vaul";

export default function StyleGuideDisplay({ designTokens: _designTokens }: { designTokens: any }) {
  const [designTokens, setDesignTokens] = useState(_designTokens);
  useEffect(() => {
    setDesignTokens(_designTokens);
  }, [_designTokens]);

  const [config, setConfig] = useState<object | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const [generateConfigState, generateConfigFn] = useAsyncFn(
    async (designTokens: any) => {
      setConfig(null);

      const res = await fetch("/api/generate-tailwind-config", {
        method: "POST",
        body: JSON.stringify({ designTokens }),
        cache: "no-cache",
      });

      setConfig(JSON.parse((await res.json()).output));
    },
    [setConfig, designTokens]
  );

  useEffect(() => {
    generateConfigFn(designTokens);
  }, [designTokens, generateConfigFn]);

  function downloadConfig() {
    // Convert the config data to a JSON string
    const jsonString = JSON.stringify(config, null, 2); // Pretty-print JSON

    // Create a blob from the JSON string
    const blob = new Blob([jsonString], { type: "application/json" });

    // Create a link element
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "config.json"; // Name of the downloaded file

    // Programmatically click the link to trigger the download
    link.click();

    // Clean up by revoking the object URL
    URL.revokeObjectURL(link.href);
  }

  return (
    <>
      <div className="flex overflow-hidden">
        <div className="flex shrink-0 flex-col gap-4 border-r p-8">
          <h2 className="text-3xl font-bold">Style Guide</h2>
          <Button
            variant={"secondary"}
            className="border shadow"
            onClick={() => setDrawerOpen(true)}
            disabled={!config}
          >
            <Shapes />
            Design Tokens
          </Button>
          <Button
            variant={"secondary"}
            className="border shadow"
            onClick={() => {
              downloadConfig();
            }}
            disabled={!config}
          >
            <Download />
            Export
          </Button>
          <Button
            variant={"ghost"}
            size="sm"
            onClick={() => {
              setConfig({ ...config });
            }}
            disabled={!config}
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
      <Drawer open={drawerOpen} onOpenChange={() => setDrawerOpen(false)} direction="left">
        <DrawerPortal>
          <BaseDrawer.Overlay className="fixed inset-0 bg-black/40" />
          <BaseDrawer.Content
            className="fixed bottom-2 left-2 top-2 z-10 flex w-[32rem] overflow-hidden outline-none"
            // The gap between the edge of the screen and the drawer is 8px in this case.
            style={{ "--initial-transform": "calc(100% + 8px)" } as React.CSSProperties}
          >
            <div className="flex w-full flex-col rounded-lg bg-white p-4">
              <DesignTokenEditor
                designTokens={designTokens}
                onUpdate={v => {
                  setDesignTokens(v);
                  setDrawerOpen(false);
                }}
              />
            </div>
          </BaseDrawer.Content>
        </DrawerPortal>
      </Drawer>
    </>
  );
}
