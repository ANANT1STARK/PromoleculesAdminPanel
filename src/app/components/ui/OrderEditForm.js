"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function OrderEditForm({ open, onOpenChange, order, onSave }) {
  const [paymentStatus, setPaymentStatus] = useState("Completed");
  const [status, setStatus] = useState("Processing");

  useEffect(() => {
    if (order) {
      setPaymentStatus(order.paymentStatus);
      setStatus(order.status);
    }
  }, [order, open]);

  function handleSubmit(e) {
    e.preventDefault();
    onSave({ ...order, paymentStatus, status });
    onOpenChange(false);
  }

  if (!order) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Order #{order.id}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="text-sm text-slate-500">
            {order.customerName} · {order.email}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="paymentStatus">Payment Status</Label>
            <select
              id="paymentStatus"
              value={paymentStatus}
              onChange={(e) => setPaymentStatus(e.target.value)}
              className="w-full h-9 rounded-md border px-3 text-sm"
            >
              <option>Completed</option>
              <option>Pending</option>
              <option>Failed</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="status">Order Status</Label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full h-9 rounded-md border px-3 text-sm"
            >
              <option>Processing</option>
              <option>Completed</option>
              <option>Cancelled</option>
            </select>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}