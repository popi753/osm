import './App.css';

import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from     "./components/Home";
import Ranking from './components/Ranking';
import YourRanking from './components/YourRanking';


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
