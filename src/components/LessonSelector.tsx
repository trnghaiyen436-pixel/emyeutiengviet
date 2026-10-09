import React, { useState } from 'react';
import { LESSONS_DATA, Lesson } from '../data/lessonsData';
import { Search, Sparkles, BookOpen, ChevronRight, CheckCircle2 } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface LessonSelectorProps {
  currentLessonId: number;
  onSelectLesson: (lessonId: number) => void;
  completedLessons: number[];
}

export const LessonSelector: React.FC<LessonSelectorProps> = ({
  currentLessonId,
  onSelectLesson,
  completedLessons,
}) => {
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredLessons = LESSONS_DATA.filter((lesson) => {
    const matchesFilter = filterCategory === 'all' || lesson.category === filterCategory;
    const matchesSearch =
      searchQuery === '' ||
      lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lesson.id.toString() === searchQuery.trim() ||
      lesson.targetSounds.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  const handleSelect = (id: number) => {
    sounds.playBubblePop();
    onSelectLesson(id);
  };

  return (
    <div className="bg-white rounded-3xl p-4 sm:p-6 border-2 border-amber-200/80 shadow-md">
      {/* Title & Direct Lesson Number Selector */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-amber-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-2xl bg-rose-100 text-rose-600">
              <BookOpen className="w-5 h-5" />
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-800">
              Chọn Bài Học Tiếng Việt 1
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 font-semibold mt-1">
            Chương trình Tiếng Việt 1 - Kết nối tri thức với cuộc sống (Tập 1)
          </p>
        </div>

        {/* Quick Jump by Lesson Number */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <label htmlFor="quick-lesson-select" className="text-xs font-black text-amber-800 uppercase tracking-wider shrink-0">
            Chọn bài số:
          </label>
          <select
            id="quick-lesson-select"
            value={currentLessonId}
            onChange={(e) => handleSelect(Number(e.target.value))}
            className="flex-1 md:w-44 px-3 py-2 bg-amber-50 border-2 border-amber-300 rounded-2xl font-black text-slate-800 text-sm focus:outline-none focus:border-rose-400 focus:bg-white transition-all shadow-sm cursor-pointer"
          >
            {LESSONS_DATA.map((l) => (
              <option key={l.id} value={l.id}>
                Bài {l.id}: {l.shortLabel} (Trang {l.pageNumber})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Filter Chips & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 my-4">
        <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
          {[
            { id: 'all', label: '🌟 Tất Cả Bài' },
            { id: 'chữ_cái', label: '🔤 Âm & Chữ Cái' },
            { id: 'vần_đơn', label: '🧩 Âm Đầu Ghép' },
            { id: 'vần_ghép', label: '📚 Vần Ghép' },
            { id: 'ôn_tập', label: '🏆 Ôn Tập & Kể Chuyện' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                sounds.playBubblePop();
                setFilterCategory(cat.id);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                filterCategory === cat.id
                  ? 'bg-rose-500 text-white shadow-sm shadow-rose-200'
                  : 'bg-amber-50 text-slate-600 hover:bg-amber-100 hover:text-slate-900 border border-amber-200/60'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Quick Search */}
        <div className="relative w-full sm:w-56">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm theo số bài, chữ cái..."
            className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-amber-200 bg-amber-50/50 text-xs font-bold text-slate-700 focus:outline-none focus:bg-white focus:border-amber-400"
          />
        </div>
      </div>

      {/* Grid of Lessons */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5 max-h-72 overflow-y-auto p-1 custom-scrollbar">
        {filteredLessons.map((lesson) => {
          const isSelected = lesson.id === currentLessonId;
          const isCompleted = completedLessons.includes(lesson.id);

          return (
            <button
              key={lesson.id}
              onClick={() => handleSelect(lesson.id)}
              className={`relative text-left p-3 rounded-2xl border-2 transition-all cursor-pointer group flex flex-col justify-between ${
                isSelected
                  ? 'bg-gradient-to-b from-rose-50 to-amber-50 border-rose-500 shadow-md scale-102 ring-2 ring-rose-300 ring-offset-1'
                  : 'bg-white border-amber-100 hover:border-amber-300 hover:bg-amber-50/40 shadow-xs'
              }`}
            >
              {/* Badge top */}
              <div className="flex items-center justify-between w-full mb-1">
                <span className={`text-[11px] font-black px-2 py-0.5 rounded-lg text-white ${lesson.badgeColor}`}>
                  Bài {lesson.id}
                </span>
                {isCompleted ? (
                  <span className="text-emerald-500 text-xs" title="Đã hoàn thành">
                    <CheckCircle2 className="w-4 h-4 inline fill-emerald-100" />
                  </span>
                ) : (
                  <span className="text-amber-400 text-xs">⭐</span>
                )}
              </div>

              {/* Target Sounds big display */}
              <div className="my-1">
                <div className="text-base sm:text-lg font-black text-slate-800 tracking-wide font-['Nunito']">
                  {lesson.shortLabel}
                </div>
                <div className="text-[11px] text-slate-400 font-semibold">
                  Trang {lesson.pageNumber}
                </div>
              </div>

              {/* Bottom context emoji */}
              <div className="mt-1 flex items-center justify-between text-xs pt-1 border-t border-slate-100">
                <span className="text-base">{lesson.recognitionSentence.contextImage}</span>
                <span className={`text-[10px] font-bold ${isSelected ? 'text-rose-600' : 'text-slate-400 group-hover:text-amber-600'}`}>
                  Luyện đọc →
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
