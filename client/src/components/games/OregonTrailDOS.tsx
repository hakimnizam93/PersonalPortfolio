import { useEffect, useRef, useState } from 'react';

export function OregonTrailDOS() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const dosInstanceRef = useRef<any>(null);

  useEffect(() => {
    let mounted = true;

    const loadDOS = async () => {
      if (!canvasRef.current) return;

      try {
        const Dos = (window as any).Dos;

        if (!Dos) {
          setError('DOS emulator not loaded. Please refresh the page.');
          return;
        }

        const dos = await Dos(canvasRef.current, {
          wdosboxUrl: 'https://js-dos.com/8.xx/current/wdosbox.wasm.js',
        });

        if (!mounted) {
          dos.stop();
          return;
        }

        dosInstanceRef.current = dos;

        await dos.run('https://cdn.dos.zone/original/2X/9/9ed7eb9c2c441f56656692ed4dc7ab28f58503ce.jsdos');

        setIsLoading(false);
      } catch (err) {
        console.error('Error loading Oregon Trail:', err);
        setError('Failed to load Oregon Trail. Please try again.');
        setIsLoading(false);
      }
    };

    const initDOS = () => {
      if ((window as any).Dos) {
        loadDOS();
      } else {
        const script = document.createElement('script');
        script.src = 'https://js-dos.com/8.xx/current/js-dos.js';
        script.async = true;
        script.onload = () => {
          if (mounted) {
            loadDOS();
          }
        };
        script.onerror = () => {
          if (mounted) {
            setError('Failed to load DOS emulator.');
            setIsLoading(false);
          }
        };
        document.body.appendChild(script);
      }
    };

    const timer = setTimeout(initDOS, 100);

    return () => {
      mounted = false;
      clearTimeout(timer);
      if (dosInstanceRef.current) {
        try {
          dosInstanceRef.current.stop();
        } catch (e) {
          console.error('Error stopping DOS:', e);
        }
      }
    };
  }, []);

  if (error) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 bg-card text-foreground">
        <div className="text-center space-y-4 max-w-md">
          <div className="text-4xl mb-4">⚠️</div>
          <h2 className="text-xl font-light">Error Loading Game</h2>
          <p className="text-sm text-muted-foreground">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-foreground text-background rounded-lg hover:opacity-90 text-sm"
          >
            Reload Page
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full bg-black relative">
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-card text-foreground z-10">
          <div className="text-center space-y-4">
            <div className="text-4xl mb-4">🎮</div>
            <h2 className="text-xl font-light">Loading Oregon Trail...</h2>
            <p className="text-sm text-muted-foreground">Setting up DOS emulator</p>
            <div className="flex gap-1 justify-center mt-4">
              <div className="w-2 h-2 bg-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 bg-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 bg-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        </div>
      )}
      <div
        ref={canvasRef}
        className="w-full h-full"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      />
      {!isLoading && (
        <div className="absolute bottom-4 left-4 right-4 text-xs text-gray-400 bg-black/50 p-2 rounded">
          <p>Controls: Use keyboard. Press F11 for fullscreen. Click to focus.</p>
        </div>
      )}
    </div>
  );
}
