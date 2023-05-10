import './App.css';
import React, { useState } from 'react';
import todo_data from './test';
import "./components.css"

function App() {

  const [activeProjectId, setActiveProjectId] = useState(0)

  function ProjectList() {

    function handleProjectChange(event) {
        const newActProject = todo_data.indexOf(todo_data.find(elem => {
            return (
                elem.project_id == event.target.getAttribute("id")
            )
        }))
      setActiveProjectId(newActProject)
    }

    return (
        <ul>
            {
                todo_data.map(project => {
                  return <li key={project.project_id}><a id={project.project_id} onClick={handleProjectChange}>{project.project_name}</a></li>
                })
        }
        <li><a>+ Dodaj nowy projekt</a></li>
        </ul>
    )
}

function Navbar() {
    return (
        <div className="navibar">
            <p id="logo">todo</p>
            <ul>
                <li><a>Jakaś opcja tu będzie</a></li>
                <li><a>Jakaś opcja tu będzie</a></li>
                <li><a>Jakaś opcja tu będzie</a></li>
            </ul>
            <p>Projekty:</p>
        <ProjectList/>
        </div>
    )
}
  
function Todo(prop) {
    return (
      <div className={"todo_card"}>
        <div className="todo_name">{prop.name}</div>
        <div className={'todo_status '+prop.status} title={prop.status}></div>
        <div className="todo_desc">{prop.desc}</div>
        </div>
    )
}

function Todo_list(prop) {
    const todo_table = Object.values({ ...todo_data })
  return (
    <div className="todo_table_body">
       <div className='todo_title'><h2>{todo_table[prop.index].project_name}</h2></div>
            {(todo_table[prop.index].todo_list).map((todo) =>
                <Todo
                    key={todo.id}
                    name={todo.name}
                    desc={todo.desc}
                    status={todo.status}
                />
            )
        }
        <div className="todo_title add_card">
          <h2>Dodaj nowy todo</h2>
        </div>
        
        </div>
    )
}

  return (
    <div className="App">
      <Navbar />
      <Todo_list
      index = {activeProjectId}
      />
    </div>
  );
}

export default App;