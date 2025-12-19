import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, ExternalLink, MapPin } from "lucide-react";

const allProjects = [
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
  {
    id: 4,
    title: "Réhabilitation de la forêt de Bossématié",
    category: "Forestier",
    location: "Est de la Côte d'Ivoire",
    description: "Projet de réhabilitation et de protection de la forêt classée de Bossématié, réserve de biosphère de l'UNESCO.",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop",
    link: "#",
    stats: { hectares: "21K+", duration: "36 mois" },
  },
  {
    id: 5,
    title: "Lotissement Zone Industrielle",
    category: "Foncier",
    location: "Yamoussoukro",
    description: "Aménagement et viabilisation d'une nouvelle zone industrielle pour le développement économique de la région.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop",
    link: "#",
    stats: { parcelles: "120+", duration: "14 mois" },
  },
  {
    id: 6,
    title: "Construction Centre de Formation",
    category: "BTP",
    location: "San Pedro",
    description: "Construction d'un centre de formation professionnelle moderne équipé de technologies de pointe.",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=600&fit=crop",
    link: "#",
    stats: { surface: "2500m²", duration: "18 mois" },
  },
];

const categories = ["Tous", "Forestier", "Foncier", "BTP"];

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState("Tous");

  const filteredProjects = activeCategory === "Tous" 
    ? allProjects 
    : allProjects.filter(p => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground py-20 lg:py-28">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block text-primary-foreground/80 font-semibold text-sm uppercase tracking-widest mb-4">
              Portfolio
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Nos réalisations phares
            </h1>
            <p className="text-primary-foreground/80 text-lg md:text-xl">
              Découvrez nos projets d'aménagement foncier et forestier à travers la Côte d'Ivoire.
            </p>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="section-padding bg-secondary">
        <div className="container-custom">
          {/* Filter tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all ${
                  activeCategory === category
                    ? "bg-primary text-primary-foreground"
                    : "bg-card text-muted-foreground hover:bg-muted"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="group bg-card rounded-2xl overflow-hidden shadow-premium card-hover"
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
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground py-20">
        <div className="container-custom text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
            Vous avez un projet en tête ?
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
            Contactez-nous pour discuter de vos besoins et découvrir comment nous pouvons vous accompagner.
          </p>
          <Button variant="hero" size="xl">
            Contactez-nous
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}