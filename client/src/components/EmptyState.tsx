import { ClipboardList } from "lucide-react";

type EmptyStateProps = {
    title: string;
    message: string;
    actionLabel?: string;
    onAction?: () => void;
}

function EmptyState({title, message, actionLabel, onAction}: EmptyStateProps) {
    return (
        <div className="empty-state">
            <ClipboardList size={48} className="empty-state-icon"/>
            <h2>{title}</h2>
            <p>{message}</p>

            {actionLabel && onAction && (
                <button className="add-button" onClick={onAction}>{actionLabel}</button>
            )}
        </div>
    )
}

export default EmptyState