import React, { useState, useRef, useEffect } from 'react';

const AudioPlayer = ({ surahNumber, audioUrl }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetadata = () => setDuration(audio.duration);
    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleEnded = () => { setIsPlaying(false); setCurrentTime(0); };

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [audioUrl]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) { audio.pause(); } else { audio.play(); }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e) => {
    const audio = audioRef.current;
    if (!audio) return;
    const seekTime = parseFloat(e.target.value);
    audio.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  const handleVolumeChange = (e) => {
    const audio = audioRef.current;
    if (!audio) return;
    const newVolume = parseFloat(e.target.value);
    audio.volume = newVolume;
    setVolume(newVolume);
  };

  const formatTime = (seconds) => {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t shadow-2xl z-50">
      <audio ref={audioRef} src={audioUrl} preload="metadata" />
      
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className="bg-green-600 text-white rounded-full p-2">🎵</div>
            <div>
              <p className="font-bold text-gray-900 dark:text-white">Murottal Surah {surahNumber}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Syeikh Mishary Alafasy</p>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-2">
            <span>🔊</span>
            <input type="range" min="0" max="1" step="0.01" value={volume} onChange={handleVolumeChange} className="w-20" />
          </div>
        </div>

        <div className="mb-3">
          <input type="range" min="0" max={duration || 0} value={currentTime} onChange={handleSeek} className="w-full h-2 bg-gray-300 rounded-lg" />
          <div className="flex justify-between text-xs text-gray-600 mt-1">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        <div className="flex justify-center space-x-6">
          <button onClick={() => { const audio = audioRef.current; if (audio) audio.currentTime -= 10; }} className="text-2xl">⏪</button>
          <button onClick={togglePlay} className="bg-green-600 text-white rounded-full p-4 text-2xl">{isPlaying ? '⏸️' : '▶️'}</button>
          <button onClick={() => { const audio = audioRef.current; if (audio) audio.currentTime += 10; }} className="text-2xl">⏩</button>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
