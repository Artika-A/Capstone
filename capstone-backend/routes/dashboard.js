const express = require("express")
const router = express.Router();
const Task = require("../models/Task");



router.get("/stats", async (req, res) =>{
    try {
        const userId = req.user.id;
        const tasks = await Task.find({ userId});

        const total = tasks.length;
        const completed = tasks.filter(t => t.completed).length;
        const pending = total - completed;
        
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);

        const isSameDay = (date1, date2) =>
            date1.getDate() === date2.getDate() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getFullYear() === date2.getFullYear();

        const inThisWeek = (d) => {
            const day = today.getDay();
            const start = new Date(today); start.setDate(today.getDate() - day);
            const end = new Date(start); end.setDate(start.getDate() + 6);
            return d >= start && d <= end;
        }

        const tasksToday = tasks.filter(t => isSameDay(new Date(t.deadline), today)).length;
        const tasksTomorrow = tasks.filter(t => isSameDay(new Date(t.deadline), tomorrow)).length;
        const tasksThisWeek = tasks.filter(t => {
            const d = new Date(t.deadline);
            return inThisWeek(d) && !isSameDay(d, today) && !isSameDay(d, tomorrow);
        }).length;

        res.json({
          total,
          completed,
          pending,
          tasksToday,
          tasksTomorrow,
          tasksThisWeek,
        });
     }  catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to fetch dashboard stats" });
     }
});

module.exports = router;



    