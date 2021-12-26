import React from "react";
import Shoes from "./components/Shoes";
import "./App.css";

class App extends React.Component {
    render() {
        return (
            <div className="App">
                <Shoes />
            </div>
        );
    }
}

export default App;
