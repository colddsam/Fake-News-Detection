"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import {
  User,
  Mail,
  Save,
  Loader2,
  ShieldCheck,
  History,
  CreditCard,
  AlertTriangle,
  CheckCircle,
  XCircle,
  FileText,
  ImageIcon,
  LinkIcon,
  Share2,
  Copy,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/contexts/auth-context"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import AnimatedBackground from "@/components/animated-background"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"


type ProfileFormData = {
  name: string
  email: string
}

export default function ProfilePage() {
  const { user,updateProfile, fetchUserVerifications,isLoading: authLoading } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [isUpdating, setIsUpdating] = useState(false)
  const [verifications, setVerifications] = useState<any[]>([])
  const [loadingHistory, setLoadingHistory] = useState(true)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProfileFormData>({
    defaultValues: {
      name: user?.name,
      email: user?.email,
    }
  });
  

  useEffect(() => {
    if (typeof window !== "undefined" && !authLoading && !user) {
      router.replace("/sign-in")
    }
  }, [authLoading, user, router])
  

  useEffect(() => {
    const loadVerifications = async () => {
      if (user) {
        const data = await fetchUserVerifications(user.id)
        setVerifications(data)
        reset({
                name: user.name,
                email: user.email,
              });
      }
      setLoadingHistory(false)
    }

    loadVerifications()
  }, [user])
  
  if (!user) return null 
  
  
  const copyToClipboard = (id: string) => {
    const rootDomain = window.location.origin 
    const url = `${rootDomain}/shared/${id}`

    navigator.clipboard.writeText(url).then(
      () => {
        setCopiedId(id)
        toast({
          title: "Link copied!",
          description: "The verification result link has been copied to your clipboard.",
        })
        setTimeout(() => setCopiedId(null), 2000)
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
  const getVerificationIcon = (type: string) => {
    switch (type) {
      case "Text":
        return <FileText className="h-4 w-4" />
      case "Image":
        return <ImageIcon className="h-4 w-4" />
      case "Social":
        return <LinkIcon className="h-4 w-4" />
      default:
        return <ShieldCheck className="h-4 w-4" />
    }
  }

  const getVerdictIcon = (score: number) => {
    if (score >= 70) {
      return <CheckCircle className="h-4 w-4 text-green-500" />
    } else if (score >= 40) {
      return <AlertTriangle className="h-4 w-4 text-yellow-500" />
    } else {
      return <XCircle className="h-4 w-4 text-red-500" />
    }
  }

  const getVerdictColor = (score: number) => {
    if (score >= 70) {
      return "text-green-500"
    } else if (score >= 40) {
      return "text-yellow-500"
    } else {
      return "text-red-500"
    }
  }

  const formatDate = (timestamp: any) => {
    const date = timestamp.toDate(); 
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.round(diffMs / 60000);
    const diffHours = Math.round(diffMs / 3600000);
    const diffDays = Math.round(diffMs / 86400000);
  
    if (diffMins < 60) {
      return `${diffMins} ${diffMins === 1 ? "minute" : "minutes"} ago`;
    } else if (diffHours < 24) {
      return `${diffHours} ${diffHours === 1 ? "hour" : "hours"} ago`;
    } else if (diffDays < 7) {
      return `${diffDays} ${diffDays === 1 ? "day" : "days"} ago`;
    } else {
      return date.toLocaleDateString();
    }
  };
  
  

  const onSubmit = async (data: ProfileFormData) => {
    if (data.name === user?.name) {
      toast({
        title: "No changes detected",
        description: "Your profile is already up to date.",
      })
      return
    }
    setIsUpdating(true)
    try {
      await updateProfile({ name: data.name })

      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      })
    } catch (error) {
      toast({
        title: "Update failed",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsUpdating(false)
    }
  }


  if (authLoading || !user) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }
  
  
  if (!user) return null
  

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
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">Your Profile</h1>
          <p className="text-lg text-gray-300 mb-8 text-center">Manage your account and subscription</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-gray-800/50 border-none backdrop-blur-md col-span-1">
              <CardContent className="p-6 flex flex-col items-center">
                <div className="mb-6 mt-4">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.name || "User"} />
                    <AvatarFallback className="bg-primary/20 text-primary text-2xl">
                      {user?.name?.charAt(0).toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <h2 className="text-xl font-bold mb-1">{user?.name}</h2>
                <p className="text-gray-400 mb-4">{user?.email}</p>
                <div className="flex items-center justify-center bg-gray-900/50 rounded-full px-4 py-2 mb-6">
                  <CreditCard className="h-4 w-4 text-primary mr-2" />
                  <span className="text-sm font-medium">
                    <span className="text-primary font-bold">{user?.credits}</span> credits available
                  </span>
                </div>
                <Button
                  asChild
                  className="w-full bg-gradient-to-r from-primary to-pink-500 hover:shadow-lg hover:shadow-primary/50"
                >
                  <Link href="/pricing">Buy More Credits</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-none backdrop-blur-md col-span-1 md:col-span-2">
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>Update your profile information</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="profile" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger
                      value="profile"
                      className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-pink-500"
                    >
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </TabsTrigger>
                    <TabsTrigger
                      value="activity"
                      className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-pink-500"
                    >
                      <History className="mr-2 h-4 w-4" />
                      Activity
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="profile">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium text-gray-300">
                          Full Name
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="name"
                            className="pl-10 bg-gray-900 border-gray-700"
                            {...register("name", {
                              required: "Name is required",
                              minLength: {
                                value: 2,
                                message: "Name must be at least 2 characters",
                              },
                            })}
                          />
                        </div>
                        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                      </div>

                      <div className="space-y-2">
  <label htmlFor="email" className="text-sm font-medium text-gray-300">
    Email Address
  </label>
  <div className="relative">
    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
    <Input
      id="email"
      type="email"
      className="pl-10 bg-gray-900 border-gray-700 cursor-not-allowed"
      {...register("email")}
      readOnly
    />
  </div>
</div>


                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-primary to-pink-500 hover:shadow-lg hover:shadow-primary/50"
                        disabled={isUpdating}
                      >
                        {isUpdating ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Updating...
                          </>
                        ) : (
                          <>
                            <Save className="mr-2 h-4 w-4" />
                            Save Changes
                          </>
                        )}
                      </Button>
                    </form>
                  </TabsContent>

                  <TabsContent value="activity">
                  <div className="space-y-4">
                      <div className="bg-gray-900/50 rounded-lg p-4">
                        <h3 className="font-medium mb-4 flex items-center">
                          <ShieldCheck className="h-5 w-5 text-primary mr-2" />
                          Recent Verifications
                        </h3>
                        {
                          loadingHistory || verifications.length === 0 ? (
                            <div className="text-center py-8 bg-gray-800/30 rounded-lg border border-gray-700">
                              <ShieldCheck className="h-12 w-12 mx-auto text-gray-500 mb-4" />
                              <h3 className="text-lg font-medium mb-2">No verifications yet</h3>
                              <p className="text-gray-400 mb-6">
                                You haven't verified any content yet. Start using our verification tools to see your
                                activity here.
                              </p>
                              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                <Button asChild size="sm">
                                  <Link href="/verify/text">Verify Text</Link>
                                </Button>
                                <Button asChild size="sm" variant="outline">
                                  <Link href="/verify/image">Verify Image</Link>
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <div className="space-y-4">
                              {verifications.map((verification) => (
                                <div
                                  key={verification.id}
                                  className="bg-gray-800/50 rounded-lg p-4 border border-gray-700"
                                >
                                  <div className="flex justify-between items-start mb-3">
                                    <div className="flex items-center">
                                      <Badge variant="outline" className="mr-2 bg-gray-900">
                                        {getVerificationIcon(verification.verificationType)}
                                        <span className="ml-1">{verification.verificationType}</span>
                                      </Badge>
                                      <span className="text-xs text-gray-400">{formatDate(verification.timestamp)}</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                    <TooltipProvider>
                                      <Tooltip>
                                        <TooltipTrigger asChild>
                                          <div className={`flex items-center ${getVerdictColor(verification.truth_score)}`}>
                                            {getVerdictIcon(verification.truth_score)}
                                            <span className="ml-1 font-medium">{verification.truth_score}%</span>
                                          </div>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                          <p>{verification.verdict}</p>
                                        </TooltipContent>
                                      </Tooltip>
                                      </TooltipProvider>
                                      <Button
                                      variant="ghost"
                                      size="sm"
                                      className="h-8 w-8 p-0"
                                      onClick={() => copyToClipboard(verification.id)}
                                    >
                                      {copiedId === verification.id ? (
                                        <Copy className="h-4 w-4 text-green-500" />
                                      ) : (
                                        <Share2 className="h-4 w-4" />
                                      )}
                                    </Button>
                                  </div>
                                  </div>
  
                                  <h4 className="font-medium mb-1">{verification.title}</h4>
                                  <p className="text-sm text-gray-400 mb-2">{verification.reason}</p>
  
                                  <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-700">
                                    <span className="text-sm">Decision:</span>
                                    <span className={`text-sm font-medium ${getVerdictColor(verification.truth_score)}`}>
                                      {verification.verdict}
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) 
                        }
                      </div>
                    </div>
                        
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
