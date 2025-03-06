'use client'
import { useGetAllReportsQuery } from '@/Redux/Api/reportApi';
import React, { useState } from 'react';
import Loader from '../Loader/Loader';

interface Report {
    id: string;
    name: string;
    email: string;
    orderId: string;
    message: string;
    createdAt: string;
    images?: string[]; // Assuming the report has an array of image URLs
}

const AllReports = () => {
    const { result, loading } = useGetAllReportsQuery("", {
        selectFromResult: ({ data, isLoading }) => ({
            result: data?.data?.data,
            loading: isLoading
        })
    });

    const [selectedImages, setSelectedImages] = useState<string[] | null>(null);

    return (
        <section className='my-10'>
            <h1 className='text-3xl text-center font-semibold my-5'>All Reports</h1>
            <div className="overflow-x-auto px-3">
                {
                    loading ? <Loader /> :
                    <table className="min-w-full bg-white border border-gray-300">
                        <thead>
                            <tr className="bg-gray-200 text-gray-700 uppercase text-sm">
                                <th className="px-4 py-2 border">Name</th>
                                <th className="px-4 py-2 border">Email</th>
                                <th className="px-4 py-2 border">Order ID</th>
                                <th className="px-4 py-2 border">Message</th>
                                <th className="px-4 py-2 border">Images</th>
                                <th className="px-4 py-2 border">Created At</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                result?.map((report: Report) => (
                                    <tr key={report.id} className="border hover:bg-gray-100">
                                        <td className="px-4 py-2 border">{report.name}</td>
                                        <td className="px-4 py-2 border">{report.email}</td>
                                        <td className="px-4 py-2 border">{report.orderId}</td>
                                        <td className="px-4 py-2 border">{report.message}</td>
                                        <td className="px-4 py-2 border text-center">
                                            <button 
                                                onClick={() => setSelectedImages(report.images || [])}
                                                className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
                                                View
                                            </button>
                                        </td>
                                        <td className="px-4 py-2 border">{new Date(report.createdAt).toLocaleString()}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                }
            </div>

            {/* Modal for images */}
            {selectedImages && (
                <div className="fixed inset-0 bg-black/50  flex justify-center items-center">
                    <div className="bg-white p-5 rounded-lg shadow-lg max-w-lg w-full">
                        <h2 className="text-xl font-semibold mb-4">Report Images</h2>
                        <div className="grid grid-cols-2 gap-4">
                            {selectedImages.length > 0 ? (
                                selectedImages.map((image, index) => (
                                    <img 
                                        key={index} 
                                        src={image} 
                                        alt={`Report Image ${index + 1}`} 
                                        className="w-full h-32 object-cover rounded-md"
                                    />
                                ))
                            ) : (
                                <p className="text-gray-500">No images available</p>
                            )}
                        </div>
                        <button 
                            onClick={() => setSelectedImages(null)}
                            className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                            Close
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
};

export default AllReports;
