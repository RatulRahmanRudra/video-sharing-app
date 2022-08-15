import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {Header} from "./components";
import {Auth, Homepage, Player} from "./pages"
import './App.css';


function App() {
  return (
    <div className="App">
    {/* header <Header/> */}
    <Router>
    <Header/>
      <div className="page-container">
      <Routes>
          <Route path="/" element={<Homepage/>}/>
          <Route path="/auth" element={<Auth/>}/>
          <Route path="/:id" element={<Player/>}/>
      </Routes>
      </div>
    </Router>
    
    {/* suggested videos router view*/}


    </div>
  );
}

export default App;
