import React, { useState, useEffect } from 'react';
import { Trophy, Medal, Award, Flame, Sparkles, Star, Users, RefreshCw } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface StudentLeaderboardItem {
  id: string;
  name: string;
  avatar: string;
  grade: string;
  school?: string;
  points: number;
  flowers: number;
  lessonsCompleted: number[];
  streak: number;
}

interface LeaderboardViewProps {
  currentStudentName: string;
  currentStudentGrade: string;
  currentStudentSchool: string;
  currentStudentAvatar: string;
  currentStudentPoints: number;
  currentStudentFlowers: number;
  currentStreak: number;
}

export const LeaderboardView: React.FC<LeaderboardViewProps> = ({
  currentStudentName,
  currentStudentGrade,
  currentStudentSchool,
  currentStudentAvatar,
  currentStudentPoints,
  currentStudentFlowers,
  currentStreak,
}) => {
  const [students, setStudents] = useState<StudentLeaderboardItem[]>([]);
  const [gradeFilter, setGradeFilter] = useState<'all' | 'Lớp 1A' | 'Lớp 1B'>('all');
  const [isLoading, setIsLoading] = useState(false);

  const fetchLeaderboard = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/leaderboard');
      const data = await res.json();
      if (data && data.students) {
        setStudents(data.students);
      }
    } catch (err) {
      console.warn('Failed to fetch leaderboard:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
  }, [currentStudentPoints, currentStudentFlowers]);

  // Merge current student if not present
  const allStudents = [...students];
  const existingIndex = allStudents.findIndex(
    (s) => s.name.toLowerCase() === currentStudentName.toLowerCase()
  );

  if (existingIndex >= 0) {
    allStudents[existingIndex] = {
      ...allStudents[existingIndex],
      grade: currentStudentGrade,
      school: currentStudentSchool,
      points: Math.max(allStudents[existingIndex].points, currentStudentPoints),
      flowers: Math.max(allStudents[existingIndex].flowers, currentStudentFlowers),
      streak: Math.max(allStudents[existingIndex].streak, currentStreak),
      avatar: currentStudentAvatar,
    };
  } else {
    allStudents.push({
      id: 'current-user',
      name: currentStudentName,
      avatar: currentStudentAvatar,
      grade: currentStudentGrade,
      school: currentStudentSchool,
      points: currentStudentPoints,
      flowers: currentStudentFlowers,
      lessonsCompleted: [1, 2],
      streak: currentStreak,
    });
  }

  // Sort descending by points
  const sortedStudents = allStudents
    .filter((s) => (gradeFilter === 'all' ? true : s.grade === gradeFilter))
    .sort((a, b) => b.points - a.points);

  const top3 = sortedStudents.slice(0, 3);
  const rest = sortedStudents.slice(3);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-white shadow-lg">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-black uppercase tracking-wider mb-2">
              <Trophy className="w-3.5 h-3.5 text-yellow-200" />
              <span>Thi Đua Rèn Đọc Chuẩn Lớp 1</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black">
              Bảng Vàng Danh Dự & Xếp Loại Cộng Đồng
            </h2>
            <p className="text-amber-100 text-xs sm:text-sm font-semibold mt-1">
              Mỗi từ đọc đúng con sẽ nhận được 20 điểm sao ⭐ và 1 bông hoa điểm 10 🌸 để cùng thi đua học giỏi!
            </p>
          </div>

          <button
            onClick={() => {
              sounds.playBubblePop();
              fetchLeaderboard();
            }}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-white/20 hover:bg-white/30 backdrop-blur-md text-white text-xs font-black transition-all cursor-pointer"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            <span>Cập nhật bảng xếp hạng</span>
          </button>
        </div>
      </div>

      {/* Class filter tabs */}
      <div className="flex items-center gap-2">
        <span className="text-xs font-black text-slate-500 uppercase tracking-wider flex items-center gap-1">
          <Users className="w-4 h-4 text-amber-600" />
          <span>Xem theo:</span>
        </span>
        {[
          { id: 'all', label: 'Toàn Khối 1' },
          { id: 'Lớp 1A', label: 'Lớp 1A' },
          { id: 'Lớp 1B', label: 'Lớp 1B' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              sounds.playBubblePop();
              setGradeFilter(tab.id as any);
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
              gradeFilter === tab.id
                ? 'bg-amber-500 text-white shadow-sm shadow-amber-200'
                : 'bg-white border border-amber-200 text-slate-600 hover:bg-amber-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Top 3 Podium Cards */}
      {top3.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
          {/* Rank 2 */}
          {top3[1] && (
            <div className="bg-white rounded-3xl p-5 border-2 border-slate-200 shadow-md flex flex-col items-center text-center relative order-2 md:order-1 hover:scale-102 transition-transform">
              <div className="absolute -top-3 bg-slate-300 text-slate-800 text-xs font-black px-3 py-0.5 rounded-full shadow-xs flex items-center gap-1">
                <span>🥈 Hạng 2</span>
              </div>
              <div className="text-5xl mt-3 mb-2">{top3[1].avatar}</div>
              <h3 className="text-base font-black text-slate-800">{top3[1].name}</h3>
              <span className="text-xs font-bold text-slate-500">{top3[1].grade} • {top3[1].school || 'Tiểu học Lê Quý Đôn'}</span>
              <div className="mt-4 flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-xl bg-amber-100 text-amber-800 text-xs font-black">
                  ⭐ {top3[1].points}
                </span>
                <span className="px-2.5 py-1 rounded-xl bg-rose-100 text-rose-700 text-xs font-black">
                  🌸 {top3[1].flowers} hoa
                </span>
              </div>
            </div>
          )}

          {/* Rank 1 - Champion */}
          {top3[0] && (
            <div className="bg-gradient-to-b from-amber-50 via-white to-amber-50/40 rounded-3xl p-6 border-3 border-amber-400 shadow-xl flex flex-col items-center text-center relative order-1 md:order-2 md:-translate-y-2 hover:scale-102 transition-transform">
              <div className="absolute -top-3.5 bg-gradient-to-r from-amber-400 to-yellow-500 text-yellow-950 text-xs font-black px-4 py-1 rounded-full shadow-md flex items-center gap-1">
                <Trophy className="w-3.5 h-3.5" />
                <span>👑 Quán Quân Lớp 1</span>
              </div>
              <div className="relative mt-2 mb-2">
                <div className="text-6xl">{top3[0].avatar}</div>
                <div className="absolute -bottom-1 -right-1 text-2xl animate-spin">
                  ⭐
                </div>
              </div>
              <h3 className="text-lg font-black text-slate-800">{top3[0].name}</h3>
              <span className="text-xs font-bold text-amber-800">{top3[0].grade} • {top3[0].school || 'Tiểu học Lê Quý Đôn'}</span>
              <div className="mt-4 flex items-center gap-2">
                <span className="px-3 py-1 rounded-xl bg-amber-400 text-yellow-950 text-sm font-black shadow-xs">
                  ⭐ {top3[0].points} điểm
                </span>
                <span className="px-3 py-1 rounded-xl bg-rose-500 text-white text-sm font-black shadow-xs">
                  🌸 {top3[0].flowers} hoa
                </span>
              </div>
              <div className="mt-2 text-xs font-black text-orange-600 flex items-center gap-1">
                <Flame className="w-4 h-4 fill-orange-500" />
                <span>Chuỗi {top3[0].streak} ngày chăm đọc!</span>
              </div>
            </div>
          )}

          {/* Rank 3 */}
          {top3[2] && (
            <div className="bg-white rounded-3xl p-5 border-2 border-amber-200/70 shadow-md flex flex-col items-center text-center relative order-3 hover:scale-102 transition-transform">
              <div className="absolute -top-3 bg-amber-700 text-white text-xs font-black px-3 py-0.5 rounded-full shadow-xs flex items-center gap-1">
                <span>🥉 Hạng 3</span>
              </div>
              <div className="text-5xl mt-3 mb-2">{top3[2].avatar}</div>
              <h3 className="text-base font-black text-slate-800">{top3[2].name}</h3>
              <span className="text-xs font-bold text-slate-500">{top3[2].grade} • {top3[2].school || 'Tiểu học Lê Quý Đôn'}</span>
              <div className="mt-4 flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-xl bg-amber-100 text-amber-800 text-xs font-black">
                  ⭐ {top3[2].points}
                </span>
                <span className="px-2.5 py-1 rounded-xl bg-rose-100 text-rose-700 text-xs font-black">
                  🌸 {top3[2].flowers} hoa
                </span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Full Leaderboard Table */}
      <div className="bg-white rounded-3xl border-2 border-amber-200/80 shadow-md overflow-hidden">
        <div className="p-4 bg-amber-50/60 border-b border-amber-100 flex items-center justify-between">
          <span className="text-xs font-black text-slate-700 uppercase tracking-wider">
            Danh sách xếp hạng lớp
          </span>
          <span className="text-xs font-bold text-slate-400">
            Tổng cộng: {sortedStudents.length} học sinh
          </span>
        </div>

        <div className="divide-y divide-slate-100">
          {sortedStudents.map((st, index) => {
            const isMe = st.name.toLowerCase() === currentStudentName.toLowerCase();
            return (
              <div
                key={st.id || index}
                className={`p-4 flex items-center justify-between gap-3 transition-colors ${
                  isMe ? 'bg-rose-50/60 font-black' : 'hover:bg-amber-50/40'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-xs ${
                    index === 0
                      ? 'bg-amber-400 text-amber-950 font-black'
                      : index === 1
                      ? 'bg-slate-300 text-slate-800'
                      : index === 2
                      ? 'bg-amber-700 text-white'
                      : 'bg-slate-100 text-slate-500'
                  }`}>
                    {index + 1}
                  </div>
                  <div className="text-2xl">{st.avatar}</div>
                  <div>
                    <div className="text-sm font-black text-slate-800 flex items-center gap-2">
                      <span>{st.name}</span>
                      {isMe && (
                        <span className="px-2 py-0.5 rounded-full bg-rose-500 text-white text-[10px] uppercase">
                          Bé nè
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-slate-400 font-semibold">{st.grade} • {st.school || 'Tiểu học Lê Quý Đôn'}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 text-xs font-black text-rose-600 bg-rose-50 px-2.5 py-1 rounded-xl">
                    <span>🌸</span>
                    <span>{st.flowers} hoa</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm font-black text-amber-700 bg-amber-50 px-3 py-1 rounded-xl">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
                    <span>{st.points}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
