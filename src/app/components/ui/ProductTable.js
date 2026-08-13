"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Pencil, Trash2 } from "lucide-react";

// Price/discount/stock no longer live on the product itself — they're
// per-variant now, so the table has to summarize across variants[].
function getVariantStats(product) {
  const variants = product.variants || [];

  const prices = variants
    .map((v) => parseFloat(v.price))
    .filter((n) => !Number.isNaN(n));

  // If discountedPrice is null, use the regular price
  const discounted = variants
    .map((v) => {
      const discountPrice = parseFloat(v.discountedPrice);

      if (!Number.isNaN(discountPrice)) {
        return discountPrice;
      }

      const regularPrice = parseFloat(v.price);

      return !Number.isNaN(regularPrice) ? regularPrice : null;
    })
    .filter((n) => n !== null);

  const totalStock = variants.reduce(
    (sum, v) => sum + (Number(v.stockQuantity) || 0),
    0
  );

  return {
    minPrice: prices.length ? Math.min(...prices) : null,
    minDiscounted: discounted.length ? Math.min(...discounted) : null,
    maxDiscounted: discounted.length ? Math.max(...discounted) : null,
    totalStock,
    variantCount: variants.length,
  };
}

export default function ProductTable({ products, onEdit, onDelete }) {
  return (
    <Table className="table-fixed w-full">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[33%]">Product</TableHead>
          <TableHead className="w-[15%]">Price</TableHead>
          <TableHead className="w-[13%]">Stock</TableHead>
          <TableHead className="w-[13%]">SKU</TableHead>
          <TableHead className="w-[12%]">Created</TableHead>
          <TableHead className="w-[8%]">Status</TableHead>
          <TableHead className="w-[6%] text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {products.length === 0 && (
          <TableRow>
            <TableCell colSpan={7} className="text-center text-slate-400 py-8">
              No products yet.
            </TableCell>
          </TableRow>
        )}

        {products.map((p) => {
          const stats = getVariantStats(p);

          return (
            <TableRow key={p.id}>
              <TableCell className="w-[33%]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded bg-slate-100 flex-shrink-0 flex items-center justify-center">
                    {p.id}
                  </div>
                  <span className="text-sm whitespace-normal break-words">{p.name}</span>
                </div>
              </TableCell>

              <TableCell>
              {stats.minDiscounted != null ? (
                <div className="text-sm">
                  ₹{stats.minDiscounted}

                  {stats.minDiscounted !== stats.maxDiscounted && (
                    <span> – ₹{stats.maxDiscounted}</span>
                  )}

                  {stats.minPrice != null &&
                    stats.minPrice > stats.minDiscounted && (
                      <span className="text-slate-400 line-through ml-1.5">
                        ₹{stats.minPrice}
                      </span>
                    )}
                </div>
              ) : stats.minPrice != null ? (
                <span className="text-sm">
                  ₹{stats.minPrice}
                </span>
              ) : (
                <span className="text-slate-400 text-sm">—</span>
              )}
            </TableCell>

              <TableCell>
                {stats.variantCount === 0 ? (
                  <span className="text-slate-400 text-sm">—</span>
                ) : stats.totalStock > 0 ? (
                  <span className="text-green-600">In stock ({stats.totalStock})</span>
                ) : (
                  <span className="text-red-500">Out of stock</span>
                )}
              </TableCell>

              <TableCell className="text-sm">{p.sku}</TableCell>
              <TableCell className="text-sm">{p.createdAt?.slice(0, 10)}</TableCell>

              <TableCell>
                <Badge variant={p.status === "active" ? "default" : "secondary"}>
                  {p.status}
                </Badge>
              </TableCell>

              <TableCell className="text-right">
                <Button size="icon" variant="ghost" onClick={() => onEdit(p)}>
                  <Pencil size={16} />
                </Button>
                <Button size="icon" variant="ghost" onClick={() => onDelete(p)}>
                  <Trash2 size={16} className="text-red-500" />
                </Button>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}