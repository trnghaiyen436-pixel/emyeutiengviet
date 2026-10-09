import React, { useState } from 'react';
import { LESSONS_DATA } from './data/lessonsData';
import { Header } from './components/Header';
import { LessonSelector } from './components/LessonSelector';
import { PracticeArena } from './components/PracticeArena';
import { PhoneticLab } from './components/PhoneticLab';
import { LeaderboardView } from './components/LeaderboardView';
import { TeacherDashboard } from './components/TeacherDashboard';
import { sounds } from './utils/soundEffects';
import { Sparkles, BookOpen, Volume2, Award, Heart, HelpCircle, ShieldCheck } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<'practice' | 'leaderboard' | 'phonetic-lab' | 'teacher'>('practice');
  const [currentLessonId, setCurrentLessonId] = useState<number>(1);
  const [completedLessons, setCompletedLessons] = useState<number[]>([1]);

  // Student Profile State
  const [studentName, setStudentName] = useState<string>('Bé Lê Bảo Nam');
  const [studentAvatar, setStudentAvatar] = useState<string>('👦');
  const [studentPoints, setStudentPoints] = useState<number>(240);
  const [studentFlowers, setStudentFlowers] = useState<number>(12);
  const [streak, setStreak] = useState<number>(3);

  const currentLesson = LESSONS_DATA.find((l) => l.id === currentLessonId) || LESSONS_DATA[0];

  const handleSuccessRead = (earnedPoints: number, earnedFlowers: number) => {
    setStudentPoints((prev) => prev + earnedPoints);
    setStudentFlowers((prev) => prev + earnedFlowers);
    setCompletedLessons((prev) => (prev.includes(currentLessonId) ? prev : [...prev, currentLessonId]));
  };

  const handleSelectLesson = (id: number) => {
    setCurrentLessonId(id);
    setCurrentTab('practice');
  };

  const handleGoToNextLesson = () => {
    sounds.playSuccessSound();
    const currentIndex = LESSONS_DATA.findIndex((l) => l.id === currentLessonId);
    if (currentIndex < LESSONS_DATA.length - 1) {
      const nextLesson = LESSONS_DATA[currentIndex + 1];
      setCurrentLessonId(nextLesson.id);
    } else {
      setCurrentLessonId(LESSONS_DATA[0].id);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFDF7] text-slate-800 flex flex-col font-['Nunito',sans-serif]">
      {/* Header with gamification counters & tab switches */}
      <Header
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        studentName={studentName}
        setStudentName={setStudentName}
        studentAvatar={studentAvatar}
        setStudentAvatar={setStudentAvatar}
        studentPoints={studentPoints}
        studentFlowers={studentFlowers}
        streak={streak}
      />

      {/* Main Content Arena */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        
        {currentTab === 'practice' && (
          <div className="space-y-6">
            {/* Direct Lesson Picker Selector */}
            <LessonSelector
              currentLessonId={currentLessonId}
              onSelectLesson={handleSelectLesson}
              completedLessons={completedLessons}
            />

            {/* Interactive Game Reading Arena */}
            <PracticeArena
              lesson={currentLesson}
              studentName={studentName}
              studentAvatar={studentAvatar}
              onSuccessRead={handleSuccessRead}
              onGoToNextLesson={handleGoToNextLesson}
            />
          </div>
        )}

        {currentTab === 'phonetic-lab' && (
          <PhoneticLab
            studentName={studentName}
            studentAvatar={studentAvatar}
          />
        )}

        {currentTab === 'leaderboard' && (
          <LeaderboardView
            currentStudentName={studentName}
            currentStudentAvatar={studentAvatar}
            currentStudentPoints={studentPoints}
            currentStudentFlowers={studentFlowers}
            currentStreak={streak}
          />
        )}

        {currentTab === 'teacher' && (
          <TeacherDashboard />
        )}
      </main>

      {/* Primary-school Friendly Footer */}
      <footer className="mt-auto border-t-2 border-amber-200/60 bg-amber-50/60 py-6 px-4 pb-14 sm:pb-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <span className="text-3xl">🌸</span>
            <div>
              <div className="text-sm font-black text-slate-800">
                Bé Vui Đọc Tiếng Việt 1 - Kết Nối Tri Thức Với Cuộc Sống
              </div>
              <div className="text-xs text-slate-500 font-semibold">
                Ứng dụng trò chơi rèn đọc, nhận diện phát âm AI và theo dõi tiến độ học tập cho học sinh lớp 1
              </div>
              {/* Thông tin tác giả chữ thư pháp ở góc dưới bên trái */}
              <div className="font-calligraphy text-base sm:text-lg text-rose-700 font-semibold mt-1">
                Tác giả: Trương Thị Hải Yến • <a href="tel:0935661268" className="hover:text-rose-900 underline decoration-amber-400">0935661268</a>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-bold text-slate-500">
            <span className="flex items-center gap-1 text-emerald-700 bg-emerald-100/70 px-2.5 py-1 rounded-full">
              <ShieldCheck className="w-3.5 h-3.5" />
              Chuẩn SGK Tiếng Việt 1
            </span>
            <span>Trí tuệ nhân tạo Gemini AI 3.8</span>
          </div>
        </div>
      </footer>

      {/* Tác giả chữ thư pháp cố định ở góc dưới bên trái màn hình (tương thích điện thoại & máy tính) */}
      <aside aria-label="Thông tin tác giả" className="fixed bottom-2 left-2 sm:bottom-3 sm:left-3 z-30 pointer-events-auto max-w-[calc(100vw-1rem)]">
        <div className="bg-white/92 hover:bg-white backdrop-blur-md px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-2xl border border-amber-300 shadow-md shadow-amber-900/10 transition-all flex items-center gap-1.5 group">
          <span className="text-xs sm:text-sm select-none">🪶</span>
          <div className="font-calligraphy text-sm sm:text-base md:text-lg text-rose-800 font-semibold tracking-wide whitespace-nowrap leading-none flex items-center gap-1 sm:gap-1.5">
            <span>Tác giả: Trương Thị Hải Yến</span>
            <span className="text-amber-500 font-normal">•</span>
            <a
              href="tel:0935661268"
              className="text-amber-900 hover:text-rose-600 transition-colors underline decoration-amber-300 decoration-dotted underline-offset-2"
              title="Nhấn để gọi: 0935661268"
            >
              0935661268
            </a>
          </div>
        </div>
      </aside>
    </div>
  );
}
