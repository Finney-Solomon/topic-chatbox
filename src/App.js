import "./App.css";
import { Homepage } from "./Pages/Homepage";
import { WelcomePage } from "./Pages/WelcomePage";
import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
 
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/homepage" element={<Homepage />} />
          <Route path="/" element={<WelcomePage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
