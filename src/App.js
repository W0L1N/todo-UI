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
    
      async function getTask() {
        const response = await fetch("http://localhost:8080/task/all")
        var data = await response.json()
        return data;
      }
      console.log(getTask())
    }

    return (
      <ul>
        {
          todo_data.map(project => {
            return <li key={project.project_id}><a id={project.project_id} onClick={handleProjectChange}>{project.project_name}</a></li>
          })
        }
        <li id="add_project" onClick={handleProjectForm}><a>+ Dodaj nowy projekt</a></li>
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
    document.getElementById("pop-up").style.display = newDisplay
  }

  function handleProjectForm() {
    const oldDisplay = document.getElementById("overlay").style.display
    const newDisplay = (oldDisplay == "none" ? "flex" : "none")
    document.getElementById("overlay").style.display = newDisplay
    document.getElementById("pop-up-project").style.display = newDisplay
    }
  
  function PopUpForm(prop) {

    const [addTaskForm, setAddTaskForm] = useState(
    {
      id: nanoid(),
      title: "Task"+(todo_data[activeProjectId].task_list.length+1),
      desc: "",
      status: "todo"
    }
  )

    function handlePopUpFormChange(event) {

      let formName = event.target.id;
      let formValue = event.target.value;

      const newTask = { ...addTaskForm };
      newTask[formName] = formValue;

      setAddTaskForm(newTask)
    }

    const handleSubmit = (event) => {
      event.preventDefault();

      console.log(addTaskForm)

      const newTask = { ...addTaskForm }
      todo_data[activeProjectId].task_list.push(newTask)

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

  function AddProject(prop) {
    const [addProjectForm, setProjectForm] = useState(
    {
      id: nanoid(),
      project_name: "Project"+(todo_data.length+1),
      project_desc: "",
      task_list: [
          
      ]
    }
  )

    function handlePopUpFormChange(event) {

      let formName = event.target.id;
      let formValue = event.target.value;

      const newProject = { ...addProjectForm };
      newProject[formName] = formValue;

      setProjectForm(newProject)
    }

    function handleProjectForm() {
    const oldDisplay = document.getElementById("overlay").style.display
    const newDisplay = (oldDisplay == "none" ? "flex" : "none")
    document.getElementById("overlay").style.display = newDisplay
    document.getElementById("pop-up-project").style.display = newDisplay
    }

    const handleSubmit = (event) => {
      event.preventDefault();

      const newProject = { ...addProjectForm }
      todo_data.push(newProject)
        console.log(todo_data)
        
      newProject.id = nanoid()
      handleProjectForm();
    }

    
    return (
        <div id="pop-up-project">
        <form>
          <h2>{prop.title}</h2>
          <input type='text' id='project_title' placeholder='Project title...' onChange={handlePopUpFormChange}></input>
          <input type='text' id='project_desc' placeholder='Project description...' onChange={handlePopUpFormChange}></input>
          <button type="reset" onClick={handleSubmit}>{prop.button}</button>
          <button type="reset" onClick={handleProjectForm}>Anuluj</button>
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
        <AddProject
          title="Dodaj nowy projekt"
          button="Dodaj"        
        />
      </div>
    </div>
  );
}

export default App;