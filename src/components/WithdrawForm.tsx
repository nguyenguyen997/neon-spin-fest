import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Wallet, AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface WithdrawFormProps {
  coins: number;
  validReferrals: number;
  minCoins?: number;
  minReferrals?: number;
  onWithdraw: (amount: number) => Promise<void>;
}

export function WithdrawForm({
  coins,
  validReferrals,
  minCoins = 300,
  minReferrals = 5,
  onWithdraw,
}: WithdrawFormProps) {
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const canWithdraw = coins >= minCoins && validReferrals >= minReferrals;
  const hasEnoughCoins = coins >= minCoins;
  const hasEnoughReferrals = validReferrals >= minReferrals;

  const handleWithdraw = async () => {
    const withdrawAmount = parseInt(amount);
    
    if (isNaN(withdrawAmount) || withdrawAmount <= 0) {
      toast({
        title: "Lỗi",
        description: "Vui lòng nhập số xu hợp lệ",
        variant: "destructive",
      });
      return;
    }

    if (withdrawAmount > coins) {
      toast({
        title: "Lỗi",
        description: "Số xu rút không được vượt quá số dư",
        variant: "destructive",
      });
      return;
    }

    if (withdrawAmount < minCoins) {
      toast({
        title: "Lỗi",
        description: `Số xu rút tối thiểu là ${minCoins}`,
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      await onWithdraw(withdrawAmount);
      setAmount("");
      toast({
        title: "Thành công!",
        description: "Yêu cầu rút xu đã được gửi. Vui lòng đợi admin xử lý.",
      });
    } catch (error) {
      toast({
        title: "Lỗi",
        description: "Có lỗi xảy ra. Vui lòng thử lại.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card variant="neon-cyan">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="w-5 h-5 text-secondary" />
            Rút Xu
          </CardTitle>
          <CardDescription>
            Đổi xu của bạn thành phần thưởng thật
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Current Balance */}
          <div className="p-6 rounded-xl bg-gradient-to-br from-secondary/20 to-primary/20 border border-secondary/30 text-center">
            <p className="text-sm text-muted-foreground mb-1">Số dư hiện tại</p>
            <p className="text-4xl font-black text-gradient-neon">{coins.toLocaleString()}</p>
            <p className="text-lg text-muted-foreground">Xu</p>
          </div>

          {/* Requirements */}
          <div className="space-y-3">
            <p className="text-sm font-medium text-muted-foreground">Điều kiện rút xu:</p>
            
            <div className={`flex items-center gap-3 p-3 rounded-lg border ${hasEnoughCoins ? 'bg-green-500/10 border-green-500/30' : 'bg-destructive/10 border-destructive/30'}`}>
              {hasEnoughCoins ? (
                <CheckCircle2 className="w-5 h-5 text-green-500" />
              ) : (
                <AlertCircle className="w-5 h-5 text-destructive" />
              )}
              <span className="text-sm">
                Tối thiểu {minCoins} xu ({coins}/{minCoins})
              </span>
            </div>

            <div className={`flex items-center gap-3 p-3 rounded-lg border ${hasEnoughReferrals ? 'bg-green-500/10 border-green-500/30' : 'bg-destructive/10 border-destructive/30'}`}>
              {hasEnoughReferrals ? (
                <CheckCircle2 className="w-5 h-5 text-green-500" />
              ) : (
                <AlertCircle className="w-5 h-5 text-destructive" />
              )}
              <span className="text-sm">
                Tối thiểu {minReferrals} lượt mời hợp lệ ({validReferrals}/{minReferrals})
              </span>
            </div>
          </div>

          {/* Withdraw Form */}
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">Số xu muốn rút</label>
              <Input
                type="number"
                placeholder={`Tối thiểu ${minCoins} xu`}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                disabled={!canWithdraw}
                className="text-lg"
              />
            </div>

            <Button
              variant="neon-cyan"
              size="lg"
              className="w-full"
              disabled={!canWithdraw || isLoading}
              onClick={handleWithdraw}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Đang xử lý...
                </>
              ) : (
                <>
                  <Wallet className="w-4 h-4" />
                  Yêu cầu rút xu
                </>
              )}
            </Button>
          </div>

          {/* Info */}
          <div className="p-4 rounded-lg bg-muted/50 border border-border">
            <p className="text-sm text-muted-foreground">
              ⏰ Yêu cầu rút xu sẽ được admin xử lý trong vòng 24-48 giờ làm việc.
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
