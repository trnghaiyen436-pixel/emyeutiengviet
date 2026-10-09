import confetti from 'canvas-confetti';

export function fireFlowerCelebration() {
  // Bắn chùm pháo hoa sắc màu cánh hoa 🌸🌺🌼🌻🌷
  const count = 80;
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
    spread: 26,
    startVelocity: 55,
  });
  fire(0.2, {
    spread: 60,
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 1.2,
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.5,
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });
}
