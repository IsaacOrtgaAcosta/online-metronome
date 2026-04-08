import { useEffect, useRef, useState } from "react";

export const useMetronome = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [bpm, setBpm] = useState(120);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const interval = (60 / bpm) * 1000;

  useEffect(() => {
    audioRef.current = new Audio('/bark.wav')
  }
)

  const tick = () => {
    if(!audioRef.current) return;

    audioRef.current.currentTime = 0;
    audioRef.current.play();
  };

  const start = () => {
    if (intervalRef.current) return;
    tick();
    intervalRef.current = setInterval(tick, interval);
    setIsPlaying(true);
  };

  const stop = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsPlaying(false);
  };

  useEffect(() => {
    if (isPlaying) {
      stop();
      start();
    }
  }, [bpm]);

  return { isPlaying, bpm, setBpm, start, stop };
};
