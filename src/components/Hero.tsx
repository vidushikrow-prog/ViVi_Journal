import { motion } from "motion/react";
import { Settings } from "lucide-react";

interface HeroProps {
  title: string;
  subheading: string;
  quote: string;
  onEditClick: () => void;
}

export default function Hero({ title, subheading, quote, onEditClick }: HeroProps) {
  return (
    <section className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden">
      {/* Edit Trigger */}
      <button 
        onClick={onEditClick}
        className="absolute top-8 right-8 z-50 p-4 bg-white/10 backdrop-blur-md rounded-full text-desi-gold hover:bg-desi-gold hover:text-white transition-all border border-desi-gold/20 shadow-xl group"
        title="Edit Header Content"
      >
        <Settings size={20} className="group-hover:rotate-90 transition-transform duration-500" />
      </button>

      {/* Floating Lanterns - More pastel and varied */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              y: "110vh", 
              x: `${Math.random() * 100}vw`, 
              opacity: 0,
              scale: 0.5 + Math.random() * 1.5
            }}
            animate={{
              y: "-20vh",
              opacity: [0, 0.6, 0.6, 0],
              x: `${(Math.random() - 0.5) * 30 + (i % 10) * 10}vw`,
            }}
            transition={{
              duration: 12 + Math.random() * 18,
              repeat: Infinity,
              delay: Math.random() * 20,
              ease: "linear",
            }}
            className="absolute w-6 h-10 bg-gradient-to-t from-pastel-orange to-white rounded-t-lg rounded-b-sm shadow-[0_0_15px_rgba(255,218,185,0.6)]"
          />
        ))}
      </div>

      {/* Central Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="z-10 text-center px-4"
      >
        <div className="mb-4 relative inline-block">
          <motion.div 
            animate={{ opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute -inset-10 bg-pastel-pink/30 blur-3xl rounded-full"
          />
          <h1 className="font-algerian text-deep-ocean text-6xl md:text-7xl mb-2 drop-shadow-sm whitespace-nowrap">
            {title}
          </h1>
        </div>
        
        <h2 className="font-script text-desi-gold text-2xl md:text-3xl mb-12 drop-shadow-sm leading-tight italic lowercase whitespace-nowrap">
          {subheading}
        </h2>

        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: "300px" }}
          transition={{ delay: 1, duration: 1.5 }}
          className="h-px bg-gradient-to-r from-transparent via-desi-gold to-transparent mx-auto mb-12"
        />
        
        <p className="font-serif italic text-deep-ocean/70 text-xl md:text-2xl max-w-2xl mx-auto">
          "{quote}"
        </p>
      </motion.div>
    </section>
  );
}
