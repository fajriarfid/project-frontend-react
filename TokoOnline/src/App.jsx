import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/cart-context"; // Pastikan CartProvider diimpor
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Header from "./components/Header"; // Pastikan Header diimpor
import Footer from "./components/Footer"; // Pastikan Footer diimpor
import "./styles/global.css";
import "./styles/buttons.css";

function App() {
  return (
    <CartProvider>
      {" "}
      {/* Membungkus seluruh aplikasi dengan CartProvider */}
      <Router basename="/project-frontend-react/">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
        <Footer />
      </Router>
    </CartProvider>
  );
}

export default App;
