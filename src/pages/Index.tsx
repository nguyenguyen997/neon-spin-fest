import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { StatsCard } from "@/components/StatsCard";
import { Navbar } from "@/components/Navbar";
import { Coins, Gift, Users, Trophy, ArrowRight, Sparkles } from "lucide-react";

// Demo data - will be replaced with real data from Supabase
const demoUser = {
  isLoggedIn: true,
  username: "TikToker123",
  coins: 1250,
  spins: 5,
  validReferrals: 3,
  totalReferrals: 8,
};

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar 
        isLoggedIn={demoUser.isLoggedIn} 
        username={demoUser.username}
        coins={demoUser.coins}
      />

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 px-4 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-radial from-primary/10 via-transparent to-transparent" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[120px] animate-pulse animation-delay-1000" />

        <div className="container mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/30 text-primary text-sm font-medium mb-6"
            >
              <Sparkles className="w-4 h-4" />
              Sự kiện TikTok 2024
            </motion.div>

            {/* Main Title */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight">
              <span className="text-foreground">Quay & </span>
              <span className="text-gradient-neon">Nhận Thưởng</span>
              <br />
              <span className="text-foreground">Mỗi Ngày!</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Tham gia ngay để quay vòng quay may mắn, mời bạn bè và nhận xu miễn phí. 
              Đổi xu lấy quà hấp dẫn!
            </p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link to="/spin">
                <Button variant="neon" size="xl" className="group">
                  <Gift className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                  Bắt đầu quay ngay
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/referral">
                <Button variant="neon-outline" size="xl">
                  <Users className="w-5 h-5" />
                  Mời bạn bè
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Stats Cards */}
          {demoUser.isLoggedIn && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 max-w-4xl mx-auto">
              <StatsCard
                icon={Coins}
                label="Số xu"
                value={demoUser.coins.toLocaleString()}
                variant="pink"
                delay={0.5}
              />
              <StatsCard
                icon={Gift}
                label="Lượt quay"
                value={demoUser.spins}
                variant="cyan"
                delay={0.6}
              />
              <StatsCard
                icon={Users}
                label="Đã mời"
                value={demoUser.totalReferrals}
                variant="pink"
                delay={0.7}
              />
              <StatsCard
                icon={Trophy}
                label="Hợp lệ"
                value={demoUser.validReferrals}
                variant="cyan"
                delay={0.8}
              />
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Cách <span className="text-gradient-neon">kiếm xu</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              3 cách đơn giản để nhận xu và đổi quà hấp dẫn
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                icon: "🎰",
                title: "Quay vòng quay",
                description: "Mỗi lượt quay có cơ hội nhận từ 1 - 100 xu",
                color: "primary",
              },
              {
                icon: "👥",
                title: "Mời bạn bè",
                description: "Nhận thêm lượt quay khi bạn bè đăng ký và quay",
                color: "secondary",
              },
              {
                icon: "💰",
                title: "Rút xu",
                description: "Đổi xu lấy tiền mặt hoặc quà tặng giá trị",
                color: "primary",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`p-6 rounded-2xl bg-card border ${
                  feature.color === "primary" 
                    ? "border-primary/30 hover:shadow-[0_0_30px_hsl(343_100%_50%_/_0.2)]" 
                    : "border-secondary/30 hover:shadow-[0_0_30px_hsl(176_100%_46%_/_0.2)]"
                } transition-all duration-300 hover:scale-[1.02]`}
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="container mx-auto"
        >
          <div className="relative max-w-4xl mx-auto rounded-3xl overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-secondary opacity-90" />
            
            {/* Content */}
            <div className="relative z-10 p-8 md:p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-black text-primary-foreground mb-4">
                Sẵn sàng quay xu?
              </h2>
              <p className="text-lg text-primary-foreground/80 mb-8 max-w-xl mx-auto">
                Đăng ký ngay hôm nay và nhận 5 lượt quay miễn phí!
              </p>
              <Link to={demoUser.isLoggedIn ? "/spin" : "/auth"}>
                <Button 
                  variant="glass" 
                  size="xl"
                  className="bg-background/20 text-primary-foreground border-primary-foreground/30 hover:bg-background/30"
                >
                  {demoUser.isLoggedIn ? "Quay ngay" : "Đăng ký miễn phí"}
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border">
        <div className="container mx-auto text-center text-muted-foreground">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-gradient-neon flex items-center justify-center">
              <span className="font-black text-primary-foreground">T</span>
            </div>
            <span className="font-bold">
              <span className="text-primary">Tik</span>
              <span className="text-secondary">Event</span>
            </span>
          </div>
          <p className="text-sm">© 2024 TikEvent. Tất cả quyền được bảo lưu.</p>
        </div>
      </footer>
    </div>
  );
}
