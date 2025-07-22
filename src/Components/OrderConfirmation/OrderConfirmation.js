import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Layout from '../Layout/Layout.js';
import './OrderConfirmation.css';

const OrderConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { orderId, orderData } = location.state || {};

  useEffect(() => {
    if (!orderId || !orderData) {
      navigate('/');
    }
  }, [orderId, orderData, navigate]);

  if (!orderId || !orderData) {
    return null;
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getEstimatedDelivery = () => {
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 7); // 7 days from now
    return deliveryDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Layout title="Order Confirmation - ToeFit">
      <div className="order-confirmation-page">
        <div className="container">
          <div className="confirmation-header">
            <div className="success-icon">✅</div>
            <h1>Order Confirmed!</h1>
            <p>Thank you for your purchase. Your order has been successfully placed.</p>
          </div>

          <div className="order-details">
            <div className="order-info-card">
              <div className="order-summary">
                <h2>Order Summary</h2>
                <div className="order-meta">
                  <div className="order-item">
                    <span className="label">Order ID:</span>
                    <span className="value">{orderId}</span>
                  </div>
                  <div className="order-item">
                    <span className="label">Order Date:</span>
                    <span className="value">{formatDate(new Date())}</span>
                  </div>
                  <div className="order-item">
                    <span className="label">Payment Method:</span>
                    <span className="value">
                      {orderData.paymentMethod === 'card' && orderData.paymentDetails ? 
                        `${orderData.paymentDetails.cardType} ending in ${orderData.paymentDetails.last4}` :
                        orderData.paymentMethod === 'paypal' ? 'PayPal' :
                        'Cash on Delivery'
                      }
                    </span>
                  </div>
                  <div className="order-item">
                    <span className="label">Total Amount:</span>
                    <span className="value total-amount">${orderData.totalAmount.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="delivery-info">
                <h3>Delivery Information</h3>
                <div className="delivery-address">
                  <p><strong>Delivery Address:</strong></p>
                  <p>{orderData.shippingAddress}</p>
                </div>
                <div className="delivery-timeline">
                  <p><strong>Estimated Delivery:</strong></p>
                  <p className="delivery-date">{getEstimatedDelivery()}</p>
                </div>
                {orderData.orderNotes && (
                  <div className="order-notes">
                    <p><strong>Order Notes:</strong></p>
                    <p>{orderData.orderNotes}</p>
                  </div>
                )}
              </div>

              <div className="order-items">
                <h3>Items Ordered ({orderData.products.length})</h3>
                <div className="items-list">
                  {orderData.products.map((item) => (
                    <div key={item._id} className="confirmation-item">
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
              </div>

              <div className="next-steps">
                <h3>What's Next?</h3>
                <div className="steps-timeline">
                  <div className="timeline-step completed">
                    <div className="step-icon">✅</div>
                    <div className="step-content">
                      <h4>Order Confirmed</h4>
                      <p>Your order has been received and confirmed</p>
                    </div>
                  </div>
                  <div className="timeline-step">
                    <div className="step-icon">📦</div>
                    <div className="step-content">
                      <h4>Processing</h4>
                      <p>Your order is being prepared for shipment</p>
                    </div>
                  </div>
                  <div className="timeline-step">
                    <div className="step-icon">🚚</div>
                    <div className="step-content">
                      <h4>Shipped</h4>
                      <p>Your order will be dispatched and tracking info sent</p>
                    </div>
                  </div>
                  <div className="timeline-step">
                    <div className="step-icon">🏠</div>
                    <div className="step-content">
                      <h4>Delivered</h4>
                      <p>Your order will arrive at your doorstep</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="confirmation-actions">
              <div className="action-card">
                <h3>Track Your Order</h3>
                <p>You'll receive an email with tracking information once your order ships.</p>
                <button 
                  className="btn btn-primary"
                  onClick={() => navigate('/dashboard/user/orders')}
                >
                  View Order History
                </button>
              </div>

              <div className="action-card">
                <h3>Continue Shopping</h3>
                <p>Discover more amazing products in our collection.</p>
                <button 
                  className="btn btn-outline"
                  onClick={() => navigate('/')}
                >
                  Browse Products
                </button>
              </div>

              <div className="action-card">
                <h3>Need Help?</h3>
                <p>Contact our customer support for any questions.</p>
                <button 
                  className="btn btn-outline"
                  onClick={() => navigate('/about')}
                >
                  Contact Support
                </button>
              </div>
            </div>
          </div>

          <div className="confirmation-footer">
            <div className="thank-you-message">
              <h2>Thank You for Choosing ToeFit!</h2>
              <p>
                We appreciate your business and look forward to serving you again. 
                If you have any questions about your order, please don't hesitate to contact us.
              </p>
            </div>
            
            <div className="social-share">
              <p>Share your purchase:</p>
              <div className="share-buttons">
                <button className="share-btn facebook">📘 Facebook</button>
                <button className="share-btn twitter">🐦 Twitter</button>
                <button className="share-btn instagram">📷 Instagram</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OrderConfirmation; 