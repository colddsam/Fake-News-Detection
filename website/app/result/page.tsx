"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { CheckCircle, XCircle, AlertTriangle, ExternalLink, ArrowLeft, User,Share2, Copy } from 'lucide-react';
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"
import TruthScoreChart from "@/components/truth-score-chart"
import { useAuth } from "@/contexts/auth-context"
import ShareModal from "@/components/share-modal";

type VerificationResult = {
  title: string
  truth_score: number
  verdict: string
  reason: string
  evidence_links: string[]
}

export default function ResultPage() {
  const [hasSaved, setHasSaved] = useState(false)
  const { user,isLoading,saveVerification } = useAuth();
  const router = useRouter()
  const { toast } = useToast()

  const [result, setResult] = useState<VerificationResult | null>(null)
  const [verificationType, setVerificationType] = useState<string>("")
  const [loading, setLoading] = useState(true)
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [copied, setCopied] = useState<boolean>(false)
  const [isShareModalOpen, setIsShareModalOpen] = useState(false)
  const [shareData, setShareData] = useState<{ title: string; url: string } | null>(null)
  const [redirecting, setRedirecting] = useState(false)

  
  const copyToClipboard = () => {
    const rootDomain = window.location.origin 
    const url = `${rootDomain}/shared/${copiedId}`

    navigator.clipboard.writeText(url).then(
      () => {
        setCopied(true)
        toast({
          title: "Link copied!",
          description: "The verification result link has been copied to your clipboard.",
        })
        setTimeout(() => setCopied(false), 2000)
      },
      (err) => {
        console.error("Could not copy text: ", err)
        toast({
          title: "Copy failed",
          description: "Failed to copy the link to clipboard.",
          variant: "destructive",
        })
      },
    )
  }

  useEffect(() => {
    const loadResult = async () => {
      if (typeof window !== "undefined" && !isLoading && !user) {
        router.replace("/sign-in")
      }
      else {
        try {
          const storedResult = sessionStorage.getItem("verificationResult")
          const storedType = sessionStorage.getItem("verificationType")
          const savedFireStore = sessionStorage.getItem("savedFireStore")
  
          // if (!storedResult || !storedType) throw new Error("Missing data in sessionStorage")
          if (!storedResult || !storedType) {
            setRedirecting(true)
            router.push("/")
          }
          else {
            const parsedResult: VerificationResult = JSON.parse(storedResult)
  
            if (
              typeof parsedResult.title !== "string" ||
              typeof parsedResult.truth_score !== "number" ||
              typeof parsedResult.verdict !== "string" ||
              typeof parsedResult.reason !== "string" ||
              !Array.isArray(parsedResult.evidence_links)
            ) {
              throw new Error("Malformed result data")
            }
  
            setResult(parsedResult)
            setVerificationType(storedType)
            if (savedFireStore === "False" && !hasSaved) {
              const resultId = await saveVerification({ ...parsedResult, verificationType: storedType })
              setCopiedId(resultId?resultId:"invalid")
              sessionStorage.setItem("savedFireStore", "True")
              setHasSaved(true)

            }
          }
  
        } catch (error) {
          console.error("Failed to load result:", error)
          toast({
            title: "Error loading result",
            description: "Please try verifying again.",
            variant: "destructive",
          })
          router.push("/")
        } finally {
          setLoading(false)
        }
      }
    }
  
    loadResult()
  }, [router, toast, isLoading, user])
  
  
  if (isLoading || redirecting) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary" />
      </div>
    )
  }

  const handleShareClick = (id: string,title:string) => {
    const rootDomain = window.location.origin 
    const url = `${rootDomain}/shared/${id}`
    setShareData({
      title: title,
      url: url,
    })
    setCopied(true)
    setIsShareModalOpen(true)
  }

  const getVerdictIcon = () => {
    if (!result) return null
    const score = result.truth_score

    if (score >= 70) return <CheckCircle className="h-12 w-12 text-green-500" />
    if (score >= 40) return <AlertTriangle className="h-12 w-12 text-yellow-500" />
    return <XCircle className="h-12 w-12 text-red-500" />
  }

  const getVerdictColor = () => {
    if (!result) return ""
    const score = result.truth_score

    if (score >= 70) return "text-green-500"
    if (score >= 40) return "text-yellow-500"
    return "text-red-500"
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary" />
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
        <div className="flex justify-between items-center mb-6">
          <Button variant="ghost" onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>

          <Button variant="outline" onClick={() => handleShareClick(copiedId?copiedId:'invalid',result.title)}>
            {copied ? <Share2 className="mr-2 h-4 w-4 text-green-500" /> : <Share2 className="mr-2 h-4 w-4 " />}
          </Button>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center capitalize">
          {verificationType} Verification Result
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="bg-background/50 backdrop-blur-md">
              <CardContent className="p-6 flex flex-col items-center justify-center h-full">
                <div className="mb-6">
                  <TruthScoreChart score={result.truth_score} />
                </div>
                <h2 className="text-2xl font-bold mb-2">Truth Score</h2>
                <p className="text-muted-foreground text-center">
                  {result.truth_score}/100 confidence level
                </p>
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
  {(() => {
    try {
      return new URL(link).hostname
    } catch {
      return link
    }
  })()}
</p>

<Button asChild>
  <a href={link} target="_blank" rel="noopener noreferrer" aria-label="Open evidence link">
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
          <Link href={`/verify/${verificationType || "text"}`}>
  <Button size="lg">Verify Another</Button>
</Link>

          </Button>
        </div>
      </motion.div>
      {shareData && (
              <ShareModal
                open={isShareModalOpen}
                onOpenChange={setIsShareModalOpen}
                title={shareData.title}
                url={shareData.url}
              />
            )}
    </div>
  )
}
