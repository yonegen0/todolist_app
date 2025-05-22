import { Routes, Route } from 'react-router-dom';
import TodoApp from './TodoApp';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TodoApp />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;