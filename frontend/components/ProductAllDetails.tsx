"use client";

import { useState } from "react";
import { FiChevronUp, FiChevronDown } from "react-icons/fi";
import { DETAIL_TABS, getManufacturerRows, getSpecGroupName, WARRANTY_ROWS } from "@/components/product-details/config";
import DetailRows from "@/components/product-details/DetailRows";
import SpecGroup from "@/components/product-details/SpecGroup";
import type { DetailTabKey, Spec } from "@/components/product-details/types";

function groupSpecs(specs: Spec[]): [string, Spec[]][] {
  const map = new Map<string, Spec[]>();
  specs.forEach((spec) => {
    const groupName = getSpecGroupName(spec.spec_key);

    if (!map.has(groupName)) {
      map.set(groupName, []);
    }

    map.get(groupName)?.push(spec);
  });

  return Array.from(map.entries());
}

interface Props {
  specs: Spec[];
  brand?: string;
  description?: string;
}

interface TabButtonProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

function TabButton({ label, active, onClick }: TabButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`shrink-0 rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
        active
          ? "border-fk-text bg-fk-text text-white"
          : "border-gray-300 bg-white text-fk-text hover:border-gray-500"
      }`}
    >
      {label}
    </button>
  );
}
export default function ProductAllDetails({ specs, brand, description }: Props) {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<DetailTabKey>("specifications");

  const specGroups = groupSpecs(specs);
  const manufacturerRows = getManufacturerRows(brand);

  return (
    <div className="rounded-sm bg-white shadow-sm">
      <button
        onClick={() => setOpen((currentOpen) => !currentOpen)}
        className="flex w-full items-center justify-between px-4 py-4 hover:bg-gray-50 active:bg-gray-100"
      >
        <span className="text-base font-semibold text-fk-text">All details</span>
        {open
          ? <FiChevronUp size={18} className="text-fk-text-light" />
          : <FiChevronDown size={18} className="text-fk-text-light" />
        }
      </button>

      {open && (
        <div className="border-t border-gray-100">
          <div className="flex gap-2 overflow-x-auto px-4 pb-3 pt-4 hide-scrollbar">
            {DETAIL_TABS.map((tab) => (
              <TabButton
                key={tab.key}
                label={tab.label}
                active={activeTab === tab.key}
                onClick={() => setActiveTab(tab.key)}
              />
            ))}
          </div>

          <div className="px-4 pb-5">
            {activeTab === "specifications" && (
              <>
                {description && (
                  <div className="mb-4 rounded-sm bg-gray-50 p-3">
                    <p className="text-xs font-semibold uppercase tracking-wide text-fk-text-light">Description</p>
                    <p className="mt-1 text-sm leading-relaxed text-fk-text">{description}</p>
                  </div>
                )}

                {specGroups.length > 0
                  ? specGroups.map(([groupName, groupItems]) => (
                      <SpecGroup key={groupName} name={groupName} specs={groupItems} />
                    ))
                  : <p className="py-6 text-center text-sm text-fk-text-light">No specifications available.</p>
                }
              </>
            )}

            {activeTab === "warranty" && <DetailRows rows={WARRANTY_ROWS} />}
            {activeTab === "manufacturer" && <DetailRows rows={manufacturerRows} />}
          </div>
        </div>
      )}
    </div>
  );
}
