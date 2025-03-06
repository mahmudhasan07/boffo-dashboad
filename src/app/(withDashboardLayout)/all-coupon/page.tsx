// import AllCoupon from "@/components/Dashboard/components/All Coupon/AllCoupon";

import AllCoupon from "@/components/All Coupon/AllCoupon";

export default function Page() {
    return (
        <div className="my-10">
            <h1 className="md:text-3xl text-xl font-bold text-center">All available coupons</h1>
            <AllCoupon></AllCoupon>
        </div>
    );
}