"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { getAvatarColor } from "@/lib/avatarColor";

export default function CustomerViewDialog({ open, onOpenChange, customer }) {
  if (!customer) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Customer Details</DialogTitle>
        </DialogHeader>

        <div className="flex items-center gap-3 mb-2">
          <div
            className={`w-12 h-12 rounded-full text-white flex items-center justify-center font-semibold text-lg ${getAvatarColor(
              customer.name
            )}`}
          >
            {customer.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="font-medium">{customer.name}</div>
            <div className="text-sm text-slate-400">ID #{customer.id}</div>
          </div>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex justify-between border-b py-1.5">
            <span className="text-slate-500">Email</span>
            <span>{customer.email}</span>
          </div>
          <div className="flex justify-between border-b py-1.5">
            <span className="text-slate-500">Phone</span>
            <span>{customer.phone || "—"}</span>
          </div>
          <div className="flex justify-between border-b py-1.5">
            <span className="text-slate-500">Status</span>
            <span>{customer.status}</span>
          </div>
          <div className="flex justify-between border-b py-1.5">
            <span className="text-slate-500">Is Vendor?</span>
            <span>{customer.isVendor}</span>
          </div>
          <div className="flex justify-between py-1.5">
            <span className="text-slate-500">Created At</span>
            <span>{customer.createdAt}</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}