import React, { useState } from 'react';
import './Sidebar.css';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';

const Sidebar = () => {

  
  return (
    <div className="sidebar">
        <ul>
        <a href='/Home'><li className='list-item'> <HomeIcon className='icon'/>HOME</li></a>
       </ul>
       <div className='list-item'>
        Registrations
        </div>
       <ul>
       <a href="/Places">
        <li className='list-item'>Places</li></a>
        
       </ul>
       <div className='list-item'>
       View
       </div>
       <ul>
       <li className='list-item'><a href="/PlaceView">Registered Places</a></li>
       <a href="/HotelView"><li className='list-item'>Registered Hotels</li></a>
       <a href="/RestraView"><li className='list-item'>Registered Restaurant</li></a>
      </ul>
      
    </div>
  );
};

export default Sidebar;