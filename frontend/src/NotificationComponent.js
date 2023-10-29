import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './NotificationComponent.css'

function NotificationComponent() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Fetch notifications from the Flask API
    axios.get('http://127.0.0.1:5000/api/notifications')
      .then((response) => {
        setNotifications(response.data);
      })
      .catch((error) => {
        console.error('Error fetching notifications:', error);
      });
  }, []);

  return (
    <div className="notification-container">
      <h2>Book Offers and Discounts</h2>
      <p>Total Notifications: {notifications.length}</p> {/* Add this line */}
      <ul className="notification-list">
        {notifications.map((notification) => (
          <li key={notification._id} className="notification-item"> {/* Updated key to use _id */}
            <strong>
              <p className="notification-text">
                <i className="fas fa-shopping-cart" style={{ marginRight: '10px' }}></i>
                {notification.category} has Up to {notification.discount_percent}% offer!
              </p>
              <p>added on {notification.date_added}</p>
            </strong>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NotificationComponent;
