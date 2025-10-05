import React from 'react';
import { Link } from 'react-router-dom';
import BookmarkList from '../components/BookmarkList/BookmarkList';

const Settings = ({ darkMode, toggleDarkMode }) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-green-600 dark:bg-green-800 text-white py-4 shadow-lg">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <Link to="/" className="text-xl font-bold hover:text-green-200 transition">
            ← Kembali
          </Link>
          <h2 className="text-2xl font-bold">⚙️ Pengaturan</h2>
          <div className="w-24"></div>
        </div>
      </header>

      <main className="container mx-auto py-8 px-6 max-w-4xl">
        <section className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
          <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Tampilan</h3>
          <div className="flex justify-between items-center">
            <span className="text-gray-700 dark:text-gray-300">Mode Gelap</span>
            <button
              onClick={toggleDarkMode}
              className={`relative inline-flex h-8 w-14 items-center rounded-full transition ${
                darkMode ? 'bg-green-600' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-6 w-6 transform rounded-full bg-white transition ${
                  darkMode ? 'translate-x-7' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </section>

        <section className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
          <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">📚 Bookmark</h3>
          <BookmarkList />
        </section>

        <section className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">ℹ️ Tentang</h3>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Aplikasi Al-Quran Digital - Amal Jariyah untuk Umat 🇮🇩
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 italic mb-2">
            "خَيْرُ النَّاسِ أَنْفَعُهُمْ لِلنَّاسِ"
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            "Sebaik-baik manusia adalah yang paling bermanfaat bagi manusia"
          </p>
        </section>
      </main>
    </div>
  );
};

export default Settings;