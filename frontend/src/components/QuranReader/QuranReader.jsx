import React, { useState, useEffect } from 'react';
import { getSurahDetail } from '../../services/api';
import { saveBookmark, getBookmarks } from '../../services/storage';

const QuranReader = ({ surahNumber }) => {
  const [surah, setSurah] = useState(null);
  const [ayahs, setAyahs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    fetchSurah();
    loadBookmarks();
  }, [surahNumber]);

  const fetchSurah = async () => {
    try {
      setLoading(true);
      const data = await getSurahDetail(surahNumber);
      setSurah(data.surah);
      setAyahs(data.ayahs);
      setError(null);
    } catch (err) {
      setError('Gagal memuat surah. Silakan coba lagi.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loadBookmarks = () => {
    const savedBookmarks = getBookmarks();
    setBookmarks(savedBookmarks);
  };

  const toggleBookmark = (ayahNumber) => {
    const bookmarkData = {
      surahNumber: parseInt(surahNumber),
      ayahNumber,
      surahName: surah?.englishName || '',
      timestamp: new Date().toISOString()
    };
    saveBookmark(bookmarkData);
    loadBookmarks();
  };

  const isBookmarked = (ayahNumber) => {
    return bookmarks.some(
      b => b.surahNumber === parseInt(surahNumber) && b.ayahNumber === ayahNumber
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
        <button
          onClick={fetchSurah}
          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          Coba Lagi
        </button>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto px-6">
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg p-8 mb-8 text-center shadow-xl">
        <h1 className="text-4xl font-bold mb-2">{surah?.englishName}</h1>
        <p className="text-green-100 text-lg mb-1">{surah?.englishNameTranslation}</p>
        <p className="text-green-200 text-sm">
          {surah?.revelationType === 'Meccan' ? '🕋 Makkiyah' : '🕌 Madaniyah'} • {surah?.numberOfAyahs} Ayat
        </p>
      </div>

      {surahNumber !== '9' && surahNumber !== 9 && (
        <div className="text-center py-8 mb-8 bg-green-50 dark:bg-gray-800 rounded-lg shadow-md">
          <p className="text-4xl font-arabic text-green-700 dark:text-green-500">
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            Dengan nama Allah Yang Maha Pengasih, Maha Penyayang
          </p>
        </div>
      )}

      <div className="space-y-6">
        {ayahs.map((ayah) => (
          <div
            key={ayah.numberInSurah}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-xl transition-all"
          >
            <div className="text-right mb-4">
              <p className="text-3xl font-arabic leading-loose text-gray-900 dark:text-white">
                {ayah.text}{' '}
                <span className="inline-block mr-2 text-2xl text-green-600 dark:text-green-500">
                  ﴿{ayah.numberInSurah}﴾
                </span>
              </p>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
              <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                {ayah.translation}
              </p>
            </div>

            <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
              <button
                onClick={() => toggleBookmark(ayah.numberInSurah)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                  isBookmarked(ayah.numberInSurah)
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                <span>{isBookmarked(ayah.numberInSurah) ? '📌' : '🔖'}</span>
                <span>{isBookmarked(ayah.numberInSurah) ? 'Tersimpan' : 'Bookmark'}</span>
              </button>

              <span className="text-sm text-gray-500 dark:text-gray-400">
                Ayat {ayah.numberInSurah} dari {surah?.numberOfAyahs}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuranReader;