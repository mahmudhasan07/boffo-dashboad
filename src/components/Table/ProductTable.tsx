"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Loader from "../Loader/Loader";
import { ProductInterFace } from "@/Interfaces/InterFaces";
import {
  useDeleteProductMutation,
  useUpdateFeaturesMutation,
} from "@/Redux/Api/productApi";
import { MdDelete, MdEdit } from "react-icons/md";
import ShowToastify from "@/utils/ShowToastify";
import { ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const ProductTable = ({
  products,
  isLoading,
  serial,
}: {
  products: ProductInterFace[];
  isLoading: boolean;
  serial: number;
}) => {
  const [deleteProduct] = useDeleteProductMutation();
  const [updateFeatureFn] = useUpdateFeaturesMutation();
  const router = useRouter();

  const handleDelete = async (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#12B76A",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { error } = await deleteProduct(id);
        if (
          error &&
          "data" in error &&
          typeof error.data === "object" &&
          error.data !== null &&
          "message" in error.data
        ) {
          Swal.fire({
            title: "Unsuccessful",
            text: "Your product has not been deleted.",
            icon: "error",
          });
        } else {
          Swal.fire({
            title: "Deleted!",
            text: "Your product has been deleted.",
            icon: "success",
          });
        }
      }
    });
  };

  const handleFeature = async (id: string, feature: boolean) => {
    console.log(id, feature);
    if (feature == false) {
      const { error } = await updateFeatureFn({ id, features: true });
      if (error && "message" in error) {
        console.log(error);
        ShowToastify({ error: error?.message });
        return;
      }
      ShowToastify({ success: "Product is added in features true" });
    } else {
      const { error } = await updateFeatureFn({ id, features: false });
      if (error && "message" in error) {
        console.log(error);
        ShowToastify({ error: error?.message });
        return;
      }
      ShowToastify({ success: "Product is added in features false" });
    }
  };

  const handleEdit = (id: string) => {
    router.push(`/products/update/${id}`);
  };

  return (
    <div className="overflow-x-auto overflow-hidden">
      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 border">Feature</th>
            <th className="px-4 py-2 border">Thumbnail</th>
            <th className="px-4 py-2 border">Title</th>
            <th className="px-4 py-2 border">Category</th>
            <th className="px-4 py-2 border">Price</th>
            <th className="px-4 py-2 border">Stock</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan={5} className="text-center">
                <Loader></Loader>
              </td>
            </tr>
          ) : (
            products?.map((item: ProductInterFace, index: number) => (
              <motion.tr
                initial={{ y: 100 * (index + 1), opacity: 0 }}
                animate={{ y: 0, opacity: 1, transition: { duration: 0.5 } }}
                key={index}
                className="border-b text-center"
              >
                <td className="mx-auto text-center">
                  <input
                    onChange={() => handleFeature(item?.id, item?.isFeature)}
                    defaultChecked={item?.isFeature ? true : false}
                    type="checkbox"
                    className=""
                  />
                </td>
                <td className="px-4 text-nowrap py-2">
                  <div className="w-16 h-16 mx-auto relative">
                    <Image
                      src={item?.thumbnailImage}
                      alt={item?.name}
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                </td>
                <td className="px-4 text-nowrap py-2 text-[20]">
                  {item?.name}
                </td>
                <td className="px-4 text-nowrap py-2">{item?.category}</td>
                <td className="px-4 text-nowrap py-2">tk.{item?.price}</td>
                <td className="px-4 text-nowrap py-2">{item?.stock}</td>
                <td className="px-4 text-nowrap py-2 space-x-2">
                  <button
                    onClick={() => handleEdit(item.id)}
                    className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors inline-block"
                    title="Edit Product"
                  >
                    <MdEdit size={20} />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors inline-block"
                    title="Delete Product"
                  >
                    <MdDelete size={20} />
                  </button>
                </td>
              </motion.tr>
            ))
          )}
        </tbody>
      </table>
      <ToastContainer />
    </div>
  );
};

export default ProductTable;
