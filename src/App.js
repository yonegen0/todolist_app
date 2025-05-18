import { Routes, Route } from 'react-router-dom';
import Calendar from './components/todo_list';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Calendar />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;