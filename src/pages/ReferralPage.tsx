import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { ReferralCard } from "@/components/ReferralCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, CheckCircle2, Clock, XCircle } from "lucide-react";

// Demo data
const demoUser = {
  username: "TikToker123",
  coins: 1250,
  referralCode: "TIKTOK123",
  totalReferrals: 8,
  validReferrals: 3,
};

const referralList = [
  { id: "1", username: "user_abc", status: "valid", createdAt: "2024-01-15T10:30:00Z" },
  { id: "2", username: "tikfan_99", status: "valid", createdAt: "2024-01-14T15:20:00Z" },
  { id: "3", username: "newuser_01", status: "pending", createdAt: "2024-01-14T12:00:00Z" },
  { id: "4", username: "cool_dancer", status: "valid", createdAt: "2024-01-13T09:45:00Z" },
  { id: "5", username: "music_lover", status: "invalid", createdAt: "2024-01-12T18:30:00Z" },
];

export default function ReferralPage() {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "valid":
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case "pending":
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case "invalid":
        return <XCircle className="w-5 h-5 text-destructive" />;
      default:
        return null;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "valid":
        return "Hợp lệ";
      case "pending":
        return "Đang chờ";
      case "invalid":
        return "Không hợp lệ";
      default:
        return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "valid":
        return "text-green-500";
      case "pending":
        return "text-yellow-500";
      case "invalid":
        return "text-destructive";
      default:
        return "text-muted-foreground";
    }
  };

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
              Mời <span className="text-gradient-neon">bạn bè</span>
            </h1>
            <p className="text-muted-foreground">
              Chia sẻ link mời và nhận thêm lượt quay miễn phí
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Referral Card */}
            <ReferralCard
              referralCode={demoUser.referralCode}
              referralCount={demoUser.totalReferrals}
              validReferrals={demoUser.validReferrals}
            />

            {/* Referral List */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card variant="glass">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-secondary" />
                    Danh sách người được mời
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {referralList.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <Users className="w-12 h-12 mx-auto mb-3 opacity-50" />
                      <p>Chưa có người được mời</p>
                      <p className="text-sm">Chia sẻ link để mời bạn bè!</p>
                    </div>
                  ) : (
                    <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                      {referralList.map((referral, index) => (
                        <motion.div
                          key={referral.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="flex items-center justify-between p-4 rounded-lg bg-muted/50 border border-border hover:border-secondary/30 transition-all duration-200"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                              <span className="text-sm font-bold">
                                {referral.username.charAt(0).toUpperCase()}
                              </span>
                            </div>
                            <div>
                              <p className="font-medium">{referral.username}</p>
                              <p className="text-sm text-muted-foreground">
                                {formatDate(referral.createdAt)}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {getStatusIcon(referral.status)}
                            <span className={`text-sm font-medium ${getStatusColor(referral.status)}`}>
                              {getStatusText(referral.status)}
                            </span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Rules */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-8"
          >
            <Card variant="default" className="border-border">
              <CardHeader>
                <CardTitle className="text-lg">📜 Quy tắc mời bạn</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary">1.</span>
                    Chia sẻ mã mời hoặc link cho bạn bè
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">2.</span>
                    Bạn bè đăng ký tài khoản mới bằng mã mời của bạn
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">3.</span>
                    Bạn bè cần quay ít nhất 1 lần trong vòng 24 giờ
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">4.</span>
                    Lượt mời được tính là hợp lệ và bạn nhận thêm 1 lượt quay
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary">⚠️</span>
                    Lưu ý: Các tài khoản cùng IP hoặc thiết bị sẽ không được tính
                  </li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
