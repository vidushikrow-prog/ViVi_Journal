import { motion } from "motion/react";

interface FooterProps {
  subheading: string;
  onSave?: () => void;
}

export default function Footer({ subheading, onSave }: FooterProps) {
  const getInitials = (text: string) => {
    const parts = text.split(/\s+and\s+|\s+&\s+|\s+/i);
    return parts.map(p => p[0]?.toUpperCase()).join('').slice(0, 2);
  };

  const initials = getInitials(subheading) || "VV";

  return (
    <footer className="py-32 text-center relative overflow-hidden">
      {/* Final Pastel Lanterns */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/4 w-8 h-12 bg-pastel-orange/40 rounded-t-full blur-sm animate-pulse" />
        <div className="absolute bottom-10 right-1/4 w-6 h-10 bg-pastel-pink/40 rounded-t-full blur-sm animate-pulse delay-700" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4">
        <div className="mb-12">
          <motion.button 
            onClick={onSave}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05, boxShadow: "0 0 60px rgba(212,175,55,0.2)" }}
            whileTap={{ scale: 0.95 }}
            className="inline-block border border-desi-gold/30 p-10 rounded-full shadow-[0_0_40px_rgba(212,175,55,0.05)] bg-white/10 backdrop-blur-sm transition-all group"
            title="Save Changes"
          >
            <span className="font-calligraphy text-7xl text-desi-gold leading-none group-hover:text-desi-gold/80">{initials}</span>
          </motion.button>
          <p className="mt-4 text-[10px] uppercase tracking-[0.4em] text-desi-gold font-bold opacity-0 group-hover:opacity-100 transition-opacity">
            Click to Save Changes
          </p>
        </div>
        
        <h3 className="font-calligraphy text-5xl text-deep-ocean mb-6 drop-shadow-sm">
          to forever ♡
        </h3>
        
        <div className="flex items-center justify-center gap-6 mb-8">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-desi-gold/30" />
          <p className="font-script text-3xl text-desi-gold italic lowercase whitespace-nowrap">
            {subheading}
          </p>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-desi-gold/30" />
        </div>

        <p className="text-[10px] uppercase tracking-[0.6em] text-deep-ocean/40 font-bold">
          est 2024
        </p>
      </div>
    </footer>
  );
}
