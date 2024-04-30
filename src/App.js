import './App.css';

import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from     "./Pages/Home";
import Ranking from './Pages/Ranking';
import YourRanking from './Pages/YourRanking';


function App() {
  
  return (
    <>
        <BrowserRouter>
              <Routes>

                 <Route path="/" element={<Home />} />
                 <Route path="/ranking" element={<Ranking />} />
                 <Route path="/yourRanking" element={<YourRanking />} />

              </Routes>  
        </BrowserRouter>
    
    </>
  );
}

export default App;
