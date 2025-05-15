"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { CheckCircle, XCircle, AlertTriangle, ExternalLink, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import TruthScoreChart from "@/components/truth-score-chart"
import { useToast } from "@/components/ui/use-toast"

type VerificationResult = {
  truth_score: number
  verdict: string
  reason: string
  evidence_links: string[]
}

export default function ResultPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [result, setResult] = useState<VerificationResult | null>(null)
  const [verificationType, setVerificationType] = useState<string>("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedResult = sessionStorage.getItem("verificationResult")
    const storedType = sessionStorage.getItem("verificationType")

    if (storedResult) {
      try {
        setResult(JSON.parse(storedResult))
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load verification result",
          variant: "destructive",
        })
        router.push("/")
      }
    } else {
      router.push("/")
    }

    if (storedType) {
      setVerificationType(storedType)
    }

    setLoading(false)
  }, [router, toast])

  const getVerdictIcon = () => {
    if (!result) return null
    
    if (result.truth_score >= 70) {
      return <CheckCircle className="h-12 w-12 text-green-500" />
    } else if (result.truth_score >= 40) {
      return <AlertTriangle className="h-12 w-12 text-yellow-500" />
    } else {
      return <XCircle className="h-12 w-12 text-red-500" />
    }
  }

  const getVerdictColor = () => {
    if (!result) return ""
    
    if (result.truth_score >= 70) {
      return "text-green-500"
    } else if (result.truth_score >= 40) {
      return "text-yellow-500"
    } else {
      return "text-red-500"
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!result) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold mb-4">No Result Found</h1>
        <p className="mb-6">Please submit content for verification first.</p>
        <Button asChild>
          <Link href="/">Go Home</Link>
        </Button>
      </div>
    )
  }

  return (
<div className="container mx-auto px-4 pt-24 pb-12">

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <Button variant="ghost" className="mb-6" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">
          {verificationType === "image" ? "Image" : "Content"} Verification Result
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="bg-background/50 backdrop-blur-md">
              <CardContent className="p-6">
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="mb-6">
                    <TruthScoreChart score={result.truth_score} />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">Truth Score</h2>
                  <p className="text-muted-foreground text-center">
                    {result.truth_score}/100 confidence level
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="bg-background/50 backdrop-blur-md">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {getVerdictIcon()}
                  <h2 className={`text-2xl font-bold ml-3 ${getVerdictColor()}`}>
                    {result.verdict}
                  </h2>
                </div>
                <Separator className="mb-4" />
                <p className="text-muted-foreground">{result.reason}</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {result.evidence_links.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="bg-background/50 backdrop-blur-md">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">Supporting Evidence</h2>
                <div className="space-y-4">
                  {result.evidence_links.map((link, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <p className="text-sm font-medium truncate">
                          {new URL(link).hostname}
                        </p>
                        <Button variant="ghost" size="sm" asChild>
                          <a href={link} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        <div className="flex justify-center mt-8">
          <Button asChild size="lg">
          <Link
  href={
    verificationType === "social"
      ? "/verify/social"
      : verificationType === "image"
      ? "/verify/image"
      : "/verify/text"
  }
>
  Verify Another
</Link>

          </Button>
        </div>
      </motion.div>
    </div>
  )
}