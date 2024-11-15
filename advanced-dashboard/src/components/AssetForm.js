import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import api from "../axiosConfig";
import "./AssetList.css";

const AssetForm = ({ assetId, onSave, initialAsset }) => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [departments, setDepartments] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    // Fetch departments and employees for select fields
    Promise.all([api.get("/api/departments/"), api.get("/api/employees/")])
      .then(([deptResponse, empResponse]) => {
        setDepartments(deptResponse.data);
        setEmployees(empResponse.data);

        if (assetId && initialAsset) {
          setValue("name", initialAsset.name);
          setValue("description", initialAsset.description);
          setValue("value", initialAsset.value);
          setValue("serial_number", initialAsset.serial_number);
          setValue("barcode", initialAsset.barcode);
          setValue("date_acquired", initialAsset.date_acquired);
          setValue("date_disposed", initialAsset.date_disposed);
          setValue("department", initialAsset.department.id);
          setValue("assigned_to", initialAsset.assigned_to?.id || null);
        }
      })
      .catch((error) => {
        console.error("Error fetching departments or employees:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [assetId, setValue, initialAsset]);

  const onSubmit = (data) => {
    setLoading(true);
    const apiMethod = assetId ? api.put : api.post;
    const apiUrl = assetId ? `/api/assets/${assetId}` : "/api/assets/";

    apiMethod(apiUrl, data)
      .then((response) => {
        onSave(response.data); // Notify parent component after saving
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error saving asset:", error);
        setLoading(false);
      });
  };

  if (loading) return <div>Loading...</div>;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Name</label>
        <Controller
          name="name"
          control={control}
          rules={{ required: "Name is required" }}
          render={({ field }) => <input {...field} />}
        />
        {errors.name && <p>{errors.name.message}</p>}
      </div>

      <div>
        <label>Description</label>
        <Controller
          name="description"
          control={control}
          rules={{ required: "Description is required" }}
          render={({ field }) => <textarea {...field} />}
        />
        {errors.description && <p>{errors.description.message}</p>}
      </div>

      <div>
        <label>Value</label>
        <Controller
          name="value"
          control={control}
          rules={{ required: "Value is required" }}
          render={({ field }) => <input type="number" step="0.01" {...field} />}
        />
        {errors.value && <p>{errors.value.message}</p>}
      </div>

      <div>
        <label>Serial Number</label>
        <Controller
          name="serial_number"
          control={control}
          render={({ field }) => <input {...field} />}
        />
      </div>

      <div>
        <label>Barcode</label>
        <Controller
          name="barcode"
          control={control}
          render={({ field }) => <input {...field} />}
        />
      </div>

      <div>
        <label>Date Acquired</label>
        <Controller
          name="date_acquired"
          control={control}
          render={({ field }) => <input type="date" {...field} />}
        />
      </div>

      <div>
        <label>Date Disposed</label>
        <Controller
          name="date_disposed"
          control={control}
          render={({ field }) => <input type="date" {...field} />}
        />
      </div>

      <div>
        <label>Department</label>
        <Controller
          name="department"
          control={control}
          rules={{ required: "Department is required" }}
          render={({ field }) => (
            <select {...field}>
              <option value="">Select a department</option>
              {departments.map((dept) => (
                <option key={dept.id} value={dept.id}>
                  {dept.name}
                </option>
              ))}
            </select>
          )}
        />
        {errors.department && <p>{errors.department.message}</p>}
      </div>

      <div>
        <label>Assigned To</label>
        <Controller
          name="assigned_to"
          control={control}
          render={({ field }) => (
            <select {...field}>
              <option value="">Select an employee</option>
              {employees.map((employee) => (
                <option key={employee.id} value={employee.id}>
                  {employee.name}
                </option>
              ))}
            </select>
          )}
        />
      </div>

      <div>
        <button type="submit">Save</button>
      </div>
    </form>
  );
};

export default AssetForm;
