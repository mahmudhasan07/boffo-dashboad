'use client';
import { useGetVideoQuery, useUpdateVideoMutation, useVideoMutation } from '@/Redux/Api/videoApi';
import ShowToastify from '@/utils/ShowToastify';
import { useSearchParams } from 'next/navigation';
import React, { useState } from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import { ToastContainer } from 'react-toastify';

type Inputs = {
    title: string;
    embedLink: string;
    isFeatured: boolean;
};

const AddVideo = () => {
    const params = useSearchParams().get("video")
    const { result, loading } = useGetVideoQuery(params, {
        selectFromResult: ({ data, isLoading }) => ({
            result: data?.data,
            loading: isLoading
        })
    })

    console.log(result);

    const [addVideoFn, { isLoading }] = useVideoMutation()
    const [UpdateVideoFn, { isLoading: updateLoading }] = useUpdateVideoMutation()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        console.log(data);

        const updatedData = {
            title: data.title || result?.title,
            embedLink: data.embedLink || result?.embedLink,
            isFeatured: data.isFeatured
        };
        if (result && "id" in result) {
            const id = result?.id
            const { error } = await UpdateVideoFn({ data: updatedData, id })
            if (error && "message" in error) {
                ShowToastify({ error: error?.message })
                return
            }
            ShowToastify({ success: 'Successfully update your video' })
            return
        }

        const { error } = await addVideoFn(data)
        if (error && "message" in error) {
            ShowToastify({ error: error?.message })
            return
        }
        ShowToastify({ success: 'Successfully add your video' })
    };

    return (
        <section className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
            <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-lg">
                <h1 className="text-xl md:text-2xl font-bold text-gray-800 text-center mb-6">
                    Add Your Video for Landing Page
                </h1>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="form-group">
                        <label htmlFor="title" className="block text-gray-700 font-medium">Title</label>
                        <input
                            type="text"
                            {...register("title", { required: result ? false  : true })}
                            defaultValue={result ? result?.title : ""}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                        {errors.title && <span className="text-red-500 text-sm">This field is required</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="embeddedLink" className="block text-gray-700 font-medium">Embedded Link</label>
                        <input
                            type="text"
                            {...register("embedLink", { required: result ? false  : true })}
                            defaultValue={result ? result?.embedLink : ""}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                        {errors.embedLink && <span className="text-red-500 text-sm">This field is required</span>}
                    </div>
                    <div className="form-group flex items-center gap-2">
                        <input
                            type="checkbox"
                            {...register("isFeatured")}
                            defaultChecked={result?.isFeatured ? true : false}
                            className="h-5 w-5 text-blue-500"
                        />
                        <label htmlFor="checked" className="text-gray-700 font-medium">Featured</label>
                    </div>
                    {errors.isFeatured && <span className="text-red-500 text-sm">This field is required</span>}
                    <button
                        type="submit"
                        disabled={isLoading || updateLoading}
                        className="w-full bg-primary text-white p-3 rounded-lg font-medium hover:bg-primary/50 transition duration-300"
                    >
                        {isLoading || updateLoading ? "loading" : 'Submit'}
                    </button>
                </form>
            </div>
            <ToastContainer></ToastContainer>
        </section>
    );
};

export default AddVideo;
