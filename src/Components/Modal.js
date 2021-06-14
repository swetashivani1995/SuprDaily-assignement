import React from 'react';

/**
 * Presenational component of Modal
 * @param {*} param 
 * display - show or hide modal
 * title - modal header
 * children - modal content
 * onSave - on click of save button save values inside modal
 * onClose - on click of close button closes the modal
 * @returns 
 */
export const Modal = ({display,title,children,onSave,onClose}) => {
    return (<div className={`modal ${display ? "show": "hidden"}`}>
        <div className="modal-content">
            <div className="modal-header">
                <h4 className="modal-title">{title}</h4>
            </div>
            <form onSubmit={onSave}>
            <div className="modal-body">
               {children}
            </div>
            <div className="modal-footer">
            <input type="submit" value="Submit"/>
                <button onClick={onClose}>Close</button>
            </div>
            </form>
          
        </div>
    </div>)
}