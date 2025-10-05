import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getSurahList } from '../../services/api';

const SurahList = () => {
  const [surahs, setSurahs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSurahs();
  }, []);

  const fetchSurahs = async () => {
    try {
      setLoading(true);
      const data = await getSurahList();
      setSurahs(data);
      setError(null);
    } catch (err) {
      setError('Gagal memuat daftar surah. Silakan coba lagi.');
      console.error(err);
    } finally {
      setLoading(false);
    }
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
          onClick={fetchSurahs}
          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          Coba Lagi
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-6">
      {surahs.map((surah) => (
        <Link
          key={surah.number}
          to={`/reader/${surah.number}`}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition p-6 border-l-4 border-green-600"
        >
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                {surah.number}. {surah.englishName}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {surah.englishNameTranslation}
              </p>
            </div>
            <span className="text-2xl font-arabic text-green-700 dark:text-green-500">
              {surah.name}
            </span>
          </div>
          <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mt-3">
            <span>{surah.revelationType === 'Meccan' ? '🕋 Makkiyah' : '🕌 Madaniyah'}</span>
            <span>📖 {surah.numberOfAyahs} Ayat</span>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default SurahList;