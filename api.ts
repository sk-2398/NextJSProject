import { ITask } from "./types/tasks";

const baseURL="http://localhost:3001"

export const getAllTodo=async(): Promise<ITask[]> =>{
    const res=await fetch(`${baseURL}/tasks`, {cache:'no-store'});
    const todos=await res.json();
    return todos;
}


// add todo

export const addTodo=async(todo:ITask):Promise<ITask>=>{
    const res=await fetch(`${baseURL}/tasks`,{
        method:'POST',
        headers:{
            'Content-type':'application/JSON'
        },
        body:JSON.stringify(todo)
    })
    const newTodo=await res.json();
    return newTodo
}

// Edit todo

export const editTodo=async(todo:ITask):Promise<ITask>=>{
    const res=await fetch(`${baseURL}/tasks/${todo.id}`,{
        method:'PUT',
        headers:{
            'Content-type':'application/JSON'
        },
        body:JSON.stringify(todo)
    })
    const updatedTodo=await res.json();
    return updatedTodo
}

// Delete todo

export const deleteTodo=async(id:string):Promise<ITask>=>{
    const res=await fetch(`${baseURL}/tasks/${id}`,{
        method:'DELETE',
        
    })
    const deletedTodo=await res.json();
    return deletedTodo
}