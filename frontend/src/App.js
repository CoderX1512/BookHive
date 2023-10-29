import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Registration from './Registration';
import RegistrationSuccess from './RegistrationSuccess'; // Import the RegistrationSuccess component
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Admin from './Admin';
import Cart from './Cart';
import BookDetails from './Bookdetails';
import Payment from './Payment';
import NotificationComponent from './NotificationComponent';
import PostNotification from './PostNotification';


function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/book/:bookId" element={<BookDetails />} />
          <Route path="/payment/:price" element={<Payment />} />
          <Route path="/NotificationComponent" element={<NotificationComponent/>}/>
          <Route path="/home" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/post" element={<PostNotification/>}/>
          <Route path="/registration" element={<Registration />} />
          <Route path="/registration-success" element={<RegistrationSuccess />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;