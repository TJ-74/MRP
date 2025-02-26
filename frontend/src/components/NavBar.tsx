import React, { useState, useEffect } from 'react';
import { Menu, X, User, Search, Bell, MessageCircle, LogOut } from 'lucide-react';
import { Button } from '../components/ui/button.tsx';
import { auth } from '../config/firebase.ts';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();
  
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setIsAuthenticated(!!user);
        });
        return () => unsubscribe();
    }, []);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/signin');
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
    };
  
    return (
      <nav className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and primary nav */}
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-white text-xl font-bold">HealthSearch</span>
              </div>
              
              {/* Desktop Navigation */}
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <a href="/" className="text-white px-3 py-2 rounded-md text-sm font-medium">
                    Home
                  </a>
                  <a href="#" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                    Services
                  </a>
                  <a href="#" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                    Providers
                  </a>
                  <a href="#" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                    Insurance
                  </a>
                </div>
              </div>
            </div>
  
            {/* Right side buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white">
                <Search size={20} />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white">
                <Bell size={20} />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-gray-300 hover:text-white"
                onClick={() => navigate('/chat')}
              >
                <MessageCircle size={20} />
              </Button>
              {isAuthenticated ? (
                <Button 
                  className="flex items-center space-x-2 bg-red-600 hover:bg-red-700"
                  onClick={handleLogout}
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </Button>
              ) : (
                <Button 
                  className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700"
                  onClick={() => navigate('/signin')}
                >
                  <User size={16} />
                  <span>Sign In</span>
                </Button>
              )}
            </div>
            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <Button 
                variant="ghost" 
                size="icon"
                className="text-gray-300 hover:text-white"
                onClick={toggleMenu}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </Button>
            </div>
          </div>
        </div>
  
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-gray-800 border-t border-gray-700">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="/" className="text-white block px-3 py-2 rounded-md text-base font-medium">
                Home
              </a>
              <a href="#" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                Services
              </a>
              <a href="#" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                Providers
              </a>
              <a href="#" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                Insurance
              </a>
            </div>
            <div className="px-4 py-3 border-t border-gray-700">
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white">
                  <Search size={20} />
                </Button>
                <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white">
                  <Bell size={20} />
                </Button>
                {isAuthenticated ? (
                  <Button 
                    className="flex items-center space-x-2 bg-red-600 hover:bg-red-700"
                    onClick={handleLogout}
                  >
                    <LogOut size={16} />
                    <span>Logout</span>
                  </Button>
                ) : (
                  <Button 
                    className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700"
                    onClick={() => navigate('/signin')}
                  >
                    <User size={16} />
                    <span>Sign In</span>
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    );
  };
  
  export default Navbar;