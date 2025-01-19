import MainPage from './containers/MainPage';
import { BrowserRouter, Routes, Route } from "react-router";
import GamePage from './containers/GamePage';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/game" element={<GamePage />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
