import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { CloudUpload, FileText, ImageIcon, X } from "lucide-react";
import type { Content } from "@/models/content";

interface ContentModalProps {
  isOpen: boolean;
  onClose: () => void;
  content?: Content | null;
}

export default function ContentModal({
  isOpen,
  onClose,
  content,
}: ContentModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
  });
  const isCategorySelected = !!formData.category;
  const [file, setFile] = useState<File | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (content) {
      setFormData({
        title: content.title,
        description: content.description,
        category: content.category,
      });
      // Set existing thumbnail preview if available
      if (content.thumbnail_path) {
        setThumbnailPreview(content.thumbnail_path);
      }
    } else {
      setFormData({
        title: "",
        description: "",
        category: "",
      });
      setFile(null);
      setThumbnailFile(null);
      setThumbnailPreview(null);
    }
  }, [content, isOpen]);

  const createMutation = useMutation({
    mutationFn: (data: FormData) => apiRequest("POST", "content", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["content"] });
      toast({
        title: "Success",
        description: "Content created successfully",
      });
      onClose();
    },
    onError: (error) => {
      console.error("Create Content Error:", error);
      toast({
        title: "Error",
        description: "Failed to create content",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: FormData }) =>
      apiRequest("PUT", `content/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["content"] });
      toast({
        title: "Success",
        description: "Content updated successfully",
      });
      onClose();
    },
    onError: (error) => {
      console.error("Update Content Error:", error);
      toast({
        title: "Error",
        description: "Failed to update content",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.title.trim() ||
      !formData.description.trim() ||
      !formData.category
    ) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    if (!file && !content) {
      toast({
        title: "Error",
        description: "Please select a file",
        variant: "destructive",
      });
      return;
    }

    const data = new FormData();
    data.append("title", formData.title.trim());
    data.append("description", formData.description.trim());
    data.append("category", formData.category);

    if (file) {
      data.append("file", file);
    }

    // Append thumbnail jika ada
    if (thumbnailFile) {
      data.append("thumbnail", thumbnailFile);
    }

    if (content) {
      updateMutation.mutate({ id: content.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      const isVideo = formData.category === "video";
      const isImage = formData.category === "foto";

      if (isVideo) {
        const videoTypes = ["video/mp4"];
        if (!videoTypes.includes(selectedFile.type)) {
          toast({
            title: "Error",
            description: "Hanya file MP4 yang diizinkan untuk video",
            variant: "destructive",
          });
          return;
        }

        if (selectedFile.size > 500 * 1024 * 1024) {
          toast({
            title: "Error",
            description:
              "Ukuran file maksimal 500MB. Silakan unggah file yang lebih kecil.",
            variant: "destructive",
          });
          return;
        }
      } else if (isImage) {
        const imageTypes = ["image/jpeg", "image/png", "image/jpg"];
        if (!imageTypes.includes(selectedFile.type)) {
          toast({
            title: "Error",
            description: "Hanya file JPG dan PNG yang diizinkan untuk foto",
            variant: "destructive",
          });
          return;
        }

        if (selectedFile.size > 10 * 1024 * 1024) {
          toast({
            title: "Error",
            description: "Ukuran foto maksimal 10MB",
            variant: "destructive",
          });
          return;
        }
      }
      setFile(selectedFile);
    }
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      const imageTypes = ["image/jpeg", "image/png", "image/jpg"];
      if (!imageTypes.includes(selectedFile.type)) {
        toast({
          title: "Error",
          description: "Thumbnail harus berupa file JPG atau PNG",
          variant: "destructive",
        });
        return;
      }

      if (selectedFile.size > 5 * 1024 * 1024) {
        toast({
          title: "Error",
          description: "Ukuran thumbnail maksimal 5MB",
          variant: "destructive",
        });
        return;
      }

      setThumbnailFile(selectedFile);
      // Create preview URL
      const previewUrl = URL.createObjectURL(selectedFile);
      setThumbnailPreview(previewUrl);
    }
  };

  const removeThumbnail = () => {
    setThumbnailFile(null);
    if (thumbnailPreview && !content?.thumbnail_path) {
      URL.revokeObjectURL(thumbnailPreview);
    }
    setThumbnailPreview(null);
  };

  const isLoading = createMutation.isPending || updateMutation.isPending;

  const currentFile = file
    ? { name: file.name, size: file.size }
    : content && content.file_path
      ? {
        name: content.file_name || "File Tersimpan di Server",
        size: (content.file_size as number) || 1,
      }
      : null;

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="bg-barbershop-surface border-barbershop-border w-[95vw] max-w-[95vw] sm:max-w-xl md:max-w-2xl max-h-[85vh] flex flex-col p-0"
        aria-describedby="content-form-description"
      >
        <DialogHeader className="px-4 sm:px-6 pt-4 sm:pt-6 pb-3 sm:pb-4 border-b border-barbershop-border">
          <DialogTitle className="text-white text-base sm:text-lg">
            {content ? "Edit Konten" : "Tambah Konten Baru"}
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-3 sm:py-4">
          <p id="content-form-description" className="sr-only">
            Form untuk menambah atau mengedit konten foto dan video barbershop
          </p>
          <div className="space-y-4 sm:space-y-6">
            <div>
              <Label htmlFor="title" className="text-gray-300 text-sm">
                Judul Konten
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="bg-barbershop-bg border-barbershop-border text-white text-sm"
                placeholder="Masukkan judul konten"
                required
              />
            </div>

            <div>
              <Label htmlFor="description" className="text-gray-300 text-sm">
                Deskripsi
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="bg-barbershop-bg border-barbershop-border text-white resize-none text-sm"
                placeholder="Deskripsi konten..."
                rows={3}
                required
              />
            </div>

            <div>
              <Label htmlFor="category" className="text-gray-300 text-sm">
                Kategori
              </Label>
              <Select
                value={formData.category}
                onValueChange={(value) =>
                  setFormData({ ...formData, category: value })
                }
                disabled={!!content && !file}
              >
                <SelectTrigger className="bg-barbershop-bg border-barbershop-border text-white">
                  <SelectValue placeholder="Pilih kategori" />
                </SelectTrigger>
                <SelectContent className="bg-barbershop-surface border-barbershop-border">
                  <SelectItem value="foto">Foto</SelectItem>
                  <SelectItem value="video">Video</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* File Upload */}
            <div>
              <Label className="text-gray-300 text-sm">Upload File</Label>
              <div
                className={`border-2 border-dashed rounded-lg p-4 sm:p-8 text-center transition-colors 
                ${isCategorySelected
                    ? "border-barbershop-border hover:border-barbershop-red"
                    : "border-gray-700 bg-gray-900 cursor-not-allowed opacity-50"
                  }
                `}
              >
                <div className="mb-3 sm:mb-4">
                  {currentFile ? (
                    <FileText
                      className="mx-auto text-barbershop-red"
                      size={36}
                    />
                  ) : (
                    <CloudUpload className="mx-auto text-gray-400" size={36} />
                  )}
                </div>
                <p className="text-gray-300 mb-2 font-medium text-sm">
                  {currentFile
                    ? currentFile.name
                    : isCategorySelected
                      ? "Drag & drop file atau klik untuk pilih"
                      : "Pilih Kategori di Atas Dulu"}
                </p>
                {currentFile && (
                  <p className="text-xs text-gray-400 mb-2">
                    {currentFile.size === 1
                      ? "File Tersimpan (Tidak perlu diunggah ulang)"
                      : formatFileSize(currentFile.size)}
                  </p>
                )}
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept={
                    formData.category === "video"
                      ? "video/mp4"
                      : formData.category === "foto"
                        ? "image/jpeg, image/png, image/jpg"
                        : ""
                  }
                  className="hidden"
                  id="fileInput"
                  disabled={!isCategorySelected}
                />
                <Button
                  type="button"
                  onClick={() => document.getElementById("fileInput")?.click()}
                  disabled={!isCategorySelected}
                  size="sm"
                  className={`mt-3 sm:mt-4 
                  ${!isCategorySelected
                      ? "bg-gray-600 cursor-not-allowed opacity-70"
                      : "bg-barbershop-red hover:bg-barbershop-red-dark"
                    }
                  `}
                >
                  {currentFile && !file ? "Ganti File" : "Pilih File"}
                </Button>
                {file && (
                  <Button
                    type="button"
                    onClick={() => setFile(null)}
                    size="sm"
                    className="text-red-400 hover:text-red-300 ml-2 sm:ml-4"
                  >
                    Hapus
                  </Button>
                )}
              </div>

              {/* File Info Display */}
              {file && (
                <div className="mt-3 p-3 bg-barbershop-bg rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-white font-medium truncate">
                        {file.name}
                      </p>
                      <p className="text-xs text-gray-400">
                        {(file.size / (1024 * 1024)).toFixed(2)} MB
                      </p>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setFile(null)}
                      className="text-red-400 hover:text-red-300 flex-shrink-0 ml-2"
                    >
                      <X size={16} />
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Thumbnail Upload - Hanya muncul untuk kategori video */}
            {formData.category === "video" && (
              <div>
                <Label className="text-gray-300 text-sm">
                  Thumbnail Video (Opsional)
                </Label>
                <p className="text-xs text-gray-500 mb-2">
                  Gambar yang akan ditampilkan sebelum video diputar
                </p>

                {thumbnailPreview ? (
                  <div className="relative rounded-lg overflow-hidden bg-barbershop-bg">
                    <img
                      src={thumbnailPreview}
                      alt="Thumbnail preview"
                      className="w-full h-32 sm:h-40 object-cover"
                    />
                    <button
                      type="button"
                      onClick={removeThumbnail}
                      className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-1.5 rounded-full transition-colors"
                    >
                      <X size={16} />
                    </button>
                    <div className="absolute bottom-0 left-0 right-0 bg-black/60 px-3 py-2">
                      <p className="text-white text-xs truncate">
                        {thumbnailFile?.name || "Thumbnail tersimpan"}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div
                    className="border-2 border-dashed border-barbershop-border rounded-lg p-4 sm:p-6 text-center hover:border-barbershop-red transition-colors"
                  >
                    <ImageIcon className="mx-auto text-gray-400 mb-2" size={32} />
                    <p className="text-gray-400 text-sm">
                      Klik untuk pilih thumbnail
                    </p>
                    <p className="text-gray-500 text-xs mt-1 mb-3">
                      JPG, PNG (Max 5MB)
                    </p>
                    <Button
                      type="button"
                      onClick={() => document.getElementById("thumbnailInput")?.click()}
                      size="sm"
                      className="bg-barbershop-red hover:bg-barbershop-red-dark"
                    >
                      Pilih File
                    </Button>
                  </div>
                )}

                <input
                  type="file"
                  onChange={handleThumbnailChange}
                  accept="image/jpeg, image/png, image/jpg"
                  className="hidden"
                  id="thumbnailInput"
                />
              </div>
            )}

            {/* Video Preview for Edit Mode */}
            {content &&
              content.category === "video" &&
              content.file_path &&
              !file && (
                <div className="mt-4">
                  <Label className="text-gray-300 mb-2 block text-sm">
                    Preview Video
                  </Label>
                  <div className="bg-barbershop-bg rounded-lg overflow-hidden">
                    <video
                      src={content.file_path}
                      controls
                      className="w-full max-h-48 sm:max-h-64 object-contain"
                    >
                      Your browser does not support the video tag.
                    </video>
                  </div>
                  <p className="text-xs text-gray-400 mt-2">
                    Video saat ini: {content.file_name}
                  </p>
                </div>
              )}
          </div>
        </div>

        {/* Sticky Footer with Form Actions */}
        <div className="px-4 sm:px-6 py-3 sm:py-4 border-t border-barbershop-border bg-barbershop-surface">
          <form onSubmit={handleSubmit}>
            <div className="flex justify-end space-x-2 sm:space-x-3">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                size="sm"
                className="border-gray-600 text-gray-300 hover:bg-gray-700"
              >
                Batal
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                size="sm"
                className="bg-barbershop-red hover:bg-barbershop-red-dark"
              >
                {isLoading ? "Menyimpan..." : "Simpan Konten"}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
