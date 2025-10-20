import { useState } from 'react';

interface MenuBarProps {
  time: Date;
  onOpenApp: (app: { id: string; title: string; component: string }) => void;
}

export function MenuBar({ time, onOpenApp }: MenuBarProps) {
  const [showAboutMenu, setShowAboutMenu] = useState(false);
  const [showViewMenu, setShowViewMenu] = useState(false);

  return (
    <div 
      className="absolute top-0 left-0 right-0 h-11 bg-white/60 backdrop-blur-2xl border-b border-border/50 flex items-center justify-between px-5 z-50"
      style={{
        backdropFilter: 'blur(40px) saturate(180%)',
        WebkitBackdropFilter: 'blur(40px) saturate(180%)'
      }}
    >
      <div className="flex items-center space-x-6 text-sm font-light text-foreground/70">
        <span className="font-normal" data-testid="text-os-name">Hakim OS</span>
        
        <div className="relative">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setShowAboutMenu(!showAboutMenu);
              setShowViewMenu(false);
            }}
            className="hover:text-foreground transition-colors px-2 py-1 rounded hover-elevate"
            data-testid="button-menu-about"
          >
            About
          </button>
          {showAboutMenu && (
            <div 
              className="absolute top-full left-0 mt-1 w-72 bg-white/95 backdrop-blur-2xl rounded-lg border border-border/50 p-4 z-50"
              style={{
                backdropFilter: 'blur(40px) saturate(180%)',
                WebkitBackdropFilter: 'blur(40px) saturate(180%)',
                boxShadow: 'var(--shadow-2xl)'
              }}
              data-testid="menu-about-dropdown"
            >
              <h3 className="text-base font-medium text-foreground mb-1">Hakim Nizam</h3>
              <p className="text-sm text-muted-foreground mb-2">Design Leader</p>
              <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                Top 1% ADPList Mentor helping designers navigate career growth, portfolio reviews, and leadership transitions. 6 years of experience crafting user experiences at ZUS Coffee, ServiceRocket and Zensite.
              </p>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setShowAboutMenu(false);
                  onOpenApp({ id: 'about', title: 'About', component: 'About' });
                }}
                className="text-xs text-foreground/70 hover:text-foreground underline"
                data-testid="button-learn-more"
              >
                Learn more...
              </button>
            </div>
          )}
        </div>
        
        <div className="relative">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setShowViewMenu(!showViewMenu);
              setShowAboutMenu(false);
            }}
            className="hover:text-foreground transition-colors px-2 py-1 rounded hover-elevate"
            data-testid="button-menu-view"
          >
            View
          </button>
          {showViewMenu && (
            <div 
              className="absolute top-full left-0 mt-1 w-48 bg-white/95 backdrop-blur-2xl rounded-lg border border-border/50 py-2 z-50"
              style={{
                backdropFilter: 'blur(40px) saturate(180%)',
                WebkitBackdropFilter: 'blur(40px) saturate(180%)',
                boxShadow: 'var(--shadow-2xl)'
              }}
              data-testid="menu-view-dropdown"
            >
              {[
                { id: 'work', title: 'Work Experience', component: 'Work' },
                { id: 'folder', title: 'My Folder', component: 'Folder' }
              ].map((item) => (
                <button 
                  key={item.id}
                  onClick={() => {
                    setShowViewMenu(false);
                    onOpenApp(item);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-foreground/70 hover-elevate transition-colors"
                  data-testid={`button-menu-${item.id}`}
                >
                  {item.title}
                </button>
              ))}
              <div className="h-px bg-border my-2"></div>
              {[
                { id: 'games', title: 'Games', component: 'Games' },
                { id: 'contact', title: 'Contact', component: 'Contact' },
                { id: 'chat', title: 'AI Assistant', component: 'Chat' }
              ].map((item) => (
                <button 
                  key={item.id}
                  onClick={() => {
                    setShowViewMenu(false);
                    onOpenApp(item);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-foreground/70 hover-elevate transition-colors"
                  data-testid={`button-menu-${item.id}`}
                >
                  {item.title}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="text-sm font-light text-foreground/70" data-testid="text-time">
        {time.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}
      </div>
    </div>
  );
}
