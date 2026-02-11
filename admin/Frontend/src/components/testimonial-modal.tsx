import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { CloudUpload, Star, UserCircle } from "lucide-react";
import type { Testimonial } from "@/models/testimonial";

interface TestimonialModalProps {
  isOpen: boolean;
  onClose: () => void;
  testimonial?: Testimonial | null;
}

export default function TestimonialModal({ isOpen, onClose, testimonial }: TestimonialModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    profession: "",
    content: "",
    rating: 0,
  });
  const [photo, setPhoto] = useState<File | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (testimonial) {
      setFormData({
        name: testimonial.name,
        profession: testimonial.profession,
        content: testimonial.content,
        rating: testimonial.rating,
      });
    } else {
      setFormData({ name: "", profession: "", content: "", rating: 0 });
      setPhoto(null);
    }
  }, [testimonial, isOpen]);

  const createMutation = useMutation({
    mutationFn: (data: FormData) => apiRequest("POST", "testimonials", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
      toast({ title: "Success", description: "Testimonial created successfully" });
      onClose();
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to create testimonial", variant: "destructive" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: FormData }) =>
      apiRequest("PUT", `testimonials/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
      toast({ title: "Success", description: "Testimonial updated successfully" });
      onClose();
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to update testimonial", variant: "destructive" });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.profession.trim() || !formData.content.trim() || formData.rating === 0) {
      toast({ title: "Error", description: "Please fill in all required fields and select a rating", variant: "destructive" });
      return;
    }

    const data = new FormData();
    data.append("name", formData.name.trim());
    data.append("profession", formData.profession.trim());
    data.append("content", formData.content.trim());
    data.append("rating", formData.rating.toString());
    if (photo) {
      data.append("file", photo);
    }


    if (testimonial) {
      updateMutation.mutate({ id: testimonial.id, data });
    } else {
      createMutation.mutate(data);
    }

  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedPhoto = e.target.files?.[0];
    if (selectedPhoto) {
      if (selectedPhoto.size > 5 * 1024 * 1024) {
        toast({ title: "Error", description: "File size must be less than 5MB", variant: "destructive" });
        return;
      }

      const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
      if (!allowedTypes.includes(selectedPhoto.type)) {
        toast({ title: "Error", description: "Only JPG and PNG files are allowed", variant: "destructive" });
        return;
      }

      setPhoto(selectedPhoto);
    }
  };

  const handleStarClick = (rating: number) => setFormData({ ...formData, rating });

  const getRatingText = (rating: number) => ["", "Sangat Buruk", "Buruk", "Cukup", "Baik", "Sangat Baik"][rating] || "Pilih rating";

  const isLoading = createMutation.isPending || updateMutation.isPending;

  const currentPhoto = photo
    ? { name: photo.name, size: photo.size }
    : testimonial && testimonial.photo_path
      ? { name: "Foto Tersimpan", size: 1 }
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
      <DialogContent className="bg-barbershop-surface border-barbershop-border w-[95vw] max-w-[95vw] sm:max-w-xl md:max-w-2xl max-h-[85vh] flex flex-col p-0" aria-describedby="testimonial-form-description">
        <DialogHeader className="px-4 sm:px-6 pt-4 sm:pt-6 pb-3 sm:pb-4 border-b border-barbershop-border">
          <DialogTitle className="text-white text-base sm:text-lg">{testimonial ? "Edit Testimoni" : "Tambah Testimoni Baru"}</DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-3 sm:py-4">
          <p id="testimonial-form-description" className="sr-only">Form untuk menambah atau mengedit testimoni klien barbershop</p>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="name" className="text-gray-300">Nama Klien</Label>
                <Input id="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="bg-barbershop-bg border-barbershop-border text-white" placeholder="Nama lengkap klien" required />
              </div>
              <div>
                <Label htmlFor="profession" className="text-gray-300">Profesi</Label>
                <Input id="profession" value={formData.profession} onChange={(e) => setFormData({ ...formData, profession: e.target.value })} className="bg-barbershop-bg border-barbershop-border text-white" placeholder="Pekerjaan klien" required />
              </div>
            </div>

            <div>
              <Label htmlFor="content" className="text-gray-300">Isi Testimoni</Label>
              <Textarea id="content" value={formData.content} onChange={(e) => setFormData({ ...formData, content: e.target.value })} className="bg-barbershop-bg border-barbershop-border text-white resize-none" placeholder="Tulis testimoni klien..." rows={5} required />
            </div>

            <div>
              <Label className="text-gray-300">Rating Bintang</Label>
              <div className="flex items-center space-x-2 mt-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button key={star} type="button" onClick={() => handleStarClick(star)} className={`text-2xl transition-colors ${star <= formData.rating ? "text-yellow-400" : "text-gray-600"} hover:text-yellow-400`}>
                    <Star className="w-6 h-6 fill-current" />
                  </button>
                ))}
                <span className="text-gray-400 ml-3">{getRatingText(formData.rating)}</span>
              </div>
            </div>

            <div>
              <Label className="text-gray-300">Foto Klien</Label>
              <div className="border-2 border-dashed border-barbershop-border rounded-lg p-6 text-center hover:border-barbershop-red transition-colors">
                <div className="mb-3">
                  {currentPhoto ? <UserCircle className="mx-auto text-barbershop-red" size={48} /> : <UserCircle className="mx-auto text-gray-400" size={48} />}
                </div>
                <p className="text-gray-300 mb-2">{currentPhoto ? currentPhoto.name : "Upload foto klien"}</p>
                {currentPhoto && currentPhoto.size > 1 && <p className="text-sm text-gray-400 mb-2">{formatFileSize(currentPhoto.size)}</p>}
                <input type="file" onChange={handlePhotoChange} accept="image/*" className="hidden" id="photoInput" />
                <Button type="button" onClick={() => document.getElementById("photoInput")?.click()} className="mt-3 bg-barbershop-red hover:bg-barbershop-red-dark text-sm">
                  {currentPhoto && !photo ? "Ganti Foto" : "Pilih Foto"}
                </Button>
                {photo && (
                  <Button type="button" onClick={() => setPhoto(null)} className="text-red-400 hover:text-red-300 ml-4">
                    Hapus Pilihan
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 sm:px-6 py-3 sm:py-4 border-t border-barbershop-border bg-barbershop-surface">
          <form onSubmit={handleSubmit}>
            <div className="flex justify-end space-x-2 sm:space-x-3">
              <Button type="button" variant="outline" onClick={onClose} size="sm" className="border-gray-600 text-gray-300 hover:bg-gray-700">Batal</Button>
              <Button type="submit" disabled={isLoading || formData.rating === 0} className="bg-barbershop-red hover:bg-barbershop-red-dark">
                {isLoading ? "Menyimpan..." : "Simpan Testimoni"}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
