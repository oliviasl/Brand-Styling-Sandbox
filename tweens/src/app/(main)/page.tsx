"use client";

import { Attributes, ATTRIBUTES } from "../attributes";
import StyleGuideDisplay from "./style-guide-display";
import LoadingOverlay from "@/components/loading-overlay";
import Logo from "@/components/logo";
import RadarChart from "@/components/radar-chart";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Sparkles } from "lucide-react";
import { useState } from "react";
import { useAsyncFn } from "react-use";

// Helper function to generate random values between 20 and 80
const getRandomValue = (min: number, max: number): number => Math.floor(Math.random() * (max - min + 1)) + min;

// Initialize attributes with random values and their inverses
const initializeAttributes = (): Attributes => {
  const attributes: Attributes = {};
  ATTRIBUTES.forEach(({ primary, inverse }) => {
    const value = getRandomValue(20, 80);
    attributes[primary] = value;
    attributes[inverse] = 100 - value;
  });
  return attributes;
};

export default function Page() {
  const [data, setData] = useState<Attributes>(initializeAttributes);

  // Handle attribute changes and enforce inverse relationships
  const handleAttributeChange = (key: string, value: number) => {
    const newAttributes = { ...data, [key]: Math.round(value) };

    const relation = ATTRIBUTES.find(({ primary, inverse }) => primary === key || inverse === key);

    if (relation) {
      const otherKey = relation.primary === key ? relation.inverse : relation.primary;
      newAttributes[otherKey] = 100 - newAttributes[key];
    }

    setData(newAttributes);
  };

  const [generateDesignTokensState, handleGenerate] = useAsyncFn(async () => {
    const res = await fetch("/api/generate-design-tokens", {
      method: "POST",
      body: JSON.stringify({ attributes: data }),
    });

    return await res.json();
  }, [data]);

  return (
    <div>
      <div className="flex px-8 py-16">
        <div className="mx-auto flex w-full max-w-5xl gap-12">
          <div className="m-auto w-full">
            <div className="flex w-80 flex-col justify-center gap-4">
              <Logo />
              <h1 className="text-[2.5rem] font-bold leading-none">Brand Styling Sandbox</h1>
              <p className="text-lg">Play around with this graph to adjust the tone of the branding you want.</p>
              <div>
                <Button
                  size="lg"
                  className="text-lg"
                  onClick={handleGenerate}
                  disabled={generateDesignTokensState.loading}
                >
                  <Sparkles />
                  Generate Style Guide
                </Button>
              </div>
            </div>
          </div>
          <div className="w-full">
            <RadarChart data={data} handleAttributeChange={handleAttributeChange} />
          </div>
        </div>
      </div>
      <div className="flex">
        <div className="mx-auto mb-16 w-full max-w-5xl overflow-hidden rounded-lg border bg-white">
          {generateDesignTokensState.value?.object && !generateDesignTokensState.loading ? (
            <StyleGuideDisplay designTokens={generateDesignTokensState.value?.object} />
          ) : (
            <div className="flex w-full flex-col items-center justify-center gap-4 p-12 opacity-50">
              <LayoutDashboard className="h-16 w-16" />
              <p className="text-3xl font-medium">No style guide yet!</p>
            </div>
          )}
        </div>
      </div>
      {generateDesignTokensState.loading && <LoadingOverlay text="Generating design tokens..." />}
    </div>
  );
}
