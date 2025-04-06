"use client";
import { formFields } from "../forms/formFields";

interface DynamicFormProps {
  section: keyof typeof formFields;
  selectedComponent: string;
  formData: Record<string, string>;
  onChange: (section: keyof typeof formFields, field: string, value: string) => void;
}

const DynamicForm: React.FC<DynamicFormProps> = ({ section, selectedComponent, formData, onChange }) => {
  const fields: string[] =
    formFields[section]?.[selectedComponent as keyof (typeof formFields)[typeof section]] || [];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange(section, name, value);
  };

  return (
    <div className="space-y-4 bg-white p-4 shadow-md rounded-md">
      {fields.length === 0 ? (
        <p className="text-gray-500">No customization options available for this component.</p>
      ) : (
        fields.map((field) => (
          <div key={field} className="flex flex-col">
            <label className="font-medium text-sm text-gray-700 mb-1">
              {field.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase())}
            </label>
            <input
              type={field.toLowerCase().includes("url") || field.toLowerCase().includes("src") ? "url" : "text"}
              name={field}
              value={formData[field] || ""}
              onChange={handleChange}
              className="border border-gray-300 rounded p-2 text-sm"
              placeholder={`Enter ${field}`}
            />
          </div>
        ))
      )}
    </div>
  );
};

export default DynamicForm;
