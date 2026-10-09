import { useState, useRef, useEffect, useCallback } from 'react';
import { sounds } from '../utils/soundEffects';
import { fireFlowerCelebration, fireworksShow } from '../utils/confettiFlower';

export interface PhoneticAnalysisResult {
  isCorrect: boolean;
  accuracyScore: number;
  feedbackType: 'CHUC_MUNG' | 'CON_DOC_LAI_NHE';
  mispronouncedParts: string[];
  phoneticDetails: {
    word: string;
    onset?: string;
    rhyme?: string;
    tone?: string;
    status: 'correct' | 'needs_improvement' | 'wrong';
  }[];
  mouthGuideTip: string;
  teacherNote?: string;
  source: string;
  spokenText: string;
  targetText: string;
}

export function useSpeechPractice() {
  const [isListening, setIsListening] = useState(false);
  const [spokenText, setSpokenText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<PhoneticAnalysisResult | null>(null);
  const [hasSpeechSupport, setHasSpeechSupport] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setHasSpeechSupport(false);
    }
  }, []);

  const startListening = useCallback(
    (targetText: string, lessonId: number, studentName: string) => {
      setAnalysisResult(null);
      setSpokenText('');
      setErrorMessage(null);
      sounds.playBubblePop();

      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

      if (!SpeechRecognition) {
        setErrorMessage('Trình duyệt không hỗ trợ Web Speech trực tiếp. Bạn có thể sử dụng chế độ nhập giọng nói mô phỏng bên dưới.');
        return;
      }

      try {
        const recognition = new SpeechRecognition();
        recognition.lang = 'vi-VN';
        recognition.continuous = false;
        recognition.interimResults = true;
        recognition.maxAlternatives = 1;

        recognition.onstart = () => {
          setIsListening(true);
        };

        recognition.onresult = (event: any) => {
          let currentTranscript = '';
          for (let i = event.resultIndex; i < event.results.length; ++i) {
            currentTranscript += event.results[i][0].transcript;
          }
          setSpokenText(currentTranscript);
        };

        recognition.onerror = (event: any) => {
          console.warn('Speech recognition error:', event.error);
          setIsListening(false);
          if (event.error === 'not-allowed') {
            setErrorMessage('Bé hoặc phụ huynh hãy cho phép trình duyệt truy cập Micro để đọc nhé!');
          } else if (event.error === 'no-speech') {
            setErrorMessage('Chưa nghe thấy tiếng bé nói. Bé ghé sát micro và đọc to rõ ràng hơn nhé!');
          }
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognitionRef.current = recognition;
        recognition.start();
      } catch (err: any) {
        console.error('Failed to start recognition:', err);
        setIsListening(false);
        setErrorMessage('Không thể bật micro: ' + err.message);
      }
    },
    []
  );

  const stopListeningAndAnalyze = useCallback(
    async (
      targetText: string,
      lessonId: number,
      studentName: string,
      studentAvatar: string,
      customSpokenText?: string,
      studentGrade: string = 'Lớp 1A',
      studentSchool: string = 'Tiểu học Lê Quý Đôn'
    ) => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {
          // ignore
        }
      }
      setIsListening(false);

      const textToEvaluate = customSpokenText !== undefined ? customSpokenText : spokenText;

      if (!textToEvaluate.trim()) {
        setErrorMessage('Bé chưa đọc từ nào nè. Con nhấn nút Micro rồi đọc to lên nhé!');
        return;
      }

      setIsAnalyzing(true);
      try {
        const response = await fetch('/api/analyze-pronunciation', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            targetText,
            spokenText: textToEvaluate,
            lessonNumber: lessonId,
          }),
        });

        const data: PhoneticAnalysisResult = await response.json();
        setAnalysisResult(data);

        // Record to classroom backend
        await fetch('/api/record-result', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            studentName,
            avatar: studentAvatar,
            grade: studentGrade,
            school: studentSchool,
            lessonId,
            text: targetText,
            isCorrect: data.isCorrect,
            accuracy: data.accuracyScore,
          }),
        });

        // Trigger celebratory applause, fireworks, flowers and cheerful sounds
        if (data.isCorrect) {
          sounds.playApplauseSound();
          sounds.playSuccessSound();
          sounds.playFlowerCelebration();
          fireworksShow();
          fireFlowerCelebration();
        } else {
          sounds.playTryAgainSound();
        }
      } catch (err: any) {
        console.error('Error in analyze pronunciation:', err);
        // Fallback local response
        const fallbackResult: PhoneticAnalysisResult = {
          isCorrect: textToEvaluate.trim().toLowerCase() === targetText.trim().toLowerCase(),
          accuracyScore: textToEvaluate.trim().toLowerCase() === targetText.trim().toLowerCase() ? 95 : 60,
          feedbackType: textToEvaluate.trim().toLowerCase() === targetText.trim().toLowerCase() ? 'CHUC_MUNG' : 'CON_DOC_LAI_NHE',
          mispronouncedParts: ['Bé hãy đọc chậm lại từng tiếng cho rõ ràng nhé.'],
          phoneticDetails: targetText.split(' ').map((w) => ({
            word: w,
            status: textToEvaluate.toLowerCase().includes(w.toLowerCase()) ? 'correct' : 'wrong',
          })),
          mouthGuideTip: 'Bé mở tròn môi, lấy hơi và phát âm rõ thanh điệu nhé!',
          source: 'local-fallback',
          spokenText: textToEvaluate,
          targetText,
        };
        setAnalysisResult(fallbackResult);
        if (fallbackResult.isCorrect) {
          sounds.playApplauseSound();
          sounds.playSuccessSound();
          sounds.playFlowerCelebration();
          fireworksShow();
          fireFlowerCelebration();
        } else {
          sounds.playTryAgainSound();
        }
      } finally {
        setIsAnalyzing(false);
      }
    },
    [spokenText]
  );

  const resetPractice = useCallback(() => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.abort();
      } catch (e) {}
    }
    setIsListening(false);
    setIsAnalyzing(false);
    setSpokenText('');
    setAnalysisResult(null);
    setErrorMessage(null);
  }, []);

  return {
    isListening,
    spokenText,
    setSpokenText,
    isAnalyzing,
    analysisResult,
    hasSpeechSupport,
    errorMessage,
    startListening,
    stopListeningAndAnalyze,
    resetPractice,
  };
}
