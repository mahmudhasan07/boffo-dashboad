'use client'
import OrderTable from './OrderTable';
import { useGetOrdersQuery } from '@/Redux/Api/baseApi';
import React, { useState } from 'react';

const Transaction = () => {
    const [orderId, setOrderId] = useState("");
    const [page, setPage] = useState<number>(1);
    const limit = 20;
    const { result, loading, pages } = useGetOrdersQuery({ id: orderId, page, limit }, {
        selectFromResult: ({ data, isLoading }) => ({
            result: data?.data,
            loading: isLoading,
            pages: data?.data?.meta?.total
        })
    });

    const button = result && [...Array(Math.ceil(pages / limit)).keys()];

    // console.log(Math.ceil(pages / limit));
    
    const orders = result || [];

    const handleSearch = () => {


    }

    return (
        <div className='p-10 relative'>
            <h1 className='text-3xl font-semibold text-center mb-8'>Order Details</h1>
            <div className='my-5 flex justify-end gap-2'>
                <input onChange={(e) => setOrderId(e.target.value)} className='p-1 border rounded-lg w-60' placeholder='enter your order ID'></input>
                <button onClick={handleSearch} className='px-4 py-1 bg-primary text-white rounded-xl'>Search</button>
            </div>
            <OrderTable orders={orders} isLoading={loading} />
            <div className="flex justify-center gap-5 mt-5">
                {
                    button && button.map((item: string, index: number) =>
                        <button onClick={() => setPage(index + 1)} className='border-2 px-3 py-1 rounded-lg border-primary/50 text-primary text-lg font-bold' key={index}>{item + 1}</button>)
                }
            </div>
        </div>
    );
};

export default Transaction;  