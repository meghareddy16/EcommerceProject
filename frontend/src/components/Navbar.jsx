import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";

const Navbar = () => {
  const { cartItems } = useContext(CartContext);
  const { user, logout, token } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      {user?.type === "User" && (
      <div className="max-w-12xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo / Brand Name */}
        <Link to="/" className="text-4xl font-bold text-green-600">
          🍔 Foodify
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center">
          <Link to="/userDashboard" className="text-xl hover:text-green-600">
            Home
          </Link>

           <Link to="/list" className="text-xl hover:text-green-600">
            Products
          </Link>

          <Link to="/cart" className="text-xl hover:text-green-600 relative">
            Cart
            {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-3 bg-green-600 text-white text-xs px-2 py-0.5 rounded-full">
                {cartItems.length}
                </span>
            )}
          </Link>


          {token && (
            <Link to="/orderList" className="text-xl hover:text-green-600">
              Orders
            </Link>
          )}

          {!token ? (
            <>
              <Link
                to="/login"
                className="text-xl bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
              >
                Login
              </Link>
              <Link
                to="/"
                className="text-xl border border-green-600 text-green-600 px-4 py-2 rounded hover:bg-green-50"
              >
                Register
              </Link>
            </>
          ) : (
            <Link to="/">
              <button
                onClick={handleLogout}
                className="text-xl bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
              >
                Logout
              </button>
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <MobileMenu token={token} handleLogout={handleLogout} />
        </div>
      </div>
      )}
    </nav>
  );
};

// Separate component for mobile menu (dropdown)
const MobileMenu = ({ token, handleLogout }) => {
  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost md:hidden">
        ☰
      </label>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-40"
      >
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/cart">Cart</Link>
        </li>
        {token && (
          <li>
            <Link to="/orders">Orders</Link>
          </li>
        )}
        {!token ? (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        ) : (
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
