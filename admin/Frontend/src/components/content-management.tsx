import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import {
  Plus,
  Edit,
  Trash2,
  Image as ImageIcon,
  Video,
  Search,
  Play,
  X,
  Trash,
} from "lucide-react";
import ContentModal from "./content-modal";
import type { Content } from "@/models/content";

export default function ContentManagement() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingContent, setEditingContent] = useState<Content | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [isVideoDialogOpen, setIsVideoDialogOpen] = useState(false);
  const [currentVideoUrl, setCurrentVideoUrl] = useState("");

  // State untuk Photo Preview Dialog
  const [isPhotoDialogOpen, setIsPhotoDialogOpen] = useState(false);
  const [currentPhotoUrl, setCurrentPhotoUrl] = useState("");
  const [currentPhotoTitle, setCurrentPhotoTitle] = useState("");

  // State baru untuk Dialog Konfirmasi Hapus
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [contentIdToDelete, setContentIdToDelete] = useState<string | null>(null);

  // State untuk Description Preview Dialog
  const [isDescDialogOpen, setIsDescDialogOpen] = useState(false);
  const [currentDesc, setCurrentDesc] = useState({ title: "", description: "" });

  const { toast } = useToast();

  const { data: content = [], isLoading } = useQuery<Content[]>({
    queryKey: ["content"],
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => apiRequest("DELETE", `content/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["content"] });
      toast({
        title: "Success",
        description: "Content deleted successfully",
      });
      setIsDeleteDialogOpen(false); // Tutup dialog setelah berhasil
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete content",
        variant: "destructive",
      });
    },
  });

  const handleEdit = (item: Content) => {
    setEditingContent(item);
    setIsModalOpen(true);
  };

  // Fungsi untuk memicu dialog kustom
  const handleDeleteClick = (id: string) => {
    setContentIdToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  // Fungsi eksekusi hapus
  const confirmDelete = () => {
    if (contentIdToDelete) {
      deleteMutation.mutate(contentIdToDelete);
    }
  };

  const handleAddNew = () => {
    setEditingContent(null);
    setIsModalOpen(true);
  };

  const handleVideoClick = (url: string) => {
    setCurrentVideoUrl(url);
    setIsVideoDialogOpen(true);
  };

  const handlePhotoClick = (url: string, title: string) => {
    setCurrentPhotoUrl(url);
    setCurrentPhotoTitle(title);
    setIsPhotoDialogOpen(true);
  };

  const handleDescClick = (title: string, description: string) => {
    setCurrentDesc({ title, description });
    setIsDescDialogOpen(true);
  };

  const filteredContent = content.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !categoryFilter || item.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const stats = {
    total: content.length,
    photos: content.filter((item) => item.category === "foto").length,
    videos: content.filter((item) => item.category === "video").length,
  };

  return (
    <div className="overflow-x-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">
            Manajemen Konten
          </h2>
          <p className="text-gray-400">
            Kelola video dan foto hasil potong rambut
          </p>
        </div>
        <Button
          onClick={handleAddNew}
          className="mt-4 sm:mt-0 bg-barbershop-red hover:bg-barbershop-red-dark"
        >
          <Plus className="mr-2" size={16} />
          Tambah Konten
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6 mb-4 sm:mb-6">
        <Card className="bg-barbershop-surface border-barbershop-border">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mr-4">
                <ImageIcon className="text-white" size={24} />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{stats.total}</p>
                <p className="text-gray-400 text-sm">Total Konten</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-barbershop-surface border-barbershop-border">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mr-4">
                <ImageIcon className="text-white" size={24} />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{stats.photos}</p>
                <p className="text-gray-400 text-sm">Foto</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-barbershop-surface border-barbershop-border">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mr-4">
                <Video className="text-white" size={24} />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{stats.videos}</p>
                <p className="text-gray-400 text-sm">Video</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Content Table */}
      <Card className="bg-barbershop-surface border-barbershop-border">
        <CardContent className="p-0">
          <div className="px-3 sm:px-6 py-3 sm:py-4 border-b border-barbershop-border">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <h3 className="text-lg font-semibold text-white">
                Daftar Konten
              </h3>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:space-x-3">
                <Select
                  value={categoryFilter || "all"}
                  onValueChange={(value) =>
                    setCategoryFilter(value === "all" ? "" : value)
                  }
                >
                  <SelectTrigger className="w-full sm:w-40 bg-barbershop-bg border-barbershop-border text-white">
                    <SelectValue placeholder="Semua Kategori" />
                  </SelectTrigger>
                  <SelectContent className="bg-barbershop-surface border-barbershop-border text-white">
                    <SelectItem value="all">Semua Kategori</SelectItem>
                    <SelectItem value="foto">Foto</SelectItem>
                    <SelectItem value="video">Video</SelectItem>
                  </SelectContent>
                </Select>
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Cari konten..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-barbershop-bg border-barbershop-border text-white"
                  />
                  <Search
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={16}
                  />
                </div>
              </div>
            </div>
          </div>

          {isLoading ? (
            <div className="p-6 text-center text-gray-400">Loading...</div>
          ) : filteredContent.length === 0 ? (
            <div className="p-6 text-center text-gray-400">
              No content found
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-barbershop-bg hidden sm:table-header-group">
                  <tr>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Konten
                    </th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Kategori
                    </th>
                    <th className="hidden md:table-cell px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Tanggal
                    </th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-barbershop-border">
                  {filteredContent.map((item) => (
                    <tr key={item.id} className="flex flex-col sm:table-row border-b sm:border-b-0 border-barbershop-border">
                      <td className="px-3 sm:px-6 py-3 sm:py-4">
                        <div className="flex items-center">
                          {item.file_path && (
                            <div className="relative w-12 h-12 mr-4">
                              {item.category === "video" ? (
                                <div
                                  className="relative w-12 h-12 rounded-lg overflow-hidden cursor-pointer group"
                                  onClick={() =>
                                    handleVideoClick(item.file_path)
                                  }
                                >
                                  {/* Tampilkan thumbnail jika ada, fallback ke video */}
                                  {item.thumbnail_path ? (
                                    <img
                                      src={item.thumbnail_path}
                                      alt={item.title}
                                      className="w-full h-full object-cover"
                                    />
                                  ) : (
                                    <video
                                      src={item.file_path}
                                      className="w-full h-full object-cover"
                                    />
                                  )}
                                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center group-hover:bg-black/70 transition-colors">
                                    <Play className="text-white" size={20} />
                                  </div>
                                </div>
                              ) : (
                                <div
                                  className="relative w-12 h-12 rounded-lg overflow-hidden cursor-pointer group"
                                  onClick={() => handlePhotoClick(item.file_path, item.title)}
                                >
                                  <img
                                    src={item.file_path}
                                    alt={item.title}
                                    className="w-full h-full object-cover"
                                  />
                                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                                    <Search className="text-white opacity-0 group-hover:opacity-100 transition-opacity" size={16} />
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium text-white truncate" title={item.title}>
                              {item.title}
                            </p>
                            <p
                              className="text-sm text-gray-400 truncate max-w-[150px] sm:max-w-[250px] md:max-w-[350px] cursor-pointer hover:text-gray-300 hover:underline"
                              title="Klik untuk lihat deskripsi lengkap"
                              onClick={() => handleDescClick(item.title, item.description)}
                            >
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 sm:px-6 py-1 sm:py-4 hidden sm:table-cell">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${item.category === "foto"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-purple-100 text-purple-800"
                            }`}
                        >
                          {item.category === "foto" ? (
                            <ImageIcon className="mr-1" size={12} />
                          ) : (
                            <Video className="mr-1" size={12} />
                          )}
                          {item.category}
                        </span>
                      </td>
                      <td className="hidden md:table-cell px-3 sm:px-6 py-1 sm:py-4 text-sm text-gray-400">
                        {new Date(item.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-3 sm:px-6 py-2 sm:py-4">
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(item)}
                            className="text-blue-400 hover:text-blue-300 p-1"
                          >
                            <Edit size={16} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteClick(item.id)} // Menggunakan fungsi baru
                            className="text-red-400 hover:text-red-300 p-1"
                            disabled={deleteMutation.isPending}
                          >
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Form Modal */}
      <ContentModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingContent(null);
        }}
        content={editingContent}
      />

      {/* Video Player Dialog */}
      <Dialog open={isVideoDialogOpen} onOpenChange={setIsVideoDialogOpen}>
        <DialogContent className="w-[95vw] max-w-[95vw] sm:max-w-3xl bg-barbershop-surface border-barbershop-border p-0 overflow-hidden">
          <DialogHeader className="px-4 sm:px-6 pt-3 sm:pt-4 pb-2 sm:pb-3 border-b border-barbershop-border flex flex-row items-center justify-between">
            <DialogTitle className="text-white text-sm sm:text-base">Video Preview</DialogTitle>
          </DialogHeader>
          <div className="w-full p-3 sm:p-6 bg-black flex justify-center items-center">
            <video
              src={currentVideoUrl}
              controls
              autoPlay
              className="w-full rounded-lg max-h-[50vh] sm:max-h-[60vh] object-contain"
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </DialogContent>
      </Dialog>

      {/* Photo Preview Dialog */}
      <Dialog open={isPhotoDialogOpen} onOpenChange={setIsPhotoDialogOpen}>
        <DialogContent className="w-[95vw] max-w-[95vw] sm:max-w-3xl bg-barbershop-surface border-barbershop-border p-0 overflow-hidden">
          <DialogHeader className="px-4 sm:px-6 pt-3 sm:pt-4 pb-2 sm:pb-3 border-b border-barbershop-border flex flex-row items-center justify-between">
            <DialogTitle className="text-white text-sm sm:text-base truncate max-w-[80%]">
              {currentPhotoTitle || "Photo Preview"}
            </DialogTitle>
          </DialogHeader>
          <div className="w-full p-3 sm:p-6 bg-black flex justify-center items-center">
            <img
              src={currentPhotoUrl}
              alt={currentPhotoTitle}
              className="w-full rounded-lg max-h-[50vh] sm:max-h-[70vh] object-contain"
            />
          </div>
        </DialogContent>
      </Dialog>

      {/* --- CUSTOM DELETE CONFIRMATION DIALOG (IDENTIK DENGAN GAMBAR) --- */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="w-[90vw] max-w-[90vw] sm:max-w-[380px] bg-white p-6 sm:p-8 rounded-[24px] sm:rounded-[32px] border-none flex flex-col items-center">
          <div className="relative mb-6">
            {/* Trash Icon Illustration */}
            <div className="bg-red-50 p-6 rounded-3xl">
              <div className="relative">
                <Trash className="w-14 h-14 text-red-500 fill-red-500" />
                <div className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></div>
              </div>
            </div>
            {/* Dekorasi Bintang/Sparkles */}
            <div className="absolute -top-2 -right-2 text-red-400 text-xl font-bold">✦</div>
            <div className="absolute top-1/2 -left-6 text-red-300 text-lg">✦</div>
            <div className="absolute -bottom-2 right-4 text-red-400 text-sm">●</div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-2">Delete Note?</h2>
          <p className="text-gray-400 text-center text-sm px-4 mb-8 leading-relaxed">
            Your note will be permanently deleted and cannot be recovered.
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
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? "..." : "Delete"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Description Preview Dialog */}
      <Dialog open={isDescDialogOpen} onOpenChange={setIsDescDialogOpen}>
        <DialogContent className="w-[95vw] max-w-[95vw] sm:max-w-lg bg-barbershop-surface border-barbershop-border p-0 overflow-hidden">
          <DialogHeader className="px-4 sm:px-6 pt-4 sm:pt-5 pb-3 border-b border-barbershop-border flex flex-row items-center justify-between">
            <DialogTitle className="text-white text-base sm:text-lg pr-8 break-words">
              {currentDesc.title}
            </DialogTitle>
          </DialogHeader>
          <div className="px-4 sm:px-6 py-4 sm:py-5 max-h-[60vh] overflow-y-auto">
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed whitespace-pre-wrap break-words">
              {currentDesc.description}
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}