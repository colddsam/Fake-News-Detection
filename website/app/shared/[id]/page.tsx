"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Head from "next/head"
import { motion } from "framer-motion"
import {
  CheckCircle,
  XCircle,
  AlertTriangle,
  ExternalLink,
  Share2,
  Copy
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import AnimatedBackground from "@/components/animated-background"
import { Badge } from "@/components/ui/badge"
import TruthScoreChart from "@/components/truth-score-chart"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"

type VerificationResult = {
  id: string
  type: "Text" | "Image" | "Social"
  title: string
  reason: string
  truthScore: number
  verdict: string
  sources: Array<{
    title: string
    url: string
  }>
  sharedBy?: string
  sharedAt: string
}

export default function SharedResultPage() {
  const { getVerificationById } = useAuth()
  const params = useParams()
  const { toast } = useToast()

  const [result, setResult] = useState<VerificationResult | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  function transformDemoResponseToVerificationResult(demo: any): VerificationResult {
    return {
      id: demo.id,
      type: demo.verificationType,
      title: demo.title,
      reason: demo.reason,
      truthScore: demo.truth_score,
      verdict: demo.verdict,
      sources: demo.evidence_links.map((url: string) => ({
        title: new URL(url).hostname.replace("www.", ""),
        url,
      })),
      sharedBy: demo.name,
      sharedAt: new Date(demo.timestamp.seconds * 1000).toISOString(),
    }
  }

  useEffect(() => {
    const fetchSharedResult = async () => {
      try {
        const rawId = params.id
        if (!rawId || Array.isArray(rawId)) {
          setError("Invalid verification ID")
          setLoading(false)
          return
        }
        const data = await getVerificationById(rawId)
        const resultObj = transformDemoResponseToVerificationResult(data)
        setResult(resultObj)
      } catch (error) {
        console.error("Error fetching shared result:", error)
        setError("Failed to load the shared verification result")
      } finally {
        setLoading(false)
      }
    }

    fetchSharedResult()
  }, [params.id, toast])

  const copyToClipboard = () => {
    const url = window.location.href
    navigator.clipboard.writeText(url).then(
      () => {
        setCopied(true)
        toast({
          title: "Link copied!",
          description: "The link has been copied to your clipboard.",
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
      }
    )
  }

  const getVerificationTypeIcon = () => {
    switch (result?.type) {
      case "Text":
        return "📝"
      case "Image":
        return "🖼️"
      case "Social":
        return "📱"
      default:
        return "🔍"
    }
  }

  const getVerdictIcon = () => {
    if (!result) return null
    if (result.truthScore >= 70) {
      return <CheckCircle className="h-12 w-12 text-green-500" />
    } else if (result.truthScore >= 40) {
      return <AlertTriangle className="h-12 w-12 text-yellow-500" />
    } else {
      return <XCircle className="h-12 w-12 text-red-500" />
    }
  }

  const getVerdictColor = () => {
    if (!result) return ""
    if (result.truthScore >= 70) return "text-green-500"
    else if (result.truthScore >= 40) return "text-yellow-500"
    else return "text-red-500"
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (error || !result) {
    return (
      <div className="relative min-h-screen py-16">
        <div className="absolute inset-0 z-0">
          <AnimatedBackground />
        </div>
        <div className="container mx-auto px-4 relative z-10 pt-12">
          <Card className="max-w-md mx-auto bg-gray-800/50 border-none backdrop-blur-md">
            <CardHeader>
              <CardTitle className="text-center">Verification Not Found</CardTitle>
              <CardDescription className="text-center">
                {error || "The shared verification result could not be found or has expired."}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <Button asChild>
                <Link href="/">Go to Homepage</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen py-16">
      <Head>
        <title>{`${result.title} - Verdict: ${result.verdict}`}</title>
        <meta name="description" content={`Shared verification result: ${result.reason}`} />
        <meta property="og:title" content={`${result.title} - Verdict: ${result.verdict}`} />
        <meta property="og:description" content={`Truth Score: ${result.truthScore}. ${result.reason}`} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={typeof window !== "undefined" ? window.location.href : ""} />
      </Head>

      <div className="absolute inset-0 z-0">
        <AnimatedBackground />
      </div>
      <div className="container mx-auto px-4 relative z-10 pt-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl md:text-4xl font-bold">Shared Verification Result</h1>
            <Button variant="outline" onClick={copyToClipboard}>
              {copied ? <Copy className="mr-2 h-4 w-4" /> : <Share2 className="mr-2 h-4 w-4" />}
              {copied ? "Copied!" : "Copy Link"}
            </Button>
          </div>

          <Card className="bg-gray-800/50 border-none backdrop-blur-md mb-6">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <Badge variant="outline" className="mb-2">
                    {getVerificationTypeIcon()} {result.type} Verification
                  </Badge>
                  <CardTitle className="text-2xl">{result.title}</CardTitle>
                  <CardDescription className="mt-1">
                    Shared by {result.sharedBy || "Anonymous"} •{" "}
                    {new Date(result.sharedAt).toLocaleDateString()}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-900/50 rounded-lg p-4 mb-6">
                <h3 className="font-medium mb-2">Verification Reason</h3>
                <p className="text-gray-300">{result.reason}</p>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="bg-gray-800/50 border-none backdrop-blur-md">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center justify-center h-full">
                    <div className="mb-6">
                      <TruthScoreChart score={result.truthScore} />
                    </div>
                    <h2 className="text-2xl font-bold mb-2">Truth Score</h2>
                    <p className="text-gray-300 text-center">
                      Based on our AI analysis of the provided content
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
              <Card className="bg-gray-800/50 border-none backdrop-blur-md">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {getVerdictIcon()}
                    <h2 className={`text-2xl font-bold ml-3 ${getVerdictColor()}`}>{result.verdict}</h2>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="bg-gray-800/50 border-none backdrop-blur-md">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">Supporting Sources</h2>
                <div className="space-y-4">
                  {result.sources.map((source, index) => (
                    <div key={index} className="border border-gray-700 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium">{source.title}</h3>
                        <Button variant="ghost" size="sm" asChild>
                          <a href={source.url} target="_blank" rel="noopener noreferrer">
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

          <div className="flex justify-center mt-8">
            <Button asChild>
              <Link href="/">Verify Your Own Content</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
