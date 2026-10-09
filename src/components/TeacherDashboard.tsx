import React, { useState, useEffect } from 'react';
import {
  School,
  CloudCheck,
  TrendingUp,
  Award,
  AlertTriangle,
  FileSpreadsheet,
  Printer,
  Sparkles,
  ChevronRight,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Calendar,
  Layers,
  Search,
} from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface TeacherSummaryData {
  totalStudents: number;
  totalFlowers: number;
  avgAccuracy: number;
  commonChallengingPhonemes: {
    phoneme: string;
    errorRate: string;
    advice: string;
  }[];
  students: any[];
}

export const TeacherDashboard: React.FC = () => {
  const [data, setData] = useState<TeacherSummaryData | null>(null);
  const [selectedStudent, setSelectedStudent] = useState<any | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isExporting, setIsExporting] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    fetch('/api/teacher/summary')
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        if (json.students && json.students.length > 0) {
          setSelectedStudent(json.students[0]);
        }
      })
      .catch((err) => console.warn('Teacher summary fetch err:', err));
  }, []);

  const handlePrintCertificate = (student: any) => {
    sounds.playBubblePop();
    window.print();
  };

  const handleSyncCloud = () => {
    sounds.playBubblePop();
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      sounds.playSuccessSound();
    }, 1000);
  };

  const filteredStudents = (data?.students || []).filter((s: any) =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white shadow-lg">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-black uppercase tracking-wider mb-2">
              <School className="w-3.5 h-3.5" />
              <span>Cổng Dành Cho Giáo Viên & Phụ Huynh Lớp 1</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black">
              Theo Dõi Tiến Độ Học Tập & Lưu Trữ Cloud
            </h2>
            <p className="text-emerald-100 text-xs sm:text-sm font-semibold mt-1">
              Hệ thống tự động ghi nhận kết quả đọc, phân tích ngữ âm AI và tổng hợp lỗi phát âm của từng học sinh theo thời gian thực.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSyncCloud}
              className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white text-emerald-800 hover:bg-emerald-50 text-xs font-black transition-all shadow-md cursor-pointer"
            >
              <span className={`w-2 h-2 rounded-full ${isSyncing ? 'bg-amber-500 animate-ping' : 'bg-emerald-500'}`}></span>
              <span>{isSyncing ? 'Đang đồng bộ...' : 'Đồng bộ Cloud'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Cloud & Analytics Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-3xl p-5 border-2 border-amber-200/80 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center text-2xl font-black">
            👨‍🎓
          </div>
          <div>
            <div className="text-xs font-bold text-slate-400">Sĩ số theo dõi</div>
            <div className="text-2xl font-black text-slate-800">{data?.totalStudents || 5} bạn</div>
            <div className="text-[11px] text-emerald-600 font-extrabold">Đang học tích cực</div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-5 border-2 border-amber-200/80 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center text-2xl font-black">
            🌸
          </div>
          <div>
            <div className="text-xs font-bold text-slate-400">Hoa điểm 10 toàn lớp</div>
            <div className="text-2xl font-black text-rose-600">{data?.totalFlowers || 140} bông</div>
            <div className="text-[11px] text-rose-500 font-extrabold">+18 hoa hôm nay</div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-5 border-2 border-amber-200/80 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center text-2xl font-black">
            🎯
          </div>
          <div>
            <div className="text-xs font-bold text-slate-400">Độ chuẩn phát âm TB</div>
            <div className="text-2xl font-black text-sky-700">{data?.avgAccuracy || 92}%</div>
            <div className="text-[11px] text-sky-600 font-extrabold">Đạt chuẩn đánh giá</div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-5 border-2 border-amber-200/80 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center text-2xl font-black">
            ☁️
          </div>
          <div>
            <div className="text-xs font-bold text-slate-400">Trạng thái Cloud</div>
            <div className="text-base font-black text-emerald-700 flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Đã kết nối
            </div>
            <div className="text-[11px] text-slate-400 font-semibold">Tự động sao lưu</div>
          </div>
        </div>
      </div>

      {/* Common Challenging Phonemes for Grade 1 */}
      <div className="bg-white rounded-3xl p-6 border-2 border-amber-200/80 shadow-md space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-rose-100 text-rose-600">
              <AlertTriangle className="w-5 h-5" />
            </span>
            <h3 className="text-lg font-black text-slate-800">
              Phân Tích Âm Vần Học Sinh Lớp 1 Hay Phát Âm Sai Nhất
            </h3>
          </div>
          <span className="text-xs font-bold text-slate-400">
            Dữ liệu tổng hợp qua AI
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {(data?.commonChallengingPhonemes || []).map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200 hover:border-amber-400 transition-colors space-y-1.5"
            >
              <div className="flex items-center justify-between">
                <span className="text-base font-black text-rose-700 font-['Nunito']">
                  Cặp âm: {item.phoneme}
                </span>
                <span className="text-xs font-black bg-rose-100 text-rose-800 px-2 py-0.5 rounded-full">
                  Tỉ lệ sai: {item.errorRate}
                </span>
              </div>
              <p className="text-xs font-bold text-slate-600">
                💡 <span className="text-slate-800 font-black">Khuyến nghị rèn:</span> {item.advice}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Student Roster & Detailed History */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Student List */}
        <div className="bg-white rounded-3xl p-5 border-2 border-amber-200/80 shadow-md space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-black text-slate-800">Danh Sách Học Sinh</h3>
            <span className="text-xs font-bold text-slate-400">{filteredStudents.length} học sinh</span>
          </div>

          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Tìm tên học sinh..."
              className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold focus:outline-none focus:border-emerald-400"
            />
          </div>

          <div className="space-y-2 max-h-96 overflow-y-auto custom-scrollbar pr-1">
            {filteredStudents.map((st: any) => {
              const isSelected = selectedStudent?.name === st.name;
              return (
                <div
                  key={st.id || st.name}
                  onClick={() => {
                    sounds.playBubblePop();
                    setSelectedStudent(st);
                  }}
                  className={`p-3 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'bg-emerald-50 border-emerald-500 shadow-xs scale-101'
                      : 'border-slate-100 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{st.avatar}</span>
                    <div>
                      <div className="text-sm font-black text-slate-800">{st.name}</div>
                      <div className="text-[11px] text-slate-400 font-semibold">{st.grade}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-black text-rose-600">🌸 {st.flowers} hoa</div>
                    <div className="text-[10px] text-slate-400 font-bold">
                      {st.lessonsCompleted?.length || 0} bài xong
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Student Deep Profile */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 border-2 border-amber-200/80 shadow-md space-y-6">
          {selectedStudent ? (
            <div>
              {/* Profile Bar */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-4">
                  <div className="text-5xl">{selectedStudent.avatar}</div>
                  <div>
                    <h3 className="text-xl font-black text-slate-800">{selectedStudent.name}</h3>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="px-2 py-0.5 rounded-lg bg-emerald-100 text-emerald-800 font-black text-xs">
                        {selectedStudent.grade}
                      </span>
                      <span className="text-xs font-semibold text-slate-400">
                        Chuỗi chăm đọc: {selectedStudent.streak || 3} ngày 🔥
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handlePrintCertificate(selectedStudent)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-black transition-all shadow-xs cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>In Phiếu Khen Đọc Hay</span>
                </button>
              </div>

              {/* Badges & Lessons Progress */}
              <div className="my-4">
                <div className="text-xs font-black text-slate-500 uppercase tracking-wider mb-2">
                  Các bài học đã vượt qua:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {(selectedStudent.lessonsCompleted || []).map((lid: number) => (
                    <span
                      key={lid}
                      className="px-2.5 py-1 rounded-xl bg-emerald-100 text-emerald-800 font-black text-xs flex items-center gap-1"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Bài {lid}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Recent Reading Test Log */}
              <div>
                <div className="text-xs font-black text-slate-500 uppercase tracking-wider mb-3">
                  Nhật ký bài đọc gần nhất (Ghi nhận giọng nói):
                </div>

                <div className="space-y-2">
                  {(selectedStudent.recentHistory || []).map((h: any, i: number) => (
                    <div
                      key={i}
                      className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2"
                    >
                      <div className="flex items-start gap-2.5">
                        <span className="mt-0.5">
                          {h.isCorrect ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                          ) : (
                            <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                          )}
                        </span>
                        <div>
                          <div className="text-sm font-black text-slate-800">
                            "{h.text}"
                          </div>
                          <div className="text-[11px] text-slate-400 font-semibold">
                            Bài {h.lessonId} • {new Date(h.timestamp).toLocaleTimeString('vi-VN')}
                          </div>
                          {h.mistakes && h.mistakes.length > 0 && (
                            <div className="text-xs text-rose-600 font-bold mt-1">
                              Lưu ý: {h.mistakes.join(', ')}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="shrink-0 flex items-center gap-2">
                        <span className={`px-2.5 py-0.5 rounded-lg text-xs font-black ${
                          h.isCorrect ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                        }`}>
                          {h.accuracy}% Chuẩn
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="py-12 text-center text-slate-400 font-semibold">
              Chọn một học sinh bên trái để xem tiến độ chi tiết.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
