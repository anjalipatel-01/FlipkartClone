export type Spec = {
  id: number;
  spec_key: string;
  spec_value: string;
};

export type DetailTabKey = "specifications" | "warranty" | "manufacturer";

export interface DetailRow {
  label: string;
  value: string;
}