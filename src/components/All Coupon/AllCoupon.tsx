'use client'
import Loader from '@/components/Loader/Loader';
import { useDeleteCouponMutation, useGetCouponQuery } from '@/Redux/Api/couponApi';
import { useRouter } from 'next/navigation';
import React from 'react';
import Swal from 'sweetalert2';

const AllCoupon = () => {

    const route = useRouter()

    const { result, loading } = useGetCouponQuery("", {
        selectFromResult: ({ data, isLoading }) => ({
            result: data?.data,
            loading: isLoading
        })
    })

    const [deleteFn] = useDeleteCouponMutation()

    const handleDelete = async (e: string) => {
        Swal.fire({
                    title: "Are you sure?",
                    // text: "You won't be able to revert this!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes, delete it!"
                }).then(async (result) => {
        
                    const { error, data } = await deleteFn(e)
        
                    if (data) {
                        if (result.isConfirmed) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                    }
        
                    if (error) {
                        
                        Swal.fire({
                            title: "Unsuccessful",
                            text: "Your file has not deleted.",
                            icon: "error"
                        });
                    }
        
        
                });
    }



    return (
        <div className="overflow-x-auto shadow-lg rounded-lg">
            <table className="min-w-full bg-white table-auto">
                <thead>
                    <tr className="text-left bg-gray-200">
                        <th className="px-4 py-2 font-semibold text-center text-gray-700">Code</th>
                        <th className="px-4 py-2 font-semibold text-center text-gray-700">Percentage</th>
                        <th className="px-4 py-2 font-semibold text-center text-gray-700">Actions</th>
                    </tr>
                </thead>
                {loading ? (
                    <tbody>
                        <tr>
                            <td colSpan={3} className="text-center">
                                <Loader />
                            </td>
                        </tr>
                    </tbody>
                ) : (
                    <tbody>
                        {result?.length > 0 ? (
                            result.map((item: { id: string, code: string, percentage: number }) => (
                                <tr key={item.id} className="border-t text-center mx-auto">
                                    <td className="px-4 py-2">{item.code}</td>
                                    <td className="px-4 py-2">{item.percentage}%</td>
                                    <td className="px-4 py-2 flex justify-center space-x-2">
                                        <button onClick={()=> route.push(`add-coupon?coupon=${item?.id}`)} className="bg-primary rounded-lg text-white px-4 py-1 font-semibold">Update</button>
                                        <button onClick={() => handleDelete(item.id)} className="bg-primary rounded-lg text-white px-4 py-1 font-semibold">Delete</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={3} className="text-center">
                                    No coupon found
                                </td>
                            </tr>
                        )}
                    </tbody>
                )}
            </table>
        </div>
    );
};

export default AllCoupon;