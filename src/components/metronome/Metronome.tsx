"use client";
import styles from "./Metronome.modules.css";
import { useMetronome } from "@/hooks/useMetronome";

export default function Metronome() {
  const { isPlaying, bpm, setBpm, start, stop } = useMetronome();

  return (
    <div className="flex flex-col items-center justify-center gap-y-10 w-full min-h-screen">
      <h2 className="text-4xl font-bold tracking-wide mb-15">
        Slow Animal Metronome
      </h2>

      <p className="text-2xl font-semibold -tracking-tighter">BPM: {bpm}</p>

      <input
        className="cursor-pointer w-90"
        type="range"
        min="20"
        max="300"
        value={bpm}
        onChange={(e) => setBpm(Number(e.target.value))}
      />

      <button
        type="button"
        className="mt-15 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 shadow-sm font-medium rounded-md text-sm px-4 py-2.5 focus:outline-none cursor-pointer w-100"
        onClick={isPlaying ? stop : start}
      >
        {isPlaying ? "Stop" : "Start"}
      </button>
    </div>
  );
}
