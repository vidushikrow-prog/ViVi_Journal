import React, { useState, useRef } from "react";
import { motion } from "motion/react";
import { Upload, Sparkles } from "lucide-react";
import { Memory } from "../types";

interface MemoryFormProps {
  onSave: (memory: Memory) => void;
}

export default function MemoryForm({ onSave }: MemoryFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !image) return;

    const newMemory: Memory = {
      id: Date.now().toString(),
      title,
      description,
      imageUrl: image,
      date: Date.now(),
    };

    onSave(newMemory);
    setTitle("");
    setDescription("");
    setImage(null);
  };

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-3xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.div 
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            className="inline-block p-4 rounded-full bg-pastel-pink/40 mb-6"
          >
            <Sparkles className="w-8 h-8 text-desi-gold" />
          </motion.div>
          <h2 className="font-calligraphy text-6xl md:text-7xl text-deep-ocean mb-4">
            The Next Chapter
          </h2>
          <p className="text-desi-gold italic text-2xl font-script">Add a New Memory</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8 glass-card p-8 md:p-12 rounded-[3rem]">
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="relative h-80 w-full border-2 border-dashed border-desi-gold/20 rounded-[2rem] flex flex-col items-center justify-center cursor-pointer hover:border-desi-gold transition-all overflow-hidden group bg-white/10"
          >
            {image ? (
              <>
                <img src={image} alt="Preview" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                  <span className="text-white font-bold tracking-widest uppercase">Change Photo</span>
                </div>
              </>
            ) : (
              <div className="text-center p-6">
                <Upload className="w-16 h-16 text-desi-gold/50 mx-auto mb-6" />
                <p className="text-desi-gold font-serif text-lg">Click to upload a beautiful moment</p>
              </div>
            )}
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleImageChange} 
              className="hidden" 
              accept="image/*"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-[0.3em] text-desi-gold font-bold">Memory Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Where was this?"
                className="w-full bg-transparent border-b border-desi-gold/30 py-4 focus:border-desi-gold outline-none transition-colors font-serif text-2xl text-deep-ocean placeholder:text-deep-ocean/30"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs uppercase tracking-[0.3em] text-desi-gold font-bold">The Story</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="What happened?"
                rows={1}
                className="w-full bg-transparent border-b border-desi-gold/30 py-4 focus:border-desi-gold outline-none transition-colors font-serif italic text-xl text-deep-ocean placeholder:text-deep-ocean/30 resize-none"
                required
              />
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02, backgroundColor: "#D4AF37", color: "white" }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-white text-desi-gold border border-desi-gold/30 font-bold py-5 rounded-2xl shadow-sm transition-all duration-300 uppercase tracking-[0.4em] text-lg"
          >
            Save Memory
          </motion.button>
        </form>
      </div>
    </section>
  );
}
