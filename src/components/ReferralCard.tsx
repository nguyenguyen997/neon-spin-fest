import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, Check, Share2, QrCode, Users } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface ReferralCardProps {
  referralCode: string;
  referralCount: number;
  validReferrals: number;
  referralLink?: string;
}

export function ReferralCard({ 
  referralCode, 
  referralCount, 
  validReferrals,
  referralLink 
}: ReferralCardProps) {
  const [copied, setCopied] = useState(false);
  const link = referralLink || `${window.location.origin}/ref/${referralCode}`;

  const handleCopy = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast({
        title: "Đã sao chép!",
        description: `${type} đã được sao chép vào clipboard`,
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Lỗi",
        description: "Không thể sao chép",
        variant: "destructive",
      });
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "TikEvent - Vòng quay may mắn",
          text: `Tham gia TikEvent ngay để nhận xu miễn phí! Dùng mã mời: ${referralCode}`,
          url: link,
        });
      } catch (err) {
        handleCopy(link, "Link mời");
      }
    } else {
      handleCopy(link, "Link mời");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card variant="neon" className="overflow-hidden">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            Mời bạn bè
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Referral Code */}
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">Mã mời của bạn</label>
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Input
                  value={referralCode}
                  readOnly
                  className="text-center text-xl font-bold tracking-widest bg-muted/50 pr-12"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                  onClick={() => handleCopy(referralCode, "Mã mời")}
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>
          </div>

          {/* Referral Link */}
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">Link mời</label>
            <div className="flex gap-2">
              <Input
                value={link}
                readOnly
                className="text-sm bg-muted/50"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleCopy(link, "Link mời")}
              >
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button variant="neon" className="flex-1" onClick={handleShare}>
              <Share2 className="w-4 h-4" />
              Chia sẻ
            </Button>
            <Button variant="neon-outline" size="icon">
              <QrCode className="w-5 h-5" />
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
            <div className="text-center">
              <p className="text-3xl font-bold text-gradient-neon">{referralCount}</p>
              <p className="text-sm text-muted-foreground">Tổng lượt mời</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-secondary">{validReferrals}</p>
              <p className="text-sm text-muted-foreground">Lượt mời hợp lệ</p>
            </div>
          </div>

          {/* Info */}
          <div className="p-4 rounded-lg bg-muted/50 border border-border">
            <p className="text-sm text-muted-foreground">
              💡 Mời bạn bè đăng ký và quay ít nhất 1 lần trong 24h để lượt mời được tính là hợp lệ.
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
