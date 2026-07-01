import type { Application } from "../types/Application";
import '../styles/badges.css'

interface StatusBadgeProps {
    status: Application["status"]
}

function StatusBadge({status}: StatusBadgeProps) {
    switch(status) {
        case "Applied": 
            return (
                <span className="status-badge applied">Applied</span>
            )
        case "Interview": 
            return (
                <span className="status-badge interviewing">Interview</span>
            )
        case "Offer": 
            return (
                <span className="status-badge offer">Offer</span>
            )
        case "Rejected": 
            return (
                <span className="status-badge rejected">Rejected</span>
            )
        case "Saved": 
            return (
                <span className="status-badge saved">Saved</span>
            )
        default:
            return <span className="status-badge">{status}</span>;
    }
}

export default StatusBadge