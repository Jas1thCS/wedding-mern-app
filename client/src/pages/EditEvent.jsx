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
    alert('✨ Event details updated successfully!');
    navigate('/dashboard');
  };

  return (
    <div className={styles.editContainer}>
      <h2 className={styles.title}>✨ Edit Wedding Details</h2>

      <form className={styles.editForm} onSubmit={handleSubmit}>
        {/* Sangeeth & Haldi Section */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>
            <span className={styles.sectionIcon}>🎵</span>
            Sangeeth & Haldi Details
          </h3>
          <div className={styles.inputGroup}>
            <label className={styles.label}>
              📆 Sangeeth Date & Time
              <input
                type="datetime-local"
                name="sangeethDate"
                value={form.sangeethDate}
                onChange={handleChange}
                className={styles.input}
              />
            </label>
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label}>
              🏠 Haldi Venue
              <input
                type="text"
                name="haldiVenue"
                value={form.haldiVenue}
                onChange={handleChange}
                className={styles.input}
                placeholder="Enter Haldi venue name"
              />
            </label>
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label}>
              ⏰ Haldi Date & Time
              <input
                type="datetime-local"
                name="haldiDate"
                value={form.haldiDate}
                onChange={handleChange}
                className={styles.input}
              />
            </label>
          </div>
        </div>

        {/* Travel Details Section */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>
            <span className={styles.sectionIcon}>✈️</span>
            Travel Information
          </h3>
          <div className={styles.inputGroup}>
            <label className={styles.label}>
              📍 Destination
              <input
                type="text"
                name="travel.destination"
                value={form.travel.destination}
                onChange={handleChange}
                className={styles.input}
                placeholder="Enter wedding destination"
              />
            </label>
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label}>
              📅 Date & Time
              <input
                type="datetime-local"
                name="travel.dateTime"
                value={form.travel.dateTime}
                onChange={handleChange}
                className={styles.input}
              />
            </label>
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label}>
              ✈️ By Air
              <input
                type="text"
                name="travel.air"
                value={form.travel.air}
                onChange={handleChange}
                className={styles.input}
                placeholder="Enter nearest airport details"
              />
            </label>
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label}>
              🚂 By Train
              <input
                type="text"
                name="travel.train"
                value={form.travel.train}
                onChange={handleChange}
                className={styles.input}
                placeholder="Enter nearest train station details"
              />
            </label>
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label}>
              🚗 By Road
              <input
                type="text"
                name="travel.road"
                value={form.travel.road}
                onChange={handleChange}
                className={styles.input}
                placeholder="Enter road travel directions"
              />
            </label>
          </div>
        </div>

        {/* Wedding Venue Section */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>
            <span className={styles.sectionIcon}>💒</span>
            Wedding Venue
          </h3>
          <div className={styles.inputGroup}>
            <label className={styles.label}>
              🏰 Venue Name
              <input
                type="text"
                name="wedding.venue"
                value={form.wedding.venue}
                onChange={handleChange}
                className={styles.input}
                placeholder="Enter wedding venue name"
              />
            </label>
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label}>
              📍 Venue Address
              <input
                type="text"
                name="wedding.address"
                value={form.wedding.address}
                onChange={handleChange}
                className={styles.input}
                placeholder="Enter complete venue address"
              />
            </label>
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label}>
              🗺️ Google Maps Link
              <input
                type="url"
                name="wedding.mapLink"
                value={form.wedding.mapLink}
                onChange={handleChange}
                className={styles.input}
                placeholder="Enter Google Maps link"
              />
            </label>
          </div>
        </div>

        {/* Accommodation Section */}
        <div className={`${styles.section} ${styles.fullWidth}`}>
          <h3 className={styles.sectionTitle}>
            <span className={styles.sectionIcon}>🏨</span>
            Accommodation Details
          </h3>
          {form.accommodations.map((hotel, index) => (
            <div key={index} className={styles.hotelCard}>
              <h4 className={styles.hotelTitle}>
                <span>🏢</span> Hotel {index + 1}
              </h4>
              <div className={styles.inputGroup}>
                <label className={styles.label}>
                  Hotel Name
                  <input
                    type="text"
                    name={`accommodation.${index}.name`}
                    value={hotel.name}
                    onChange={handleChange}
                    className={styles.input}
                    placeholder="Enter hotel name"
                  />
                </label>
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.label}>
                  Address
                  <input
                    type="text"
                    name={`accommodation.${index}.address`}
                    value={hotel.address}
                    onChange={handleChange}
                    className={styles.input}
                    placeholder="Enter hotel address"
                  />
                </label>
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.label}>
                  Google Maps Link
                  <input
                    type="url"
                    name={`accommodation.${index}.map`}
                    value={hotel.map}
                    onChange={handleChange}
                    className={styles.input}
                    placeholder="Enter hotel's Google Maps link"
                  />
                </label>
              </div>
            </div>
          ))}
        </div>
      </form>

      {/* Sticky Footer Buttons */}
      <div className={styles.buttonsContainer}>
        <button
          onClick={() => navigate('/dashboard')}
          className={`${styles.button} ${styles.secondaryButton}`}
          type="button"
        >
          <span>⬅️</span> Back to Dashboard
        </button>
        <button
          onClick={handleSubmit}
          className={`${styles.button} ${styles.primaryButton}`}
          type="submit"
        >
          <span>💾</span> Save Changes
        </button>
      </div>
    </div>
  );
};

export default EditEvent;
