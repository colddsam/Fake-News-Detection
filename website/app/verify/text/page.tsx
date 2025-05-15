"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { verifyTextNews } from "@/lib/verification"

type FormData = { content: string }

export default function VerifyTextPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    setIsLoading(true)
    try {
      if (!data.content.trim()) throw new Error("Please enter content to verify")
      const result = await verifyTextNews(data.content)

      sessionStorage.setItem("verificationResult", JSON.stringify(result))
      sessionStorage.setItem("verificationType", "text")
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

  return (
<div className="container mx-auto px-4 pt-24 pb-12">

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto"
      >
        <h1 className="text-3xl font-bold mb-6 text-center">Verify News Text</h1>

        <Card className="bg-background/50 backdrop-blur-md">
          <CardHeader>
            <CardTitle>Submit News Text</CardTitle>
            <CardDescription>Our AI will analyze and verify its authenticity</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <Textarea
                placeholder="Paste news article or claim here..."
                className="min-h-[200px]"
                {...register("content", {
                  required: "Content is required",
                  validate: value => value.trim().length > 0 || "Please enter valid content"
                })}
              />
              {errors.content && (
                <p className="text-sm font-medium text-destructive">{errors.content.message}</p>
              )}

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
