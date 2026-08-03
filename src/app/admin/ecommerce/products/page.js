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

  function handleSave(product) {
    if (product.id) {
      // editing existing
      setProducts((prev) => prev.map((p) => (p.id === product.id ? product : p)));
    } else {
      // new product
      const newProduct = {
        ...product,
        id: Date.now(),
        createdAt: new Date().toISOString().slice(0, 10),
      };
      setProducts((prev) => [newProduct, ...prev]);
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