import axios from 'axios';

const API_BASE_URL = 'https://api.alquran.cloud/v1';

// Get list of all surahs
export const getSurahList = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/surah`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching surah list:', error);
    throw error;
  }
};

// Get surah detail with Indonesian translation
export const getSurahDetail = async (surahNumber) => {
  try {
    // Fetch Arabic text
    const arabicResponse = await axios.get(`${API_BASE_URL}/surah/${surahNumber}`);
    
    // Fetch Indonesian translation
    const translationResponse = await axios.get(
      `${API_BASE_URL}/surah/${surahNumber}/id.indonesian`
    );

    const arabicData = arabicResponse.data.data;
    const translationData = translationResponse.data.data;

    // Combine Arabic and translation
    const ayahs = arabicData.ayahs.map((ayah, index) => ({
      number: ayah.number,
      numberInSurah: ayah.numberInSurah,
      text: ayah.text,
      translation: translationData.ayahs[index]?.text || '',
      surah: ayah.surah,
    }));

    return {
      surah: {
        number: arabicData.number,
        name: arabicData.name,
        englishName: arabicData.englishName,
        englishNameTranslation: arabicData.englishNameTranslation,
        numberOfAyahs: arabicData.numberOfAyahs,
        revelationType: arabicData.revelationType,
      },
      ayahs: ayahs,
    };
  } catch (error) {
    console.error('Error fetching surah detail:', error);
    throw error;
  }
};

// Get audio URL for surah
export const getAudioUrl = (surahNumber) => {
  // Using Mishary Rashid Alafasy recitation
  const paddedNumber = String(surahNumber).padStart(3, '0');
  return `https://cdn.islamic.network/quran/audio/128/ar.alafasy/${paddedNumber}.mp3`;
};

// Search ayahs by keyword
export const searchAyahs = async (keyword) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/search/${encodeURIComponent(keyword)}/all/id.indonesian`
    );
    return response.data.data.matches;
  } catch (error) {
    console.error('Error searching ayahs:', error);
    throw error;
  }
};

// Get random ayah
export const getRandomAyah = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/ayah/random`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching random ayah:', error);
    throw error;
  }
};

export default {
  getSurahList,
  getSurahDetail,
  getAudioUrl,
  searchAyahs,
  getRandomAyah,
};
