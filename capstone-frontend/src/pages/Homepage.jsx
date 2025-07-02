import React from "react";
import "./Home.css"
import { Link } from "react-router-dom";


export default function Homepage () {

    return (
        <div>
            <div className="home">
                <h1>Zero Delay. Pure Focus.</h1>               
                <div className="wrapper-home">
                    <h2><b>Tasks shouldn’t wait. Neither should you</b></h2>
                    <h3>Capture your to-dos the moment they hit. No clutter. No delays. No distractions. Just open, type, done — before the thought slips away. <Link to="/register"><b>Register</b></Link> now. It’s free and takes just seconds.</h3>

                </div>
            </div>
        </div>
    )
}