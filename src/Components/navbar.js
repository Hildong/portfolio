import React, {useEffect, useRef} from 'react';
import ContactMobile from '../Components/contactMobile.js';
import '../Styles/Navbar.css';

const URL = "http://192.168.0.36:3000";

function Navbar() {

    //Initializing variables with useRef which will be used to change styling depending on the page the user is visiting
    const contact = useRef()
    const projects = useRef()
    const about = useRef()

    //Initializing a variable with useRef for the contact form window
    const contactForm = useRef()

    //Run when navbar is loaded
    useEffect(() => {
        
        //See what page the user is visiting by splitting the URL and getting the last element, which is the page that the user is on
        const page = window.location.href.split("/")[3];
        
        //Using an if statement to determine which a tag to style 
        if(page === "contact") {
            //Style contact a tag
            contact.current.style.backgroundColor = "rgb(210, 210, 210)"
            contact.current.style.borderColor = "rgb(0, 208, 0)" 
        } else if(page === "projects" || page === "") {
            //Style projects a tag
            projects.current.style.backgroundColor = "rgb(210, 210, 210)"
            projects.current.style.borderColor = "rgb(0, 208, 0)" 
        } else if(page === "about") {
            //Style about a tag
            about.current.style.backgroundColor = "rgb(210, 210, 210)"
            about.current.style.borderColor = "rgb(0, 208, 0)" 
        }


        //Hide contact form window by default
        contactForm.current.style.display = "none";

    }, [])
    
    
    //Function to set contactForms display to block
    const displayContactForm = () => {
        contactForm.current.style.display = "block";
    }

    //Function to set contactForms display to none
    const hideContactForm = () => {
        contactForm.current.style.display = "none"
    }

    return (
        <div className="navbar">
            <ul className="navbar-ul">
                <p className="navbar-link" ref={contact} onClick={() => displayContactForm()}>Contact</p>
                <a className="navbar-link" ref={projects} href={`${URL}/projects`}>Projects</a>
                <a className="navbar-link" ref={about} href={`${URL}/about`}>About</a>
            </ul>
            <div ref={contactForm} className="contact-form-in-nav">
                <button className="close-contact-form" onClick={() => hideContactForm()}>x</button>
                <ContactMobile />
            </div>
        </div>
    );
}

export default Navbar;
