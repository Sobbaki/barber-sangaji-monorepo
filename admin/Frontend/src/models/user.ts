export interface User {
  id: string; 
  username: string;
  role: 'user' | 'admin';
  created_at: Date | string; 
}