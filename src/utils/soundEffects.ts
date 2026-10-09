// Audio effects synthesized via Web Audio API + SpeechSynthesis in Vietnamese

class SoundManager {
  private ctx: AudioContext | null = null;

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Tiếng vỗ tay hoan hô ròn rã của cả lớp (Applause & Cheering)
  playApplauseSound() {
    try {
      this.initCtx();
      if (!this.ctx) return;
      const ctx = this.ctx;
      const duration = 2.8; // 2.8 giây vỗ tay tưng bừng
      const now = ctx.currentTime;

      // 1. Tạo tiếng vỗ tay từ noise buffer với nhiều nhịp vỗ tay chồng lên nhau
      const bufferSize = ctx.sampleRate * duration;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);

      // Điền white noise
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noiseSource = ctx.createBufferSource();
      noiseSource.buffer = buffer;

      // Bandpass filter để tạo âm thanh vỗ tay vào lòng bàn tay (1200Hz - 2200Hz)
      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1400, now);
      filter.Q.setValueAtTime(2.2, now);

      // Gain Envelope chính (tăng dần rồi giảm êm)
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0, now);
      masterGain.gain.linearRampToValueAtTime(0.35, now + 0.3);
      masterGain.gain.setValueAtTime(0.35, now + 1.8);
      masterGain.gain.exponentialRampToValueAtTime(0.001, now + duration);

      // Điều chế biên độ dày đặc để mô phỏng từng nhịp vỗ tay của hàng chục học sinh
      const clapGain = ctx.createGain();
      const numClaps = 65; // 65 nhịp vỗ tay ngẫu nhiên trong thời gian phát
      for (let c = 0; c < numClaps; c++) {
        const t = now + Math.random() * (duration - 0.4);
        const clapVolume = 0.4 + Math.random() * 0.6;
        clapGain.gain.setValueAtTime(clapVolume, t);
        clapGain.gain.exponentialRampToValueAtTime(0.05, t + 0.035);
      }

      noiseSource.connect(filter);
      filter.connect(clapGain);
      clapGain.connect(masterGain);
      masterGain.connect(ctx.destination);

      noiseSource.start(now);
      noiseSource.stop(now + duration);

      // 2. Kèm hợp âm kèn pháo hoa chúc mừng rực rỡ C5 - E5 - G5 - C6 - E6
      const fanfarePitches = [523.25, 659.25, 783.99, 1046.5, 1318.5];
      fanfarePitches.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);

        g.gain.setValueAtTime(0, now + idx * 0.08);
        g.gain.linearRampToValueAtTime(0.25, now + idx * 0.08 + 0.04);
        g.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.6);

        osc.connect(g);
        g.connect(ctx.destination);

        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.65);
      });
    } catch (e) {
      console.warn('Applause sound error:', e);
    }
  }

  // Tiếng leng keng chúc mừng rực rỡ khi đọc đúng
  playSuccessSound() {
    try {
      this.initCtx();
      if (!this.ctx) return;
      const ctx = this.ctx;
      const now = ctx.currentTime;

      // Hợp âm vui tươi C5 - E5 - G5 - C6
      const notes = [523.25, 659.25, 783.99, 1046.5];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.1);

        gain.gain.setValueAtTime(0, now + idx * 0.1);
        gain.gain.linearRampToValueAtTime(0.3, now + idx * 0.1 + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.1 + 0.4);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + idx * 0.1);
        osc.stop(now + idx * 0.1 + 0.45);
      });
    } catch (e) {
      console.warn('Audio play error:', e);
    }
  }

  // Tiếng hoa nở rực rỡ - âm thanh lấp lánh
  playFlowerCelebration() {
    try {
      this.initCtx();
      if (!this.ctx) return;
      const ctx = this.ctx;
      const now = ctx.currentTime;

      const pitches = [587.33, 739.99, 880.0, 1174.66, 1318.51];
      pitches.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + i * 0.08);

        gain.gain.setValueAtTime(0, now + i * 0.08);
        gain.gain.linearRampToValueAtTime(0.25, now + i * 0.08 + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.5);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + i * 0.08);
        osc.stop(now + i * 0.08 + 0.55);
      });
    } catch (e) {
      console.warn(e);
    }
  }

  // Âm thanh ấm áp khích lệ bé đọc lại (không gây sợ hãi)
  playTryAgainSound() {
    try {
      this.initCtx();
      if (!this.ctx) return;
      const ctx = this.ctx;
      const now = ctx.currentTime;

      const notes = [440, 392]; // A4 -> G4 âm dịu dàng
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.18);

        gain.gain.setValueAtTime(0, now + idx * 0.18);
        gain.gain.linearRampToValueAtTime(0.18, now + idx * 0.18 + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.18 + 0.35);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + idx * 0.18);
        osc.stop(now + idx * 0.18 + 0.4);
      });
    } catch (e) {
      console.warn(e);
    }
  }

  // Tiếng bấm phím vui nhộn
  playBubblePop() {
    try {
      this.initCtx();
      if (!this.ctx) return;
      const ctx = this.ctx;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(400, now);
      osc.frequency.exponentialRampToValueAtTime(800, now + 0.08);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.09);
    } catch (e) {
      console.warn(e);
    }
  }

  // Đọc mẫu tiếng Việt chuẩn cho học sinh lớp 1
  speakVietnamese(text: string, onEnd?: () => void) {
    if (!('speechSynthesis' in window)) {
      if (onEnd) onEnd();
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'vi-VN';
    utterance.rate = 0.82; // Tốc độ vừa phải cho học sinh lớp 1 dễ nghe
    utterance.pitch = 1.1; // Giọng tươi sáng, thân thiện

    const voices = window.speechSynthesis.getVoices();
    const viVoice = voices.find((v) => v.lang.startsWith('vi') || v.lang.includes('Vietnamese'));
    if (viVoice) {
      utterance.voice = viVoice;
    }

    if (onEnd) {
      utterance.onend = () => onEnd();
      utterance.onerror = () => onEnd();
    }

    window.speechSynthesis.speak(utterance);
  }

  stopSpeaking() {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }
}

export const sounds = new SoundManager();
