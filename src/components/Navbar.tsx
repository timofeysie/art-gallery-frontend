import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Home, User, LogIn, Menu, X, LogOut, UserCircle, Plus, Image, Building } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isAddMenuOpen, setIsAddMenuOpen] = useState(false);

  console.log('user', user); 
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (isUserMenuOpen) setIsUserMenuOpen(false);
    if (isAddMenuOpen) setIsAddMenuOpen(false);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
    if (isMenuOpen) setIsMenuOpen(false);
    if (isAddMenuOpen) setIsAddMenuOpen(false);
  };

  const toggleAddMenu = () => {
    setIsAddMenuOpen(!isAddMenuOpen);
    if (isMenuOpen) setIsMenuOpen(false);
    if (isUserMenuOpen) setIsUserMenuOpen(false);
  };
  

  return (
    <nav className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side - Logo/Home */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <Home className="h-6 w-6" />
              <span className="ml-2 font-medium hidden sm:block">CAF</span>
            </Link>
          </div>

          {/* Right side - Auth links or User menu */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <>
                  {/* Add Content Menu */}
                  <div className="relative">
                    <button
                      onClick={toggleAddMenu}
                      className="flex items-center space-x-2 text-gray-300 hover:text-white focus:outline-none"
                    >
                      <Plus className="h-5 w-5" />
                      <span>Add Content</span>
                    </button>

                    {/* Add Content Dropdown */}
                    {isAddMenuOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                        <Link
                          to="/add-artist"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsAddMenuOpen(false)}
                        >
                          <div className="flex items-center">
                            <User className="h-4 w-4 mr-2" />
                            Add Artist
                          </div>
                        </Link>
                        <Link
                          to="/add-gallery"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsAddMenuOpen(false)}
                        >
                          <div className="flex items-center">
                            <Building className="h-4 w-4 mr-2" />
                            Add Gallery
                          </div>
                        </Link>
                        <Link
                          to="/add-artwork"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsAddMenuOpen(false)}
                        >
                          <div className="flex items-center">
                            <Image className="h-4 w-4 mr-2" />
                            Add Artwork
                          </div>
                        </Link>
                      </div>
                    )}
                  </div>

                  {/* User Menu */}
                  <div className="relative">
                    <button
                      onClick={toggleUserMenu}
                      className="flex items-center space-x-2 text-gray-300 hover:text-white focus:outline-none"
                    >
                      <img
                        src={user?.profileImage}
                        alt={user?.username}
                        className="h-8 w-8 rounded-full"
                      />
                      <span>{user?.username}</span>
                    </button>

                    {/* Desktop User Dropdown */}
                    {isUserMenuOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                        <Link
                          to="/profile"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <div className="flex items-center">
                            <UserCircle className="h-4 w-4 mr-2" />
                            Profile
                          </div>
                        </Link>
                        <button
                          onClick={() => {
                            logout();
                            setIsUserMenuOpen(false);
                          }}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <div className="flex items-center">
                            <LogOut className="h-4 w-4 mr-2" />
                            Logout
                          </div>
                        </button>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="flex items-center text-gray-300 hover:text-white"
                  >
                    <LogIn className="h-5 w-5 mr-1" />
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="flex items-center text-gray-300 hover:text-white"
                  >
                    <User className="h-5 w-5 mr-1" />
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            {isAuthenticated && (
              <>
                <button
                  onClick={toggleAddMenu}
                  className="flex items-center mr-4 text-gray-300 hover:text-white focus:outline-none"
                >
                  <Plus className="h-6 w-6" />
                </button>
                <button
                  onClick={toggleUserMenu}
                  className="flex items-center mr-4 text-gray-300 hover:text-white focus:outline-none"
                >
                  <img
                    src={user?.profileImage}
                    alt={user?.username}
                    className="h-8 w-8 rounded-full"
                  />
                </button>
              </>
            )}
            <button
              onClick={toggleMenu}
              className="text-gray-300 hover:text-white focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-700 px-2 pt-2 pb-3 space-y-1">
          <Link
            to="/"
            className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-600"
            onClick={() => setIsMenuOpen(false)}
          >
            <div className="flex items-center">
              <Home className="h-5 w-5 mr-2" />
              Home
            </div>
          </Link>
          {!isAuthenticated && (
            <>
              <Link
                to="/login"
                className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-600"
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="flex items-center">
                  <LogIn className="h-5 w-5 mr-2" />
                  Login
                </div>
              </Link>
              <Link
                to="/register"
                className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-600"
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Register
                </div>
              </Link>
            </>
          )}
        </div>
      )}

      {/* Mobile user menu */}
      {isUserMenuOpen && isAuthenticated && (
        <div className="md:hidden bg-gray-700 px-2 pt-2 pb-3 space-y-1">
          <div className="px-3 py-2 text-white font-medium">
            {user?.username}
          </div>
          <Link
            to="/profile"
            className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-600"
            onClick={() => setIsUserMenuOpen(false)}
          >
            <div className="flex items-center">
              <UserCircle className="h-5 w-5 mr-2" />
              Profile
            </div>
          </Link>
          <button
            onClick={() => {
              logout();
              setIsUserMenuOpen(false);
            }}
            className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-600"
          >
            <div className="flex items-center">
              <LogOut className="h-5 w-5 mr-2" />
              Logout
            </div>
          </button>
        </div>
      )}

      {/* Mobile add content menu */}
      {isAddMenuOpen && isAuthenticated && (
        <div className="md:hidden bg-gray-700 px-2 pt-2 pb-3 space-y-1">
          <div className="px-3 py-2 text-white font-medium">
            Add Content
          </div>
          <Link
            to="/add-artist"
            className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-600"
            onClick={() => setIsAddMenuOpen(false)}
          >
            <div className="flex items-center">
              <User className="h-5 w-5 mr-2" />
              Add Artist
            </div>
          </Link>
          <Link
            to="/add-gallery"
            className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-600"
            onClick={() => setIsAddMenuOpen(false)}
          >
            <div className="flex items-center">
              <Building className="h-5 w-5 mr-2" />
              Add Gallery
            </div>
          </Link>
          <Link
            to="/add-artwork"
            className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-600"
            onClick={() => setIsAddMenuOpen(false)}
          >
            <div className="flex items-center">
              <Image className="h-5 w-5 mr-2" />
              Add Artwork
            </div>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;