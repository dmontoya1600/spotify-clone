import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "./Navigation.css"
import NavBar from './NavBar';


const Navigation = () => {


    return (
        <div className="navigation__container">
            <NavBar />
        </div>
    )
}

export default Navigation
