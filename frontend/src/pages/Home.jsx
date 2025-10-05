import React from 'react';
import { Link } from 'react-router-dom';
import SurahList from '../components/SurahList/SurahList';

const Home = ({ darkMode, toggleDarkMode }) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-green-600 dark:bg-green-800 text-white py-6 shadow-lg">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">📖 Al-Quran Digital</h1>
            <div className="flex space-x-4">
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full hover:bg-green-700 transition"
              >
                {darkMode ? '☀️' : '🌙'}
              </button>
              <Link
                to="/settings"
                className="px-4 py-2 bg-green-700 rounded-lg hover:bg-green-800 transition"
              >
                ⚙️ Pengaturan
              </Link>
            </div>
          </div>
          <p className="mt-2 text-green-100">
            Membaca Al-Quran dengan terjemahan dan audio murottal
          </p>
        </div>
      </header>

      <main className="container mx-auto py-8">
        <SurahList />
      </main>
    </div>
  );
};

export default Home;