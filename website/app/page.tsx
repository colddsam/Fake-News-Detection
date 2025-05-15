"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Shield, FileText, ImageIcon, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import AnimatedBackground from "@/components/animated-background"

export default function Home() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  if (!mounted) return null

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 z-0">
        <AnimatedBackground />
      </div>

      <div className="relative z-10">
        <div className="container mx-auto px-4 pt-24 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-block p-3 bg-white/10 backdrop-blur-md rounded-full mb-6"
            >
              <Shield className="w-12 h-12 text-primary" />
            </motion.div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-pink-500">
              Truth Guardian AI
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto mb-8">
              Detect fake news with advanced AI technology. Verify content from text, social media, or images.
            </p>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">
              <Button
                asChild
                size="lg"
                className="rounded-full text-lg px-8 py-6 bg-gradient-to-r from-primary to-pink-500 hover:shadow-lg hover:shadow-primary/50 transition-all duration-300"
              >
                <Link href="/verify/text">
                  Get Started <ArrowRight className="ml-2" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
          >
            <FeatureCard
              icon={<FileText className="w-8 h-8 text-primary" />}
              title="Verify Text"
              description="Analyze news articles, statements, or any text content for authenticity."
              link="/verify/text"
            />
            <FeatureCard
              icon={<ImageIcon className="w-8 h-8 text-primary" />}
              title="Verify Images"
              description="Upload screenshots, memes, or images to detect manipulated content."
              link="/verify/image"
            />
            <FeatureCard
              icon={<Info className="w-8 h-8 text-primary" />}
              title="About Our AI"
              description="Learn how our AI works to detect misinformation and fake news."
              link="/about"
            />
          </motion.div>
        </div>
      </div>
    </div>
  )
}

function FeatureCard({
  icon,
  title,
  description,
  link,
}: {
  icon: React.ReactNode
  title: string
  description: string
  link: string
}) {
  return (
    <motion.div whileHover={{ y: -10, scale: 1.02 }} transition={{ duration: 0.3 }}>
      <Link href={link}>
        <Card className="h-full bg-white/10 backdrop-blur-md border-none hover:bg-white/15 transition-all duration-300">
          <CardContent className="p-6 text-center">
            <div className="mb-4 flex justify-center">{icon}</div>
            <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
            <p className="text-gray-300">{description}</p>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  )
}
