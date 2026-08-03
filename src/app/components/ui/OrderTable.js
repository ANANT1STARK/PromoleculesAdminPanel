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

const paymentColors = {
  Completed: "text-green-600",
  Pending: "text-yellow-600",
  Failed: "text-red-500",
};

const statusColors = {
  Processing: "bg-blue-100 text-blue-700",
  Completed: "bg-green-100 text-green-700",
  Cancelled: "bg-red-100 text-red-700",
};

export default function OrderTable({ orders, onEdit, onDelete }) {
  return (
    <Table className="table-fixed w-full">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[10%]">ID</TableHead>
          <TableHead className="w-[25%]">Customer</TableHead>
          <TableHead className="w-[12%]">Amount</TableHead>
          <TableHead className="w-[13%]">Payment</TableHead>
          <TableHead className="w-[13%]">Status</TableHead>
          <TableHead className="w-[13%]">Created</TableHead>
          <TableHead className="w-[14%] text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {orders.length === 0 && (
          <TableRow>
            <TableCell colSpan={7} className="text-center text-slate-400 py-8">
              No orders yet.
            </TableCell>
          </TableRow>
        )}

        {orders.map((o) => (
          <TableRow key={o.id}>
            <TableCell className="text-sm font-medium">{o.id}</TableCell>

            <TableCell>
              <div className="text-sm font-medium">{o.customerName}</div>
              <div className="text-xs text-slate-400 whitespace-normal break-words">
                {o.email}
              </div>
              <div className="text-xs text-slate-400">{o.phone}</div>
            </TableCell>

            <TableCell className="text-sm">₹{o.amount}</TableCell>

            <TableCell>
              <span className={`text-sm ${paymentColors[o.paymentStatus] || ""}`}>
                {o.paymentStatus}
              </span>
            </TableCell>

            <TableCell>
              <Badge className={statusColors[o.status] || ""} variant="outline">
                {o.status}
              </Badge>
            </TableCell>

            <TableCell className="text-sm">{o.createdAt}</TableCell>

            <TableCell className="text-right">
              <Button size="icon" variant="ghost" onClick={() => onEdit(o)}>
                <Pencil size={16} />
              </Button>
              <Button size="icon" variant="ghost" onClick={() => onDelete(o.id)}>
                <Trash2 size={16} className="text-red-500" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}