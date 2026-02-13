import { Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import ProtectedRoute from "./component/ProtectedRoute";
import AdminRoute from "./component/AdminRoute";
import Navbar from "./component/Navbar";
import Home from "./pages/user/Home";
import AllProducts from "./pages/user/AllProducts";
import Register from "./pages/auth/Register";
import ProductDetails from "./pages/user/ProductDetails";
import Cart from "./pages/user/Cart";
import AuthContext from "./context/AuthContext";
import { useContext } from "react";
import Checkout from "./pages/user/Checkout";
import MyOrders from "./pages/user/MyOrders";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminProducts from "./pages/admin/AdminProducts";
import CreateProduct from "./pages/admin/CreateProduct";
import Footer from "./component/Footer";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProfile from "./pages/admin/AdminProfile";
import EditProduct from "./pages/admin/EditProduct";
import AdminCategories from "./pages/admin/AdminCategories";
import Products from "./pages/Products";

function App() {
  const { user } = useContext(AuthContext);
  return (
    <>
      {user && <Navbar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/products" element={<Products />} />
        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <AllProducts />
            </ProtectedRoute>
          }
        />
        <Route
          path="/product/:id"
          element={
            <ProtectedRoute>
              <ProductDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />

        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />

        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <MyOrders />
            </ProtectedRoute>
          }
        />

        <Route
  path="/admin/profile"
  element={
    <ProtectedRoute>
      <AdminRoute>
        <AdminProfile />
      </AdminRoute>
    </ProtectedRoute>
  }
/>


        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/orders"
          element={
            <ProtectedRoute>
              <AdminRoute>
                <AdminOrders />
              </AdminRoute>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/products"
          element={
            <ProtectedRoute>
              <AdminRoute>
                <AdminProducts />
              </AdminRoute>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/products/create"
          element={
            <ProtectedRoute>
              <AdminRoute>
                <CreateProduct />
              </AdminRoute>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/products/edit/:id"
          element={
            <ProtectedRoute>
              <AdminRoute>
                <EditProduct />
              </AdminRoute>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/categories"
          element={
            <ProtectedRoute>
              <AdminRoute>
                <AdminCategories />
              </AdminRoute>
            </ProtectedRoute>
          }
        />
      </Routes>

      {user && <Footer />}
    </>
  );
}

export default App;
