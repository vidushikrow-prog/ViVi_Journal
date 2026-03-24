import { useEffect, useState } from "react";

export default function Glitter() {
  const [sparkles, setSparkles] = useState<{ id: number; top: string; left: string; duration: string; size: string }[]>([]);

  useEffect(() => {
    const newSparkles = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      duration: `${2 + Math.random() * 3}s`,
      size: `${1 + Math.random() * 3}px`,
    }));
    setSparkles(newSparkles);
  }, []);

  return (
    <div className="glitter-container">
      {sparkles.map((s) => (
        <div
          key={s.id}
          className="sparkle"
          style={{
            top: s.top,
            left: s.left,
            width: s.size,
            height: s.size,
            // @ts-ignore
            "--duration": s.duration,
          }}
        />
      ))}
    </div>
  );
}
