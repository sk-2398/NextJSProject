import { ITask } from "@/types/tasks"
import React from "react"
import Task from "./Task";

interface TodoListProps{
    tasks:ITask[];
}


const TodoList: React.FC<TodoListProps> = ({tasks}) => {
    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Task</th>
                            <th>Description</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.map((task)=>(
                        <Task key={task.id} task={task}></Task>

                        ))}
                       
                       
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default TodoList
