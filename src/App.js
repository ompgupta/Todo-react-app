import React from 'react';
import Todo from './components/Todo';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
function App() {
  return (
    <div className="">
      <ToastContainer />
      <Todo/>
    </div>
  );
}

export default App;
