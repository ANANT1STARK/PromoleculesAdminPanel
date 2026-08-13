"use client";

import { useState, useEffect } from "react";
import OrderTable from "@/app/components/ui/OrderTable";
import OrderEditForm from "@/app/components/ui/OrderEditForm";
import TableSkeleton from "@/app/components/ui/TableSkeleton";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const [formOpen, setFormOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);

  // Filters
  const [paymentFilter, setPaymentFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  function Token() {
    return sessionStorage.getItem("pm_admin_token");
  }

  useEffect(() => {
    async function fetchOrders() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/orders/dashboard/all`,
          {
            method: "GET",
            headers: {
              "Content-Type": "Application/json",
              Authorization: `Bearer ${Token()}`,
            },
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch orders : " + res.status);
        }

        const data = await res.json();

        setOrders(data.orders || []);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, []);

  function handleEditClick(order) {
    setEditingOrder(order);
    setFormOpen(true);
  }

  function handleDelete(id) {
    setOrders((prev) => prev.filter((o) => o.id !== id));
  }

  function handleSave(updatedOrder) {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === updatedOrder.id ? updatedOrder : o
      )
    );
  }

  // Apply filters
  const filteredOrders = orders.filter((order) => {
    const paymentMatches =
      paymentFilter === "all" ||
      order.paymentStatus?.toLowerCase() === paymentFilter;

    const statusMatches =
      statusFilter === "all" ||
      order.status?.toLowerCase() === statusFilter;

    return paymentMatches && statusMatches;
  });

  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">
        Orders
      </h1>

      {/* Filters */}
      <div className="bg-white border rounded-lg p-4 mb-4">
        <div className="flex flex-wrap items-center gap-4">

          {/* Payment Filter */}
          <div className="flex items-center gap-2">
            <label
              htmlFor="payment-filter"
              className="text-sm font-medium text-slate-700"
            >
              Payment:
            </label>

            <select
              id="payment-filter"
              value={paymentFilter}
              onChange={(e) => setPaymentFilter(e.target.value)}
              className="h-9 rounded-md border border-slate-300 bg-white px-3 text-sm outline-none focus:border-slate-500"
            >
              <option value="all">All</option>
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
            </select>
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <label
              htmlFor="status-filter"
              className="text-sm font-medium text-slate-700"
            >
              Status:
            </label>

            <select
              id="status-filter"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="h-9 rounded-md border border-slate-300 bg-white px-3 text-sm outline-none focus:border-slate-500"
            >
              <option value="all">All</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          {/* Clear Filters */}
          {(paymentFilter !== "all" || statusFilter !== "all") && (
            <button
              type="button"
              onClick={() => {
                setPaymentFilter("all");
                setStatusFilter("all");
              }}
              className="text-sm text-slate-500 hover:text-slate-900"
            >
              Clear filters
            </button>
          )}

          {/* Result count */}
          <div className="ml-auto text-sm text-slate-400">
            Showing {filteredOrders.length} of {orders.length} orders
          </div>
        </div>
      </div>

      {/* Orders Table */}
      {loading ? (
        <TableSkeleton rows={8} columns={7} />
      ) : (
        <div className="bg-white rounded-lg border">
          <OrderTable
            orders={filteredOrders}
            onEdit={handleEditClick}
            onDelete={handleDelete}
          />
        </div>
      )}

      <OrderEditForm
        open={formOpen}
        onOpenChange={setFormOpen}
        order={editingOrder}
        onSave={handleSave}
      />
    </div>
  );
}