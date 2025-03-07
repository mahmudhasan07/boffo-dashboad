/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import React from 'react';

const ModalData = ({ address, userInfo }: { address: any, userInfo?: any }) => {
    return (
        <section className='space-y-3 text-xl'>
            <h1><span className='font-semibold'>Name: </span>{address?.name}</h1>
            <h1><span className='font-semibold'>Email: </span>{address?.email}</h1>
            <h1><span className='font-semibold'>Phone: </span>{address?.phone}</h1>
            <h1><span className='font-semibold'>Address: </span>{address?.address}</h1>
            <h1><span className='font-semibold'>City: </span>{address?.city}</h1>
            <h1><span className='font-semibold'>Thana: </span>{address?.thana}</h1>
            <h1><span className='font-semibold'>PostCode: </span>{address?.postCode}</h1>

        </section>
    );
};

export default ModalData;