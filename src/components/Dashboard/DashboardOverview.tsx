'use client';

import { useState } from "react";
import DeliveryChart from "@/components/allchart/CompletedChart";
import LineChart from "@/components/allchart/LineChart";
import CountUp from "react-countup";
import CompletedChart from "@/components/allchart/CompletedChart";
import { useGetOrdersQuery } from "@/Redux/Api/baseApi";

export default function DashboardOverview() {
  const [selectedValue, setSelectedValue] = useState<string>('this-month');
  
  const { data: orderData, isLoading } = useGetOrdersQuery("");

  const orders = orderData && orderData?.data || [];
  const totalOrders = orderData && orderData?.meta?.total || 0;
  const completedOrders = orderData && orders.filter((order: { status: string; }) => order.status === "COMPLETED").length;
  const pendingOrders = orderData && orders.filter((order: { status: string; }) => order.status === "PENDING").length;

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(event.target.value);
  };

  return (
    <div className="pt-8 pb-32 lg:px-0 px-3">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
          {/* Card 1 */}
          <div className="w-full bg-white rounded-xl shadow-md">
            <div className="relative p-6 border-2 h-full rounded-xl">
              <div className="space-y-4 font-poppins">
                <h3 className="text-xl font-medium text-gray-900">Total Order Created</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-[32px] font-bold tracking-tight">
                    <CountUp end={totalOrders} />
                  </span>
                  <span className="text-lg text-gray-500">Orders</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="w-full bg-white l rounded-xl shadow-md">
            <div className="relative p-6 border-2 h-ful rounded-xl">
              <div className="space-y-4 font-poppins">
                <h3 className="text-xl font-medium text-gray-900">Total Completed Order</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-[32px] font-bold tracking-tight">
                    <CountUp end={completedOrders} />
                  </span>
                  <span className="text-lg text-gray-500">Orders</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="w-full bg-white rounded-xl shadow-md">
            <div className="relative p-6 border-2 h-ful rounded-xl">
              <div className="space-y-4 font-poppins">
                <h3 className="text-xl font-medium text-gray-900">Total Pending Order</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-[32px] font-bold tracking-tight">
                    <CountUp end={pendingOrders} duration={3} />
                  </span>
                  <span className="text-lg text-gray-500">Orders</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Chart Section */}
        <div className="mt-8">
          <CompletedChart totalEvent={totalOrders} completedEvent={completedOrders} />
        </div>
        <div className="mt-8">
          <LineChart />
        </div>
      </div>
    </div>
  );
}
