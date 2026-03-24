import React, { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import Hero from "./components/Hero";
import Timeline from "./components/Timeline";
import MemoryForm from "./components/MemoryForm";
import MessageSection from "./components/MessageSection";
import Footer from "./components/Footer";
import Glitter from "./components/Glitter";
import FlowerBackground from "./components/FlowerBackground";
import PasswordPage from "./components/PasswordPage";
import { Toaster, toast } from "sonner";
import { Memory } from "./types";

const INITIAL_MEMORIES: Memory[] = [
  {
    id: "1",
    title: "The Beginning",
    description: "Where it all started. A simple hello that changed our lives forever.",
    imageUrl: "",
    date: Date.now() - 10000000000,
  },
  {
    id: "2",
    title: "Sunset Promises",
    description: "Watching the sky turn into a canvas of orange and pink, promising to always be there.",
    imageUrl: "",
    date: Date.now() - 5000000000,
  }
];

export default function App() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [memories, setMemories] = useState<Memory[]>([]);
  const [editingMemory, setEditingMemory] = useState<Memory | null>(null);
  const [heroData, setHeroData] = useState({
    title: "The ViVi Journal",
    subheading: "vishesh and vidushi",
    quote: "Here's to a lifetime of love, laughter, magic and friendship"
  });
  const [isEditingHero, setIsEditingHero] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    // Check if already unlocked in this session
    const unlocked = sessionStorage.getItem("vivi_unlocked");
    if (unlocked === "true") {
      setIsUnlocked(true);
    }

    const savedMemories = localStorage.getItem("vivi_memories");
    if (savedMemories) {
      setMemories(JSON.parse(savedMemories));
    } else {
      setMemories(INITIAL_MEMORIES);
    }

    const savedHero = localStorage.getItem("vivi_hero");
    if (savedHero) {
      setHeroData(JSON.parse(savedHero));
    }
  }, []);

  const handleUnlock = (password: string) => {
    const correctPassword = import.meta.env.VITE_APP_PASSWORD || "vivi2024";
    if (password === correctPassword) {
      setIsUnlocked(true);
      sessionStorage.setItem("vivi_unlocked", "true");
      setPasswordError("");
    } else {
      setPasswordError("Incorrect Password. Try again, love.");
    }
  };

  if (!isUnlocked) {
    return <PasswordPage onUnlock={handleUnlock} error={passwordError} />;
  }

  const handleSaveHero = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("vivi_hero", JSON.stringify(heroData));
    setIsEditingHero(false);
  };

  const handleSaveMemory = (newMemory: Memory) => {
    let updated;
    if (editingMemory) {
      updated = memories.map(m => m.id === newMemory.id ? newMemory : m);
      setEditingMemory(null);
    } else {
      updated = [newMemory, ...memories];
    }
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

  const handleEditMemory = (memory: Memory) => {
    setEditingMemory(memory);
    document.getElementById('add-memory')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleGlobalSave = () => {
    let savedSomething = false;

    // Save Hero Data if modified
    localStorage.setItem("vivi_hero", JSON.stringify(heroData));
    
    // Trigger Memory Form submit if it has content
    if (formRef.current) {
      formRef.current.requestSubmit();
      savedSomething = true;
    }

    toast.success("Journal Updated!", {
      description: "All your beautiful memories are safe.",
      className: "font-serif italic",
    });
  };

  return (
    <div className="min-h-screen selection:bg-desi-gold selection:text-white pastel-sky-gradient">
      <Toaster position="top-center" expand={true} richColors />
      <Glitter />
      <FlowerBackground />
      <Hero 
        title={heroData.title}
        subheading={heroData.subheading}
        quote={heroData.quote}
        onEditClick={() => setIsEditingHero(true)}
      />

      {/* Hero Edit Modal */}
      {isEditingHero && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-[2rem] p-8 max-w-lg w-full shadow-2xl border border-desi-gold/20"
          >
            <h3 className="font-calligraphy text-4xl text-deep-ocean mb-6">Edit Header</h3>
            <form onSubmit={handleSaveHero} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-desi-gold">Journal Title</label>
                <input 
                  type="text"
                  value={heroData.title}
                  onChange={(e) => setHeroData({...heroData, title: e.target.value})}
                  className="w-full bg-pastel-pink/10 border-b border-desi-gold/30 py-2 outline-none focus:border-desi-gold font-serif text-xl"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-desi-gold">Subheading</label>
                <input 
                  type="text"
                  value={heroData.subheading}
                  onChange={(e) => setHeroData({...heroData, subheading: e.target.value})}
                  className="w-full bg-pastel-pink/10 border-b border-desi-gold/30 py-2 outline-none focus:border-desi-gold font-script text-xl"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-desi-gold">Hero Quote</label>
                <textarea 
                  value={heroData.quote}
                  onChange={(e) => setHeroData({...heroData, quote: e.target.value})}
                  className="w-full bg-pastel-pink/10 border-b border-desi-gold/30 py-2 outline-none focus:border-desi-gold font-serif italic text-lg resize-none"
                  rows={2}
                />
              </div>
              <div className="flex gap-4 pt-4">
                <button 
                  type="button"
                  onClick={() => setIsEditingHero(false)}
                  className="flex-1 py-3 border border-desi-gold/20 rounded-xl text-deep-ocean/60 hover:bg-gray-50 transition-all font-bold uppercase tracking-widest text-xs"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-3 bg-desi-gold text-white rounded-xl shadow-lg hover:bg-desi-gold/90 transition-all font-bold uppercase tracking-widest text-xs"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
      
      <main className="relative">
        <div className="relative z-10">
          <Timeline memories={memories} onDelete={handleDeleteMemory} onEdit={handleEditMemory} />
          <MemoryForm 
            onSave={handleSaveMemory} 
            editingMemory={editingMemory} 
            onCancel={() => setEditingMemory(null)} 
            formRef={formRef}
          />
          <MessageSection />
        </div>
      </main>

      <Footer subheading={heroData.subheading} onSave={handleGlobalSave} />
    </div>
  );
}
