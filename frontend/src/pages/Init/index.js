import React from 'react'
import { Link } from 'react-router-dom'

import './styles.css'
import { FiEdit3, FiShield, FiTool } from 'react-icons/fi'

import logoImg from '../../assets/images/logo.svg'
import landingImg from '../../assets/images/landing.svg'

export default function Init() {

    return (
        <div id="page-landing">
            <div id="page-landing-content" className="container">
                <div className="logo-container">
                    <img src={logoImg} alt='Proffy'></img>
                    <h2>Sua forma de gerenciar Condomínios</h2>
                </div>

                <img src={landingImg} alt="landing" className="hero-image"/>

                <div className="buttons-container">
                    <Link to="/dweller" className='dweller'>
                        <FiEdit3 size={46} color="#c8a2c8"/>
                        Condôminos
                    </Link>
                    
                    <Link to="/maintenance" className='maintenance'>
                        <FiTool size={46} color="#c8a2c8"/>
                        Manutenção
                    </Link> 

                    <Link to="/security" className='security'>
                        <FiShield size={46} color="#c8a2c8"/>
                        Segurança
                    </Link>                     
                </div>
            </div>
        </div>
    )
}