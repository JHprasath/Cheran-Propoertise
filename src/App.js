import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ConstructionNewTask from './components/constructionNewTask';
import SavedTasks from './components/SavedTasks';
function App() {
  const [data, setData] = useState([]);


  return (
    <Router>
      <Routes>
        <Route path="/" element={<ConstructionNewTask data={data} setData={setData} />} />
        <Route path='/savedTask' element={<SavedTasks />}/>
      </Routes>
    </Router>
     
  );
}

export default App;