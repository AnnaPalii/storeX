import React from 'react';
// import { Button } from '../Button/Button';
import './Hero.css';
import { Link } from "react-router-dom";

function HeroSection() {
return (
    <div className='hero-container'>
    <video src='/videos/video-1.mp4' autoPlay loop muted />
    <h2>Have space for happy moments</h2>
    <div className='hero-btns'>
        {/* <Button
        className='sign-up-btn'
        buttonStyle='btn-secondary'
        >Sign Up</Button> */}
    <Link to='/signup' className='btn-mobile'>
    <button className="btn-secondary sign-up-button">
    Sign Up</button>
    </Link>

        {/* <Button
        className='btns'
        buttonStyle='btn--primary'
        buttonSize='btn--medium'
        >Start Storing</Button> */}

    </div>
    </div>
)};


export default HeroSection;