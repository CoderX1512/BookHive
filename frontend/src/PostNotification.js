import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PostNotification.css'

function PostNotification() {
  const [category, setCategory] = useState('');
  const [discountPercent, setDiscountPercent] = useState('');
  const [bookList, setBookList] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    // Fetch the list of books from your Flask API when the component mounts
    axios.get('http://127.0.0.1:5000/api/books') // Update the URL as needed
      .then((response) => {
        setBookList(response.data);
      })
      .catch((error) => {
        console.error('Error fetching books:', error);
      });
  }, []);

  const handleCategoryChange = (e) => {
    const inputCategory = e.target.value;
    setCategory(inputCategory);

    // Generate suggestions based on the input
    const filteredSuggestions = bookList.filter(book =>
      book.toLowerCase().includes(inputCategory.toLowerCase())
    );

    setSuggestions(filteredSuggestions);
  };

  const handleBookSelect = (selectedBook) => {
    // Update the input field with the selected book
    setCategory(selectedBook);
    // Clear the suggestions
    setSuggestions([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newNotification = {
      category: category,
      discount_percent: discountPercent,
      role: 'admin', // Replace 'admin' with the actual user role
    };

    axios
      .post('http://127.0.0.1:5000/api/notifications', newNotification)
      .then((response) => {
        console.log('Notification posted:', response.data);
        setCategory('');
        setDiscountPercent('');
      })
      .catch((error) => {
        console.error('Error posting notification:', error);
      });
  }


  const handleDiscountPercentChange = (e) => {
    setDiscountPercent(e.target.value);
  };

  return (
   <div className="form-container">
      <h2>Post a Notification</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Title: </label>
          <input
            type="text"
            value={category}
            onChange={handleCategoryChange}
          />
          <ul className="suggestions">
            {suggestions.map((book, index) => (
              <li key={index} onClick={() => handleBookSelect(book)}>
                {book}
              </li>
            ))}
          </ul>
        </div>
        <div className="input-container">
          <label>Discount Percent:</label>
          <input
            type="text"
            value={discountPercent}
            onChange={handleDiscountPercentChange}
          />
        </div>
        <button type="submit">Post Notification</button>
      </form>
    </div>
  );
}

export default PostNotification;
