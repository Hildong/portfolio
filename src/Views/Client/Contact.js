import '../../Styles/Client.css';
import '../../Styles/About.css';
import Navbar from '../../Components/navbar.js';
import MySection from '../../Components/mySection.js';

function About() {

  return (
    <div className="client-background">
      <MySection />
      <Navbar />
      <div className="content-body about-body">
    About
      </div>
    </div>
  );

}

export default About;
