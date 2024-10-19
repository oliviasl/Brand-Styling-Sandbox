"use client";

import { Attributes, ATTRIBUTES } from "../attributes";
import NestedPart from "./nested-part";
import Logo from "@/components/logo";
import RadarChart from "@/components/radar-chart";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { useState } from "react";

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

  const handleGenerate = async () => {
    const res = await fetch("/api/generate-design-tokens", {
      method: "POST",
      body: JSON.stringify({ attributes: data }),
    });

    console.log(await res.json());
  };

  return (
    <div>
      <div className="flex px-8 py-16">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-12">
          <div className="flex flex-col justify-center gap-4">
            <Logo />
            <h1 className="text-5xl font-bold">Brand Styling Sandbox</h1>
            <p>Play around with this graph to adjust the tone of the branding you want.</p>
            <div>
              <Button size="lg" className="text-lg" onClick={handleGenerate}>
                <Sparkles />
                Generate Style Guide
              </Button>
            </div>
          </div>
          <div className="">
            <RadarChart data={data} handleAttributeChange={handleAttributeChange} />
          </div>
        </div>
      </div>
      <NestedPart />
    </div>
  );
}
