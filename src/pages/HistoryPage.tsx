import { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { History, Gift, Wallet, Users, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

// Demo data
const demoUser = {
  username: "TikToker123",
  coins: 1250,
};

type TabType = "all" | "spins" | "withdraws" | "referrals";

const allHistory = [
  { id: "1", type: "spin", amount: 20, description: "Quay vòng quay", createdAt: "2024-01-15T10:30:00Z" },
  { id: "2", type: "referral", amount: 1, description: "Mời thành công: user_abc", createdAt: "2024-01-15T09:00:00Z" },
  { id: "3", type: "withdraw", amount: -300, description: "Yêu cầu rút xu", createdAt: "2024-01-14T15:20:00Z" },
  { id: "4", type: "spin", amount: 50, description: "Quay vòng quay", createdAt: "2024-01-14T12:00:00Z" },
  { id: "5", type: "spin", amount: 5, description: "Quay vòng quay", createdAt: "2024-01-14T11:30:00Z" },
  { id: "6", type: "referral", amount: 1, description: "Mời thành công: tikfan_99", createdAt: "2024-01-13T18:00:00Z" },
  { id: "7", type: "spin", amount: 100, description: "Quay vòng quay - Jackpot!", createdAt: "2024-01-13T10:00:00Z" },
  { id: "8", type: "withdraw", amount: -500, description: "Rút xu thành công", createdAt: "2024-01-10T14:00:00Z" },
];

const tabs: { id: TabType; label: string; icon: typeof History }[] = [
  { id: "all", label: "Tất cả", icon: History },
  { id: "spins", label: "Quay", icon: Gift },
  { id: "withdraws", label: "Rút xu", icon: Wallet },
  { id: "referrals", label: "Mời", icon: Users },
];

export default function HistoryPage() {
  const [activeTab, setActiveTab] = useState<TabType>("all");

  const filteredHistory = allHistory.filter((item) => {
    if (activeTab === "all") return true;
    if (activeTab === "spins") return item.type === "spin";
    if (activeTab === "withdraws") return item.type === "withdraw";
    if (activeTab === "referrals") return item.type === "referral";
    return true;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "spin":
        return <Gift className="w-5 h-5" />;
      case "withdraw":
        return <Wallet className="w-5 h-5" />;
      case "referral":
        return <Users className="w-5 h-5" />;
      default:
        return <History className="w-5 h-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "spin":
        return "bg-primary/20 text-primary";
      case "withdraw":
        return "bg-secondary/20 text-secondary";
      case "referral":
        return "bg-accent/20 text-accent";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  // Calculate stats
  const totalSpins = allHistory.filter((h) => h.type === "spin").reduce((acc, h) => acc + h.amount, 0);
  const totalWithdrawn = Math.abs(allHistory.filter((h) => h.type === "withdraw").reduce((acc, h) => acc + h.amount, 0));
  const totalReferrals = allHistory.filter((h) => h.type === "referral").length;

  return (
    <div className="min-h-screen bg-background">
      <Navbar 
        isLoggedIn={true} 
        username={demoUser.username}
        coins={demoUser.coins}
      />

      <main className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl md:text-4xl font-black mb-2">
              Lịch sử <span className="text-gradient-neon">hoạt động</span>
            </h1>
            <p className="text-muted-foreground">
              Theo dõi tất cả hoạt động của bạn
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-3 gap-4 mb-8"
          >
            <Card variant="neon" className="text-center p-4">
              <Gift className="w-6 h-6 mx-auto mb-2 text-primary" />
              <p className="text-2xl font-bold">{totalSpins}</p>
              <p className="text-sm text-muted-foreground">Xu từ quay</p>
            </Card>
            <Card variant="neon-cyan" className="text-center p-4">
              <Wallet className="w-6 h-6 mx-auto mb-2 text-secondary" />
              <p className="text-2xl font-bold">{totalWithdrawn}</p>
              <p className="text-sm text-muted-foreground">Xu đã rút</p>
            </Card>
            <Card variant="default" className="text-center p-4 border-accent/30">
              <Users className="w-6 h-6 mx-auto mb-2 text-accent" />
              <p className="text-2xl font-bold">{totalReferrals}</p>
              <p className="text-sm text-muted-foreground">Lượt mời</p>
            </Card>
          </motion.div>

          {/* Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex gap-2 mb-6 overflow-x-auto pb-2"
          >
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? "neon" : "ghost"}
                size="sm"
                onClick={() => setActiveTab(tab.id)}
                className="flex-shrink-0"
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </Button>
            ))}
          </motion.div>

          {/* History List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card variant="glass">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Chi tiết hoạt động
                </CardTitle>
              </CardHeader>
              <CardContent>
                {filteredHistory.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <History className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p className="text-lg">Không có hoạt động nào</p>
                    <p className="text-sm">Hãy quay vòng quay hoặc mời bạn bè!</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {filteredHistory.map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.03 }}
                        className="flex items-center justify-between p-4 rounded-lg bg-muted/50 border border-border hover:border-primary/30 transition-all duration-200"
                      >
                        <div className="flex items-center gap-4">
                          <div className={cn("p-2 rounded-lg", getTypeColor(item.type))}>
                            {getTypeIcon(item.type)}
                          </div>
                          <div>
                            <p className="font-medium">{item.description}</p>
                            <p className="text-sm text-muted-foreground">
                              {formatDate(item.createdAt)}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={cn(
                            "text-xl font-bold",
                            item.amount >= 0 ? "text-green-500" : "text-destructive"
                          )}>
                            {item.amount >= 0 ? "+" : ""}{item.type === "referral" ? `${item.amount} lượt` : `${item.amount} Xu`}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
