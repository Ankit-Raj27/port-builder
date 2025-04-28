
"use client";
import ModernTemplate from "@/app/custom/ModernTemplate";
import CreativeTemplate from "@/app/custom/CreativeTemplate";
import BusinessTemplate from "@/app/custom/BusinessTemplate";
import { useParams } from "next/navigation";

const templatesMap: Record<string, JSX.Element> = {
  Modern: <ModernTemplate />,
  Creative: <CreativeTemplate />,
  Business: <BusinessTemplate />,

};

const Page = () => {
  const params = useParams();
  const id = params?.id as string;

  const SelectedTemplate = templatesMap[id];

  if (!SelectedTemplate) {
    return <div>Template not found</div>;
  }

  return <div>{SelectedTemplate}</div>;
};

export default Page;
