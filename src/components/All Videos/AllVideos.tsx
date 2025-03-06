'use client'
import { useDeleteVideoMutation, useGetVideoQuery } from '@/Redux/Api/videoApi';
import ShowToastify from '@/utils/ShowToastify';
import { useRouter } from 'next/navigation';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import ProductLoader from '../Loader/ProductLoader';

const AllVideos = () => {
    const [deleteFn] = useDeleteVideoMutation()
    const route = useRouter()
    const { result, loading } = useGetVideoQuery("", {
        selectFromResult: ({ data, isLoading }) => ({
            result: data?.data?.data,
            loading: isLoading
        })
    })

    const handleDeleteVideo = async (id: string) => {
        const { error } = await deleteFn(id)
        if (error && "message" in error) {
            ShowToastify({ error: error?.message })
            return
        }
        ShowToastify({ success: "Video delete successful" })
    }


    return (
        <section className='my-10'>
            <h1 className='text-3xl  text-center font-semibold my-5'>All Videos</h1>
            <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 lg:w-11/12 mx-auto'>
                {
                    loading ?
                        <ProductLoader></ProductLoader>
                        :
                        result?.length > 0 ?
                            result?.map((e: { title: string, embedLink: string, isFeatured: boolean, id: string }, idx: number) =>
                                <div key={idx} className='border p-5 bg-primary/10 border-primary rounded-lg  space-y-2'>
                                    <h1 className='text-xl font-semibold'>{e?.title}</h1>
                                    <p className='font-semibold'>isFeatured:  {e?.isFeatured ? "True" : "False"}</p>
                                    <iframe className='w-full h-64 rounded-md' src={e?.embedLink}></iframe>
                                    <div className='flex gap-2'>
                                        <button onClick={() => route.push(`add-video?video=${e?.id}`)} className='w-full py-1 bg-primary text-white font-semibold rounded-lg'>Update</button>
                                        <button onClick={() => handleDeleteVideo(e?.id)} className='w-full py-1 bg-primary rounded-lg text-white font-semibold'>Delete</button>
                                    </div>
                                </div>
                            )
                            :
                            "No Data Found"
                }
            </div>
            <ToastContainer></ToastContainer>
        </section>
    );
};

export default AllVideos;