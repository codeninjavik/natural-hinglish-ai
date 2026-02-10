import { motion } from "framer-motion";
import { ExternalLink, Code2 } from "lucide-react";

const PartnerSection = () => {
  return (
    <section className="py-20 border-t border-border">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-sm uppercase tracking-widest text-muted-foreground mb-2">
            Powered By
          </p>
          <h2 className="text-2xl md:text-4xl font-bold">
            Our <span className="text-primary">Partner</span>
          </h2>
        </motion.div>

        <motion.a
          href="https://codeninjavik.in"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.03 }}
          className="group max-w-md mx-auto flex items-center gap-5 rounded-2xl border border-border p-6 bg-card hover:border-primary/50 transition-colors cursor-pointer"
        >
          <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
            <Code2 className="w-7 h-7 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              CodeNinjaVik
              <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </h3>
            <p className="text-sm text-muted-foreground">codeninjavik.in</p>
          </div>
        </motion.a>
      </div>
    </section>
  );
};

export default PartnerSection;
