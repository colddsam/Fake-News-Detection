"use client"

import { useState } from "react"
import { Twitter, Facebook, Linkedin, Mail, Copy, X, MessageCircle, Instagram, Send } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

interface ShareModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    title: string
    url: string
}

export default function ShareModal({ open, onOpenChange, title, url }: ShareModalProps) {
    const { toast } = useToast()
    const [copied, setCopied] = useState(false)

    const shareOptions = [
        {
            name: "Twitter",
            icon: <Twitter className="h-5 w-5" />,
            color: "bg-[#1DA1F2] hover:bg-[#1a94df]",
            action: () => {
                const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
                    `I just verified this content with Truth Guardian AI: ${title}`,
                )}&url=${encodeURIComponent(url)}`
                window.open(twitterUrl, "_blank")
            },
        },
        {
            name: "Facebook",
            icon: <Facebook className="h-5 w-5" />,
            color: "bg-[#1877F2] hover:bg-[#166fe5]",
            action: () => {
                const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
                window.open(facebookUrl, "_blank")
            },
        },
        {
            name: "LinkedIn",
            icon: <Linkedin className="h-5 w-5" />,
            color: "bg-[#0A66C2] hover:bg-[#0958a8]",
            action: () => {
                const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
                window.open(linkedinUrl, "_blank")
            },
        },
        {
            name: "WhatsApp",
            icon: <MessageCircle className="h-5 w-5" />,
            color: "bg-[#25D366] hover:bg-[#20bd5a]",
            action: () => {
                const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(
                    `I just verified this content with Truth Guardian AI: ${title} ${url}`,
                )}`
                window.open(whatsappUrl, "_blank")
            },
        },
        {
            name: "Instagram",
            icon: <Instagram className="h-5 w-5" />,
            color: "bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#FCAF45] hover:opacity-90",
            action: () => {
                copyToClipboard()
                toast({
                    title: "Link copied!",
                    description: "Instagram doesn't support direct sharing. Link copied to clipboard instead.",
                })
            },
        },
        {
            name: "Telegram",
            icon: <Send className="h-5 w-5" />,
            color: "bg-[#0088cc] hover:bg-[#0077b3]",
            action: () => {
                const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(
                    `I just verified this content with Truth Guardian AI: ${title}`,
                )}`
                window.open(telegramUrl, "_blank")
            },
        },
        {
            name: "Email",
            icon: <Mail className="h-5 w-5" />,
            color: "bg-gray-600 hover:bg-gray-700",
            action: () => {
                const subject = encodeURIComponent("Content Verification Result from Truth Guardian AI")
                const body = encodeURIComponent(
                    `I just verified this content with Truth Guardian AI: ${title}\n\nCheck it out: ${url}`,
                )
                window.location.href = `mailto:?subject=${subject}&body=${body}`
            },
        },
        {
            name: "Copy Link",
            icon: copied ? <Copy className="h-5 w-5 text-green-500" /> : <Copy className="h-5 w-5" />,
            color: "bg-gray-800 hover:bg-gray-900",
            action: copyToClipboard,
        },
    ]

    function copyToClipboard() {
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
            },
        )
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="w-full max-w-lg bg-gray-900 border border-gray-800 px-6 py-5 rounded-xl">
                <DialogHeader>
                    <DialogTitle className="text-lg text-white">Share Verification Result</DialogTitle>
                    <DialogDescription className="text-gray-400 text-sm">
                        Share this verification result with others via your preferred platform
                    </DialogDescription>
                </DialogHeader>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
                    {shareOptions.map((option) => (
                        <Button
                            key={option.name}
                            variant="outline"
                            className={`flex flex-col items-center justify-center h-20 rounded-lg ${option.color} text-white border-none overflow-hidden`}
                            onClick={() => {
                                option.action()
                                if (option.name !== "Copy Link") {
                                    onOpenChange(false)
                                }
                            }}
                        >
                            {option.icon}
                            <span className="mt-1 text-xs text-center">{option.name}</span>
                        </Button>
                    ))}
                </div>

                <div className="mt-6 bg-gray-800 p-3 rounded-md">
                    <p className="text-sm text-gray-300 mb-1">Shareable link:</p>
                    <div className="flex items-center gap-2">
                        <code className="text-xs bg-gray-950 p-2 rounded flex-1 overflow-x-auto whitespace-nowrap">{url}</code>
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={copyToClipboard}>
                            {copied ? <Copy className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
