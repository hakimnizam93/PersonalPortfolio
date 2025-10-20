import { MenuBar } from '../MenuBar';

export default function MenuBarExample() {
  return (
    <MenuBar 
      time={new Date()} 
      onOpenApp={(app) => console.log('Opening app:', app)}
    />
  );
}
