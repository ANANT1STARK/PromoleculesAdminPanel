// "use client";

// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import {
//   Table,
//   TableHeader,
//   TableBody,
//   TableRow,
//   TableHead,
//   TableCell,
// } from "@/components/ui/table";
// import { Pencil, Trash2 } from "lucide-react";

// const paymentColors = {
//   Completed: "text-green-600",
//   Pending: "text-yellow-600",
//   Failed: "text-red-500",
// };

// const statusColors = {
//   Processing: "bg-blue-100 text-blue-700",
//   Completed: "bg-green-100 text-green-700",
//   Cancelled: "bg-red-100 text-red-700",
// };

// export default function OrderTable({ orders, onEdit, onDelete }) {
//   return (
//     <Table className="table-fixed w-full">
//       <TableHeader>
//         <TableRow>
//           <TableHead className="w-[10%]">ID</TableHead>
//           <TableHead className="w-[25%]">Customer</TableHead>
//           <TableHead className="w-[12%]">Amount</TableHead>
//           <TableHead className="w-[13%]">Payment</TableHead>
//           <TableHead className="w-[13%]">Status</TableHead>
//           <TableHead className="w-[13%]">Created</TableHead>
//           <TableHead className="w-[14%] text-right">Actions</TableHead>
//         </TableRow>
//       </TableHeader>

//       <TableBody>
//         {orders.length === 0 && (
//           <TableRow>
//             <TableCell colSpan={7} className="text-center text-slate-400 py-8">
//               No orders yet.
//             </TableCell>
//           </TableRow>
//         )}

//         {orders.map((o) => (
//           <TableRow key={o.id}>
//             <TableCell className="text-sm font-medium">{o.id}</TableCell>

//             <TableCell>
//               <div className="text-sm font-medium">{o.customerName}</div>
//               <div className="text-xs text-slate-400 whitespace-normal break-words">
//                 {o.email}
//               </div>
//               <div className="text-xs text-slate-400">{o.phone}</div>
//             </TableCell>

//             <TableCell className="text-sm">₹{o.amount}</TableCell>

//             <TableCell>
//               <span className={`text-sm ${paymentColors[o.paymentStatus] || ""}`}>
//                 {o.paymentStatus}
//               </span>
//             </TableCell>

//             <TableCell>
//               <Badge className={statusColors[o.status] || ""} variant="outline">
//                 {o.status}
//               </Badge>
//             </TableCell>

//             <TableCell className="text-sm">{o.createdAt}</TableCell>

//             <TableCell className="text-right">
//               <Button size="icon" variant="ghost" onClick={() => onEdit(o)}>
//                 <Pencil size={16} />
//               </Button>
//               <Button size="icon" variant="ghost" onClick={() => onDelete(o.id)}>
//                 <Trash2 size={16} className="text-red-500" />
//               </Button>
//             </TableCell>
//           </TableRow>
//         ))}
//       </TableBody>
//     </Table>
//   );
// }


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
  if (amount === null || amount === undefined) return "₹0";

  return `₹${Number(amount).toLocaleString("en-IN")}`;
}

export default function OrderTable({ orders, onEdit, onDelete }) {
  return (
    <Table className="table-fixed w-full">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[18%]">Order</TableHead>
          <TableHead className="w-[20%]">Customer</TableHead>
          <TableHead className="w-[12%]">Items</TableHead>
          <TableHead className="w-[12%]">Amount</TableHead>
          <TableHead className="w-[13%]">Payment</TableHead>
          <TableHead className="w-[13%]">Status</TableHead>
          <TableHead className="w-[12%]">Created</TableHead>
          {/* <TableHead className="w-[10%] text-right">Actions</TableHead> */}
        </TableRow>
      </TableHeader>

      <TableBody>
        {orders.length === 0 && (
          <TableRow>
            <TableCell
              colSpan={8}
              className="text-center text-slate-400 py-8"
            >
              No orders yet.
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
              <div className="text-sm font-medium">
                {o.user?.name || o.shippingFullName || "-"}
              </div>

              <div className="text-xs text-slate-400 whitespace-normal break-words">
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
                {(o.items?.length || 0) !== 1 ? "s" : ""}
              </div>

              {o.items?.length > 0 && (
                <div className="text-xs text-slate-400 truncate">
                  {o.items[0].productName}
                  {o.items.length > 1 && ` + ${o.items.length - 1} more`}
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

              <div className="text-xs text-slate-400 mt-1">
                {o.paymentMethod || "-"}
              </div>
            </TableCell>

            {/* Order Status */}
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
            <TableCell className="text-sm">
              {formatDate(o.createdAt)}
            </TableCell>

            {/* Actions */}
            {/* <TableCell className="text-right">
              <Button
                size="icon"
                variant="ghost"
                onClick={() => onEdit(o)}
              >
                <Pencil size={16} />
              </Button>

              <Button
                size="icon"
                variant="ghost"
                onClick={() => onDelete(o.id)}
              >
                <Trash2 size={16} className="text-red-500" />
              </Button>
            </TableCell> */}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}