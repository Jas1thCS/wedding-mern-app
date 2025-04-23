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
      
        <section id="home" className="section" data-bg="/Home.jpg"></section>

        <section id="haldi" className="section" data-bg="/Haldhi2.png">
          <div className="haldi-overlay">
            <div className="haldi-content">
              <h2>💛 Haldi Ceremony 💛</h2>
              <p>Celebrate the sacred turmeric ritual with love, music, and laughter.</p>
              <div className="haldi-grid">
                <img src="/HaldhiHands.png" alt="Haldi Ritual" className="haldi-img fade-in" />
                <div className="haldi-details">
                  <h3>📍 Venue:</h3>
                  <p>{eventData.haldiVenue}</p>
                  <h3>🕰 Time:</h3>
                  <p>{eventData.haldiTime}</p>
                  <h3>👗 Dress Code:</h3>
                  <p>Yellow Traditional Attire</p>
                </div>
                <img src="/Haldhi3.png" alt="Traditional Setup" className="haldi-img fade-in" />
              </div>
              <div className="haldi-decorations">
                <img src="/Marigold.png" alt="Marigold Garland" className="marigold floating" />
                <img src="/Banana.png" alt="Banana Leaf" className="banana-leaf floating" />
                <img src="/Coconut.png" alt="Coconut" className="coconut floating" />
              </div>
            </div>
          </div>
        </section>

        <section id="sangeeth" className="section" data-bg="/Sangeeth.jpg">
          <div className="overlay">
            <div className="content">
              <h2>Sangeeth Ceremony</h2>
              <p className="subtitle">A night of music, dance, and celebration!</p>
              <div className="highlights">
                <div className="highlight-item"><div className="icon">🎶</div><p>Live Music Performances</p></div>
                <div className="highlight-item"><div className="icon">💃</div><p>Dance Performances</p></div>
                <div className="highlight-item"><div className="icon">🎤</div><p>Karaoke & Fun Activities</p></div>
              </div>
              <div className="countdown">
              <h3>Countdown to Sangeeth</h3>
              <div id="timer">
                <span id="days"></span> Days
                <span id="hours"></span> Hours
                <span id="minutes"></span> Minutes
                <span id="seconds"></span> Seconds
              </div>
            </div>
              <div className="gallery">
                <h3>Gallery</h3>
                <div className="gallery-images">
                  <img src="/sangeeth1.JPG" alt="Sangeeth Image 1" />
                  <img src="/sangeeth2.JPG" alt="Sangeeth Image 2" />
                  <img src="/sangeeth3.JPG" alt="Sangeeth Image 3" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="engagement" className="section" data-bg="/Engage.jpg">
          <div className="content">
            <h2>✨ A Promise for Forever ✨</h2>
            <p>"Two hearts, one journey, forever entwined."</p>
            <p>We are thrilled to announce that we got engaged on <strong>FEB 30, 2027</strong>! 💍</p>
            <p>A beautiful beginning to a lifetime of love and happiness.</p>
          </div>
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
            <p><strong>🏨 Accommodation:</strong> We have arranged comfortable stays for our guests. For details, contact [Contact Name & Number].</p>
            <p><strong>📜 Special Notes:</strong></p>
            <ul>
              <li>🎭 Dress Code: Traditional Indian</li>
              <li>☀️ Weather Forecast: [General climate details]</li>
              <li>📩 RSVP by 5/21/2025</li>
            </ul>
            <p><strong>💌 We can’t wait to celebrate with you!</strong></p>
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
          <div className="container">
            <div className="contact-header">
              <h2>📞 Contact Us</h2>
              <p>Have questions about the wedding? We’d love to help!</p>
            </div>
            <div className="contact-grid">
              <div className="contact-details">
                <div className="info">
                  <h3>📍 Venue Address</h3>
                  <p>123 Wedding Lane, City, ZIP</p>
                </div>
                <div className="info">
                  <h3>📧 Email</h3>
                  <p><a href="mailto:yourwedding@email.com">yourwedding@email.com</a></p>
                </div>
                <div className="info">
                  <h3>📱 Call / WhatsApp</h3>
                  <p><a href="tel:+17746360392">+1 774-636-0392</a></p>
                </div>
                <div className="social-links">
                  <a href="https://wa.me/17746360392" target="_blank">📱 WhatsApp</a>
                  <a href="https://www.instagram.com/yourprofile" target="_blank">📸 Instagram</a>
                  <a href="https://www.facebook.com/yourpage" target="_blank">📘 Facebook</a>
                </div>
              </div>
              <div className="contact-form">
                <h3>💌 Send Us a Message</h3>
                <form onSubmit={handleSubmit}>
                  <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required />
                  <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required />
                  <textarea name="message" placeholder="Type your message..." value={formData.message} onChange={handleChange} required />
                  <button type="submit">Send Message</button>
                  {status && <p>{status}</p>}
                </form>
              </div>
            </div>
          </div>
        </section>
      
    </>
  );
};

const App = () => {
  const [eventData, setEventData] = useState(() => {
    const saved = localStorage.getItem('eventData');
    return saved ? JSON.parse(saved) : {
      sangeethDate: "2025-07-14T19:00:00",
      haldiVenue: "Zee Garden Function Hall",
      haldiTime: "10:00 AM - 12:00 PM, 15th July 2025",
      travel: {
        destination: "[Venue Name, Location]",
        dateTime: "[Wedding Date & Time]",
        air: "[Airport Name, Code]",
        train: "[Station Name]",
        road: "[Highways / Roads]"
      },
      wedding: {
        venue: "[Your Wedding Venue Name]",
        address: "[Wedding Venue Address]",
        mapLink: "https://maps.app.goo.gl/bLDcjgqaNwjhPSou8"
      },
      accommodations: [
        { name: "Hotel Grand Palace", address: "123 Wedding Street, City, ZIP", map: "https://www.google.com/maps/place/HotelGrandPalace" },
        { name: "Royal Heritage Hotel", address: "456 Love Avenue, City, ZIP", map: "https://www.google.com/maps/place/RoyalHeritageHotel" },
        { name: "Cozy Stay Inn", address: "789 Romantic Lane, City, ZIP", map: "https://www.google.com/maps/place/CozyStayInn" },
        { name: "Luxury Bliss Resort", address: "101 Dreamland Drive, City, ZIP", map: "https://www.google.com/maps/place/LuxuryBlissResort" }
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
