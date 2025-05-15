"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { verifySocialNews } from "@/lib/verification"

type FormData = {
  url: string
  claim: string
  verifyType: "text" | "image"
}

export default function VerifySocialPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [verifyType, setVerifyType] = useState<"text" | "image">("text")

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    setIsLoading(true)
    try {
      if (!data.url.trim()) throw new Error("Please enter a valid URL")

      const result = await verifySocialNews(data.url, data.claim || "Verify this social media post", verifyType)

      sessionStorage.setItem("verificationResult", JSON.stringify(result))
      sessionStorage.setItem("verificationType", "social")

      router.push("/result")
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Verification failed",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value as "text" | "image"
    setVerifyType(value)
    setValue("verifyType", value)
  }

  return (
<div className="container mx-auto px-4 pt-24 pb-12">

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto"
      >
        <h1 className="text-3xl font-bold mb-6 text-center">Verify Social Media Post</h1>

        <Card className="bg-background/50 backdrop-blur-md">
          <CardHeader>
            <CardTitle>Submit Link</CardTitle>
            <CardDescription>Analyze a social media link with optional claim</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <label className="font-medium">Verification Type</label>
                <div className="flex gap-4">
                  <label>
                    <input
                      type="radio"
                      value="text"
                      checked={verifyType === "text"}
                      onChange={handleRadioChange}
                    />
                    <span className="ml-2">Text</span>
                  </label>
                  <label>
                    <input
                      type="radio"
                      value="image"
                      checked={verifyType === "image"}
                      onChange={handleRadioChange}
                    />
                    <span className="ml-2">Image</span>
                  </label>
                </div>
              </div>

              <Input
                placeholder="https://twitter.com/status/123456"
                {...register("url", {
                  required: "URL is required",
                  validate: (value) => {
                    try {
                      new URL(value)
                      return true
                    } catch {
                      return "Please enter a valid URL"
                    }
                  },
                })}
              />
              {errors.url && (
                <p className="text-sm font-medium text-destructive">{errors.url.message}</p>
              )}

              <Textarea
                placeholder="Optional: specific claim to verify"
                {...register("claim")}
              />

              <input type="hidden" value={verifyType} {...register("verifyType")} />

              <motion.div className="mt-6 flex justify-center" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Button type="submit" size="lg" disabled={isLoading} className="w-full md:w-auto px-8 py-6 text-lg">
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    "Verify Content"
                  )}
                </Button>
              </motion.div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
