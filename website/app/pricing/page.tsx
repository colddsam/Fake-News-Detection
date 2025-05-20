"use client"
import { motion } from "framer-motion"
import { useEffect, useState } from "react";
import { CreditCard, Check, Zap, Shield, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/contexts/auth-context"
import AnimatedBackground from "@/components/animated-background"
import Link from "next/link"
import { getUserCurrencyInfo } from "@/lib/currency";
import { convertCurrency } from "@/lib/exchange";


const creditPackages = [
  {
    id: "basic",
    name: "Basic",
    credits: 10,
    price: 10,
    popular: false,
    icon: <Shield className="h-6 w-6 text-primary" />,
    features: ["10 verification credits", "Text verification", "Social media verification"],
  },
  {
    id: "standard",
    name: "Standard",
    credits: 50,
    price: 40,
    popular: true,
    icon: <Zap className="h-6 w-6 text-yellow-500" />,
    features: ["30 verification credits", "All verification types", "Priority processing", "Detailed reports"],
  },
  {
    id: "premium",
    name: "Premium",
    credits: 120,
    price: 100,
    popular: false,
    icon: <Sparkles className="h-6 w-6 text-pink-500" />,
    features: [
      "100 verification credits",
      "All verification types",
      "Priority processing",
      "Detailed reports",
      "API access",
    ],
  },
]

export default function CreditsPage() {
  const { user } = useAuth()
  const [localCurrency, setLocalCurrency] = useState("INR");
  const [currencySymbol, setCurrencySymbol] = useState("₹");
  const [localizedPackages, setLocalizedPackages] = useState(creditPackages);

  useEffect(() => {
    const fetchCurrency = async () => {
      const info = await getUserCurrencyInfo();
      setLocalCurrency(info.currency);
      setCurrencySymbol(info.currencySymbol);

      const converted = await Promise.all(
        creditPackages.map(async (pkg) => ({
          ...pkg,
          price: await convertCurrency(pkg.price, "INR", info.currency),
        }))
      );

      setLocalizedPackages(converted);
    };

    fetchCurrency();
  }, []);


  return (
    <div className="relative min-h-screen py-16">
      <div className="absolute inset-0 z-0">
        <AnimatedBackground />
      </div>

      <div className="container mx-auto px-4 relative z-10 pt-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-5xl mx-auto"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">Buy Credits</h1>
          <p className="text-lg text-gray-300 mb-4 text-center">
            Purchase verification credits to analyze more content
          </p>
          <p className="text-md text-gray-400 mb-8 text-center">
            You currently have <span className="text-primary font-bold">{user ? user.credits :0}</span> credits
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
  {localizedPackages.map((pkg) => (
    <motion.div
      key={pkg.id}
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <Card
  className={`bg-gray-800/50 border-none h-[32rem] flex flex-col justify-between backdrop-blur-md w-full relative ${
    pkg.popular ? "ring-2 ring-primary" : ""
  }`}
>
  {pkg.popular && (
    <div className="absolute -top-3 left-0 right-0 flex justify-center">
      <span className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">
        Most Popular
      </span>
    </div>
  )}
  <CardHeader className="pb-2">
    <div className="flex justify-center mb-2">{pkg.icon}</div>
    <CardTitle className="text-center">{pkg.name} Package</CardTitle>
    <CardDescription className="text-center">
      {pkg.credits} verification credits
    </CardDescription>
  </CardHeader>

  <CardContent className="flex-1 flex flex-col justify-between pb-2">
    <div className="text-center">
      <p className="text-3xl font-bold mb-4">
      {currencySymbol}{pkg.price}
      <span className="text-sm text-gray-400 font-normal"> {localCurrency}</span>
      </p>
      <ul className="space-y-2 text-left px-4">
        {pkg.features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
            <span className="text-gray-300 text-sm">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  </CardContent>

  <CardFooter>
    <Button
      asChild
      className={`w-full ${
        pkg.popular
          ? "bg-gradient-to-r from-primary to-pink-500 hover:shadow-lg hover:shadow-primary/50"
          : "bg-gray-700 hover:bg-gray-600"
      }`}
    >
      <Link href={`/transaction/${pkg.id}`}>
        <CreditCard className="mr-2 h-4 w-4" />
        Buy Now
      </Link>
    </Button>
  </CardFooter>
</Card>


    </motion.div>
  ))}
</div>


          <div className="bg-gray-800/50 backdrop-blur-md rounded-lg p-6 max-w-3xl mx-auto">
            <h2 className="text-xl font-bold mb-4">Why Buy Credits?</h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-primary/20 p-2 rounded-full mr-4">
                  <Shield className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Verify More Content</h3>
                  <p className="text-gray-400 text-sm">
                    Each verification costs 1 credit. Buy more credits to analyze more content and stay informed.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-yellow-500/20 p-2 rounded-full mr-4">
                  <Zap className="h-5 w-5 text-yellow-500" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Priority Processing</h3>
                  <p className="text-gray-400 text-sm">
                    Higher tier packages get priority processing during high traffic periods.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-pink-500/20 p-2 rounded-full mr-4">
                  <Sparkles className="h-5 w-5 text-pink-500" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Support Our Mission</h3>
                  <p className="text-gray-400 text-sm">
                    Your purchase helps us maintain and improve our AI systems to combat misinformation.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-700">
              <h3 className="font-medium mb-2">Need more options?</h3>
              <p className="text-gray-400 text-sm mb-4">
                View your activity history or contact us for custom enterprise plans.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button variant="outline" asChild>
                  <Link href="/profile">View Activity History</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/about">Contact for Enterprise</Link>
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
