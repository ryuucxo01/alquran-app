import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getBookmarks, removeBookmark } from '../../services/storage';

const BookmarkList = () => {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    loadBookmarks();
  }, []);

  const loadBookmarks = () => {
    const savedBookmarks = getBookmarks();
    setBookmarks(savedBookmarks);
  };

  const handleRemoveBookmark = (surahNumber, ayahNumber) => {
    removeBookmark(surahNumber, ayahNumber);
    loadBookmarks();
  };

  if (bookmarks.length === 0) {
    return (
      <div className="text-center py-10">
        <div className="text-6xl mb-4">📚</div>
        <p className="text-gray-600 dark:text-gray-400 mb-2">
          Belum ada bookmark
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-500">
          Bookmark ayat favorit Anda saat membaca Al-Quran
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          📌 Bookmark Saya ({bookmarks.length})
        </h3>
      </div>

      <div className="space-y-3">
        {bookmarks.map((bookmark, index) => (
          <div
            key={`${bookmark.surahNumber}-${bookmark.ayahNumber}-${index}`}
            className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md hover:shadow-lg transition-all border-l-4 border-green-600"
          >
            <div className="flex justify-between items-start">
              <Link
                to={`/reader/${bookmark.surahNumber}`}
                className="flex-1 hover:text-green-600 dark:hover:text-green-500 transition"
              >
                <div className="flex items-center space-x-3 mb-2">
                  <span className="text-2xl">🔖</span>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white">
                      Surah {bookmark.surahName || bookmark.surahNumber}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Ayat {bookmark.ayahNumber}
                    </p>
                  </div>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                  📅 {new Date(bookmark.timestamp).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </Link>

              <button
                onClick={() => handleRemoveBookmark(bookmark.surahNumber, bookmark.ayahNumber)}
                className="ml-4 text-red-600 hover:text-red-700 dark:text-red-500 dark:hover:text-red-400 transition"
                title="Hapus bookmark"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      {bookmarks.length > 0 && (
        <div className="text-center pt-4">
          <p className="text-sm text-gray-500 dark:text-gray-400 italic">
            "Dan bacalah Al-Quran dengan tartil" - QS. Al-Muzzammil: 4
          </p>
        </div>
      )}
    </div>
  );
};

export default BookmarkList;
