"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { Upload, ImageIcon, Loader2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import Image from "next/image"
import { Textarea } from "@/components/ui/textarea"
import { verifyImageNews } from "@/lib/verification"

export default function VerifyImagePage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [file, setFile] = useState<File | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<{ claim: string }>()

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      const reader = new FileReader()
      reader.onload = () => setPreviewUrl(reader.result as string)
      reader.readAsDataURL(selectedFile)
    }
  }

  const clearImage = () => {
    setPreviewUrl(null)
    setFile(null)
    reset()
  }

  const onSubmit = async (data: { claim: string }) => {
    if (!file) {
      toast({
        title: "Error",
        description: "Please select an image to verify",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const result = await verifyImageNews(file, data.claim || "Verify this image")
      
      sessionStorage.setItem("verificationResult", JSON.stringify(result))
      sessionStorage.setItem("verificationType", "image")
      router.push("/result")
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Image verification failed",
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
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">Image Verification</h1>
        <p className="text-lg text-muted-foreground mb-8 text-center">
          Upload screenshots, memes, or photos to check their authenticity
        </p>

        <Card className="bg-background/50 backdrop-blur-md">
          <CardHeader>
            <CardTitle>Submit Image</CardTitle>
            <CardDescription>
              Our AI will analyze the visual content and provide a detailed report
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="flex flex-col items-center justify-center">
                {previewUrl ? (
                  <div className="relative w-full max-w-md mx-auto">
                    <Image
                      src={previewUrl}
                      alt="Preview"
                      width={400}
                      height={300}
                      className="w-full h-auto rounded-lg object-contain max-h-[300px]"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2 rounded-full"
                      onClick={clearImage}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="w-full">
                    <label
                      htmlFor="image-upload"
                      className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer hover:bg-accent transition-colors"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <ImageIcon className="w-12 h-12 mb-4 text-muted-foreground" />
                        <p className="mb-2 text-sm text-muted-foreground">
                          <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-muted-foreground">
                          PNG, JPG, GIF (MAX. 5MB)
                        </p>
                      </div>
                      <input
                        id="image-upload"
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                    </label>
                    {!file && (
                      <p className="text-sm font-medium text-destructive mt-2 text-center">
                        Please select an image to verify
                      </p>
                    )}
                  </div>
                )}
              </div>

              <Textarea
                placeholder="Optional: Specific claim shown in this image that you want to verify..."
                {...register("claim")}
              />

              <motion.div 
                className="flex justify-center" 
                whileHover={{ scale: 1.03 }} 
                whileTap={{ scale: 0.97 }}
              >
                <Button
                  type="submit"
                  size="lg"
                  disabled={isLoading || !file}
                  className="w-full md:w-auto px-8 py-6 text-lg"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Upload className="mr-2 h-5 w-5" />
                      Verify Image
                    </>
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