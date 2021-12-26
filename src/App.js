import React from "react";
import ManagerPage from "./components/Pages/ManagerPage.jsx";
import "./App.css";
import "./components/Pages/pages.css";

class App extends React.Component {
    render() {
        return (
            <div className="App">
                <ManagerPage />
            </div>
        );
    }
}

export default App;
