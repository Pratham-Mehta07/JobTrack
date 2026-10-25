import { useState } from 'react'
import { STATUSES } from '../constants'

const emptyForm = {
  company: '',
  role: '',
  applicationDate: '',
  jobLink: '',
  status: 'Applied',
  notes: '',
}

// Returns an object like { company: 'Company name is required' }.
// An empty object means the form is valid.
function validate(form) {
  const errors = {}
  if (!form.company.trim()) errors.company = 'Company name is required'
  if (!form.role.trim()) errors.role = 'Job title is required'
  if (!form.applicationDate) errors.applicationDate = 'Application date is required'
  if (!form.status) errors.status = 'Status is required'
  return errors
}

const inputClass =
  'w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200'

function Field({ label, error, required, children }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-600"> *</span>}
      </span>
      {children}
      {error && <span className="mt-1 block text-sm text-red-600">{error}</span>}
    </label>
  )
}

// onSubmit receives the new application's data (without an id).
function ApplicationForm({ onSubmit, onCancel }) {
  const [form, setForm] = useState(emptyForm)
  const [errors, setErrors] = useState({})

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm({ ...form, [name]: value })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const foundErrors = validate(form)
    setErrors(foundErrors)
    if (Object.keys(foundErrors).length > 0) return

    onSubmit({
      company: form.company.trim(),
      role: form.role.trim(),
      applicationDate: form.applicationDate,
      jobLink: form.jobLink.trim(),
      status: form.status,
      notes: form.notes.trim(),
    })
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="mb-6 rounded-xl border border-gray-200 bg-white p-5"
    >
      <h2 className="mb-4 text-lg font-semibold text-gray-900">
        Add Job Application
      </h2>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Company Name" required error={errors.company}>
          <input
            name="company"
            value={form.company}
            onChange={handleChange}
            className={inputClass}
          />
        </Field>

        <Field label="Job Title" required error={errors.role}>
          <input
            name="role"
            value={form.role}
            onChange={handleChange}
            className={inputClass}
          />
        </Field>

        <Field label="Application Date" required error={errors.applicationDate}>
          <input
            type="date"
            name="applicationDate"
            value={form.applicationDate}
            onChange={handleChange}
            className={inputClass}
          />
        </Field>

        <Field label="Status" required error={errors.status}>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className={inputClass}
          >
            {STATUSES.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </Field>

        <div className="sm:col-span-2">
          <Field label="Job Link">
            <input
              type="url"
              name="jobLink"
              value={form.jobLink}
              onChange={handleChange}
              placeholder="https://..."
              className={inputClass}
            />
          </Field>
        </div>

        <div className="sm:col-span-2">
          <Field label="Notes">
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              rows={3}
              className={inputClass}
            />
          </Field>
        </div>
      </div>

      <div className="mt-5 flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Save Application
        </button>
      </div>
    </form>
  )
}

export default ApplicationForm
