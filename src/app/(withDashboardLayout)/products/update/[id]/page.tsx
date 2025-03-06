'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSingleProductQuery, useUpdateProductMutation } from '@/Redux/Api/productApi';
import ShowToastify from '@/utils/ShowToastify';
import { ToastContainer } from 'react-toastify';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';

const schema = z.object({
  price: z
    .number({ invalid_type_error: 'Price must be a number' })
    .positive('Price must be greater than zero'),
  stock: z
    .number({ invalid_type_error: 'Stock must be a number' })
    .nonnegative('Stock must be a non-negative number'),

  discountPrice: z.number()
    .nonnegative('Stock must be a non-negative number').optional(),
});

type FormData = z.infer<typeof schema>;

export default function UpdateProduct() {
  const { id } = useParams();
  const router = useRouter();
  const { data: productData, isLoading } = useSingleProductQuery(id);
  const [updateProduct] = useUpdateProductMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (productData?.data) {
      reset({
        price: productData.data.price,
        stock: productData.data.stock,
        discountPrice: productData.data.discountPrice,
      });
    }
  }, [productData, reset]);



  const onSubmit = async (data: FormData) => {
    try {
      const response = await updateProduct({
        id,
        data: {
          price: data.price,
          stock: data.stock,
          discountPrice: data?.discountPrice
        },
      });

      if ('error' in response) {
        ShowToastify({ error: 'Failed to update product' });
      } else {
        ShowToastify({ success: 'Product updated successfully' });
        router.push('/all-products');
      }
    } catch (error) {
      ShowToastify({ error: 'An error occurred while updating the product' });
    }
  };

  if (isLoading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (!productData?.data) {
    return <div className="text-center py-10">Product not found</div>;
  }

  return (
    <div className="p-6 mx-auto rounded-lg">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Update Product</h1>

        {/* Product Info Display */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="relative w-full h-60 border border-gray-300 rounded-lg overflow-hidden">
              <Image
                src={productData.data.thumbnail}
                alt={productData.data.title}
                fill
                className="object-cover"
              />
            </div>
            <h2 className="text-xl font-semibold">{productData.data.title}</h2>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-600">Category: {productData.data.category}</p>
              <p className="text-gray-600">Brand: {productData.data.brand}</p>
              <p className="text-gray-600">Color: {productData.data.color}</p>
              <p className="text-gray-600">Size: {productData.data.size.join(', ')}</p>
            </div>
            <p className="text-gray-600">{productData.data.description}</p>
          </div>
        </div>

        {/* Update Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price ($)
              </label>
              <input
                {...register('price', { valueAsNumber: true })}
                type="number"
                step="0.01"
                className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
              />
              {errors.price && (
                <p className="mt-1 text-red-500 text-sm">{errors.price.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Stock
              </label>
              <input
                {...register('stock', { valueAsNumber: true })}
                type="number"
                className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
              />
              {errors.stock && (
                <p className="mt-1 text-red-500 text-sm">{errors.stock.message}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Discount Price
            </label>
            <input
              {...register('discountPrice', { valueAsNumber: true })}
              type="number"
              // onChange={(e) => handleChange(parseFloat(e.target.value))}
              placeholder='enter the number of percentage'
              className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
            />
            {errors.stock && (
              <p className="mt-1 text-red-500 text-sm">{errors.stock.message}</p>
            )}
          </div>
          {/* <p className='text-gray-600'>New price will be : {newPrice}</p> */}

          <div className="flex gap-4">
            <button
              type="submit"
              className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/80 transition-colors"
            >
              Update Product
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}
