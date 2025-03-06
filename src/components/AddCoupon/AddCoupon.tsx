"use client";

import {
  useGetSingleCouponQuery,
  useUpdateCouponMutation,
  useAddCouponMutation,
} from "@/Redux/Api/couponApi";
// import { useAddCouponMutation, useGetSingleCouponQuery, useUpdateCouponMutation } from '@/Redux/api/couponApi';
import ShowToastify from "@/utils/ShowToastify";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { ToastContainer } from "react-toastify";

type Inputs = {
  code: string;
  percentage: number;
  expireDate: Date;
  startDate: Date;
};

const AddCoupon = () => {
  const params = useSearchParams().get("coupon");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { result } = useGetSingleCouponQuery(params, {
    selectFromResult: ({ data }) => ({
      result: data?.result,
    }),
  });

  const [addCouponFn] = useAddCouponMutation();
  const [UpdateCouponFn] = useUpdateCouponMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setIsLoading(true);
    const startdate =
      data?.startDate && new Date(data?.startDate).toISOString(); // Convert to Date object
    const expireDate =
      data?.expireDate && new Date(data?.expireDate).toISOString(); // Convert to Date object
    const Percentage = parseFloat(data?.percentage.toString());
    const validData = {
      ...data,
      percentage: Percentage,
      startDate: startdate,
      expireDate: expireDate,
    };

    const updatedData = {
      code: data.code || result?.code,
      discountValue: Percentage || result?.discountValue,
      startDate: startdate || result?.startDate,
      expireDate: expireDate || result?.expireDate,
    };

    console.log(updatedData);

    if (result && "id" in result) {
      const id = result?.id;
      const { error } = await UpdateCouponFn({ data: updatedData, id });
      if (
        error &&
        "data" in error &&
        typeof error.data === "object" &&
        error.data !== null &&
        "message" in error.data
      ) {
        ShowToastify({ error: error?.data?.message as string });
        setIsLoading(false);
        return;
      }
      ShowToastify({ success: "Successfully update your coupon" });
      setIsLoading(false);
      return;
    }

    const { error } = await addCouponFn(validData);
    if (
      error &&
      "data" in error &&
      typeof error.data === "object" &&
      error.data !== null &&
      "message" in error.data
    ) {
      ShowToastify({ error: error?.data?.message as string });
      setIsLoading(false);
      return;
    }
    ShowToastify({ success: "Successfully add your coupon" });
    setIsLoading(false);
  };

  return (
    <section className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-lg">
        <h1 className="text-xl md:text-2xl font-bold text-gray-800 text-center mb-6">
          Add Your Video for Landing Page
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="form-group">
            <label htmlFor="code" className="block text-gray-700 font-medium">
              code
            </label>
            <input
              type="text"
              {...register("code", { required: result ? false : true })}
              defaultValue={result ? result?.code : ""}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary"
            />
            {errors.code && (
              <span className="text-red-500 text-sm">
                This field is required
              </span>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="" className="block text-gray-700 font-medium">
              Percentage Amount
            </label>
            <input
              type="text"
              {...register("percentage", {
                required: result ? false : true,
              })}
              defaultValue={result ? result?.percentage : ""}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary"
            />
            {errors.percentage && (
              <span className="text-red-500 text-sm">
                This field is required
              </span>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="" className="block text-gray-700 font-medium">
              Start date
            </label>
            <input
              type="date"
              {...register("startDate", { required: result ? false : true })}
              defaultValue={
                result
                  ? new Date(result.startDate).toISOString().split("T")[0]
                  : ""
              }
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary"
            />
            {errors.expireDate && (
              <span className="text-red-500 text-sm">
                This field is required
              </span>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="" className="block text-gray-700 font-medium">
              Expired date
            </label>
            <input
              type="date"
              {...register("expireDate", {
                required: result ? false : true,
              })}
              defaultValue={
                result
                  ? new Date(result?.expireDate).toISOString().split("T")[0]
                  : ""
              }
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary"
            />
            {errors.expireDate && (
              <span className="text-red-500 text-sm">
                This field is required
              </span>
            )}
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary text-white p-3 rounded-lg font-medium hover:bg-primary/50 transition duration-300"
          >
            {isLoading ? "loading" : "Submit"}
          </button>
        </form>
      </div>
      <ToastContainer></ToastContainer>
    </section>
  );
};

export default AddCoupon;
