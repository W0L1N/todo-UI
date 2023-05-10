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
            <p id="logo">Todo</p>
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
  
function Task(prop) {
    return (
      <div className={"task_card"}>
        <div className="task_name">{prop.name}</div>
        <div className={'task_status '+prop.status} title={prop.status}></div>
        <div className="task_desc">{prop.desc}</div>
        </div>
    )
}

function Task_list(prop) {
  return (
    <div className="task_table_body">
       <div className='task_title'><h2>{todo_data[prop.index].project_name}</h2></div>
            {(todo_data[prop.index].task_list).map((task) =>
                <Task
                    key={task.id}
                    name={task.title}
                    desc={task.desc}
                    status={task.status}
                />
            )
        }
        <div className="task_title add_task">
          <h2>Dodaj nowy task</h2>
        </div>
        
        </div>
    )
}

  return (
    <div className="App">
      <Navbar />
      <Task_list
      index = {activeProjectId}
      />
    </div>
  );
}

export default App;