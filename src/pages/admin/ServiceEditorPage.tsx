import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Loader2, Save, X, icons } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { logActivity } from '@/hooks/useActivityLogger';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

const availableIcons = [
  'Map', 'TreePine', 'Building2', 'Compass', 'Globe', 'Monitor',
  'Briefcase', 'Wrench', 'Settings', 'Users', 'Target', 'Award',
  'BarChart', 'FileText', 'Folder', 'Home', 'Layers', 'PenTool',
  'Ruler', 'Search', 'Shield', 'Truck', 'Zap'
];

interface ServiceData {
  title: string;
  description: string;
  icon: string;
  features: string[];
  href: string;
  published: boolean;
  display_order: number;
}

export default function ServiceEditorPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const isNew = id === 'new';

  const [isLoading, setIsLoading] = useState(!isNew);
  const [isSaving, setIsSaving] = useState(false);
  const [newFeature, setNewFeature] = useState('');
  const [formData, setFormData] = useState<ServiceData>({
    title: '',
    description: '',
    icon: 'Compass',
    features: [],
    href: '',
    published: false,
    display_order: 0,
  });

  useEffect(() => {
    if (!isNew && id) {
      fetchService();
    }
  }, [id, isNew]);

  const fetchService = async () => {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error || !data) {
      toast({
        variant: 'destructive',
        title: 'Erreur',
        description: 'Service non trouvé',
      });
      navigate('/admin/services');
      return;
    }

    setFormData({
      title: data.title || '',
      description: data.description || '',
      icon: data.icon || 'Compass',
      features: data.features || [],
      href: data.href || '',
      published: data.published || false,
      display_order: data.display_order || 0,
    });
    setIsLoading(false);
  };

  const addFeature = () => {
    if (newFeature.trim() && !formData.features.includes(newFeature.trim())) {
      setFormData(prev => ({
        ...prev,
        features: [...prev.features, newFeature.trim()]
      }));
      setNewFeature('');
    }
  };

  const removeFeature = (feature: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter(f => f !== feature)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      toast({
        variant: 'destructive',
        title: 'Erreur',
        description: 'Le titre est requis',
      });
      return;
    }

    setIsSaving(true);

    const serviceData = {
      title: formData.title.trim(),
      description: formData.description.trim() || null,
      icon: formData.icon,
      features: formData.features,
      href: formData.href.trim() || null,
      published: formData.published,
      display_order: formData.display_order,
      author_id: user?.id,
    };

    let error;
    if (isNew) {
      const result = await supabase.from('services').insert(serviceData);
      error = result.error;
    } else {
      const result = await supabase
        .from('services')
        .update(serviceData)
        .eq('id', id);
      error = result.error;
    }

    if (error) {
      toast({
        variant: 'destructive',
        title: 'Erreur',
        description: 'Impossible de sauvegarder le service',
      });
    } else {
      if (user) {
        await logActivity({
          userId: user.id,
          action: isNew ? 'article_created' : 'article_updated',
          details: { type: 'service', title: formData.title },
        });
      }
      toast({
        title: 'Succès',
        description: isNew ? 'Service créé' : 'Service mis à jour',
      });
      navigate('/admin/services');
    }

    setIsSaving(false);
  };

  const renderIcon = (iconName: string) => {
    const LucideIcon = icons[iconName as keyof typeof icons];
    if (LucideIcon) {
      return <LucideIcon className="w-5 h-5" />;
    }
    return <icons.Compass className="w-5 h-5" />;
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate('/admin/services')}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold">
            {isNew ? 'Nouveau service' : 'Modifier le service'}
          </h1>
          <p className="text-sm text-muted-foreground">
            {isNew ? 'Ajoutez un nouveau service' : 'Modifiez les informations du service'}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Icon */}
        <div className="space-y-2">
          <Label>Icône</Label>
          <Select
            value={formData.icon}
            onValueChange={(value) => setFormData(prev => ({ ...prev, icon: value }))}
          >
            <SelectTrigger>
              <SelectValue>
                <div className="flex items-center gap-2">
                  {renderIcon(formData.icon)}
                  <span>{formData.icon}</span>
                </div>
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {availableIcons.map((iconName) => (
                <SelectItem key={iconName} value={iconName}>
                  <div className="flex items-center gap-2">
                    {renderIcon(iconName)}
                    <span>{iconName}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Title */}
        <div className="space-y-2">
          <Label htmlFor="title">Titre *</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            placeholder="Aménagement Foncier"
            required
          />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Conseils en urbanisme, gestion de projets de lotissement..."
            rows={3}
          />
        </div>

        {/* Features */}
        <div className="space-y-2">
          <Label>Caractéristiques</Label>
          <div className="flex gap-2">
            <Input
              value={newFeature}
              onChange={(e) => setNewFeature(e.target.value)}
              placeholder="Ajouter une caractéristique"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addFeature();
                }
              }}
            />
            <Button type="button" variant="outline" onClick={addFeature}>
              Ajouter
            </Button>
          </div>
          {formData.features.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.features.map((feature, idx) => (
                <Badge key={idx} variant="secondary" className="pl-3 pr-1 py-1">
                  {feature}
                  <button
                    type="button"
                    onClick={() => removeFeature(feature)}
                    className="ml-2 hover:text-destructive"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* Link */}
        <div className="space-y-2">
          <Label htmlFor="href">Lien vers la page de détail</Label>
          <Input
            id="href"
            value={formData.href}
            onChange={(e) => setFormData(prev => ({ ...prev, href: e.target.value }))}
            placeholder="/services/amenagement-foncier"
          />
        </div>

        {/* Display Order */}
        <div className="space-y-2">
          <Label htmlFor="display_order">Ordre d'affichage</Label>
          <Input
            id="display_order"
            type="number"
            value={formData.display_order}
            onChange={(e) => setFormData(prev => ({ ...prev, display_order: parseInt(e.target.value) || 0 }))}
            min={0}
          />
        </div>

        {/* Published */}
        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div>
            <Label htmlFor="published" className="font-medium">Publié</Label>
            <p className="text-sm text-muted-foreground">
              Rendre ce service visible sur le site
            </p>
          </div>
          <Switch
            id="published"
            checked={formData.published}
            onCheckedChange={(checked) => setFormData(prev => ({ ...prev, published: checked }))}
          />
        </div>

        {/* Submit */}
        <div className="flex gap-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate('/admin/services')}
            className="flex-1"
          >
            Annuler
          </Button>
          <Button type="submit" disabled={isSaving} className="flex-1">
            {isSaving ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Save className="h-4 w-4 mr-2" />
            )}
            {isNew ? 'Créer' : 'Enregistrer'}
          </Button>
        </div>
      </form>
    </div>
  );
}
