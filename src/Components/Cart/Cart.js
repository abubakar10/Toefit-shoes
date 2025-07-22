import React, { useState, useEffect } from "react";
import Layout from "./../Layout/Layout.js";
import { useCart } from "../../Context/CartProvider.js";
import { useAuth } from "../../Context/Auth.js";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "./Cart.css";

const Cart = () => {
  const [auth] = useAuth();
  const [cart, setCart] = useCart();
  const [loading, setLoading] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const navigate = useNavigate();

  // Calculate totals
  const calculateSubtotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const calculateTax = (subtotal) => {
    return subtotal * 0.08; // 8% tax
  };

  const calculateShipping = () => {
    const subtotal = calculateSubtotal();
    return subtotal > 50 ? 0 : 9.99; // Free shipping over $50
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const tax = calculateTax(subtotal);
    const shipping = calculateShipping();
    const discountAmount = (subtotal * discount) / 100;
    return subtotal + tax + shipping - discountAmount;
  };

  // Update quantity
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    
    const updatedCart = cart.map(item => 
      item._id === productId 
        ? { ...item, quantity: newQuantity }
        : item
    );
    
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    
    toast.success("Quantity updated!", {
      style: { background: '#4ade80', color: '#fff' },
      icon: '✅'
    });
  };

  // Remove item from cart
  const removeCartItem = (productId) => {
    const updatedCart = cart.filter(item => item._id !== productId);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    
    toast.success("Item removed from cart", {
      style: { background: '#ef4444', color: '#fff' },
      icon: '🗑️'
    });
  };

  // Clear entire cart
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
    toast.success("Cart cleared!", {
      style: { background: '#f59e0b', color: '#fff' },
      icon: '🧹'
    });
  };

  // Apply coupon
  const applyCoupon = () => {
    const validCoupons = {
      'SAVE10': 10,
      'WELCOME15': 15,
      'FIRST20': 20
    };

    if (validCoupons[couponCode.toUpperCase()]) {
      setDiscount(validCoupons[couponCode.toUpperCase()]);
      toast.success(`Coupon applied! ${validCoupons[couponCode.toUpperCase()]}% discount`, {
        style: { background: '#10b981', color: '#fff' },
        icon: '🎉'
      });
    } else {
      toast.error("Invalid coupon code", {
        style: { background: '#ef4444', color: '#fff' },
        icon: '❌'
      });
    }
  };

  // Initialize cart quantities
  useEffect(() => {
    const updatedCart = cart.map(item => ({
      ...item,
      quantity: item.quantity || 1
    }));
    if (JSON.stringify(updatedCart) !== JSON.stringify(cart)) {
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  }, []);

  if (cart.length === 0) {
    return (
      <Layout title="Shopping Cart - ToeFit">
        <div className="cart-page">
          <div className="container">
            <div className="empty-cart">
              <div className="empty-cart-icon">🛒</div>
              <h2>Your cart is empty</h2>
              <p>Looks like you haven't added any items to your cart yet.</p>
              <button 
                className="btn btn-primary"
                onClick={() => navigate('/')}
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Shopping Cart - ToeFit">
      <div className="cart-page">
        <div className="cart-container">
          {/* Cart Header */}
          <div className="cart-header">
            <h1>Shopping Cart</h1>
            <p>{cart.length} item{cart.length !== 1 ? 's' : ''} in your cart</p>
          </div>

          <div className="cart-content">
            {/* Cart Items Section */}
            <div className="cart-items-section">
              <div className="cart-items-header">
                <h3>Your Items</h3>
                <button 
                  className="clear-cart-btn"
                  onClick={clearCart}
                >
                  Clear Cart
                </button>
              </div>

              <div className="cart-items-list">
                {cart.map((item) => (
                  <div key={item._id} className="cart-item">
                    <div className="item-image">
                      <img
                        src={`http://localhost:8080/api/v1/product/product-photo/${item._id}`}
                        alt={item.name}
                        onError={(e) => {
                          e.target.src = '/placeholder-image.png';
                        }}
                      />
                    </div>
                    
                    <div className="item-details">
                      <h4 className="item-name">{item.name}</h4>
                      <p className="item-description">
                        {item.description?.substring(0, 80)}...
                      </p>
                      <div className="item-meta">
                        <span className="item-category">
                          {item.category?.name || 'General'}
                        </span>
                        <span className="item-stock">
                          {item.quantity > 10 ? 'In Stock' : `Only ${item.quantity} left`}
                        </span>
                      </div>
                    </div>

                    <div className="item-price">
                      <span className="price-label">Price</span>
                      <span className="price-value">${item.price}</span>
                    </div>

                    <div className="item-quantity">
                      <span className="quantity-label">Quantity</span>
                      <div className="quantity-controls">
                        <button 
                          className="quantity-btn decrease"
                          onClick={() => updateQuantity(item._id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          −
                        </button>
                        <span className="quantity-display">{item.quantity}</span>
                        <button 
                          className="quantity-btn increase"
                          onClick={() => updateQuantity(item._id, item.quantity + 1)}
                          disabled={item.quantity >= 10}
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="item-total">
                      <span className="total-label">Total</span>
                      <span className="total-value">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>

                    <div className="item-actions">
                      <button 
                        className="remove-btn"
                        onClick={() => removeCartItem(item._id)}
                        title="Remove item"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary Section */}
            <div className="order-summary-section">
              <div className="order-summary">
                <h3>Order Summary</h3>
                
                <div className="summary-details">
                  <div className="summary-row">
                    <span>Subtotal ({cart.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                    <span>${calculateSubtotal().toFixed(2)}</span>
                  </div>

                  <div className="summary-row">
                    <span>Tax (8%)</span>
                    <span>${calculateTax(calculateSubtotal()).toFixed(2)}</span>
                  </div>

                  <div className="summary-row">
                    <span>Shipping</span>
                    <span>
                      {calculateShipping() === 0 ? (
                        <span className="free-text">FREE</span>
                      ) : (
                        `$${calculateShipping().toFixed(2)}`
                      )}
                    </span>
                  </div>

                  {discount > 0 && (
                    <div className="summary-row discount-row">
                      <span>Discount ({discount}%)</span>
                      <span className="discount-amount">
                        -${((calculateSubtotal() * discount) / 100).toFixed(2)}
                      </span>
                    </div>
                  )}

                  <div className="summary-divider"></div>

                  <div className="summary-total">
                    <span>Total</span>
                    <span>${calculateTotal().toFixed(2)}</span>
                  </div>
                </div>

                {/* Coupon Section */}
                <div className="coupon-section">
                  <h4>Have a coupon?</h4>
                  <div className="coupon-form">
                    <input
                      type="text"
                      placeholder="Enter coupon code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="coupon-input"
                    />
                    <button 
                      className="coupon-apply-btn"
                      onClick={applyCoupon}
                    >
                      Apply
                    </button>
                  </div>
                  <p className="coupon-hint">Try: SAVE10, WELCOME15, FIRST20</p>
                </div>

                {/* Shipping Notice */}
                {calculateSubtotal() < 50 && (
                  <div className="shipping-notice">
                    <p>
                      Add ${(50 - calculateSubtotal()).toFixed(2)} more for FREE shipping! 🚚
                    </p>
                  </div>
                )}

                {/* Checkout Button */}
                <div className="checkout-section">
                  {!auth?.token ? (
                    <button 
                      className="checkout-btn primary"
                      onClick={() => navigate('/login', { state: '/cart' })}
                    >
                      Login to Checkout
                    </button>
                  ) : !auth?.user?.address ? (
                    <button 
                      className="checkout-btn primary"
                      onClick={() => navigate('/dashboard/user/profile')}
                    >
                      Add Address to Continue
                    </button>
                  ) : (
                    <button 
                      className="checkout-btn primary"
                      onClick={() => navigate('/checkout')}
                      disabled={loading}
                    >
                      {loading ? 'Processing...' : 'Proceed to Checkout'}
                    </button>
                  )}
                  
                  <button 
                    className="continue-shopping-btn"
                    onClick={() => navigate('/')}
                  >
                    Continue Shopping
                  </button>
                </div>

                {/* Delivery Address */}
                {auth?.user?.address && (
                  <div className="delivery-address">
                    <h4>Delivery Address</h4>
                    <p>{auth.user.address}</p>
                    <button 
                      className="change-address-btn"
                      onClick={() => navigate('/dashboard/user/profile')}
                    >
                      Change Address
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;

