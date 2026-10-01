import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./navbar/Navbar";
import Home from "./pages/Home";
import Footer from "./footer/Footer";
import Books from "./pages/books/Books";
import MainChatbot from "./pages/mainchatbot/MainChatbot";
import Categories from "./pages/category/Categories";
import Cart from "./pages/cardshop/Cart";
import BookDetails from './bookdetails/BookDetails'
import Favorites from "./pages/favorite/Favorites";
import Breadcrumb from "./Breadcrumb"
function App() {
  return (
    <>
 
      <BrowserRouter>
       <Navbar />
        <Breadcrumb />
        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/books" element={<Books />} />
          <Route path="/chatbot" element={<MainChatbot />} />
          <Route path="/category" element={<Categories />} />
          <Route path="/cardshop" element={<Cart />} />
          <Route path="/book-details" element={<BookDetails />} />
          <Route path="/favorites" element={<Favorites />}/>





        </Routes>
      <Footer />
      </BrowserRouter>
    </>
    
  );
}

export default App;