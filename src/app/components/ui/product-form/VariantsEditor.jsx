"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";

export default function VariantsEditor({ variants, onChange }) {
  function updateRow(index, field, value) {
    const next = [...variants];
    next[index] = { ...next[index], [field]: value };
    onChange(next);
  }

  function addRow() {
    onChange([...variants, { flavour: "", size: "", price: "", image: "" }]);
  }

  function removeRow(index) {
    onChange(variants.filter((_, i) => i !== index));
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium">Variants</label>
        <Button type="button" size="sm" variant="outline" onClick={addRow}>
          <Plus size={14} className="mr-1" /> Add Variant
        </Button>
      </div>

      {variants.map((v, i) => (
        <div key={i} className="border rounded-md p-3 space-y-2 relative">
          <Button
            type="button"
            size="icon"
            variant="ghost"
            className="absolute top-2 right-2"
            onClick={() => removeRow(i)}
          >
            <X size={16} className="text-red-500" />
          </Button>

          <div className="grid grid-cols-2 gap-2">
            <Input
              placeholder="Flavour"
              value={v.flavour}
              onChange={(e) => updateRow(i, "flavour", e.target.value)}
            />
            <Input
              placeholder="Size"
              value={v.size}
              onChange={(e) => updateRow(i, "size", e.target.value)}
            />
            <Input
              placeholder="Price"
              type="number"
              value={v.price}
              onChange={(e) => updateRow(i, "price", e.target.value)}
            />
            <Input
              placeholder="Image path"
              value={v.image}
              onChange={(e) => updateRow(i, "image", e.target.value)}
            />
          </div>
        </div>
      ))}
    </div>
  );
}