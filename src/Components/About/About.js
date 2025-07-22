import React from 'react';
import Layout from '../Layout/Layout.js';
import './About.css';

const About = () => {
  return (
    <Layout title="About Us - ToeFit">
      <div className="about-page">
        {/* Hero Section */}
        <section className="about-hero">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">About ToeFit</h1>
              <p className="hero-subtitle">
                Crafting Premium Footwear for Every Step of Your Journey
              </p>
              <p className="hero-description">
                Since our founding, ToeFit has been dedicated to creating exceptional footwear 
                that combines style, comfort, and quality. We believe that the right pair of 
                shoes can transform not just your outfit, but your entire day.
              </p>
            </div>
            <div className="hero-image">
              <div className="image-placeholder">
                <span className="placeholder-icon">👟</span>
              </div>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="story-section">
          <div className="container">
            <div className="story-content">
              <h2 className="section-title">Our Story</h2>
              <div className="story-grid">
                <div className="story-text">
                  <p>
                    Founded in 2020, ToeFit emerged from a simple yet powerful vision: to create 
                    footwear that doesn't compromise between style and comfort. Our founders, 
                    passionate shoe enthusiasts themselves, noticed a gap in the market for shoes 
                    that could seamlessly transition from professional settings to casual adventures.
                  </p>
                  <p>
                    What started as a small workshop has grown into a trusted brand, serving 
                    thousands of customers worldwide. Every pair of ToeFit shoes tells a story 
                    of meticulous craftsmanship, innovative design, and unwavering commitment to quality.
                  </p>
                </div>
                <div className="story-stats">
                  <div className="stat-item">
                    <h3>50K+</h3>
                    <p>Happy Customers</p>
                  </div>
                  <div className="stat-item">
                    <h3>200+</h3>
                    <p>Shoe Designs</p>
                  </div>
                  <div className="stat-item">
                    <h3>15+</h3>
                    <p>Countries Served</p>
                  </div>
                  <div className="stat-item">
                    <h3>99%</h3>
                    <p>Satisfaction Rate</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="values-section">
          <div className="container">
            <h2 className="section-title">Our Values</h2>
            <div className="values-grid">
              <div className="value-card">
                <div className="value-icon">🏆</div>
                <h3>Quality First</h3>
                <p>
                  We use only the finest materials and employ skilled artisans to ensure 
                  every pair meets our exacting standards.
                </p>
              </div>
              <div className="value-card">
                <div className="value-icon">💡</div>
                <h3>Innovation</h3>
                <p>
                  Constantly pushing boundaries with new technologies and designs to 
                  enhance comfort and performance.
                </p>
              </div>
              <div className="value-card">
                <div className="value-icon">🌍</div>
                <h3>Sustainability</h3>
                <p>
                  Committed to environmentally responsible practices and sustainable 
                  materials in our manufacturing process.
                </p>
              </div>
              <div className="value-card">
                <div className="value-icon">❤️</div>
                <h3>Customer Care</h3>
                <p>
                  Your satisfaction is our priority. We're here to ensure you love 
                  every step in your ToeFit shoes.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="team-section">
          <div className="container">
            <h2 className="section-title">Meet Our Team</h2>
            <div className="team-grid">
              <div className="team-member">
                <div className="member-image">
                  <span className="member-placeholder">👤</span>
                </div>
                <h3>Sarah Johnson</h3>
                <p className="member-role">Founder & CEO</p>
                <p className="member-description">
                  Visionary leader with 15+ years in footwear design and retail innovation.
                </p>
              </div>
              <div className="team-member">
                <div className="member-image">
                  <span className="member-placeholder">👤</span>
                </div>
                <h3>Michael Chen</h3>
                <p className="member-role">Head of Design</p>
                <p className="member-description">
                  Award-winning designer bringing creativity and functionality to every collection.
                </p>
              </div>
              <div className="team-member">
                <div className="member-image">
                  <span className="member-placeholder">👤</span>
                </div>
                <h3>Emma Rodriguez</h3>
                <p className="member-role">Quality Director</p>
                <p className="member-description">
                  Ensures every pair meets our rigorous standards for comfort and durability.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="features-section">
          <div className="container">
            <h2 className="section-title">Why Choose ToeFit?</h2>
            <div className="features-grid">
              <div className="feature-item">
                <div className="feature-icon">🚚</div>
                <h3>Free Shipping</h3>
                <p>Free delivery on orders over $50 worldwide</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon">↩️</div>
                <h3>Easy Returns</h3>
                <p>30-day hassle-free return policy</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon">🛡️</div>
                <h3>2-Year Warranty</h3>
                <p>Quality guarantee on all our products</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon">💬</div>
                <h3>24/7 Support</h3>
                <p>Always here to help with any questions</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon">🔒</div>
                <h3>Secure Payment</h3>
                <p>Safe and secure checkout process</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon">🎯</div>
                <h3>Perfect Fit</h3>
                <p>Detailed sizing guide for the perfect fit</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="contact-section">
          <div className="container">
            <div className="contact-content">
              <div className="contact-info">
                <h2>Get in Touch</h2>
                <p>Have questions? We'd love to hear from you!</p>
                <div className="contact-details">
                  <div className="contact-item">
                    <span className="contact-icon">📧</span>
                    <div>
                      <h4>Email</h4>
                      <p>info@toefit.com</p>
                    </div>
                  </div>
                  <div className="contact-item">
                    <span className="contact-icon">📞</span>
                    <div>
                      <h4>Phone</h4>
                      <p>+1 (555) 123-4567</p>
                    </div>
                  </div>
                  <div className="contact-item">
                    <span className="contact-icon">📍</span>
                    <div>
                      <h4>Address</h4>
                      <p>123 Fashion Street<br/>New York, NY 10001</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="contact-form">
                <h3>Send us a message</h3>
                <form className="message-form">
                  <div className="form-row">
                    <input type="text" placeholder="Your Name" required />
                    <input type="email" placeholder="Your Email" required />
                  </div>
                  <input type="text" placeholder="Subject" required />
                  <textarea placeholder="Your Message" rows="4" required></textarea>
                  <button type="submit" className="submit-btn">Send Message</button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
      </Layout>
  );
};

export default About;
