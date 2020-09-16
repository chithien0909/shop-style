import React, { Component } from "react";

import { Link } from 'react-router-dom';

import Slides from "./Slides";
import Discount from "./Discount";
import Women from "./Women";
import Men from "./Men";
import Footer from './Footer';
import Header from "./Header";

class Products extends Component {
  render() {
    return (
      <div>
        <Header />
        
        <Slides />

        <Discount />

        <Women />

        <Men />

        <Footer />

        <div className="footer-copyright">
            <p>
            All Rights Reserved. © 2020  
            <Link to="/"> The Kstore  </Link>
            Design By: Tuan Kiet
            </p>
        </div>
      </div>
    );
  }
}

export default Products;
