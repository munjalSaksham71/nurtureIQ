import { Link } from 'react-router-dom';
// import { Moon, Sun } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { useTheme } from '@/components/theme-provider';

export default function Navbar() {
  // const { theme, setTheme } = useTheme();

  return (
    <nav className="border-b">
      <div className="flex h-16 items-center px-4">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold">NurtureIQ</span>
        </Link>
        {/* <div className="ml-auto flex items-center space-x-4">
          <Button variant='outline'>About</Button>
        </div> */}
      </div>
    </nav>
  );
}
