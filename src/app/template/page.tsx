"use client"
import { Navbar } from "@/components/navbars/Navbar";
import { useRouter } from "next/navigation";

type Template = {
  id: string;
  name: string;
  description: string;
  navbar: string;
  hero: string;
};

const templates: Template[] = [
  { id: "template1", name: "Modern Portfolio", description: "A sleek, minimal portfolio.", navbar: "Navbar1", hero: "Hero1" },
  { id: "template2", name: "Creative Portfolio", description: "A stylish and colorful template.", navbar: "Navbar2", hero: "Hero1" },
  { id: "template3", name: "Business Portfolio", description: "A professional portfolio.", navbar: "Navbar1", hero: "Hero1" }
];

const Templates: React.FC = () => {
  const router = useRouter();

  const handleSelectTemplate = (template: Template) => {
    router.push(
      `/template/${template.id}?navbar=${template.navbar}&hero=${template.hero}`
    );
  };

  return (
    <>
      <Navbar />
      <div className="p-10">
        <h2 className="text-2xl font-bold mb-6">Choose a Template</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {templates.map((template) => (
            <div
              key={template.id}
              className="border p-5 shadow-lg rounded-md cursor-pointer hover:bg-gray-100"
              onClick={() => handleSelectTemplate(template)}
            >
              <h3 className="text-lg font-semibold">{template.name}</h3>
              <p className="text-sm text-gray-600">{template.description}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Templates;