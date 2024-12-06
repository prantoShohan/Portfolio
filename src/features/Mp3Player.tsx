// components/Mp3Player.tsx
import React, { useState, useRef, useEffect } from 'react';

interface Mp3PlayerProps {
  mp3FilePath: string;
  title: string;
}

const Mp3Player: React.FC<Mp3PlayerProps> = ({ mp3FilePath, title }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.ontimeupdate = () => {
        if (audioRef.current) {
          setCurrentTime(audioRef.current.currentTime);
        }
      };
      audioRef.current.onloadedmetadata = () => {
        if (audioRef.current) {
          setDuration(audioRef.current.duration);
        }
      };
    }
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const seekTime = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = seekTime;
    }
    setCurrentTime(seekTime);
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg p-4 space-y-4">
      <audio ref={audioRef} src={mp3FilePath} preload="auto" />
      
      {/* Title aligned to the left */}
      <div className="text-sm font-semibold text-left">{title}</div>

      <div className="flex items-center space-x-4 border border-gray-300 rounded-xl">
        {/* Play/Pause Button with no background */}
        <button
          onClick={togglePlay}
          className="w-8 h-8 text-black rounded-full flex justify-center items-center transition duration-300 hover:bg-gray-200"
        >
          {isPlaying ? (
            // Pause Icon (double vertical bars)
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 4h4v16H6zM14 4h4v16h-4z" />
            </svg>

          ) : (
            // Play Icon (triangle)
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v18l15-9-15-9" />
            </svg>
          )}
        </button>

        {/* Progress Bar */}
        <input
          type="range"
          min="0"
          max={duration}
          value={currentTime}
          onChange={handleSeek}
          className="w-full h-2 bg-gray-200 rounded-lg cursor-pointer"
        />
      </div>
    </div>
  );
};

export default Mp3Player;
