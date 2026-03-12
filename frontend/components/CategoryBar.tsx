"use client";

import { usePathname, useSearchParams } from "next/navigation";
import CategoryBarItem from "@/components/category-bar/CategoryBarItem";
import { CATEGORY_ITEMS } from "@/components/category-bar/data";

export default function CategoryBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category") || "";
  const isHome = pathname === "/" && !activeCategory;

  return (
    <nav className="bg-white shadow-sm border-t border-gray-100">
      <div className="mx-auto max-w-[1400px] overflow-x-auto hide-scrollbar">
        <div className="flex items-center gap-0 px-2 min-w-max">
          {CATEGORY_ITEMS.map((category) => (
            <CategoryBarItem
              key={category.key}
              category={category}
              isActive={(category.slug === "" && isHome) || category.slug === activeCategory}
            />
          ))}
        </div>
      </div>
    </nav>
  );
}
