"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { X, Upload } from "lucide-react";

/**
 * Backend-proofing note:
 * Each image is stored as: { id, url, file, previewUrl }
 * - url: existing saved path/URL (from backend, if editing a real product)
 * - file: the raw File object if the user just picked a new image (null if unchanged)
 * - previewUrl: what we actually render <img src> from (blob URL for new files, url for existing)
 *
 * When you wire up the real API:
 *   - For each image where `file` is not null, upload that file (e.g. via FormData) and get back a server URL
 *   - For each image where `file` is null, `url` is already the final value — send it as-is
 *   - Then submit the final array of URLs to your product save endpoint
 */

function makeImageEntry(file) {
  return {
    id: crypto.randomUUID(),
    url: null,
    file,
    previewUrl: URL.createObjectURL(file),
  };
}

export default function ImageUploader({ label, images, onChange, multiple = true }) {
  const inputRef = useRef(null);

  function handleFilesSelected(e) {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const newEntries = files.map(makeImageEntry);

    if (multiple) {
      onChange([...images, ...newEntries]);
    } else {
      onChange([newEntries[0]]);
    }

    e.target.value = ""; // allow picking the same file again later
  }

  function removeImage(id) {
    const target = images.find((img) => img.id === id);
    if (target?.previewUrl && target.file) {
      URL.revokeObjectURL(target.previewUrl); // cleanup memory
    }
    onChange(images.filter((img) => img.id !== id));
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium">{label}</label>
        <Button type="button" size="sm" variant="outline" onClick={() => inputRef.current?.click()}>
          <Upload size={14} className="mr-1" /> {multiple ? "Add Images" : "Choose Image"}
        </Button>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple={multiple}
          className="hidden"
          onChange={handleFilesSelected}
        />
      </div>

      {images.length === 0 && (
        <p className="text-xs text-slate-400">No images added yet.</p>
      )}

      <div className="grid grid-cols-4 gap-3">
        {images.map((img) => (
          <div key={img.id} className="relative group border rounded-md overflow-hidden aspect-square">
            <img
              src={img.previewUrl || img.url}
              alt=""
              className="w-full h-full object-cover"
            />
            <button
              type="button"
              onClick={() => removeImage(img.id)}
              className="absolute top-1 right-1 bg-black/60 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X size={14} className="text-white" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}