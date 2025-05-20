"use client";

import { useEffect,useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { BadgeCheck, IndianRupee } from "lucide-react";

const packages = [
  { id: "basic", name: "Basic Pack", credits: 10, price: 10 },
  { id: "standard", name: "Standard Pack", credits: 50, price: 40 },
  { id: "premium", name: "Premium Pack", credits: 120, price: 100 },
];

export default function TransactionPage() {
  const { addCredits,isLoading, user } = useAuth();
  const router = useRouter();
  const params = useParams();

  // useEffect(() => {
  //   if (!user) {
  //     router.push("/sign-in")
  //   }
  // }, [user, router])

  // if (!user) return null

  useEffect(() => {
    if (typeof window !== "undefined" && !isLoading && !user) {
      router.replace("/sign-in")
    }
    else {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, [user, router,isLoading]);

  const selectedPackage = packages.find((pkg) => pkg.id === params.packageId);

  const handlePurchase = async (selectedPackage: any) => {
    try {
      const res = await fetch("/api/payment/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: selectedPackage.price,
          packageId: selectedPackage.id,
        }),
      });

      const order = await res.json();

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
        amount: order.amount,
        currency: "INR",
        name: "Truth Guardian AI",
        description: selectedPackage.name,
        order_id: order.id,
        handler: async function (response: any) {
          await addCredits(selectedPackage.credits);
          toast({
            title: "Payment Successful",
            description: `${selectedPackage.credits} credits added!`,
          });
          router.push("/");
        },
        prefill: {
          name: user?.name || "User",
          email: user?.email || "user@example.com",
        },
        theme: {
          color: "#0f172a",
        },
      };

      const razor = new (window as any).Razorpay(options);
      razor.open();
    } catch (err: any) {
      toast({
        title: "Payment Error",
        description: err.message || "Something went wrong.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary" />
      </div>
    )
  }

  if (!selectedPackage) {
    return (
      <div className="text-center mt-20 text-red-500 text-lg font-semibold">
        ❌ Invalid package selected. Please go back and try again.
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-white">
      <div className="w-full max-w-md bg-[#1f2937] border border-gray-700 rounded-2xl shadow-xl p-8 text-center relative">
        <div className="absolute -top-5 left-1/2 transform -translate-x-1/2">
          <div className="bg-primary text-white px-4 py-1 rounded-full shadow-md text-sm font-bold">
            Payment Details
          </div>
        </div>

        <h1 className="text-2xl font-extrabold mb-2 mt-6 tracking-tight">
          {selectedPackage.name}
        </h1>
        <p className="text-gray-300 mb-6 text-sm">
          Unlock <span className="text-white font-bold">{selectedPackage.credits}</span> credits
          for just <span className="text-white font-bold">₹{selectedPackage.price}</span>
        </p>

        <div className="mb-6">
          <div className="flex items-center justify-center space-x-2 text-lg font-semibold text-green-400">
            <BadgeCheck className="h-5 w-5" />
            <span>{selectedPackage.credits} Credits</span>
          </div>
        </div>

        <Button
          size="lg"
          className="w-full text-base font-semibold bg-gradient-to-r from-primary to-pink-500 hover:shadow-lg hover:shadow-primary/40"
          onClick={() => handlePurchase(selectedPackage)}
        >
          <IndianRupee className="h-5 w-5 mr-2" />
          {selectedPackage.price === 0
            ? "Get Free Credits"
            : `Buy for ₹${selectedPackage.price}`}
        </Button>
      </div>
    </div>
  );
}
