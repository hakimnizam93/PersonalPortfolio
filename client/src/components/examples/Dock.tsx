import { Dock } from '../Dock';
import { Folder, Mail, Briefcase, Gamepad2, FileText } from 'lucide-react';

export default function DockExample() {
  const apps = [
    { id: 'work', title: 'Work', icon: Briefcase, component: 'Work' },
    { id: 'projects', title: 'Projects', icon: Folder, component: 'Projects' },
    { id: 'resume', title: 'Resume', icon: FileText, component: 'Resume' },
    { id: 'games', title: 'Games', icon: Gamepad2, component: 'Games' },
    { id: 'contact', title: 'Contact', icon: Mail, component: 'Contact' }
  ];

  return (
    <div className="relative h-32 bg-background">
      <Dock apps={apps} onAppClick={(app) => console.log('App clicked:', app)} />
    </div>
  );
}
