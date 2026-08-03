"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import CustomerTable from "@/app/components/ui/CustomerTable";
import CustomerForm from "@/app/components/ui/CustomerForm";
import CustomerViewDialog from "@/app/components/ui/CustomerViewDialog";
import initialCustomers from "@/app/components/data/customers.json";

export default function CustomersPage() {
  const [customers, setCustomers] = useState(initialCustomers);
  const [formOpen, setFormOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  function handleAddClick() {
    setSelectedCustomer(null);
    setFormOpen(true);
  }

  function handleEditClick(customer) {
    setSelectedCustomer(customer);
    setFormOpen(true);
  }

  function handleViewClick(customer) {
    setSelectedCustomer(customer);
    setViewOpen(true);
  }

  function handleDelete(id) {
    setCustomers((prev) => prev.filter((c) => c.id !== id));
  }

  function handleSave(customer) {
    if (customer.id) {
      setCustomers((prev) => prev.map((c) => (c.id === customer.id ? customer : c)));
    } else {
      const newCustomer = {
        ...customer,
        id: Date.now(),
        createdAt: new Date().toISOString().slice(0, 10),
      };
      setCustomers((prev) => [newCustomer, ...prev]);
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold">Customers</h1>
        <Button onClick={handleAddClick}>
          <Plus size={16} className="mr-1" /> Add Customer
        </Button>
      </div>

      <div className="bg-white rounded-lg border">
        <CustomerTable
          customers={customers}
          onView={handleViewClick}
          onEdit={handleEditClick}
          onDelete={handleDelete}
        />
      </div>

      <CustomerForm
        open={formOpen}
        onOpenChange={setFormOpen}
        customer={selectedCustomer}
        onSave={handleSave}
      />

      <CustomerViewDialog
        open={viewOpen}
        onOpenChange={setViewOpen}
        customer={selectedCustomer}
      />
    </div>
  );
}