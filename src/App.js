import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { setConfiguration } from "react-grid-system";

import Generate from './pages/Generate';
import Check from "./pages/Check";
import Home from './pages/Home';

setConfiguration({ defaultScreenClass: "sm", gridColumns: 20 });

function App() {
  useEffect(() => {
    const firebaseConfig = {
      apiKey: "AIzaSyD76xdwGm1ZDW1-gHZcenPBEUDCw8hFbqU",
      authDomain: "triggerwarning-7e2ca.firebaseapp.com",
      projectId: "triggerwarning-7e2ca",
      storageBucket: "triggerwarning-7e2ca.appspot.com",
      messagingSenderId: "779195956337",
      appId: "1:779195956337:web:ba97002b7c5b20ed86efd0",
      measurementId: "G-4D3YGKGT9W",
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
  }, []);

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/check">
            <Check />
          </Route>
          <Route path="/generate">
            <Generate />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
