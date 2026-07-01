import type { Application } from "../types/Application";
import '../styles/table.css'
import StatusBadge from "./statusBadge";
import formatDate from "../utils/formatDate";

type TableProps = {
    applications: Application[]
}

function ApplicationTable({applications} : TableProps) {
    return (
        <table>
            <thead>
                <tr>
                    <th>Company</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Job URL</th>
                    <th>Notes</th>
                    <th>Salary</th>
                    <th>Deadline</th>
                    <th>Location</th>
                </tr>
            </thead>
            <tbody>
                {applications.map((application) => (
                    <tr key={application.id}>
                        <td>{application.company}</td>
                        <td>{application.role}</td>
                        <td><StatusBadge status={application.status} /></td>
                        <td>{application.job_url ?? "-"}</td>
                        <td>{application.notes ?? "-"}</td>
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
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default ApplicationTable