import type { Application } from "../types/Application";
import { useState } from "react";
import '../styles/table.css'
import StatusBadge from "./statusBadge";
import formatDate from "../utils/formatDate";
import { Pencil, Trash, ExternalLink, ChevronDown, ChevronUp, ChevronsUpDown } from "lucide-react";

type TableProps = {
    applications: Application[]
    onEdit: (application: Application) => void
    onDelete: (application: Application) => void
}

type SortKey = "company" | "role" | "status" | "salary" | "deadline" | "location"
type SortOrder = "asc" | "desc"

function ApplicationTable({applications, onEdit, onDelete} : TableProps) {
    const [SortKey, setSortKey] = useState<SortKey>("deadline");
    const [SortOrder, setSortOrder] = useState<SortOrder>("asc");

    const handleSort = (key: SortKey) => {
        if (SortKey === key) {
            setSortOrder(SortOrder === "asc" ? "desc" : "asc");
        } else {
            setSortKey(key);
            setSortOrder("asc");
        }
    }
    const sortedApplications = [...applications].sort((a, b) => {
        const aVal = a[SortKey];
        const bVal = b[SortKey];
        if (aVal === null) return 1;
        if (bVal === null) return -1;

        if(SortKey === 'salary') {
            return SortOrder === "asc"
                ? Number(aVal) - Number(bVal)
                : Number(bVal) - Number(aVal);
        }

        if(SortKey === 'deadline') {
            return SortOrder === "asc"
                ? new Date(aVal).getTime() - new Date(bVal).getTime()
                : new Date(bVal).getTime() - new Date(aVal).getTime();
        }

        return SortOrder === "asc"
            ? String(aVal).localeCompare(String(bVal))
            : String(bVal).localeCompare(String(aVal));
    })

    const renderIcon = (key: SortKey) => {
        if(SortKey !== key) {
            return <ChevronsUpDown size={16}/>
        };
        return SortOrder === "asc" ? <ChevronUp size={16}/> : <ChevronDown size={16}/>;
    } 
    return (
        <table>
            <thead>
                <tr>
                    <th>
                        <button className="sort-header" onClick={() => handleSort('company')}>
                            Company {renderIcon('company')}
                        </button>
                    </th>
                    <th>
                        <button className="sort-header" onClick={() => handleSort('role')}>
                            Role {renderIcon('role')}
                        </button>
                    </th>
                    <th>
                        <button className="sort-header" onClick={() => handleSort('status')}>
                            Status {renderIcon('status')}
                        </button>
                    </th>
                    <th>Job URL</th>
                    <th>
                        <button className="sort-header" onClick={() => handleSort('salary')}>
                            Salary {renderIcon('salary')}
                        </button>
                    </th>
                    <th>
                        <button className="sort-header" onClick={() => handleSort('deadline')}>
                            Deadline {renderIcon('deadline')}
                        </button>
                    </th>
                    <th>
                        <button className="sort-header" onClick={() => handleSort('location')}>
                            Location {renderIcon('location')}
                        </button>
                    </th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {sortedApplications.map((application) => (
                    <tr key={application.id}>
                        <td>{application.company}</td>
                        <td>{application.role}</td>
                        <td><StatusBadge status={application.status} /></td>
                        <td className="link-col">
                        {application.job_url ? (
                            <a
                            className="job-link"
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