"use client";

import { useState } from "react";
import OrderTable from "@/app/components/ui/OrderTable";
import OrderEditForm from "@/app/components/ui/OrderEditForm";
import initialOrders from "@/app/components/data/orders.json";

export default function OrdersPage() {
  const [orders, setOrders] = useState(initialOrders);
  const [formOpen, setFormOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);

  function handleEditClick(order) {
    setEditingOrder(order);
    setFormOpen(true);
  }

  function handleDelete(id) {
    setOrders((prev) => prev.filter((o) => o.id !== id));
  }

  function handleSave(updatedOrder) {
    setOrders((prev) =>
      prev.map((o) => (o.id === updatedOrder.id ? updatedOrder : o))
    );
  }

  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">Orders</h1>

      <div className="bg-white rounded-lg border">
        <OrderTable orders={orders} onEdit={handleEditClick} onDelete={handleDelete} />
      </div>

      <OrderEditForm
        open={formOpen}
        onOpenChange={setFormOpen}
        order={editingOrder}
        onSave={handleSave}
      />
    </div>
  );
}