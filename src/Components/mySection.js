import '../Styles/MySection.css';
import pictureOfme from '../pictures/me.png';
import linkedInPicture from '../pictures/linkedin.png';
import upworkPicture from '../pictures/upwork.png';
import githubPicture from '../pictures/github.png';

function MySection() {
  return (
    <div className="my-section">
        <div className="my-social-stuff">
            <img alt="upwork logo" src={upworkPicture} className="upwork link-img"/>
            <img alt="linkedin logo" src={linkedInPicture} className="linkedin link-img"/>
            <img alt="github logo" src={githubPicture} className="github link-img"/>
        </div>
        <div className="short-about-me">
            <img alt="Philip Hilding" src={pictureOfme} className="picture-of-me"/>
            <p className="my-name">Philip Hilding</p>
            <p className="profession">Fullstack developer with {new Date().getFullYear() - 2019}+ years experience with the MERN stack. Read more <span onClick={() => window.location.href = `${process.env.REACT_APP_URL}/about`}>here</span>.</p>
        </div>
    </div>
  );
}

export default MySection;
