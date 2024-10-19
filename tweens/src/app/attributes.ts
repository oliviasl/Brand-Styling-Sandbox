export interface AttributePair {
  primary: string;
  inverse: string;
}

export const ATTRIBUTES: AttributePair[] = [
  { primary: "Corporate", inverse: "Friendly" },
  { primary: "Universal", inverse: "Abstract" },
  { primary: "Minimal", inverse: "Fun" },
];

export type Attributes = Record<string, number>;
