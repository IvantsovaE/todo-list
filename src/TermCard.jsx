export const TermCard = ({ title, id, onDelete, done, onToggle }) => {
    return (
        <>
            <input 
                type="checkbox" 
                name="todo" 
                id={`todo-${id}`} 
                checked={done} 
                onChange={() => onToggle(id)}
            />
            <h2>{title}</h2>
            <button onClick={() => onDelete(id)}>Delete</button>
        </>
    )
}