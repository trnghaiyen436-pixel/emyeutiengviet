import React, { useState } from 'react';
import { X, User, School, Sparkles, Check, Heart, BookOpen } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface StudentProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  studentName: string;
  studentGrade: string;
  studentSchool: string;
  studentAvatar: string;
  onSave: (name: string, grade: string, school: string, avatar: string) => void;
}

const AVATAR_OPTIONS = [
  { emoji: '👦', label: 'Bé trai' },
  { emoji: '👧', label: 'Bé gái' },
  { emoji: '🦁', label: 'Sư tử nhí' },
  { emoji: '🐰', label: 'Thỏ trắng' },
  { emoji: '🐼', label: 'Gấu trúc' },
  { emoji: '🐱', label: 'Mèo con' },
  { emoji: '⭐', label: 'Ngôi sao' },
  { emoji: '🚀', label: 'Phi hành gia' },
  { emoji: '🦄', label: 'Kỳ lân' },
  { emoji: '🦖', label: 'Khủng long' },
  { emoji: '🐝', label: 'Ong chăm chỉ' },
  { emoji: '🌸', label: 'Bông hoa' },
];

const GRADE_SUGGESTIONS = ['Lớp 1A', 'Lớp 1B', 'Lớp 1C', 'Lớp 1D', 'Lớp 1E', 'Lớp 1G'];

const SCHOOL_SUGGESTIONS = [
  'Tiểu học Lê Quý Đôn',
  'Tiểu học Kim Đồng',
  'Tiểu học Chu Văn An',
  'Tiểu học Nguyễn Du',
  'Tiểu học Đoàn Thị Điểm',
  'Tiểu học Trưng Vương',
];

export const StudentProfileModal: React.FC<StudentProfileModalProps> = ({
  isOpen,
  onClose,
  studentName,
  studentGrade,
  studentSchool,
  studentAvatar,
  onSave,
}) => {
  const [name, setName] = useState(studentName);
  const [grade, setGrade] = useState(studentGrade || 'Lớp 1A');
  const [school, setSchool] = useState(studentSchool || 'Tiểu học Lê Quý Đôn');
  const [avatar, setAvatar] = useState(studentAvatar || '👦');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalName = name.trim() || 'Bé Lê Bảo Nam';
    const finalGrade = grade.trim() || 'Lớp 1A';
    const finalSchool = school.trim() || 'Tiểu học Lê Quý Đôn';

    sounds.playSuccessSound();
    onSave(finalName, finalGrade, finalSchool, avatar);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 border-4 border-amber-300 shadow-2xl relative overflow-hidden">
        {/* Decorative corner flower */}
        <div className="absolute -top-4 -right-4 text-6xl opacity-15 pointer-events-none select-none">
          🌸
        </div>

        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-amber-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 to-rose-400 flex items-center justify-center text-2xl shadow-md">
              📝
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-800">
                Thông Tin Học Sinh
              </h2>
              <p className="text-xs text-slate-500 font-bold">
                Điền tên, lớp, trường để cô giáo theo dõi tiến độ
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          {/* Avatar Picker */}
          <div>
            <label className="text-xs font-black text-slate-700 uppercase tracking-wider block mb-2">
              Chọn nhân vật đại diện của bé:
            </label>
            <div className="grid grid-cols-6 gap-2 p-2 bg-amber-50/60 rounded-2xl border border-amber-200">
              {AVATAR_OPTIONS.map((item) => (
                <button
                  type="button"
                  key={item.emoji}
                  onClick={() => {
                    sounds.playBubblePop();
                    setAvatar(item.emoji);
                  }}
                  className={`text-2xl p-2 rounded-xl transition-all flex flex-col items-center cursor-pointer ${
                    avatar === item.emoji
                      ? 'bg-rose-500 text-white scale-110 shadow-md ring-2 ring-rose-300'
                      : 'hover:bg-amber-100/80'
                  }`}
                  title={item.label}
                >
                  <span>{item.emoji}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Student Name */}
          <div>
            <label className="text-xs font-black text-slate-700 uppercase tracking-wider block mb-1.5 flex items-center gap-1.5">
              <User className="w-4 h-4 text-rose-500" />
              <span>Họ và tên của bé:</span>
              <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ví dụ: Lê Bảo Nam, Trần Thu Hà..."
              className="w-full px-4 py-2.5 rounded-2xl border-2 border-amber-200 bg-amber-50/30 text-sm font-black text-slate-800 focus:outline-none focus:border-rose-400 focus:bg-white transition-all"
            />
          </div>

          {/* Student Class / Grade */}
          <div>
            <label className="text-xs font-black text-slate-700 uppercase tracking-wider block mb-1.5 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-sky-500" />
              <span>Lớp học:</span>
              <span className="text-rose-500">*</span>
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                required
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                placeholder="Ví dụ: Lớp 1A"
                className="flex-1 px-4 py-2.5 rounded-2xl border-2 border-amber-200 bg-amber-50/30 text-sm font-black text-slate-800 focus:outline-none focus:border-sky-400 focus:bg-white transition-all"
              />
            </div>
            {/* Quick chips for class */}
            <div className="flex flex-wrap gap-1.5 mt-2">
              {GRADE_SUGGESTIONS.map((g) => (
                <button
                  type="button"
                  key={g}
                  onClick={() => {
                    sounds.playBubblePop();
                    setGrade(g);
                  }}
                  className={`px-2.5 py-1 rounded-xl text-xs font-extrabold cursor-pointer transition-all ${
                    grade === g
                      ? 'bg-sky-500 text-white shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          {/* School Name */}
          <div>
            <label className="text-xs font-black text-slate-700 uppercase tracking-wider block mb-1.5 flex items-center gap-1.5">
              <School className="w-4 h-4 text-emerald-500" />
              <span>Trường Tiểu học:</span>
              <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={school}
              onChange={(e) => setSchool(e.target.value)}
              placeholder="Ví dụ: Tiểu học Lê Quý Đôn"
              className="w-full px-4 py-2.5 rounded-2xl border-2 border-amber-200 bg-amber-50/30 text-sm font-black text-slate-800 focus:outline-none focus:border-emerald-400 focus:bg-white transition-all"
            />
            {/* Quick suggestions for school */}
            <div className="flex flex-wrap gap-1.5 mt-2">
              {SCHOOL_SUGGESTIONS.map((sch) => (
                <button
                  type="button"
                  key={sch}
                  onClick={() => {
                    sounds.playBubblePop();
                    setSchool(sch);
                  }}
                  className={`px-2.5 py-1 rounded-xl text-[11px] font-bold cursor-pointer transition-all ${
                    school === sch
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200'
                  }`}
                >
                  {sch}
                </button>
              ))}
            </div>
          </div>

          {/* Pedagogical Note */}
          <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 text-xs font-semibold text-amber-900 flex items-start gap-2">
            <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <span>
              Thông tin này được tự động lưu trữ trên Cloud và đồng bộ vào bảng theo dõi tiến độ của thầy cô giáo và phụ huynh!
            </span>
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-bold transition-all cursor-pointer"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white text-sm font-black shadow-md shadow-rose-200 transition-all cursor-pointer transform active:scale-95"
            >
              <Check className="w-4 h-4" />
              <span>Lưu Thông Tin Của Bé</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
