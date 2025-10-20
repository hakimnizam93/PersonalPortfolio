import { Window } from '../Window';

export default function WindowExample() {
  return (
    <Window
      id="example"
      title="Example Window"
      isActive={true}
      isMaximized={false}
      position={{ x: 100, y: 100 }}
      size={{ width: 600, height: 400 }}
      zIndex={10}
      onClose={() => console.log('Close clicked')}
      onMinimize={() => console.log('Minimize clicked')}
      onMaximize={() => console.log('Maximize clicked')}
      onMouseDown={() => console.log('Window clicked')}
      onDragStart={() => console.log('Drag started')}
      onResizeStart={() => console.log('Resize started')}
    >
      <div className="h-full flex items-center justify-center text-muted-foreground">
        Window Content
      </div>
    </Window>
  );
}
