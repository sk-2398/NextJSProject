import React from "react";

interface modalProps {
  modalOpen: boolean;
  setModalOpen: (open: boolean) => boolean | void;
  children: React.ReactNode
}




const Modal: React.FC<modalProps> = ({ modalOpen, setModalOpen, children }) => {
  return (

    <div className={`modal ${modalOpen ? "modal-open" : ""} `}>
      <div className="modal-box">
        
          {children}
      </div>
    </div>
  )
}

export default Modal
