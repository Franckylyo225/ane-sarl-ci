import { Button } from "@/components/ui/button";
import { ArrowRight, Play, CheckCircle } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const stats = [
  { value: "25+", label: "Années d'expertise" },
  { value: "500+", label: "Projets réalisés" },
  { value: "72", label: "Forêts classées" },
  { value: "100%", label: "Clients satisfaits" },
];

const highlights = [
  "Leader en aménagement foncier",
  "Expertise forestière reconnue",
  "Accompagnement sur mesure",
];

export function Hero() {
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

      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-copper/10 rounded-full blur-3xl animate-pulse-soft" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-primary-foreground/5 rounded-full blur-3xl" />

      <div className="container-custom relative z-10 py-20 lg:py-0">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-primary-foreground">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 rounded-full px-4 py-2 mb-6 animate-fade-up">
              <span className="w-2 h-2 bg-copper rounded-full animate-pulse" />
              <span className="text-sm font-medium">Entreprise leader en Côte d'Ivoire</span>
            </div>

            {/* Headline */}
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 animate-fade-up animation-delay-100">
              Aménager aujourd'hui,{" "}
              <span className="text-copper">préserver demain</span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-xl animate-fade-up animation-delay-200">
              Votre partenaire de confiance pour un aménagement durable des terres et forêts. 
              Nous transformons vos espaces en opportunités durables.
            </p>

            {/* Highlights */}
            <div className="flex flex-col gap-3 mb-8 animate-fade-up animation-delay-300">
              {highlights.map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-copper" />
                  <span className="text-primary-foreground/90">{item}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-up animation-delay-400">
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

          {/* Stats Card */}
          <div className="hidden lg:block animate-fade-up animation-delay-500">
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

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary-foreground/30 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-primary-foreground/50 rounded-full" />
        </div>
      </div>
    </section>
  );
}
