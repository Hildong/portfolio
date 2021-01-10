import './Styles/App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Projects from './Views/Client/Projects.js';
import About from './Views/Client/About.js';
import Login from './Views/Admin/Login.js';
import LoginTokenCheck from './Views/Admin/AdminRedirect.js';


function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path={["/", "/projects"]} exact component={Projects}/>
          <Route path="/about" exact component={About}/>
          <Route path="/login" exact component={Login}/>
          <Route path="/admin" exact component={LoginTokenCheck}/>
        </Switch>
      </div>
  </Router>
  );
}

export default App;
