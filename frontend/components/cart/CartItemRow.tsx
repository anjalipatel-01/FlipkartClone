"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import type { CartItem } from "@/lib/cartContext";
import { getDeliveryDate } from "@/lib/utils";

interface CartItemRowProps {
  item: CartItem;
  onRemove: () => void;
  onQtyChange: (qty: number) => void;
  isLast: boolean;
}

export default function CartItemRow({ item, onRemove, onQtyChange, isLast }: CartItemRowProps) {
  const [removing, setRemoving] = useState(false);

  const handleRemove = () => {
    setRemoving(true);
    setTimeout(() => onRemove(), 300);
  };

  return (
    <div
      className={`transition-opacity duration-300 ${removing ? "opacity-0" : "opacity-100"} ${!isLast ? "border-b border-gray-100" : ""}`}
    >
      <div className="flex gap-4 px-5 py-5">
        {/* Thumbnail */}
        <Link href={`/products/${item.product_id}`} className="shrink-0">
          <div className="relative h-[100px] w-[100px] overflow-hidden rounded bg-gray-50">
            {item.thumbnail ? (
              <Image src={item.thumbnail} alt={item.name} fill className="object-contain p-1" sizes="100px" />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-3xl text-gray-300">📦</div>
            )}
          </div>
        </Link>

        {/* Details */}
        <div className="flex-1 min-w-0">
          <Link href={`/products/${item.product_id}`}>
            <p className="text-sm font-medium text-fk-text line-clamp-2 hover:text-fk-blue">{item.name}</p>
          </Link>
          <p className="mt-0.5 text-xs text-fk-text-light">{item.brand}</p>

          {/* Price */}
          <div className="mt-2 flex items-baseline gap-2 flex-wrap">
            <span className="text-base font-bold text-fk-text">
              ₹{(item.price * item.quantity).toLocaleString("en-IN")}
            </span>
            {item.discount_percent > 0 && (
              <>
                <span className="text-sm text-fk-text-light line-through">
                  ₹{(item.mrp * item.quantity).toLocaleString("en-IN")}
                </span>
                <span className="text-sm font-semibold text-fk-green">{item.discount_percent}% off</span>
              </>
            )}
          </div>

          <p className="mt-1.5 text-xs text-fk-text-light">
            Delivery by <span className="font-medium text-fk-text">{getDeliveryDate(3)}</span>
          </p>

          {/* Qty selector + actions */}
          <div className="mt-3 flex flex-wrap items-center gap-4">
            <div className="flex items-center">
              <span className="mr-2 text-xs text-fk-text-light">Qty:</span>
              <div className="flex items-center rounded border border-gray-300 overflow-hidden">
                <button
                  onClick={() => onQtyChange(item.quantity - 1)}
                  disabled={item.quantity <= 1}
                  className="flex h-7 w-7 items-center justify-center text-fk-text hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  −
                </button>
                <span className="flex h-7 w-10 items-center justify-center border-x border-gray-300 text-sm font-semibold text-fk-text">
                  {item.quantity}
                </span>
                <button
                  onClick={() => onQtyChange(item.quantity + 1)}
                  disabled={item.quantity >= item.stock}
                  className="flex h-7 w-7 items-center justify-center text-fk-text hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            <span className="hidden h-4 border-l border-gray-200 sm:block" />

            <button
              onClick={handleRemove}
              className="flex items-center gap-1.5 text-sm font-medium text-fk-text-light hover:text-fk-red transition-colors"
            >
              <FiTrash2 size={14} />
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
