import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../Context/CartProvider.js';
import { useAuth } from '../../Context/Auth.js';
import Layout from '../Layout/Layout.js';
import toast from 'react-hot-toast';
import './Checkout.css';

const Checkout = () => {
  const [cart, setCart] = useCart();
  const [auth] = useAuth();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1); // 1: Order Review, 2: Payment
  
  // Payment form state
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardData, setCardData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: ''
  });
  
  // Order state
  const [orderNotes, setOrderNotes] = useState('');
  const [discount, setDiscount] = useState(0);

  // Calculations
  const calculateSubtotal = () => {
    return cart.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);
  };

  const calculateTax = (subtotal) => {
    return subtotal * 0.08;
  };

  const calculateShipping = () => {
    const subtotal = calculateSubtotal();
    return subtotal > 50 ? 0 : 9.99;
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const tax = calculateTax(subtotal);
    const shipping = calculateShipping();
    const discountAmount = (subtotal * discount) / 100;
    return subtotal + tax + shipping - discountAmount;
  };

  // Handle card input formatting
  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const handleCardInputChange = (field, value) => {
    let formattedValue = value;
    
    if (field === 'cardNumber') {
      formattedValue = formatCardNumber(value);
    } else if (field === 'expiryDate') {
      formattedValue = formatExpiryDate(value);
    } else if (field === 'cvv') {
      formattedValue = value.replace(/[^0-9]/g, '').substring(0, 4);
    }
    
    setCardData(prev => ({
      ...prev,
      [field]: formattedValue
    }));
  };

  // Validate payment form
  const validatePaymentForm = () => {
    if (paymentMethod === 'card') {
      const errors = [];
      
      if (!cardData.cardholderName.trim()) errors.push('Cardholder name is required');
      if (!cardData.cardNumber.replace(/\s/g, '') || cardData.cardNumber.replace(/\s/g, '').length < 16) {
        errors.push('Valid card number is required');
      }
      if (!cardData.expiryDate || cardData.expiryDate.length < 5) {
        errors.push('Valid expiry date is required');
      }
      if (!cardData.cvv || cardData.cvv.length < 3) {
        errors.push('Valid CVV is required');
      }
      
      if (errors.length > 0) {
        toast.error(errors[0]);
        return false;
      }
    }
    
    return true;
  };

  // Process payment
  const processPayment = async () => {
    if (!validatePaymentForm()) return;
    
    setLoading(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create order
      const orderData = {
        products: cart,
        totalAmount: calculateTotal(),
        paymentMethod,
        shippingAddress: auth.user.address,
        orderNotes,
        paymentDetails: paymentMethod === 'card' ? {
          last4: cardData.cardNumber.slice(-4),
          cardType: getCardType(cardData.cardNumber)
        } : null
      };

      // In a real app, you would send this to your backend
      // console.log('Order data:', orderData);
      
      // Clear cart
      setCart([]);
      localStorage.removeItem('cart');
      
      toast.success('Order placed successfully!', {
        style: { background: '#10b981', color: '#fff' },
        icon: '🎉'
      });
      
      // Redirect to order confirmation
      navigate('/order-confirmation', { 
        state: { 
          orderId: 'ORD-' + Date.now(),
          orderData 
        } 
      });
      
    } catch (error) {
      console.error('Payment error:', error);
      toast.error('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Get card type from number
  const getCardType = (number) => {
    const num = number.replace(/\s/g, '');
    if (num.startsWith('4')) return 'Visa';
    if (num.startsWith('5') || num.startsWith('2')) return 'Mastercard';
    if (num.startsWith('3')) return 'American Express';
    return 'Unknown';
  };

  // Redirect if cart is empty or user not logged in
  useEffect(() => {
    if (!auth?.token) {
      navigate('/login', { state: '/checkout' });
      return;
    }
    
    if (cart.length === 0) {
      navigate('/cart');
      return;
    }
    
    if (!auth?.user?.address) {
      toast.error('Please add a delivery address first');
      navigate('/dashboard/user/profile');
      return;
    }
  }, [auth, cart, navigate]);

  if (!auth?.token || cart.length === 0) {
    return null;
  }

  return (
    <Layout title="Checkout - ToeFit">
      <div className="checkout-page">
        <div className="container">
          <div className="checkout-header">
            <h1>Checkout</h1>
            <div className="checkout-steps">
              <div className={`step ${step >= 1 ? 'active' : ''}`}>
                <span className="step-number">1</span>
                <span className="step-label">Order Review</span>
              </div>
              <div className={`step ${step >= 2 ? 'active' : ''}`}>
                <span className="step-number">2</span>
                <span className="step-label">Payment</span>
              </div>
              <div className="step">
                <span className="step-number">3</span>
                <span className="step-label">Confirmation</span>
              </div>
            </div>
          </div>

          <div className="checkout-content">
            <div className="checkout-main">
              {step === 1 && (
                <div className="order-review">
                  <h2>Order Review</h2>
                  
                  <div className="order-items">
                    {cart.map((item) => (
                      <div key={item._id} className="checkout-item">
                        <div className="item-image">
                          <img
                            src={`http://localhost:8080/api/v1/product/product-photo/${item._id}`}
                            alt={item.name}
                          />
                        </div>
                        <div className="item-details">
                          <h4>{item.name}</h4>
                          <p>Quantity: {item.quantity || 1}</p>
                          <p className="item-price">${item.price} × {item.quantity || 1}</p>
                        </div>
                        <div className="item-total">
                          ${(item.price * (item.quantity || 1)).toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="delivery-details">
                    <h3>Delivery Information</h3>
                    <div className="delivery-address">
                      <p><strong>Delivery Address:</strong></p>
                      <p>{auth.user.address}</p>
                      <button 
                        className="btn btn-text"
                        onClick={() => navigate('/dashboard/user/profile')}
                      >
                        Change Address
                      </button>
                    </div>
                    
                    <div className="order-notes">
                      <label htmlFor="notes">Order Notes (Optional)</label>
                      <textarea
                        id="notes"
                        placeholder="Any special instructions for delivery..."
                        value={orderNotes}
                        onChange={(e) => setOrderNotes(e.target.value)}
                        rows="3"
                      />
                    </div>
                  </div>

                  <div className="step-actions">
                    <button 
                      className="btn btn-outline"
                      onClick={() => navigate('/cart')}
                    >
                      Back to Cart
                    </button>
                    <button 
                      className="btn btn-primary"
                      onClick={() => setStep(2)}
                    >
                      Continue to Payment
                    </button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="payment-section">
                  <h2>Payment Information</h2>
                  
                  <div className="payment-methods">
                    <h3>Payment Method</h3>
                    <div className="payment-options">
                      <label className="payment-option">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="card"
                          checked={paymentMethod === 'card'}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                        <span className="payment-icon">💳</span>
                        <span>Credit/Debit Card</span>
                      </label>
                      
                      <label className="payment-option">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="paypal"
                          checked={paymentMethod === 'paypal'}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                        <span className="payment-icon">🎫</span>
                        <span>PayPal</span>
                      </label>
                      
                      <label className="payment-option">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="cod"
                          checked={paymentMethod === 'cod'}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                        <span className="payment-icon">💵</span>
                        <span>Cash on Delivery</span>
                      </label>
                    </div>
                  </div>

                  {paymentMethod === 'card' && (
                    <div className="card-form">
                      <h3>Card Details</h3>
                      <div className="card-preview">
                        <div className="card-display">
                          <div className="card-number-display">
                            {cardData.cardNumber || '•••• •••• •••• ••••'}
                          </div>
                          <div className="card-info">
                            <span>{cardData.cardholderName || 'CARDHOLDER NAME'}</span>
                            <span>{cardData.expiryDate || 'MM/YY'}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="form-row">
                        <div className="form-group">
                          <label>Cardholder Name</label>
                          <input
                            type="text"
                            placeholder="John Doe"
                            value={cardData.cardholderName}
                            onChange={(e) => handleCardInputChange('cardholderName', e.target.value)}
                          />
                        </div>
                      </div>
                      
                      <div className="form-row">
                        <div className="form-group">
                          <label>Card Number</label>
                          <input
                            type="text"
                            placeholder="1234 5678 9012 3456"
                            value={cardData.cardNumber}
                            onChange={(e) => handleCardInputChange('cardNumber', e.target.value)}
                            maxLength="19"
                          />
                        </div>
                      </div>
                      
                      <div className="form-row">
                        <div className="form-group">
                          <label>Expiry Date</label>
                          <input
                            type="text"
                            placeholder="MM/YY"
                            value={cardData.expiryDate}
                            onChange={(e) => handleCardInputChange('expiryDate', e.target.value)}
                            maxLength="5"
                          />
                        </div>
                        <div className="form-group">
                          <label>CVV</label>
                          <input
                            type="text"
                            placeholder="123"
                            value={cardData.cvv}
                            onChange={(e) => handleCardInputChange('cvv', e.target.value)}
                            maxLength="4"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'paypal' && (
                    <div className="paypal-info">
                      <p>You will be redirected to PayPal to complete your payment.</p>
                    </div>
                  )}

                  {paymentMethod === 'cod' && (
                    <div className="cod-info">
                      <p>You will pay with cash when your order is delivered.</p>
                      <p><strong>Note:</strong> Please have the exact amount ready.</p>
                    </div>
                  )}

                  <div className="step-actions">
                    <button 
                      className="btn btn-outline"
                      onClick={() => setStep(1)}
                    >
                      Back to Review
                    </button>
                    <button 
                      className="btn btn-primary"
                      onClick={processPayment}
                      disabled={loading}
                    >
                      {loading ? 'Processing...' : `Pay $${calculateTotal().toFixed(2)}`}
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="checkout-summary">
              <div className="summary-card">
                <h3>Order Summary</h3>
                
                <div className="summary-row">
                  <span>Subtotal ({cart.reduce((sum, item) => sum + (item.quantity || 1), 0)} items)</span>
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
                      <span className="free-shipping">FREE</span>
                    ) : (
                      `$${calculateShipping().toFixed(2)}`
                    )}
                  </span>
                </div>

                <div className="summary-row total-row">
                  <span>Total</span>
                  <span className="total-amount">${calculateTotal().toFixed(2)}</span>
                </div>

                <div className="security-badges">
                  <div className="security-badge">🔒 Secure Payment</div>
                  <div className="security-badge">📱 Mobile Friendly</div>
                  <div className="security-badge">🚚 Fast Delivery</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout; 