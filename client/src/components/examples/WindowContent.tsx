import { WindowContent } from '../WindowContent';

export default function WindowContentExample() {
  return (
    <div className="h-96 bg-background">
      <WindowContent 
        component="Welcome" 
        onOpenApp={(app) => console.log('Opening app:', app)}
      />
    </div>
  );
}
