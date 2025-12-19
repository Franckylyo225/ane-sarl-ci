import { Calendar, ArrowRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollReveal, useScrollRevealMultiple } from "@/hooks/useScrollReveal";

const articles = [
  {
    id: 1,
    category: "Projet",
    title: "Lancement du projet d'aménagement de la forêt classée de Bossématié",
    excerpt: "ANE SARL a été sélectionné pour piloter le projet de réhabilitation et d'aménagement durable de la forêt classée de Bossématié, l'une des plus importantes de Côte d'Ivoire.",
    date: "15 Décembre 2024",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=600&h=400&fit=crop",
  },
  {
    id: 2,
    category: "Partenariat",
    title: "Signature d'un accord avec le Ministère des Eaux et Forêts",
    excerpt: "Un partenariat stratégique a été conclu pour renforcer la gestion durable des ressources forestières et la préservation de la biodiversité en Côte d'Ivoire.",
    date: "28 Novembre 2024",
    readTime: "3 min",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop",
  },
  {
    id: 3,
    category: "Innovation",
    title: "Déploiement de drones pour la cartographie forestière",
    excerpt: "ANE SARL investit dans les technologies de pointe avec l'acquisition de drones professionnels pour améliorer la précision de ses relevés topographiques.",
    date: "10 Novembre 2024",
    readTime: "4 min",
    image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=600&h=400&fit=crop",
  },
];

export function News() {
  const headerReveal = useScrollReveal({ threshold: 0.2 });
  const { setRef, visibleItems } = useScrollRevealMultiple(articles.length, { threshold: 0.15 });

  return (
    <section id="actualites" className="section-padding bg-background">
      <div className="container-custom">
        {/* Section Header */}
        <div 
          ref={headerReveal.ref}
          className={`flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12 scroll-reveal ${headerReveal.isVisible ? "visible" : ""}`}
        >
          <div>
            <span className="inline-block text-primary font-semibold tracking-wider uppercase text-sm mb-3">
              Actualités
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
              Nos dernières <span className="text-primary">nouvelles</span>
            </h2>
            <p className="text-muted-foreground text-lg mt-4 max-w-2xl">
              Restez informés de nos projets, partenariats et innovations dans le domaine de l'aménagement foncier et forestier.
            </p>
          </div>
          <Button variant="outline" size="lg" className="w-fit">
            Toutes les actualités
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Articles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <article
              key={article.id}
              ref={setRef(index)}
              className={`group bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/30 hover:shadow-xl transition-all duration-500 scroll-reveal ${
                visibleItems[index] ? "visible" : ""
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Image */}
              <div className="relative h-52 overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <span className="absolute top-4 left-4 bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
                  {article.category}
                </span>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Meta */}
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    {article.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    {article.readTime}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-display text-xl font-bold text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                  {article.title}
                </h3>

                {/* Excerpt */}
                <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
                  {article.excerpt}
                </p>

                {/* Read more link */}
                <a
                  href="#"
                  className="inline-flex items-center gap-2 text-primary font-semibold text-sm group-hover:gap-3 transition-all"
                >
                  Lire la suite
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
