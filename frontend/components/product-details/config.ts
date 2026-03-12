import type { DetailRow, DetailTabKey } from "@/components/product-details/types";

export const DETAIL_TABS: { key: DetailTabKey; label: string }[] = [
  { key: "specifications", label: "Specifications" },
  { key: "warranty", label: "Warranty" },
  { key: "manufacturer", label: "Manufacturer info" },
];

export const WARRANTY_ROWS: DetailRow[] = [
  { label: "Warranty Summary", value: "1 Year Comprehensive Warranty" },
  { label: "Covered in Warranty", value: "Manufacturing defects and hardware failures" },
  { label: "Not Covered in Warranty", value: "Physical damage, liquid damage, or unauthorized modifications" },
  { label: "Service Type", value: "Carry-in to Authorised Service Centre" },
  { label: "Warranty Registration", value: "Visit brand website to register your product for warranty" },
];

const SPEC_GROUP_PATTERNS: [RegExp, string][] = [
  [/sales.?package|in.?the.?box|box.?content/i, "In the Box"],
  [/brand|model|series|color|colour|finish|style|type|foldable/i, "General"],
  [/display|screen|resolution|refresh|hdr|aspect/i, "Display"],
  [/processor|cpu|ram|memory|storage|rom|\bos\b|operating|gpu|graphics/i, "Performance"],
  [/camera|lens|aperture|video|optical/i, "Camera"],
  [/battery|charging|mah|watt/i, "Battery & Charging"],
  [/connectivity|bluetooth|wifi|wi-fi|usb|nfc|sim|network|5g|4g|dpi|buttons|scroll/i, "Connectivity & Features"],
  [/weight|dimension|height|width|depth|thickness/i, "Dimensions"],
  [/anc|driver|water|ip.?rating|resistance/i, "Features"],
];

export function getSpecGroupName(specKey: string) {
  for (const [pattern, groupName] of SPEC_GROUP_PATTERNS) {
    if (pattern.test(specKey)) {
      return groupName;
    }
  }

  return "General";
}

export function getManufacturerRows(brand?: string): DetailRow[] {
  const resolvedBrand = brand || "N/A";

  return [
    { label: "Manufacturer", value: resolvedBrand },
    { label: "Sold By", value: `${resolvedBrand} Official Store` },
    {
      label: "Manufactured For",
      value:
        "Flipkart Internet Private Limited, Buildings Alyssa, Begonia & Clove, Embassy Tech Village, Outer Ring Road, Bengaluru - 560103",
    },
    { label: "Country of Origin", value: "India" },
    { label: "Importer", value: `${resolvedBrand} India Pvt. Ltd.` },
  ];
}