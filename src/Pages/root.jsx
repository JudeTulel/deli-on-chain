import React from 'react';
import './root.css';
import womanImg from '../assets/woman.jpg';
import { NavLink } from 'react-router-dom';
const UserChoice = () => {
  return (
    <div className="user-choice">
      <h1>Welcome to Deli OnChain</h1>
      <h1>Choose Your Role</h1>
      <div className="button-container">
        <NavLink className="role-button" to={'/deliguy'}>Delivery Guy</NavLink>
        <NavLink className="role-button" to={'/seller'}>Store Owner</NavLink>
        <NavLink className="role-button" to={'/buyer'}>Buyer</NavLink>
      </div>
    </div>
  );
};

export default UserChoice;