import './App.css';
import React, { useState } from 'react';
import todo_data from './test';
import "./components.css"
import {nanoid} from 'nanoid'

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
        <ProjectList />
      </div>
    )
  }
  
  function Task(prop) {
    return (
      <div className={"task_card"}>
        <div className="task_name">{prop.name}</div>
        <div className={'task_status ' + prop.status} title={prop.status}></div>
        <div className="task_desc">{prop.desc}</div>
      </div>
    )
  }

  function handleTaskForm() {
    const oldDisplay = document.getElementById("overlay").style.display
    const newDisplay = (oldDisplay == "none" ? "flex" : "none")
    document.getElementById("overlay").style.display = newDisplay
  }
  
  function PopUpForm(prop) {

    const [addTaskForm, setAddTaskForm] = useState(
    {
      id: nanoid(),
      title: null,
      desc: null,
      status: "todo"
    }
  )

    function handlePopUpFormChange(event) {

      let formName = event.target.id;
      let formValue = event.target.value;

      const newTask = { ...addTaskForm };
      newTask[formName] = formValue;

      setAddTaskForm(newTask)
      console.log(addTaskForm)
    }

    const handleSubmit = (event) => {
      event.preventDefault();

      console.log(addTaskForm)
      addTaskForm.id = nanoid()
      handleTaskForm();
    }

    
    return (
      <div id="pop-up">
        <form>
          <h2>{prop.title}</h2>
          <input type='text' id='title' placeholder='Task title...' onChange={handlePopUpFormChange}></input>
          <input type='text' id='desc' placeholder='Task description...' onChange={handlePopUpFormChange}></input>
          <select id="status" onChange={handlePopUpFormChange}>
            <option value="todo">To do</option>
            <option value="in_progress">In Progress</option>
            <option value="done">Done</option>
          </select>
          <button type="reset" onClick={handleSubmit}>{prop.button}</button>
          <button type="reset" onClick={handleTaskForm}>Anuluj</button>
        </form>
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
        <div className="task_title add_task" onClick={handleTaskForm}>
          <h2>Dodaj nowy task</h2>
        </div>
        
      </div>
    )
  }

  return (
    <div className="App">
      <Navbar />
      <Task_list
        index={activeProjectId}
      />
      <div id="overlay">
        <PopUpForm
          title="Dodaj nowy task"
          button="Dodaj"
        />
      </div>
    </div>
  );
}

export default App;