import React, { useState, useEffect } from "react";
import Layout from "./../Layout/Layout.js";
import ProductCard from "../ProductCard/ProductCard.js";
import axios from "axios";
import "./KidsSection1.css";

const Kids = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('/api/v1/product/get-product');
      setProducts(data.products || []);
      setError(null);
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Failed to load products. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout title={"Kids' Collection - ToeFit"}>
      <div className="product-page">
        <div className="container-fluid">
          <div className="page-header">
            <h1 className="page-title">Kids' Collection</h1>
            <p className="page-subtitle">
              Fun, colorful, and comfortable footwear designed for active kids
            </p>
          </div>

          {loading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>Loading amazing products...</p>
            </div>
          ) : error ? (
            <div className="error-container">
              <h3>Oops! Something went wrong</h3>
              <p>{error}</p>
              <button 
                className="btn btn-retry" 
                onClick={getAllProducts}
              >
                Try Again
              </button>
            </div>
          ) : products.length === 0 ? (
            <div className="no-products">
              <h3>No Products Found</h3>
              <p>We're working on adding new products. Check back soon!</p>
            </div>
          ) : (
            <>
              <div className="products-info">
                <span className="products-count">
                  {products.length} Product{products.length !== 1 ? 's' : ''} Found
                </span>
              </div>
              
              <div className="products-grid">
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Kids;