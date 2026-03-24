import { motion } from "motion/react";
import { Trash2 } from "lucide-react";
import { Memory } from "../types";

interface TimelineProps {
  memories: Memory[];
  onDelete?: (id: string) => void;
}

export default function Timeline({ memories, onDelete }: TimelineProps) {
  return (
    <section className="py-32 px-4 max-w-6xl mx-auto relative">
      <div className="relative">
        <div className="space-y-32">
          {memories.map((memory, index) => (
            <motion.div
              key={memory.id}
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative flex flex-col items-center"
            >
              {/* Card Container */}
              <div className="w-full max-w-xl group relative">
                {/* Delete Button */}
                {onDelete && (
                  <button
                    onClick={() => onDelete(memory.id)}
                    className="absolute -top-4 -right-4 z-30 p-3 bg-white/80 backdrop-blur-sm rounded-full text-red-400 opacity-0 group-hover:opacity-100 transition-all hover:bg-red-50 hover:text-red-600 shadow-lg border border-red-100"
                    title="Delete Memory"
                  >
                    <Trash2 size={20} />
                  </button>
                )}
                
                <div className="relative p-1 rounded-[2.5rem] bg-gradient-to-br from-desi-gold/50 via-pastel-pink to-pastel-orange/50 shadow-xl transition-all duration-500 group-hover:scale-[1.02] group-hover:shadow-pastel-pink/50">
                  <div className="glass-card rounded-[2.4rem] overflow-hidden">
                    {/* Image with Zoom Effect */}
                    <div className="aspect-[4/5] w-full overflow-hidden relative">
                      <img
                        src={memory.imageUrl}
                        alt={memory.title}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                        referrerPolicy="no-referrer"
                      />
                      {/* Decorative Corner Motifs */}
                      <div className="absolute top-6 left-6 w-12 h-12 border-t border-l border-desi-gold/40" />
                      <div className="absolute bottom-6 right-6 w-12 h-12 border-b border-r border-desi-gold/40" />
                      
                      {/* Overlay Title - Glassmorphism */}
                      <div className="absolute inset-0 bg-gradient-to-t from-deep-ocean/60 via-transparent to-transparent flex items-end p-8">
                        <motion.h3 
                          className="font-serif text-white text-3xl md:text-4xl font-bold tracking-tight drop-shadow-sm"
                        >
                          {memory.title}
                        </motion.h3>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description - Storybook Style */}
                <div className="mt-8 px-6 text-center">
                  <div className="flex items-center gap-4 mb-4 justify-center">
                    <div className="h-px flex-1 bg-desi-gold/20" />
                    <span className="font-calligraphy text-5xl text-desi-gold">Chapter {index + 1}</span>
                    <div className="h-px flex-1 bg-desi-gold/20" />
                  </div>
                  <p className="text-deep-ocean/80 text-lg font-serif italic leading-relaxed mb-4">
                    {memory.description}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-desi-gold font-bold uppercase tracking-[0.3em] justify-center">
                    <span className="w-8 h-px bg-desi-gold/40" />
                    {new Date(memory.date).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}
                  </div>
                </div>
              </div>

              {/* Timeline Dot - Pastel Lantern Style */}
              <motion.div 
                animate={{ scale: [1, 1.1, 1], opacity: [0.6, 0.9, 0.6] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="mt-16 w-8 h-12 bg-gradient-to-t from-pastel-orange to-white rounded-t-full rounded-b-sm shadow-[0_0_15px_rgba(255,218,185,0.4)] z-10" 
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
