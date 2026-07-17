import { CircleX } from "lucide-react";
import type { Application } from "../types/Application";
import ApplicationForm from "./ApplicationForm";

type ApplicationsFormModalProps = {
    applicationToEdit: Application | null
    isOpen: boolean
    onClose: () => void
    onSaved: () => void
}

function ApplicationFormModal({ applicationToEdit, isOpen, onClose, onSaved }: ApplicationsFormModalProps) {
    if(!isOpen) {
        return null
    }

    return (
        <div className="modal-backdrop">
            <div className="modal">
                <button className="close-button" onClick={onClose}>
                    <CircleX color="red" size={20} strokeWidth={3} className="x-icon"/>
                </button>

                <ApplicationForm
                    applicationToEdit={applicationToEdit}
                    onApplicationSaved={onSaved}
                />
            </div>
        </div>
    )
}

export default ApplicationFormModal