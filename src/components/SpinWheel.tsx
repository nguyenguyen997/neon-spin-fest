import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface Segment {
  label: string;
  value: number;
  color: string;
}

const segments: Segment[] = [
  { label: "5 Xu", value: 5, color: "#ff0050" },
  { label: "10 Xu", value: 10, color: "#00f2ea" },
  { label: "20 Xu", value: 20, color: "#ff0050" },
  { label: "50 Xu", value: 50, color: "#00f2ea" },
  { label: "1 Xu", value: 1, color: "#ff0050" },
  { label: "100 Xu", value: 100, color: "#00f2ea" },
  { label: "2 Xu", value: 2, color: "#ff0050" },
  { label: "15 Xu", value: 15, color: "#00f2ea" },
];

interface SpinWheelProps {
  spinsLeft: number;
  onSpin: (reward: number) => void;
  disabled?: boolean;
}

export function SpinWheel({ spinsLeft, onSpin, disabled }: SpinWheelProps) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState<Segment | null>(null);
  const [showResult, setShowResult] = useState(false);
  const wheelRef = useRef<HTMLDivElement>(null);

  const triggerConfetti = useCallback(() => {
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ["#ff0050", "#00f2ea", "#ffffff"],
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ["#ff0050", "#00f2ea", "#ffffff"],
      });
    }, 250);
  }, []);

  const handleSpin = useCallback(() => {
    if (isSpinning || spinsLeft <= 0 || disabled) return;

    setIsSpinning(true);
    setShowResult(false);

    // Random result based on weights (simplified)
    const randomIndex = Math.floor(Math.random() * segments.length);
    const selectedSegment = segments[randomIndex];

    // Calculate rotation
    const segmentAngle = 360 / segments.length;
    const targetAngle = 360 - (randomIndex * segmentAngle + segmentAngle / 2);
    const spins = 5 + Math.random() * 3; // 5-8 full spins
    const finalRotation = rotation + 360 * spins + targetAngle;

    setRotation(finalRotation);

    // Show result after animation
    setTimeout(() => {
      setResult(selectedSegment);
      setShowResult(true);
      setIsSpinning(false);
      triggerConfetti();
      onSpin(selectedSegment.value);
    }, 4000);
  }, [isSpinning, spinsLeft, disabled, rotation, triggerConfetti, onSpin]);

  const segmentAngle = 360 / segments.length;

  return (
    <div className="flex flex-col items-center gap-8">
      {/* Wheel Container */}
      <div className="relative">
        {/* Outer glow ring */}
        <div className="absolute inset-[-20px] rounded-full bg-gradient-to-r from-primary via-secondary to-primary opacity-50 blur-xl animate-spin-slow" />
        
        {/* Pointer */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 z-20">
          <div className="w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-t-[30px] border-t-primary drop-shadow-[0_0_10px_hsl(343_100%_50%)]" />
        </div>

        {/* Main wheel */}
        <div
          ref={wheelRef}
          className="relative w-72 h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full border-4 border-primary/50 shadow-[0_0_60px_hsl(343_100%_50%_/_0.4)] overflow-hidden"
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: isSpinning ? "transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99)" : "none",
          }}
        >
          {/* Segments */}
          <svg viewBox="0 0 100 100" className="w-full h-full">
            {segments.map((segment, index) => {
              const startAngle = index * segmentAngle - 90;
              const endAngle = (index + 1) * segmentAngle - 90;
              const startRad = (startAngle * Math.PI) / 180;
              const endRad = (endAngle * Math.PI) / 180;
              
              const x1 = 50 + 50 * Math.cos(startRad);
              const y1 = 50 + 50 * Math.sin(startRad);
              const x2 = 50 + 50 * Math.cos(endRad);
              const y2 = 50 + 50 * Math.sin(endRad);
              
              const largeArc = segmentAngle > 180 ? 1 : 0;
              
              const textAngle = startAngle + segmentAngle / 2;
              const textRad = (textAngle * Math.PI) / 180;
              const textX = 50 + 32 * Math.cos(textRad);
              const textY = 50 + 32 * Math.sin(textRad);

              return (
                <g key={index}>
                  <path
                    d={`M 50 50 L ${x1} ${y1} A 50 50 0 ${largeArc} 1 ${x2} ${y2} Z`}
                    fill={segment.color}
                    stroke="hsl(0 0% 0%)"
                    strokeWidth="0.5"
                    className="drop-shadow-lg"
                  />
                  <text
                    x={textX}
                    y={textY}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="white"
                    fontSize="5"
                    fontWeight="bold"
                    transform={`rotate(${textAngle + 90}, ${textX}, ${textY})`}
                    className="drop-shadow-md"
                  >
                    {segment.label}
                  </text>
                </g>
              );
            })}
            {/* Center circle */}
            <circle cx="50" cy="50" r="8" fill="hsl(0 0% 5%)" stroke="hsl(343 100% 50%)" strokeWidth="1" />
            <circle cx="50" cy="50" r="4" fill="hsl(343 100% 50%)" className="drop-shadow-[0_0_10px_hsl(343_100%_50%)]" />
          </svg>
        </div>
      </div>

      {/* Spin Button */}
      <Button
        variant="neon"
        size="xl"
        onClick={handleSpin}
        disabled={isSpinning || spinsLeft <= 0 || disabled}
        className="min-w-[200px] text-lg"
      >
        {isSpinning ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Đang quay...
          </>
        ) : spinsLeft <= 0 ? (
          "Hết lượt quay"
        ) : (
          `🎰 Quay ngay (${spinsLeft} lượt)`
        )}
      </Button>

      {/* Result Modal */}
      <AnimatePresence>
        {showResult && result && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
            onClick={() => setShowResult(false)}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-card border-2 border-primary/50 rounded-2xl p-8 shadow-[0_0_60px_hsl(343_100%_50%_/_0.4)] text-center max-w-sm mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="text-6xl mb-4"
              >
                🎉
              </motion.div>
              <h2 className="text-2xl font-bold mb-2 text-gradient-neon">Chúc mừng!</h2>
              <p className="text-4xl font-black text-primary mb-4">
                +{result.value} Xu
              </p>
              <p className="text-muted-foreground mb-6">
                Phần thưởng đã được cộng vào tài khoản của bạn
              </p>
              <Button variant="neon-outline" onClick={() => setShowResult(false)}>
                Tiếp tục
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
