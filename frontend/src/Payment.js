import React, { useEffect, useRef } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { styled } from '@mui/system';

const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
}));

const StyledButton = styled(Button)(({ theme }) => ({
  fontSize: '24px', // Increase the font size
  backgroundColor: '#2196f3', // Stylish background color
  color: 'white', // Text color
  padding: '16px 32px', // Add padding to increase button size
  '&:hover': {
    backgroundColor: '#1976d2', // Change background color on hover
  },
}));

const Payment = () => {
  const rzpInstanceRef = useRef(null);
  const priceObject = useParams();
  let price = Number(priceObject['price']) * 100;

  const handlePayment = () => {
    if (rzpInstanceRef.current) {
      rzpInstanceRef.current.open();
    } else {
      alert('Razorpay is not initialized.');
    }
  };

  useEffect(() => {
    const initializeRazorpay = () => {
      if (!window.Razorpay) {
        return;
      }

      rzpInstanceRef.current = new window.Razorpay({
        key: 'rzp_test_UJjewN0avbPauX',
        amount: price,
        currency: 'USD',
        name: 'RazorPay Payment Gateway',
        description: 'Purchase Description',
        prefill: {
          name: '',
          email: '',
          contact: '',
        },
        notes: {
          shopping_order_id: '21',
        },
        handler: (response) => {
          const paymentData = {
            payment_id: response.razorpay_payment_id,
            amount: price,
          };

          axios
            .post('http://127.0.0.1:5500/verify-payment', paymentData)
            .then((verificationResponse) => {
              if (verificationResponse.data.success) {
                alert('Payment successful');
              } else {
                alert('Payment verification failed');
              }
            })
            .catch((error) => {
              console.error('Error verifying payment:', error);
              alert('Payment verification failed');
            });
        },
      });
    };

    const loadRazorpayScript = async () => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      script.onload = initializeRazorpay;
      document.body.appendChild(script);
    };

    loadRazorpayScript();
  }, [price]);

  return (
    <Container>
      <StyledBox>
        <StyledButton id="paymentButton" onClick={handlePayment}>
          Pay Now
        </StyledButton>
      </StyledBox>
    </Container>
  );
};

export default Payment;
