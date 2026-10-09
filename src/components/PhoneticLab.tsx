import React, { useState } from 'react';
import { useSpeechPractice } from '../hooks/useSpeechPractice';
import { sounds } from '../utils/soundEffects';
import {
  Mic,
  Sparkles,
  Volume2,
  CheckCircle2,
  AlertCircle,
  Lightbulb,
  Compass,
  Smile,
  BookOpen,
} from 'lucide-react';

const CHALLENGES_PRESETS = [
  { label: 'Phân biệt tr vs ch', word: 'cây tre và chú khỉ', category: 'Âm đầu' },
  { label: 'Phân biệt l vs n', word: 'nón lá và lúa non', category: 'Âm đầu' },
  { label: 'Phân biệt s vs x', word: 'hoa sen và xe lu', category: 'Âm đầu' },
  { label: 'Dấu hỏi vs Dấu ngã', word: 'cỏ non và gỗ quý', category: 'Dấu thanh' },
  { label: 'Vần uyên & uyêt', word: 'con thuyền và trăng khuyết', category: 'Vần khó' },
  { label: 'Vần oan & oăn', word: 'hoa xoan và tóc xoăn', category: 'Vần khó' },
  { label: 'Vần ang & ăng', word: 'vầng trăng sáng lấp lánh', category: 'Vần ghép' },
];

interface PhoneticLabProps {
  studentName: string;
  studentAvatar: string;
}

export const PhoneticLab: React.FC<PhoneticLabProps> = ({ studentName, studentAvatar }) => {
  const [customText, setCustomText] = useState('búp bê');
  const [isSpeaking, setIsSpeaking] = useState(false);

  const {
    isListening,
    spokenText,
    setSpokenText,
    isAnalyzing,
    analysisResult,
    startListening,
    stopListeningAndAnalyze,
    resetPractice,
  } = useSpeechPractice();

  const handleSpeakSample = (text: string) => {
    sounds.playBubblePop();
    setIsSpeaking(true);
    sounds.speakVietnamese(text, () => {
      setIsSpeaking(false);
    });
  };

  const handleToggleRecord = () => {
    if (isListening) {
      stopListeningAndAnalyze(customText, 999, studentName, studentAvatar);
    } else {
      startListening(customText, 999, studentName);
    }
  };

  const selectPreset = (presetText: string) => {
    sounds.playBubblePop();
    setCustomText(presetText);
    resetPractice();
  };

  return (
    <div className="space-y-6">
      {/* Intro Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white shadow-lg">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-black uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
              <span>Trợ lý AI Nhận Diện & Phân Tích Âm Vần Lớp 1</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black">
              Phòng Luyện Âm Chuyên Sâu Thời Gian Thực
            </h2>
            <p className="text-indigo-100 text-xs sm:text-sm font-semibold mt-1 max-w-2xl">
              Nhận diện từng âm đầu, âm đệm, âm chính, âm cuối và thanh điệu giúp học sinh lớp 1 khắc phục lỗi ngọng, đọc chuẩn ngữ âm Tiếng Việt.
            </p>
          </div>
          <div className="text-5xl select-none">🔬</div>
        </div>
      </div>

      {/* Preset Challenge Chips */}
      <div className="bg-white rounded-3xl p-5 border-2 border-amber-200/80 shadow-sm space-y-3">
        <div className="text-xs font-black text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
          <Compass className="w-4 h-4 text-indigo-500" />
          <span>Bài tập luyện phát âm theo cặp âm vần dễ lẫn:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {CHALLENGES_PRESETS.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => selectPreset(preset.word)}
              className={`px-3.5 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 border ${
                customText === preset.word
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-200 scale-102'
                  : 'bg-indigo-50/60 hover:bg-indigo-100 text-indigo-900 border-indigo-200'
              }`}
            >
              <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-white/30 font-black">
                {preset.category}
              </span>
              <span>{preset.word}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Testing Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-amber-200/80 shadow-md space-y-6">
        <div>
          <label className="text-xs font-black text-slate-700 uppercase tracking-wider block mb-2">
            Nhập từ ngữ hoặc câu cần kiểm tra phát âm:
          </label>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              placeholder="Nhập từ hoặc câu, ví dụ: con thuyền, hoa xoan..."
              className="flex-1 px-4 py-3 rounded-2xl border-2 border-amber-300 text-lg sm:text-xl font-black text-slate-800 bg-amber-50/30 focus:outline-none focus:border-indigo-500 focus:bg-white"
            />
            <button
              onClick={() => handleSpeakSample(customText)}
              disabled={isSpeaking}
              className="px-5 py-3 rounded-2xl bg-sky-500 hover:bg-sky-600 text-white font-black text-sm flex items-center justify-center gap-2 shadow-xs cursor-pointer"
            >
              <Volume2 className="w-5 h-5" />
              <span>Nghe Phát Âm Chuẩn</span>
            </button>
          </div>
        </div>

        {/* Big Action Mic */}
        <div className="p-6 rounded-3xl bg-gradient-to-b from-indigo-50/50 to-purple-50/40 border-2 border-dashed border-indigo-200 flex flex-col items-center justify-center text-center space-y-4">
          <div className="text-xs font-black text-indigo-900 uppercase tracking-wider">
            Bé đọc to từ ngữ trên vào micro:
          </div>
          
          <button
            onClick={handleToggleRecord}
            disabled={isAnalyzing}
            className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center text-white shadow-xl transition-all cursor-pointer transform active:scale-95 ${
              isListening
                ? 'bg-rose-500 animate-ping ring-8 ring-rose-200'
                : 'bg-indigo-600 hover:bg-indigo-700 hover:scale-105 shadow-indigo-200'
            }`}
          >
            <Mic className="w-10 h-10" />
          </button>

          <p className="text-xs sm:text-sm font-bold text-slate-600">
            {isListening
              ? '🎙️ Đang nghe bé nói... Nhấn nút khi bé đọc xong'
              : 'Nhấn nút Micro để bắt đầu kiểm tra'}
          </p>

          {isListening && spokenText && (
            <div className="p-3 rounded-xl bg-white border border-indigo-200 text-sm font-black text-indigo-900 shadow-xs max-w-md">
              AI nhận diện: "{spokenText}"
            </div>
          )}

          {isAnalyzing && (
            <div className="text-xs font-black text-indigo-600 flex items-center gap-2 animate-pulse">
              <Sparkles className="w-4 h-4 animate-spin" />
              <span>AI đang phân tích khẩu hình và ngữ âm chi tiết...</span>
            </div>
          )}
        </div>

        {/* Detailed Phonetic Analysis Output */}
        {analysisResult && (
          <div className="space-y-4 pt-4 border-t-2 border-dashed border-indigo-100 animate-fadeIn">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
                <span>Kết Quả Phân Tích Ngữ Âm AI</span>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-black ${
                  analysisResult.isCorrect ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                }`}>
                  {analysisResult.accuracyScore}% Chuẩn
                </span>
              </h3>
              <span className="text-xs font-semibold text-slate-400">
                Động cơ: {analysisResult.source}
              </span>
            </div>

            {/* Breakdown Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
                <div className="text-xs font-black text-indigo-700 flex items-center gap-1.5 uppercase tracking-wider">
                  <Smile className="w-4 h-4" />
                  <span>Lời khuyên khẩu hình miệng:</span>
                </div>
                <p className="text-sm font-bold text-slate-700 leading-relaxed">
                  {analysisResult.mouthGuideTip}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
                <div className="text-xs font-black text-rose-600 flex items-center gap-1.5 uppercase tracking-wider">
                  <AlertCircle className="w-4 h-4" />
                  <span>Lỗi nhận diện được:</span>
                </div>
                {analysisResult.mispronouncedParts.length > 0 ? (
                  <ul className="text-xs sm:text-sm font-bold text-slate-700 space-y-1">
                    {analysisResult.mispronouncedParts.map((err, i) => (
                      <li key={i}>• {err}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm font-bold text-emerald-600">
                    Bé phát âm rất chuẩn, không phát hiện lỗi sai! 🌸
                  </p>
                )}
              </div>
            </div>

            {/* Phonetic Table */}
            {analysisResult.phoneticDetails && analysisResult.phoneticDetails.length > 0 && (
              <div className="overflow-x-auto rounded-2xl border border-slate-200">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-600 font-black">
                    <tr>
                      <th className="p-3">Tiếng / Từ</th>
                      <th className="p-3">Âm đầu</th>
                      <th className="p-3">Vần</th>
                      <th className="p-3">Thanh</th>
                      <th className="p-3">Đánh giá</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-bold">
                    {analysisResult.phoneticDetails.map((p, idx) => (
                      <tr key={idx} className="hover:bg-amber-50/30">
                        <td className="p-3 text-sm font-black text-slate-800">{p.word}</td>
                        <td className="p-3 text-slate-600">{p.onset || '-'}</td>
                        <td className="p-3 text-slate-600">{p.rhyme || '-'}</td>
                        <td className="p-3 text-slate-600">{p.tone || 'ngang'}</td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded-md text-[11px] font-black ${
                            p.status === 'correct'
                              ? 'bg-emerald-100 text-emerald-700'
                              : 'bg-rose-100 text-rose-700'
                          }`}>
                            {p.status === 'correct' ? 'Chuẩn xác' : 'Cần sửa'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
