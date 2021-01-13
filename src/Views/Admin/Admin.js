import '../../Styles/Admin.css';
import { firebaseApp } from '../../firebase/firebase.js';
import firebase from 'firebase'
import { useEffect, useRef, useState } from 'react';


function Admin() {

    //Instantiate a firebase firestore reference and firebase realtime database with firebaseApp reference
    const storageRef = firebaseApp.storage().ref();
    const databaseRef = firebaseApp.database();

    //Create two state variables to save info about the file and save project info
    const [file, setFile] = useState()
    const [projectObj, setProjectObj] = useState({
        projectName: "",
        projectTags: "",
        projectID: "",
        projectDescription: "",
        projectURL: "",
        projectGithubURL: ""
    })

    //Create a state varaible for saving info about each projects
    const [projectsObj, setProjectsObj] = useState([])

    //Create a state variable for checking if the data has been retrieved or not
    const [dataHasBeenRetrieved, setDataHasBeenRetrieved] = useState(false);

    //Create a state variable object with data for which project should be deleted
    const [projectToDeleteObj, setProjectToDeleteObj] = useState({
        projectID: "",
        projectImageName: ""
    })

    //Create refs for displaying and hiding elements
    const addProjectRef = useRef();
    const deleteProjectRef = useRef();

    const loadingAnimationRef = useRef();
    const projectLoadingAnimationRef = useRef()
    const deleteProjectLoadingAnimationRef = useRef();

    //This react hook gets called once when the page is loaded
    useEffect(() => {
        //Hide 'Add project div' and 'Delete project div' by default on page load
        addProjectRef.current.style.display = "none";
        deleteProjectRef.current.style.display = "none";

        //Hide loading animation by default on page load
        loadingAnimationRef.current.style.display = "none";
        deleteProjectLoadingAnimationRef.current.style.display = "none";


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
                            projectImageName: snapshotData.val().projectImageName
                        }])
                    })
                }
            })
            if(projectLoadingAnimationRef !== null) {
                projectLoadingAnimationRef.current.style.display = "none";
            }
            setDataHasBeenRetrieved(true);
        }
        
        readData()
    }, [databaseRef])


    //Create a asyncronus function that gets called when admin uploads project
    const uploadProject = async () => {
        //Check to make sure none of the inputs are empty
        if(projectObj.projectName !== "" && projectObj.projectTags !== "" && projectObj.projectDescription !== "" && projectObj.projectID !== "" && file.name !== "") {
            //Display animation until file upload and database writing is finished
            loadingAnimationRef.current.style.display = "block";

            //Store file data with the child function from storageRef and then upload to firestore
            const fileRef = storageRef.child(file.name);
            await fileRef.put(file)

            //When the image is done uploading, download the URL to save it into the JSON object with all other project info
            await storageRef.child(file.name).getDownloadURL()
            .then(imageUrl => {
                //Save project info, upload date AND image url in a json object
                databaseRef.ref("projects/" + projectObj.projectID).set({
                    projectName: projectObj.projectName,
                    projectTags: projectObj.projectTags,
                    projectID: projectObj.projectID,
                    projectDescription: projectObj.projectDescription,
                    projectImageURL: imageUrl,
                    projectImageName: file.name,
                    projectURL: projectObj.projectURL,
                    projectGithubURL: projectsObj.projectGithubURL,
                    timestamp: firebase.firestore.Timestamp.fromDate(new Date())
                })
            })

            //Stop displaying the animation, because file upload and database writing is finished
            loadingAnimationRef.current.style.display = "none";
            //Finally, reload the page
            window.location.href = `${URL}admin`
        } else {
            alert("Some inputs are empty")
        }
    }

    //This function clears the admins token and redirects them to the login page
    const logout = () => {
        //Clear cookie holding token
        document.cookie = `token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        //Redirect to url below
        window.location.href = process.env.REACT_APP_URL +"/login"
    }


    //Delete project info from firebase realtime DB and image from firestore
    const deleteProject = async (projectID, imageName) => {

        //Start loading animation for project deletion
        deleteProjectLoadingAnimationRef.current.style.display = "block";

        //Remove data from Firebase Realtime DB
        await databaseRef.ref("projects/" + projectID).remove();

        //After data is removed from realtime DB, delete image from firestore
        await storageRef.child(imageName).delete();

        //When both are deleted, stop animation and reload site
        deleteProjectLoadingAnimationRef.current.style.display = "none";
        window.location.href = `${process.env.REACT_APP_URL}/admin`;
    } 

    //This function displayed the 'Add project div'
    const displayAddProjectDiv = () => {
        addProjectRef.current.style.display = "block";
    }

    //This function hides the 'Add project div'
    const hideAddProjectDiv = () => {
        addProjectRef.current.style.display = "none";
    }

    //This function displayed the 'Delete project div'
    const displayDeleteProjectDiv = (projectID, projectImageName) => {
        deleteProjectRef.current.style.display = "block";
        //Set which project should be deleted by saving the data to a state variable
        setProjectToDeleteObj({ projectID: projectID, projectImageName: projectImageName });
    }

    //This function hides the 'Delete project div'
    const hideDeleteProjectDiv = () => {
        deleteProjectRef.current.style.display = "none";
        //Delete the data which should have been deleted from the state
        setProjectToDeleteObj({ projectID: "", projectImageName: "" });
    }

    return (
        <div>
            <div className="admin-navbar">
                <h1>Admin Panel</h1>
                <button className="logout-btn" onClick={() => logout()}>Logout</button>
            </div>
            <div className="admin-page">

                <h1>Project showcase</h1>
                <button className="add-project-btn" onClick={() => displayAddProjectDiv()}>Add Project</button>

                <div className="delete-project-div" ref={deleteProjectRef}>
                    <span onClick={() => hideDeleteProjectDiv()} className="close-add-project-div">X</span>
                    <h1 className="delete-project-header">Are you sure you want to delete?</h1>
                    <button className="delete-project-btn" onClick={() => deleteProject(projectToDeleteObj.projectID, projectToDeleteObj.projectImageName)}>Yes, delete!</button>
                    <div ref={deleteProjectLoadingAnimationRef} className="loader delete-project-loader"></div>
                </div>

                <div ref={addProjectRef} className="add-project-div">
                    <span onClick={() => hideAddProjectDiv()} className="close-add-project-div">X</span>
                    <h1>Add Project</h1>

                    <br />
                    <br />

                    <input required type="file" className="image-input" onChange={e => setFile(e.target.files[0])}/>
                    <input required placeholder="Project Name" onChange={e => setProjectObj(prevState => ({...prevState, projectName: e.target.value}))}/>
                    <input required placeholder="Project Tags" onChange={e => setProjectObj(prevState => ({...prevState, projectTags: e.target.value}))}/>
                    <input required placeholder="Project ID" onChange={e => setProjectObj(prevState => ({...prevState, projectID: e.target.value}))}/>
                    <input required placeholder="Project URL" onChange={e => setProjectObj(prevState => ({...prevState, projectURL: e.target.value}))}/>
                    <input required placeholder="Project Github URL" onChange={e => setProjectObj(prevState => ({...prevState, projectGithubURL: e.target.value}))}/>
                    <textarea required placeholder="Project Description" onChange={e => setProjectObj(prevState => ({...prevState, projectDescription: e.target.value}))}/>

                    <button className="upload-project" onClick={() => uploadProject()}>Upload Project</button>
                    <div ref={loadingAnimationRef} className="loader"></div>
                </div>

                <div className="projects-showcase">
                    {
                        dataHasBeenRetrieved ? (
                            projectsObj.map(value => {
                                //Create an array of the tags from the database string with split method
                                let arrayOfTags = value.projectTags.split('.')
                                return <div className="project-div" key={value.projectName}>
                                            <img alt="project portrait" src={value.projectImageUrl}/>
                                            <button className="delete-btn" onClick={() => displayDeleteProjectDiv(value.projectID, value.projectImageName)}>DELETE</button>
                                            <div>
                                                <p className="project-name">{value.projectName}</p>
                                                {
                                                    //Use the map method to loop through elements in array and return them
                                                    arrayOfTags.map(tag => {
                                                        return <span className="project-tags">
                                                                    { tag }
                                                                </span>
                                                    })
                                                }
                                                <i className="project-description">{value.projectDescription}</i>
                                            </div>
                                        </div>
                            })
                        ) : (
                            <div className="loader-div-for-project-load">
                                <div ref={projectLoadingAnimationRef} className="loader"></div>
                            </div>
                        )
                    }
                </div>

            </div>
        </div>
    );

}

export default Admin;