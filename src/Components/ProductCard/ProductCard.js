import React, { useState } from 'react';
import { useCart } from '../../Context/CartProvider.js';
import toast from 'react-hot-toast';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const [cart, setCart] = useCart();
  const [showModal, setShowModal] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const addToCart = (e) => {
    e.stopPropagation();
    setCart([...cart, product]);
    localStorage.setItem('cart', JSON.stringify([...cart, product]));
    toast.success('Item Added to Cart!', {
      style: {
        background: '#4ade80',
        color: '#fff',
      },
      icon: '🛒',
    });
  };

  const showDetails = (e) => {
    e.stopPropagation();
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const handleModalClick = (e) => {
    if (e.target.classList.contains('modal-overlay')) {
      closeModal();
    }
  };

  return (
    <>
      <div className="product-card" onClick={showDetails}>
        <div className="product-image-container">
          {imageLoading && (
            <div className="image-skeleton">
              <div className="skeleton-shimmer"></div>
            </div>
          )}
          <img
            src={`http://localhost:8080/api/v1/product/product-photo/${product._id}`}
            className="product-image"
            alt={product.name}
            onLoad={handleImageLoad}
            style={{ display: imageLoading ? 'none' : 'block' }}
          />
          <div className="product-overlay">
            <button className="quick-view-btn" onClick={showDetails}>
              Quick View
            </button>
          </div>
        </div>
        
        <div className="product-info">
          <h3 className="product-title">{product.name}</h3>
          <p className="product-description">
            {product.description?.substring(0, 60)}...
          </p>
          <div className="product-price">${product.price}</div>
          
          <div className="product-actions">
            <button className="btn btn-details" onClick={showDetails}>
              View Details
            </button>
            <button className="btn btn-add-cart" onClick={addToCart}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* Product Detail Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={handleModalClick}>
          <div className="modal-content">
            <button className="modal-close" onClick={closeModal}>
              ×
            </button>
            
            <div className="modal-body">
              <div className="modal-image">
                <img
                  src={`http://localhost:8080/api/v1/product/product-photo/${product._id}`}
                  alt={product.name}
                />
              </div>
              
              <div className="modal-details">
                <h2 className="modal-title">{product.name}</h2>
                <div className="modal-price">${product.price}</div>
                
                <div className="modal-description">
                  <h4>Description</h4>
                  <p>{product.description}</p>
                </div>
                
                <div className="modal-specs">
                  <h4>Product Details</h4>
                  <div className="spec-item">
                    <span>Category:</span>
                    <span>{product.category?.name || 'General'}</span>
                  </div>
                  <div className="spec-item">
                    <span>Quantity:</span>
                    <span>{product.quantity > 0 ? 'In Stock' : 'Out of Stock'}</span>
                  </div>
                  <div className="spec-item">
                    <span>Shipping:</span>
                    <span>Free shipping on orders over $50</span>
                  </div>
                </div>
                
                <div className="modal-actions">
                  <div className="quantity-selector">
                    <label>Quantity:</label>
                    <select defaultValue="1">
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </select>
                  </div>
                  
                  <button 
                    className="btn btn-add-cart-large"
                    onClick={addToCart}
                    disabled={product.quantity === 0}
                  >
                    {product.quantity === 0 ? 'Out of Stock' : 'Add to Cart'}
                  </button>
                </div>
                
                <div className="modal-features">
                  <div className="feature">
                    <span className="feature-icon">🚚</span>
                    <span>Free Shipping</span>
                  </div>
                  <div className="feature">
                    <span className="feature-icon">↩️</span>
                    <span>30-Day Returns</span>
                  </div>
                  <div className="feature">
                    <span className="feature-icon">🛡️</span>
                    <span>2-Year Warranty</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductCard; 