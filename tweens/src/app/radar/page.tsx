"use client";

import RadarChart from "@/components/radar-chart";
import { useEffect, useState } from "react";
import { Attributes, ATTRIBUTES } from "../attributes";

// Helper function to generate random values between 20 and 80
const getRandomValue = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1)) + min;

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

    const relation = ATTRIBUTES.find(
      ({ primary, inverse }) => primary === key || inverse === key
    );

    if (relation) {
      const otherKey =
        relation.primary === key ? relation.inverse : relation.primary;
      newAttributes[otherKey] = 100 - newAttributes[key];
    }

    setData(newAttributes);
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <RadarChart data={data} handleAttributeChange={handleAttributeChange} />
  );
}
