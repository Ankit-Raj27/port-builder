import { SearchBar } from "@/components/forms/search";
import { Navbar } from "@/components/navigation/navbar/page";
import React from "react";

function page() {
  return (
    <div>
      <Navbar />
      <section className="max-w-[1200px] mx-auto items-center justify-center py-20 flex flex-col md:py-22">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight  ">Choose a template and start creating</h1>
        <div className="mt-10"><SearchBar /></div>
      </section>
    </div>
  );
}

export default page;
