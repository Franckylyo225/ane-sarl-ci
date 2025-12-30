import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { Newspaper, FolderKanban, Eye, FileEdit } from 'lucide-react';

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalArticles: 0,
    publishedArticles: 0,
    totalProjects: 0,
    publishedProjects: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      const [articlesRes, projectsRes] = await Promise.all([
        supabase.from('articles').select('published'),
        supabase.from('projects').select('published'),
      ]);

      if (articlesRes.data && projectsRes.data) {
        setStats({
          totalArticles: articlesRes.data.length,
          publishedArticles: articlesRes.data.filter(a => a.published).length,
          totalProjects: projectsRes.data.length,
          publishedProjects: projectsRes.data.filter(p => p.published).length,
        });
      }
    };

    fetchStats();
  }, []);

  const cards = [
    {
      title: 'Total Actualités',
      value: stats.totalArticles,
      icon: Newspaper,
      color: 'text-blue-500',
      bg: 'bg-blue-500/10',
    },
    {
      title: 'Actualités Publiées',
      value: stats.publishedArticles,
      icon: Eye,
      color: 'text-green-500',
      bg: 'bg-green-500/10',
    },
    {
      title: 'Total Projets',
      value: stats.totalProjects,
      icon: FolderKanban,
      color: 'text-purple-500',
      bg: 'bg-purple-500/10',
    },
    {
      title: 'Projets Publiés',
      value: stats.publishedProjects,
      icon: FileEdit,
      color: 'text-orange-500',
      bg: 'bg-orange-500/10',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Tableau de bord</h1>
        <p className="text-muted-foreground mt-1">
          Bienvenue dans l'espace d'administration
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => (
          <Card key={card.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {card.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${card.bg}`}>
                <card.icon className={`h-4 w-4 ${card.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{card.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
