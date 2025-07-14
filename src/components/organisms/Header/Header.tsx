import React from 'react';
import { Button } from '../../atoms/Button';
import { SearchBox } from '../../molecules/SearchBox';
import { useAuth } from '@/components/context/AuthContext';

interface HeaderProps {
  onSearch: (query: string) => void;
  onCartClick: () => void;
  cartItemCount: number;
}

export function Header({ onSearch, onCartClick, cartItemCount }: HeaderProps) {
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <header className="sticky top-0 z-50 bg-white backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-extrabold text-orange-600">MusicStore</h1>
          <nav>
            <ul className="flex space-x-6 text-gray-700 font-semibold">
              <li><a href="#instruments" className="hover:text-orange-500">Instruments</a></li>
              <li><a href="#vinyls" className="hover:text-orange-500">Vinyls</a></li>
              <li><a href="#cds" className="hover:text-orange-500">CDs</a></li>
              <li><a href="#contact" className="hover:text-orange-500">Contact</a></li>
            </ul>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <SearchBox onSearch={onSearch} />
          <button
            aria-label="Open cart"
            onClick={onCartClick}
            className="relative p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-400"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-orange-600">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.344 2M7 13h10l4-8H5.344M7 13L5.344 5M7 13l-2 4h14" />
            </svg>
            {cartItemCount > 0 && (
              <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-red-600 text-white rounded-full px-1 text-xs font-bold">
                {cartItemCount}
              </span>
            )}
          </button>
          {!isAuthenticated ? (
            <Button asChild variant="outline" size="sm">
              <a href="/login">Login</a>
            </Button>
          ) : (
            <div className="flex items-center space-x-2">
              {user?.avatarUrl && (
                <img
                  src={user.avatarUrl}
                  alt={user.name}
                  className="h-8 w-8 rounded-full object-cover"
                />
              )}
              <span className="text-sm font-semibold text-gray-700">{user?.name}</span>
              <Button variant="ghost" size="sm" onClick={logout}>
                Logout
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
