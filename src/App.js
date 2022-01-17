import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';
//import AddToDo from './components/AddToDo';
import ToDoItem from './components/ToDoItem';
import ToDoList from './components/ToDoList';

function App() {
  return (
    <Router>
      <Routes>
      <Route exact path ="/" element={<ToDoList />} />
      <Route path="/todos/:id" element={<ToDoItem />} />
      </Routes>
    </Router>
);
}

export default App;