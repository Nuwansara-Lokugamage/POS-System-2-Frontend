import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import POSPage from "./Pages/POSPage";
import AllProductsPage from "./Pages/AllProductsPage";
import StockPage from "./Pages/StockPage";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/pos" element={<POSPage/>}/>
        <Route path="/allproducts" element={<AllProductsPage/>}/>
        <Route path="/stock" element={<StockPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
