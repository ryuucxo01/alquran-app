// LocalStorage keys
const STORAGE_KEYS = {
  BOOKMARKS: 'alquran_bookmarks',
  LAST_READ: 'alquran_last_read',
  DARK_MODE: 'alquran_dark_mode',
  READING_HISTORY: 'alquran_reading_history',
};

// Bookmark Management
export const getBookmarks = () => {
  try {
    const bookmarks = localStorage.getItem(STORAGE_KEYS.BOOKMARKS);
    return bookmarks ? JSON.parse(bookmarks) : [];
  } catch (error) {
    console.error('Error getting bookmarks:', error);
    return [];
  }
};

export const saveBookmark = (bookmark) => {
  try {
    const bookmarks = getBookmarks();
    
    // Check if bookmark already exists
    const existingIndex = bookmarks.findIndex(
      b => b.surahNumber === bookmark.surahNumber && b.ayahNumber === bookmark.ayahNumber
    );

    if (existingIndex !== -1) {
      // Remove existing bookmark (toggle off)
      bookmarks.splice(existingIndex, 1);
    } else {
      // Add new bookmark
      bookmarks.push({
        ...bookmark,
        timestamp: new Date().toISOString(),
      });
    }

    localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(bookmarks));
    return true;
  } catch (error) {
    console.error('Error saving bookmark:', error);
    return false;
  }
};

export const removeBookmark = (surahNumber, ayahNumber) => {
  try {
    const bookmarks = getBookmarks();
    const filtered = bookmarks.filter(
      b => !(b.surahNumber === surahNumber && b.ayahNumber === ayahNumber)
    );
    localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(filtered));
    return true;
  } catch (error) {
    console.error('Error removing bookmark:', error);
    return false;
  }
};

export const isBookmarked = (surahNumber, ayahNumber) => {
  const bookmarks = getBookmarks();
  return bookmarks.some(
    b => b.surahNumber === surahNumber && b.ayahNumber === ayahNumber
  );
};

// Last Read Management
export const getLastRead = () => {
  try {
    const lastRead = localStorage.getItem(STORAGE_KEYS.LAST_READ);
    return lastRead ? JSON.parse(lastRead) : null;
  } catch (error) {
    console.error('Error getting last read:', error);
    return null;
  }
};

export const saveLastRead = (surahNumber, ayahNumber) => {
  try {
    const lastRead = {
      surahNumber,
      ayahNumber,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEYS.LAST_READ, JSON.stringify(lastRead));
    return true;
  } catch (error) {
    console.error('Error saving last read:', error);
    return false;
  }
};

// Dark Mode Management
export const getDarkMode = () => {
  try {
    const darkMode = localStorage.getItem(STORAGE_KEYS.DARK_MODE);
    return darkMode === 'true';
  } catch (error) {
    console.error('Error getting dark mode:', error);
    return false;
  }
};

export const setDarkMode = (enabled) => {
  try {
    localStorage.setItem(STORAGE_KEYS.DARK_MODE, String(enabled));
    return true;
  } catch (error) {
    console.error('Error setting dark mode:', error);
    return false;
  }
};

// Reading History Management
export const getReadingHistory = () => {
  try {
    const history = localStorage.getItem(STORAGE_KEYS.READING_HISTORY);
    return history ? JSON.parse(history) : [];
  } catch (error) {
    console.error('Error getting reading history:', error);
    return [];
  }
};

export const addToReadingHistory = (surahNumber, surahName) => {
  try {
    const history = getReadingHistory();
    
    // Remove existing entry if present
    const filtered = history.filter(h => h.surahNumber !== surahNumber);
    
    // Add to beginning of array
    filtered.unshift({
      surahNumber,
      surahName,
      timestamp: new Date().toISOString(),
    });
    
    // Keep only last 20 items
    const trimmed = filtered.slice(0, 20);
    
    localStorage.setItem(STORAGE_KEYS.READING_HISTORY, JSON.stringify(trimmed));
    return true;
  } catch (error) {
    console.error('Error adding to reading history:', error);
    return false;
  }
};

// Clear all data
export const clearAllData = () => {
  try {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
    return true;
  } catch (error) {
    console.error('Error clearing data:', error);
    return false;
  }
};

export default {
  getBookmarks,
  saveBookmark,
  removeBookmark,
  isBookmarked,
  getLastRead,
  saveLastRead,
  getDarkMode,
  setDarkMode,
  getReadingHistory,
  addToReadingHistory,
  clearAllData,
};
