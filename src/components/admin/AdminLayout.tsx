import { useEffect, useState } from 'react';
import { useNavigate, Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  Newspaper, 
  FolderKanban, 
  LogOut, 
  Loader2,
  Menu,
  X,
  Home,
  Images,
  Settings,
  ChevronDown,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import logoAneFull from '@/assets/logo-ane-full.png';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

type NavItem = {
  to: string;
  icon: React.ElementType;
  label: string;
  exact?: boolean;
};

type NavGroup = {
  label: string;
  icon: React.ElementType;
  items: NavItem[];
};

const simpleNavItems: NavItem[] = [
  { to: '/admin', icon: LayoutDashboard, label: 'Tableau de bord', exact: true },
];

const cmsNavGroup: NavGroup = {
  label: 'CMS',
  icon: Settings,
  items: [
    { to: '/admin/slides', icon: Images, label: 'Slides Hero' },
    { to: '/admin/articles', icon: Newspaper, label: 'Actualités' },
    { to: '/admin/projects', icon: FolderKanban, label: 'Projets' },
  ],
};

export default function AdminLayout() {
  const { user, isLoading, isRolesLoading, isAdmin, isModerator, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Check if current path is within CMS group
  const isCmsActive = cmsNavGroup.items.some(item => location.pathname.startsWith(item.to));
  const [cmsOpen, setCmsOpen] = useState(isCmsActive);

  useEffect(() => {
    if (!isLoading && !user) {
      navigate('/auth');
    }
  }, [user, isLoading, navigate]);

  useEffect(() => {
    if (!isLoading && !isRolesLoading && user && !isAdmin && !isModerator) {
      navigate('/');
    }
  }, [isAdmin, isModerator, isLoading, isRolesLoading, user, navigate]);

  // Keep CMS group open when navigating to a CMS page
  useEffect(() => {
    if (isCmsActive && !cmsOpen) {
      setCmsOpen(true);
    }
  }, [isCmsActive, cmsOpen]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

  if (isLoading || isRolesLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user || (!isAdmin && !isModerator)) {
    return null;
  }

  const renderNavItem = (item: NavItem, onClick?: () => void) => {
    const isActive = item.exact 
      ? location.pathname === item.to
      : location.pathname.startsWith(item.to);
    
    return (
      <Link
        key={item.to}
        to={item.to}
        onClick={onClick}
        className={cn(
          "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
          isActive 
            ? "bg-primary text-primary-foreground" 
            : "hover:bg-muted"
        )}
      >
        <item.icon className="h-5 w-5" />
        {item.label}
      </Link>
    );
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Mobile header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-background border-b z-50 flex items-center px-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
        <span className="ml-4 font-semibold">Administration</span>
      </div>

      {/* Sidebar */}
      <aside className={cn(
        "fixed top-0 left-0 h-full w-64 bg-background border-r z-40 transition-transform duration-300",
        "lg:translate-x-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          <div className="h-16 flex items-center px-6 border-b">
            <img src={logoAneFull} alt="ANE SARL" className="h-8" />
          </div>

          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {/* Simple nav items */}
            {simpleNavItems.map((item) => renderNavItem(item, () => setSidebarOpen(false)))}

            {/* CMS Group */}
            <Collapsible open={cmsOpen} onOpenChange={setCmsOpen}>
              <CollapsibleTrigger className="w-full">
                <div className={cn(
                  "flex items-center justify-between px-3 py-2 rounded-lg transition-colors cursor-pointer",
                  isCmsActive ? "bg-muted" : "hover:bg-muted"
                )}>
                  <div className="flex items-center gap-3">
                    <cmsNavGroup.icon className="h-5 w-5" />
                    <span className="font-medium">{cmsNavGroup.label}</span>
                  </div>
                  {cmsOpen ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent className="pl-4 mt-1 space-y-1">
                {cmsNavGroup.items.map((item) => renderNavItem(item, () => setSidebarOpen(false)))}
              </CollapsibleContent>
            </Collapsible>
          </nav>

          <div className="p-4 border-t space-y-2">
            <Link
              to="/"
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground"
            >
              <Home className="h-5 w-5" />
              Retour au site
            </Link>
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 text-muted-foreground hover:text-foreground"
              onClick={handleSignOut}
            >
              <LogOut className="h-5 w-5" />
              Déconnexion
            </Button>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <main className="lg:ml-64 pt-16 lg:pt-0 min-h-screen">
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
