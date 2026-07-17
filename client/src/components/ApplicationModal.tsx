import type { Application } from "../types/Application";
import StatusBadge from "./statusBadge";
import formatDate from "../utils/formatDate";
import formatRelativeDate from "../utils/formatRelativeDates";
import { 
    CircleX, 
    Building2, 
    BriefcaseBusiness, 
    Clock3, 
    BadgePoundSterling, 
    MapPin,
    Notebook,
    Pencil,
    Trash,
    Link
 } from "lucide-react";

type Props = {
    application: Application | null;
    isOpen: boolean;
    onClose: () => void;
    onEdit?: (application: Application) => void;
    onDelete?: (application: Application) => void;
}

const ApplicationModal = ({ application, isOpen, onClose, onEdit, onDelete }: Props) => {
    if(!isOpen || !application) {
        return null
    }
    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="application-modal" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">                    
                    <button className="close-button" onClick={onClose}>
                        <CircleX color="red" size={20} strokeWidth={3} className="x-icon"/>
                    </button>
                    <div>
                        <div className="modal-info">
                            <span><BriefcaseBusiness size={24}/></span><h2>{application.role}</h2>
                        </div>
                        <div className="modal-info company-info">
                            <div className="company-name">
                                <Building2 size={24}/>
                                <h3>{application.company}</h3>
                            </div>
                            <StatusBadge status={application.status} />
                        </div>
                        {application.job_url && (
                            <div className="model-info">
                                <Link size={24}/>
                                <a
                                    href={application.job_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    View Job Listing
                                </a>
                            </div>
                        )}
                    </div>
                </div>
                <div className="divider" />
                <div className="modal-body">
                    <p className="modal-label">Location</p>
                    <div className="modal-info">
                        <MapPin size={24}/>
                        <p>{application.location}</p>
                    </div>
                    <p className="modal-label salary-label">Salary</p>
                    <div className="modal-info">
                        <BadgePoundSterling size={24} />
                        {application.salary ? (
                            new Intl.NumberFormat("en-GB", {
                                style: "currency",
                                currency: "GBP",
                                maximumFractionDigits: 0,
                            }).format(application.salary)
                        ) : (
                            <p>Not Provided</p>
                        )}
                    </div>
                    <p className="modal-label">Deadline</p>
                    <div className="modal-info">
                        <Clock3 size={24}/>
                        <p>{application.deadline ? formatRelativeDate(application.deadline) : "Rolling deadline"}</p>
                    </div>
                    <p className="modal-label">Notes</p>
                    {(application.notes?.length ?? 0) > 0 ? (
                        <div className="modal-info">
                            <Notebook size={24}/>
                            <p>{application.notes}</p>
                        </div>
                    ) : (
                        <div className="modal-info">
                            <Notebook size={24}/>
                            <p>No notes added</p>
                        </div>
                    )}
                    <div className="modal-info meta-info">
                        <p>Created</p>
                        <p>{formatDate(application.created_at)}</p>
                    </div>
                    <div className="modal-info meta-info">
                        <p>Last Updated</p>
                        <p>{formatDate(application.updated_at)}</p>
                    </div>
                </div>
                <div className="divider" />
                <div className="modal-footer">
                    <button 
                        className="edit-modal-button"
                        onClick={() => onEdit?.(application)}
                    >
                        <Pencil size={18}/>
                        Edit</button>
                    <button 
                        className="delete-modal-button"
                        onClick={() => onDelete?.(application)}
                    >
                        <Trash size={18}/>
                        Delete</button>
                </div>
            </div>
        </div>
    )
}

export default ApplicationModal