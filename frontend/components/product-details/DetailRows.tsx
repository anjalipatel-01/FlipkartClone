import type { DetailRow } from "@/components/product-details/types";

interface DetailRowsProps {
  rows: DetailRow[];
}

export default function DetailRows({ rows }: DetailRowsProps) {
  return (
    <div className="divide-y divide-gray-100">
      {rows.map((row) => (
        <div key={row.label} className="py-3">
          <p className="text-xs text-fk-text-light">{row.label}</p>
          <p className="mt-0.5 text-sm leading-relaxed text-fk-text">{row.value}</p>
        </div>
      ))}
    </div>
  );
}