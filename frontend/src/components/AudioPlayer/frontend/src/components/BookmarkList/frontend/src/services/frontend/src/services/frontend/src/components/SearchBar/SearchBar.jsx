import React, { useState } from 'react';
import { searchAyahs } from '../../services/api';
import { Link } from 'react-router-dom';

const SearchBar = () => {
  const [keyword, setKeyword] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!keyword.trim()) {
      setError('Silakan masukkan kata kunci pencarian');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setHasSearched(true);
      
      const searchResults = await searchAyahs(keyword);
      setResults(searchResults || []);
    } catch (err) {
      setError('Gagal mencari ayat. Silakan coba lagi.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setKeyword('');
    setResults([]);
    setError(null);
    setHasSearched(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-6">
      {/* Search Form */}
      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Cari ayat Al-Quran... (contoh: rahmat, sabar, syukur)"
              className="w-full px-4 py-3 pr-10 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-600 focus:border-transparent"
            />
            {keyword && (
              <button
                type="button"
                onClick={handleClear}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            )}
          </div>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            <span>🔍</span>
            <span>{loading ? 'Mencari...' : 'Cari'}</span>
          </button>
        </div>
      </form>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
          <p className="text-red-600 dark:text-red-400">{error}</p>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
        </div>
      )}

      {/* Results */}
      {!loading && hasSearched && (
        <>
          {results.length > 0 ? (
            <>
              <div className="mb-6">
                <p className="text-gray-600 dark:text-gray-400">
                  Ditemukan <span className="font-bold text-green-600">{results.length}</span> ayat untuk "{keyword}"
                </p>
              </div>

              <div className="space-y-6">
                {results.map((result, index) => (
                  <div
                    key={`${result.surah.number}-${result.numberInSurah}-${index}`}
                    className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-xl transition-all"
                  >
                    {/* Surah Info */}
                    <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
                      <Link
                        to={`/reader/${result.surah.number}`}
                        className="flex items-center space-x-2 hover:text-green-600 dark:hover:text-green-500 transition"
                      >
                        <span className="text-2xl">📖</span>
                        <div>
                          <h3 className="font-bold text-gray-900 dark:text-white">
                            {result.surah.englishName}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Ayat {result.numberInSurah}
                          </p>
                        </div>
                      </Link>
                      <span className="text-green-600 dark:text-green-500 font-bold">
                        {result.surah.number}:{result.numberInSurah}
                      </span>
                    </div>

                    {/* Arabic Text */}
                    <div className="text-right mb-4">
                      <p className="text-2xl font-arabic leading-loose text-gray-900 dark:text-white">
                        {result.text}
                      </p>
                    </div>

                    {/* Translation */}
                    <div className="bg-green-50 dark:bg-gray-700/50 rounded-lg p-4">
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        {result.text}
                      </p>
                    </div>

                    {/* Action Button */}
                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <Link
                        to={`/reader/${result.surah.number}`}
                        className="inline-flex items-center space-x-2 text-green-600 dark:text-green-500 hover:text-green-700 dark:hover:text-green-400 font-semibold transition"
                      >
                        <span>📚</span>
                        <span>Baca Surah Lengkap</span>
                        <span>→</span>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Tidak ada hasil
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Tidak ditemukan ayat dengan kata kunci "{keyword}"
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                Coba gunakan kata kunci lain
              </p>
            </div>
          )}
        </>
      )}

      {/* Initial State */}
      {!hasSearched && !loading && (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Cari Ayat Al-Quran
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Temukan ayat yang Anda cari dengan mudah
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <button onClick={() => { setKeyword('rahmat'); }} className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm hover:bg-gray-200 dark:hover:bg-gray-600">
              rahmat
            </button>
            <button onClick={() => { setKeyword('sabar'); }} className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm hover:bg-gray-200 dark:hover:bg-gray-600">
              sabar
            </button>
            <button onClick={() => { setKeyword('syukur'); }} className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm hover:bg-gray-200 dark:hover:bg-gray-600">
              syukur
            </button>
            <button onClick={() => { setKeyword('Allah'); }} className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm hover:bg-gray-200 dark:hover:bg-gray-600">
              Allah
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
