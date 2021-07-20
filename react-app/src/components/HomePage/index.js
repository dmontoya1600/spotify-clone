import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from "react-redux"

const HomePage = () => {
    const accessT = useSelector(state => state.access.access_token)

    return (
        <div className="homePage__container">

        </div>
    )
}

export default HomePage
