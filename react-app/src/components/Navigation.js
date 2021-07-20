import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from "./NavBar/NavBar.js";

const Navigation = () => {


    return (
        <div className="navigation__container">
            <NavBar />
        </div>
    )
}

export default Navigation