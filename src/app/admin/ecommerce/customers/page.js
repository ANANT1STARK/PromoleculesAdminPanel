// "use client";

// import { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { toast } from "sonner";
// import { Plus } from "lucide-react";
// import CustomerTable from "@/app/components/ui/CustomerTable";
// import CustomerForm from "@/app/components/ui/CustomerForm";
// import CustomerViewDialog from "@/app/components/ui/CustomerViewDialog";
// import TableSkeleton from "@/app/components/ui/TableSkeleton";
// import { Skeleton } from "@/components/ui/skeleton";

// export default function CustomersPage() {
//   const [customers, setCustomers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [formOpen, setFormOpen] = useState(false);
//   const [viewOpen, setViewOpen] = useState(false);
//   const [selectedCustomer, setSelectedCustomer] = useState(null);

//   useEffect(() => {
//     async function fetchCustomers() {
//       const token = sessionStorage.getItem("pm_admin_token");
//       try {
//         const res = await fetch(
//           `${process.env.NEXT_PUBLIC_BASE_URL}/api/dashboard/users`,
//           {
//             method: "GET",
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         if (!res.ok) {
//           throw new Error(`Request failed with status ${res.status}`);
//         }

//         const data = await res.json();
//         console.log(data);

//         setCustomers(data.users || []);
//       } catch (err) {
//         console.error("Failed to fetch customers:", err);
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchCustomers();

//   }, []);

//   function handleAddClick() {
//     setSelectedCustomer(null);
//     setFormOpen(true);
//   }

//   function handleEditClick(customer) {
//     setSelectedCustomer(customer);
//     setFormOpen(true);
//   }

//   function handleViewClick(customer) {
//     setSelectedCustomer(customer);
//     setViewOpen(true);
//   }

//   function handleDelete(id) {
//     setCustomers((prev) => prev.filter((c) => c.id !== id));
//   }

//   function handleSave(customer) {
//     if (customer.id) {
//       setCustomers((prev) =>
//         prev.map((c) => (c.id === customer.id ? customer : c))
//       );
//     } else {
//       const newCustomer = {
//         ...customer,
//         id: Date.now(),
//         createdAt: new Date().toISOString().slice(0, 10),
//       };
//       setCustomers((prev) => [newCustomer, ...prev]);
//     }
//   }

//   if (loading) {
//     return (
//       <div>
//         <div className="flex items-center justify-between mb-4">
//           <Skeleton className="h-8 w-44" />
//           <Skeleton className="h-10 w-36 rounded-md" />
//         </div>

//         <TableSkeleton rows={6} columns={5} />
//       </div>
//     );
//   }

//   if (error) return <p className="text-red-500">Failed to load customers: {error}</p>;

//   return (
//     <div>
//       <div className="flex items-center justify-between mb-4">
//         <h1 className="text-xl font-semibold">Customers</h1>
//         <Button onClick={handleAddClick}>
//           <Plus size={16} className="mr-1" /> Add Customer
//         </Button>
//       </div>

//       <div className="bg-white rounded-lg border">
//         <CustomerTable
//           customers={customers}
//           onView={handleViewClick}
//           onEdit={handleEditClick}
//           onDelete={handleDelete}
//         />
//       </div>

//       <CustomerForm
//         open={formOpen}
//         onOpenChange={setFormOpen}
//         customer={selectedCustomer}
//         onSave={handleSave}
//       />

//       <CustomerViewDialog
//         open={viewOpen}
//         onOpenChange={setViewOpen}
//         customer={selectedCustomer}
//       />
//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import CustomerTable from "@/app/components/ui/CustomerTable";
import CustomerForm from "@/app/components/ui/CustomerForm";
import CustomerViewDialog from "@/app/components/ui/CustomerViewDialog";
import DeleteConfirmDialog from "@/app/components/ui/DeleteConfirmDialog";
import TableSkeleton from "@/app/components/ui/TableSkeleton";
import { Skeleton } from "@/components/ui/skeleton";

const API_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/dashboard/users`;

function getToken() {
  return sessionStorage.getItem("pm_admin_token");
}

export default function CustomersPage() {
  
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [formOpen, setFormOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [customerToDelete, setCustomerToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    async function fetchCustomers() {
      try {
        const res = await fetch(API_URL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
          },
        });

        if (!res.ok) {
          throw new Error(`Request failed with status ${res.status}`);
        }

        const data = await res.json();
        setCustomers(data.users || []);
      } catch (err) {
        console.error("Failed to fetch customers:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchCustomers();
  }, []);

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

  function handleDelete(customer) {
    setCustomerToDelete(customer);
    setDeleteDialogOpen(true);
  }

  async function confirmDelete() {
    if (!customerToDelete) return;

    setDeleting(true);

    try {
      const res = await fetch(`${API_URL}/${customerToDelete.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => null);
        throw new Error(
          errData?.message || `Deletion failed with status ${res.status}`
        );
      }

      setCustomers((prev) => prev.filter((c) => c.id !== customerToDelete.id));
      toast.success("Customer deleted successfully!");

      setDeleteDialogOpen(false);
      setCustomerToDelete(null);
    } catch (err) {
      console.error(err);
      toast.error(`Failed to delete customer: ${err.message}`);
    } finally {
      setDeleting(false);
    }
  }

  async function handleSave(customer) {
    // editing existing user — PUT, id stripped from body
    if (customer.id) {
      const { id, createdAt, ...bodyWithoutId } = customer;

      try {
        const res = await fetch(`${API_URL}/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
          },
          body: JSON.stringify(bodyWithoutId),
        });

        if (!res.ok) {
          const errData = await res.json().catch(() => null);
          throw new Error(
            errData?.message || `Request failed with status ${res.status}`
          );
        }

        const data = await res.json();
        const updated = data.user || data;
        setCustomers((prev) =>
          prev.map((c) => (c.id === updated.id ? updated : c))
        );
        toast.success("Customer updated successfully!");
      } catch (err) {
        console.error("Update customer failed:", err);
        toast.error(`Failed to update customer: ${err.message}`);
      }
      return;
    }

    // creating a new user — POST
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(customer),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => null);
        throw new Error(
          errData?.message || `Request failed with status ${res.status}`
        );
      }

      const data = await res.json();
      const created = data.user || data;
      setCustomers((prev) => [created, ...prev]);
      toast.success("Customer created successfully!");
    } catch (err) {
      console.error("Create customer failed:", err);
      toast.error(`Failed to create customer: ${err.message}`);
    }
  }

  if (loading) {
    return (
      <div>
        <div className="flex items-center justify-between mb-4">
          <Skeleton className="h-8 w-44" />
          <Skeleton className="h-10 w-36 rounded-md" />
        </div>

        <TableSkeleton rows={6} columns={5} />
      </div>
    );
  }

  if (error) return <p className="text-red-500">Failed to load customers: {error}</p>;

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

      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title="Delete Customer"
        description={
          customerToDelete
            ? `Are you sure you want to delete "${customerToDelete.name}"? This action cannot be undone.`
            : ""
        }
        onConfirm={confirmDelete}
        loading={deleting}
      />
    </div>
  );
}