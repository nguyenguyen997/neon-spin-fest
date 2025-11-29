import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  variant?: "pink" | "cyan" | "mixed";
  delay?: number;
}

export function StatsCard({ icon: Icon, label, value, variant = "pink", delay = 0 }: StatsCardProps) {
  const variants = {
    pink: {
      iconBg: "bg-primary/20",
      iconColor: "text-primary",
      glow: "hover:shadow-[0_0_30px_hsl(343_100%_50%_/_0.3)]",
    },
    cyan: {
      iconBg: "bg-secondary/20",
      iconColor: "text-secondary",
      glow: "hover:shadow-[0_0_30px_hsl(176_100%_46%_/_0.3)]",
    },
    mixed: {
      iconBg: "bg-gradient-to-br from-primary/20 to-secondary/20",
      iconColor: "text-gradient-neon",
      glow: "hover:shadow-[0_0_30px_hsl(343_100%_50%_/_0.2),_0_0_30px_hsl(176_100%_46%_/_0.2)]",
    },
  };

  const style = variants[variant];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
    >
      <Card
        variant="interactive"
        className={cn(
          "p-5 hover:scale-[1.02] transition-all duration-300",
          style.glow
        )}
      >
        <div className="flex items-center gap-4">
          <div className={cn("p-3 rounded-xl", style.iconBg)}>
            <Icon className={cn("w-6 h-6", style.iconColor)} />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">{label}</p>
            <p className="text-2xl font-bold">{value}</p>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
