"use client";
import { ITask } from "@/types/tasks"
// import { FaRegEdit, FaRegTrashAlt } from "react-icons/Fa";
import React, { FormEventHandler, useState } from "react"
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import { deleteTodo, editTodo } from "@/api";

interface TaskProps {
    task: ITask
}
const Task: React.FC<TaskProps> = ({ task }) => {
    const [modalOpenEdit, setModalOpenEdit] = useState<boolean>(false);
    const [modalOpenDelete, setModalOpenDelete] = useState<boolean>(false);
    const [editTaskTitle, setEditTaskTitle] = useState<string>(task.title);
    const [editTaskDesc, setEditTaskDesc] = useState<string>(task.description);
    const [editTaskStatus, setEditTaskStatus] = useState<string>(task.status);
    const router = useRouter()

    const updateTask: FormEventHandler<HTMLFormElement> = async (e) => {

        e.preventDefault()
        await editTodo({
            id: task.id,
            title: editTaskTitle,
            description: editTaskDesc,
            status: editTaskStatus
        });
        // setEditTaskTitle("");
        // setEditTaskDesc("");
        // setEditTaskStatus("");
        setModalOpenEdit(false);
        router.refresh();
    }
    const deleteTask = async (id: string) => {

        await deleteTodo(id);
        setModalOpenDelete(false);
        router.refresh();
    }



    return (
        <tr key={task.id}>
            <td>{task.title}</td>
            <td>{task.description==""?"-":task.description}</td>
            <td>{task.status}</td>
            <td className="flex gap-10">
                <button   onClick={() => setModalOpenEdit(true)} className="btn"  >Edit</button>
                <Modal modalOpen={modalOpenEdit} setModalOpen={setModalOpenEdit}>
                    <div className="modal-action">
                        <form onSubmit={updateTask} className="w-full" >
                            <h3 className="font-bold text-lg">Update task</h3>
                            <input type="text" className="input input-bordered w-full my-4" onChange={e => setEditTaskTitle(e.target.value)} value={editTaskTitle} />
                            <input type="text" className="input input-bordered w-full my-4" onChange={e => setEditTaskDesc(e.target.value)} value={editTaskDesc} />
                            {/* <input type="text" placeholder="Type here" className="input input-bordered w-full my-4" onChange={e => setEditTaskStatus(e.target.value)} value={editTaskStatus} /> */}
                            <div className="flex items-center gap-5 mb-5">
                                <h5>Status:</h5>
                                <div className="form-control">
                                    <label className="label cursor-pointer">
                                        <span className="label-text">To Do:&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                        <input type="radio" name="todo" value="To Do" onChange={e => setEditTaskStatus(e.target.value)} className="radio checked:bg-red-500" checked={editTaskStatus === "To Do"} />
                                    </label>
                                </div>
                                <div className="form-control">
                                    <label className="label cursor-pointer">
                                        <span className="label-text">In Progress:&nbsp;&nbsp;&nbsp;&nbsp; </span>
                                        <input type="radio" name="todo" value="In Progress" onChange={e => setEditTaskStatus(e.target.value)} className="radio checked:bg-yellow-500" checked={editTaskStatus === "In Progress"} />
                                    </label>
                                </div>
                                <div className="form-control">
                                    <label className="label cursor-pointer">
                                        <span className="label-text">Done:&nbsp;&nbsp;&nbsp;&nbsp; </span>
                                        <input type="radio" name="todo" value="Done" onChange={e => setEditTaskStatus(e.target.value)} className="radio checked:bg-green-500" checked={editTaskStatus === "Done"} />
                                    </label>
                                </div>
                            </div>
                            <button type="submit" value="Submit" className="btn" >Update</button>
                            <label htmlFor="my_modal_6" className="btn mt-2 mx-5" onClick={() => setModalOpenEdit(false)}>Close X</label>

                        </form>
                    </div>
                </Modal>
                <button className="btn btn-danger" onClick={() => setModalOpenDelete(true)}   >Delete</button>
                <Modal modalOpen={modalOpenDelete} setModalOpen={setModalOpenDelete}>
                    <h3 className="text-lg">Confirm delete?</h3>
                    <div className="modal-action">

                        <button type="submit" onClick={() => deleteTask(task.id)} className="btn" >Delete</button>
                        <label htmlFor="my_modal_6" className="btn mx-5" onClick={() => setModalOpenDelete(false)}>Close X</label>

                    </div>
                </Modal>
            </td>
        </tr>
    )
}

export default Task
