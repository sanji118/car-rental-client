import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Car, Menu, X, User, LogOut } from 'lucide-react';
import useAuth from '../../hooks/useAuth';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const {user} = useAuth() 

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Available Cars', href: '/cars' },
  ];

  const authenticatedNavigation = [
    { name: 'Add Car', href: '/addCars' },
    { name: 'My Cars', href: '/myCars' },
    { name: 'My Bookings', href: '/my-booking' },
  ];

  const isActive = (path) => location.pathname === path;


  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Car className="h-8 w-8" />
              <span className="text-xl font-bold text-pink-600">DriveRental</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? 'text-automotive-blue border-b-2 border-automotive-blue'
                    : 'text-gray-700 hover:text-automotive-blue'
                }`}
              >
                {item.name}
              </Link>
            ))}

            {user && authenticatedNavigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? 'text-automotive-blue border-b-2 border-automotive-blue'
                    : 'text-gray-700 hover:text-automotive-blue'
                }`}
              >
                {item.name}
              </Link>
            ))}

            {!user ? (
              <div className="flex space-x-4">
                <Link to="/login">
                  <button className='btn btn-secondary'>
                    <User className="h-4 w-4 mr-2" />
                    Login
                  </button>
                </Link>
                <Link to="/register">
                  <button className='btn btn-secondary'>
                    Register
                  </button>
                </Link>
              </div>
            ) : (
              <button 
                variant="outline" 
                size="sm"
                onClick={() => setIsLoggedIn(false)}
                className="text-red-600 border-red-600 hover:bg-red-50"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="btn text-gray-700 hover:text-automotive-blue"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-3 py-2 text-base font-medium transition-colors ${
                    isActive(item.href)
                      ? 'text-black bg-pink-300'
                      : ' hover:bg-pink-50'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}

              {user && authenticatedNavigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-3 py-2 text-base font-medium transition-colors ${
                    isActive(item.href)
                      ? 'text-automotive-blue bg-blue-50'
                      : 'text-gray-700 hover:text-automotive-blue hover:bg-gray-50'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}

              <div className="px-3 py-2 space-y-2">
                {!user ? (
                  <>
                    <Link to="/login" onClick={() => setIsOpen(false)}>
                      <button variant="outline" className="w-full justify-start hover:bg-pink-300 btn btn-secondary text-black">
                        <User className="h-4 w-4 mr-2" />
                        Login
                      </button>
                    </Link>
                    <Link to="/register" onClick={() => setIsOpen(false)}>
                      <button className="w-full hover:bg-pink-300 btn btn-secondary mt-2 justify-start text-black">
                        Register
                      </button>
                    </Link>
                  </>
                ) : (
                  <button 
                    variant="outline" 
                    className="w-full justify-start text-red-600 border-red-600 hover:bg-red-50"
                    onClick={() => {
                      setIsLoggedIn(false);
                      setIsOpen(false);
                    }}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;