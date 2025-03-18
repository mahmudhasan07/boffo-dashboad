"use client"
import React, { useState } from 'react'
import { useAllProductsQuery } from '@/Redux/Api/productApi'
import Loader from '../Loader/Loader'
import ProductTable from '../Table/ProductTable'

const AllProducts = () => {
    const [page, setPage] = useState<number>(1);
    const limit = 10;

    const { result, isLoading, totalPages } = useAllProductsQuery({ page, limit },
        {
            selectFromResult: ({ data, isLoading }) => ({
                result: data?.data,
                isLoading: isLoading,
                totalPages : data?.meta?.totalPage
            })
        }
    )

    console.log(result);
    

    // const totalPages = result?.meta?.total ? Math.ceil(result.meta.total / limit) : 0;
    const buttons = [...Array(totalPages).keys()];

    return (
        <div className='my-10'>
            <h1 className='text-3xl font-semibold text-center my-5'>All Products</h1>
            <div className=' lg:px-10 md:px-7 px-4'>
                {
                    isLoading ?
                        <Loader></Loader>
                        :
                        result?.length > 0 ?
                            <div>
                                <ProductTable 
                                    products={result} 
                                    isLoading={isLoading} 
                                    serial={(page * limit) - limit}
                                />
                                <div className="flex justify-center gap-5 mt-5">
                                    {
                                        buttons.map((item: number, index: number) =>
                                            <button 
                                                onClick={() => setPage(index + 1)} 
                                                className={`border-2 px-3 py-1 rounded-lg border-primary/50 text-primary text-lg font-bold ${page === index + 1 ? 'bg-primary text-white' : ''}`} 
                                                key={index}
                                            >
                                                {item + 1}
                                            </button>
                                        )
                                    }
                                </div>
                            </div>
                            :
                            <h1 className='text-center text-lg mt-5'>No Product Found</h1>
                }
            </div>
        </div>
    )
}

export default AllProducts;