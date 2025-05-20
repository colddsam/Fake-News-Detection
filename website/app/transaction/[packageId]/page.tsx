"use client";

import { useEffect,useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import jsPDF from "jspdf";
import { BadgeCheck, IndianRupee } from "lucide-react";
import logoBase64 from "@/lib/logo-base64"; 
import { generateQRCode } from "@/lib/qr";
import { getUserCurrencyInfo } from "@/lib/currency";
import { convertCurrency } from "@/lib/exchange";



const packages = [
  { id: "basic", name: "Basic Pack", credits: 10, price: 10 },
  { id: "standard", name: "Standard Pack", credits: 50, price: 40 },
  { id: "premium", name: "Premium Pack", credits: 120, price: 100 },
];

export default function TransactionPage() {
  const { addCredits, isLoading, user } = useAuth();
  const [localCurrency, setLocalCurrency] = useState("INR");
const [localPrice, setLocalPrice] = useState<number | null>(null);
const [currencySymbol, setCurrencySymbol] = useState("₹");
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
  }, [user, router, isLoading]);

  const selectedPackage = packages.find((pkg) => pkg.id === params.packageId);

  useEffect(() => {
    if (!selectedPackage) return;
  
    const fetchCurrency = async () => {
      const info = await getUserCurrencyInfo();
      setLocalCurrency(info.currency);
      setCurrencySymbol(info.currencySymbol);
      const convertedPrice = await convertCurrency(selectedPackage.price, "INR", info.currency);
      setLocalPrice(convertedPrice);
    };
  
    fetchCurrency();
  }, [params.packageId]);
  
  
  
  const generatePDFReceipt = async (details: {
    name: string;
    email: string;
    amount: number | null;
    currency: string;
    credits: number;
    packageName: string;
    paymentId: string;
    date: string;
  }) => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    const logoSize = 40;
    const logoX = (pageWidth - logoSize) / 2;
    const logoY = 20;
    doc.addImage(logoBase64, "PNG", logoX, logoY, logoSize, logoSize);

    let y = logoY + logoSize + 15;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text("Payment Receipt", pageWidth / 2, y, { align: "center" });
    y += 10;

    doc.setDrawColor(180);
    doc.setLineWidth(0.5);
    doc.line(20, y, pageWidth - 20, y);
    y += 10;

    const lineHeight = 8;
    const labelX = 25;
    const valueX = 75;
    doc.setFontSize(12);

    const fields = [
      ["Name", details.name],
      ["Email", details.email],
      ["Package", details.packageName],
      ["Credits", `${details.credits}`],
      ["Amount Paid", `${details.amount} ${details.currency}`],
      ["Payment ID", details.paymentId],
      ["Date", details.date],
    ];

    fields.forEach(([label, value]) => {
      doc.setFont("helvetica", "bold");
      doc.text(`${label}:`, labelX, y);
      doc.setFont("helvetica", "normal");
      doc.text(value, valueX, y);
      y += lineHeight;
    });

    const qrData = `Receipt\nID: ${details.paymentId}\nUser: ${details.name}\nAmount: ${details.currency} ${details.amount}`;
    const qrCode = await generateQRCode(qrData);
    y += 10;
    doc.setFont("helvetica", "normal");
    doc.text("Scan to Verify:", labelX, y);
    doc.addImage(qrCode, "PNG", labelX, y + 5, 40, 40);

    const badgeWidth = 60;
    const badgeHeight = 14;
    const badgeMargin = 20;

    const badgeX = pageWidth - badgeWidth - badgeMargin;
    const badgeY = pageHeight - badgeHeight - 25;

    doc.setFillColor("#0f172a");
    doc.roundedRect(badgeX, badgeY, badgeWidth, badgeHeight, 2, 2, "F");

    doc.setTextColor("#ffffff");
    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    doc.text("✅ Verified by", badgeX + 5, badgeY + 5.5);
    doc.text("Truth Guardian AI", badgeX + 5, badgeY + 11.5);

    const footerY = pageHeight - 10;
    doc.setTextColor("#000000");
    doc.setFontSize(11);
    doc.setFont("helvetica", "italic");
    doc.text("Thank you for your purchase!", pageWidth / 2, footerY, { align: "center" });

    doc.save(`receipt_${details.paymentId}.pdf`);
  };


  const handlePurchase = async (selectedPackage: any) => {
    try {
      const res = await fetch("/api/payment/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: localPrice ?? selectedPackage.price,
          packageId: selectedPackage.id,
          currency: localCurrency,
        }),
      });

      const order = await res.json();

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
        amount: order.amount,
        currency: localCurrency,
        name: "Truth Guardian AI",
        description: selectedPackage.name,
        order_id: order.id,
        handler: async function (response: any) {
          const paymentDate = new Date().toLocaleString();
          await addCredits(selectedPackage.credits);
          generatePDFReceipt({
            name: user?.name || "User",
            email: user?.email || "user@example.com",
            currency:localCurrency,
            amount: localPrice,
            credits: selectedPackage.credits,
            packageName: selectedPackage.name,
            paymentId: response.razorpay_payment_id,
            date: paymentDate,
          });
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
          for just <span className="text-white font-bold">{currencySymbol}{localPrice} {localCurrency}</span>
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
            : `Buy for ${currencySymbol}${localPrice}`}
        </Button>
      </div>
    </div>
  );
}
