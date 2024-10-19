"use client";

import { Button } from "./ui/button";
import colors from "@/app/lib/colors";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import * as React from "react";

type ColorInputProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
};

const ColorInput: React.FC<ColorInputProps> = ({ label, value, onChange }) => (
  <div className="flex flex-col space-y-1.5">
    <Label>{label}</Label>
    <div className="flex shrink-0 items-center space-x-2">
      <Popover>
        <PopoverTrigger asChild>
          <button
            className="h-10 w-10 shrink-0 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200"
            style={{ backgroundColor: value }}
            aria-label="Select color"
          />
        </PopoverTrigger>
        <PopoverContent className="w-64 p-0" align="start">
          <ScrollArea className="h-80">
            <div className="grid grid-cols-5 gap-2 p-2">
              {colors.map(color => (
                <button
                  key={color}
                  className="h-10 w-10 rounded-md transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-gray-200"
                  style={{ backgroundColor: color }}
                  onClick={() => onChange(color)}
                />
              ))}
            </div>
          </ScrollArea>
        </PopoverContent>
      </Popover>
      <Input type="text" value={value} onChange={e => onChange(e.target.value)} className="w-full shrink" />
    </div>
  </div>
);

type NumberUnitInputProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  unit: string;
};

const NumberUnitInput: React.FC<NumberUnitInputProps> = ({ label, value, onChange, unit }) => {
  const numericValue = parseFloat(value);

  return (
    <div className="flex flex-col space-y-1.5">
      <Label>{label}</Label>
      <div className="flex">
        <Input
          type="number"
          value={isNaN(numericValue) ? "" : numericValue.toString()}
          onChange={e => {
            const newValue = e.target.value;
            onChange(newValue === "" ? "" : `${newValue}${unit}`);
          }}
          className="flex-grow"
        />
        <div className="flex items-center justify-center px-3">{unit}</div>
      </div>
    </div>
  );
};

export default function DesignTokenEditor({
  designTokens,
  onUpdate,
}: {
  designTokens: any;
  onUpdate: (designTokens: any) => void;
}) {
  const [config, setConfig] = React.useState<any>(designTokens);

  const labelMap = {
    borders: {
      radius: "Border Radius",
      width: "Border Width",
    },
    colors: {
      DEFAULT: "Default Color",
      foreground: "Foreground Color",
    },
    typography: {
      heading: "Heading",
      body: "Body",
    },
    other: {
      shadow: "Shadow",
      transitionDuration: "Transition Duration",
      transitionProperties: "Transition Properties",
      transitionTimingFunction: "Transition Timing Function",
    },
  };

  const unitMap = {
    borders: {
      radius: "rem",
      width: "px",
    },
    typography: {
      fontSize: "rem",
      letterSpacing: "em",
      lineHeight: "rem",
    },
  };

  const handleInputChange = (section, subsection, key, value) => {
    setConfig(prevConfig => ({
      ...prevConfig,
      [section]:
        section === "borders" || section === "other" || section === "typography"
          ? { ...prevConfig[section], [key]: value }
          : {
              ...prevConfig[section],
              [subsection]: {
                ...(prevConfig[section]?.[subsection] || {}),
                [key]: value,
              },
            },
    }));
  };

  const renderInputs = (section, subsection) => {
    const sectionData = ["borders", "other", "typography"].includes(section)
      ? config[section]
      : config[section]?.[subsection];
    if (!sectionData) return null;

    return (
      <div className="grid grid-cols-1 gap-4 p-2">
        {Object.entries(sectionData).map(([key, value]) => (
          <div key={`${section}-${subsection}-${key}`}>
            {section === "colors" ? (
              <ColorInput
                label={labelMap[section]?.[key] || key}
                value={value}
                onChange={newValue => handleInputChange(section, subsection, key, newValue)}
              />
            ) : unitMap[section]?.[key] !== undefined ? (
              <NumberUnitInput
                label={labelMap[section]?.[key] || labelMap[section]?.[subsection]?.[key] || key}
                value={value}
                onChange={newValue => handleInputChange(section, subsection, key, newValue)}
                unit={unitMap[section][key]}
              />
            ) : (
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor={`${section}-${subsection}-${key}`}>
                  {labelMap[section]?.[key] || labelMap[section]?.[subsection]?.[key] || key}
                </Label>
                <Input
                  type="text"
                  id={`${section}-${subsection}-${key}`}
                  value={value}
                  onChange={e => handleInputChange(section, subsection, key, e.target.value)}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="flex h-full flex-col">
      <div className="h-full">
        <h3 className="mb-6 mt-2 text-center text-2xl font-bold">Design Token Editor</h3>
        <Tabs defaultValue="borders" className="w-full overflow-hidden">
          <div className="px-2">
            <TabsList className="mb-6 grid w-full grid-cols-4">
              <TabsTrigger value="borders">Borders</TabsTrigger>
              <TabsTrigger value="colors">Colors</TabsTrigger>
              <TabsTrigger value="typography">Typography</TabsTrigger>
              <TabsTrigger value="other">Other</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="borders" className="space-y-4">
            <h2 className="px-2 text-xl font-semibold">Borders</h2>
            {renderInputs("borders")}
          </TabsContent>

          <TabsContent value="colors" className="max-w-full space-y-4">
            <h2 className="px-2 text-xl font-semibold">Colors</h2>
            <Tabs defaultValue="primary" className="space-y-4">
              <div className="px-2">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="primary">Primary</TabsTrigger>
                  <TabsTrigger value="secondary">Secondary</TabsTrigger>
                  <TabsTrigger value="accent">Accent</TabsTrigger>
                  <TabsTrigger value="muted">Muted</TabsTrigger>
                </TabsList>
              </div>
              <TabsContent value="primary">{renderInputs("colors", "primary")}</TabsContent>
              <TabsContent value="secondary">{renderInputs("colors", "secondary")}</TabsContent>
              <TabsContent value="accent">{renderInputs("colors", "accent")}</TabsContent>
              <TabsContent value="muted">{renderInputs("colors", "muted")}</TabsContent>
            </Tabs>
          </TabsContent>

          <TabsContent value="typography" className="space-y-4">
            <h2 className="px-2 text-xl font-semibold">Typography</h2>
            {renderInputs("typography")}
          </TabsContent>

          <TabsContent value="other" className="space-y-4">
            <h2 className="px-2 text-xl font-semibold">Other</h2>
            {renderInputs("other")}
          </TabsContent>
        </Tabs>
      </div>

      <Button
        onClick={() => {
          console.log({ config });
          onUpdate(config);
        }}
      >
        Update
      </Button>
    </div>
  );
}
