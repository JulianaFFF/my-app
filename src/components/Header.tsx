"use  client";
import React from 'react';
import Link from 'next/link'; // Imports Link from Next.js
import Image from 'next/image'; // Imports Image from Next.js

interface Route {
  name: string;
  path: string;
}

const Header = ({routes}: {routes: Route[]}) => {
  return (
    <header className="bg-blue-200 text-gray-800 p-4 shadow md">
      <div className="container mx-auto flex justify-between items-center">
        {/* We use Link for the link to the home page */}
        <Link href="/" className="flex items-center space-x-2">
          {/* We use Image for our logo */}
          <Image
            src="/star.png" // Ensure this image is in the public folder
            alt="App's logo"
            width={40}
            height={40}
          />
          <span className="text-2xl font-semibold text-white" style={{textShadow: '1px 1px 0 #6b7280, -1px -1px 0 #6b7280, 1px -1px 0 #6b7280, -1px 1px 0 #6b7280'}}>Mi biblioteca</span>
        </Link>
        <nav>
          {routes.map((route) => (
            <Link 
              key={route.path} 
              href={route.path} 
              className="px-3 hover:text-gray-300 text-white"
              style={{textShadow: '1px 1px 0 #6b7280, -1px -1px 0 #6b7280, 1px -1px 0 #6b7280, -1px 1px 0 #6b7280'}}
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