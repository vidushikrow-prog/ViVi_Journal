import { useEffect, useState } from "react";

const FLOWER_COLORS = ["#FFD1DC", "#FFDAB9", "#E6E6FA", "#B0E0E6", "#FFB6C1"];

export default function FlowerBackground() {
  const [flowers, setFlowers] = useState<{ id: number; top: string; left: string; duration: string; size: string; color: string }[]>([]);

  useEffect(() => {
    const newFlowers = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      duration: `${6 + Math.random() * 8}s`,
      size: `${8 + Math.random() * 12}px`,
      color: FLOWER_COLORS[Math.floor(Math.random() * FLOWER_COLORS.length)],
    }));
    setFlowers(newFlowers);
  }, []);

  return (
    <div className="flower-container">
      {flowers.map((f) => (
        <div
          key={f.id}
          className="flower"
          style={{
            top: f.top,
            left: f.left,
            width: f.size,
            height: f.size,
            color: f.color,
            // @ts-ignore
            "--duration": f.duration,
          }}
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12,22C12,22 13,18 15,18C17,18 18,19 18,21C18,21 20,20 20,18C20,16 19,15 17,15C17,15 21,14 21,12C21,10 20,9 18,9C18,9 20,8 20,6C20,4 18,3 18,3C18,3 17,4 15,4C13,4 12,0 12,0C12,0 11,4 9,4C7,4 6,3 6,3C6,3 4,4 4,6C4,8 6,9 6,9C6,9 3,10 3,12C3,14 7,15 7,15C7,15 4,16 4,18C4,20 6,21 6,21C6,21 7,18 9,18C11,18 12,22 12,22Z" />
          </svg>
        </div>
      ))}
    </div>
  );
}
