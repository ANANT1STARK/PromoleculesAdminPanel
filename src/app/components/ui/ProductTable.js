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

export default function ProductTable({ products, onEdit, onDelete }) {
  return (
    <Table className="table-fixed w-full">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[35%]">Product</TableHead>
          <TableHead className="w-[12%]">Price</TableHead>
          <TableHead className="w-[12%]">Stock</TableHead>
          <TableHead className="w-[13%]">SKU</TableHead>
          <TableHead className="w-[12%]">Created</TableHead>
          <TableHead className="w-[10%]">Status</TableHead>
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

        {products.map((p) => (
          <TableRow key={p.id}>
            <TableCell className="w-[35%]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded bg-slate-100 flex-shrink-0" />
                <span className="text-sm whitespace-normal break-words">{p.name}</span>
              </div>
            </TableCell>

            <TableCell>
              <div className="text-sm">
                ₹{p.price}
                {p.oldPrice && (
                  <span className="text-slate-400 line-through ml-1">
                    ₹{p.oldPrice}
                  </span>
                )}
              </div>
            </TableCell>

            <TableCell>
              <span className={p.stockStatus === "In stock" ? "text-green-600" : "text-red-500"}>
                {p.stockStatus}
              </span>
            </TableCell>

            <TableCell className="text-sm">{p.sku}</TableCell>
            <TableCell className="text-sm">{p.createdAt}</TableCell>

            <TableCell>
              <Badge variant={p.status === "Published" ? "default" : "secondary"}>
                {p.status}
              </Badge>
            </TableCell>

            <TableCell className="text-right">
              <Button size="icon" variant="ghost" onClick={() => onEdit(p)}>
                <Pencil size={16} />
              </Button>
              <Button size="icon" variant="ghost" onClick={() => onDelete(p.id)}>
                <Trash2 size={16} className="text-red-500" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}