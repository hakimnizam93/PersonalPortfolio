import { LucideIcon } from 'lucide-react';

interface DockApp {
  id: string;
  title: string;
  icon: LucideIcon;
  component: string;
}

interface DockProps {
  apps: DockApp[];
  onAppClick: (app: DockApp) => void;
}

export function Dock({ apps, onAppClick }: DockProps) {
  return (
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-40">
      <div 
        className="flex items-center gap-3 px-4 py-3 bg-card/20 backdrop-blur-2xl rounded-2xl border border-border/30"
        style={{
          backdropFilter: 'blur(40px) saturate(180%)',
          WebkitBackdropFilter: 'blur(40px) saturate(180%)',
          boxShadow: 'var(--shadow-xl)'
        }}
        data-testid="dock"
      >
        {apps.map((app) => {
          const IconComponent = app.icon;
          return (
            <button
              key={app.id}
              onClick={() => onAppClick(app)}
              className="group relative flex items-center justify-center w-14 h-14 rounded-2xl bg-card/40 hover:bg-card/60 transition-all duration-200 hover:scale-110 hover:-translate-y-2 border border-border/20"
              data-testid={`dock-icon-${app.id}`}
            >
              <IconComponent className="w-6 h-6 text-foreground/70 group-hover:text-foreground transition-colors" />
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-foreground/90 text-background text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                {app.title}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
