import confetti from 'canvas-confetti';

// Bắn pháo hoa rực rỡ nhiều chùm (Fireworks Show)
export function fireworksShow() {
  const duration = 2.5 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 45, spread: 360, ticks: 70, zIndex: 1000 };

  const interval: any = setInterval(() => {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 45 * (timeLeft / duration);

    // Chùm pháo hoa bên trái bắn lên
    confetti({
      ...defaults,
      particleCount,
      origin: { x: Math.random() * 0.3 + 0.1, y: Math.random() * 0.4 + 0.2 },
      colors: ['#ff0055', '#ffaa00', '#ffff00', '#00ffcc', '#ff00cc'],
    });

    // Chùm pháo hoa bên phải bắn lên
    confetti({
      ...defaults,
      particleCount,
      origin: { x: Math.random() * 0.3 + 0.6, y: Math.random() * 0.4 + 0.2 },
      colors: ['#00bbff', '#ff3366', '#ffdd00', '#7700ff', '#00ff88'],
    });

    // Chùm pháo hoa ở giữa nở rực rỡ
    confetti({
      ...defaults,
      particleCount: particleCount * 0.8,
      origin: { x: 0.5, y: 0.3 },
      shapes: ['star', 'circle'],
      colors: ['#ffd700', '#ff69b4', '#ff4500', '#00e5ff'],
    });
  }, 280);
}

// Bắn chùm pháo hoa cánh hoa 🌸🌺🌼🌻🌷
export function fireFlowerCelebration() {
  const count = 90;
  const defaults = {
    origin: { y: 0.7 },
    colors: ['#f43f5e', '#ec4899', '#d946ef', '#f59e0b', '#10b981', '#3b82f6', '#fbbf24'],
  };

  function fire(particleRatio: number, opts: confetti.Options) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
    });
  }

  fire(0.25, {
    spread: 35,
    startVelocity: 60,
  });
  fire(0.2, {
    spread: 70,
  });
  fire(0.35, {
    spread: 120,
    decay: 0.91,
    scalar: 1.3,
  });
  fire(0.1, {
    spread: 140,
    startVelocity: 35,
    decay: 0.92,
    scalar: 1.6,
  });
  fire(0.1, {
    spread: 140,
    startVelocity: 55,
  });
}
