import '../Styles/Contact.css';
import '../Styles/Project.css';
import emailjs from 'emailjs-com';
import { useRef, useState } from 'react';
require('dotenv').config()

function ContactMobile() {

    const [resultMsg, setResultMsg] = useState();
    const resultMsgRef = useRef()

    //This function gets called when user submits the contact form
    const sendMail = (e) => {
        e.preventDefault()

        //Here I'm using emailjs to send the email with a custom email template and my serviceID & userID
        emailjs.sendForm(process.env.REACT_APP_EMAIL_SERVICE_ID, process.env.REACT_APP_EMAIL_TEMPLATE_ID, e.target, process.env.REACT_APP_EMAIL_USER_ID)
        .then(() => {
            //If email was sent successfully, set resultMsg to "successful"
            setResultMsg("Email has been sent!")
            //Also set the result msg to a green color
            resultMsgRef.current.style.color = "color: rgb(37, 219, 37)"
        }, () => {
            //If email wasn't sent successfully, set resultMsg to "Error"
            setResultMsg("There was an unknown error. Please try again later, or email me personally: philiphilding.business@gmail.com")
            //Also set the result msg to a green color
            resultMsgRef.current.style.color = "color: rgb(253, 48, 48)"
        });

        //Reset the form when email is sent
        e.target.reset()
    }

    return (
        <div className="contact-body">
            <h1 className="contact-text">Contact</h1>
            <div>
                <form className="contact-form" onSubmit={sendMail}>
                    <input className="contact-input" type="text" name="client_name" placeholder="Name"/>
                    <input className="contact-input" type="email" name="client_email" placeholder="Email"/>
                    <textarea className="contact-textarea" type="text" name="client_msg" placeholder="Message"/>
                    <input className="submit-btn" type="submit" value="submit" />
                </form>
                <p ref={resultMsgRef} className="contact-form-result-msg">{resultMsg}</p>
            </div>
        </div>
    );

}

export default ContactMobile;
