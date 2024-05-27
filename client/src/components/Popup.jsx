import React, { useState } from 'react';
import './Popup.css'; // Import your CSS for styling
import axios from 'axios';

const Popup = ({ serverOTP, setshowPopup, formData, setError, setFormData }) => {
  const [userOtp, setUserOtp] = useState('');

  const handleChange = (e) => {
    setUserOtp(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userOtp === serverOTP) {
      console.log('OTP is equal');
      console.log(formData);
      try {
        const response = await axios.post('http://localhost:5000/api/signup', formData);
        console.log(response.data);
        setError('');
        setFormData({
          firstName: '',
          lastName: '',
          phNumber: '',
          email: '',
          password: '',
          confirmPassword: '',
        });
        window.location.href = '/sign-in';
      } catch (error) {
        console.error('Error signing up:', error);
        const errorMessage = error.response?.data || 'Error signing up. Please try again.';
        console.log(error.response?.data);
        setError(errorMessage);
      }
    } else {
      console.log('OTP is not equal');
    }
    setshowPopup(false); // Hide the popup after submission
  };

  const handleClosePopup = () => {
    setshowPopup(false); // Hide the popup when cancel is clicked
  };

return (
    <div className="PopupPage">
      <div className="popup">
        <div className="popup-inner">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="otp">One Time Password</label>
              <input
                type="text"
                id="otp"
                className="otp-input"
                value={userOtp}
                onChange={handleChange}
                placeholder="Enter your OTP"
                required
              />
            </div>
            <div className="buttons">
              <button type="submit" id="green-button">Submit</button>
              <button type="button" id="red-button" onClick={handleClosePopup}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};


export default Popup;
