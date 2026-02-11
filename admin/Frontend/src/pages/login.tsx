import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { authService } from "@/lib/auth";
import { useLocation } from "wouter";
import { EyeOff, Eye, Scissors } from "lucide-react";

interface LoginProps {
  onLogin: () => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await authService.login({ username, password });
      toast({ title: "Berhasil", description: "Selamat datang kembali di Barber Sangaji!" });
      onLogin();
      setLocation("/");
    } catch (err: any) {
      toast({
        title: "Error",
        description: "Username atau kata sandi salah",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // Background menggunakan warna Charcoal gelap dari navbar gambar (#12141d)
    <div className="min-h-screen flex items-center justify-center bg-[#12141d] font-sans">
      <div className="max-w-md w-full mx-4 py-8">

        {/* Logo & Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <Scissors className="text-[#ff2e2e] w-8 h-8" />
            <h1 className="text-3xl font-black text-[#ff2e2e] uppercase tracking-tighter">
              BARBER SANGAJI
            </h1>
          </div>
          <h2 className="text-xl font-bold text-white uppercase tracking-widest">
            Admin Dashboard
          </h2>
          <p className="text-sm text-gray-400 mt-2">
            Silakan masuk untuk mengelola pesugihan
          </p>
        </div>

        <Card className="border-none shadow-2xl bg-[#1a1d26]">
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Input Username */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Username</label>
                <Input
                  type="text"
                  placeholder="Masukkan username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="h-12 border-none bg-[#12141d] text-white placeholder:text-gray-600 focus:ring-2 focus:ring-[#ff2e2e] transition-all"
                  required
                />
              </div>

              {/* Input Password */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Password</label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Masukkan kata sandi"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-12 border-none bg-[#12141d] text-white placeholder:text-gray-600 focus:ring-2 focus:ring-[#ff2e2e] transition-all pr-12"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-3 text-gray-500 hover:text-[#ff2e2e]"
                  >
                    {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                  </button>
                </div>
              </div>

              {/* Tombol Masuk - Menggunakan warna Merah khas Barber Sangaji (#ff2e2e) */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#ff2e2e] hover:bg-[#d41d1d] h-12 text-white font-black uppercase tracking-widest transition-all shadow-lg active:scale-95"
              >
                {isLoading ? "PROSES..." : "MASUK SEKARANG →"}
              </Button>

              {/* Divider & Socials */}
              <div className="relative py-4">
                <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-gray-800"></span></div>
                <div className="relative flex justify-center text-xs uppercase"><span className="bg-[#1a1d26] px-2 text-gray-500 tracking-tighter">Atau masuk dengan</span></div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <Button type="button" variant="outline" className="h-12 border-gray-800 bg-[#12141d] hover:bg-gray-800 transition-colors">
                  <img src="https://www.svgrepo.com/show/475647/facebook-color.svg" className="w-5 h-5" alt="FB" />
                </Button>
                <Button type="button" variant="outline" className="h-12 border-gray-800 bg-[#12141d] hover:bg-gray-800 transition-colors">
                  <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
                </Button>
                <Button type="button" variant="outline" className="h-12 border-gray-800 bg-[#12141d] hover:bg-gray-800 transition-colors">
                  <img src="https://www.svgrepo.com/show/511330/apple-173.svg" className="w-5 h-5 invert" alt="Apple" />
                </Button>
              </div>

              {/* Remember Me */}
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="remember" className="border-gray-700 data-[state=checked]:bg-[#ff2e2e] data-[state=checked]:border-[#ff2e2e]" />
                  <label htmlFor="remember" className="text-xs text-gray-400 font-medium cursor-pointer">Ingat saya</label>
                </div>
                <a href="#" className="text-xs font-bold text-[#ff2e2e] hover:underline uppercase tracking-tighter">Lupa Sandi?</a>
              </div>

            </form>
          </CardContent>
        </Card>

        {/* Footer */}
        <p className="text-[10px] text-center text-gray-600 uppercase tracking-[0.2em] mt-8">
          © {new Date().getFullYear()} Barber Sangaji - Professional Grooming Service
        </p>
      </div>
    </div>
  );
}