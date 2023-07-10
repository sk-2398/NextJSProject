import Image from 'next/image'
import AddTask from './components/AddTask'
import TodoList from './components/TodoList'
import { getAllTodo } from '@/api'

export default async function Home() {
  const tasks=await getAllTodo();
  return (
    <main className='max-w-4xl mx-auto my-4 '>
      <div className='text-center my-5 flex flex-col gap-4'>
        <h1 className='text-2xl font-bold'>To Do List</h1>
        <AddTask></AddTask>
      </div>
      <TodoList tasks={tasks}></TodoList>
    </main>
  )
}
