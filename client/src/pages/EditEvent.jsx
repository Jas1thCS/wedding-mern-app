import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './EditEvent.module.css';

const EditEvent = ({ eventData, setEventData }) => {
  const [form, setForm] = useState(eventData);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("travel.")) {
      const key = name.split(".")[1];
      setForm(prev => ({
        ...prev,
        travel: { ...prev.travel, [key]: value }
      }));
    } else if (name.startsWith("wedding.")) {
      const key = name.split(".")[1];
      setForm(prev => ({
        ...prev,
        wedding: { ...prev.wedding, [key]: value }
      }));
    } else if (name.startsWith("accommodation")) {
      const [_, index, field] = name.split(".");
      const newAccommodations = [...form.accommodations];
      newAccommodations[index][field] = value;
      setForm(prev => ({
        ...prev,
        accommodations: newAccommodations
      }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEventData(form);
    alert('✅ Event details updated!');
    navigate('/dashboard');
  };

  return (
    <div className={styles.editContainer}>
      <h2 className={styles.title}>Edit Event Details</h2>
      <form className={styles.editForm} onSubmit={handleSubmit}>

        <label>
          📆 Sangeeth Date & Time:
          <input type="datetime-local" name="sangeethDate" value={form.sangeethDate} onChange={handleChange} />
        </label>

        <label>
          🏠 Haldi Venue:
          <input type="text" name="haldiVenue" value={form.haldiVenue} onChange={handleChange} />
        </label>

        <label>
          ⏰ Haldi Time:
          <input type="text" name="haldiTime" value={form.haldiTime} onChange={handleChange} />
        </label>

        <h3>✈️ Travel Details</h3>
        <label>
          Destination:
          <input type="text" name="travel.destination" value={form.travel.destination} onChange={handleChange} />
        </label>
        <label>
          Date & Time:
          <input type="text" name="travel.dateTime" value={form.travel.dateTime} onChange={handleChange} />
        </label>
        <label>
          By Air:
          <input type="text" name="travel.air" value={form.travel.air} onChange={handleChange} />
        </label>
        <label>
          By Train:
          <input type="text" name="travel.train" value={form.travel.train} onChange={handleChange} />
        </label>
        <label>
          By Road:
          <input type="text" name="travel.road" value={form.travel.road} onChange={handleChange} />
        </label>

        <h3>📍 Wedding Location</h3>
        <label>
          Venue Name:
          <input type="text" name="wedding.venue" value={form.wedding.venue} onChange={handleChange} />
        </label>
        <label>
          Venue Address:
          <input type="text" name="wedding.address" value={form.wedding.address} onChange={handleChange} />
        </label>
        <label>
          Google Maps Link:
          <input type="url" name="wedding.mapLink" value={form.wedding.mapLink} onChange={handleChange} />
        </label>

        <h3>🏨 Accommodation Details</h3>
        {form.accommodations.map((hotel, index) => (
          <div key={index} className={styles.hotelCard}>
            <label>
              Hotel Name:
              <input
                type="text"
                name={`accommodation.${index}.name`}
                value={hotel.name}
                onChange={handleChange}
              />
            </label>
            <label>
              Address:
              <input
                type="text"
                name={`accommodation.${index}.address`}
                value={hotel.address}
                onChange={handleChange}
              />
            </label>
            <label>
              Google Maps Link:
              <input
                type="url"
                name={`accommodation.${index}.map`}
                value={hotel.map}
                onChange={handleChange}
              />
            </label>
          </div>
        ))}

        <button type="submit" className={styles.saveButton}>💾 Save Changes</button>
      </form>
    </div>
  );
};

export default EditEvent;
