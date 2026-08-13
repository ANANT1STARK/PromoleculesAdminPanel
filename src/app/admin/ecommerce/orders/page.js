// "use client";

// import { useState , useEffect } from "react";
// import OrderTable from "@/app/components/ui/OrderTable";
// import OrderEditForm from "@/app/components/ui/OrderEditForm";
// import TableSkeleton from "@/app/components/ui/TableSkeleton";
// export default function OrdersPage() {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [formOpen, setFormOpen] = useState(false);
//   const [editingOrder, setEditingOrder] = useState(null);

//   function Token() {
//     return sessionStorage.getItem("pm_admin_token");
//   }


// useEffect(() => {
//   async function fetchOrders() {
//     try {
//       const res = await fetch(
//         `${process.env.NEXT_PUBLIC_BASE_URL}/api/orders/dashboard/all`,
//         {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${Token()}`,
//           },
//         }
//       );

//       if (!res.ok) {
//         throw new Error("Failed to fetch orders : " + res.status);
//       }

//       const data = await res.json();

//       setOrders(data.orders || []);
//     } catch (err) {
//       console.error("Failed to fetch orders:", err);
//     } finally {
//       setLoading(false);
//     }
//   }

//   fetchOrders();
// }, []);



//   function handleEditClick(order) {
//     setEditingOrder(order);
//     setFormOpen(true);
//   }

//   function handleDelete(id) {
//     setOrders((prev) => prev.filter((o) => o.id !== id));
//   }

//   function handleSave(updatedOrder) {
//     setOrders((prev) =>
//       prev.map((o) => (o.id === updatedOrder.id ? updatedOrder : o))
//     );
//   }

//   return (
//     <div>
//       <h1 className="text-xl font-semibold mb-4">Orders</h1>

//     <div>
//       {loading ? (
//         <TableSkeleton rows={8} columns={7} />
//       ) : (
//         <div className="bg-white rounded-lg border">
//           <OrderTable
//             orders={orders}
//             onEdit={handleEditClick}
//             onDelete={handleDelete}
//           />
//         </div>
//       )}
//     </div>

//       <OrderEditForm
//         open={formOpen}
//         onOpenChange={setFormOpen}
//         order={editingOrder}
//         onSave={handleSave}
//       />
//     </div>
//   );
// }



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

  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">
        Orders
      </h1>

      {loading ? (
        <TableSkeleton rows={8} columns={7} />
      ) : (
        <div className="bg-white rounded-lg border">
          <OrderTable
            orders={orders}
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