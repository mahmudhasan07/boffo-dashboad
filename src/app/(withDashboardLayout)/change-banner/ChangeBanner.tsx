"use client"
import { useGetBannerQuery, useSetBannerMutation } from '@/Redux/Api/bannerApi';
import ShowToastify from '@/utils/ShowToastify';
import Image from 'next/image';
import React, { ChangeEvent, useState } from 'react';
import { MdDelete } from 'react-icons/md';
import { ToastContainer } from 'react-toastify';

const ChangeBanner = () => {

    const [bannerImage, setBannerImage] = useState<string>("");
    const [bannerImageFile, setBannerImageFile] = useState<File>();
    const [musicImage, setMusicImage] = useState<string>("");
    const [musicImageFile, setMusicImageFile] = useState<File>();
    const [apparelImage, setApparelImage] = useState<string>("");
    const [apparelImageFile, setApparelImageFile] = useState<File>();
    const [accessoriesImage, setAccessoriesImage] = useState<string>("");
    const [accessoriesImageFile, setAccessoriesImageFile] = useState<File>();
    const [logoImage, setLogoImage] = useState<string>("");
    const [logoImageFile, setLogoImageFile] = useState<File>();

    const [setBannerFn] = useSetBannerMutation()

    const { bannerResult, loading1 } = useGetBannerQuery("banner", {
        selectFromResult: ({ data, isLoading }) => ({
            bannerResult: data?.data?.data[0],
            loading1: isLoading
        })
    })
    const { musicResult, loading2 } = useGetBannerQuery("music", {
        selectFromResult: ({ data, isLoading }) => ({
            musicResult: data?.data?.data[0],
            loading2: isLoading
        })
    })
    const { apparelResult, loading3 } = useGetBannerQuery("apparel", {
        selectFromResult: ({ data, isLoading }) => ({
            apparelResult: data?.data?.data[0],
            loading3: isLoading
        })
    })
    const { accessoriesResult, loading4 } = useGetBannerQuery("accessories", {
        selectFromResult: ({ data, isLoading }) => ({
            accessoriesResult: data?.data?.data[0],
            loading4: isLoading
        })
    })
    const { logoResult, loading5 } = useGetBannerQuery("logo", {
        selectFromResult: ({ data, isLoading }) => ({
            logoResult: data?.data?.data[0],
            loading5: isLoading
        })
    })

    const handleBannerUpload = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            console.log(e.target.files[0]);
            setBannerImageFile(e.target.files[0]);
            setBannerImage(URL.createObjectURL(e.target.files[0]));
        }
    };

    const handleBannerSubmit = async () => {
        if (!bannerImageFile) {
            ShowToastify({ error: "Please select an image to upload" });
            return;
        }

        const formData = new FormData();
        formData.append("image", bannerImageFile);
        formData.append("category", "banner");

        formData.forEach((value, key) => {
            console.log(key, value);
        });

        const { error } = await setBannerFn(formData);
        if (error) {
            ShowToastify({ error: "Fail to upload image" });
            return;
        }

        ShowToastify({ success: "Successfully uploaded image" });
    };
    const handleMusicUpload = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            console.log(e.target.files[0]);
            setMusicImageFile(e.target.files[0]);
            setMusicImage(URL.createObjectURL(e.target.files[0]));
        }
    };

    const handleMusicSubmit = async () => {
        if (!musicImageFile) {
            ShowToastify({ error: "Please select an image to upload" });
            return;
        }

        const formData = new FormData();
        formData.append("image", musicImageFile);
        formData.append("category", "music");

        formData.forEach((value, key) => {
            console.log(key, value);
        });

        const { error } = await setBannerFn(formData);
        if (error) {
            ShowToastify({ error: "Fail to upload image" });
            return;
        }

        ShowToastify({ success: "Successfully uploaded image" });
    };
    const handleApparelUpload = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            console.log(e.target.files[0]);
            setApparelImageFile(e.target.files[0]);
            setApparelImage(URL.createObjectURL(e.target.files[0]));
        }
    };

    const handleApparelSubmit = async () => {
        if (!apparelImageFile) {
            ShowToastify({ error: "Please select an image to upload" });
            return;
        }

        const formData = new FormData();
        formData.append("image", apparelImageFile);
        formData.append("category", "apparel");

        formData.forEach((value, key) => {
            console.log(key, value);
        });

        const { error } = await setBannerFn(formData);
        if (error) {
            ShowToastify({ error: "Fail to upload image" });
            return;
        }

        ShowToastify({ success: "Successfully uploaded image" });
    };
    const handleAccessoriesUpload = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            console.log(e.target.files[0]);
            setAccessoriesImageFile(e.target.files[0]);
            setAccessoriesImage(URL.createObjectURL(e.target.files[0]));
        }
    };

    const handleAccessoriesSubmit = async () => {
        if (!accessoriesImageFile) {
            ShowToastify({ error: "Please select an image to upload" });
            return;
        }

        const formData = new FormData();
        formData.append("image", accessoriesImageFile);
        formData.append("category", "accessories");

        formData.forEach((value, key) => {
            console.log(key, value);
        });

        const { error } = await setBannerFn(formData);
        if (error) {
            ShowToastify({ error: "Fail to upload image" });
            return;
        }

        ShowToastify({ success: "Successfully uploaded image" });
    };
    const handleLogoUpload = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            console.log(e.target.files[0]);
            setLogoImageFile(e.target.files[0]);
            setLogoImage(URL.createObjectURL(e.target.files[0]));
        }
    };

    const handleLogoSubmit = async () => {
        if (!logoImageFile) {
            ShowToastify({ error: "Please select an image to upload" });
            return;
        }

        const formData = new FormData();
        formData.append("image", logoImageFile);
        formData.append("category", "logo");

        formData.forEach((value, key) => {
            console.log(key, value);
        });

        const { error } = await setBannerFn(formData);
        if (error) {
            ShowToastify({ error: "Fail to upload image" });
            return;
        }

        ShowToastify({ success: "Successfully uploaded image" });
    };




    return (

        <section className='w-1/2 mx-auto mt-10'>
            <div>
                <div>
                    <h1 className='text-2xl font-semibold my-3'>Preview Image for Banner</h1>
                    {
                        loading1 ?
                            "loading"
                            :
                            bannerResult && bannerResult?.image ? (
                                <Image src={bannerResult.image} width={300} height={300} className='w-96' alt='banner_image' />
                            ) : (
                                <p>No image available</p>
                            )

                    }
                </div>
                <div>
                    {
                        bannerImage ?
                            <div className="relative w-full h-96 border border-gray-300 rounded-lg overflow-hidden">
                                <Image
                                    src={bannerImage}
                                    alt="Thumbnail Preview"
                                    width={300}
                                    height={500}
                                    className="w-full h-full object-cover"
                                />
                                <button
                                    className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full shadow-lg hover:bg-red-600 transition"
                                    type="button"
                                    onClick={() => setBannerImage("")}
                                >
                                    <MdDelete size={24} />
                                </button>
                            </div>
                            :
                            <div>
                                <h1 className="text-2xl font-semibold mb-2 text-center"> Banner Image</h1>
                                <label className="flex flex-col items-center justify-center w-full h-60 border-2 border-dashed border-gray-400 rounded-lg cursor-pointer hover:border-gray-600 transition">
                                    <span className="text-gray-600">Drag and drop or</span>
                                    <span className="mt-2 px-4 py-2 bg-primary text-white rounded-lg">
                                        Select
                                    </span>
                                    <input
                                        type="file"
                                        // accept="image/*"
                                        className="hidden"
                                        onChange={handleBannerUpload}
                                    />
                                    {/* <input type="file" /> */}
                                </label>
                            </div>
                    }

                    <div>
                        <button onClick={handleBannerSubmit} className=" mt-8 bg-primary text-white py-1 px-3   rounded-lg shadow-lg hover:bg-red-600 transition">Submit</button>
                    </div>
                </div>
            </div>
            <div>
                <div>
                    <h1 className='text-2xl font-semibold my-3'>Preview Image for Music</h1>
                    {
                        loading2 ?
                            "loading"
                            :
                            musicResult && musicResult?.image ? (
                                <Image src={musicResult.image} width={300} height={300} className='w-96' alt='banner_image' />
                            ) : (
                                <p>No image available</p>
                            )

                    }
                </div>
                <div>
                    {
                        musicImage ?
                            <div className="relative w-full h-96 border border-gray-300 rounded-lg overflow-hidden">
                                <Image
                                    src={musicImage}
                                    alt="Thumbnail Preview"
                                    width={300}
                                    height={500}
                                    className="w-full h-full object-cover"
                                />
                                <button
                                    className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full shadow-lg hover:bg-red-600 transition"
                                    type="button"
                                    onClick={() => setMusicImage("")}
                                >
                                    <MdDelete size={24} />
                                </button>
                            </div>
                            :
                            <div>
                                <h1 className="text-2xl font-semibold mb-2 text-center"> Banner Image</h1>
                                <label className="flex flex-col items-center justify-center w-full h-60 border-2 border-dashed border-gray-400 rounded-lg cursor-pointer hover:border-gray-600 transition">
                                    <span className="text-gray-600">Drag and drop or</span>
                                    <span className="mt-2 px-4 py-2 bg-primary text-white rounded-lg">
                                        Select
                                    </span>
                                    <input
                                        type="file"
                                        // accept="image/*"
                                        className="hidden"
                                        onChange={handleMusicUpload}
                                    />
                                    {/* <input type="file" /> */}
                                </label>
                            </div>
                    }

                    <div>
                        <button onClick={handleMusicSubmit} className=" mt-8 bg-primary text-white py-1 px-3   rounded-lg shadow-lg hover:bg-red-600 transition">Submit</button>
                    </div>
                </div>
            </div>
            <div>
                <div>
                    <h1 className='text-2xl font-semibold my-3'>Preview Image for Apparel</h1>
                    {
                        loading3 ?
                            "loading"
                            :
                            apparelResult && apparelResult?.image ? (
                                <Image src={apparelResult.image} width={300} height={300} className='w-96' alt='banner_image' />
                            ) : (
                                <p>No image available</p>
                            )

                    }
                </div>
                <div>
                    {
                        apparelImage ?
                            <div className="relative w-full h-96 border border-gray-300 rounded-lg overflow-hidden">
                                <Image
                                    src={apparelImage}
                                    alt="Thumbnail Preview"
                                    width={300}
                                    height={500}
                                    className="w-full h-full object-cover"
                                />
                                <button
                                    className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full shadow-lg hover:bg-red-600 transition"
                                    type="button"
                                    onClick={() => setApparelImage("")}
                                >
                                    <MdDelete size={24} />
                                </button>
                            </div>
                            :
                            <div>
                                <h1 className="text-2xl font-semibold mb-2 text-center"> Banner Image</h1>
                                <label className="flex flex-col items-center justify-center w-full h-60 border-2 border-dashed border-gray-400 rounded-lg cursor-pointer hover:border-gray-600 transition">
                                    <span className="text-gray-600">Drag and drop or</span>
                                    <span className="mt-2 px-4 py-2 bg-primary text-white rounded-lg">
                                        Select
                                    </span>
                                    <input
                                        type="file"
                                        // accept="image/*"
                                        className="hidden"
                                        onChange={handleApparelUpload}
                                    />
                                    {/* <input type="file" /> */}
                                </label>
                            </div>
                    }

                    <div>
                        <button onClick={handleApparelSubmit} className=" mt-8 bg-primary text-white py-1 px-3   rounded-lg shadow-lg hover:bg-red-600 transition">Submit</button>
                    </div>
                </div>
            </div>
            <div>
                <div>
                    <h1 className='text-2xl font-semibold my-3'>Preview Image for Accessories</h1>
                    {
                        loading4 ?
                            "loading"
                            :
                            accessoriesResult && accessoriesResult?.image ? (
                                <Image src={accessoriesResult.image} width={300} height={300} className='w-96' alt='banner_image' />
                            ) : (
                                <p>No image available</p>
                            )

                    }
                </div>
                <div>
                    {
                        accessoriesImage ?
                            <div className="relative w-full h-96 border border-gray-300 rounded-lg overflow-hidden">
                                <Image
                                    src={accessoriesImage}
                                    alt="Thumbnail Preview"
                                    width={300}
                                    height={500}
                                    className="w-full h-full object-cover"
                                />
                                <button
                                    className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full shadow-lg hover:bg-red-600 transition"
                                    type="button"
                                    onClick={() => setAccessoriesImage("")}
                                >
                                    <MdDelete size={24} />
                                </button>
                            </div>
                            :
                            <div>
                                <h1 className="text-2xl font-semibold mb-2 text-center"> Banner Image</h1>
                                <label className="flex flex-col items-center justify-center w-full h-60 border-2 border-dashed border-gray-400 rounded-lg cursor-pointer hover:border-gray-600 transition">
                                    <span className="text-gray-600">Drag and drop or</span>
                                    <span className="mt-2 px-4 py-2 bg-primary text-white rounded-lg">
                                        Select
                                    </span>
                                    <input
                                        type="file"
                                        // accept="image/*"
                                        className="hidden"
                                        onChange={handleAccessoriesUpload}
                                    />
                                    {/* <input type="file" /> */}
                                </label>
                            </div>
                    }

                    <div>
                        <button onClick={handleAccessoriesSubmit} className=" mt-8 bg-primary text-white py-1 px-3   rounded-lg shadow-lg hover:bg-red-600 transition">Submit</button>
                    </div>
                </div>
            </div>
            <div>
                <div>
                    <h1 className='text-2xl font-semibold my-3'>Preview Image for Logo</h1>
                    {
                        loading5 ?
                            "loading"
                            :
                            logoResult && logoResult?.image ? (
                                <Image src={logoResult.image} width={300} height={300} className='w-96' alt='banner_image' />
                            ) : (
                                <p>No image available</p>
                            )

                    }
                </div>
                <div>
                    {
                        logoImage ?
                            <div className="relative w-full h-96 border border-gray-300 rounded-lg overflow-hidden">
                                <Image
                                    src={logoImage}
                                    alt="Thumbnail Preview"
                                    width={300}
                                    height={500}
                                    className="w-full h-full object-cover"
                                />
                                <button
                                    className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full shadow-lg hover:bg-red-600 transition"
                                    type="button"
                                    onClick={() => setAccessoriesImage("")}
                                >
                                    <MdDelete size={24} />
                                </button>
                            </div>
                            :
                            <div>
                                <h1 className="text-2xl font-semibold mb-2 text-center"> Banner Image</h1>
                                <label className="flex flex-col items-center justify-center w-full h-60 border-2 border-dashed border-gray-400 rounded-lg cursor-pointer hover:border-gray-600 transition">
                                    <span className="text-gray-600">Drag and drop or</span>
                                    <span className="mt-2 px-4 py-2 bg-primary text-white rounded-lg">
                                        Select
                                    </span>
                                    <input
                                        type="file"
                                        // accept="image/*"
                                        className="hidden"
                                        onChange={handleLogoUpload}
                                    />
                                    {/* <input type="file" /> */}
                                </label>
                            </div>
                    }

                    <div>
                        <button onClick={handleLogoSubmit} className=" mt-8 bg-primary text-white py-1 px-3   rounded-lg shadow-lg hover:bg-red-600 transition">Submit</button>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </section>

    );
};

export default ChangeBanner;