import '../../Styles/Client.css';
import '../../Styles/About.css';
import Navbar from '../../Components/navbar.js';
import MySection from '../../Components/mySection.js';

function Contact() {

  return (
    <div className="client-background">
        <div className="my-section-div">
          <MySection />
        </div>

        <div className="navbar-and-project-div">
          <Navbar />
          <div className="content-body about-body">
            About
          </div>
        </div>
    </div>
  );

}

export default Contact;
