import React from 'react';
import { Sparkles, Trophy, BookOpen, Mic, School, Volume2, Award } from 'lucide-react';

interface HeaderProps {
  currentTab: 'practice' | 'leaderboard' | 'phonetic-lab' | 'teacher';
  setCurrentTab: (tab: 'practice' | 'leaderboard' | 'phonetic-lab' | 'teacher') => void;
  studentName: string;
  setStudentName: (name: string) => void;
  studentAvatar: string;
  setStudentAvatar: (avatar: string) => void;
  studentPoints: number;
  studentFlowers: number;
  streak: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  setCurrentTab,
  studentName,
  setStudentName,
  studentAvatar,
  setStudentAvatar,
  studentPoints,
  studentFlowers,
  streak,
}) => {
  const avatarList = ['👦', '👧', '🦁', '🐰', '🐼', '🐱', '⭐', '🚀'];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b-2 border-amber-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-2.5 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          
          {/* Logo & School Branding */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentTab('practice')}>
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 via-orange-400 to-rose-400 p-0.5 shadow-md flex items-center justify-center transform hover:scale-105 transition-transform">
              <span className="text-2xl">🌸</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-extrabold text-xs uppercase tracking-wider">
                  Tiếng Việt 1
                </span>
                <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                  Kết Nối Tri Thức
                </span>
              </div>
              <h1 className="text-lg sm:text-xl font-black text-slate-800 tracking-tight leading-tight flex items-center gap-1">
                Bé Vui Đọc <span className="text-rose-500 font-extrabold">Tiếng Việt 1</span>
              </h1>
            </div>
          </div>

          {/* Student Status & Gamification Stats */}
          <div className="flex items-center gap-2 sm:gap-3 bg-amber-50/80 px-3 py-1.5 rounded-2xl border border-amber-200">
            {/* Student avatar selector popup */}
            <div className="flex items-center gap-2">
              <select
                aria-label="Chọn avatar của bé"
                value={studentAvatar}
                onChange={(e) => setStudentAvatar(e.target.value)}
                className="text-2xl bg-white border border-amber-300 rounded-xl px-1 py-0.5 cursor-pointer hover:border-amber-500 transition-colors"
              >
                {avatarList.map((av) => (
                  <option key={av} value={av}>{av}</option>
                ))}
              </select>
              <div className="hidden sm:block">
                <input
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="Tên của bé"
                  className="font-bold text-sm text-slate-800 bg-transparent border-b border-dashed border-amber-400 focus:outline-none focus:border-amber-600 w-28"
                  title="Nhấn để đổi tên học sinh"
                />
                <div className="text-[10px] text-amber-700 font-semibold">Lớp 1A - Trường Tiểu học</div>
              </div>
            </div>

            <div className="h-6 w-px bg-amber-200 mx-1"></div>

            {/* Flowers counter */}
            <div className="flex items-center gap-1.5 px-2 py-1 rounded-xl bg-rose-100/80 text-rose-700 font-black text-sm shadow-inner" title="Hoa điểm 10 bé nhận được">
              <span className="text-base animate-bounce">🌸</span>
              <span>{studentFlowers}</span>
              <span className="hidden md:inline text-xs font-semibold">hoa</span>
            </div>

            {/* Stars & Points */}
            <div className="flex items-center gap-1.5 px-2 py-1 rounded-xl bg-amber-100/80 text-amber-800 font-black text-sm shadow-inner" title="Điểm sao tích lũy">
              <span className="text-base text-amber-500">⭐</span>
              <span>{studentPoints}</span>
            </div>

            {/* Streak */}
            <div className="flex items-center gap-1 px-2 py-1 rounded-xl bg-orange-100/80 text-orange-700 font-black text-xs" title="Chuỗi ngày luyện đọc">
              <span>🔥</span>
              <span>{streak}</span>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex items-center gap-1 w-full sm:w-auto justify-center mt-1 sm:mt-0">
            <button
              onClick={() => setCurrentTab('practice')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-black transition-all ${
                currentTab === 'practice'
                  ? 'bg-rose-500 text-white shadow-md shadow-rose-200 scale-105'
                  : 'text-slate-600 hover:bg-amber-100 hover:text-slate-900'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Bài Học</span>
            </button>

            <button
              onClick={() => setCurrentTab('phonetic-lab')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-black transition-all ${
                currentTab === 'phonetic-lab'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200 scale-105'
                  : 'text-slate-600 hover:bg-amber-100 hover:text-slate-900'
              }`}
            >
              <Mic className="w-4 h-4" />
              <span>Phân Tích Âm AI</span>
            </button>

            <button
              onClick={() => setCurrentTab('leaderboard')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-black transition-all ${
                currentTab === 'leaderboard'
                  ? 'bg-amber-500 text-white shadow-md shadow-amber-200 scale-105'
                  : 'text-slate-600 hover:bg-amber-100 hover:text-slate-900'
              }`}
            >
              <Trophy className="w-4 h-4" />
              <span>Bảng Xếp Hạng</span>
            </button>

            <button
              onClick={() => setCurrentTab('teacher')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-black transition-all ${
                currentTab === 'teacher'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-200 scale-105'
                  : 'text-slate-600 hover:bg-amber-100 hover:text-slate-900'
              }`}
            >
              <School className="w-4 h-4" />
              <span>Góc Giáo Viên</span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};
