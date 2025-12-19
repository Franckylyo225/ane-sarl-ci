import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Calendar, ArrowRight, Clock } from "lucide-react";

const allArticles = [
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
  {
    id: 4,
    category: "Formation",
    title: "Programme de formation en SIG pour les agents forestiers",
    excerpt: "ANE SARL lance un programme de formation en systèmes d'information géographique destiné aux agents du Ministère des Eaux et Forêts.",
    date: "25 Octobre 2024",
    readTime: "4 min",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&h=400&fit=crop",
  },
  {
    id: 5,
    category: "Événement",
    title: "ANE SARL au Forum International de l'Environnement",
    excerpt: "Notre équipe a participé au Forum International de l'Environnement d'Abidjan pour présenter nos solutions innovantes en matière d'aménagement durable.",
    date: "15 Octobre 2024",
    readTime: "3 min",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop",
  },
  {
    id: 6,
    category: "Projet",
    title: "Achèvement du projet de lotissement à Yamoussoukro",
    excerpt: "Le projet de lotissement et d'aménagement de la zone résidentielle de Yamoussoukro a été livré avec succès, offrant plus de 200 parcelles viabilisées.",
    date: "1 Octobre 2024",
    readTime: "4 min",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&h=400&fit=crop",
  },
];

export default function NewsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground py-20 lg:py-28">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block text-primary-foreground/80 font-semibold text-sm uppercase tracking-widest mb-4">
              Actualités
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Nos dernières nouvelles
            </h1>
            <p className="text-primary-foreground/80 text-lg md:text-xl">
              Restez informés de nos projets, partenariats et innovations dans le domaine de l'aménagement foncier et forestier.
            </p>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="section-padding bg-secondary">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allArticles.map((article) => (
              <article
                key={article.id}
                className="group bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/30 hover:shadow-xl transition-all duration-500"
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

      <Footer />
    </div>
  );
}