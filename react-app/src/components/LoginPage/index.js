import React, { useState} from 'react';
import "LoginPage.css";

const LoginPage = () => {

    return (
        <div className="loginPage__container">
            <div className="loginPage__form">
                <div className="logo">Audify</div>
                <div className="title">To continue, log in to Audify.</div>
                <button className="demo">Continue with Demo</button>
                <div className="or">OR</div>
                <div className="loginForm">
                    <form>
                        <label htmlFor="credential">Username or Email</label>
                        <input type="text" name="credential"></input>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default HomePage
