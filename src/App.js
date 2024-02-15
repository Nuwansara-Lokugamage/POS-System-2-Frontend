import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import POSPage from "./Pages/POSPage";
import AllProducts from "./Pages/AllProductsPage";
import AllProductsPage from "./Pages/AllProductsPage";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/pos" element={<POSPage/>}/>
        <Route path="/allproducts" element={<AllProductsPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
