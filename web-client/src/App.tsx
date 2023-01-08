import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Watch from "./pages/watch";
import Browse from "./pages/browse";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/watch" element={<Watch />} />
        <Route path="/browse" element={<Browse />} />
      </Routes>
    </Router>
  );
}

export default App;
