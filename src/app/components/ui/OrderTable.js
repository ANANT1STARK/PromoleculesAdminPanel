"use client";

import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";

import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";

const paymentColors = {
  paid: "bg-green-100 text-green-700 border-green-200",
  pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
  failed: "bg-red-100 text-red-700 border-red-200",
};

const statusColors = {
  pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
  confirmed: "bg-green-100 text-green-700 border-green-200",
  processing: "bg-blue-100 text-blue-700 border-blue-200",
  shipped: "bg-purple-100 text-purple-700 border-purple-200",
  delivered: "bg-green-100 text-green-700 border-green-200",
  cancelled: "bg-red-100 text-red-700 border-red-200",
};

function formatDate(date) {
  if (!date) return "-";

  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatAmount(amount) {
  if (amount === null || amount === undefined) {
    return "₹0";
  }

  return `₹${Number(amount).toLocaleString("en-IN")}`;
}

export default function OrderTable({
  orders,
  onEdit,
  onDelete,
}) {
  return (
    <Table className="min-w-[950px]">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[18%]">
            Order
          </TableHead>

          <TableHead className="w-[20%]">
            Customer
          </TableHead>

          <TableHead className="w-[12%]">
            Items
          </TableHead>

          <TableHead className="w-[12%]">
            Amount
          </TableHead>

          <TableHead className="w-[13%]">
            Payment
          </TableHead>

          <TableHead className="w-[13%]">
            Status
          </TableHead>

          <TableHead className="w-[12%]">
            Created
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {orders.length === 0 && (
          <TableRow>
            <TableCell
              colSpan={7}
              className="py-10 text-center text-slate-400"
            >
              No orders found.
            </TableCell>
          </TableRow>
        )}

        {orders.map((o) => (
          <TableRow key={o.id}>
            {/* Order */}
            <TableCell>
              <div className="text-sm font-medium">
                {o.orderNumber || `#${o.id}`}
              </div>

              <div className="text-xs text-slate-400">
                ID: {o.id}
              </div>
            </TableCell>

            {/* Customer */}
            <TableCell>
              <div className="max-w-[220px] truncate text-sm font-medium">
                {o.user?.name ||
                  o.shippingFullName ||
                  "-"}
              </div>

              <div className="max-w-[220px] break-all text-xs text-slate-400">
                {o.user?.email || "-"}
              </div>

              <div className="text-xs text-slate-400">
                {o.shippingMobile || "-"}
              </div>
            </TableCell>

            {/* Items */}
            <TableCell>
              <div className="text-sm font-medium">
                {o.items?.length || 0} item
                {(o.items?.length || 0) !== 1
                  ? "s"
                  : ""}
              </div>

              {o.items?.length > 0 && (
                <div className="max-w-[150px] truncate text-xs text-slate-400">
                  {o.items[0].productName}

                  {o.items.length > 1 &&
                    ` + ${o.items.length - 1} more`}
                </div>
              )}
            </TableCell>

            {/* Amount */}
            <TableCell>
              <div className="text-sm font-medium">
                {formatAmount(o.totalAmount)}
              </div>

              {Number(o.discountAmount) > 0 && (
                <div className="text-xs text-green-600">
                  -{formatAmount(o.discountAmount)}
                </div>
              )}
            </TableCell>

            {/* Payment */}
            <TableCell>
              <Badge
                variant="outline"
                className={
                  paymentColors[o.paymentStatus] ||
                  "bg-slate-100 text-slate-700"
                }
              >
                {o.paymentStatus || "-"}
              </Badge>

              <div className="mt-1 text-xs text-slate-400">
                {o.paymentMethod || "-"}
              </div>
            </TableCell>

            {/* Status */}
            <TableCell>
              <Badge
                variant="outline"
                className={
                  statusColors[o.status] ||
                  "bg-slate-100 text-slate-700"
                }
              >
                {o.status || "-"}
              </Badge>
            </TableCell>

            {/* Created */}
            <TableCell className="whitespace-nowrap text-sm">
              {formatDate(o.createdAt)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}