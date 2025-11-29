import { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { WithdrawForm } from "@/components/WithdrawForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { History, CheckCircle2, Clock, XCircle } from "lucide-react";

// Demo data
const demoUser = {
  username: "TikToker123",
  coins: 1250,
  validReferrals: 3,
};

const withdrawHistory = [
  { id: "1", amount: 500, status: "approved", requestedAt: "2024-01-10T10:30:00Z", processedAt: "2024-01-11T14:00:00Z" },
  { id: "2", amount: 300, status: "pending", requestedAt: "2024-01-14T15:20:00Z", processedAt: null },
  { id: "3", amount: 400, status: "rejected", requestedAt: "2024-01-05T12:00:00Z", processedAt: "2024-01-06T09:30:00Z" },
];

export default function WithdrawPage() {
  const [user, setUser] = useState(demoUser);
  const [history, setHistory] = useState(withdrawHistory);

  const handleWithdraw = async (amount: number) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Update user coins
    setUser((prev) => ({
      ...prev,
      coins: prev.coins - amount,
    }));

    // Add to history
    const newRecord = {
      id: Date.now().toString(),
      amount,
      status: "pending" as const,
      requestedAt: new Date().toISOString(),
      processedAt: null,
    };

    setHistory((prev) => [newRecord, ...prev]);
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case "pending":
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case "rejected":
        return <XCircle className="w-5 h-5 text-destructive" />;
      default:
        return null;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "approved":
        return "Đã duyệt";
      case "pending":
        return "Đang chờ";
      case "rejected":
        return "Từ chối";
      default:
        return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-500/20 text-green-500 border-green-500/30";
      case "pending":
        return "bg-yellow-500/20 text-yellow-500 border-yellow-500/30";
      case "rejected":
        return "bg-destructive/20 text-destructive border-destructive/30";
      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar 
        isLoggedIn={true} 
        username={user.username}
        coins={user.coins}
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
              Rút <span className="text-gradient-neon">Xu</span>
            </h1>
            <p className="text-muted-foreground">
              Đổi xu của bạn thành phần thưởng thật
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Withdraw Form */}
            <WithdrawForm
              coins={user.coins}
              validReferrals={user.validReferrals}
              onWithdraw={handleWithdraw}
            />

            {/* Withdraw History */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card variant="glass">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <History className="w-5 h-5 text-primary" />
                    Lịch sử rút xu
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {history.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <History className="w-12 h-12 mx-auto mb-3 opacity-50" />
                      <p>Chưa có lịch sử rút xu</p>
                    </div>
                  ) : (
                    <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                      {history.map((record, index) => (
                        <motion.div
                          key={record.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="p-4 rounded-lg bg-muted/50 border border-border hover:border-primary/30 transition-all duration-200"
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                              {getStatusIcon(record.status)}
                              <span className={`text-sm font-medium px-2 py-1 rounded-full border ${getStatusColor(record.status)}`}>
                                {getStatusText(record.status)}
                              </span>
                            </div>
                            <p className="text-xl font-bold text-primary">
                              {record.amount.toLocaleString()} Xu
                            </p>
                          </div>
                          <div className="text-sm text-muted-foreground space-y-1">
                            <p>Yêu cầu: {formatDate(record.requestedAt)}</p>
                            {record.processedAt && (
                              <p>Xử lý: {formatDate(record.processedAt)}</p>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}
