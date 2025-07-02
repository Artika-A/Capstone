import { useState, useEffect } from "react";
import "./Home.css";

export default function TaskManager() {
    const [tasks, setTasks] = useState([]);
    const [taskName, setTaskName] = useState("");
    const [taskDeadline, setTaskDeadline] = useState("")

    const getTasks = async () => {
    const jwt = localStorage.getItem("jwt")
    try{
      const response = await fetch("http://localhost:3000/tasks", {
        headers: {
          'Authorization': `Bearer ${jwt}`
        }
      })


      if(!response.ok) {
        window.location.href = "/";
      }

      const result = await response.json()
      setTasks(result)
    } catch(error) {
      console.log(error);
      console.log("Error making API call")
      window.location.href = "/";
    }
  }


      const addTask = async (e) => {
         e.preventDefault();
         if (!taskName.trim() || !taskDeadline) return;
  
         const jwt = localStorage.getItem("jwt")
         try{
            const response = await fetch("http://localhost:3000/tasks", {
               method: "POST",
               headers: {
                 "Content-Type": `application/json`,
                 "Authorization": `Bearer ${jwt}`,
           },
           body: JSON.stringify({ title: taskName, deadline: taskDeadline }),
      });
     
      const result = await response.json();
      await getTasks();
      setTaskName("");
      setTaskDeadline("");    
    } catch(error){     
      console.log("Error adding task", error)
    }
  };

     const updateTask = async (task) => {
        const jwt = localStorage.getItem("jwt")
          try{
            const response = await fetch(`http://localhost:3000/tasks/${task._id}`, {
             method: "PUT",
             headers: {
               'Content-Type': `application/json`,
               'Authorization': `Bearer ${jwt}`
          },
           body: JSON.stringify({
           completed: task.completed
         })
      })

    const result = await response.json()
       console.log(result)
     } catch(error){
       console.log(error)
       console.log("Error updating task")
      }
    }

   const deleteTask = async (task) => {
      const jwt = localStorage.getItem("jwt")
    
       try{
          const delUrl = `http://localhost:3000/tasks/${task._id}`
          console.log(delUrl)
          const response = await fetch(delUrl, {   
            method: "DELETE",
            headers: {       
              'Authorization': `Bearer ${jwt}`
         }
       })
     
       console.log(response)

      if(response.ok) {
        console.log("Deleted successfully")
        await getTasks();
      }
    } catch(error){
      console.log(error)
      console.log("Error deleting task")
    }
  }

      const toggleTask = async (index) => {
        const updatedTasks = [...tasks];
        updatedTasks[index].completed = !updatedTasks[index].completed;
        await updateTask(updatedTasks[index]); 
       setTasks(updatedTasks);
     };

   
      const removeTask = async (task, index) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this task?");
        if (!confirmDelete) return;

       await deleteTask(task); 
       const newTasks = tasks.filter((_, i) => i !== index);
       setTasks(newTasks); 
     };

       useEffect(() => {
         getTasks(); 
      }, []);


       const textboxStyle = {padding: 5, margin: 10}

       return (
          <div className="task-container">
             <h2>Create New Task</h2>
                <p>Plan with purpose. Move with momentum. Win with grace. 🔷🧡🚀</p>
                <div className="wrapper-task">
                   <form onSubmit={addTask} className="task-form">
                     <div className="input-box">
                       <input
                          type="taskName"
                          value={taskName}
                          onChange={(e) => setTaskName(e.target.value)}
                          placeholder="Add new task"                
                          required
                        />
                      </div>
                      <div className="input-box">
                        <input
                           type="date"
                           value={taskDeadline}
                           onChange={(e) => setTaskDeadline(e.target.value)}
                           placeholder="Deadline"                 
                           required
                        />
                       </div>             
                           <input type="submit" value="Add" className="submit-button" />
                     
                       </form>
                       {tasks.length === 0 ? (
                          <p>No tasks yet.</p>
                       ) : (            
                        <ul className="task-list">                  
                          {tasks.map((task, index) => (        
                             <li key={task._id}>

                        <input
                           type="checkbox"
                           checked={task.completed}
                           onChange={() => toggleTask(index)}
                           style={textboxStyle}
                         />
                          <span style={{ 
                             textDecoration: task.completed ? "line-through" : "",
                             color: (!task.completed && new Date(task.deadline) < new Date()) ? "red" : "inherit",           
                           }}>

                           {task.title}, {task.deadline?.slice(0,10)}
                         </span>
              
                        <button onClick={() => removeTask(task, index)}>Remove</button>
                     </li>
                    ))}       
                </ul>
             )}
         </div>
     </div>
   )
} 