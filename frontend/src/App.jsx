import { Routes, Route, BrowserRouter } from 'react-router-dom';
import FirstPage from './home';
import Read from './read';
import Write from './write';
import List from './list';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 웹 서비스 소개 페이지 */}
        <Route path="/" element={<FirstPage />} />
        <Route path="/list" element={<List />} />
        <Route path="/read" element={<Read />} />
        <Route path="/write" element={<Write />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
