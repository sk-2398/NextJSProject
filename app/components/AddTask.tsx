"use client";
import { FormEventHandler, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import Modal from "./Modal";
import { addTodo } from "@/api";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from 'uuid';

const AddTask = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const [newTaskTitle, setNewTaskTitle] = useState<string>("")
  const [newTaskDesc, setNewTaskDesc] = useState<string>("");
  const [newTaskStatus, setNewTaskStatus] = useState<string>("To Do");
  const router = useRouter();

  const addNewTask: FormEventHandler<HTMLFormElement> = async (e) => {
   
    e.preventDefault()
    
    await addTodo({
      id: uuidv4(),
      title: newTaskTitle,
      description: newTaskDesc,
      status: newTaskStatus
    });
    setNewTaskTitle("");
    setNewTaskDesc("");
    setNewTaskStatus("To Do");
    setModalOpen(false);
    router.refresh();
  }

  return (
    <div>
      <button className="btn btn-primary w-full mx-5" onClick={() => setModalOpen(true)}><AiOutlinePlus />Add new task</button>
      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <div className="modal-action">
          <form onSubmit={addNewTask} className="w-full" >
            <h3 className="font-bold text-lg">Add new task</h3>
            <input type="text" placeholder="Task Title" className="input input-bordered w-full my-4" onChange={e => setNewTaskTitle(e.target.value)} value={newTaskTitle} required/>
            <input type="text" placeholder="Task Description" className="input input-bordered w-full my-4" onChange={e => setNewTaskDesc(e.target.value)} value={newTaskDesc} />
            {/* <input type="text" placeholder="Type here" className="input input-bordered w-full my-4" onChange={e => setNewTaskStatus(e.target.value)} value={newTaskStatus} /> */}
            <div className="flex items-center gap-5 mb-5">
              <h5>Status:</h5>
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text">To Do:&nbsp;&nbsp;&nbsp;&nbsp;</span>
                  <input type="radio" name="todo" value="To Do" onChange={e => setNewTaskStatus(e.target.value)} className="radio checked:bg-red-500"/>
                </label>
              </div>
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text">In Progress:&nbsp;&nbsp;&nbsp;&nbsp; </span>
                  <input type="radio" name="todo" value="In Progress" onChange={e => setNewTaskStatus(e.target.value)}  className="radio checked:bg-yellow-500"  />
                </label>
              </div>
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text">Done:&nbsp;&nbsp;&nbsp;&nbsp; </span>
                  <input type="radio" name="todo"  value="Done" onChange={e => setNewTaskStatus(e.target.value)}  className="radio checked:bg-green-500" />
                </label>
              </div>
            </div>
            <button type="submit" value="Submit" className="btn" >Add</button>
          <label htmlFor="my_modal_6" className="btn mt-2 mx-5" onClick={() => setModalOpen(false)}>Close X</label>
          </form>
        </div>
      </Modal>
    </div>
  )
}

export default AddTask
