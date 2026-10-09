import React, { useState, useEffect } from 'react';
import { Lesson, VocabularyItem } from '../data/lessonsData';
import { useSpeechPractice } from '../hooks/useSpeechPractice';
import { sounds } from '../utils/soundEffects';
import {
  Volume2,
  Mic,
  MicOff,
  Sparkles,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  HelpCircle,
  Award,
  Layers,
  Heart,
  Lightbulb,
} from 'lucide-react';

interface PracticeArenaProps {
  lesson: Lesson;
  studentName: string;
  studentAvatar: string;
  onSuccessRead: (points: number, flowers: number) => void;
  onGoToNextLesson: () => void;
}

export const PracticeArena: React.FC<PracticeArenaProps> = ({
  lesson,
  studentName,
  studentAvatar,
  onSuccessRead,
  onGoToNextLesson,
}) => {
  // 4 progressive difficulty levels
  const [activeLevel, setActiveLevel] = useState<1 | 2 | 3 | 4>(2);
  const [level2ItemIndex, setLevel2ItemIndex] = useState(0);
  const [level3SentenceIndex, setLevel3SentenceIndex] = useState(0);
  const [isSpeakingModel, setIsSpeakingModel] = useState(false);
  const [manualInputMode, setManualInputMode] = useState(false);
  const [simulatedVoiceText, setSimulatedVoiceText] = useState('');

  const {
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
  } = useSpeechPractice();

  // Reset indices and speech state on lesson switch
  useEffect(() => {
    setLevel2ItemIndex(0);
    setLevel3SentenceIndex(0);
    resetPractice();
    setSimulatedVoiceText('');
  }, [lesson.id, resetPractice]);

  // Determine current target text based on active level
  const getCurrentTarget = (): { text: string; breakdown?: string; tip?: string; emoji?: string; keyword?: string } => {
    if (activeLevel === 1) {
      const sound = lesson.level1Sounds[0] || lesson.targetSounds[0] || 'a';
      return {
        text: sound,
        breakdown: `Âm / Chữ cái: ${sound}`,
        tip: `Bé mở to miệng phát âm dứt khoát âm ${sound} nhé!`,
        emoji: '🔤',
        keyword: `Chữ ${sound}`,
      };
    }

    if (activeLevel === 2) {
      const item: VocabularyItem = lesson.level2Vocab[level2ItemIndex] || lesson.level2Vocab[0];
      return {
        text: item.word,
        breakdown: `Đánh vần: ${item.phonetics.spellingSteps} (Âm đầu: ${item.phonetics.onset || 'không có'}, Vần: ${item.phonetics.rhyme}, Thanh: ${item.phonetics.tone})`,
        tip: item.phonetics.tip,
        emoji: item.illustrationEmoji,
        keyword: item.illustrationKeyword,
      };
    }

    if (activeLevel === 3) {
      const sent = lesson.level3Sentences[level3SentenceIndex] || lesson.recognitionSentence.sentence;
      return {
        text: sent,
        breakdown: `Câu ngắn trọn vẹn trong SGK trang ${lesson.pageNumber}`,
        tip: 'Bé ngắt nghỉ nhẹ ở dấu chấm, đọc to tròn vành rõ chữ nhé!',
        emoji: lesson.recognitionSentence.contextImage || '📖',
        keyword: 'Đọc câu',
      };
    }

    // Level 4: Story / poem
    return {
      text: lesson.level4Story.paragraphs.join(' '),
      breakdown: `${lesson.level4Story.title} ${lesson.level4Story.author ? `(${lesson.level4Story.author})` : ''}`,
      tip: 'Bé đọc diễn cảm, lưu loát và tự tin từng câu nhé!',
      emoji: '📜',
      keyword: lesson.level4Story.title,
    };
  };

  const currentTarget = getCurrentTarget();

  // Play Vietnamese pronunciation model
  const handlePlayModelAudio = () => {
    sounds.playBubblePop();
    setIsSpeakingModel(true);
    sounds.speakVietnamese(currentTarget.text, () => {
      setIsSpeakingModel(false);
    });
  };

  // Toggle mic recording
  const handleToggleMic = () => {
    if (isListening) {
      stopListeningAndAnalyze(currentTarget.text, lesson.id, studentName, studentAvatar);
    } else {
      startListening(currentTarget.text, lesson.id, studentName);
    }
  };

  // Evaluate manual simulated voice
  const handleEvaluateCustom = () => {
    if (!simulatedVoiceText.trim()) return;
    stopListeningAndAnalyze(currentTarget.text, lesson.id, studentName, studentAvatar, simulatedVoiceText);
  };

  // Trigger success reward callback
  useEffect(() => {
    if (analysisResult && analysisResult.isCorrect) {
      onSuccessRead(20, 1);
    }
  }, [analysisResult, onSuccessRead]);

  // Navigate to next item in current level
  const handleNextItem = () => {
    sounds.playBubblePop();
    resetPractice();
    setSimulatedVoiceText('');

    if (activeLevel === 2) {
      if (level2ItemIndex < lesson.level2Vocab.length - 1) {
        setLevel2ItemIndex((prev) => prev + 1);
      } else {
        // Upgrade to level 3
        setActiveLevel(3);
      }
    } else if (activeLevel === 3) {
      if (level3SentenceIndex < lesson.level3Sentences.length - 1) {
        setLevel3SentenceIndex((prev) => prev + 1);
      } else {
        // Upgrade to level 4
        setActiveLevel(4);
      }
    } else if (activeLevel === 1) {
      setActiveLevel(2);
    } else {
      // Completed level 4! Move to next lesson
      onGoToNextLesson();
    }
  };

  return (
    <div className="space-y-4">
      {/* Lesson Header Banner */}
      <div className={`p-4 sm:p-5 rounded-3xl bg-gradient-to-r ${lesson.accentBg} border-2 border-amber-200/80 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4`}>
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-2xl bg-white shadow-md flex items-center justify-center text-3xl border-2 border-amber-300">
            {lesson.recognitionSentence.contextImage || '📚'}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-black text-white ${lesson.badgeColor}`}>
                Bài {lesson.id}
              </span>
              <span className="text-xs font-bold text-slate-500">
                Sách Tiếng Việt 1 - Trang {lesson.pageNumber}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-800 mt-0.5">
              {lesson.title}
            </h2>
          </div>
        </div>

        {/* 4 Level Tabs */}
        <div className="flex items-center gap-1.5 bg-white/90 p-1.5 rounded-2xl border border-amber-200 shadow-xs w-full md:w-auto overflow-x-auto">
          {[
            { lvl: 1, label: 'Cấp 1: Nhận diện âm', icon: '🔤' },
            { lvl: 2, label: 'Cấp 2: Từ & Đánh vần', icon: '🎈' },
            { lvl: 3, label: 'Cấp 3: Đọc câu', icon: '🚀' },
            { lvl: 4, label: 'Cấp 4: Thơ / Kể chuyện', icon: '👑' },
          ].map((item) => (
            <button
              key={item.lvl}
              onClick={() => {
                sounds.playBubblePop();
                setActiveLevel(item.lvl as any);
                resetPractice();
                setSimulatedVoiceText('');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer shrink-0 flex items-center gap-1 ${
                activeLevel === item.lvl
                  ? 'bg-rose-500 text-white shadow-sm shadow-rose-200 scale-102'
                  : 'text-slate-600 hover:bg-amber-100 hover:text-slate-900'
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Interactive Flashcard Arena */}
      <div className="bg-white rounded-3xl p-5 sm:p-8 border-2 border-amber-200/90 shadow-xl relative overflow-hidden">
        {/* Decorative corner flowers */}
        <div className="absolute -top-6 -right-6 text-7xl opacity-15 pointer-events-none select-none">
          🌸
        </div>
        <div className="absolute -bottom-6 -left-6 text-7xl opacity-15 pointer-events-none select-none">
          🌻
        </div>

        {/* Level 2 Sub-stepper if on vocabulary */}
        {activeLevel === 2 && (
          <div className="flex items-center justify-between gap-2 mb-6 pb-3 border-b border-amber-100">
            <span className="text-xs font-black text-amber-800 uppercase tracking-wider flex items-center gap-1">
              <Layers className="w-4 h-4 text-rose-500" />
              Từ vựng bài học ({level2ItemIndex + 1}/{lesson.level2Vocab.length})
            </span>
            <div className="flex items-center gap-1.5">
              {lesson.level2Vocab.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    sounds.playBubblePop();
                    setLevel2ItemIndex(i);
                    resetPractice();
                  }}
                  className={`w-7 h-7 rounded-xl text-xs font-black transition-all cursor-pointer ${
                    i === level2ItemIndex
                      ? 'bg-rose-500 text-white shadow-xs'
                      : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Level 3 Sub-stepper if on sentences */}
        {activeLevel === 3 && (
          <div className="flex items-center justify-between gap-2 mb-6 pb-3 border-b border-amber-100">
            <span className="text-xs font-black text-amber-800 uppercase tracking-wider flex items-center gap-1">
              <Layers className="w-4 h-4 text-rose-500" />
              Câu luyện đọc ({level3SentenceIndex + 1}/{lesson.level3Sentences.length})
            </span>
            <div className="flex items-center gap-1.5">
              {lesson.level3Sentences.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    sounds.playBubblePop();
                    setLevel3SentenceIndex(i);
                    resetPractice();
                  }}
                  className={`w-7 h-7 rounded-xl text-xs font-black transition-all cursor-pointer ${
                    i === level3SentenceIndex
                      ? 'bg-sky-500 text-white shadow-xs'
                      : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* The Big Stage: Image & Text */}
        <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-10 my-2">
          
          {/* Illustration Box */}
          <div className="w-full lg:w-5/12 flex flex-col items-center justify-center p-6 sm:p-8 bg-gradient-to-b from-amber-50 to-orange-50/50 rounded-3xl border-2 border-dashed border-amber-300 relative group">
            <div className="relative">
              <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-3xl bg-white shadow-lg flex items-center justify-center border-4 border-amber-200 transform group-hover:scale-105 transition-transform duration-300">
                <span className="text-7xl sm:text-8xl select-none animate-pulse">
                  {currentTarget.emoji}
                </span>
              </div>
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-amber-500 text-white px-3 py-0.5 rounded-full text-xs font-extrabold shadow-sm whitespace-nowrap">
                {currentTarget.keyword}
              </div>
            </div>

            {/* Phonetic guide caption */}
            <div className="mt-6 text-center">
              <p className="text-xs font-bold text-amber-900 bg-white/80 px-3 py-1.5 rounded-xl border border-amber-200 shadow-xs">
                {currentTarget.breakdown}
              </p>
            </div>
          </div>

          {/* Reading Target & Action Panel */}
          <div className="w-full lg:w-7/12 flex flex-col items-center lg:items-start text-center lg:text-left space-y-4">
            
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-black">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Bé hãy đọc to từ / câu dưới đây:</span>
            </div>

            {/* The Target Text in large, super friendly font */}
            <div className="w-full py-4 px-6 bg-amber-50/60 rounded-3xl border-2 border-amber-300/80 shadow-inner">
              {activeLevel === 4 ? (
                <div className="space-y-2 text-left">
                  <h3 className="text-xl font-black text-rose-600">{lesson.level4Story.title}</h3>
                  {lesson.level4Story.paragraphs.map((p, idx) => (
                    <p key={idx} className="text-lg sm:text-xl font-extrabold text-slate-800 leading-relaxed font-['Nunito']">
                      {p}
                    </p>
                  ))}
                  {lesson.level4Story.author && (
                    <div className="text-xs text-slate-500 font-bold italic text-right">
                      {lesson.level4Story.author}
                    </div>
                  )}
                </div>
              ) : (
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-800 tracking-wide font-['Nunito'] leading-tight">
                  {currentTarget.text}
                </h1>
              )}
            </div>

            {/* Phonetic Tip for Lips & Tongue */}
            <div className="w-full flex items-start gap-2.5 p-3 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-950 text-xs sm:text-sm font-semibold text-left">
              <Lightbulb className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-extrabold text-indigo-800">Mẹo phát âm cho bé: </span>
                {currentTarget.tip}
              </div>
            </div>

            {/* Action Buttons: Listen to Model & Record Mic */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2 w-full">
              
              {/* Listen to Teacher Model Audio */}
              <button
                onClick={handlePlayModelAudio}
                disabled={isSpeakingModel}
                className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-sky-500 hover:bg-sky-600 active:scale-95 text-white font-black text-sm shadow-md shadow-sky-200 transition-all cursor-pointer"
              >
                <Volume2 className={`w-5 h-5 ${isSpeakingModel ? 'animate-bounce text-yellow-300' : ''}`} />
                <span>{isSpeakingModel ? 'Cô đang đọc mẫu...' : 'Nghe Cô Đọc Mẫu'}</span>
              </button>

              {/* Big Pulsing Mic Button */}
              <button
                onClick={handleToggleMic}
                disabled={isAnalyzing}
                className={`flex items-center gap-2.5 px-6 py-3.5 rounded-2xl font-black text-sm sm:text-base shadow-lg transition-all cursor-pointer transform active:scale-95 ${
                  isListening
                    ? 'bg-rose-600 hover:bg-rose-700 text-white animate-pulse ring-4 ring-rose-300'
                    : 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-emerald-200 hover:scale-102'
                }`}
              >
                {isListening ? (
                  <>
                    <MicOff className="w-5 h-5" />
                    <span>Đang lắng nghe bé... (Bấm để xong)</span>
                  </>
                ) : (
                  <>
                    <Mic className="w-5 h-5" />
                    <span>Bé Bấm Mic Để Đọc</span>
                  </>
                )}
              </button>

              {/* Reset button */}
              {(spokenText || analysisResult) && (
                <button
                  onClick={resetPractice}
                  className="p-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-sm transition-all cursor-pointer"
                  title="Đọc lại từ đầu"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Error or Help Banner if mic not permitted */}
            {errorMessage && (
              <div className="w-full p-3 rounded-2xl bg-amber-100/80 border border-amber-300 text-amber-900 text-xs font-bold text-left flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
                <button
                  onClick={() => setManualInputMode(!manualInputMode)}
                  className="underline text-amber-800 text-xs whitespace-nowrap cursor-pointer font-extrabold"
                >
                  {manualInputMode ? 'Ẩn gõ giọng nói' : 'Gõ giọng nói kiểm tra'}
                </button>
              </div>
            )}

            {/* Real-time Listening Feedback Bubble */}
            {isListening && (
              <div className="w-full p-4 rounded-2xl bg-rose-50 border-2 border-rose-300 text-left animate-fadeIn">
                <div className="flex items-center gap-2 text-rose-700 font-extrabold text-xs mb-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping"></span>
                  Micro đang thu âm giọng của bé:
                </div>
                <p className="text-lg font-black text-rose-950 font-['Nunito'] italic min-h-[1.75rem]">
                  {spokenText ? `"${spokenText}"` : 'Bé hãy nói to vào mic nhé...'}
                </p>
              </div>
            )}

            {/* Analyzing Indicator */}
            {isAnalyzing && (
              <div className="w-full p-4 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-center gap-3 text-indigo-700 font-black text-sm">
                <Sparkles className="w-5 h-5 animate-spin" />
                <span>Trí tuệ nhân tạo AI đang phân tích âm thanh của bé...</span>
              </div>
            )}

            {/* Manual voice simulator box (Ensures testing works 100% on all environments) */}
            {manualInputMode && (
              <div className="w-full p-3 rounded-2xl bg-slate-50 border border-slate-200 text-left space-y-2">
                <div className="text-xs font-bold text-slate-600 flex items-center justify-between">
                  <span>Mô phỏng giọng nói học sinh (Dành cho thiết bị chưa bật mic):</span>
                  <button
                    onClick={() => setSimulatedVoiceText(currentTarget.text)}
                    className="text-[11px] text-blue-600 hover:underline font-extrabold"
                  >
                    Gán giọng đúng chuẩn
                  </button>
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={simulatedVoiceText}
                    onChange={(e) => setSimulatedVoiceText(e.target.value)}
                    placeholder="Nhập từ hoặc câu học sinh đọc..."
                    className="flex-1 px-3 py-1.5 rounded-xl border border-slate-300 text-sm font-bold bg-white"
                  />
                  <button
                    onClick={handleEvaluateCustom}
                    className="px-4 py-1.5 rounded-xl bg-indigo-600 text-white font-extrabold text-xs shadow-xs"
                  >
                    Kiểm tra AI
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>

        {/* FEEDBACK SECTION: CON ĐỌC LẠI NHÉ OR HOA CHÚC MỪNG */}
        {analysisResult && (
          <div className="mt-8 pt-6 border-t-2 border-dashed border-amber-200 animate-fadeIn">
            {analysisResult.isCorrect ? (
              /* ĐỌC ĐÚNG: HOA VÀ ÂM THANH CHÚC MỪNG KHÍCH LỆ */
              <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-500 via-teal-500 to-green-500 text-white shadow-xl relative overflow-hidden">
                <div className="absolute right-4 top-2 text-7xl opacity-20 select-none animate-bounce">
                  🌸🌺🌼
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-4 text-center sm:text-left">
                    <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-4xl shadow-inner shrink-0">
                      🌸
                    </div>
                    <div>
                      <div className="flex items-center justify-center sm:justify-start gap-2">
                        <span className="px-3 py-0.5 rounded-full bg-yellow-300 text-yellow-950 font-black text-xs uppercase tracking-wider">
                          Đọc Đúng Xuất Sắc! +20 Điểm
                        </span>
                        <span className="bg-white/30 text-white px-2 py-0.5 rounded-full text-xs font-black">
                          Độ chuẩn: {analysisResult.accuracyScore}%
                        </span>
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-black mt-1">
                        Bé Đọc Giỏi Lắm! Tặng Bé Bông Hoa Điểm 10!
                      </h3>
                      <p className="text-emerald-100 text-xs sm:text-sm font-semibold mt-0.5">
                        {analysisResult.mouthGuideTip || 'Bé phát âm to, tròn vành rõ chữ và đúng chuẩn ngữ âm Tiếng Việt.'}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={handleNextItem}
                    className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white text-emerald-800 hover:bg-yellow-100 font-black text-sm sm:text-base shadow-lg transition-transform hover:scale-105 active:scale-95 cursor-pointer whitespace-nowrap"
                  >
                    <span>Luyện Từ Tiếp Theo</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>

                {/* Phonetic confirmation breakdown */}
                {analysisResult.phoneticDetails && analysisResult.phoneticDetails.length > 0 && (
                  <div className="mt-4 pt-3 border-t border-white/20 flex flex-wrap items-center gap-2">
                    <span className="text-xs font-black text-emerald-100">Chi tiết âm vần bé phát âm:</span>
                    {analysisResult.phoneticDetails.map((p, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-xl bg-white/20 backdrop-blur-xs text-xs font-black text-white flex items-center gap-1"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-yellow-300" />
                        <span>{p.word}</span>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              /* ĐỌC SAI / CHƯA RÕ: HIỆN LÊN TỪ "CON ĐỌC LẠI NHÉ" KÈM PHÂN TÍCH ÂM CHI TIẾT */
              <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-rose-50 via-amber-50 to-orange-50 border-3 border-rose-400 text-slate-800 shadow-xl relative">
                
                {/* Banner chính yêu cầu: "CON ĐỌC LẠI NHÉ" */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b-2 border-rose-200">
                  <div className="flex items-center gap-3 sm:gap-4 text-center sm:text-left">
                    <div className="w-16 h-16 rounded-2xl bg-rose-500 text-white flex items-center justify-center text-3xl shadow-md shrink-0 animate-pulse">
                      🐥
                    </div>
                    <div>
                      <div className="inline-block px-3 py-0.5 rounded-full bg-rose-200 text-rose-800 font-black text-xs uppercase tracking-wider mb-1">
                        Cố gắng lên nào bé ơi!
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-black text-rose-600 tracking-wide font-['Nunito']">
                        "CON ĐỌC LẠI NHÉ"
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 font-bold">
                        Bé phát âm đạt {analysisResult.accuracyScore}%. Lắng nghe cô hướng dẫn bên dưới nhé!
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handlePlayModelAudio}
                      className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white text-xs sm:text-sm font-black shadow-xs cursor-pointer"
                    >
                      <Volume2 className="w-4 h-4" />
                      <span>Nghe Cô Đọc Lại</span>
                    </button>
                    <button
                      onClick={handleToggleMic}
                      className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white text-xs sm:text-sm font-black shadow-md cursor-pointer animate-bounce"
                    >
                      <Mic className="w-4 h-4" />
                      <span>Con Thử Lại Nào 🎙️</span>
                    </button>
                  </div>
                </div>

                {/* Phân tích âm chi tiết giúp học sinh nhận diện lỗi sai */}
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Nhận diện lỗi ngữ âm */}
                  <div className="p-4 rounded-2xl bg-white border border-rose-200 shadow-xs space-y-2">
                    <div className="flex items-center gap-2 text-rose-600 font-black text-xs uppercase tracking-wider">
                      <AlertCircle className="w-4 h-4" />
                      <span>Điểm bé cần lưu ý phát âm:</span>
                    </div>
                    {analysisResult.mispronouncedParts && analysisResult.mispronouncedParts.length > 0 ? (
                      <ul className="space-y-1.5 text-xs sm:text-sm font-bold text-slate-700">
                        {analysisResult.mispronouncedParts.map((mistake, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-rose-500 font-black">•</span>
                            <span>{mistake}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-xs font-semibold text-slate-600">
                        Bé chú ý đọc dứt khoát dấu thanh và không nuốt âm cuối nhé.
                      </p>
                    )}
                  </div>

                  {/* Mẹo khẩu hình miệng & nhận xét của cô giáo */}
                  <div className="p-4 rounded-2xl bg-amber-100/60 border border-amber-300 shadow-xs space-y-2">
                    <div className="flex items-center gap-2 text-amber-900 font-black text-xs uppercase tracking-wider">
                      <Lightbulb className="w-4 h-4 text-amber-600" />
                      <span>Khẩu hình miệng & mẹo cho bé:</span>
                    </div>
                    <p className="text-xs sm:text-sm font-bold text-amber-950 leading-relaxed">
                      {analysisResult.mouthGuideTip || 'Bé mở tròn môi, lấy hơi từ bụng và phát âm rõ âm đệm nhé!'}
                    </p>
                    {analysisResult.teacherNote && (
                      <div className="text-[11px] font-semibold text-slate-500 pt-1 border-t border-amber-200">
                        Gợi ý cho cô giáo/phụ huynh: {analysisResult.teacherNote}
                      </div>
                    )}
                  </div>
                </div>

                {/* So sánh chi tiết từng âm */}
                {analysisResult.phoneticDetails && analysisResult.phoneticDetails.length > 0 && (
                  <div className="mt-4 p-3 rounded-2xl bg-white border border-amber-200">
                    <div className="text-xs font-black text-slate-600 mb-2">
                      Phân tích từng tiếng trong câu:
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {analysisResult.phoneticDetails.map((item, idx) => (
                        <div
                          key={idx}
                          className={`px-3 py-1.5 rounded-xl border text-xs font-black flex items-center gap-1.5 ${
                            item.status === 'correct'
                              ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                              : 'bg-rose-50 border-rose-300 text-rose-800'
                          }`}
                        >
                          {item.status === 'correct' ? (
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                          ) : (
                            <AlertCircle className="w-3.5 h-3.5 text-rose-500" />
                          )}
                          <span>{item.word}</span>
                          {item.status !== 'correct' && (
                            <span className="text-[10px] bg-rose-200 text-rose-900 px-1 rounded-md">
                              cần đọc lại
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
