import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import ListProduct from "./pages/ListProduct";
import AddProduct from "./pages/AddProduct";
import { Toaster } from "react-hot-toast";
import EditProduct from "./pages/EditProduct";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import Cart from "./pages/Cart";
import AddCategory from "./pages/AddCategory";
import EditCategory from "./pages/EditCategory";
import OrderForm from "./pages/OrderForm";
import OrdersList from "./pages/OrdersList";
import Dashboard from "./pages/AdminDashboard";
import CategoryList from "./pages/CategoryList";
import UserDashboard from "./pages/UserDashboard";
import ProductsByCategory from "./pages/CategoryProduct";
import ForgotPassword from "./pages/forgotPassword";
import VerifyOTP from "./pages/verifyOtp";
import ResetPassword from "./pages/ResetPassword";
import UsersList from "./pages/UsersList";

function Layout() {
  const location = useLocation();

  //  Hide navbar for specific pages
  const hideNavbarPaths = ["/adminDashboard"];

  const shouldHideNavbar = hideNavbarPaths.includes(location.pathname);

  return (
    <>
      {!shouldHideNavbar && <Navbar />}
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/verifyOtp" element={<VerifyOTP />} />
        <Route path="/resetPassword" element={<ResetPassword />} />

        <Route path="/adminDashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/userDashboard" element={<ProtectedRoute><UserDashboard /></ProtectedRoute>} />
        <Route path="/usersList" element={<ProtectedRoute><UsersList /></ProtectedRoute>} />
        <Route path="/list" element={<ProtectedRoute><ListProduct /></ProtectedRoute>} />
        <Route path="/categoryList" element={<ProtectedRoute><CategoryList /></ProtectedRoute>} />
        <Route path="/category/:categoryId" element={<ProtectedRoute><ProductsByCategory /></ProtectedRoute>} />
        <Route path="/addProduct" element={<ProtectedRoute><AddProduct /></ProtectedRoute>} />
        <Route path="/addCategory" element={<ProtectedRoute><AddCategory /></ProtectedRoute>} />
        <Route path="/editProduct/:id" element={<ProtectedRoute><EditProduct /></ProtectedRoute>} />
        <Route path="/editCategory/:id" element={<ProtectedRoute><EditCategory /></ProtectedRoute>} />
        <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
        <Route path="/orderPlace" element={<ProtectedRoute><OrderForm /></ProtectedRoute>} />
        <Route path="/orderList" element={<ProtectedRoute><OrdersList /></ProtectedRoute>} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}
