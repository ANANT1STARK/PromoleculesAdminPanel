"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import ProductTable from "@/app/components/ui/ProductTable";
import ProductForm from "@/app/components/ui/ProductForm";
import initialProducts from "@/app/components/data/products.json";
 
export default function ProductsPage() {
  const [products, setProducts] = useState(initialProducts);
  const [formOpen, setFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  console.log(process.env.NEXT_PUBLIC_API_URL)
  function handleAddClick() {
    setEditingProduct(null);
    setFormOpen(true);
  }

  function handleEditClick(product) {
    setEditingProduct(product);
    setFormOpen(true);
  }

  function handleDelete(id) {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  }



async function handleSave(product) {
  if (product.id) {
    // editing — still local-only for now, no PUT endpoint wired yet
    setProducts((prev) => prev.map((p) => (p.id === product.id ? product : p)));
    return;
  }

  // creating — real POST request
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(errText || `Request failed with status ${res.status}`);
    }

    const created = await res.json();
    setProducts((prev) => [created, ...prev]);
  } catch (err) {
    alert(`Failed to create product: ${err.message}`);
  }
}

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold">Products</h1>
        <Button onClick={handleAddClick}>
          <Plus size={16} className="mr-1" /> Add Product
        </Button>
      </div>

      <div className="bg-white rounded-lg border">
        <ProductTable products={products} onEdit={handleEditClick} onDelete={handleDelete}  />
      </div>

      <ProductForm
        open={formOpen}
        onOpenChange={setFormOpen}
        product={editingProduct}
        onSave={handleSave}
      />
    </div>
  );
}