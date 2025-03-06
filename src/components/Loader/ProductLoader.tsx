'use client'
import React from 'react';

const ProductLoader = () => {
    return (
        <div className="border p-5 bg-primary/10 border-primary rounded-lg space-y-2 animate-pulse">
            <div className="h-6 bg-gray-300 rounded w-3/4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/3"></div>
            <div className="w-full h-64 bg-gray-300 rounded-md"></div>
            <div className="flex gap-2">
                <div className="w-full h-8 bg-gray-300 rounded-lg"></div>
                <div className="w-full h-8 bg-gray-300 rounded-lg"></div>
            </div>
        </div>
    );
};

export default ProductLoader;