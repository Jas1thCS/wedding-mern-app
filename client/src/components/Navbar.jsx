import React from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleScrollOrNavigate = (e, sectionId) => {
    e.preventDefault();
    if (location.pathname === '/') {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate('/', { state: { scrollTo: sectionId } });
    }
  };

  return (
    <header>
      <nav>
        <ul>
          <li><a href="#home" onClick={(e) => handleScrollOrNavigate(e, 'home')}>Home</a></li>
          <li><a href="#haldi" onClick={(e) => handleScrollOrNavigate(e, 'haldi')}>Haldi</a></li>
          <li><a href="#sangeeth" onClick={(e) => handleScrollOrNavigate(e, 'sangeeth')}>Sangeeth</a></li>
          <li><a href="#engagement" onClick={(e) => handleScrollOrNavigate(e, 'engagement')}>Engagement</a></li>
          <li><a href="#travel-details" onClick={(e) => handleScrollOrNavigate(e, 'travel-details')}>Travel</a></li>
          <li><a href="#wedding-location" onClick={(e) => handleScrollOrNavigate(e, 'wedding-location')}>Location</a></li>
          <li><a href="#local-accommodation" onClick={(e) => handleScrollOrNavigate(e, 'local-accommodation')}>Stay</a></li>
          <li><a href="#contact-info" onClick={(e) => handleScrollOrNavigate(e, 'contact-info')}>Contact</a></li>
          <li><Link to="/admin">Admin</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
