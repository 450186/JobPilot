import type { Application } from "../types/Application";
import '../styles/table.css'
import StatusBadge from "./statusBadge";
import formatDate from "../utils/formatDate";
import { Pencil, Trash, ExternalLink } from "lucide-react";

type TableProps = {
    applications: Application[]
    onEdit: (application: Application) => void
    onDelete: (application: Application) => void
}

function ApplicationTable({applications, onEdit, onDelete} : TableProps) {
    return (
        <table>
            <thead>
                <tr>
                    <th>Company</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Job URL</th>
                    <th>Salary</th>
                    <th>Deadline</th>
                    <th>Location</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {applications.map((application) => (
                    <tr key={application.id}>
                        <td>{application.company}</td>
                        <td>{application.role}</td>
                        <td><StatusBadge status={application.status} /></td>
                        <td className="link-col">
                        {application.job_url ? (
                            <a
                            href={application.job_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            >
                            <ExternalLink size={16} /> View
                            </a>
                        ) : (
                            "-"
                        )}
                        </td>
                        <td>
                            {application.salary ? (
                                `£${application.salary.toLocaleString()}`
                            ) : (
                                "-"
                            )}
                        </td>
                        <td>
                            {formatDate(application.deadline)}
                        </td>
                        <td>{application.location ?? "-"}</td>
                        <td className="edit-col"><button className="edit-button" onClick={() => onEdit(application)}><Pencil size={16} strokeWidth={3} /></button></td>
                        <td className="delete-col"><button className="delete-button" onClick={() => onDelete(application)}><Trash size={16} strokeWidth={3} /></button></td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default ApplicationTable