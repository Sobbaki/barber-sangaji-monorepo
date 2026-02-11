export type ContentCategory = 'foto' | 'video';

export interface Content {
  id: string;
  title: string;
  description: string;
  category: ContentCategory;
  file_name: string;
  file_path: string; 
  file_size?: Number;
  thumbnail_name?: string;
  thumbnail_path?: string;
  created_at: Date | string;
  created_by: string | null; 
}

