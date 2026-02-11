export interface Testimonial {
  id: string;
  name: string;
  profession: string;
  content: string;
  rating: number; 
  photo_path: string | null; 
  created_at: Date | string;
  created_by: string | null;
}
