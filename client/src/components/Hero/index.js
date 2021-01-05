import React from 'react';
import { Button } from '../Button/Button';
import './Hero.css';

function HeroSection() {
return (
    <div className='hero-container'>
    <video src='/videos/video-1.mp4' autoPlay loop muted />
    <h5>Have space for happy moments</h5>
    <div className='hero-btns'>
        <Button
        className='btns'
        buttonStyle='btn--outline'
        buttonSize='btn--large'
        onClick={console.log('hey')}
        >Login</Button>
        <Button
        className='btns'
        buttonStyle='btn--primary'
        buttonSize='btn--large'
        onClick={console.log('hey')}
        >SignUp</Button>
    </div>
    </div>
);
}

export default HeroSection;