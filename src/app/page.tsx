"use client";

import { useState, useMemo, useEffect } from "react";
import { experiments, categories } from "@/data/experiments";
import { AnimatePresence, motion } from "framer-motion";
import {
  Star, Moon, Sun,
  Search, X, ChevronDown, ArrowRight,
} from "lucide-react";

// Favorites utilities
function getFavorites(): string[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem("favorites") || "[]");
  } catch {
    return [];
  }
}

function isFavorite(id: string): boolean {
  return getFavorites().includes(id);
}

// ========== NAVBAR ==========
function Navbar({ theme, toggleTheme }: { theme: string; toggleTheme: () => void }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "glass border-b border-white/10 shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <a
          href="/"
          className="text-lg font-bold bg-linear-to-r from-pink-400 via-rose-400 to-fuchsia-400 bg-clip-text text-transparent"
        >
      Simuni Verse
        </a>
        <div className="hidden md:flex gap-2">
          {categories.map((cat) => (
            <a
              key={cat.id}
              href={`#experiments`}
              className="px-3 py-1.5 rounded-full text-sm text-gray-400 hover:text-white glass hover:scale-105 transition-all"
            >
              {cat.icon} {cat.name}
            </a>
          ))}
        </div>
        <button
          onClick={toggleTheme}
          className="p-2.5 glass rounded-full hover:scale-105 transition-transform"
          title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
        >
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </nav>
  );
}

// ========== HERO SECTION ==========
function HeroSection() {
  return (
    <section className="relative min-h-[70vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(236,72,153,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(236,72,153,0.3) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Floating orbs */}
      <div className="absolute top-20 left-[10%] w-72 h-72 bg-pink-500/20 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute bottom-20 right-[10%] w-72 h-72 bg-rose-500/20 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute top-40 right-[30%] w-48 h-48 bg-fuchsia-500/10 rounded-full blur-[80px] animate-pulse" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10"
      >
        <div className="text-xs sm:text-sm font-medium text-pink-300/70 mb-4 tracking-[0.3em] uppercase">
          Interactive 3D Science Platform
        </div>
        <h1
          className="text-5xl md:text-7xl font-black mb-6 bg-linear-to-r from-pink-400 via-rose-400 to-fuchsia-400 bg-clip-text text-transparent leading-tight"
          style={{ filter: "drop-shadow(0 0 30px rgba(236,72,153,0.3))" }}
        >
          Simuni Verse
        </h1>
        <p className="text-lg md:text-2xl text-gray-300 max-w-2xl mx-auto mb-8 leading-relaxed">
          Experiment with Physics, Chemistry, Biology, and Math through interactive simulations. Change what you want to test, watch what happens, and understand science by hands-on exploration.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <a
            href="#experiments"
            className="px-8 py-3.5 bg-linear-to-r from-pink-600 to-rose-600 rounded-full font-semibold hover:scale-105 transition-transform animate-pulse-glow"
          >
            Start Exploring
          </a>
          <a
            href="#about"
            className="px-8 py-3.5 glass rounded-full font-semibold hover:scale-105 transition-transform"
          >
            Learn More
          </a>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="relative z-10 mt-16 flex gap-8 md:gap-16 flex-wrap justify-center"
      >
        {[
          { num: "40+", label: "Experiments" },
          { num: "4", label: "Subjects" },
          { num: "3D", label: "Interactive" },
          { num: "∞", label: "Learning" },
        ].map((s) => (
          <div key={s.label} className="text-center">
            <div className="text-3xl font-bold bg-linear-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent">
              {s.num}
            </div>
            <div className="text-sm text-gray-500">{s.label}</div>
          </div>
        ))}
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 z-10"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <ChevronDown className="text-gray-500" size={24} />
      </motion.div>
    </section>
  );
}

// ========== CATEGORY BADGE ==========
function CategoryBadge({
  category,
  active,
  onClick,
}: {
  category: (typeof categories)[0] | { id: string; name: string; icon: string; color?: string };
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`relative flex items-center gap-2 px-5 py-2.5 rounded-full font-medium transition-all duration-300 ${
        active
          ? "text-white shadow-lg scale-105"
          : "glass text-gray-400 hover:text-white hover:scale-102"
      }`}
      style={
        active
          ? {
              background: `linear-gradient(135deg, ${category.color}33, ${category.color}11)`,
              boxShadow: `0 0 20px ${category.color}33`,
              borderColor: `${category.color}55`,
            }
          : {}
      }
    >
      <span className="text-xl">{category.icon}</span>
      {category.name}
      {active && (
        <motion.div
          layoutId="activeCategory"
          className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-white"
        />
      )}
    </button>
  );
}

// ========== EXPERIMENT CARD ==========
function ExperimentCard({ exp, index, onToggleFavorite }: {
  exp: (typeof experiments)[0];
  index: number;
  onToggleFavorite: (id: string) => void;
}) {
  const [fav, setFav] = useState(false);

  useEffect(() => {
    setFav(isFavorite(exp.id));
  }, [exp.id]);

  const handleClickFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onToggleFavorite(exp.id);
    setFav((f) => !f);
  };

  return (
    <motion.a
      href={`/experiments/${exp.id}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.03, 0.6) }}
      className="group glass rounded-2xl p-6 hover:-translate-y-1 transition-all duration-300 cursor-pointer block relative"
      style={{
        borderColor: `${exp.color}15`,
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = `0 0 30px ${exp.color}15`;
        (e.currentTarget as HTMLElement).style.borderColor = `${exp.color}30`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = "none";
        (e.currentTarget as HTMLElement).style.borderColor = `${exp.color}15`;
      }}
    >
      {/* Category color accent bar */}
      <div
        className="absolute top-0 left-4 right-4 h-[3px] rounded-b-full"
        style={{ background: `linear-gradient(90deg, ${exp.color}, ${exp.color}66)` }}
      />

      <button
        onClick={handleClickFavorite}
        className={`absolute top-4 right-4 p-2 rounded-lg transition-all ${
          fav ? "text-yellow-400 bg-yellow-400/10" : "text-gray-500 hover:text-yellow-400"
        }`}
        title={fav ? "Remove from favorites" : "Add to favorites"}
      >
        <Star size={16} fill={fav ? "currentColor" : "none"} />
      </button>

      <div className="flex items-start justify-between mb-4 pr-8">
        <span className="text-4xl">{exp.icon}</span>
        <span
          className="text-xs font-mono px-2 py-1 rounded-full"
          style={{
            background: `${exp.color}15`,
            color: exp.color,
          }}
        >
          {exp.difficulty}
        </span>
      </div>
      <h3 className="text-lg font-bold mb-2 group-hover:text-white transition-colors">
        {exp.title}
      </h3>
      <p className="text-sm text-gray-400 mb-4 line-clamp-2">{exp.description}</p>
      <div className="flex flex-wrap gap-1.5">
        {exp.topics.slice(0, 3).map((t) => (
          <span
            key={t}
            className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-gray-500"
          >
            {t}
          </span>
        ))}
        {exp.topics.length > 3 && (
          <span className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-gray-500">
            +{exp.topics.length - 3}
          </span>
        )}
      </div>

      {/* Launch indicator on hover */}
      <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span className="text-xs font-medium capitalize" style={{ color: exp.color }}>
          {exp.category}
        </span>
        <span className="text-xs text-gray-400 flex items-center gap-1">
          Launch <ArrowRight size={12} />
        </span>
      </div>
    </motion.a>
  );
}

// ========== HOME PAGE ==========
export default function Home() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [favoritesCount, setFavoritesCount] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme") as "dark" | "light" | null;
      if (savedTheme) {
        setTheme(savedTheme);
        document.documentElement.classList.toggle("light", savedTheme === "light");
      }
      setFavoritesCount(getFavorites().length);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("light", newTheme === "light");
  };

  const filtered = useMemo(() => {
    let result = experiments.filter((exp) => {
      const matchCat =
        activeCategory === "all" || exp.category === activeCategory;
      const matchSearch =
        search === "" ||
        exp.title.toLowerCase().includes(search.toLowerCase()) ||
        exp.description.toLowerCase().includes(search.toLowerCase()) ||
        exp.topics.some((t) =>
          t.toLowerCase().includes(search.toLowerCase())
        );
      return matchCat && matchSearch;
    });

    if (showFavoritesOnly) {
      const favorites = getFavorites();
      result = result.filter((exp) => favorites.includes(exp.id));
    }

    return result;
  }, [activeCategory, search, showFavoritesOnly]);

  const handleToggleFavorite = (id: string) => {
    const favorites = getFavorites();
    if (favorites.includes(id)) {
      localStorage.setItem("favorites", JSON.stringify(favorites.filter((f) => f !== id)));
    } else {
      localStorage.setItem("favorites", JSON.stringify([...favorites, id]));
    }
    setFavoritesCount(getFavorites().length);
    setShowFavoritesOnly((prev) => prev);
  };

  return (
    <main>
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <HeroSection />

      {/* Experiments Section */}
      <section id="experiments" className="w-full py-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="w-full px-4 flex flex-col items-center justify-center mb-14"
        >
          {/* Title */}
          <h2 className="text-3xl md:text-4xl font-bold relative inline-block mb-10">
            Explore Experiments
            <span className="absolute bottom-[-8px] left-1/2 -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full" />
          </h2>

          {/* Subtitle */}
          <p className="text-gray-400 max-w-xl mb-12 text-base leading-relaxed text-center">
            Choose a subject or search for a specific experiment. Each one is fully interactive with real-time 3D controls.
          </p>

          {/* Search */}
          <div className="max-w-md w-full mb-12 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input
              type="text"
              placeholder="Search experiments..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-10 py-3 glass rounded-xl bg-transparent text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-pink-500/50 text-sm"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Category filters */}
          <div className="flex gap-3 justify-center flex-wrap pb-2 mb-6">
            <button
              onClick={() => {
                setActiveCategory("all");
                setShowFavoritesOnly(false);
              }}
              className={`relative flex items-center gap-2 px-5 py-2.5 rounded-full font-medium transition-all duration-300 whitespace-nowrap ${
                activeCategory === "all" && !showFavoritesOnly
                  ? "bg-linear-to-r from-pink-600/20 to-rose-600/20 text-white shadow-lg shadow-pink-500/20 scale-105"
                  : "glass text-gray-400 hover:text-white"
              }`}
            >
              <span className="text-xl">🔬</span>
              All Experiments
              {activeCategory === "all" && !showFavoritesOnly && (
                <motion.div
                  layoutId="activeCategory"
                  className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-white"
                />
              )}
            </button>

            {/* Favorites filter */}
            <button
              onClick={() => {
                setActiveCategory("all");
                setShowFavoritesOnly((prev) => !prev);
              }}
              className={`relative flex items-center gap-2 px-5 py-2.5 rounded-full font-medium transition-all duration-300 whitespace-nowrap ${
                showFavoritesOnly
                  ? "bg-linear-to-r from-yellow-600/20 to-orange-600/20 text-white shadow-lg shadow-yellow-500/20 scale-105"
                  : "glass text-gray-400 hover:text-white"
              }`}
            >
              <span className="text-xl">⭐</span>
              Favorites
              {favoritesCount > 0 && (
                <span className="ml-1 text-xs bg-white/20 px-2 py-0.5 rounded-full">
                  {favoritesCount}
                </span>
              )}
              {showFavoritesOnly && (
                <motion.div
                  layoutId="activeCategory"
                  className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-white"
                />
              )}
            </button>

            {categories.map((cat) => (
              <CategoryBadge
                key={cat.id}
                category={cat}
                active={activeCategory === cat.id && !showFavoritesOnly}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setShowFavoritesOnly(false);
                }}
              />
            ))}
          </div>

          {/* Difficulty filters */}
          <div className="flex gap-2 justify-center flex-wrap mt-6 mb-2">
            {["Beginner", "Intermediate", "Advanced"].map((diff) => (
              <button
                key={diff}
                onClick={() => setSearch(search ? `${search} ${diff}` : diff)}
                className="px-4 py-1.5 glass rounded-full text-xs text-gray-400 hover:text-white transition-colors"
              >
                {diff}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Experiment Grid */}
        <div className="px-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory + search + showFavoritesOnly}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid gap-5 [grid-template-columns:repeat(auto-fill,minmax(min(260px,100%),1fr))]"
            >
              {filtered.map((exp, i) => (
                <ExperimentCard
                  key={exp.id}
                  exp={exp}
                  index={i}
                  onToggleFavorite={handleToggleFavorite}
                />
              ))}
            </motion.div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-gray-500">
              {showFavoritesOnly
                ? "No favorites yet. Click the star icon on any experiment to add it!"
                : "No experiments found. Try a different search or category."}
            </div>
          )}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="max-w-4xl mx-auto px-4 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-4 relative inline-block">
            How It Works
            <span className="absolute bottom-[-8px] left-1/2 -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full" />
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative mt-8">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-10 left-[20%] right-[20%] h-px bg-gradient-to-r from-pink-500/30 via-rose-500/30 to-fuchsia-500/30" />

            {[
              {
                icon: "🎯",
                title: "Choose",
                desc: "Pick from 40+ experiments across 4 scientific subjects",
              },
              {
                icon: "🎛️",
                title: "Control",
                desc: "Adjust variables with interactive sliders and real-time controls",
              },
              {
                icon: "🧠",
                title: "Learn",
                desc: "Watch 3D simulations and understand the science behind each experiment",
              },
            ].map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative glass rounded-2xl p-8 text-center group hover:scale-[1.02] transition-transform"
              >
                <div className="w-10 h-10 mx-auto mb-4 rounded-full bg-linear-to-r from-pink-600 to-rose-600 flex items-center justify-center text-white font-bold text-sm relative z-10">
                  {i + 1}
                </div>
                <span className="text-4xl mb-4 block">{s.icon}</span>
                <h3 className="text-xl font-bold mb-2">{s.title}</h3>
                <p className="text-gray-400 text-sm">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-4 py-12 text-center">
        <div className="glass rounded-2xl p-8 md:p-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Explore Science?</h2>
          <p className="text-gray-400 mb-6">40+ free interactive 3D experiments. No downloads, no sign-ups.</p>
          <a
            href="#experiments"
            className="inline-block px-8 py-3 bg-linear-to-r from-pink-600 to-rose-600 rounded-full font-semibold hover:scale-105 transition-transform shadow-lg shadow-pink-500/25"
          >
            Start Now
          </a>
        </div>
      </section>

    </main>
  );
}
