"use client"

import { useState, useEffect } from "react"
import { Mic, MicOff, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/contexts/auth-context"

interface SpeechToTextProps {
  onTranscript: (text: string) => void
  shouldOn?: boolean
  className?: string
}

export default function SpeechToText({ onTranscript, shouldOn=false, className = "" }: SpeechToTextProps) {
    const { user } = useAuth()
  const [isListening, setIsListening] = useState(false)
  const [isSupported, setIsSupported] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
      setIsSupported(false)
    }
  }, [])

  const toggleListening = () => {
    if (isListening) {
      stopListening()
    } else {
      startListening()
    }
  }

  const startListening = () => {
    setIsLoading(true)

    try {
      // @ts-ignore 
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      const recognition = new SpeechRecognition()

      recognition.continuous = false
      recognition.interimResults = false
      recognition.lang = "en-US"

      recognition.onstart = () => {
        setIsListening(true)
        setIsLoading(false)
      }

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript
        onTranscript(transcript)
        stopListening()
      }

      recognition.onerror = (event: any) => {
        console.error("Speech recognition error", event.error)
        toast({
          title: "Speech Recognition Error",
          description: `Error: ${event.error}. Please try again.`,
          variant: "destructive",
        })
        stopListening()
      }

      recognition.onend = () => {
        setIsListening(false)
        setIsLoading(false)
      }

      recognition.start()
    } catch (error) {
      console.error("Speech recognition error:", error)
      toast({
        title: "Speech Recognition Error",
        description: "Could not start speech recognition. Please try again.",
        variant: "destructive",
      })
      setIsListening(false)
      setIsLoading(false)
    }
  }

  const stopListening = () => {
    setIsListening(false)
  }

  if (!isSupported) {
    return null 
  }

  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      className={`rounded-full ${className}`}
      onClick={toggleListening}
        disabled={!user || !shouldOn ||isLoading|| user.credits<10}
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : isListening ? (
        <MicOff className="h-4 w-4 text-red-500" />
      ) : (
        <Mic className="h-4 w-4" />
      )}
    </Button>
  )
}
