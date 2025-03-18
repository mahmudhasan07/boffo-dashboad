"use client";

import { useAddCategoryMutation } from "@/Redux/Api/categoryApi";
import ShowToastify from "@/utils/ShowToastify";
import React, { useState } from "react";
import { ToastContainer } from "react-toastify";

const page = () => {
  const [name, setName] = useState<string>("");
  const [gender, setGender] = useState<string>("MALE");
  const [addCategoryFn] = useAddCategoryMutation()

  const handleSubmit = async() => {
    const data = {name, gender}

    const { error } = await addCategoryFn(data)
    if (error && "message" in error) {
        ShowToastify({ error: error?.message })
        return
    }
    ShowToastify({ success: 'Successfully add your category' })
    
  };

  return (
    <section>
      <div className="w-full">
        <h1 className="my-10 text-3xl font-semibold text-center">
          Add Category
        </h1>
        <div className="flex flex-wrap gap-4 items-center justify-center">
          <select
            name="gender"
            id=""
            onChange={(e) => setGender(e.target.value)}
            className="border-2 -x-4 py-1 w-32 rounded-lg"
          >
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
          </select>
          <input
            type="text"
            placeholder="Enter your category name"
            onChange={(e) => setName(e.target.value.toUpperCase())}
            className="w-56 border-2 px-3 py-1 rounded-lg"
          />
          <button onClick={handleSubmit} className="px-4 py-1 bg-primary text-white rounded-lg">
            Add Category
          </button>
        </div>
      </div>
      <ToastContainer></ToastContainer>
    </section>
  );
};

export default page;
