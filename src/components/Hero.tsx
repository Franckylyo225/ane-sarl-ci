import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, ChevronLeft, ChevronRight } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const slides = [
  {
    badge: "Notre vision",
    headline: "Aménager aujourd'hui,",
    highlight: "préserver demain",
    description: "Votre partenaire de confiance pour un aménagement durable des terres et forêts. Nous transformons vos espaces en opportunités durables.",
  },
  {
    badge: "Notre expertise",
    headline: "Leader en",
    highlight: "aménagement foncier",
    description: "Plus de 25 ans d'expérience dans la valorisation et la transformation des espaces fonciers en Côte d'Ivoire. Lotissement, urbanisme et conseil expert.",
  },
  {
    badge: "Notre savoir-faire",
    headline: "Expertise forestière",
    highlight: "reconnue",
    description: "Gestion durable des forêts, reboisement et préservation de la biodiversité. Partenaire de confiance du Ministère des Eaux et Forêts.",
  },
  {
    badge: "Notre engagement",
    headline: "Innovation &",
    highlight: "développement durable",
    description: "Nous allions technologies modernes et respect de l'environnement pour des solutions pérennes qui profitent aux générations futures.",
  },
];

const stats = [
  { value: "25+", label: "Années d'expertise" },
  { value: "500+", label: "Projets réalisés" },
  { value: "72", label: "Forêts classées" },
  { value: "100%", label: "Clients satisfaits" },
];

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextSlide = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setTimeout(() => setIsAnimating(false), 800);
  }, [isAnimating]);

  const prevSlide = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setTimeout(() => setIsAnimating(false), 800);
  }, [isAnimating]);

  const goToSlide = (index: number) => {
    if (isAnimating || index === currentSlide) return;
    setIsAnimating(true);
    setCurrentSlide(index);
    setTimeout(() => setIsAnimating(false), 800);
  };

  // Auto-play
  useEffect(() => {
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <section id="accueil" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt="Paysage forestier aménagé"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-overlay-gradient" />
      </div>

      {/* Animated background elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-copper/10 rounded-full blur-3xl animate-pulse-soft" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-primary-foreground/5 rounded-full blur-3xl" />

      {/* Slide indicator lines */}
      <div className="absolute left-8 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-4 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className="group flex items-center gap-3"
            aria-label={`Slide ${index + 1}`}
          >
            <div
              className={`h-0.5 transition-all duration-500 ${
                index === currentSlide
                  ? "w-12 bg-copper"
                  : "w-6 bg-primary-foreground/30 group-hover:bg-primary-foreground/50"
              }`}
            />
            <span
              className={`text-xs font-medium transition-all duration-300 ${
                index === currentSlide
                  ? "text-copper opacity-100"
                  : "text-primary-foreground/50 opacity-0 group-hover:opacity-100"
              }`}
            >
              0{index + 1}
            </span>
          </button>
        ))}
      </div>

      <div className="container-custom relative z-10 py-20 lg:py-0">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content Slider */}
          <div className="text-primary-foreground relative min-h-[450px] flex flex-col justify-center">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`absolute inset-0 flex flex-col justify-center transition-all duration-700 ${
                  index === currentSlide
                    ? "opacity-100 translate-y-0"
                    : index < currentSlide
                    ? "opacity-0 -translate-y-8"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ pointerEvents: index === currentSlide ? "auto" : "none" }}
              >
                {/* Badge */}
                <div className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 rounded-full px-4 py-2 mb-6 w-fit">
                  <span className="w-2 h-2 bg-copper rounded-full animate-pulse" />
                  <span className="text-sm font-medium">{slide.badge}</span>
                </div>

                {/* Headline */}
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                  {slide.headline}{" "}
                  <span className="text-copper block mt-2">{slide.highlight}</span>
                </h1>

                {/* Description */}
                <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-xl">
                  {slide.description}
                </p>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button variant="hero" size="xl">
                    Découvrir nos services
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                  <Button variant="hero-outline" size="xl">
                    <Play className="w-5 h-5" />
                    Voir nos réalisations
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Stats Card */}
          <div className="hidden lg:block">
            <div className="bg-card/10 backdrop-blur-md border border-primary-foreground/10 rounded-2xl p-8">
              <h3 className="text-primary-foreground font-display text-xl mb-6">
                Nos chiffres clés
              </h3>
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className="text-center p-4 bg-primary-foreground/5 rounded-xl hover:bg-primary-foreground/10 transition-colors"
                  >
                    <div className="text-3xl md:text-4xl font-display font-bold text-copper mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-primary-foreground/70">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom navigation */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-6 z-20">
        {/* Arrows */}
        <button
          onClick={prevSlide}
          className="w-12 h-12 rounded-full bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 flex items-center justify-center text-primary-foreground hover:bg-copper hover:border-copper transition-all"
          aria-label="Slide précédente"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Dots */}
        <div className="flex items-center gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-500 ${
                index === currentSlide
                  ? "w-8 h-2 bg-copper rounded-full"
                  : "w-2 h-2 bg-primary-foreground/30 rounded-full hover:bg-primary-foreground/50"
              }`}
              aria-label={`Aller à la slide ${index + 1}`}
            />
          ))}
        </div>

        <button
          onClick={nextSlide}
          className="w-12 h-12 rounded-full bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 flex items-center justify-center text-primary-foreground hover:bg-copper hover:border-copper transition-all"
          aria-label="Slide suivante"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary-foreground/10">
        <div
          className="h-full bg-copper transition-all duration-300"
          style={{
            width: `${((currentSlide + 1) / slides.length) * 100}%`,
          }}
        />
      </div>
    </section>
  );
}
