import { useEffect, useState } from "react"
import { TermCard } from "./TermCard"

const savedTasks = localStorage.getItem('tasks')

const initialTasks = savedTasks ? JSON.parse(savedTasks) : [
    { id: "1", text: "Buy milk", done: false },
    { id: "2", text: "Call mom", done: false }
]

export const TermList = () => {
    const [tasks, setTasks] = useState(initialTasks)
    const [newInput, setNewInput] = useState('')

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks))
    }, [tasks])

    const handleAddTask = () => {
        if (!newInput.trim()) return;
        setTasks([...tasks, { id: crypto.randomUUID(), text: newInput.trim(), done: false }])
        setNewInput("")
    }

    const deleteCard = (id) => {
        setTasks(tasks.filter((task) => task.id !== id))
    }

    const toggleTask = (id) => {
        setTasks(tasks.map((task) => task.id === id ? { ...task, done: !task.done } : task))
    }

    const [filter, setFilter] = useState('all')

    let filteredTasks = tasks
    if (filter === 'active') {
        filteredTasks = tasks.filter((task) => !task.done)
    } else if (filter === 'completed') {
        filteredTasks = tasks.filter((task) => task.done)
    }

    return (
        <>
            <div className="term-list_form">
                <input 
                    value={newInput} 
                    type="text" 
                    name="task" 
                    id="task" 
                    placeholder="Enter a task..." 
                    onChange={(e) => setNewInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddTask()}
                />
                <button onClick={handleAddTask}>Add</button>
            </div>

            <div className="filters">
                <button className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>All</button>
                <button className={filter === 'active' ? 'active' : ''} onClick={() => setFilter('active')}>Active</button>
                <button className={filter === 'completed' ? 'active' : ''} onClick={() => setFilter('completed')}>Completed</button>
            </div>

            <div className="term-list">
                {filteredTasks.length === 0 ? (
                    <p>No tasks yet</p>
                ) : (
                    <ul>
                        {filteredTasks.map((task) => (
                            <li key={task.id} className={`term-list_task ${task.done ? 'done' : ''}`}>
                                <TermCard
                                    done={task.done}
                                    onToggle={toggleTask}
                                    title={task.text}
                                    id={task.id}
                                    onDelete={deleteCard} />
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </>
    )
}