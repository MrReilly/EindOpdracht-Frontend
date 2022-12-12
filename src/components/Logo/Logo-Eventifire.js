import './Logo-Eventifire.css'
import React from "react"
import logoFlame from "../../assets/logo/white flame icon.png";
import eventifire from "../../assets/logo/Eventifire.png";

export default function LogoEventifire() {

    return (

        <div className="title-logo-container">
            <img className="logo" src={logoFlame} alt="logo"/>
            <img className="eventifire-img" src={eventifire} alt="title Eventifire"/>
        </div>

    )
}