import { motion } from "motion/react";
import { Send } from "lucide-react";

export default function MessageSection() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-xl mx-auto text-center">
        <h2 className="font-calligraphy text-5xl text-deep-ocean mb-8">Leave a Message</h2>
        
        <form 
          action="https://formspree.io/f/mpqyverv" 
          method="POST"
          className="relative"
        >
          <textarea
            name="message"
            placeholder="Write a sweet note for us..."
            rows={4}
            className="w-full glass-card rounded-2xl p-6 focus:border-desi-gold outline-none transition-all font-serif italic text-deep-ocean placeholder:text-deep-ocean/30"
            required
          />
          
          <motion.button
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            type="submit"
            className="absolute bottom-4 right-4 bg-desi-gold text-white p-3 rounded-full shadow-lg hover:bg-deep-ocean transition-colors"
          >
            <Send size={20} />
          </motion.button>
        </form>
      </div>
    </section>
  );
}
