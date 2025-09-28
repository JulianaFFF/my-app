"use client";
import React from 'react';
import Link from 'next/link'; 
import Image from 'next/image'; 

interface Route {
  name: string;
  path: string;
}

const Header = ({routes}: {routes: Route[]}) => {
  return (
    <header className="bg-gray-900 border-b border-gray-700 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* We use Link for the link to the home page */}
        <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
          {/* We use Image for our logo */}
          <Image
            src="/star.png" 
            alt="App's logo"
            width={40}
            height={40}
          />
          <span className="text-2xl font-bold text-white">Mi biblioteca</span>
        </Link>
        <nav className="flex items-center gap-6">
          {routes.map((route) => (
            <Link 
              key={route.path} 
              href={route.path} 
              className="px-4 py-2 rounded-lg hover:bg-gray-700 text-white transition-colors font-medium"
            >
              {route.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;