import { useEffect, useRef, useState } from "react";

export const useMetronome = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [bpm, setBpm] = useState(120);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const interval = (60 / bpm) * 1000;

  const tick = () => {
    console.log("tick");
  };

  const start = () => {
    if (intervalRef.current) return;

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
