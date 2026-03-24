import React, { useState } from "react";
import { motion } from "motion/react";
import { Lock, Heart } from "lucide-react";

interface PasswordPageProps {
  onUnlock: (password: string) => void;
  error?: string;
}

export default function PasswordPage({ onUnlock, error }: PasswordPageProps) {
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUnlock(password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 pastel-sky-gradient relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-pastel-pink/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-pastel-orange/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="max-w-md w-full glass-card p-10 rounded-[3rem] text-center relative z-10 border border-white/40 shadow-2xl"
      >
        <div className="mb-8 inline-block p-5 rounded-full bg-white/30 backdrop-blur-md shadow-inner">
          <Lock className="w-8 h-8 text-desi-gold" />
        </div>

        <h1 className="font-algerian text-deep-ocean text-4xl mb-4 tracking-tight">
          Our Space
        </h1>
        
        <p className="font-serif italic text-deep-ocean/60 mb-8 text-lg">
          Please enter the secret password to enter our journal of memories.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"
              className="w-full bg-white/20 border-b-2 border-desi-gold/30 py-4 px-4 outline-none focus:border-desi-gold transition-all font-serif text-xl text-center text-deep-ocean placeholder:text-deep-ocean/30 rounded-xl backdrop-blur-sm"
              autoFocus
            />
          </div>

          {error && (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-400 text-sm font-bold uppercase tracking-widest"
            >
              {error}
            </motion.p>
          )}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-desi-gold text-white py-4 rounded-2xl font-bold tracking-[0.3em] uppercase text-xs shadow-xl hover:bg-desi-gold/90 transition-all flex items-center justify-center gap-3"
          >
            Unlock <Heart size={14} className="fill-current" />
          </motion.button>
        </form>

        <p className="mt-12 text-[10px] uppercase tracking-[0.5em] text-deep-ocean/40 font-bold">
          vishesh & vidushi
        </p>
      </motion.div>
    </div>
  );
}
