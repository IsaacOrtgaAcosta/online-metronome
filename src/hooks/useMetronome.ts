import { useEffect, useRef, useState } from "react";

export const useMetronome = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [bpm, setBpm] = useState(120);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const clickAudioRef = useRef<HTMLAudioElement | null>(null);
  const accentAudioRef = useRef<HTMLAudioElement | null>(null);
  const currentBeatRef = useRef(0);

  const beatsPerBar = 4;
  const interval = (60 / bpm) * 1000;

  useEffect(() => {
    clickAudioRef.current = new Audio("/bark.wav");
    accentAudioRef.current = new Audio("/cat.wav");
  }, []);

  const tick = () => {
    const isAccent = currentBeatRef.current === 0;
    const audio = isAccent ? accentAudioRef.current : clickAudioRef.current;

    if(audio) {
        audio.currentTime = 0;
        void audio.play();
    }

    currentBeatRef.current = (currentBeatRef.current + 1) % beatsPerBar;
  };

  const start = () => {
    if (intervalRef.current) return;
    currentBeatRef.current = 0;
    tick();
    intervalRef.current = setInterval(tick, interval);
    setIsPlaying(true);
  };

  const stop = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    currentBeatRef.current = 0;
    setIsPlaying(false);
  };


  useEffect(() => {
    if(!isPlaying) return;

    if(intervalRef.current){
        clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(tick, interval);


    return () => {
        if (intervalRef.current){
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    };
  }, [bpm, isPlaying, interval])
  return { isPlaying, bpm, setBpm, start, stop };
};
