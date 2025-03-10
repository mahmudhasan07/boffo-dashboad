import React, { useState } from "react";
import { motion } from "framer-motion";
import Loader from "../../../components/Loader/Loader";
import { useSingleUserQuery } from "@/Redux/Api/userApi";
import { useUpdateOrderStatusMutation } from "@/Redux/Api/baseApi";
import ShowToastify from "@/utils/ShowToastify";
import { FaEye } from "react-icons/fa";
import ModalData from "@/components/ModalData/ModalData";
import { createPortal } from "react-dom";
import Image from "next/image";

interface Order {
  id: string;
  paymentId: string;
  status: string;
  totalPrice: number;
  items: item[];
  info: any;
  paymentType: string;
  createdAt?: string;
  billingAddress?: string;
}

interface item {
  quantity: string;
  size: string;
  productDetails: {
    quantity: number;
    name: string;
    thumbnailImage: string;
    color: string;
    size: string;
  };
}

interface OrderTableProps {
  orders: any;
  isLoading: boolean;
}

const OrderModal = ({
  order,
  userData,
  onClose,
}: {
  order: Order;
  userData?: any;
  onClose: () => void;
}) => {
  if (typeof window === "undefined") return null;

  console.log(order?.items[0]?.productDetails?.thumbnailImage);

  return createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-[90%] max-w-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Order Details</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        <div>
          <h1 className="text-xl font-semibold ">Products:</h1>
          {order?.items.map((item, idx) => (
            <div key={idx} className="grid grid-cols-3 border p-2 rounded-lg">
              <Image
                width={70}
                height={45}
                className="my-auto md:w-24 md:h-20  object-cover mx-auto rounded-lg"
                src={item?.productDetails?.thumbnailImage}
                alt="Product Image"
              ></Image>
              <p className="font-semibold w-full my-auto">
                {item?.productDetails?.name}
              </p>
              <p className="font-semibold w-full my-auto">
                <span className="font-semibold">Color: </span>
                <br />
                {item?.productDetails?.color}
              </p>
              <p className="font-semibold text-center my-auto">
                <span className="font-semibold">Size: </span>
                <br />
                {item?.size}
              </p>
              <p className="my-auto text-center">
                <span className=" font-semibold">Quantity</span> <br />
                {item?.quantity}
              </p>
            </div>
          ))}
        </div>
        <ModalData address={order?.info} />
        <div className="mt-4 space-y-2">
          <p>
            <span className="font-semibold">Payment Amount:</span> $
            {order.totalPrice.toFixed(2)}
          </p>
          <p>
            <span className="font-semibold">Date:</span>{" "}
            {new Date(order.createdAt || "").toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>,
    document.body
  );
};

const OrderRow = ({ order }: { order: Order }) => {
  const [updateOrderStatus] = useUpdateOrderStatusMutation();
  const [showModal, setShowModal] = useState(false);

  const handleStatusChange = async (newStatus: string) => {
    try {
      await updateOrderStatus({ id: order.id, status: newStatus }).unwrap();
      ShowToastify({ success: "Order status updated successfully" });
    } catch (error) {
      ShowToastify({ error: "Failed to update order status" });
    }
  };

  return (
    <>
      <motion.tr
        key={order.id}
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1, transition: { duration: 0.5 } }}
        className="border-b text-center"
      >
        <td className="px-4 text-nowrap py-2">{order?.id}</td>
        <td className="px-4 text-nowrap py-2">{order?.paymentId}</td>
        <td className="px-4 text-nowrap py-2">
          <select
            defaultValue={order.status}
            onChange={(e) => handleStatusChange(e.target.value)}
            className="border rounded px-2 py-1 bg-white"
          >
            <option value="PENDING">PENDING</option>
            <option value="PROGRESS">PROGRESS</option>
            <option value="COMPLETED">COMPLETED</option>
            <option value="CANCELED">CANCELED</option>
          </select>
        </td>
        <td className="px-4 text-nowrap py-2">{order.totalPrice.toFixed(2)}</td>
        <td className="px-4 text-nowrap py-2">{order.paymentType}</td>
        <td className="px-4 text-nowrap py-2">
          <button
            onClick={() => setShowModal(true)}
            className="text-primary  font-bold transition-colors"
          >
            View
          </button>
        </td>
      </motion.tr>
      {showModal && (
        <OrderModal
          order={order}
          // userData={userData}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
};

const OrderTable = ({ orders, isLoading }: OrderTableProps) => {
  return (
    <div className="overflow-x-auto overflow-hidden">
      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 border">Order ID</th>
            <th className="px-4 py-2 border">User Name</th>
            <th className="px-4 py-2 border">Status</th>
            <th className="px-4 py-2 border">Total Amount</th>
            <th className="px-4 py-2 border">Payment Type</th>
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
            orders?.map((order: Order) => (
              <OrderRow key={order.id} order={order} />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;
