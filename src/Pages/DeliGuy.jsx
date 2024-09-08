import './deliguy.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Box, Heading, VStack, Button } from "@chakra-ui/react";
import QRCode from "react-qr-code";
import { useNavigate } from 'react-router-dom';
// Header Component
function Header() {
  
  return (
    <header className="header">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li>Delivery</li>
        </ol>
      </nav>
      <div className="search-container">
        <input type="search" placeholder="Search orders..." />
      </div>
    </header>
  );
}


// Statistics Component
function Statistics() {
  const stats = [
    { title: 'Total Orders', value: '0', change: '+25%', progress: 25 },
    { title: 'Orders Picked Up', value: '0', change: '+15%', progress: 15 },
    { title: 'Orders Dropped Off', value: '0', change: '+20%', progress: 20 },
  ];

  return (
    <div className="statistics">
      {stats.map((stat, index) => (
        <Card key={index} stat={stat} />
      ))}
    </div>
  );
}

function Card({ stat }) {
  const { title, value, progress } = stat;

  return (
    <div className="card">
      <p className="card-title">{title}</p>
      <h3 className="card-value">{value}</h3>
      <div className="card-progress">
        <div className="card-progress-bar" style={{ width: `${progress}%` }}></div>
      </div>
    </div>
  );
}


// Card Component


// Tabs Component
function Tabs() {
  const [activeTab, setActiveTab] = useState('upcoming');

  return (
    <div>
      <div className="tabs">
        <button
          className={`tab-button ${activeTab === 'upcoming' ? 'active' : ''}`}
          onClick={() => setActiveTab('upcoming')}
        >
          Upcoming Orders
        </button>
        <button
          className={`tab-button ${activeTab === 'history' ? 'active' : ''}`}
          onClick={() => setActiveTab('history')}
        >
          Order History
        </button>
      </div>
      <div className="mt-2">
        {activeTab === 'upcoming' && <UpcomingOrders />}
      </div>
    </div>
  );
}


// UpcomingOrders Component


const BACKEND_VERIFIER_API_URL = "http://localhost:8000"; // Replace with your server URL

function UpcomingOrders() {
  const [orders] = useState([
    { address: '123 Main St, Anytown USA', status: 'Pick Up' },
    { address: '456 Oak Rd', status: 'Pick Up' },
    { address: '789 Elm St', status: 'Pending' },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [verificationQuery, setVerificationQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const handleStatusClick = async () => {
    // Check if the user is verified
    const isVerified = localStorage.getItem('isLogin');

    if (!isVerified) {
      // If not verified, show the QR code modal
      setShowModal(true);

      // Fetch the verification QR code data
      await fetchVerificationQRCode();
    } else {
      alert("User is already verified!");
    }
  };

  const fetchVerificationQRCode = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BACKEND_VERIFIER_API_URL}/api/signIn`);
      const data = response.data;
      setVerificationQuery(JSON.stringify(data));
    } catch (error) {
      console.error("Error fetching verification QR code:", error);
    } finally {
      setLoading(false);
    }
  };
  const navigate = useNavigate();
  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th>Address</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={index}>
              <td>{order.address}</td>
              <td>
                <button 
                  className={`status ${order.status === 'Pending' ? 'pending' : 'picked-up'}`}
                  onClick={handleStatusClick}
                >
                  {order.status}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* QR Code Modal */}
      {showModal && (
        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
          <VStack h='100vh' align='center' justify='center'>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <>
                <Heading>Scan to Verify</Heading>
                <Box h='300px' w='300px' bg='gray.200'>
                  <QRCode value={verificationQuery} />
                </Box>
                <Button onClick={() => {setShowModal(false)
                navigate('/Maps')
                 }
                                        
                }>Close</Button>
              </>
            )}
          </VStack>
        </Modal>
      )}
    </>
  );
}


// Main Component
function Deliguy() {
  return (
    <div className="container mx-auto p-4">
      <Header />
      <h1>Your stats</h1>
      <div className="mt-8">
        <Statistics />
      </div>
      <div className="mt-8">
        <Tabs />
      </div>
    </div>
  );
}

export default Deliguy;
