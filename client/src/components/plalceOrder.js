import axios from 'axios';
import Razorpay from 'razorpay';

export const PlaceAnOrder = async (userId, cartData, totalSum) => {
  console.log(userId, cartData, totalSum);
  const total_Sum = totalSum

  // Initialize products variable
  let products;

  // Check if cartData is a string
  if (typeof cartData === 'string') {
    // Try to parse cartData as JSON
    try {
      products = JSON.parse(cartData);
      console.log('Parsed products:', products);
    } catch (error) {
      console.log('cartData is not a valid JSON string, treating as single product ID');
      products = [{ productId: cartData, quantity: 1 }]; // Create an array with a single product object
      console.log('Single product ID:', products);
    }
  } else {
    products = cartData;
  }

  // console.log('Parsed products:', products);


  try {
    // Create an order in your backend
    const orderResponse = await axios.post(
      'http://localhost:5000/api/orders/add',
      {
        userId: userId,
        products: products,
        totalSum: total_Sum,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const order = await orderResponse.data;

    const options = {
      key: "rzp_test_JlS3TmpTfh718s", // Enter the Key ID generated from the Dashboard
      amount: totalSum, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "Shyam Corp", // Your business name
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: order.id, // Pass the `id` obtained in the response of Step 1
      handler: async function (response) {
        console.log(response);

        try {
          const validateRes = await axios.post('http://localhost:5000/api/orders/verify', {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            userId: userId,
            products: products,
            totalSum: totalSum
          });

          if (validateRes.data.success) {
            window.location.href = '/orders';
            console.log(validateRes.data.success);
            return true;
          } else {

            console.log('Payment validation failed:', validateRes.data.message);
            console.log('Payment validation failed:', validateRes.data.message);
            console.log('Payment validation failed:', validateRes.data.message);
            return false;
          }
        } catch (error) {
          console.error('Error validating payment:', error);
          return false;
        }
      },
      prefill: {
        name: "Gaurav Kumar", // Your customer's name
        email: "gaurav.kumar@example.com",
        contact: "9000090000" // Provide the customer's phone number for better conversion rates
      },
      notes: {
        address: "Razorpay Corporate Office"
      },
      theme: {
        color: "#3399cc"
      }
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.on('payment.failed', function (response) {
      console.error('Payment failed:', response);
    });

    rzp1.open();
  } catch (error) {
    console.error('Error creating order or handling payment:', error);
    return false;
  }
};
