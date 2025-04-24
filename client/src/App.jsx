import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import './styles.css';
import axios from 'axios';
import Admin from './pages/Admin';
import Dashboard from './pages/Dashboard';
import EditEvent from './pages/EditEvent';




const HomePage = ({ eventData }) => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/contact', formData);
      if (res.data.success) {
        setStatus('✅ Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
      }
    } catch (error) {
      console.error('❌ Error sending message:', error);
      setStatus('❌ Failed to send message.');
    }
  };

  useEffect(() => {
    if (location.state?.scrollTo) {
      const section = document.getElementById(location.state.scrollTo);
      if (section) {
        setTimeout(() => {
          section.scrollIntoView({ behavior: 'smooth' });
        }, 100); 
      }
    }
  }, [location]);

   useEffect(() => {
    const targetDate = new Date(eventData.sangeethDate);

  const updateCountdown = () => {
    const now = new Date();
    const diff = targetDate - now;

    if (diff <= 0) {
      const el = document.getElementById("timer");
      if (el) el.innerHTML = "🎉 It's Sangeeth time!";
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    const setText = (id, value) => {
      const el = document.getElementById(id);
      if (el) el.textContent = value;
    };

    setText("days", days);
    setText("hours", hours);
    setText("minutes", minutes);
    setText("seconds", seconds);
  };

  updateCountdown(); // Initial call
  const interval = setInterval(updateCountdown, 1000); // Repeat every second

  return () => clearInterval(interval); // Cleanup
}, []);

  

  useEffect(() => {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
      const imageUrl = section.dataset.bg;
      section.style.backgroundImage = `url('${imageUrl}')`;
    });

    const revealSections = () => {
      const triggerPoint = window.innerHeight * 0.75;
      sections.forEach(section => {
        let sectionTop = section.getBoundingClientRect().top;
        if (sectionTop < triggerPoint) {
          section.classList.add('visible');
        }
      });
    };

    revealSections();
    window.addEventListener('scroll', revealSections);
    return () => window.removeEventListener('scroll', revealSections);
  }, []);

  return (
    <>
      <Navbar />
      
        <section id="home" className="home-container">
          <div className="floating-hearts">
            <span>❤️</span>
            <span>💝</span>
            <span>💖</span>
            <span>💕</span>
            <span>💘</span>
          </div>
          <div className="home-content-wrapper">
            <div className="circular-content">
              <div className="love-quote-top">"Two hearts, one love, forever together"</div>
              <img src="/flowers-top.png" alt="decorative floral" className="flower-line top" />
              <div className="home-header">Manohar <span className="heart-symbol">💑</span> Kartrina kaif</div>
              <div className="home-subheader">Together with their families, invite you to celebrate their wedding</div>
              <div className="love-quote">"Every love story is beautiful, but ours is my favorite"</div>
              <div className="home-date">
                <span className="date-icon">🗓</span> {new Date(eventData.travel.dateTime).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}
                <span className="separator">|</span>
                <span className="venue-icon">🏰</span> {eventData.travel.destination}
              </div>
              <img src="/flowers-top.png" alt="decorative floral" className="flower-line bottom" />
              <div className="love-quote-bottom">"The best is yet to come..."</div>
            </div>
          </div>
          <div className="floating-hearts right">
            <span>💗</span>
            <span>💓</span>
            <span>💞</span>
            <span>💝</span>
            <span>❤️</span>
          </div>
        </section>

        <section id="haldi" className="section" data-bg="/Haldhi2.png">
          <div className="section-transition top"></div>
          <div className="haldi-container">
            <div className="haldi-decorative-border">
              <div className="corner top-left"></div>
              <div className="corner top-right"></div>
              <div className="corner bottom-left"></div>
              <div className="corner bottom-right"></div>
              
              <div className="haldi-content">
                <div className="section-title haldi-title">
                  <div className="title-decoration">
                    <img src="/mandala-decoration.png" alt="Mandala" className="mandala-img" />
                  </div>
                  <h2>The Haldi Ceremony</h2>
                  <div className="title-decoration">
                    <img src="/mandala-decoration.png" alt="Mandala" className="mandala-img" />
                  </div>
                </div>

                <div className="haldi-quotes">
                  <p className="main-quote">"The auspicious beginning of a beautiful journey"</p>
                  <p className="sub-quote">"Where tradition meets celebration in a splash of golden hues"</p>
                </div>

                <div className="haldi-grid">
                  <div className="haldi-image-wrapper left">
                    <div className="image-frame">
                      <img src="/HaldhiHands.png" alt="Haldi Ritual" className="haldi-img fade-in" />
                      <div className="image-overlay">
                        <span className="overlay-text">Sacred Traditions</span>
                        <p className="overlay-description">The blessing of turmeric marks the beginning of the celebrations</p>
                      </div>
                    </div>
                    <div className="decorative-elements">
                      <img src="/flower-corner.png" alt="Decorative Corner" className="corner-decoration" />
                    </div>
                  </div>

                  <div className="haldi-details-container">
                    <div className="details-card">
                      <div className="card-header">
                        <span className="card-icon">✨</span>
                        <h3>Ceremony Details</h3>
                      </div>
                      
                      <div className="detail-items">
                        <div className="detail-item venue">
                          <div className="detail-icon">🏰</div>
                          <div className="detail-text">
                            <h4>Venue</h4>
                            <p>{eventData.haldiVenue}</p>
                          </div>
                        </div>

                        <div className="detail-item time">
                          <div className="detail-icon">🕰</div>
                          <div className="detail-text">
                            <h4>Time</h4>
                            <p>{new Date(eventData.haldiDate).toLocaleString('en-US', {
                              hour: 'numeric',
                              minute: '2-digit',
                              hour12: true,
                              month: 'long',
                              day: 'numeric',
                              year: 'numeric'
                            })}</p>
                          </div>
                        </div>

                        <div className="detail-item dress">
                          <div className="detail-icon">👗</div>
                          <div className="detail-text">
                            <h4>Dress Code</h4>
                            <p>Traditional Yellow Attire</p>
                          </div>
                        </div>
                      </div>

                      <div className="ceremony-note">
                        <p>"Join us in this auspicious ceremony as we embrace the glow of tradition"</p>
                      </div>
                    </div>
                  </div>

                  <div className="haldi-image-wrapper right">
                    <div className="image-frame">
                      <img src="/Haldhi3.png" alt="Traditional Setup" className="haldi-img fade-in" />
                      <div className="image-overlay">
                        <span className="overlay-text">Festive Moments</span>
                        <p className="overlay-description">Celebrating with colors, music, and joy</p>
                      </div>
                    </div>
                    <div className="decorative-elements">
                      <img src="/flower-corner.png" alt="Decorative Corner" className="corner-decoration" />
                    </div>
                  </div>
                </div>

                <div className="haldi-traditions">
                  <div className="tradition-items">
                    <div className="tradition-item">
                      <span className="tradition-icon">🌺</span>
                      <p>Traditional Rituals</p>
                    </div>
                    <div className="tradition-item">
                      <span className="tradition-icon">🎵</span>
                      <p>Folk Music</p>
                    </div>
                    <div className="tradition-item">
                      <span className="tradition-icon">💃</span>
                      <p>Dance & Celebration</p>
                    </div>
                    <div className="tradition-item">
                      <span className="tradition-icon">🍱</span>
                      <p>Traditional Feast</p>
                    </div>
                  </div>
                </div>

                <div className="floating-elements">
                  <img src="/Marigold.png" alt="Marigold" className="float-item marigold" />
                  <img src="/Banana.png" alt="Banana Leaf" className="float-item banana-leaf" />
                  <img src="/Coconut.png" alt="Coconut" className="float-item coconut" />
                  <div className="sparkle sparkle-1"></div>
                  <div className="sparkle sparkle-2"></div>
                  <div className="sparkle sparkle-3"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="section-transition bottom"></div>
        </section>

        <section id="sangeeth" className="section" data-bg="/Sangeeth.jpg">
          <div className="section-transition top"></div>
          <div className="overlay sangeeth-overlay">
            <div className="content sangeeth-content">
              <div className="section-title">
                <span className="title-decoration">♫</span>
                <h2>Sangeeth Night</h2>
                <span className="title-decoration">♫</span>
              </div>
              <p className="ceremony-quote">"Where music meets love, and dance celebrates joy..."</p>
              
              <div className="highlights-container">
                <div className="highlight-item">
                  <div className="highlight-icon">🎵</div>
                  <p>Live Music</p>
                  <div className="highlight-details">Experience the magic of melodious tunes</div>
                </div>
                <div className="highlight-item">
                  <div className="highlight-icon">💃</div>
                  <p>Dance Performances</p>
                  <div className="highlight-details">Witness spectacular choreographies</div>
                </div>
                <div className="highlight-item">
                  <div className="highlight-icon">✨</div>
                  <p>Cultural Show</p>
                  <div className="highlight-details">Celebrate our rich traditions</div>
                </div>
              </div>

              <div className="event-timing">
                <div className="timing-circle">
                  <div className="timing-content">
                    <h3>When Dreams Come Alive</h3>
                    <p>Evening of Joy and Celebration</p>
                    <div className="countdown-timer">
                      <div id="timer">
                        <span id="days"></span> Days
                        <span id="hours"></span> Hours
                        <span id="minutes"></span> Minutes
                        <span id="seconds"></span> Seconds
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="gallery">
                <h3>Glimpses of Joy</h3>
                <div className="gallery-images">
                  <div className="gallery-item">
                    <img src="/sangeeth1.JPG" alt="Sangeeth Image 1" />
                    <div className="gallery-overlay">
                      <span>Moments of Love</span>
                    </div>
                  </div>
                  <div className="gallery-item">
                    <img src="/sangeeth2.JPG" alt="Sangeeth Image 2" />
                    <div className="gallery-overlay">
                      <span>Dancing Hearts</span>
                    </div>
                  </div>
                  <div className="gallery-item">
                    <img src="/sangeeth3.JPG" alt="Sangeeth Image 3" />
                    <div className="gallery-overlay">
                      <span>Musical Evening</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="section-transition bottom"></div>
        </section>

        <section id="engagement" className="section" data-bg="/Engage.jpg">
          <div className="section-transition top"></div>
          <div className="overlay engagement-overlay">
            <div className="content engagement-content">
              <div className="section-title">
                <span className="title-decoration">💍</span>
                <h2>The Promise</h2>
                <span className="title-decoration">💍</span>
              </div>
              <div className="engagement-quote">"Every love story is beautiful, but ours is my favorite"</div>
              <div className="engagement-details">
                <div className="detail-circle">
                  <span className="detail-icon">📅</span>
                  <h3>The Date</h3>
                  <p>{new Date(eventData.sangeethDate).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}</p>
                </div>
                <div className="detail-circle">
                  <span className="detail-icon">💝</span>
                  <h3>The Moment</h3>
                  <p>When Two Hearts Said Yes</p>
                </div>
                <div className="detail-circle">
                  <span className="detail-icon">✨</span>
                  <h3>The Beginning</h3>
                  <p>Of Our Forever</p>
                </div>
              </div>
              <p className="engagement-message">
                "Two hearts, one love, a promise of forever. Join us as we celebrate this beautiful beginning."
              </p>
            </div>
          </div>
          <div className="section-transition bottom"></div>
        </section>

        <section id="travel-details" className="section" data-bg="/TravelDetails.webp">
          <div className="content">
            <h2>🌍 Travel Details ✈️</h2>
            <p><em>"Journeying together to a celebration of love!"</em></p>
            <p><strong>📍 Wedding Destination:</strong> {eventData.travel.destination}</p>
            <p><strong>📅 Date & Time:</strong> {eventData.travel.dateTime}</p>
            <p><strong>🚗 How to Reach:</strong></p>
            <ul>
              <li>✈️ <strong>By Air:</strong> {eventData.travel.air}</li>
              <li>🚆 <strong>By Train:</strong> {eventData.travel.train}</li>
              <li>🚗 <strong>By Road:</strong> {eventData.travel.road}</li>
            </ul>
            <p><strong>🏨 Accommodation:</strong> We have arranged comfortable stays for our guests. For details, contact 1 774-636-0392.</p>
            <p><strong>📜 Special Notes:</strong></p>
            <ul>
              <li>🎭 Dress Code: Traditional Indian</li>
              <li>☀️ Weather Forecast: Sunny and warm</li>
              <li>📩 RSVP by 5/21/2025</li>
            </ul>
            <p><strong>💌 We can't wait to celebrate with you!</strong></p>
          </div>
        </section>

        <section id="wedding-location" className="section" data-bg="/Location.webp">
          <div className="content">
            <h2>📍 Wedding Location</h2>
            <p>Join us at our beautiful wedding venue to celebrate love and togetherness.</p>
            <p><strong>Venue:</strong> {eventData.wedding.venue}</p>
            <p><strong>Address:</strong> {eventData.wedding.address}</p>
            <a href={eventData.wedding.mapLink} target="_blank" className="map-button">📍 View on Google Maps</a>
            </div>
        </section>

        <section id="local-accommodation" className="section" data-bg="/Accomodation.webp">
          <div className="content">
            <h2>🏨 Local Accommodation</h2>
            <p>We have selected a few comfortable stays near our wedding venue for your convenience.</p>
            <div className="hotel-list">
            {eventData.accommodations.map((hotel, idx) => (
              <div className="hotel" key={idx}>
                <h3>{hotel.name}</h3>
                <p>📍 Address: {hotel.address}</p>
                <a href={hotel.map} target="_blank" className="map-button">📍 View on Google Maps</a>
              </div>
               ))}
             
            </div>
          </div>
        </section>

        <section id="contact-info" className="section" data-bg="/ContactBackground.jpg">
          <div className="section-transition top"></div>
          <div className="contact-container">
            <div className="contact-header">
              <div className="section-title">
                <span className="title-decoration">💌</span>
                <h2>Stay Connected</h2>
                <span className="title-decoration">💌</span>
              </div>
              <p className="contact-subtitle">Want to send a message to us? We'd love to hear from you!</p>
            </div>
            
            <div className="contact-content">
              <div className="contact-info-cards">
                <div className="contact-card connect-card">
                  <div className="card-icon">📱</div>
                  <h3>Connect With Us</h3>
                  <div className="card-content">
                    <div className="contact-method">
                      <span className="method-icon">📧</span>
                      <a href="mailto:yourwedding@email.com">yourwedding@email.com</a>
                    </div>
                    <div className="contact-method">
                      <span className="method-icon">📞</span>
                      <a href="tel:+17746360392">+1 774-636-0392</a>
                    </div>
                    <div className="contact-method">
                      <span className="method-icon">💬</span>
                      <a href="https://wa.me/17746360392">WhatsApp Us</a>
                    </div>
                  </div>
                </div>

                <div className="contact-card social-card">
                  <div className="card-icon">🌟</div>
                  <h3>Follow Our Journey</h3>
                  <div className="card-content">
                    <div className="social-links">
                      <a href="https://www.instagram.com/yourprofile" className="social-link instagram">
                        <span className="social-icon">📸</span>
                        <span>Instagram</span>
                      </a>
                      <a href="https://www.facebook.com/yourpage" className="social-link facebook">
                        <span className="social-icon">📘</span>
                        <span>Facebook</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="contact-form-container">
                <div className="form-header">
                  <h3>Send Us a Message</h3>
                  <p>We'll get back to you as soon as possible!</p>
                </div>
                <form onSubmit={handleSubmit} className="animated-form">
                  <div className="form-group">
                    <input 
                      type="text" 
                      name="name" 
                      placeholder="Your Name" 
                      value={formData.name} 
                      onChange={handleChange} 
                      required 
                    />
                    <span className="form-icon">👤</span>
                  </div>
                  <div className="form-group">
                    <input 
                      type="email" 
                      name="email" 
                      placeholder="Your Email" 
                      value={formData.email} 
                      onChange={handleChange} 
                      required 
                    />
                    <span className="form-icon">✉️</span>
                  </div>
                  <div className="form-group">
                    <textarea 
                      name="message" 
                      placeholder="Your Message..." 
                      value={formData.message} 
                      onChange={handleChange} 
                      required 
                    />
                    <span className="form-icon">✏️</span>
                  </div>
                  <button type="submit" className="submit-btn">
                    <span>Send Message</span>
                    <span className="btn-icon">💌</span>
                  </button>
                  {status && <div className="form-status">{status}</div>}
                </form>
              </div>
            </div>
          </div>
          <div className="section-transition bottom"></div>
        </section>
      
    </>
  );
};

const App = () => {
  const [eventData, setEventData] = useState(() => {
    const saved = localStorage.getItem('eventData');
    return saved ? JSON.parse(saved) : {
      sangeethDate: "2025-06-01T19:00:00",
      haldiDate: "2025-05-31T18:00:00",
      haldiVenue: "Florian Hall",
      travel: {
        destination: "Florian Hall",
        dateTime: "2025-05-31T18:00:00",
        air: "Logan International",
        train: "Park St Station",
        road: "I-93"
      },
      wedding: {
        venue: "Florian Hall",
        address: "55 Hallet St, Boston, MA 02122",
        mapLink: "https://maps.app.goo.gl/bLDcjgqaNwjhPSou8"
      },
      accommodations: [
        { name: "Best Western Adams Inn Quincy-Boston", address: "29 Hancock St, Quincy, MA 02171", map: "https://www.google.com/travel/search?ts=CAESCAoCCAMKAggDGhwSGhIUCgcI6Q8QBBgcEgcI6Q8QBBgdGAEyAhAAKgcKBToDVVNE&qs=CAEyFENnc0k4Tnl1dU1IRmxiS2pBUkFCOApCCRGE4Wo6gkYy5kIJEYUBwq7y1YmsQgkRsHnXal1QL9xaVAgBMlCqAU0QASoKIgZob3RlbHMoADIfEAEiG_uZL7SzzEYvgeNgSl6Vwa81vxmYkekaKznBOTIcEAIiGGhvdGVscyBuZWFyIGZsb3JpYW4gaGFsbA&utm_campaign=sharing&utm_medium=link_btn&utm_source=htls" },
        { name: "Holiday Inn Express Boston - Quincy by IHG", address: "1 Arlington St, Quincy, MA 02171", map: "https://www.google.com/travel/search?ts=CAESCAoCCAMKAggDGhwSGhIUCgcI6Q8QBBgcEgcI6Q8QBBgdGAEyAhAAKgcKBToDVVNE&qs=CAEyE0Nnb0lyby1OMzVTTGw2VmZFQUU4CkIJEYThajqCRjLmQgkRhQHCrvLViaxCCRGs8xTAiwTwkVpeCAEyWqoBVxABKgoiBmhvdGVscygAMh8QASIb2x7g3Swxsj47GKh4LZ26Qt0U4q991ZSwAvoYMiYQAiIiaG90ZWxzIG5lYXIgZmxvcmlhbiBoYWxsIGJvc3RvbiBtYQ&utm_campaign=sharing&utm_medium=link_btn&utm_source=htls" },
        { name: "Staybridge Suites Boston-Quincy by IHG", address: "1 Arlington St, Quincy, MA 02171", map: "https://www.google.com/travel/search?ts=CAESCAoCCAMKAggDGh4SHBIUCgcI6Q8QBBgcEgcI6Q8QBBgdGAEyBAgAEAAqBwoFOgNVU0Q&qs=CAEyJ0Noa0luZHZ3azZQRDlLOHZHZzB2Wnk4eE1XWnJhM3B5WTE5aUVBRTgKQgkRhOFqOoJGMuZCCRGFAcKu8tWJrEIJEazzFMCLBPCRWl4IATJaqgFXEAEqCiIGaG90ZWxzKAAyHxABIhvbHuDdLDGyPjsYqHgtnbpC3RTir33VlLAC-hgyJhACIiJob3RlbHMgbmVhciBmbG9yaWFuIGhhbGwgYm9zdG9uIG1h&utm_campaign=sharing&utm_medium=link_btn&utm_source=htls" },
        { name: "Marriott Boston Quincy", address: "1000 Marriott Dr, Quincy, MA 02169", map: "https://www.google.com/travel/search?ts=CAESCAoCCAMKAggDGh4SHBIUCgcI6Q8QBBgcEgcI6Q8QBBgdGAEyBAgAEAAqBwoFOgNVU0Q&qs=CAEyJkNoZ0kzWnF5ODdERC1NTFpBUm9MTDJjdk1YWnFOakEyYW5NUUFROApCCRGE4Wo6gkYy5kIJEYUBwq7y1YmsQgkRrPMUwIsE8JFIAFpeCAEyWqoBVxABKgoiBmhvdGVscygAMh8QASIb2x7g3Swxsj47GKh4LZ26Qt0U4q991ZSwAvoYMiYQAiIiaG90ZWxzIG5lYXIgZmxvcmlhbiBoYWxsIGJvc3RvbiBtYQ&utm_campaign=sharing&utm_medium=link_btn&utm_source=htls" }
      ]
    };
  });
  useEffect(() => {
    localStorage.setItem('eventData', JSON.stringify(eventData));
  }, [eventData]);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/admin" element={<Admin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<HomePage eventData={eventData} />} />
        <Route path="/edit" element={<EditEvent eventData={eventData} setEventData={setEventData} />} />
      </Routes>
    </Router>
  );
};


export default App;
