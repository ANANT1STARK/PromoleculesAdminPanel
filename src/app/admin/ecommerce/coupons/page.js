"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import CouponTable from "@/app/components/ui/CouponTable";
import CouponForm from "@/app/components/ui/CouponForm";
import DeleteConfirmDialog from "@/app/components/ui/DeleteConfirmDialog";
import TableSkeleton from "@/app/components/ui/TableSkeleton";
import { Skeleton } from "@/components/ui/skeleton";

const API_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/coupons`;
const changeAPIUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/dashboard/coupons/`;

function getToken() {
  return sessionStorage.getItem("pm_admin_token");
}
export default function CouponsPage() {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [formOpen, setFormOpen] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState(null);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [couponToDelete, setCouponToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    async function fetchCoupons() {
      try {
        const res = await fetch(API_URL);

        console.log(API_URL)

        console.log(res)
        if (!res.ok) {
          throw new Error(`Request failed with status ${res.status}`);
        }
        const data = await res.json();
        setCoupons(data.coupons || []);
      } catch (err) {
        console.error("Failed to fetch coupons:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchCoupons();
  }, []);

  function handleAddClick() {
    setEditingCoupon(null);
    setFormOpen(true);
  }

  function handleEditClick(coupon) {
    setEditingCoupon(coupon);
    setFormOpen(true);
  }

  function handleDelete(coupon) {
    setCouponToDelete(coupon);
    setDeleteDialogOpen(true);
  }

  async function confirmDelete() {
    if (!couponToDelete) return;

    setDeleting(true);

    
    try {
        console.log("Attempting to delete coupon with ID:", couponToDelete.id);
      const res = await fetch(changeAPIUrl+couponToDelete.id,
         { method: "DELETE" , 
            headers: { "Content-Type": "application/json", "Authorization": `Bearer ${getToken()}` },
             body: JSON.stringify({ id: couponToDelete.id })});

             if (!res.ok) throw new Error(`Deletion failed with status ${res.status}`);
    } 
    catch (err) {
      toast.error(`Failed to delete coupon: ${err.message}`);
      setDeleting(false);
      return;
    }

    setCoupons((prev) => prev.filter((c) => c.id !== couponToDelete.id));
    toast.success("Coupon deleted successfully!");

    setDeleteDialogOpen(false);
    setCouponToDelete(null);
    setDeleting(false);
  }

  async function handleSave(coupon) {
    // editing existing coupon
    if (coupon.id) {
    try{
        const res = await fetch(changeAPIUrl+coupon.id, {
          method: "PUT",
          headers: { "Content-Type": "application/json", "Authorization": `Bearer ${getToken()}` },
          body: JSON.stringify(coupon),
        });

        if (!res.ok) {
          const errData = await res.json().catch(() => null);
          throw new Error(errData?.message || `Request failed with status ${res.status}`);
        }

        const data = await res.json();
        // const updated = data.coupon || data;    
        setCoupons((prev) => prev.map((c) => (c.id === coupon.id ? { ...c, ...coupon } : c)));
        toast.success("Coupon updated successfully!");
      return;

    }
    catch(err){}

 
    }

    // creating a new coupon
    // TODO: confirm POST /api/coupons exists and accepts this body shape
    try {
      const res = await fetch(changeAPIUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${getToken()}` },
        body: JSON.stringify(coupon),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => null);
        throw new Error(errData?.message || `Request failed with status ${res.status}`);
      }

      const data = await res.json();
      const created = data.coupon || data;
      setCoupons((prev) => [created, ...prev]);
      toast.success("Coupon created successfully!");
    } catch (err) {
      console.error("Create coupon failed:", err);
      toast.error(`Failed to create coupon: ${err.message}`);
    }
  }

  if (loading) {
    return (
      <div className="mr-4">
        <div className="flex items-center justify-between mb-4">
          <Skeleton className="h-8 w-44" />
          <Skeleton className="h-10 w-36 rounded-md" />
        </div>
        <TableSkeleton rows={6} columns={7} />
      </div>
    );
  }

  if (error) return <p className="text-red-500">Failed to load coupons: {error}</p>;

  return (
    <div className="mr-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold">Coupons</h1>
        <Button onClick={handleAddClick}>
          <Plus size={16} className="mr-1" /> Add Coupon
        </Button>
      </div>

      <div className="bg-white rounded-lg border">
        <CouponTable coupons={coupons} onEdit={handleEditClick} onDelete={handleDelete} />
      </div>

      <CouponForm
        open={formOpen}
        onOpenChange={setFormOpen}
        coupon={editingCoupon}
        onSave={handleSave}
      />

      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title="Delete Coupon"
        description={
          couponToDelete
            ? `Are you sure you want to delete "${couponToDelete.code}"? This action cannot be undone.`
            : ""
        }
        onConfirm={confirmDelete}
        loading={deleting}
      />
    </div>
  );
}