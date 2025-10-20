import { useState, useRef, useEffect } from 'react';
import { Folder, Mail, Briefcase, Gamepad2, FileText, MessageCircle } from 'lucide-react';
import { MenuBar } from '@/components/MenuBar';
import { Window } from '@/components/Window';
import { Dock } from '@/components/Dock';
import { WindowContent } from '@/components/WindowContent';

interface WindowState {
  id: string;
  title: string;
  component: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  position: { x: number; y: number };
  size: { width: number; height: number };
  zIndex: number;
  previousPosition?: { x: number; y: number };
  previousSize?: { width: number; height: number };
}

export default function Portfolio() {
  const [windows, setWindows] = useState<WindowState[]>([
    {
      id: 'welcome',
      title: 'Welcome',
      component: 'Welcome',
      isOpen: true,
      isMinimized: false,
      isMaximized: false,
      position: { x: 100, y: 80 },
      size: { width: 600, height: 400 },
      zIndex: 3
    }
  ]);
  const [activeWindow, setActiveWindow] = useState('welcome');
  const [time, setTime] = useState(new Date());
  const dragRef = useRef<{ 
    windowId: string | null; 
    startX: number; 
    startY: number; 
    startWindowX: number; 
    startWindowY: number 
  }>({ windowId: null, startX: 0, startY: 0, startWindowX: 0, startWindowY: 0 });

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const apps = [
    { id: 'work', title: 'Work', icon: Briefcase, component: 'Work' },
    { id: 'folder', title: 'Folder', icon: Folder, component: 'Folder' },
    { id: 'games', title: 'Games', icon: Gamepad2, component: 'Games' },
    { id: 'contact', title: 'Contact', icon: Mail, component: 'Contact' },
    { id: 'chat', title: 'AI Assistant', icon: MessageCircle, component: 'Chat' }
  ];

  const openApp = (app: { id: string; title: string; component: string }) => {
    const existingWindow = windows.find(w => w.id === app.id);
    if (existingWindow) {
      if (existingWindow.isMinimized) {
        setWindows(windows.map(w => 
          w.id === app.id ? { ...w, isMinimized: false } : w
        ));
      }
      setActiveWindow(app.id);
      bringToFront(app.id);
    } else {
      const newWindow: WindowState = {
        id: app.id,
        title: app.title,
        component: app.component,
        isOpen: true,
        isMinimized: false,
        isMaximized: false,
        position: { x: 150 + windows.length * 30, y: 100 + windows.length * 30 },
        size: { width: 700, height: 500 },
        zIndex: Math.max(...windows.map(w => w.zIndex), 0) + 1
      };
      setWindows([...windows, newWindow]);
      setActiveWindow(app.id);
    }
  };

  const closeWindow = (id: string) => {
    setWindows(windows.filter(w => w.id !== id));
    if (activeWindow === id) {
      const remaining = windows.filter(w => w.id !== id);
      setActiveWindow(remaining.length > 0 ? remaining[remaining.length - 1].id : '');
    }
  };

  const minimizeWindow = (id: string) => {
    setWindows(windows.map(w => 
      w.id === id ? { ...w, isMinimized: true } : w
    ));
  };

  const maximizeWindow = (id: string) => {
    setWindows(windows.map(w => 
      w.id === id ? { 
        ...w, 
        isMaximized: !w.isMaximized,
        previousPosition: !w.isMaximized ? w.position : w.previousPosition,
        previousSize: !w.isMaximized ? w.size : w.previousSize
      } : w
    ));
  };

  const bringToFront = (id: string) => {
    const maxZ = Math.max(...windows.map(w => w.zIndex));
    setWindows(windows.map(w => 
      w.id === id ? { ...w, zIndex: maxZ + 1 } : w
    ));
    setActiveWindow(id);
  };

  const startDrag = (e: React.MouseEvent, windowId: string) => {
    const win = windows.find(w => w.id === windowId);
    if (!win || win.isMaximized) return;
    
    dragRef.current = {
      windowId,
      startX: e.clientX,
      startY: e.clientY,
      startWindowX: win.position.x,
      startWindowY: win.position.y
    };
    bringToFront(windowId);
  };

  const onDrag = (e: MouseEvent) => {
    if (!dragRef.current.windowId) return;
    
    const deltaX = e.clientX - dragRef.current.startX;
    const deltaY = e.clientY - dragRef.current.startY;
    
    setWindows(windows.map(w => 
      w.id === dragRef.current.windowId
        ? {
            ...w,
            position: {
              x: dragRef.current.startWindowX + deltaX,
              y: dragRef.current.startWindowY + deltaY
            }
          }
        : w
    ));
  };

  const stopDrag = () => {
    dragRef.current = { windowId: null, startX: 0, startY: 0, startWindowX: 0, startWindowY: 0 };
  };

  useEffect(() => {
    document.addEventListener('mousemove', onDrag);
    document.addEventListener('mouseup', stopDrag);
    return () => {
      document.removeEventListener('mousemove', onDrag);
      document.removeEventListener('mouseup', stopDrag);
    };
  }, [windows]);

  return (
    <div className="w-full h-screen bg-background overflow-hidden relative" data-testid="portfolio-container">
      <div className="absolute inset-0">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" className="[stop-color:hsl(var(--background))]" />
              <stop offset="50%" className="[stop-color:hsl(var(--muted))]" />
              <stop offset="100%" className="[stop-color:hsl(var(--border))]" />
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#grad1)" />
          <g opacity="0.4">
            <path fill="none" stroke="hsl(var(--border))" strokeWidth="1.5">
              <animate
                attributeName="d"
                dur="20s"
                repeatCount="indefinite"
                values="M0,150 Q400,50 800,150 T1600,150 T2400,150;
                        M0,150 Q400,250 800,150 T1600,150 T2400,150;
                        M0,150 Q400,50 800,150 T1600,150 T2400,150"
              />
            </path>
            <path fill="none" stroke="hsl(var(--border))" strokeWidth="1.5" opacity="0.6">
              <animate
                attributeName="d"
                dur="25s"
                repeatCount="indefinite"
                values="M0,300 Q500,200 1000,300 T2000,300 T3000,300;
                        M0,300 Q500,400 1000,300 T2000,300 T3000,300;
                        M0,300 Q500,200 1000,300 T2000,300 T3000,300"
              />
            </path>
            <path fill="none" stroke="hsl(var(--border))" strokeWidth="1.5" opacity="0.4">
              <animate
                attributeName="d"
                dur="30s"
                repeatCount="indefinite"
                values="M0,450 Q600,350 1200,450 T2400,450 T3600,450;
                        M0,450 Q600,550 1200,450 T2400,450 T3600,450;
                        M0,450 Q600,350 1200,450 T2400,450 T3600,450"
              />
            </path>
          </g>
        </svg>
      </div>

      <MenuBar time={time} onOpenApp={openApp} />

      {windows.filter(w => !w.isMinimized).map((window) => (
        <Window
          key={window.id}
          id={window.id}
          title={window.title}
          isActive={activeWindow === window.id}
          isMaximized={window.isMaximized}
          position={window.position}
          size={window.size}
          zIndex={window.zIndex}
          onClose={() => closeWindow(window.id)}
          onMinimize={() => minimizeWindow(window.id)}
          onMaximize={() => maximizeWindow(window.id)}
          onMouseDown={() => bringToFront(window.id)}
          onDragStart={(e) => startDrag(e, window.id)}
        >
          <WindowContent component={window.component} onOpenApp={openApp} />
        </Window>
      ))}

      <Dock apps={apps} onAppClick={openApp} />
    </div>
  );
}
