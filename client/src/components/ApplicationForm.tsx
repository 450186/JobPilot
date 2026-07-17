import { useState, useEffect } from "react"
import { createApplication, updateApplication } from "../api/applications"
import type { NewApplication } from "../api/applications"
import type { Application } from "../types/Application"
import toast from "react-hot-toast"
import '../styles/forms.css'

type ApplicationFormProps = {
    onApplicationSaved: () => void
    applicationToEdit?: Application | null
}

function ApplicationForm({ onApplicationSaved, applicationToEdit }: ApplicationFormProps) {
    const [formData, setFormData] = useState<NewApplication>({
        company: '',
        role: '',
        location: '',
        status: 'Saved',
        job_url: '',
        notes: '',
        salary: null,
        deadline: ''
    })
    const [isRollingDeadline, setIsRollingDeadline] = useState(false)

    useEffect(() => {
        if(applicationToEdit) {
            setFormData({
                company: applicationToEdit.company,
                role: applicationToEdit.role,
                location: applicationToEdit.location || '',
                status: applicationToEdit.status,
                job_url: applicationToEdit.job_url || '',
                notes: applicationToEdit.notes || '',
                salary: applicationToEdit.salary ?? null,
                deadline: applicationToEdit.deadline
                    ? applicationToEdit.deadline.split("T")[0]
                    : "",
            })
            setIsRollingDeadline(!applicationToEdit.deadline)
        }
    }, [applicationToEdit])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const applicationToSave: NewApplication = {
                ...formData,
                deadline: isRollingDeadline ? null : formData.deadline || null
            }

            if(applicationToEdit) {
                await updateApplication(applicationToEdit.id, applicationToSave)
                toast.success("Application updated successfully")
            } else {
                await createApplication(applicationToSave)
                toast.success("Application saved successfully")
            }
            setFormData({
                company: '',
                role: '',
                location: '',
                status: 'Saved',
                job_url: '',
                notes: '',
                salary: null,
                deadline: ''
            })
            onApplicationSaved()
            setIsRollingDeadline(false)
        } catch (error) {
            toast.error("Error saving application")
        }
    }
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }
    return (
        <form className="application-form" onSubmit={handleSubmit}>
            <h2>{applicationToEdit ? "Edit Application" : "New Application"}</h2>
            <input
                name="company"
                type="text"
                placeholder="Company"
                value={formData.company}
                onChange={handleChange}
                required
            />
            <input
                name="role"
                type="text"
                placeholder="Role"
                value={formData.role}
                onChange={handleChange}
                required
            />
            <input
                name="location"
                type="text"
                placeholder="Location"
                value={formData.location}
                onChange={handleChange}
            />
            <select
                name="status"
                value={formData.status}
                onChange={handleChange}>
                    <option value="Saved">Saved</option>
                    <option value="Interview">Interview</option>
                    <option value="Offer">Offer</option>
                    <option value="Rejected">Rejected</option>
                    <option value="Applied">Applied</option>
                </select>
            <input
                name="job_url"
                type="text"
                placeholder="Job URL"
                value={formData.job_url}
                onChange={handleChange}
            />
            <textarea
                name="notes"
                placeholder="Notes"
                value={formData.notes}
                onChange={handleChange}
            />
            <input
            name="salary"
            type="number"
            placeholder="Salary"
            value={formData.salary ?? ""}
            onChange={(e) =>
                setFormData({
                ...formData,
                salary: e.target.value === "" ? null : Number(e.target.value),
                })
            }
            />
            <div className="deadline-row">
                <input
                    name="deadline"
                    type="date"
                    value={formData.deadline ?? ""}
                    onChange={handleChange}
                    disabled={isRollingDeadline}
                />
                <label>
                    <input
                        type="checkbox"
                        checked={isRollingDeadline}
                        onChange={(e) => {
                                setIsRollingDeadline(e.target.checked);
                                if (e.target.checked) {
                                    setFormData({
                                        ...formData,
                                        deadline: "",
                                    });
                                }
                            }
                        }
                    />
                    Rolling Deadline
                </label>
            </div>
            <button type="submit">{applicationToEdit ? "Save Changes" : "Add Application"}</button>
        </form>
    )
}

export default ApplicationForm