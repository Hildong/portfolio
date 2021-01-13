import '../../Styles/Client.css';
import '../../Styles/About.css';
import Navbar from '../../Components/navbar.js';
import MySection from '../../Components/mySection.js';

function About() {

  return (
    <div className="client-background">
        <div className="my-section-div">
          <MySection />
        </div>

      <div className="navbar-and-project-div">
      <Navbar />
        <div className="content-body about-body">
          <h1 className="about-header">About</h1>
          <div className="about-me-text">
            <h1>Fullstack developer with {new Date().getFullYear() - 2019}+ years experience.</h1>
            <p>
              I started programming in my first year of studying to become a Network Technican with no prior knowledge. A few weeks after writing my first HTML I started picking up CSS and JS aswell. Today I'm working as a freelance fullstack developer with knowledge of these technologies. 
            </p>
            <hr className="about-me-hr" />
            <div className="tech-stack">
              <ul className="left">
                <li>HTML, CSS</li>
                <li>JS (ES6+)</li>
                <li>Material UI</li>
                <li>ReactJS</li>
                <li>React Native</li>
              </ul>
              <ul className="right">
                <li>NodeJS (expressJS)</li>
                <li>MongoDB</li>
                <li>Firebase</li>
                <li>Git</li>
                <li>Photoshop</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

    
    </div>
  );

}

export default About;
