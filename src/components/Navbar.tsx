import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { 
  Home, 
  Gift, 
  Users, 
  Wallet, 
  History, 
  Menu, 
  X,
  LogIn,
  LogOut,
  User
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavbarProps {
  isLoggedIn: boolean;
  onLogout?: () => void;
  username?: string;
  coins?: number;
}

const navItems = [
  { href: "/", label: "Trang chủ", icon: Home },
  { href: "/spin", label: "Vòng quay", icon: Gift },
  { href: "/referral", label: "Mời bạn", icon: Users },
  { href: "/withdraw", label: "Rút xu", icon: Wallet },
  { href: "/history", label: "Lịch sử", icon: History },
];

export function Navbar({ isLoggedIn, onLogout, username, coins = 0 }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-neon flex items-center justify-center shadow-[0_0_20px_hsl(343_100%_50%_/_0.4)] group-hover:shadow-[0_0_30px_hsl(343_100%_50%_/_0.6)] transition-all duration-300">
              <span className="text-xl font-black text-primary-foreground">T</span>
            </div>
            <span className="text-xl font-bold hidden sm:block">
              <span className="text-primary">Tik</span>
              <span className="text-secondary">Event</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-primary/20 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {isLoggedIn ? (
              <>
                {/* Coins Display */}
                <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-primary/30">
                  <span className="text-lg">🪙</span>
                  <span className="font-bold text-primary">{coins.toLocaleString()}</span>
                </div>

                {/* User Menu */}
                <div className="flex items-center gap-2">
                  <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg bg-muted">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-medium">{username}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={onLogout}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <LogOut className="w-5 h-5" />
                  </Button>
                </div>
              </>
            ) : (
              <Link to="/auth">
                <Button variant="neon" size="sm">
                  <LogIn className="w-4 h-4" />
                  Đăng nhập
                </Button>
              </Link>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-border/50"
          >
            <div className="container mx-auto px-4 py-4 space-y-2">
              {navItems.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200",
                      isActive
                        ? "bg-primary/20 text-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    )}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.label}
                  </Link>
                );
              })}

              {isLoggedIn && (
                <div className="flex items-center justify-between px-4 py-3 rounded-lg bg-card border border-primary/30 mt-4">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">🪙</span>
                    <span className="font-bold text-primary">{coins.toLocaleString()} Xu</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{username}</span>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
