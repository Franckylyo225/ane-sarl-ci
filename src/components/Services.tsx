import { 
  TreePine, 
  Map, 
  Building2, 
  Compass, 
  Globe, 
  Monitor,
  ArrowRight 
} from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Map,
    title: "Aménagement Foncier",
    description: "Conseils en urbanisme, gestion de projets de lotissement et valorisation optimale de vos terrains.",
    features: ["Lotissement", "Urbanisme", "Valorisation"],
  },
  {
    icon: TreePine,
    title: "Aménagement Forestier",
    description: "Gestion durable des forêts, reboisement et préservation de la biodiversité pour un avenir vert.",
    features: ["Reboisement", "Biodiversité", "Exploitation durable"],
  },
  {
    icon: Building2,
    title: "Bâtiment & Travaux Publics",
    description: "Construction et réhabilitation de bâtiments, infrastructures de qualité pour vos projets.",
    features: ["Construction", "Réhabilitation", "Infrastructure"],
  },
  {
    icon: Compass,
    title: "Topographie",
    description: "Relevés topographiques précis, calculs de surface et modélisation géométrique avancée.",
    features: ["Relevés", "Calculs", "Modélisation"],
  },
  {
    icon: Globe,
    title: "Géomatique",
    description: "Analyse de données géographiques et conception de systèmes d'information géographiques (SIG).",
    features: ["Bases de données", "SIG", "Cartographie"],
  },
  {
    icon: Monitor,
    title: "Informatique",
    description: "Développement web, maintenance informatique et fourniture de matériels de qualité.",
    features: ["Sites web", "Maintenance", "Équipements"],
  },
];

export function Services() {
  return (
    <section id="services" className="section-padding bg-primary text-primary-foreground">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-copper font-semibold text-sm uppercase tracking-widest mb-4">
            Nos expertises
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Des solutions complètes pour vos{" "}
            <span className="text-copper">projets d'aménagement</span>
          </h2>
          <p className="text-primary-foreground/80 text-lg">
            Découvrez notre gamme complète de services professionnels, 
            conçus pour répondre à tous vos besoins en aménagement foncier et forestier.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group bg-primary-foreground/5 backdrop-blur-sm rounded-2xl p-8 border border-primary-foreground/10 hover:bg-primary-foreground/10 hover:border-copper/30 transition-all duration-300"
            >
              {/* Icon */}
              <div className="w-14 h-14 bg-copper/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-copper/30 transition-colors">
                <service.icon className="w-7 h-7 text-copper" />
              </div>

              {/* Content */}
              <h3 className="font-display text-xl font-bold mb-3">
                {service.title}
              </h3>
              <p className="text-primary-foreground/70 mb-6 line-clamp-3">
                {service.description}
              </p>

              {/* Features */}
              <div className="flex flex-wrap gap-2 mb-6">
                {service.features.map((feature, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-medium px-3 py-1 bg-primary-foreground/10 rounded-full text-primary-foreground/80"
                  >
                    {feature}
                  </span>
                ))}
              </div>

              {/* Link */}
              <a
                href="#contact"
                className="inline-flex items-center gap-2 text-copper font-medium hover:text-copper/80 transition-colors"
              >
                En savoir plus
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Button variant="hero" size="lg">
            Demander un devis gratuit
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}
