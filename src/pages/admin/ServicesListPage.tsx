import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Pencil, 
  Trash2, 
  Eye, 
  EyeOff,
  Loader2,
  Search,
  Archive,
  ArchiveRestore,
  MoreHorizontal,
  icons
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { useAuth } from '@/contexts/AuthContext';
import { logActivity } from '@/hooks/useActivityLogger';

interface Service {
  id: string;
  title: string;
  description: string | null;
  icon: string;
  features: string[] | null;
  href: string | null;
  published: boolean | null;
  archived: boolean | null;
  display_order: number | null;
  created_at: string;
  updated_at: string;
}

export default function ServicesListPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState('all');
  const { toast } = useToast();
  const { isAdmin } = useAuth();

  const fetchServices = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .order('display_order', { ascending: true })
      .order('created_at', { ascending: false });

    if (error) {
      toast({
        variant: 'destructive',
        title: 'Erreur',
        description: 'Impossible de charger les services',
      });
    } else {
      setServices(data || []);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const togglePublish = async (service: Service) => {
    const { error } = await supabase
      .from('services')
      .update({ published: !service.published })
      .eq('id', service.id);

    if (error) {
      toast({
        variant: 'destructive',
        title: 'Erreur',
        description: 'Impossible de modifier le statut',
      });
    } else {
      toast({
        title: 'Succès',
        description: service.published ? 'Service dépublié' : 'Service publié',
      });
      fetchServices();
    }
  };

  const toggleArchive = async (service: Service) => {
    const { error } = await supabase
      .from('services')
      .update({ archived: !service.archived })
      .eq('id', service.id);

    if (error) {
      toast({
        variant: 'destructive',
        title: 'Erreur',
        description: 'Impossible de modifier le statut d\'archivage',
      });
    } else {
      toast({
        title: 'Succès',
        description: service.archived ? 'Service restauré' : 'Service archivé',
      });
      fetchServices();
    }
  };

  const handleBulkArchive = async (archive: boolean) => {
    if (selectedIds.length === 0) return;

    const { error } = await supabase
      .from('services')
      .update({ archived: archive })
      .in('id', selectedIds);

    if (error) {
      toast({
        variant: 'destructive',
        title: 'Erreur',
        description: 'Impossible de modifier les services',
      });
    } else {
      toast({
        title: 'Succès',
        description: `${selectedIds.length} service(s) ${archive ? 'archivé(s)' : 'restauré(s)'}`,
      });
      setSelectedIds([]);
      fetchServices();
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    const serviceToDelete = services.find(s => s.id === deleteId);
    const { data: { user } } = await supabase.auth.getUser();

    const { error } = await supabase
      .from('services')
      .delete()
      .eq('id', deleteId);

    if (error) {
      toast({
        variant: 'destructive',
        title: 'Erreur',
        description: 'Impossible de supprimer le service',
      });
    } else {
      if (user && serviceToDelete) {
        await logActivity({
          userId: user.id,
          action: 'article_deleted',
          details: { serviceId: deleteId, title: serviceToDelete.title },
        });
      }
      toast({
        title: 'Succès',
        description: 'Service supprimé définitivement',
      });
      fetchServices();
    }
    setDeleteId(null);
  };

  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) return;

    const { data: { user } } = await supabase.auth.getUser();

    const { error } = await supabase
      .from('services')
      .delete()
      .in('id', selectedIds);

    if (error) {
      toast({
        variant: 'destructive',
        title: 'Erreur',
        description: 'Impossible de supprimer les services',
      });
    } else {
      if (user) {
        await logActivity({
          userId: user.id,
          action: 'article_deleted',
          details: { count: selectedIds.length, bulk: true, type: 'services' },
        });
      }
      toast({
        title: 'Succès',
        description: `${selectedIds.length} service(s) supprimé(s)`,
      });
      setSelectedIds([]);
      fetchServices();
    }
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredServices.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredServices.map(s => s.id));
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const getFilteredByTab = () => {
    switch (activeTab) {
      case 'published':
        return services.filter(s => s.published && !s.archived);
      case 'draft':
        return services.filter(s => !s.published && !s.archived);
      case 'archived':
        return services.filter(s => s.archived);
      default:
        return services.filter(s => !s.archived);
    }
  };

  const filteredServices = getFilteredByTab().filter(service =>
    service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (service.description?.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const counts = {
    all: services.filter(s => !s.archived).length,
    published: services.filter(s => s.published && !s.archived).length,
    draft: services.filter(s => !s.published && !s.archived).length,
    archived: services.filter(s => s.archived).length,
  };

  const getStatusBadge = (service: Service) => {
    if (service.archived) {
      return <Badge variant="outline" className="text-muted-foreground">Archivé</Badge>;
    }
    if (service.published) {
      return <Badge className="bg-primary hover:bg-primary/90">Publié</Badge>;
    }
    return <Badge variant="secondary">Brouillon</Badge>;
  };

  const renderIcon = (iconName: string) => {
    const LucideIcon = icons[iconName as keyof typeof icons];
    if (LucideIcon) {
      return <LucideIcon className="w-5 h-5 text-primary" />;
    }
    return <icons.Compass className="w-5 h-5 text-muted-foreground" />;
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Services</h1>
          <p className="text-sm text-muted-foreground">
            Gérez les services proposés par l'entreprise
          </p>
        </div>
        <Button asChild>
          <Link to="/admin/services/new">
            <Plus className="h-4 w-4 mr-2" />
            Ajouter
          </Link>
        </Button>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={(v) => { setActiveTab(v); setSelectedIds([]); }}>
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <TabsList className="h-auto p-1">
            <TabsTrigger value="all" className="text-xs">
              Tous ({counts.all})
            </TabsTrigger>
            <TabsTrigger value="published" className="text-xs">
              Publiés ({counts.published})
            </TabsTrigger>
            <TabsTrigger value="draft" className="text-xs">
              Brouillons ({counts.draft})
            </TabsTrigger>
            <TabsTrigger value="archived" className="text-xs">
              Archivés ({counts.archived})
            </TabsTrigger>
          </TabsList>

          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-9"
            />
          </div>
        </div>

        {/* Bulk actions */}
        {selectedIds.length > 0 && (
          <div className="flex items-center gap-2 p-3 bg-muted rounded-lg mt-4">
            <span className="text-sm font-medium">
              {selectedIds.length} sélectionné(s)
            </span>
            <div className="flex-1" />
            {activeTab === 'archived' ? (
              <Button size="sm" variant="outline" onClick={() => handleBulkArchive(false)}>
                <ArchiveRestore className="h-4 w-4 mr-1" />
                Restaurer
              </Button>
            ) : (
              <Button size="sm" variant="outline" onClick={() => handleBulkArchive(true)}>
                <Archive className="h-4 w-4 mr-1" />
                Archiver
              </Button>
            )}
            {isAdmin && (
              <Button size="sm" variant="destructive" onClick={handleBulkDelete}>
                <Trash2 className="h-4 w-4 mr-1" />
                Supprimer
              </Button>
            )}
          </div>
        )}

        <TabsContent value={activeTab} className="mt-4">
          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : filteredServices.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              Aucun service trouvé
            </div>
          ) : (
            <div className="border rounded-lg overflow-hidden">
              {/* Table Header */}
              <div className="hidden md:grid md:grid-cols-[40px_50px_1fr_150px_100px_100px] gap-4 p-3 bg-muted/50 text-xs font-medium text-muted-foreground border-b">
                <div className="flex items-center">
                  <Checkbox 
                    checked={selectedIds.length === filteredServices.length && filteredServices.length > 0}
                    onCheckedChange={toggleSelectAll}
                  />
                </div>
                <div>Icône</div>
                <div>Titre & Description</div>
                <div>Lien</div>
                <div>Statut</div>
                <div className="text-right">Actions</div>
              </div>

              {/* Table Body */}
              <div className="divide-y">
                {filteredServices.map((service) => (
                  <div 
                    key={service.id} 
                    className="grid grid-cols-1 md:grid-cols-[40px_50px_1fr_150px_100px_100px] gap-2 md:gap-4 p-3 hover:bg-muted/30 transition-colors items-center"
                  >
                    {/* Checkbox */}
                    <div className="hidden md:flex items-center">
                      <Checkbox 
                        checked={selectedIds.includes(service.id)}
                        onCheckedChange={() => toggleSelect(service.id)}
                      />
                    </div>

                    {/* Icon */}
                    <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
                      {renderIcon(service.icon)}
                    </div>

                    {/* Title & description */}
                    <div className="min-w-0">
                      <Link 
                        to={`/admin/services/${service.id}`}
                        className="font-medium text-foreground hover:text-primary transition-colors line-clamp-1"
                      >
                        {service.title}
                      </Link>
                      {service.description && (
                        <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
                          {service.description}
                        </p>
                      )}
                      {service.features && service.features.length > 0 && (
                        <div className="flex gap-1 mt-1 flex-wrap">
                          {service.features.slice(0, 3).map((feature, idx) => (
                            <span key={idx} className="text-xs px-1.5 py-0.5 bg-primary/10 rounded text-primary">
                              {feature}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Link */}
                    <div className="text-xs text-muted-foreground truncate">
                      {service.href || '-'}
                    </div>

                    {/* Status */}
                    <div className="flex items-center">
                      {getStatusBadge(service)}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                        <Link to={`/admin/services/${service.id}`}>
                          <Pencil className="h-4 w-4" />
                        </Link>
                      </Button>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => togglePublish(service)}>
                            {service.published ? (
                              <>
                                <EyeOff className="h-4 w-4 mr-2" />
                                Dépublier
                              </>
                            ) : (
                              <>
                                <Eye className="h-4 w-4 mr-2" />
                                Publier
                              </>
                            )}
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => toggleArchive(service)}>
                            {service.archived ? (
                              <>
                                <ArchiveRestore className="h-4 w-4 mr-2" />
                                Restaurer
                              </>
                            ) : (
                              <>
                                <Archive className="h-4 w-4 mr-2" />
                                Archiver
                              </>
                            )}
                          </DropdownMenuItem>
                          {isAdmin && (
                            <>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem 
                                className="text-destructive focus:text-destructive"
                                onClick={() => setDeleteId(service.id)}
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Supprimer
                              </DropdownMenuItem>
                            </>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Delete confirmation */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Supprimer définitivement ?</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action est irréversible. Le service sera définitivement supprimé de la base de données.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
