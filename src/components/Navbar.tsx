import { Link, useLocation } from "react-router-dom";
import logo from "../images/UkLogo.png";

const Navbar = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <nav className="sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b border-border shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <img src={logo} alt="Logo" className="w-14 h-14 object-contain" />
          </Link>
          
          <div className="flex items-center gap-1 sm:gap-2">
            <Link
              to="/"
              className={`px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                isActive("/")
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-foreground hover:bg-secondary"
              }`}
            >
              Home
            </Link>

           {/* New link to RequestBlood page */}
            <Link
              to="/RequestBlood"
              className={`px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                isActive("/RequestBlood")
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-foreground hover:bg-secondary"
              }`}
            >
              Request
            </Link>

            <Link
              to="/register"
              className={`px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                isActive("/register")
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-foreground hover:bg-secondary"
              }`}
            >
              Register
            </Link>
            <Link
              to="/donors"
              className={`px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                isActive("/donors")
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-foreground hover:bg-secondary"
              }`}
            >
              Donors
            </Link>
           
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
