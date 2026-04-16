import React from 'react';
import { Gem } from 'lucide-react';

const Navbar = () => {
  return (
    <div className="navbar bg-base-100 shadow-md px-8">
      <div className="flex-1">
        <a className="flex items-center gap-2 text-2xl font-bold text-primary">
          <Gem size={28} />
          <span>GLOW</span>
        </a>
      </div>
      <div className="flex-none gap-4">       
      </div>
    </div>
  );
};

export default Navbar;