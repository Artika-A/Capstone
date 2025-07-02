import { useState, useEffect } from "react";
import "./Home.css"
import { data } from "react-router-dom";
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);


export default function Dashboard() {
    const [tasks, setTasks] = useState([]);
    const [time, setTime] = useState(new Date());

    const getTasks = async () => {
        const jwt = localStorage.getItem("jwt");
        try {
         const response = await fetch("http://localhost:3000/tasks", {
            headers: {
                 Authorization: `Bearer ${jwt}`,
             },
        });

        if (!response.ok) return window.location.href = "/";
        const result = await response.json();
        setTasks(result);
      } catch (error) {
        console.error("Error fetching tasks in Dashboard:", error);
        window.location.href = "/";
      }
   };

    useEffect(() => {
        getTasks();
        const interval = setInterval(() => setTime(new Date()), 30000);
         return() => clearInterval(interval)
    }, []);

     const hours = time.getHours();
     const greeting = 
         hours < 12
             ? "Good Morning ☀️"
             : hours < 18
             ? "Good Afternoon 🌤"
             : "Good Evening 🌙"
     

    const quotes = [
         "Progress, not perfection ✨",
         "Plan it. Do it. Win it. ✍️✅🏆",
         "One task at a time 🔥",
         "Stay focused, stay strong 🚀",
         "Big things start small 🌱",
         "You got this! 💪",
    ];
     const dailyQuote = quotes[time.getDate() % quotes.length];  
  
    const today = new Date();
    const tomorrow = new Date ();
    tomorrow.setDate(today.getDate() + 1);

    const isSameDay = (date1, date2) =>
        date1.getDate() === date2.getDate() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getFullYear() === date2.getFullYear();

    const isThisWeek = (date) => {
        const day = date.getDay();
        const weekStart = new Date(today);
        weekStart.setDate(today.getDate() - day);
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekEnd.getDate() + 6)
        return date >= weekStart && date <= weekEnd;
    };

    const parsedTasks = tasks.map((task) => ({
        ...task,
        deadline: new Date(task.deadline),
    }));

    const tasksToday = parsedTasks.filter((task) => isSameDay(task.deadline, today));
    const tasksTomorrow = parsedTasks.filter((task) => isSameDay(task.deadline, tomorrow));
    const tasksThisWeek = parsedTasks.filter((task) => isThisWeek(task.deadline));

    const totalTasks = parsedTasks.length;
    const completedTasks = tasks.filter((t) => t.completed).length;
    const completionRate = totalTasks ? Math.round((completedTasks / totalTasks) * 100) : 0;

    const chartData = {
         labels: ["Completed", "Progress"],
         datasets: [
             {
                 data: [completedTasks, totalTasks - completedTasks],
                 backgroundColor: ["green", "transparent"],
                 borderColor: "white",
                 borderWidth: 2,
                 
           },
         ],
    };

    const showStreak = tasksToday.length > 0 && tasksToday.every((t) => t.completed)


    return(
        <div className="dashboard-layout">        
            <main className="dashboard-main">
                 <h2>Dashboard</h2>
                 <h3 className="greeting">{greeting}</h3>
                 <div className="quote-box">💬 {dailyQuote}</div>

                 {showStreak && (
                    <div className="streak">🔥 You're on a task streak! Great job!</div>
                 )}

                <div className="task-summary-strip">
                    <span>📅 Today: {tasksToday.length}</span>
                    <span>🌅 Tomorrow: {tasksTomorrow.length}</span>
                    <span>📆 This Week: {tasksThisWeek.length}</span>   
                </div>
                   
                <div className="dashboard-content">
                     <div className="dashboard-left">
                         <div className="dashboard-section">
                             <h3>Tasks for Today</h3>
                                 {tasksToday.length === 0 ? <p>No Tasks Today</p> : (
                                    <ul>{tasksToday.map((task, i) => <li key={i}>{task.title}</li>)}</ul>
                                 )}
                     </div>

                     <div className="dashboard-section">
                           <h3>Task for Tomorrow</h3>
                              {tasksTomorrow.length === 0 ? <p>No tasks tomorrow.</p> : (
                                <ul>{tasksTomorrow.map((task, i) => <li key={i}>{task.title}</li>)}</ul>
                             )}
                     </div>

                     <div className="dashboard-section">
                            <h3>Tasks This Week</h3>
                              {tasksThisWeek.length === 0 ? <p>No tasks this week.</p> : (
                                 <ul>{tasksThisWeek.map((task, i) => <li key={i}>{task.title}</li>)}</ul>
                             )}
                     </div>
                </div>

                <div className="dashboard-right">
                     <div className="dashboard-section completion-box">
                          <h3>Completion Rate</h3>
                               <p><b>{completionRate}%</b></p>
                    </div>

                     <div className="dashboard-section">
                       <h3>Task Summary</h3>
                       <p>✅ completed: {completedTasks}</p>
                       <p>❌ In Progress: {totalTasks - completedTasks}</p>          
                     </div>

                    <div className="dashboard-chart">
                          <Doughnut data={chartData} />
                    </div>
              </div>
            </div>
         </main>
      </div>
    );
}

