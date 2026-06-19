import { useEffect, useState } from "react";
import FormInput from "../components/FormInput";
import { getProducts, saveProducts } from "../utils/localStorageHelper";

const initialFormState = {
  id: null,
  name: "",
  email: "",
  mobile: "",
  role: "",
};

function Crud() {
  const [records, setRecords] = useState([]);
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    setRecords(getProducts());
  }, []);

  const validate = () => {
    const nextErrors = {};

    if (!formData.name.trim()) {
      nextErrors.name = "Name is required.";
    }

    if (!formData.email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (!formData.mobile.trim()) {
      nextErrors.mobile = "Mobile is required.";
    } else if (!/^\d{10,15}$/.test(formData.mobile.trim())) {
      nextErrors.mobile = "Enter a valid mobile number.";
    }

    if (!formData.role) {
      nextErrors.role = "Role is required.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  const handleReset = () => {
    setFormData(initialFormState);
    setErrors({});
    setEditingId(null);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    const record = {
      ...formData,
      id: editingId || Date.now(),
    };

    const updatedRecords = editingId
      ? records.map((item) => (item.id === editingId ? record : item))
      : [record, ...records];

    setRecords(updatedRecords);
    saveProducts(updatedRecords);
    handleReset();
  };

  const handleEdit = (record) => {
    setFormData(record);
    setEditingId(record.id);
    setErrors({});
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (id) => {
    const updatedRecords = records.filter((record) => record.id !== id);
    setRecords(updatedRecords);
    saveProducts(updatedRecords);

    if (editingId === id) {
      handleReset();
    }
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">
              {editingId ? "Edit Record" : "Add Record"}
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Fill in the fields and submit to add or update a record.
            </p>
          </div>
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center rounded-2xl border border-slate-300 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
          >
            Reset form
          </button>
        </div>

        <form
          className="mt-6 grid gap-4 sm:grid-cols-2"
          onSubmit={handleSubmit}
          noValidate
        >
          <FormInput
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Jane Doe"
            error={errors.name}
          />
          <FormInput
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="jane@example.com"
            error={errors.email}
          />
          <FormInput
            label="Mobile"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            placeholder="0123456789"
            error={errors.mobile}
          />
          <FormInput
            label="Role"
            name="role"
            type="select"
            value={formData.role}
            onChange={handleChange}
            options={[
              { value: "", label: "Choose a role" },
              { value: "admin", label: "Admin" },
              { value: "editor", label: "Editor" },
              { value: "viewer", label: "Viewer" },
            ]}
            error={errors.role}
          />
          <div className="sm:col-span-2 flex flex-wrap items-center gap-3">
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              {editingId ? "Update Record" : "Add Record"}
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center justify-center rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              Clear fields
            </button>
          </div>
        </form>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-xl font-semibold text-slate-900">
              Submitted Records
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Records are saved locally and can be edited or removed.
            </p>
          </div>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">
            {records.length} record{records.length === 1 ? "" : "s"}
          </span>
        </div>

        {records.length === 0 ? (
          <p className="mt-6 text-sm text-slate-600">
            No records yet. Add a new one using the form above.
          </p>
        ) : (
          <div className="mt-6 overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 text-sm text-slate-700">
              <thead className="bg-slate-50 text-left text-slate-600">
                <tr>
                  <th className="px-4 py-3 font-medium">Name</th>
                  <th className="px-4 py-3 font-medium">Email</th>
                  <th className="px-4 py-3 font-medium">Mobile</th>
                  <th className="px-4 py-3 font-medium">Role</th>
                  <th className="px-4 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {records.map((record) => (
                  <tr key={record.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3">{record.name}</td>
                    <td className="px-4 py-3">{record.email}</td>
                    <td className="px-4 py-3">{record.mobile}</td>
                    <td className="px-4 py-3 capitalize">{record.role}</td>
                    <td className="px-4 py-3 space-x-2">
                      <button
                        type="button"
                        onClick={() => handleEdit(record)}
                        className="rounded-2xl bg-amber-500 px-3 py-2 text-xs font-semibold text-white transition hover:bg-amber-600"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(record.id)}
                        className="rounded-2xl bg-red-500 px-3 py-2 text-xs font-semibold text-white transition hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Crud;
