import { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { SpinWheel } from "@/components/SpinWheel";
import { SpinHistory } from "@/components/SpinHistory";
import { StatsCard } from "@/components/StatsCard";
import { Coins, Gift, Zap } from "lucide-react";

// Demo data
const initialUser = {
  username: "TikToker123",
  coins: 1250,
  spins: 5,
};

const initialHistory = [
  { id: "1", amount: 20, createdAt: "2024-01-15T10:30:00Z" },
  { id: "2", amount: 5, createdAt: "2024-01-15T09:15:00Z" },
  { id: "3", amount: 50, createdAt: "2024-01-14T18:45:00Z" },
];

export default function SpinPage() {
  const [user, setUser] = useState(initialUser);
  const [history, setHistory] = useState(initialHistory);

  const handleSpin = (reward: number) => {
    setUser((prev) => ({
      ...prev,
      coins: prev.coins + reward,
      spins: prev.spins - 1,
    }));

    const newRecord = {
      id: Date.now().toString(),
      amount: reward,
      createdAt: new Date().toISOString(),
    };

    setHistory((prev) => [newRecord, ...prev]);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar 
        isLoggedIn={true} 
        username={user.username}
        coins={user.coins}
      />

      <main className="pt-24 pb-16 px-4">
        <div className="container mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl md:text-4xl font-black mb-2">
              Vòng quay <span className="text-gradient-neon">may mắn</span>
            </h1>
            <p className="text-muted-foreground">
              Quay để nhận xu và đổi quà hấp dẫn!
            </p>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto mb-12">
            <StatsCard
              icon={Coins}
              label="Số xu"
              value={user.coins.toLocaleString()}
              variant="pink"
              delay={0.1}
            />
            <StatsCard
              icon={Gift}
              label="Lượt quay"
              value={user.spins}
              variant="cyan"
              delay={0.2}
            />
            <StatsCard
              icon={Zap}
              label="Hôm nay"
              value={history.filter(h => {
                const today = new Date().toDateString();
                return new Date(h.createdAt).toDateString() === today;
              }).length}
              variant="mixed"
              delay={0.3}
            />
          </div>

          {/* Spin Wheel */}
          <div className="flex justify-center mb-16">
            <SpinWheel
              spinsLeft={user.spins}
              onSpin={handleSpin}
            />
          </div>

          {/* History */}
          <div className="max-w-lg mx-auto">
            <SpinHistory history={history} />
          </div>
        </div>
      </main>
    </div>
  );
}
