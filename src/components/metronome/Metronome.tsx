'use client';

import { useMetronome } from '@/hooks/useMetronome';

export default function Metronome() {
  const { isPlaying, bpm, setBpm, start, stop } = useMetronome();

  return (
    <div>
      <h2>Metronome</h2>

      <p>BPM: {bpm}</p>

      <input
        type="range"
        min="40"
        max="200"
        value={bpm}
        onChange={(e) => setBpm(Number(e.target.value))}
      />

      <button onClick={isPlaying ? stop : start}>
        {isPlaying ? 'Stop' : 'Start'}
      </button>
    </div>
  );
}