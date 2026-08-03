"use client";

import { useState, useEffect } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import StringListEditor from "./product-form/StringListEditor";
import ServingsEditor from "./product-form/ServingsEditor";
import VariantsEditor from "./product-form/VariantsEditor";
import FlavoursEditor from "./product-form/FlavoursEditor";
import FaqsEditor from "./product-form/FaqsEditor";
import ImageUploader from "./product-form/ImageUploader";


const emptyForm = {
  slug: "",
  name: "",
  sku: "",
  stockStatus: "In stock",
  status: "Published",
  categoryId: "",
  title: "",
  description: "",
  flipkartLink: "",
  amazonLink: "",
  cost2cost: "",
  featuredimg: "",
  images: [],
  price: "",
  discounted: "",
  servings: [],
  variants: [],
  flavours: [],
  keyBenefits: [],
  whychooseus: [],
  whoShouldUse: [],
  howToUse: [],
  whatToAvoid: [],
  safetyInformation: [],
  faqs: [],
  seo: {
    title: "",
    description: "",
    keywords: "",
    canonical: "",
    author: "",
    publisher: "",
    language: "English",
    robots: "index, follow",
    og: { title: "", type: "website", image: "" },
    twitter: { card: "summary_large_image", title: "" },
  },
};

// Required Fields
function validateForm(form) {
  const errors = [];

  if (!form.name.trim()) errors.push("Name is required");
  if (!form.slug.trim()) errors.push("Slug is required");
  if (!form.sku.trim()) errors.push("SKU is required");
  if (!form.categoryId) errors.push("Category ID is required");
  if (!form.title.trim()) errors.push("Title is required");
  if (!form.description.trim()) errors.push("Description is required");
  if (!form.price) errors.push("Base price is required");
  if (!form.discounted) errors.push("Discounted price is required");

  if (form.featuredimg.length === 0) errors.push("Featured image is required");
  if (form.images.length === 0) errors.push("At least one gallery image is required");
  if (form.servings.length === 0) errors.push("At least one serving is required");
  if (form.variants.length === 0) errors.push("At least one variant is required");
  if (form.flavours.length === 0) errors.push("At least one flavour is required");

  if (form.keyBenefits.length === 0) errors.push("At least one key benefit is required");
  if (form.whychooseus.length === 0) errors.push("At least one 'why choose us' point is required");
  if (form.whoShouldUse.length === 0) errors.push("At least one 'who should use' point is required");
  if (form.howToUse.length === 0) errors.push("At least one 'how to use' step is required");
  if (form.whatToAvoid.length === 0) errors.push("At least one 'what to avoid' point is required");
  if (form.safetyInformation.length === 0) errors.push("At least one safety note is required");

  if (form.faqs.length === 0) errors.push("At least one FAQ is required");

  if (!form.seo.title.trim()) errors.push("SEO title is required");
  if (!form.seo.description.trim()) errors.push("SEO description is required");
  if (!form.seo.keywords.trim()) errors.push("SEO keywords is required");
  if (!form.seo.canonical.trim()) errors.push("SEO canonical URL is required");
  if (!form.seo.author.trim()) errors.push("SEO author is required");
  if (!form.seo.publisher.trim()) errors.push("SEO publisher is required");
  return errors;
}




//converts your existing string-path data into the new object shape when a product is loaded for editing
function toImageEntries(paths = []) {
  return paths.map((p) => ({
    id: crypto.randomUUID(),
    url: p,
    file: null,
    previewUrl: p,
  }));
}




export default function ProductForm({ open, onOpenChange, product, onSave }) {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState([]);
useEffect(() => {
  if (product) {
    setForm({
      ...emptyForm,
      ...product,
      images: toImageEntries(product.images || []),
      featuredimg: product.featuredimg
        ? [{ id: crypto.randomUUID(), url: product.featuredimg, file: null, previewUrl: product.featuredimg }]
        : [],
      seo: { ...emptyForm.seo, ...product.seo },
    });
  } else {
    setForm({ ...emptyForm, images: [], featuredimg: [] });
  }
}, [product, open]);

  function set(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function setSeo(field, value) {
    setForm((prev) => ({ ...prev, seo: { ...prev.seo, [field]: value } }));
  }

  function setSeoNested(section, field, value) {
    setForm((prev) => ({
      ...prev,
      seo: { ...prev.seo, [section]: { ...prev.seo[section], [field]: value } },
    }));
  }

function handleSubmit(e) {
  e.preventDefault();

  const validationErrors = validateForm(form);
  if (validationErrors.length > 0) {
    setErrors(validationErrors);
    return;
  }
  setErrors([]);

  onSave({
    ...product,
    ...form,
    price: Number(form.price) || 0,
    discounted: Number(form.discounted) || 0,
    categoryId: Number(form.categoryId) || 0,
    images: form.images.map((img) => img.url || img.previewUrl),
    featuredimg: form.featuredimg[0]?.url || form.featuredimg[0]?.previewUrl || "",
  });
  onOpenChange(false);
}

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{product ? "Edit Product" : "Add Product"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Tabs defaultValue="basic">
            <TabsList className="flex flex-wrap h-auto">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="images">Images</TabsTrigger>
              <TabsTrigger value="pricing">Pricing & Variants</TabsTrigger>
              <TabsTrigger value="flavours">Flavours</TabsTrigger>
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="faqs">FAQs</TabsTrigger>
              <TabsTrigger value="seo">SEO</TabsTrigger>
            </TabsList>

            {/* BASIC INFO */}
            <TabsContent value="basic" className="space-y-3 pt-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label>Name</Label>
                  <Input value={form.name} onChange={(e) => set("name", e.target.value)} required />
                </div>
                <div className="space-y-1.5">
                  <Label>Slug</Label>
                  <Input value={form.slug} onChange={(e) => set("slug", e.target.value)} required />
                </div>
                <div className="space-y-1.5">
                  <Label>SKU</Label>
                  <Input value={form.sku} onChange={(e) => set("sku", e.target.value)} required/>
                </div>
                <div className="space-y-1.5">
                  <Label>Category ID</Label>
                  <Input type="number" value={form.categoryId} onChange={(e) => set("categoryId", e.target.value)} required/>
                </div>
                <div className="space-y-1.5">
                  <Label>Stock Status</Label>
                  <select
                    value={form.stockStatus}
                    onChange={(e) => set("stockStatus", e.target.value)}
                    className="w-full h-9 rounded-md border px-3 text-sm bg-transparent"
                  >
                    <option>In stock</option>
                    <option>Out of stock</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <Label>Status</Label>
                  <select
                    value={form.status}
                    onChange={(e) => set("status", e.target.value)}
                    className="w-full h-9 rounded-md border px-3 text-sm bg-transparent"
                  >
                    <option>Published</option>
                    <option>Pending</option>
                    <option>Draft</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <Label>Title</Label>
                <Input value={form.title} onChange={(e) => set("title", e.target.value)} required />
              </div>

              <div className="space-y-1.5">
                <Label>Description</Label>
                <Textarea value={form.description} onChange={(e) => set("description", e.target.value)} required />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1.5">
                  <Label>Flipkart Link</Label>
                  <Input value={form.flipkartLink} onChange={(e) => set("flipkartLink", e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label>Amazon Link</Label>
                  <Input value={form.amazonLink} onChange={(e) => set("amazonLink", e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label>Cost2Cost Link</Label>
                  <Input value={form.cost2cost} onChange={(e) => set("cost2cost", e.target.value)} />
                </div>
              </div>
            </TabsContent>

            {/* IMAGES */}
            <TabsContent value="images" className="space-y-5 pt-4">
              <ImageUploader
                label="Featured Image"
                images={form.featuredimg}
                onChange={(v) => set("featuredimg", v)}
                multiple={false}
              />
              <ImageUploader
                label="Gallery Images"
                images={form.images}
                onChange={(v) => set("images", v)}
                multiple={true}
              />
            </TabsContent>

            {/* PRICING & VARIANTS */}
            <TabsContent value="pricing" className="space-y-4 pt-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label>Base Price (₹)</Label>
                  <Input type="number" value={form.price} onChange={(e) => set("price", e.target.value)} required />
                </div>
                <div className="space-y-1.5">
                  <Label>Discounted Price (₹)</Label>
                  <Input type="number" value={form.discounted} onChange={(e) => set("discounted", e.target.value)} required/>
                </div>
              </div>

              <ServingsEditor servings={form.servings} onChange={(v) => set("servings", v)} />
              <VariantsEditor variants={form.variants} onChange={(v) => set("variants", v)} />
            </TabsContent>

            {/* FLAVOURS */}
            <TabsContent value="flavours" className="pt-4">
              <FlavoursEditor flavours={form.flavours} onChange={(v) => set("flavours", v)} />
            </TabsContent>

            {/* CONTENT LISTS */}
            <TabsContent value="content" className="space-y-5 pt-4">
              <StringListEditor label="Key Benefits" items={form.keyBenefits} onChange={(v) => set("keyBenefits", v)} />
              <StringListEditor label="Why Choose Us" items={form.whychooseus} onChange={(v) => set("whychooseus", v)} />
              <StringListEditor label="Who Should Use" items={form.whoShouldUse} onChange={(v) => set("whoShouldUse", v)} />
              <StringListEditor label="How To Use" items={form.howToUse} onChange={(v) => set("howToUse", v)} />
              <StringListEditor label="What To Avoid" items={form.whatToAvoid} onChange={(v) => set("whatToAvoid", v)} />
              <StringListEditor label="Safety Information" items={form.safetyInformation} onChange={(v) => set("safetyInformation", v)} />
            </TabsContent>

            {/* FAQS */}
            <TabsContent value="faqs" className="pt-4">
              <FaqsEditor faqs={form.faqs} onChange={(v) => set("faqs", v)} />
            </TabsContent>

            {/* SEO */}
            <TabsContent value="seo" className="space-y-3 pt-4">
              <div className="space-y-1.5">
                <Label>SEO Title</Label>
                <Input value={form.seo.title} onChange={(e) => setSeo("title", e.target.value)} required/>
              </div>
              <div className="space-y-1.5">
                <Label>SEO Description</Label>
                <Textarea value={form.seo.description} onChange={(e) => setSeo("description", e.target.value)} required/>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label>Keywords</Label>
                  <Input value={form.seo.keywords} onChange={(e) => setSeo("keywords", e.target.value)} required/>
                </div>
                <div className="space-y-1.5">
                  <Label>Canonical URL</Label>
                  <Input value={form.seo.canonical} onChange={(e) => setSeo("canonical", e.target.value)} required />
                </div>
                <div className="space-y-1.5">
                  <Label>Author</Label>
                  <Input value={form.seo.author} onChange={(e) => setSeo("author", e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label>Publisher</Label>
                  <Input value={form.seo.publisher} onChange={(e) => setSeo("publisher", e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label>Language</Label>
                  <Input value={form.seo.language} onChange={(e) => setSeo("language", e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label>Robots</Label>
                  <Input value={form.seo.robots} onChange={(e) => setSeo("robots", e.target.value)} />
                </div>
              </div>

              <div className="border rounded-md p-3 space-y-2">
                <Label className="text-sm font-semibold">Open Graph</Label>
                <Input placeholder="OG Title" value={form.seo.og.title} onChange={(e) => setSeoNested("og", "title", e.target.value)} />
                <Input placeholder="OG Type" value={form.seo.og.type} onChange={(e) => setSeoNested("og", "type", e.target.value)} />
                <Input placeholder="OG Image" value={form.seo.og.image} onChange={(e) => setSeoNested("og", "image", e.target.value)} />
              </div>

              <div className="border rounded-md p-3 space-y-2">
                <Label className="text-sm font-semibold">Twitter Card</Label>
                <Input placeholder="Card Type" value={form.seo.twitter.card} onChange={(e) => setSeoNested("twitter", "card", e.target.value)} />
                <Input placeholder="Twitter Title" value={form.seo.twitter.title} onChange={(e) => setSeoNested("twitter", "title", e.target.value)} />
              </div>
            </TabsContent>
          </Tabs>
          {errors.length > 0 && (
            <div className="border border-red-300 bg-red-50 text-red-700 rounded-md p-3 text-sm space-y-1">
              <p className="font-medium">Please fix the following:</p>
              <ul className="list-disc pl-5">
              {errors.map((err, i) => (
                <li key={i}>{err}</li>
              ))}
              </ul>
            </div>
          )}

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">{product ? "Save Changes" : "Add Product"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}