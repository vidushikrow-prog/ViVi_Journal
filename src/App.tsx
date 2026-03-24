import { useState, useEffect } from "react";
import { motion } from "motion/react";
import Hero from "./components/Hero";
import Timeline from "./components/Timeline";
import MemoryForm from "./components/MemoryForm";
import MessageSection from "./components/MessageSection";
import Footer from "./components/Footer";
import Glitter from "./components/Glitter";
import FlowerBackground from "./components/FlowerBackground";
import { Memory } from "./types";

const INITIAL_MEMORIES: Memory[] = [
  {
    id: "1",
    title: "The Beginning",
    description: "Where it all started. A simple hello that changed our lives forever.",
    imageUrl: "https://picsum.photos/seed/couple1/800/1000",
    date: Date.now() - 10000000000,
  },
  {
    id: "2",
    title: "Sunset Promises",
    description: "Watching the sky turn into a canvas of orange and pink, promising to always be there.",
    imageUrl: "https://picsum.photos/seed/couple2/800/1000",
    date: Date.now() - 5000000000,
  }
];

export default function App() {
  const [memories, setMemories] = useState<Memory[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("vivi_memories");
    if (saved) {
      setMemories(JSON.parse(saved));
    } else {
      setMemories(INITIAL_MEMORIES);
    }
  }, []);

  const handleSaveMemory = (newMemory: Memory) => {
    const updated = [newMemory, ...memories];
    setMemories(updated);
    localStorage.setItem("vivi_memories", JSON.stringify(updated));
    
    // Smooth scroll to timeline
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  };

  const handleDeleteMemory = (id: string) => {
    if (window.confirm("Are you sure you want to delete this memory?")) {
      const updated = memories.filter(m => m.id !== id);
      setMemories(updated);
      localStorage.setItem("vivi_memories", JSON.stringify(updated));
    }
  };

  return (
    <div className="min-h-screen selection:bg-desi-gold selection:text-white pastel-sky-gradient">
      <Glitter />
      <FlowerBackground />
      <Hero />
      
      <main className="relative">
        <div className="relative z-10">
          <Timeline memories={memories} onDelete={handleDeleteMemory} />
          <MemoryForm onSave={handleSaveMemory} />
          <MessageSection />
        </div>
      </main>

      <Footer />
    </div>
  );
}
