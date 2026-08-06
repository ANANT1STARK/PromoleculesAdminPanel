"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import ProductTable from "@/app/components/ui/ProductTable";
import ProductForm from "@/app/components/ui/ProductForm";
import DeleteConfirmDialog from "@/app/components/ui/DeleteConfirmDialog";
import TableSkeleton from "@/app/components/ui/TableSkeleton";
import { Skeleton } from "@/components/ui/skeleton";


export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);  
  const [productToDelete, setProductToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch(process.env.NEXT_PUBLIC_API_URL);

        if (!res.ok) {
          throw new Error(`Request failed with status ${res.status}`);
        }

        const data = await res.json();
        // your GET response is shaped as { success, count, products: [...] }
        setProducts(data.products || []);
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  function handleAddClick() {
    setEditingProduct(null);
    setFormOpen(true);
  }

  function handleEditClick(product) {
    setEditingProduct(product);
    setFormOpen(true);
  }



  function handleDelete(product) {
  setProductToDelete(product);
  setDeleteDialogOpen(true);
  }



  async function confirmDelete() {
  if (!productToDelete) return;

  setDeleting(true);

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}${productToDelete.id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!res.ok) {
      const errData = await res.json().catch(() => null);
      throw new Error(
        errData?.message || `Deletion failed with status ${res.status}`
      );
    }

    setProducts((prev) =>
      prev.filter((p) => p.id !== productToDelete.id)
    );

    toast.success("Product deleted successfully!");

    setDeleteDialogOpen(false);
    setProductToDelete(null);
  } catch (err) {
    console.error(err);

    toast.error(`Failed to delete product: ${err.message}`);
  } finally {
    setDeleting(false);
  }
}

  async function handleSave(product) {
    if (product.id) {
      const {
        id,
        createdAt,
        updatedAt,
        category,   // stripped — categoryId is the actual FK
        reviews,    // stripped — read-only, never sent back
        variants,
        servings,
        faqs,
        ...scalarFields
      } = product;

      const bodyWithoutId = {
        ...scalarFields,
        categoryId: Number(scalarFields.categoryId),
        // send plain arrays — the backend's own faqs.map()/variants.map()
        // handles shaping these for Prisma, so don't pre-wrap with { set: ... }
        ...(variants ? { variants } : {}),
        ...(servings ? { servings } : {}),
        ...(faqs ? { faqs } : {}),
      };

      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(bodyWithoutId),
        });

        if (!res.ok) {
          const errData = await res.json().catch(() => null);
          throw new Error(errData?.message || `Request failed with status ${res.status}`);
        }

        const data = await res.json();
        const updated = data.product || data;
        setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
        toast.success("Product updated successfully!");
      } catch (err) {
        console.error("Update product failed:", err);
        toast.error(`Failed to update product: ${err.message}`);
      }
      return;
    }

    // creating — unchanged, POST already sends the raw product object
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => null);
        throw new Error(errData?.message || `Request failed with status ${res.status}`);
      }

      const data = await res.json();
      const created = data.product || data;
      setProducts((prev) => [created, ...prev]);
      toast.success("Product created successfully!");
    } catch (err) {
      console.error("Create product failed:", err);
      toast.error(`Failed to create product: ${err.message}`);
    }
  }



if (loading) {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <Skeleton className="h-8 w-44" />
        <Skeleton className="h-10 w-36 rounded-md" />
      </div>

      <TableSkeleton
        rows={6}
        columns={7}
      />
    </div>
  );
}

  if (error) return <p className="text-red-500">Failed to load products: {error}</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold">Products</h1>
        <Button onClick={handleAddClick}>
          <Plus size={16} className="mr-1" /> Add Product
        </Button>
      </div>

      <div className="bg-white rounded-lg border">
        <ProductTable products={products} onEdit={handleEditClick} onDelete={handleDelete} />
      </div>

      <ProductForm
        open={formOpen}
        onOpenChange={setFormOpen}
        product={editingProduct}
        onSave={handleSave}
      />
      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title="Delete Product"
        description={
          productToDelete
            ? `Are you sure you want to delete "${productToDelete.name}"? This action cannot be undone.`
            : ""
        }
        onConfirm={confirmDelete}
        loading={deleting}
      />
    </div>
  );
}