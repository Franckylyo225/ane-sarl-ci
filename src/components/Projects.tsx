import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ExternalLink, MapPin } from "lucide-react";
import { useScrollReveal, useScrollRevealMultiple } from "@/hooks/useScrollReveal";

const projects = [
  {
    id: 1,
    title: "Actualisation des limites de 72 forêts classées",
    category: "Forestier",
    location: "Côte d'Ivoire",
    description: "Projet majeur de délimitation et d'actualisation des périmètres de 72 forêts classées sur l'ensemble du territoire national.",
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&h=600&fit=crop",
    link: "http://72forets.ane.ci/",
    stats: { hectares: "2.8M+", duration: "24 mois" },
  },
  {
    id: 2,
    title: "État des lieux des forêts du Tchologo",
    category: "Forestier",
    location: "Région du Tchologo",
    description: "Inventaire complet et état des lieux de 12 forêts classées dans la région du Tchologo pour une gestion durable.",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&h=600&fit=crop",
    link: "http://tchologo.ane.ci/",
    stats: { hectares: "150K+", duration: "12 mois" },
  },
  {
    id: 3,
    title: "Projet Terre Promise",
    category: "Foncier",
    location: "Abidjan",
    description: "Programme de lotissement et d'aménagement foncier pour le développement d'espaces résidentiels de qualité.",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=600&fit=crop",
    link: "#",
    stats: { parcelles: "500+", duration: "18 mois" },
  },
];

const categories = ["Tous", "Forestier", "Foncier", "BTP"];

export function Projects() {
  const [activeCategory, setActiveCategory] = useState("Tous");
  const headerReveal = useScrollReveal({ threshold: 0.2 });
  const { setRef, visibleItems } = useScrollRevealMultiple(projects.length, { threshold: 0.15 });
  const ctaReveal = useScrollReveal({ threshold: 0.3 });

  const filteredProjects = activeCategory === "Tous" 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  return (
    <section id="projets" className="section-padding bg-background">
      <div className="container-custom">
        {/* Section Header */}
        <div 
          ref={headerReveal.ref}
          className={`flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12 scroll-reveal ${headerReveal.isVisible ? "visible" : ""}`}
        >
          <div>
            <span className="inline-block text-copper font-semibold text-sm uppercase tracking-widest mb-4">
              Portfolio
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
              Nos réalisations <span className="text-primary">phares</span>
            </h2>
          </div>

          {/* Filter tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === category
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              ref={setRef(index)}
              className={`group bg-card rounded-2xl overflow-hidden shadow-premium card-hover scroll-reveal ${
                visibleItems[index] ? "visible" : ""
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-copper text-accent-foreground text-xs font-semibold rounded-full">
                    {project.category}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 flex items-center gap-2 text-primary-foreground/90 text-sm">
                  <MapPin className="w-4 h-4" />
                  {project.location}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-display text-xl font-bold text-foreground mb-3 line-clamp-2">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {project.description}
                </p>

                {/* Stats */}
                <div className="flex gap-4 mb-4 pb-4 border-b border-border">
                  {Object.entries(project.stats).map(([key, value]) => (
                    <div key={key}>
                      <div className="text-lg font-bold text-primary">{value}</div>
                      <div className="text-xs text-muted-foreground capitalize">{key}</div>
                    </div>
                  ))}
                </div>

                {/* Link */}
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-copper font-medium hover:gap-3 transition-all"
                >
                  Voir le projet
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* View All CTA */}
        <div 
          ref={ctaReveal.ref}
          className={`text-center mt-12 scroll-reveal-scale ${ctaReveal.isVisible ? "visible" : ""}`}
        >
          <Button variant="outline" size="lg">
            Voir tous nos projets
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}
