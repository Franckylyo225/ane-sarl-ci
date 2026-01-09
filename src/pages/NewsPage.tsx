import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Calendar, ArrowRight, Clock, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

type Article = Tables<'articles'>;

export default function NewsPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false });

      if (!error && data) {
        setArticles(data);
      }
      setIsLoading(false);
    };

    fetchArticles();
  }, []);

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "d MMMM yyyy", { locale: fr });
  };

  const estimateReadTime = (content: string) => {
    const wordCount = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
    const minutes = Math.ceil(wordCount / 200);
    return `${minutes} min`;
  };

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
          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : articles.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">Aucun article disponible pour le moment.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article) => (
                <article
                  key={article.id}
                  className="group bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/30 hover:shadow-xl transition-all duration-500"
                >
                  {/* Image */}
                  <div className="relative h-52 overflow-hidden">
                    {article.cover_image_url ? (
                      <img
                        src={article.cover_image_url}
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full bg-muted flex items-center justify-center">
                        <span className="text-muted-foreground">Pas d'image</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Meta */}
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4" />
                        {formatDate(article.created_at)}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4" />
                        {estimateReadTime(article.content)}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-display text-xl font-bold text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                      {article.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
                      {article.excerpt || article.content.replace(/<[^>]*>/g, '').substring(0, 150) + '...'}
                    </p>

                    {/* Read more link */}
                    <Link
                      to={`/actualites/${article.id}`}
                      className="inline-flex items-center gap-2 text-primary font-semibold text-sm group-hover:gap-3 transition-all"
                    >
                      Lire la suite
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}