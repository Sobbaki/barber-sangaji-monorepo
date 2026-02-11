import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog"; // Pastikan import Dialog
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import {
  Plus,
  Edit,
  Trash2,
  Star,
  TrendingUp,
  Award,
  Medal,
  Trash
} from "lucide-react";
import TestimonialModal from "./testimonial-modal";
import type { Testimonial } from "@/models/testimonial";

export default function TestimonialManagement() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // State untuk Custom Delete Dialog
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [idToDelete, setIdToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const { toast } = useToast();

  const fetchTestimonials = async () => {
    setIsLoading(true);
    try {
      const res = await apiRequest("GET", "testimonials");
      const data: Testimonial[] = await res.json();
      setTestimonials(data);
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Gagal memuat testimoni",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Fungsi untuk memicu dialog kustom
  const handleDeleteClick = (id: string) => {
    setIdToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  // Fungsi eksekusi hapus yang dipanggil dari modal kustom
  const confirmDelete = async () => {
    if (!idToDelete) return;
    setIsDeleting(true);
    try {
      await apiRequest("DELETE", `testimonials/${idToDelete}`);
      toast({
        title: "Success",
        description: "Testimonial deleted successfully",
      });
      setTestimonials((prev) => prev.filter((t) => t.id !== idToDelete));
      setIsDeleteDialogOpen(false);
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to delete testimonial",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
      setIdToDelete(null);
    }
  };

  const handleEdit = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial);
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setEditingTestimonial(null);
    setIsModalOpen(true);
  };

  const renderStars = (rating: number) =>
    Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-600"}`}
      />
    ));

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const stats = {
    total: testimonials.length,
    averageRating: testimonials.length > 0
      ? (testimonials.reduce((sum, t) => sum + (t.rating as number), 0) / testimonials.length).toFixed(1)
      : "0",
    thisMonth: testimonials.filter(t => {
      const now = new Date();
      const testimonialDate = new Date(t.created_at);
      return testimonialDate.getMonth() === now.getMonth() &&
        testimonialDate.getFullYear() === now.getFullYear();
    }).length,
    fiveStars: testimonials.filter(t => (t.rating as number) === 5).length,
  };

  return (
    <div className="overflow-x-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Manajemen Testimoni</h2>
          <p className="text-gray-400">Kelola testimoni dari klien</p>
        </div>
        <Button
          onClick={handleAddNew}
          className="mt-4 sm:mt-0 bg-barbershop-red hover:bg-barbershop-red-dark"
        >
          <Plus className="mr-2" size={16} />
          Tambah Testimoni
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6">
        <Card className="bg-barbershop-surface border-barbershop-border">
          <CardContent className="p-4 sm:p-6 flex items-center">
            <div className="w-12 h-12 bg-yellow-600 rounded-lg flex items-center justify-center mr-4">
              <Star className="text-white" size={24} />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{stats.total}</p>
              <p className="text-gray-400 text-sm">Total Testimoni</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-barbershop-surface border-barbershop-border">
          <CardContent className="p-4 sm:p-6 flex items-center">
            <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mr-4">
              <Award className="text-white" size={24} />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{stats.averageRating}</p>
              <p className="text-gray-400 text-sm">Rating Rata-rata</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-barbershop-surface border-barbershop-border">
          <CardContent className="p-4 sm:p-6 flex items-center">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mr-4">
              <TrendingUp className="text-white" size={24} />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">+{stats.thisMonth}</p>
              <p className="text-gray-400 text-sm">Bulan Ini</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-barbershop-surface border-barbershop-border">
          <CardContent className="p-4 sm:p-6 flex items-center">
            <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mr-4">
              <Medal className="text-white" size={24} />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{stats.fiveStars}</p>
              <p className="text-gray-400 text-sm">Rating 5 Bintang</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Testimonials Grid */}
      {isLoading ? (
        <div className="text-center text-gray-400 py-8">Loading...</div>
      ) : testimonials.length === 0 ? (
        <div className="text-center text-gray-400 py-8">No testimonials found</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="bg-barbershop-surface border-barbershop-border">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    {testimonial.photo_path ? (
                      <img
                        src={testimonial.photo_path}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover mr-3"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center mr-3">
                        <span className="text-white font-medium">
                          {testimonial.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                    <div>
                      <h4 className="text-white font-medium">{testimonial.name}</h4>
                      <p className="text-gray-400 text-sm">{testimonial.profession}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(testimonial)}
                      className="text-blue-400 hover:text-blue-300 p-1"
                    >
                      <Edit size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteClick(testimonial.id)}
                      className="text-red-400 hover:text-red-300 p-1"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center mb-3">
                  {renderStars(testimonial.rating as number)}
                  <span className="text-gray-400 text-sm ml-2">({(testimonial.rating as number).toFixed(1)})</span>
                </div>

                {/* Testimonial Text */}
                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                  "{testimonial.content}"
                </p>

                {/* Date */}
                <p className="text-xs text-gray-500">
                  {new Date(testimonial.created_at).toLocaleDateString('id-ID')}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Form Modal */}
      <TestimonialModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingTestimonial(null);
          fetchTestimonials();
        }}
        testimonial={editingTestimonial}
      />

      {/* --- CUSTOM DELETE CONFIRMATION DIALOG --- */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="w-[90vw] max-w-[90vw] sm:max-w-[380px] bg-white p-6 sm:p-8 rounded-[24px] sm:rounded-[32px] border-none flex flex-col items-center shadow-2xl">
          <div className="relative mb-6">
            {/* Trash Icon Illustration */}
            <div className="bg-red-50 p-6 rounded-3xl">
              <div className="relative">
                <Trash className="w-14 h-14 text-red-500 fill-red-500" />
                <div className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></div>
              </div>
            </div>
            {/* Dekorasi Sparkles */}
            <div className="absolute -top-2 -right-2 text-red-400 text-xl font-bold">✦</div>
            <div className="absolute top-1/2 -left-6 text-red-300 text-lg">✦</div>
            <div className="absolute -bottom-2 right-4 text-red-400 text-sm font-bold">●</div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-2">Delete Testimonial?</h2>
          <p className="text-gray-400 text-center text-sm px-4 mb-8 leading-relaxed">
            Your testimonial will be permanently deleted and cannot be recovered.
          </p>

          <div className="flex w-full gap-4 mt-2">
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
              className="flex-1 h-12 rounded-2xl border-red-100 text-red-500 hover:bg-red-50 hover:text-red-600 font-bold border-2"
            >
              Cancel
            </Button>
            <Button
              onClick={confirmDelete}
              className="flex-1 h-12 rounded-2xl bg-red-500 hover:bg-red-600 text-white font-bold shadow-lg shadow-red-200"
              disabled={isDeleting}
            >
              {isDeleting ? "..." : "Delete"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}