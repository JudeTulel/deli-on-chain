import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import "./buyer.css";
import NyamChoma from "../assets/nyamaChoma.jpg";
import { OrderContext } from "../context/OrderContext"; // Import the OrderContext
import { ethers } from 'ethers';

export default function BuyerComponent() {
  const { setOrderDetails } = useContext(OrderContext); // Use the context

  const dishes = [
    {
      id: 1,
      image: NyamChoma,
      title: "Nyama Choma",
      description: "Grilled meat, typically beef or goat, served with ugali and kachumbari.",
      price: 12.99,
    },
    {
      id: 2,
      image: "/ugali.jpg",
      title: "Ugali",
      description: "A staple cornmeal dish, often served with stew or greens.",
      price: 3.99,
    },
    {
      id: 3,
      image: "/kuku-pika.jpg",
      title: "Kuku Pika",
      description: "Spicy grilled or roasted chicken, served with rice and vegetables.",
      price: 10.99,
    },
    {
      id: 4,
      image: "/irio.jpg",
      title: "Irio",
      description: "A mashed vegetable dish made with potatoes, peas, and corn.",
      price: 5.99,
    },
    {
      id: 5,
      image: "/githeri.jpg",
      title: "Githeri",
      description: "A stew made with boiled maize and beans, often seasoned with onions and tomatoes.",
      price: 7.99,
    },
    {
      id: 6,
      image: "/mukimo.jpg",
      title: "Mukimo",
      description: "A mashed potato dish with green peas, corn, and sometimes spinach.",
      price: 6.99,
    },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setLocalCart] = useState([]);
  const [total, setLocalTotal] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
  });

  const filteredDishes = dishes.filter((dish) =>
    dish.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddToCart = (dish) => {
    setLocalCart((prevCart) => {
      const updatedCart = [...prevCart, dish];
      return updatedCart;
    });
  };

  const handleCheckout = async () => {
    if (window.ethereum) {
     
        const total = cart.reduce((acc, dish) => acc + dish.price, 0);
        setLocalTotal(total);
        setModalOpen(true);
      
    } else {
      alert("MetaMask is not installed. Please install MetaMask to proceed.");
    }
  };

  const handleRemoveFromCart = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setLocalCart(updatedCart);
  };

  const handleConfirmation = () => {
    setOrderDetails(cart, total, location);
    setModalOpen(false);
  };

  const handleSetDeliveryLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting location: ", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="header">
        <div className="container">
          <h1 className="title">Kenyan Cuisine</h1>
          <div className="relative">
            <input
              type="text"
              placeholder="Search dishes..."
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </header>

      <main className="main">
        <div className="grid-container">
          {filteredDishes.map((dish) => (
            <div key={dish.id} className="dish-card">
              <img src={dish.image} alt={dish.title} className="dish-image" />
              <div className="dish-details">
                <h3 className="dish-title">{dish.title}</h3>
                <p className="dish-description">{dish.description}</p>
                <div className="dish-footer">
                  <span className="dish-price">${dish.price.toFixed(2)}</span>
                  <button
                    size="sm"
                    onClick={() => handleAddToCart(dish)}
                    className="rounded-md"
                  >
                    Order
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="footer">
        <div className="container">
          <Link href="#" className="footer-link" prefetch={false}>
            View Full Menu
          </Link>
        </div>
      </footer>

      {cart.length > 0 && (
        <div className="cart">
          <div className="container cart-content">
            <div>
              <h3 className="cart-title">Your Cart</h3>
              <ul className="cart-list">
                {cart.map((dish, index) => (
                  <li key={index} className="cart-item">
                    <span style={{ color: "black" }}>{dish.title}</span>
                    <div className="cart-item-actions">
                      <span style={{ color: "green", fontWeight: "bold" }}>
                        ${dish.price.toFixed(2)}
                      </span>
                      <button
                        variant="danger"
                        size="sm"
                        onClick={() => handleRemoveFromCart(index)}
                        className="rounded-md"
                      >
                        Remove
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <button
                size="lg"
                className="rounded-md"
                onClick={handleCheckout}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}

      {modalOpen && (
        <Modal
          total={total}
          onClose={handleCloseModal}
          onSetLocation={handleSetDeliveryLocation}
          onConfirm={handleConfirmation}
        />
      )}
    </div>
  );
}

const Modal = ({ total, onClose, onSetLocation, onConfirm }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2 className="modal-title">Order Summary</h2>
        <p className="modal-text">Total: ${total.toFixed(2)}</p>
        <button size="sm" onClick={onSetLocation} className="rounded-md">
          Set Location
        </button>
        <button size="sm" onClick={onClose} className="rounded-md">
          Close
        </button>
        <button size="sm" onClick={onConfirm} className="rounded-md">
          Confirm Order
        </button>
      </div>
    </div>
  );
};
