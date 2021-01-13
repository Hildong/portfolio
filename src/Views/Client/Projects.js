import '../../Styles/Client.css';
import '../../Styles/Project.css';
import { firebaseApp } from '../../firebase/firebase.js';
import firebase from 'firebase'
import { useEffect, useRef, useState } from 'react';
import Navbar from '../../Components/navbar.js';
import MySection from '../../Components/mySection.js';

function Projects() {

    //Instantiate a firebase realtime database with firebaseApp reference
    const databaseRef = firebaseApp.database();

    //Create a ref for show and hiding loading animation
    const loadingAnimationRef = useRef();

    //Create a state varaible for saving meta data about each projects
    const [projectsObj, setProjectsObj] = useState([])

  
    //This react hook gets called once when the page is loaded
    useEffect(() => {

        //Read project data and image from the database
        const readData = async () => {
          await databaseRef.ref("projects").orderByChild("timestamp/seconds").once("value", snapshot => {
              //Check if there is any data before proceeding
              console.log(snapshot.val())
              if(snapshot.exists()) {
                  //Loop through all the snapshot objects
                  snapshot.forEach(snapshotData => {
                      console.log(snapshotData.val())
                      //Set the projectsObj state with data from the firebase realtime DB
                      setProjectsObj(prevState => [...prevState, {
                          projectName: snapshotData.val().projectName,
                          projectTags: snapshotData.val().projectTags,
                          projectDescription: snapshotData.val().projectDescription,
                          projectImageUrl: snapshotData.val().projectImageURL,
                          projectID: snapshotData.val().projectID,
                          projectImageName: snapshotData.val().projectImageName,
                          projectVisitUrl: snapshotData.val().projectURL,
                          projectGithubUrl: snapshotData.val().projectGithubURL
                      }])
                  })
              }
          })
          if(loadingAnimationRef !== null) {
            loadingAnimationRef.current.style.display = "none";
          }
      }
      
      readData()

    }, [databaseRef])

    return (
      <div className="client-background">

        <div className="my-section-div">
          <MySection />
        </div>

        <div className="navbar-and-project-div">
          <Navbar />
          <div className="content-body projects-body">
            <h1 className="project-header">Projects</h1>
            <div ref={loadingAnimationRef} className="project-client-loader"></div>
            {
                projectsObj.map(value => {
                    //Create an array of the tags from the database string with split method
                    let arrayOfTags = value.projectTags.split('.')
                    return <div className="project-div-client" key={value.projectName}>
                              <img alt="project portrait" src={value.projectImageUrl}/>
                              <div className="visit-website-btn">
                                <button onClick={() => window.open(value.projectVisitUrl, "_blank")}>Visit</button>
                                <button onClick={() => window.open(value.projectGithubUrl, "_blank")}>Github</button>
                              </div>
                              <div className="project-info">
                                <p className="project-name-client">{value.projectName}</p>
                                  {
                                    //Use the map method to loop through elements in array and return them
                                      arrayOfTags.map(tag => {
                                        return <span className="project-tags-client">
                                                  { tag }
                                                </span>
                                      })
                                  }
                                <i className="project-description-client">{value.projectDescription}</i>
                              </div>
                            </div>
                })
              }
          </div>
        </div>

      </div>
    );

}

export default Projects;
