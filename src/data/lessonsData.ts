export interface PhoneticAnalysisGuide {
  onset: string; // Âm đầu
  rhyme: string; // Vần
  tone: string;  // Thanh
  spellingSteps: string; // Đánh vần từng bước: ví dụ "b - a - ba", "c - a - ca - sắc - cá"
  tip: string;   // Hướng dẫn mở khẩu hình cho bé 6 tuổi
}

export interface VocabularyItem {
  id: string;
  word: string;
  phonetics: PhoneticAnalysisGuide;
  illustrationEmoji: string;
  illustrationKeyword: string;
  illustrationSvgBg: string;
  difficulty: 'easy' | 'medium' | 'hard';
  exampleSentence: string;
}

export interface Lesson {
  id: number;
  title: string;
  shortLabel: string;
  category: 'chữ_cái' | 'dấu_thanh' | 'vần_đơn' | 'vần_ghép' | 'ôn_tập';
  pageNumber: number;
  badgeColor: string;
  accentBg: string;
  targetSounds: string[];
  recognitionSentence: {
    sentence: string;
    highlightWords: string[];
    contextImage: string;
  };
  level1Sounds: string[]; // Cấp 1: Nhận diện âm & chữ cái
  level2Vocab: VocabularyItem[]; // Cấp 2: Đọc từ ngữ & đánh vần
  level3Sentences: string[]; // Cấp 3: Đọc câu
  level4Story: {
    title: string;
    paragraphs: string[];
    author?: string;
  };
}

export const LESSONS_DATA: Lesson[] = [
  {
    id: 1,
    title: 'Bài 1: A a',
    shortLabel: 'A a',
    category: 'chữ_cái',
    pageNumber: 14,
    badgeColor: 'bg-emerald-500',
    accentBg: 'from-emerald-100 to-teal-50',
    targetSounds: ['A', 'a'],
    recognitionSentence: {
      sentence: 'Nam và Hà ca hát.',
      highlightWords: ['ca', 'hát'],
      contextImage: '🎤'
    },
    level1Sounds: ['A', 'a'],
    level2Vocab: [
      {
        id: '1-1',
        word: 'a',
        phonetics: { onset: '', rhyme: 'a', tone: 'ngang', spellingSteps: 'a', tip: 'Mở rộng miệng tự nhiên, phát âm to rõ: A!' },
        illustrationEmoji: '🅰️',
        illustrationKeyword: 'Chữ A',
        illustrationSvgBg: 'bg-emerald-100',
        difficulty: 'easy',
        exampleSentence: 'A! Bông hoa đẹp quá!'
      },
      {
        id: '1-2',
        word: 'ca hát',
        phonetics: { onset: 'c / h', rhyme: 'a / at', tone: 'ngang / sắc', spellingSteps: 'c-a-ca, h-at-hat-sắc-hát', tip: 'Bé mở to miệng tươi cười khi đọc ca hát.' },
        illustrationEmoji: '🎵',
        illustrationKeyword: 'Ca hát',
        illustrationSvgBg: 'bg-teal-100',
        difficulty: 'medium',
        exampleSentence: 'Nam và Hà ca hát vui vẻ.'
      }
    ],
    level3Sentences: [
      'Nam và Hà ca hát.',
      'A! Bông hoa nở rồi.'
    ],
    level4Story: {
      title: 'Chào em vào lớp 1',
      paragraphs: [
        'Hôm nay là ngày khai giảng rực rỡ.',
        'Nam và Hà hớn hở đến trường mới.',
        'Các bạn nhỏ cùng nhau ca hát đón năm học mới.'
      ]
    }
  },
  {
    id: 2,
    title: 'Bài 2: B b, dấu huyền ( \\ )',
    shortLabel: 'B b ( \\ )',
    category: 'chữ_cái',
    pageNumber: 16,
    badgeColor: 'bg-sky-500',
    accentBg: 'from-sky-100 to-blue-50',
    targetSounds: ['B', 'b', 'dấu huyền'],
    recognitionSentence: {
      sentence: 'Bà cho bé búp bê.',
      highlightWords: ['Bà', 'bé', 'búp', 'bê'],
      contextImage: '👵'
    },
    level1Sounds: ['b', 'ba', 'bà'],
    level2Vocab: [
      {
        id: '2-1',
        word: 'ba',
        phonetics: { onset: 'b', rhyme: 'a', tone: 'ngang', spellingSteps: 'b - a - ba', tip: 'Mím nhẹ hai môi rồi bật hơi âm b, mở miệng âm a.' },
        illustrationEmoji: '👨',
        illustrationKeyword: 'Ba (bố)',
        illustrationSvgBg: 'bg-blue-100',
        difficulty: 'easy',
        exampleSentence: 'Ba dắt tay bé đi dạo.'
      },
      {
        id: '2-2',
        word: 'bà',
        phonetics: { onset: 'b', rhyme: 'a', tone: 'huyền', spellingSteps: 'b - a - ba - huyền - bà', tip: 'Hạ giọng trầm xuống một chút khi có dấu huyền.' },
        illustrationEmoji: '👵',
        illustrationKeyword: 'Bà ngoại',
        illustrationSvgBg: 'bg-amber-100',
        difficulty: 'easy',
        exampleSentence: 'Bà yêu thương bé nhất nhà.'
      },
      {
        id: '2-3',
        word: 'ba ba',
        phonetics: { onset: 'b', rhyme: 'a', tone: 'ngang', spellingSteps: 'ba - ba', tip: 'Đọc đều nhịp hai tiếng ba ba.' },
        illustrationEmoji: '🐢',
        illustrationKeyword: 'Con ba ba',
        illustrationSvgBg: 'bg-emerald-100',
        difficulty: 'medium',
        exampleSentence: 'Con ba ba bơi dưới ao sen.'
      }
    ],
    level3Sentences: [
      'Bà cho bé búp bê.',
      'A, bà!'
    ],
    level4Story: {
      title: 'Bà và bé',
      paragraphs: [
        'Bà đi chợ về mua quà cho bé.',
        'Bé chạy ùa ra reo: A, bà đã về!',
        'Bà tươi cười ôm bé vào lòng và cho bé búp bê xinh.'
      ]
    }
  },
  {
    id: 3,
    title: 'Bài 3: C c, dấu sắc ( / )',
    shortLabel: 'C c ( / )',
    category: 'chữ_cái',
    pageNumber: 18,
    badgeColor: 'bg-rose-500',
    accentBg: 'from-rose-100 to-pink-50',
    targetSounds: ['C', 'c', 'dấu sắc'],
    recognitionSentence: {
      sentence: 'Nam và bố câu cá.',
      highlightWords: ['câu', 'cá'],
      contextImage: '🎣'
    },
    level1Sounds: ['c', 'ca', 'cà', 'cá'],
    level2Vocab: [
      {
        id: '3-1',
        word: 'ca',
        phonetics: { onset: 'c', rhyme: 'a', tone: 'ngang', spellingSteps: 'c - a - ca', tip: 'Cuống lưỡi nâng lên chạm vòm miệng rồi bật âm c.' },
        illustrationEmoji: '🥛',
        illustrationKeyword: 'Ca nước',
        illustrationSvgBg: 'bg-slate-100',
        difficulty: 'easy',
        exampleSentence: 'Bé rót nước vào chiếc ca nhỏ.'
      },
      {
        id: '3-2',
        word: 'cà',
        phonetics: { onset: 'c', rhyme: 'a', tone: 'huyền', spellingSteps: 'c - a - ca - huyền - cà', tip: 'Hạ giọng êm ái khi phát âm dấu huyền.' },
        illustrationEmoji: '🍆',
        illustrationKeyword: 'Quả cà tím',
        illustrationSvgBg: 'bg-purple-100',
        difficulty: 'easy',
        exampleSentence: 'Mẹ hái cà tím ở bờ ao.'
      },
      {
        id: '3-3',
        word: 'cá',
        phonetics: { onset: 'c', rhyme: 'a', tone: 'sắc', spellingSteps: 'c - a - ca - sắc - cá', tip: 'Lên giọng vút cao sắc nét: cá!' },
        illustrationEmoji: '🐟',
        illustrationKeyword: 'Con cá',
        illustrationSvgBg: 'bg-sky-100',
        difficulty: 'easy',
        exampleSentence: 'Bố và Nam câu cá dưới hồ.'
      }
    ],
    level3Sentences: [
      'Nam và bố câu cá.',
      'A, cá cờ bơi tung tăng!'
    ],
    level4Story: {
      title: 'Buổi câu cá',
      paragraphs: [
        'Chiều mát, bố đưa Nam ra hồ câu cá.',
        'Hồ nước trong veo, từng đàn cá bơi lội.',
        'Nam reo lên thích thú khi câu được một chú cá cờ sặc sỡ.'
      ]
    }
  },
  {
    id: 4,
    title: 'Bài 4: E e, Ê ê',
    shortLabel: 'E e, Ê ê',
    category: 'chữ_cái',
    pageNumber: 20,
    badgeColor: 'bg-purple-500',
    accentBg: 'from-purple-100 to-indigo-50',
    targetSounds: ['E', 'e', 'Ê', 'ê'],
    recognitionSentence: {
      sentence: 'Bé kể mẹ nghe về bạn bè.',
      highlightWords: ['kể', 'mẹ', 'nghe', 'bạn', 'bè'],
      contextImage: '👧'
    },
    level1Sounds: ['e', 'ê', 'be', 'bê', 'bè', 'bé', 'bế'],
    level2Vocab: [
      {
        id: '4-1',
        word: 'bè',
        phonetics: { onset: 'b', rhyme: 'e', tone: 'huyền', spellingSteps: 'b - e - be - huyền - bè', tip: 'Mở rộng mép sang hai bên khi phát âm âm e.' },
        illustrationEmoji: '🛶',
        illustrationKeyword: 'Cái bè gỗ',
        illustrationSvgBg: 'bg-amber-100',
        difficulty: 'easy',
        exampleSentence: 'Bác lái bè nứa trên sông.'
      },
      {
        id: '4-2',
        word: 'bé',
        phonetics: { onset: 'b', rhyme: 'e', tone: 'sắc', spellingSteps: 'b - e - be - sắc - bé', tip: 'Vút giọng cao sắc sảo: bé!' },
        illustrationEmoji: '👶',
        illustrationKeyword: 'Em bé',
        illustrationSvgBg: 'bg-pink-100',
        difficulty: 'easy',
        exampleSentence: 'Em bé ngoan ngủ say sưa.'
      },
      {
        id: '4-3',
        word: 'bế',
        phonetics: { onset: 'b', rhyme: 'ê', tone: 'sắc', spellingSteps: 'b - ê - bê - sắc - bế', tip: 'Miệng hẹp hơn âm e một chút, lưỡi nâng cao nhẹ.' },
        illustrationEmoji: '🤱',
        illustrationKeyword: 'Mẹ bế bé',
        illustrationSvgBg: 'bg-rose-100',
        difficulty: 'medium',
        exampleSentence: 'Bà bế bé thật dịu dàng.'
      }
    ],
    level3Sentences: [
      'Bà bế bé.',
      'Bé kể mẹ nghe về bạn bè ở lớp.'
    ],
    level4Story: {
      title: 'Em bé ngoan',
      paragraphs: [
        'Mẹ bận việc nhà, bà nhẹ nhàng bế bé ru hời.',
        'Bé lim dim đôi mắt rồi ngủ ngon lành.',
        'Mọi người trong nhà ai cũng yêu quý bé.'
      ]
    }
  },
  {
    id: 6,
    title: 'Bài 6: O o, dấu hỏi ( ? )',
    shortLabel: 'O o ( ? )',
    category: 'chữ_cái',
    pageNumber: 24,
    badgeColor: 'bg-orange-500',
    accentBg: 'from-orange-100 to-amber-50',
    targetSounds: ['O', 'o', 'dấu hỏi'],
    recognitionSentence: {
      sentence: 'Đàn bò gặm cỏ.',
      highlightWords: ['bò', 'cỏ'],
      contextImage: '🐄'
    },
    level1Sounds: ['o', 'bò', 'bó', 'bỏ', 'cò', 'có', 'cỏ'],
    level2Vocab: [
      {
        id: '6-1',
        word: 'bò',
        phonetics: { onset: 'b', rhyme: 'o', tone: 'huyền', spellingSteps: 'b - o - bo - huyền - bò', tip: 'Tròn môi thật đẹp khi phát âm âm O.' },
        illustrationEmoji: '🐮',
        illustrationKeyword: 'Con bò',
        illustrationSvgBg: 'bg-amber-100',
        difficulty: 'easy',
        exampleSentence: 'Đàn bò thong thả trên đê.'
      },
      {
        id: '6-2',
        word: 'cò',
        phonetics: { onset: 'c', rhyme: 'o', tone: 'huyền', spellingSteps: 'c - o - co - huyền - cò', tip: 'Cuống lưỡi c, tròn miệng o, hạ giọng huyền.' },
        illustrationEmoji: '🪶',
        illustrationKeyword: 'Con cò trắng',
        illustrationSvgBg: 'bg-sky-100',
        difficulty: 'easy',
        exampleSentence: 'Con cò bay lả bay la.'
      },
      {
        id: '6-3',
        word: 'cỏ',
        phonetics: { onset: 'c', rhyme: 'o', tone: 'hỏi', spellingSteps: 'c - o - co - hỏi - cỏ', tip: 'Dấu hỏi hạ giọng xuống rồi hơi hất nhẹ lên.' },
        illustrationEmoji: '🌱',
        illustrationKeyword: 'Bãi cỏ xanh',
        illustrationSvgBg: 'bg-emerald-100',
        difficulty: 'medium',
        exampleSentence: 'Bê con thích ăn cỏ non.'
      }
    ],
    level3Sentences: [
      'Đàn bò gặm cỏ.',
      'Bê có cỏ non ngon ngọt.'
    ],
    level4Story: {
      title: 'Bê và cỏ',
      paragraphs: [
        'Bờ đê mùa hè xanh mướt những bãi cỏ.',
        'Đàn bò mẹ và bê con tung tăng gặm cỏ.',
        'Bê con nhảy nhót nô đùa vui sướng.'
      ]
    }
  },
  {
    id: 7,
    title: 'Bài 7: Ô ô, dấu nặng ( . )',
    shortLabel: 'Ô ô ( . )',
    category: 'chữ_cái',
    pageNumber: 26,
    badgeColor: 'bg-yellow-600',
    accentBg: 'from-yellow-100 to-amber-50',
    targetSounds: ['Ô', 'ô', 'dấu nặng'],
    recognitionSentence: {
      sentence: 'Bố và Hà đi bộ trên hè phố.',
      highlightWords: ['Bố', 'bộ', 'phố'],
      contextImage: '🚶‍♂️'
    },
    level1Sounds: ['ô', 'bố', 'bộ', 'cô', 'cổ', 'cộ'],
    level2Vocab: [
      {
        id: '7-1',
        word: 'bố',
        phonetics: { onset: 'b', rhyme: 'ô', tone: 'sắc', spellingSteps: 'b - ô - bô - sắc - bố', tip: 'Môi chụm tròn nhỏ hơn âm o, vút cao dấu sắc.' },
        illustrationEmoji: '🧔',
        illustrationKeyword: 'Bố yêu',
        illustrationSvgBg: 'bg-blue-100',
        difficulty: 'easy',
        exampleSentence: 'Bố đưa bé đi học mỗi sáng.'
      },
      {
        id: '7-2',
        word: 'cô bé',
        phonetics: { onset: 'c / b', rhyme: 'ô / e', tone: 'ngang / sắc', spellingSteps: 'c-ô-cô, b-e-be-sắc-bé', tip: 'Đọc nối hai tiếng rõ ràng, tự nhiên.' },
        illustrationEmoji: '👧',
        illustrationKeyword: 'Cô bé nhỏ',
        illustrationSvgBg: 'bg-pink-100',
        difficulty: 'medium',
        exampleSentence: 'Cô bé có chiếc nơ hồng xinh xắn.'
      },
      {
        id: '7-3',
        word: 'cổ cò',
        phonetics: { onset: 'c', rhyme: 'ô / o', tone: 'hỏi / huyền', spellingSteps: 'c-ô-cô-hỏi-cổ, c-o-co-huyền-cò', tip: 'Phân biệt rõ âm ô và âm o cùng dấu hỏi và huyền.' },
        illustrationEmoji: '🦢',
        illustrationKeyword: 'Cổ con cò',
        illustrationSvgBg: 'bg-sky-100',
        difficulty: 'medium',
        exampleSentence: 'Chú cò có chiếc cổ cao thanh mảnh.'
      }
    ],
    level3Sentences: [
      'Bố bê bể cá.',
      'Bố và Hà đi bộ trên hè phố.'
    ],
    level4Story: {
      title: 'Bể cá của bố',
      paragraphs: [
        'Bố mới mua một bể cá thuỷ tinh trong vắt.',
        'Bố bê bể cá đặt ngay ngắn trên bàn phòng khách.',
        'Bên trong có ba chú cá vàng bơi lượn lấp lánh.'
      ]
    }
  },
  {
    id: 8,
    title: 'Bài 8: D d, Đ đ',
    shortLabel: 'D d, Đ đ',
    category: 'chữ_cái',
    pageNumber: 28,
    badgeColor: 'bg-red-500',
    accentBg: 'from-red-100 to-rose-50',
    targetSounds: ['D', 'd', 'Đ', 'đ'],
    recognitionSentence: {
      sentence: 'Dưới gốc đa, các bạn chơi dung dăng dung dẻ.',
      highlightWords: ['Dưới', 'đa', 'dung', 'dăng', 'dẻ'],
      contextImage: '🌳'
    },
    level1Sounds: ['d', 'đ', 'da', 'dẻ', 'dế', 'đá', 'đò', 'đỏ'],
    level2Vocab: [
      {
        id: '8-1',
        word: 'đá dế',
        phonetics: { onset: 'đ / d', rhyme: 'a / ê', tone: 'sắc / sắc', spellingSteps: 'đ-a-đa-sắc-đá, d-ê-dê-sắc-dế', tip: 'Phân biệt âm đ (chạm lợi) và âm d (xát nhẹ).' },
        illustrationEmoji: '🦗',
        illustrationKeyword: 'Con dế mèn',
        illustrationSvgBg: 'bg-lime-100',
        difficulty: 'medium',
        exampleSentence: 'Các bạn nhỏ thích xem đá dế.'
      },
      {
        id: '8-2',
        word: 'đa đa',
        phonetics: { onset: 'đ', rhyme: 'a', tone: 'ngang', spellingSteps: 'đ - a - đa', tip: 'Đầu lưỡi chạm chân răng hàm trên rồi bật ra: đ!' },
        illustrationEmoji: '🦃',
        illustrationKeyword: 'Chim đa đa',
        illustrationSvgBg: 'bg-amber-100',
        difficulty: 'easy',
        exampleSentence: 'Chim đa đa cất tiếng gáy rộn rã.'
      },
      {
        id: '8-3',
        word: 'ô đỏ',
        phonetics: { onset: ' / đ', rhyme: 'ô / o', tone: 'ngang / hỏi', spellingSteps: 'ô, đ-o-đo-hỏi-đỏ', tip: 'Dấu hỏi ở tiếng đỏ nhấn giọng trầm ấm.' },
        illustrationEmoji: '☂️',
        illustrationKeyword: 'Cái ô đỏ',
        illustrationSvgBg: 'bg-red-100',
        difficulty: 'easy',
        exampleSentence: 'Bé có chiếc ô đỏ che nắng che mưa.'
      }
    ],
    level3Sentences: [
      'Bé có ô đỏ.',
      'Dưới gốc đa, các bạn chơi dung dăng dung dẻ.'
    ],
    level4Story: {
      title: 'Bé có ô đỏ',
      paragraphs: [
        'Hôm nay trời có cơn mưa rào nhẹ.',
        'Mẹ đưa cho bé chiếc ô màu đỏ rực rỡ.',
        'Bé che ô đỏ bước đi rộn rã trên con đường làng.'
      ]
    }
  },
  {
    id: 11,
    title: 'Bài 11: I i, K k',
    shortLabel: 'I i, K k',
    category: 'chữ_cái',
    pageNumber: 34,
    badgeColor: 'bg-teal-600',
    accentBg: 'from-teal-100 to-cyan-50',
    targetSounds: ['I', 'i', 'K', 'k'],
    recognitionSentence: {
      sentence: 'Nam vẽ kì đà.',
      highlightWords: ['kì', 'đà'],
      contextImage: '🦎'
    },
    level1Sounds: ['i', 'k', 'ki', 'kì', 'kè', 'kẻ', 'kệ'],
    level2Vocab: [
      {
        id: '11-1',
        word: 'bí đỏ',
        phonetics: { onset: 'b / đ', rhyme: 'i / o', tone: 'sắc / hỏi', spellingSteps: 'b-i-bi-sắc-bí, đ-o-đo-hỏi-đỏ', tip: 'Miệng hé ngang khi đọc âm i.' },
        illustrationEmoji: '🎃',
        illustrationKeyword: 'Quả bí đỏ',
        illustrationSvgBg: 'bg-orange-100',
        difficulty: 'easy',
        exampleSentence: 'Mẹ nấu canh bí đỏ ngọt mát.'
      },
      {
        id: '11-2',
        word: 'kẻ ô',
        phonetics: { onset: 'k / ', rhyme: 'e / ô', tone: 'hỏi / ngang', spellingSteps: 'k-e-ke-hỏi-kẻ, ô', tip: 'Lưu ý chữ k luôn đi với i, e, ê.' },
        illustrationEmoji: '📏',
        illustrationKeyword: 'Kẻ ô tập',
        illustrationSvgBg: 'bg-blue-100',
        difficulty: 'medium',
        exampleSentence: 'Bé dùng thước kẻ ô thẳng tắp.'
      },
      {
        id: '11-3',
        word: 'kì đà',
        phonetics: { onset: 'k / đ', rhyme: 'i / a', tone: 'huyền / huyền', spellingSteps: 'k-i-ki-huyền-kì, đ-a-đa-huyền-đà', tip: 'Hạ giọng dấu huyền cả hai tiếng kì đà.' },
        illustrationEmoji: '🦎',
        illustrationKeyword: 'Con kì đà',
        illustrationSvgBg: 'bg-emerald-100',
        difficulty: 'medium',
        exampleSentence: 'Kì đà bò ở kẽ đá ven đồi.'
      }
    ],
    level3Sentences: [
      'Nam vẽ kì đà.',
      'Kì đà bò ở kẽ đá.'
    ],
    level4Story: {
      title: 'Nam vẽ tranh',
      paragraphs: [
        'Trong giờ mĩ thuật, Nam chăm chú nắn nót tô màu.',
        'Nam vẽ một chú kì đà xanh biếc trên mỏm đá.',
        'Cô giáo khen bức tranh của Nam rất sinh động.'
      ]
    }
  },
  {
    id: 14,
    title: 'Bài 14: Ch ch, Kh kh',
    shortLabel: 'Ch ch, Kh kh',
    category: 'vần_đơn',
    pageNumber: 40,
    badgeColor: 'bg-indigo-600',
    accentBg: 'from-indigo-100 to-violet-50',
    targetSounds: ['Ch', 'ch', 'Kh', 'kh'],
    recognitionSentence: {
      sentence: 'Mấy chú khỉ ăn chuối.',
      highlightWords: ['chú', 'khỉ', 'chuối'],
      contextImage: '🐒'
    },
    level1Sounds: ['ch', 'kh', 'chú', 'khỉ', 'chè', 'chỉ', 'chợ', 'khế', 'kho', 'khô'],
    level2Vocab: [
      {
        id: '14-1',
        word: 'lá khô',
        phonetics: { onset: 'l / kh', rhyme: 'a / ô', tone: 'sắc / ngang', spellingSteps: 'l-a-la-sắc-lá, kh-ô-khô', tip: 'Âm kh xát ở cuống họng, hơi bật nhẹ.' },
        illustrationEmoji: '🍂',
        illustrationKeyword: 'Lá cây khô',
        illustrationSvgBg: 'bg-amber-100',
        difficulty: 'medium',
        exampleSentence: 'Lá khô rụng đầy sân trường.'
      },
      {
        id: '14-2',
        word: 'chú khỉ',
        phonetics: { onset: 'ch / kh', rhyme: 'u / i', tone: 'sắc / hỏi', spellingSteps: 'ch-u-chu-sắc-chú, kh-i-khi-hỏi-khỉ', tip: 'Phân biệt âm đầu ch (đầu lưỡi) và kh (cuống họng).' },
        illustrationEmoji: '🐵',
        illustrationKeyword: 'Chú khỉ con',
        illustrationSvgBg: 'bg-yellow-100',
        difficulty: 'medium',
        exampleSentence: 'Chú khỉ chuyền cành thoăn thoắt.'
      },
      {
        id: '14-3',
        word: 'chợ cá',
        phonetics: { onset: 'ch / c', rhyme: 'ơ / a', tone: 'nặng / sắc', spellingSteps: 'ch-ơ-chơ-nặng-chợ, c-a-ca-sắc-cá', tip: 'Dấu nặng đọc ngắn dứt khoát: chợ!' },
        illustrationEmoji: '🏪',
        illustrationKeyword: 'Chợ cá',
        illustrationSvgBg: 'bg-cyan-100',
        difficulty: 'easy',
        exampleSentence: 'Mẹ đi chợ cá mua mớ tép tươi.'
      }
    ],
    level3Sentences: [
      'Mấy chú khỉ ăn chuối.',
      'Chị có cá kho khế ngon tuyệt.'
    ],
    level4Story: {
      title: 'Mấy chú khỉ tinh nghịch',
      paragraphs: [
        'Trên núi cao có bầy khỉ lông nâu nhảy nhót.',
        'Mấy chú khỉ con ngồi trên tảng đá chia nhau nải chuối vàng.',
        'Khỉ mẹ hiền từ che chở cho các con dưới tán cây râm mát.'
      ]
    }
  },
  {
    id: 17,
    title: 'Bài 17: G g, Gi gi',
    shortLabel: 'G g, Gi gi',
    category: 'vần_đơn',
    pageNumber: 46,
    badgeColor: 'bg-amber-600',
    accentBg: 'from-amber-100 to-yellow-50',
    targetSounds: ['G', 'g', 'Gi', 'gi'],
    recognitionSentence: {
      sentence: 'Hà có giỏ trứng gà.',
      highlightWords: ['giỏ', 'gà'],
      contextImage: '🧺'
    },
    level1Sounds: ['g', 'gi', 'gà', 'giỏ', 'gỗ', 'giá', 'giò'],
    level2Vocab: [
      {
        id: '17-1',
        word: 'gà gô',
        phonetics: { onset: 'g / g', rhyme: 'a / ô', tone: 'huyền / ngang', spellingSteps: 'g-a-ga-huyền-gà, g-ô-gô', tip: 'Âm g phát âm sâu ở cuống họng.' },
        illustrationEmoji: '🐔',
        illustrationKeyword: 'Con gà gô',
        illustrationSvgBg: 'bg-orange-100',
        difficulty: 'easy',
        exampleSentence: 'Chú gà gô gáy vang chào ngày mới.'
      },
      {
        id: '17-2',
        word: 'đồ gỗ',
        phonetics: { onset: 'đ / g', rhyme: 'ô / ô', tone: 'huyền / ngã', spellingSteps: 'đ-ô-đô-huyền-đồ, g-ô-gô-ngã-gỗ', tip: 'Nhấn giọng ở dấu ngã trong tiếng gỗ.' },
        illustrationEmoji: '🪑',
        illustrationKeyword: 'Bàn ghế gỗ',
        illustrationSvgBg: 'bg-amber-100',
        difficulty: 'medium',
        exampleSentence: 'Nhà bà có bộ bàn ghế bằng đồ gỗ quý.'
      },
      {
        id: '17-3',
        word: 'giá đỗ',
        phonetics: { onset: 'gi / đ', rhyme: 'a / ô', tone: 'sắc / ngã', spellingSteps: 'gi-a-gia-sắc-giá, đ-ô-đô-ngã-đỗ', tip: 'Âm gi đọc nhẹ nhàng xát mặt lưỡi.' },
        illustrationEmoji: '🌱',
        illustrationKeyword: 'Cọng giá đỗ',
        illustrationSvgBg: 'bg-lime-100',
        difficulty: 'medium',
        exampleSentence: 'Mẹ làm một đĩa giá đỗ trắng giòn.'
      }
    ],
    level3Sentences: [
      'Hà có giỏ trứng gà.',
      'Bà che gió cho ba chú gà con.'
    ],
    level4Story: {
      title: 'Giỏ trứng gà của bé',
      paragraphs: [
        'Sáng sớm, gà mẹ cục ta cục tác đẻ trứng trong ổ rơm.',
        'Hà cẩn thận nhặt từng quả trứng tròn xoe bỏ vào chiếc giỏ nhỏ.',
        'Bà xoa đầu khen Hà biết giúp việc nhà thật ngoan.'
      ]
    }
  },
  {
    id: 21,
    title: 'Bài 21: R r, S s',
    shortLabel: 'R r, S s',
    category: 'vần_đơn',
    pageNumber: 54,
    badgeColor: 'bg-green-600',
    accentBg: 'from-green-100 to-emerald-50',
    targetSounds: ['R', 'r', 'S', 's'],
    recognitionSentence: {
      sentence: 'Bầy sẻ non ríu ra ríu rít bên mẹ.',
      highlightWords: ['sẻ', 'ríu', 'ra', 'rít'],
      contextImage: '🐦'
    },
    level1Sounds: ['r', 's', 'ra', 'sẻ', 'rế', 'rổ', 'sả', 'sò'],
    level2Vocab: [
      {
        id: '21-1',
        word: 'rổ rá',
        phonetics: { onset: 'r', rhyme: 'ô / a', tone: 'hỏi / sắc', spellingSteps: 'r-ô-rô-hỏi-rổ, r-a-ra-sắc-rá', tip: 'Đầu lưỡi rung nhẹ khi phát âm âm r.' },
        illustrationEmoji: '🧺',
        illustrationKeyword: 'Cái rổ rá tre',
        illustrationSvgBg: 'bg-amber-100',
        difficulty: 'medium',
        exampleSentence: 'Bà đan rổ rá bằng nan tre khéo léo.'
      },
      {
        id: '21-2',
        word: 'cá rô',
        phonetics: { onset: 'c / r', rhyme: 'a / ô', tone: 'sắc / ngang', spellingSteps: 'c-a-ca-sắc-cá, r-ô-rô', tip: 'Uốn lưỡi nhẹ âm r trong tiếng rô.' },
        illustrationEmoji: '🐟',
        illustrationKeyword: 'Con cá rô đồng',
        illustrationSvgBg: 'bg-cyan-100',
        difficulty: 'easy',
        exampleSentence: 'Con cá rô quẫy đuôi dưới đầm sen.'
      },
      {
        id: '21-3',
        word: 'su su',
        phonetics: { onset: 's', rhyme: 'u', tone: 'ngang', spellingSteps: 's - u - su', tip: 'Uốn cong lưỡi chạm vòm miệng khi phát âm s (khác với x).' },
        illustrationEmoji: '🍈',
        illustrationKeyword: 'Quả su su',
        illustrationSvgBg: 'bg-emerald-100',
        difficulty: 'medium',
        exampleSentence: 'Giàn su su sai trĩu quả xanh non.'
      }
    ],
    level3Sentences: [
      'Bầy sẻ non ríu ra ríu rít bên mẹ.',
      'Chợ có gà ri, cá rô, su su. Chợ có cả rổ rá.'
    ],
    level4Story: {
      title: 'Bầy chim sẻ non',
      paragraphs: [
        'Dưới vòm lá bàng xanh mát, có một tổ chim sẻ nhỏ.',
        'Mỗi sớm mai, bầy sẻ non cất tiếng hót ríu rít đón ánh bình minh.',
        'Chim sẻ mẹ tha mồi về bón từng con đầy yêu thương.'
      ]
    }
  },
  {
    id: 31,
    title: 'Bài 31: an, ăn, ân',
    shortLabel: 'an, ăn, ân',
    category: 'vần_ghép',
    pageNumber: 74,
    badgeColor: 'bg-blue-600',
    accentBg: 'from-blue-100 to-sky-50',
    targetSounds: ['an', 'ăn', 'ân'],
    recognitionSentence: {
      sentence: 'Ngựa vằn và hươu cao cổ là đôi bạn thân.',
      highlightWords: ['vằn', 'bạn', 'thân'],
      contextImage: '🦓'
    },
    level1Sounds: ['an', 'ăn', 'ân', 'bạn', 'khăn', 'thân', 'mận'],
    level2Vocab: [
      {
        id: '31-1',
        word: 'bạn thân',
        phonetics: { onset: 'b / th', rhyme: 'an / ân', tone: 'nặng / ngang', spellingSteps: 'b-an-ban-nặng-bạn, th-ân-thân', tip: 'Âm cuối n đầu lưỡi chạm vào lợi trên giữ hơi.' },
        illustrationEmoji: '🤝',
        illustrationKeyword: 'Đôi bạn thân',
        illustrationSvgBg: 'bg-blue-100',
        difficulty: 'medium',
        exampleSentence: 'Hà và Nam là đôi bạn thân thiết.'
      },
      {
        id: '31-2',
        word: 'khăn rằn',
        phonetics: { onset: 'kh / r', rhyme: 'ăn / ăn', tone: 'ngang / huyền', spellingSteps: 'kh-ăn-khăn, r-ăn-răn-huyền-rằn', tip: 'Vần ăn đọc gọn, phát âm rõ âm ă.' },
        illustrationEmoji: '🧣',
        illustrationKeyword: 'Chiếc khăn rằn',
        illustrationSvgBg: 'bg-slate-100',
        difficulty: 'medium',
        exampleSentence: 'Bác nông dân quàng chiếc khăn rằn mộc mạc.'
      },
      {
        id: '31-3',
        word: 'quả mận',
        phonetics: { onset: 'qu / m', rhyme: 'a / ân', tone: 'hỏi / nặng', spellingSteps: 'qu-a-qua-hỏi-quả, m-ân-mân-nặng-mận', tip: 'Vần ân phát âm khép lưỡi nhanh.' },
        illustrationEmoji: '🍒',
        illustrationKeyword: 'Quả mận chín đỏ',
        illustrationSvgBg: 'bg-rose-100',
        difficulty: 'easy',
        exampleSentence: 'Những quả mận chín đỏ mọng ngọt lịm.'
      }
    ],
    level3Sentences: [
      'Ngựa vằn và hươu cao cổ là đôi bạn thân.',
      'Đàn gà cứ tha thẩn gần chân mẹ.'
    ],
    level4Story: {
      title: 'Đôi bạn trong rừng xanh',
      paragraphs: [
        'Trên đồng cỏ bao la, chú ngựa vằn có bộ lông sọc trắng đen thật đẹp.',
        'Bên cạnh là hươu cao cổ với chiếc cổ vươn cao hái lá non.',
        'Cả hai luôn gắn bó, cùng nhau chia sẻ nguồn nước mát lành.'
      ]
    }
  },
  {
    id: 32,
    title: 'Bài 32: on, ôn, ơn',
    shortLabel: 'on, ôn, ơn',
    category: 'vần_ghép',
    pageNumber: 76,
    badgeColor: 'bg-emerald-600',
    accentBg: 'from-emerald-100 to-green-50',
    targetSounds: ['on', 'ôn', 'ơn'],
    recognitionSentence: {
      sentence: 'Sơn ca véo von: Mẹ ơi, con đã lớn khôn.',
      highlightWords: ['Sơn', 'von', 'con', 'khôn'],
      contextImage: '🐦'
    },
    level1Sounds: ['on', 'ôn', 'ơn', 'con', 'khôn', 'sơn', 'nón', 'chồn'],
    level2Vocab: [
      {
        id: '32-1',
        word: 'nón lá',
        phonetics: { onset: 'n / l', rhyme: 'on / a', tone: 'sắc / sắc', spellingSteps: 'n-on-non-sắc-nón, l-a-la-sắc-lá', tip: 'Phân biệt âm đầu n (mũi) và l (uốn cong).' },
        illustrationEmoji: '👒',
        illustrationKeyword: 'Nón lá truyền thống',
        illustrationSvgBg: 'bg-amber-100',
        difficulty: 'medium',
        exampleSentence: 'Mẹ đội chiếc nón lá trắng tinh đi chợ.'
      },
      {
        id: '32-2',
        word: 'con chồn',
        phonetics: { onset: 'c / ch', rhyme: 'on / ôn', tone: 'ngang / huyền', spellingSteps: 'c-on-con, ch-ôn-chôn-huyền-chồn', tip: 'Vần ôn môi chụm tròn hơn vần on.' },
        illustrationEmoji: '🦝',
        illustrationKeyword: 'Con chồn nhỏ',
        illustrationSvgBg: 'bg-yellow-100',
        difficulty: 'medium',
        exampleSentence: 'Chú chồn con có chiếc đuôi dài bồng bềnh.'
      },
      {
        id: '32-3',
        word: 'sơn ca',
        phonetics: { onset: 's / c', rhyme: 'ơn / a', tone: 'ngang / ngang', spellingSteps: 's-ơn-sơn, c-a-ca', tip: 'Uốn lưỡi âm s, mở miệng đọc vần ơn êm dịu.' },
        illustrationEmoji: '🎶',
        illustrationKeyword: 'Chim sơn ca hót',
        illustrationSvgBg: 'bg-sky-100',
        difficulty: 'easy',
        exampleSentence: 'Chim sơn ca cất tiếng hót véo von lưng trời.'
      }
    ],
    level3Sentences: [
      'Sơn ca véo von: Mẹ ơi, con đã lớn khôn.',
      'Ve vẻ vè ve, vè bốn chú lợn con nhởn nhơ nô giỡn.'
    ],
    level4Story: {
      title: 'Bài ca sơn ca nhỏ',
      paragraphs: [
        'Mỗi sớm mai thức dậy, chim sơn ca bay vút lên bầu trời xanh thẳm.',
        'Nó cất giọng líu lo tiếng ca trong trẻo ngợi ca nắng mới.',
        'Sơn ca reo vui: Mẹ ơi, con đã biết tự bay xa và lớn khôn rồi!'
      ]
    }
  },
  {
    id: 35,
    title: 'Bài 35: Ôn tập & Kể chuyện Thỏ và rùa',
    shortLabel: 'Ôn tập 35',
    category: 'ôn_tập',
    pageNumber: 82,
    badgeColor: 'bg-rose-600',
    accentBg: 'from-rose-100 to-pink-50',
    targetSounds: ['an', 'ăn', 'ân', 'on', 'ôn', 'ơn'],
    recognitionSentence: {
      sentence: 'Nhìn rùa, thỏ chê: Quả là chậm như rùa!',
      highlightWords: ['chậm', 'rùa', 'thỏ'],
      contextImage: '🐇'
    },
    level1Sounds: ['bàn chân', 'củ sắn', 'tấm gỗ', 'khôn lớn', 'bến đò', 'đèn pin', 'ngọn cỏ'],
    level2Vocab: [
      {
        id: '35-1',
        word: 'chăm chỉ',
        phonetics: { onset: 'ch / ch', rhyme: 'ăm / i', tone: 'ngang / hỏi', spellingSteps: 'ch-ăm-chăm, ch-i-chi-hỏi-chỉ', tip: 'Phát âm gọn gàng, dấu hỏi ngân nhẹ.' },
        illustrationEmoji: '🐝',
        illustrationKeyword: 'Bé chăm chỉ',
        illustrationSvgBg: 'bg-amber-100',
        difficulty: 'easy',
        exampleSentence: 'Bạn rùa luôn chăm chỉ từng bước một.'
      },
      {
        id: '35-2',
        word: 'bến đò',
        phonetics: { onset: 'b / đ', rhyme: 'ên / o', tone: 'sắc / huyền', spellingSteps: 'b-ên-bên-sắc-bến, đ-o-đo-huyền-đò', tip: 'Vần ên đọc khép miệng tươi tắn.' },
        illustrationEmoji: '⛵',
        illustrationKeyword: 'Bến đò ven sông',
        illustrationSvgBg: 'bg-sky-100',
        difficulty: 'medium',
        exampleSentence: 'Con đò nhỏ neo đậu nơi bến đò quê hương.'
      }
    ],
    level3Sentences: [
      'Nhìn rùa, thỏ chê: Quả là chậm như rùa!',
      'Rùa cứ bò cần mẫn, thế là rùa đi xa hơn hẳn thỏ.'
    ],
    level4Story: {
      title: 'Thỏ và rùa thi chạy',
      paragraphs: [
        'Thỏ ỷ mình chạy nhanh nên cất tiếng chê rùa chậm chạp.',
        'Rùa ôn tồn hẹn thỏ cùng chạy thi lên đỉnh đồi.',
        'Trong khi thỏ mải chơi nhởn nhơ múa hát dưới bóng mát, rùa kiên trì từng bước về đích trước thỏ.'
      ],
      author: 'Truyện ngụ ngôn Ê-dốp'
    }
  },
  {
    id: 59,
    title: 'Bài 59: ang, ăng, âng',
    shortLabel: 'ang, ăng, âng',
    category: 'vần_ghép',
    pageNumber: 130,
    badgeColor: 'bg-violet-600',
    accentBg: 'from-violet-100 to-purple-50',
    targetSounds: ['ang', 'ăng', 'âng'],
    recognitionSentence: {
      sentence: 'Vầng trăng sáng lấp ló sau rặng tre.',
      highlightWords: ['trăng', 'sáng', 'rặng'],
      contextImage: '🌙'
    },
    level1Sounds: ['ang', 'ăng', 'âng', 'sáng', 'làng', 'bằng', 'tầng', 'vầng'],
    level2Vocab: [
      {
        id: '39-1',
        word: 'cá vàng',
        phonetics: { onset: 'c / v', rhyme: 'a / ang', tone: 'sắc / huyền', spellingSteps: 'c-a-ca-sắc-cá, v-ang-vang-huyền-vàng', tip: 'Âm cuối ng hạ vòm miệng, thoát hơi qua mũi.' },
        illustrationEmoji: '🐠',
        illustrationKeyword: 'Cá vàng bơi',
        illustrationSvgBg: 'bg-yellow-100',
        difficulty: 'easy',
        exampleSentence: 'Bể cá nhỏ có đôi chú cá vàng tung tăng.'
      },
      {
        id: '39-2',
        word: 'măng tre',
        phonetics: { onset: 'm / tr', rhyme: 'ăng / e', tone: 'ngang / ngang', spellingSteps: 'm-ăng-măng, tr-e-tre', tip: 'Uốn cong đầu lưỡi âm tr, đọc vần ăng vang sáng.' },
        illustrationEmoji: '🎍',
        illustrationKeyword: 'Búp măng tre',
        illustrationSvgBg: 'bg-emerald-100',
        difficulty: 'medium',
        exampleSentence: 'Búp măng tre nhô lên khỏe khoắn sau cơn mưa.'
      },
      {
        id: '39-3',
        word: 'nhà tầng',
        phonetics: { onset: 'nh / t', rhyme: 'a / âng', tone: 'huyền / huyền', spellingSteps: 'nh-a-nha-huyền-nhà, t-âng-tâng-huyền-tầng', tip: 'Vần âng phát âm ấm áp, trầm bổng.' },
        illustrationEmoji: '🏢',
        illustrationKeyword: 'Ngôi nhà cao tầng',
        illustrationSvgBg: 'bg-blue-100',
        difficulty: 'medium',
        exampleSentence: 'Phố mới mọc lên bao ngôi nhà tầng khang trang.'
      }
    ],
    level3Sentences: [
      'Vầng trăng sáng lấp ló sau rặng tre.',
      'Hôm nay trời nắng chang chang, mèo con đi học chẳng mang thứ gì.'
    ],
    level4Story: {
      title: 'Mèo con đi học',
      paragraphs: [
        'Hôm nay trời nắng chang chang,',
        'Mèo con đi học chẳng mang thứ gì.',
        'Chỉ mang một cái bút chì,',
        'Và mang một mẩu bánh mì con con.'
      ],
      author: 'Phan Thị Vàng Anh'
    }
  },
  {
    id: 79,
    title: 'Bài 79: uyên, uyêt',
    shortLabel: 'uyên, uyêt',
    category: 'vần_ghép',
    pageNumber: 170,
    badgeColor: 'bg-fuchsia-600',
    accentBg: 'from-fuchsia-100 to-pink-50',
    targetSounds: ['uyên', 'uyêt'],
    recognitionSentence: {
      sentence: 'Bà kể chuyện hay tuyệt.',
      highlightWords: ['chuyện', 'tuyệt'],
      contextImage: '📚'
    },
    level1Sounds: ['uyên', 'uyêt', 'chuyện', 'thuyền', 'tuyết', 'khuyết'],
    level2Vocab: [
      {
        id: '79-1',
        word: 'con thuyền',
        phonetics: { onset: 'c / th', rhyme: 'on / uyên', tone: 'ngang / huyền', spellingSteps: 'c-on-con, th-uyên-thuyên-huyền-thuyền', tip: 'Tròn môi âm u, lướt nhanh sang yê rồi khép đầu lưỡi âm n.' },
        illustrationEmoji: '⛵',
        illustrationKeyword: 'Con thuyền buồm',
        illustrationSvgBg: 'bg-cyan-100',
        difficulty: 'hard',
        exampleSentence: 'Con thuyền lướt nhẹ trên dòng sông thơ mộng.'
      },
      {
        id: '79-2',
        word: 'trăng khuyết',
        phonetics: { onset: 'tr / kh', rhyme: 'ăng / uyêt', tone: 'ngang / sắc', spellingSteps: 'tr-ăng-trăng, kh-uyêt-khuyêt-sắc-khuyết', tip: 'Uốn lưỡi âm tr, vần uyêt kết thúc bằng âm t chặn hơi.' },
        illustrationEmoji: '🌙',
        illustrationKeyword: 'Vầng trăng khuyết',
        illustrationSvgBg: 'bg-indigo-100',
        difficulty: 'hard',
        exampleSentence: 'Đêm nay vầng trăng khuyết trông như chiếc thuyền trôi.'
      },
      {
        id: '79-3',
        word: 'truyền thuyết',
        phonetics: { onset: 'tr / th', rhyme: 'uyên / uyêt', tone: 'huyền / sắc', spellingSteps: 'tr-uyên-truyên-huyền-truyền, th-uyêt-thuyêt-sắc-thuyết', tip: 'Hai vần phức tạp, bé đọc chậm rãi từng tiếng một.' },
        illustrationEmoji: '🗡️',
        illustrationKeyword: 'Truyền thuyết xưa',
        illustrationSvgBg: 'bg-amber-100',
        difficulty: 'hard',
        exampleSentence: 'Bà kể câu chuyện truyền thuyết Thánh Gióng thật hào hùng.'
      }
    ],
    level3Sentences: [
      'Bà kể chuyện hay tuyệt.',
      'Sân nhà em sáng quá, nhờ ánh trăng sáng ngời.'
    ],
    level4Story: {
      title: 'Bài thơ Trăng sáng',
      paragraphs: [
        'Sân nhà em sáng quá,',
        'Nhờ ánh trăng sáng ngời.',
        'Trăng tròn như cái đĩa,',
        'Lơ lửng mà không rơi.',
        'Những hôm nào trăng khuyết,',
        'Trông giống con thuyền trôi.'
      ],
      author: 'Nhược Thuỷ'
    }
  }
];
