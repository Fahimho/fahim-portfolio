import { useState } from "react";
import { Upload, X, Loader } from "lucide-react";
import { uploadImage, deleteImage } from "../../lib/uploadImage";

export default function ImageUpload({
  value,
  onChange,
  label = "Image",
  hint = "",
  folder = "general",
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleFile = async (file) => {
    if (!file) return;
    setUploading(true);
    setError("");

    try {
      // Pass current value so old file gets deleted after successful upload
      const url = await uploadImage(file, folder, value);
      onChange(url);
    } catch (err) {
      setError(err.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleInputChange = (e) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const handleRemove = async () => {
    const oldValue = value;
    onChange("");
    // Delete the file from storage
    await deleteImage(oldValue);
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium theme-heading">{label}</label>
      {hint && <p className="text-xs theme-muted">{hint}</p>}

      {value ? (
        <div className="relative inline-block">
          <img
            src={value}
            alt="Preview"
            className="rounded-lg"
            style={{
              maxWidth: "200px",
              maxHeight: "200px",
              border: "1px solid var(--border)",
            }}
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center"
            style={{
              backgroundColor: "#ef4444",
              color: "white",
            }}
            title="Remove image"
          >
            <X size={12} />
          </button>

          {/* Replace button */}
          <label
            className="mt-3 block text-xs cursor-pointer underline"
            style={{ color: "var(--accent)" }}
          >
            Replace image
            <input
              type="file"
              accept="image/*"
              onChange={handleInputChange}
              className="hidden"
              disabled={uploading}
            />
          </label>
        </div>
      ) : (
        <label
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          className="flex flex-col items-center justify-center gap-2 py-8 px-4 rounded-lg cursor-pointer"
          style={{
            backgroundColor: "var(--bg-card)",
            border: "2px dashed var(--border)",
          }}
        >
          {uploading ? (
            <>
              <Loader
                size={24}
                className="animate-spin"
                style={{ color: "var(--accent)" }}
              />
              <p className="text-xs theme-muted">Uploading...</p>
            </>
          ) : (
            <>
              <Upload size={24} style={{ color: "var(--accent)" }} />
              <p className="text-xs theme-body">
                Click to upload or drag an image here
              </p>
              <p className="text-xs theme-muted">PNG, JPG, GIF, WebP</p>
            </>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleInputChange}
            className="hidden"
            disabled={uploading}
          />
        </label>
      )}

      {/* Manual URL field */}
      <input
        type="url"
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder="…or paste an image URL"
        className="w-full px-3 py-2 rounded-lg text-xs outline-none"
        style={{
          backgroundColor: "var(--bg-card)",
          color: "var(--text-heading)",
          border: "1px solid var(--border)",
        }}
      />

      {error && (
        <p className="text-xs" style={{ color: "#ef4444" }}>
          ❌ {error}
        </p>
      )}
    </div>
  );
}