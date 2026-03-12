import Link from "next/link";
import { CATEGORY_ICONS, getCategoryHref, type CategoryItem } from "@/components/category-bar/data";

interface CategoryBarItemProps {
  category: CategoryItem;
  isActive: boolean;
}

export default function CategoryBarItem({ category, isActive }: CategoryBarItemProps) {
  return (
    <Link
      href={getCategoryHref(category.slug)}
      className={`group relative flex flex-col items-center gap-1 px-4 py-2 transition-colors ${
        isActive ? "text-fk-blue" : "text-fk-text hover:text-fk-blue"
      }`}
    >
      <div className="flex h-12 w-12 items-center justify-center transition-transform duration-200 group-hover:scale-110">
        {CATEGORY_ICONS[category.key]}
      </div>
      <span className="whitespace-nowrap text-xs font-semibold">{category.name}</span>
      {isActive && <span className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full bg-fk-blue" />}
    </Link>
  );
}