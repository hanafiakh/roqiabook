import React, { useState, useMemo, useEffect, useRef } from 'react';
import { 
  Menu, 
  X, 
  Search, 
  BookOpen, 
  ChevronLeft, 
  Heart, 
  Share2,
  Minus,
  Plus,
  Type,
  ExternalLink,
  CheckCircle,
  Circle,
  ArrowUp,
  ArrowDown,
  Sun,
  Moon,
  Copy,
  Check
} from 'lucide-react';
import { RUQYAH_DATA } from './constants';
import { Category, Verse } from './types';

// --- Components ---

const Header = ({ 
  toggleSidebar, 
  searchQuery, 
  setSearchQuery, 
  title,
  fontSize,
  setFontSize,
  theme,
  toggleTheme
}: { 
  toggleSidebar: () => void; 
  searchQuery: string; 
  setSearchQuery: (q: string) => void;
  title: string;
  fontSize: number;
  setFontSize: (size: number) => void;
  theme: string;
  toggleTheme: () => void;
}) => (
  <header className="sticky top-0 z-30 bg-emerald-900 dark:bg-emerald-950 text-white shadow-lg transition-colors duration-300">
    <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-2">
      <div className="flex items-center gap-3 shrink-0">
        <button 
          onClick={toggleSidebar} 
          className="p-2 hover:bg-emerald-800 dark:hover:bg-emerald-900 rounded-lg lg:hidden transition-colors"
          aria-label="Toggle Menu"
        >
          <Menu className="w-6 h-6" />
        </button>
        <div className="flex items-center gap-3">
          <div className="bg-gold-500 p-1.5 rounded-full hidden sm:block shadow-md">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <h1 className="font-bold text-lg sm:text-xl md:text-2xl truncate max-w-[150px] sm:max-w-xs md:max-w-sm">
            {title}
          </h1>
        </div>
      </div>

      <div className="flex-1 max-w-md mx-4 hidden md:block">
        <div className="relative">
          <input
            type="text"
            placeholder="ابحث في الأقسام..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-emerald-800/50 dark:bg-emerald-900/50 border border-emerald-700 dark:border-emerald-800 rounded-full py-2 pr-10 pl-4 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 placeholder-emerald-300/70 text-white transition-colors"
          />
          <Search className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-emerald-300" />
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        {/* Font Controls */}
        <div className="flex items-center bg-emerald-800/60 dark:bg-emerald-900/60 rounded-lg p-1 border border-emerald-700/50 dark:border-emerald-800/50">
          <button 
            onClick={() => setFontSize(Math.max(14, fontSize - 2))}
            className="p-1.5 hover:bg-emerald-700 dark:hover:bg-emerald-800 rounded text-emerald-100 transition-colors"
            title="تصغير الخط"
          >
            <Minus className="w-4 h-4" />
          </button>
          <div className="px-2 flex items-center gap-1 select-none min-w-[30px] justify-center">
            <Type className="w-3 h-3 text-emerald-300" />
            <span className="text-xs font-medium">{fontSize}</span>
          </div>
          <button 
            onClick={() => setFontSize(Math.min(50, fontSize + 2))}
            className="p-1.5 hover:bg-emerald-700 dark:hover:bg-emerald-800 rounded text-emerald-100 transition-colors"
            title="تكبير الخط"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {/* Theme Toggle */}
        <button 
          onClick={toggleTheme}
          className="p-2 hover:bg-emerald-800 dark:hover:bg-emerald-900 rounded-lg transition-colors text-emerald-100 hover:text-white"
          title={theme === 'dark' ? 'الوضع النهاري' : 'الوضع الليلي'}
        >
          {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        <button className="p-2 hover:bg-emerald-800 dark:hover:bg-emerald-900 rounded-lg transition-colors hidden sm:block" title="مشاركة التطبيق">
           <Share2 className="w-5 h-5" />
        </button>
      </div>
    </div>
    
    {/* Mobile Search Bar */}
    <div className="md:hidden px-4 pb-3">
       <div className="relative">
          <input
            type="text"
            placeholder="ابحث في الأقسام..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-emerald-800/50 dark:bg-emerald-900/50 border border-emerald-700 dark:border-emerald-800 rounded-lg py-2 pr-10 pl-4 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 placeholder-emerald-300/70 text-white transition-colors"
          />
          <Search className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-emerald-300" />
        </div>
    </div>
  </header>
);

const Sidebar = ({ 
  isOpen, 
  close, 
  categories, 
  selectedId, 
  onSelect 
}: { 
  isOpen: boolean; 
  close: () => void; 
  categories: Category[]; 
  selectedId: string;
  onSelect: (id: string) => void;
}) => {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={close}
        />
      )}

      {/* Sidebar Panel */}
      <aside 
        className={`
          fixed top-0 right-0 h-full w-80 bg-white dark:bg-slate-900 z-50 shadow-2xl transform transition-transform duration-300 ease-in-out
          lg:translate-x-0 lg:static lg:h-[calc(100vh-64px)] lg:shadow-none border-l border-slate-200 dark:border-slate-800
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        <div className="h-full flex flex-col">
          <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center lg:hidden">
            <span className="font-bold text-emerald-800 dark:text-emerald-400">قائمة الأقسام</span>
            <button onClick={close} className="p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto py-2 custom-scrollbar">
            {/* Favorites Item */}
             <button
                onClick={() => {
                  onSelect('favorites');
                  close();
                }}
                className={`
                  w-full text-right px-6 py-4 flex items-center gap-3 transition-all duration-200
                  border-b border-slate-50 dark:border-slate-800/50 hover:bg-red-50 dark:hover:bg-red-900/10 group
                  ${selectedId === 'favorites' ? 'bg-red-50 dark:bg-red-900/20 border-r-4 border-r-red-500' : 'border-r-4 border-r-transparent'}
                `}
              >
                <div className={`
                  p-1.5 rounded-full transition-colors
                  ${selectedId === 'favorites' ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400' : 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 group-hover:bg-red-100 dark:group-hover:bg-red-900/30 group-hover:text-red-500 dark:group-hover:text-red-400'}
                `}>
                  <Heart className={`w-4 h-4 ${selectedId === 'favorites' ? 'fill-current' : ''}`} />
                </div>
                <span className={`
                  font-medium text-sm sm:text-base
                  ${selectedId === 'favorites' ? 'text-red-800 dark:text-red-400 font-bold' : 'text-slate-600 dark:text-slate-300'}
                `}>
                  المفضلة
                </span>
                {selectedId === 'favorites' && (
                  <ChevronLeft className="w-4 h-4 mr-auto text-red-500" />
                )}
              </button>

            {/* Divider */}
            <div className="my-2 border-t border-slate-100 dark:border-slate-800 mx-4" />

            {/* Categories */}
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  onSelect(cat.id);
                  close();
                }}
                className={`
                  w-full text-right px-6 py-4 flex items-center gap-3 transition-all duration-200
                  border-b border-slate-50 dark:border-slate-800/50 hover:bg-emerald-50 dark:hover:bg-emerald-900/10 group
                  ${selectedId === cat.id ? 'bg-emerald-50 dark:bg-emerald-900/20 border-r-4 border-r-emerald-600 dark:border-r-emerald-500' : 'border-r-4 border-r-transparent'}
                `}
              >
                <span className={`
                  w-2 h-2 rounded-full transition-colors
                  ${selectedId === cat.id ? 'bg-emerald-600 dark:bg-emerald-500' : 'bg-slate-300 dark:bg-slate-600 group-hover:bg-emerald-400'}
                `}></span>
                <span className={`
                  font-medium text-sm sm:text-base
                  ${selectedId === cat.id ? 'text-emerald-900 dark:text-emerald-400 font-bold' : 'text-slate-600 dark:text-slate-300'}
                `}>
                  {cat.title}
                </span>
                {selectedId === cat.id && (
                  <ChevronLeft className="w-4 h-4 mr-auto text-emerald-600 dark:text-emerald-500" />
                )}
              </button>
            ))}
            
            {categories.length === 0 && (
              <div className="p-8 text-center text-slate-400 dark:text-slate-500 text-sm">
                لا توجد نتائج مطابقة
              </div>
            )}
          </div>
          
          <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 text-center text-xs text-slate-500 dark:text-slate-400">
            تطبيق الرقية الشرعية<br/>أبــا الحسين الراقي
          </div>
        </div>
      </aside>
    </>
  );
};

interface VerseCardProps {
  verse: Verse;
  categoryId: string;
  compositeId: string;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
  isRead: boolean;
  onToggleRead: () => void;
  showCategoryContext?: boolean;
  onNavigate?: () => void;
  fontSize: number;
}

const VerseCard = ({ 
  verse, 
  categoryId, 
  compositeId,
  isBookmarked, 
  onToggleBookmark, 
  isRead,
  onToggleRead,
  showCategoryContext, 
  onNavigate,
  fontSize 
}: VerseCardProps) => {
  const [isCopied, setIsCopied] = useState(false);
  const [isShared, setIsShared] = useState(false);

  const handleCopy = async () => {
    const textToCopy = verse.text;
    let copied = false;

    // Try Modern API
    if (navigator.clipboard && navigator.clipboard.writeText) {
      try {
        await navigator.clipboard.writeText(textToCopy);
        copied = true;
      } catch (err) {
        console.warn('Clipboard writeText failed, trying fallback', err);
      }
    }

    // Fallback: execCommand if modern API failed or didn't run
    if (!copied) {
      try {
        const textArea = document.createElement("textarea");
        textArea.value = textToCopy;
        
        // Ensure it's not visible but part of DOM
        textArea.style.position = "fixed";
        textArea.style.left = "-9999px";
        textArea.style.top = "0";
        document.body.appendChild(textArea);
        
        textArea.focus();
        textArea.select();
        
        copied = document.execCommand('copy');
        document.body.removeChild(textArea);
      } catch (err) {
        console.error('Fallback copy error', err);
      }
    }

    if (copied) {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          text: verse.text,
          title: 'الرقية الشرعية'
        });
      } catch (error) {
        // Ignore AbortError if user cancels share
        if ((error as Error).name !== 'AbortError') {
           console.error('Error sharing', error);
        }
      }
    } else {
      // Fallback to copy if native share is not supported
      await handleCopy();
      setIsShared(true);
      setTimeout(() => setIsShared(false), 2000);
    }
  };

  return (
    <div 
      id={compositeId} 
      className={`bg-white dark:bg-slate-800 rounded-2xl shadow-sm border overflow-hidden hover:shadow-md transition-all duration-300 ${isRead ? 'border-emerald-200/60 dark:border-emerald-800/30 bg-emerald-50/10 dark:bg-emerald-900/5' : 'border-slate-100 dark:border-slate-700'}`}
    >
      <div className={`px-4 py-3 border-b flex justify-between items-center gap-3 transition-colors ${isRead ? 'bg-emerald-100/30 dark:bg-emerald-900/20 border-emerald-100 dark:border-emerald-800/50' : 'bg-emerald-50/50 dark:bg-slate-700/30 border-emerald-100/50 dark:border-slate-700/50'}`}>
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <span className="text-emerald-800 dark:text-emerald-400 text-xs font-bold tracking-wider truncate">
            {showCategoryContext && verse.note ? verse.note : 'المحتوى'}
          </span>
          {showCategoryContext && onNavigate && (
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onNavigate();
              }}
              className="flex items-center gap-1 text-[10px] bg-white dark:bg-slate-800 border border-emerald-200 dark:border-emerald-700 px-2 py-0.5 rounded-full text-emerald-600 dark:text-emerald-400 hover:bg-emerald-600 hover:text-white dark:hover:bg-emerald-500 dark:hover:text-slate-900 transition-colors shrink-0"
            >
              <span className="hidden sm:inline">الذهاب للقسم</span>
              <span className="sm:hidden">القسم</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          )}
        </div>
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
           {/* Share Button */}
           <button 
             onClick={handleShare}
             className="p-1.5 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 rounded-full transition-colors focus:outline-none"
             title={typeof navigator !== 'undefined' && navigator.share ? "مشاركة" : "نسخ للمشاركة"}
           >
              {isShared ? (
                <Check className="w-5 h-5 text-emerald-600 dark:text-emerald-500" />
              ) : (
                <Share2 className="w-5 h-5 text-slate-400 dark:text-slate-500 hover:text-emerald-500 dark:hover:text-emerald-400" />
              )}
           </button>

           {/* Copy Button */}
           <button 
             onClick={handleCopy}
             className="p-1.5 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 rounded-full transition-colors focus:outline-none"
             title={isCopied ? "تم النسخ" : "نسخ النص"}
           >
              {isCopied ? (
                <Check className="w-5 h-5 text-emerald-600 dark:text-emerald-500" />
              ) : (
                <Copy className="w-5 h-5 text-slate-400 dark:text-slate-500 hover:text-emerald-500 dark:hover:text-emerald-400" />
              )}
           </button>

           {/* Mark as Read Button */}
           <button 
             onClick={onToggleRead}
             className="p-1.5 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 rounded-full transition-colors focus:outline-none"
             title={isRead ? "تحديد كغير مقروء" : "تحديد كمقروء"}
           >
              {isRead ? (
                <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-500 fill-emerald-100 dark:fill-emerald-900/50" />
              ) : (
                <Circle className="w-5 h-5 text-slate-400 dark:text-slate-500 hover:text-emerald-500 dark:hover:text-emerald-400" />
              )}
           </button>
           
           {/* Bookmark Button */}
           <button 
             onClick={onToggleBookmark}
             className="p-1.5 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors focus:outline-none"
             title={isBookmarked ? "إزالة من المفضلة" : "إضافة للمفضلة"}
           >
              <Heart 
                className={`w-5 h-5 transition-colors ${
                  isBookmarked 
                  ? 'fill-red-500 text-red-500' 
                  : 'text-slate-400 dark:text-slate-500 hover:text-red-400'
                }`} 
              />
           </button>
        </div>
      </div>
      <div className={`p-5 sm:p-8 transition-opacity ${isRead ? 'opacity-80' : 'opacity-100'}`}>
        <div 
          className="font-serif text-center text-slate-800 dark:text-slate-100 mb-6 drop-shadow-sm whitespace-pre-line leading-relaxed"
          style={{ fontSize: `${fontSize}px`, lineHeight: '2.4' }}
          dir="rtl"
        >
          {verse.text}
        </div>
        
        {verse.source && (
          <div className="flex justify-center mt-6">
            <span className="inline-block px-4 py-1 bg-gold-500/10 dark:bg-gold-500/5 text-gold-600 dark:text-gold-400 text-sm rounded-full font-medium border border-gold-500/20 dark:border-gold-500/10 text-center">
              {verse.source}
            </span>
          </div>
        )}
        
        {verse.note && !showCategoryContext && (
          <div className="mt-4 p-3 bg-slate-50 dark:bg-slate-900/50 rounded-lg text-slate-500 dark:text-slate-400 text-sm text-center">
            {verse.note}
          </div>
        )}
      </div>
    </div>
  );
};

const CategoryDetail = ({ 
  category, 
  bookmarks,
  readVerses,
  onToggleBookmark,
  onToggleRead,
  onNavigateToVerse,
  fontSize
}: { 
  category: Category; 
  bookmarks: string[]; 
  readVerses: string[];
  onToggleBookmark: (id: string) => void; 
  onToggleRead: (id: string) => void;
  onNavigateToVerse: (catId: string, verseId: string) => void;
  fontSize: number;
}) => {
  if (!category) return null;

  const isFavoritesView = category.id === 'favorites';

  // Calculate Reading Progress
  const totalVerses = category.verses.length;
  const completedVerses = category.verses.filter(verse => {
    const compositeId = (verse as any)._originalCompositeId || `${category.id}-${verse.id}`;
    return readVerses.includes(compositeId);
  }).length;
  const progressPercentage = totalVerses > 0 ? (completedVerses / totalVerses) * 100 : 0;

  return (
    <div className="max-w-4xl mx-auto pb-12 animate-fadeIn">
      {/* Header Card */}
      <div className="mb-6 bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 text-center transition-colors">
        <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-3 ${isFavoritesView ? 'text-red-700 dark:text-red-400' : 'text-emerald-900 dark:text-emerald-400'}`}>
          {category.title}
        </h2>
        {category.description && (
          <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base max-w-2xl mx-auto mb-6">
            {category.description}
          </p>
        )}
        
        {/* Progress Bar */}
        {totalVerses > 0 && (
          <div className="max-w-md mx-auto mt-4">
             <div className="flex justify-between items-end mb-2 px-1">
                <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">تقدم القراءة</span>
                <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">
                  {completedVerses} من {totalVerses}
                </span>
             </div>
             <div className="h-2 w-full bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                <div 
                   className={`h-full transition-all duration-700 ease-out rounded-full ${isFavoritesView ? 'bg-red-400' : 'bg-gradient-to-l from-emerald-500 to-emerald-400'}`}
                   style={{ width: `${progressPercentage}%` }}
                />
             </div>
             {progressPercentage === 100 && (
                <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-2 font-medium animate-pulse">
                   ✨ تمت القراءة بالكامل
                </p>
             )}
          </div>
        )}

        <div className="mt-6 flex justify-center gap-2">
           <span className={`h-1 w-20 bg-gradient-to-r from-transparent to-transparent rounded-full opacity-50 ${isFavoritesView ? 'via-red-400' : 'via-gold-500'}`}></span>
        </div>
      </div>

      <div className="grid gap-6">
        {category.verses.map((verse, idx) => {
          const compositeId = (verse as any)._originalCompositeId || `${category.id}-${verse.id}`;
          const isBookmarked = bookmarks.includes(compositeId);
          const isRead = readVerses.includes(compositeId);
          const originalCatId = (verse as any)._originalCategoryId;
          const originalVerseId = (verse as any)._originalVerseId;

          return (
            <VerseCard 
              key={compositeId} 
              verse={verse} 
              categoryId={category.id}
              compositeId={compositeId}
              isBookmarked={isBookmarked}
              onToggleBookmark={() => onToggleBookmark(compositeId)}
              isRead={isRead}
              onToggleRead={() => onToggleRead(compositeId)}
              showCategoryContext={isFavoritesView}
              onNavigate={isFavoritesView && originalCatId ? () => onNavigateToVerse(originalCatId, originalVerseId) : undefined}
              fontSize={fontSize}
            />
          );
        })}
        {category.verses.length === 0 && (
           <div className="text-center py-12 text-slate-400 dark:text-slate-500 bg-white dark:bg-slate-800 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700">
              {isFavoritesView ? 'لم تقم بإضافة أي آيات للمفضلة بعد' : 'سيتم إضافة المحتوى قريباً بإذن الله'}
           </div>
        )}
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>(RUQYAH_DATA[0].id);
  const [searchQuery, setSearchQuery] = useState('');
  const [targetScrollId, setTargetScrollId] = useState<string | null>(null);
  
  // Theme State
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('ruqyah_theme') || 'light';
    }
    return 'light';
  });

  // Apply Theme Effect
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem('ruqyah_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  // State for Scroll To Top visibility
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Ref for the main scrollable container
  const mainContentRef = useRef<HTMLDivElement>(null);

  // Font Size State
  const [fontSize, setFontSize] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('ruqyah_font_size');
      return saved ? parseInt(saved, 10) : 22; // Default 22px
    } catch {
      return 22;
    }
  });

  // Persist Font Size
  useEffect(() => {
    localStorage.setItem('ruqyah_font_size', fontSize.toString());
  }, [fontSize]);

  // Bookmarks State
  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('ruqyah_bookmarks');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error("Failed to parse bookmarks", e);
      return [];
    }
  });

  const toggleBookmark = (compositeId: string) => {
    setBookmarks(prev => {
      const newBookmarks = prev.includes(compositeId)
        ? prev.filter(b => b !== compositeId)
        : [...prev, compositeId];
      localStorage.setItem('ruqyah_bookmarks', JSON.stringify(newBookmarks));
      return newBookmarks;
    });
  };

  // Read Status State
  const [readVerses, setReadVerses] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('ruqyah_read_status');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error("Failed to parse read status", e);
      return [];
    }
  });

  const toggleRead = (compositeId: string) => {
    setReadVerses(prev => {
      const newRead = prev.includes(compositeId)
        ? prev.filter(r => r !== compositeId)
        : [...prev, compositeId];
      localStorage.setItem('ruqyah_read_status', JSON.stringify(newRead));
      return newRead;
    });
  };

  // Filter categories based on search
  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) return RUQYAH_DATA;
    return RUQYAH_DATA.filter(cat => 
      cat.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  // Construct Favorites Category
  const favoritesCategory: Category = useMemo(() => {
    const favoriteVerses: Verse[] = [];
    
    RUQYAH_DATA.forEach(cat => {
      cat.verses.forEach(v => {
        const compositeId = `${cat.id}-${v.id}`;
        if (bookmarks.includes(compositeId)) {
          favoriteVerses.push({
            ...v,
            note: cat.title, // Use note to show category name
            // @ts-ignore - Adding hidden prop for logic
            _originalCompositeId: compositeId,
            _originalCategoryId: cat.id,
            _originalVerseId: v.id 
          });
        }
      });
    });

    return {
      id: 'favorites',
      title: 'المفضلة',
      description: 'قائمة الآيات والأدعية التي قمت بحفظها للوصول السريع',
      verses: favoriteVerses
    };
  }, [bookmarks]);

  const activeCategory = useMemo(() => {
    if (selectedCategoryId === 'favorites') return favoritesCategory;
    return RUQYAH_DATA.find(c => c.id === selectedCategoryId) || RUQYAH_DATA[0];
  }, [selectedCategoryId, favoritesCategory]);

  // Handle Scroll to toggle Visibility of "Back to Top" button
  const handleScroll = () => {
    if (mainContentRef.current) {
      const { scrollTop } = mainContentRef.current;
      // Show button if scrolled down more than 300px
      setShowScrollTop(scrollTop > 300);
    }
  };

  // Scroll to top or specific verse logic
  useEffect(() => {
    if (mainContentRef.current) {
      if (targetScrollId) {
        // If there is a target to scroll to, wait slightly for rendering then scroll
        const timer = setTimeout(() => {
          const element = document.getElementById(targetScrollId);
          if (element) {
             element.scrollIntoView({ behavior: 'smooth', block: 'center' });
             element.classList.add('ring-2', 'ring-gold-500');
             setTimeout(() => element.classList.remove('ring-2', 'ring-gold-500'), 1500);
          }
        }, 100);
        return () => clearTimeout(timer);
      } else {
        // Default behavior: scroll to top
        mainContentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  }, [selectedCategoryId, targetScrollId]);

  const handleCategorySelect = (id: string) => {
    setTargetScrollId(null); // Reset target scroll when manually selecting a category
    setSelectedCategoryId(id);
  };

  const handleNavigateToVerse = (catId: string, verseId: string) => {
    setTargetScrollId(`${catId}-${verseId}`);
    setSelectedCategoryId(catId);
  };

  // Scroll functions
  const scrollToTop = () => {
    mainContentRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToBottom = () => {
    if (mainContentRef.current) {
      mainContentRef.current.scrollTo({ 
        top: mainContentRef.current.scrollHeight, 
        behavior: 'smooth' 
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col transition-colors duration-300">
      <Header 
        toggleSidebar={() => setSidebarOpen(true)} 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        title="أبــا الحسين الراقي"
        fontSize={fontSize}
        setFontSize={setFontSize}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      <div className="flex-1 flex overflow-hidden relative">
        <Sidebar 
          isOpen={isSidebarOpen} 
          close={() => setSidebarOpen(false)} 
          categories={filteredCategories}
          selectedId={selectedCategoryId}
          onSelect={handleCategorySelect}
        />

        <main 
          ref={mainContentRef}
          onScroll={handleScroll}
          className="flex-1 overflow-y-auto h-[calc(100vh-64px)] p-4 sm:p-6 lg:p-8 custom-scrollbar relative"
        >
          {filteredCategories.length === 0 && selectedCategoryId !== 'favorites' ? (
             <div className="flex flex-col items-center justify-center h-full text-slate-400 dark:text-slate-600">
                <Search className="w-16 h-16 mb-4 opacity-20" />
                <p>لا توجد أقسام تطابق بحثك</p>
             </div>
          ) : (
             <CategoryDetail 
                category={activeCategory} 
                bookmarks={bookmarks}
                readVerses={readVerses}
                onToggleBookmark={toggleBookmark}
                onToggleRead={toggleRead}
                onNavigateToVerse={handleNavigateToVerse}
                fontSize={fontSize}
             />
          )}
          
          <footer className="mt-12 text-center text-slate-400 dark:text-slate-500 text-sm py-6 border-t border-slate-200/50 dark:border-slate-800/50">
            <p className="font-medium text-emerald-800 dark:text-emerald-500 mb-1">تطبيق الرقية الشرعية - أبــا الحسين الراقي</p>
            <p>نسأل الله العظيم أن ينفع به الجميع</p>
            <p className="mt-2 text-gold-500 font-bold tracking-widest text-xs">byhanafi</p>
          </footer>
        </main>
        
        {/* Floating Scroll Controls */}
        <div className="fixed bottom-6 left-6 z-40 flex flex-col gap-3">
          {/* Scroll To Top - Shows only when scrolled down */}
          <button
            onClick={scrollToTop}
            className={`p-3 bg-emerald-600 text-white rounded-full shadow-lg hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-600 transition-all duration-300 transform hover:scale-110 active:scale-95 ${
              showScrollTop 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-10 pointer-events-none'
            }`}
            title="الصعود للأعلى"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-6 h-6" />
          </button>
          
          {/* Scroll To Bottom - Always visible */}
          <button
            onClick={scrollToBottom}
            className="p-3 bg-emerald-600 text-white rounded-full shadow-lg hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-600 transition-all hover:scale-110 active:scale-95 opacity-80 hover:opacity-100"
            title="النزول للأسفل"
            aria-label="Scroll to bottom"
          >
            <ArrowDown className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}