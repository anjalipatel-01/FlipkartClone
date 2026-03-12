import type { Spec } from "@/components/product-details/types";

interface SpecGroupProps {
  name: string;
  specs: Spec[];
}

export default function SpecGroup({ name, specs }: SpecGroupProps) {
  return (
    <div className="mt-5 first:mt-0">
      <h3 className="mb-2 font-bold text-fk-text">{name}</h3>
      <div className="divide-y divide-gray-100">
        {specs.map((spec) => (
          <div key={spec.id} className="py-3">
            <p className="text-xs text-fk-text-light">{spec.spec_key}</p>
            <p className="mt-0.5 text-sm leading-relaxed text-fk-text">{spec.spec_value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}