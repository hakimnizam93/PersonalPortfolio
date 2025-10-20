import { ReactNode } from 'react';

interface WindowProps {
  id: string;
  title: string;
  isActive: boolean;
  isMaximized: boolean;
  position: { x: number; y: number };
  size: { width: number; height: number };
  zIndex: number;
  children: ReactNode;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onMouseDown: (e: React.MouseEvent) => void;
  onDragStart: (e: React.MouseEvent) => void;
  onResizeStart: (e: React.MouseEvent, direction: string) => void;
}

export function Window({
  id,
  title,
  isActive,
  isMaximized,
  position,
  size,
  zIndex,
  children,
  onClose,
  onMinimize,
  onMaximize,
  onMouseDown,
  onDragStart,
  onResizeStart
}: WindowProps) {
  return (
    <div
      className="absolute overflow-hidden flex flex-col rounded-xl border border-border/30"
      style={{
        left: isMaximized ? 0 : position.x,
        top: isMaximized ? 44 : position.y,
        width: isMaximized ? '100%' : size.width,
        height: isMaximized ? 'calc(100% - 124px)' : size.height,
        zIndex,
        opacity: isActive ? 1 : 0.95,
        boxShadow: isActive ? 'var(--shadow-2xl)' : 'var(--shadow-lg)'
      }}
      onMouseDown={onMouseDown}
      data-testid={`window-${id}`}
    >
      <div
        className="h-11 bg-card/80 backdrop-blur-2xl border-b border-border/30 flex items-center justify-between px-4 cursor-move"
        style={{
          backdropFilter: 'blur(40px) saturate(180%)',
          WebkitBackdropFilter: 'blur(40px) saturate(180%)'
        }}
        onMouseDown={onDragStart}
        data-testid={`window-titlebar-${id}`}
      >
        <div className="flex items-center space-x-2">
          <button
            onClick={onClose}
            className="w-3 h-3 rounded-full bg-[#ff5f56] hover:bg-[#ff3b30] transition-colors"
            data-testid={`button-close-${id}`}
          />
          <button
            onClick={onMinimize}
            className="w-3 h-3 rounded-full bg-[#ffbd2e] hover:bg-[#ff9500] transition-colors"
            data-testid={`button-minimize-${id}`}
          />
          <button
            onClick={onMaximize}
            className="w-3 h-3 rounded-full bg-[#28c840] hover:bg-[#30d158] transition-colors"
            data-testid={`button-maximize-${id}`}
          />
        </div>
        <div className="absolute left-1/2 -translate-x-1/2 text-sm font-medium text-foreground/80" data-testid={`text-window-title-${id}`}>
          {title}
        </div>
      </div>
      
      <div className="flex-1 overflow-hidden bg-card">
        {children}
      </div>

      {!isMaximized && (
        <>
          <div
            className="absolute bottom-0 right-0 w-4 h-4 cursor-nwse-resize"
            onMouseDown={(e) => onResizeStart(e, 'se')}
            data-testid={`resize-handle-se-${id}`}
          />
          <div
            className="absolute bottom-0 left-0 right-0 h-1 cursor-ns-resize"
            onMouseDown={(e) => onResizeStart(e, 's')}
            data-testid={`resize-handle-s-${id}`}
          />
          <div
            className="absolute top-0 bottom-0 right-0 w-1 cursor-ew-resize"
            onMouseDown={(e) => onResizeStart(e, 'e')}
            data-testid={`resize-handle-e-${id}`}
          />
          <div
            className="absolute bottom-0 left-0 w-4 h-4 cursor-nesw-resize"
            onMouseDown={(e) => onResizeStart(e, 'sw')}
            data-testid={`resize-handle-sw-${id}`}
          />
          <div
            className="absolute top-0 bottom-0 left-0 w-1 cursor-ew-resize"
            onMouseDown={(e) => onResizeStart(e, 'w')}
            data-testid={`resize-handle-w-${id}`}
          />
        </>
      )}
    </div>
  );
}
