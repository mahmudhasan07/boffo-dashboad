/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import React from 'react';

const ModalData = ({ address, userInfo }: { address: any, userInfo: any }) => {
    return (
        <section className='space-y-3 text-xl'>
            {/* <h1><span className='font-semibold'>Name: </span>{userInfo?.name}</h1> */}
            <h1><span className='font-semibold'>Email: </span>{userInfo?.email}</h1>
            <h1><span className='font-semibold'>User Details: </span>{address.split(',').map((e: string, idx: number) =>
                <p key={idx}>{e}</p>

            )}</h1>
        </section>
    );
};

export default ModalData;