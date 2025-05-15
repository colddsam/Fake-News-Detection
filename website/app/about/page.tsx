"use client"

import { motion } from "framer-motion"
import { Database, Brain, AlertTriangle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">About Truth Guardian AI</h1>
        <p className="text-lg text-gray-300 mb-12 text-center max-w-3xl mx-auto">
          Learn how our advanced AI system works to detect misinformation and fake news across various media formats
        </p>

        <Tabs defaultValue="how-it-works" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger
              value="how-it-works"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-pink-500"
            >
              How It Works
            </TabsTrigger>
            <TabsTrigger
              value="data-sources"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-pink-500"
            >
              Data Sources
            </TabsTrigger>
            <TabsTrigger
              value="disclaimer"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-pink-500"
            >
              Disclaimer
            </TabsTrigger>
          </TabsList>

          <TabsContent value="how-it-works">
            <Card className="bg-gray-800/50 border-none backdrop-blur-md">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Brain className="mr-2 h-6 w-6 text-primary" />
                  Our AI Technology
                </CardTitle>
                <CardDescription>Understanding the technology behind Truth Guardian AI</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3">Multi-Modal Analysis</h3>
                  <p className="text-gray-300">
                    Truth Guardian AI uses a sophisticated multi-modal analysis system that can process text, images,
                    and social media content. Our AI has been trained on millions of verified and fake news samples to
                    identify patterns and indicators of misinformation.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Natural Language Processing</h3>
                  <p className="text-gray-300">
                    For text content, our system employs advanced NLP techniques to analyze language patterns, emotional
                    tone, source credibility, and factual consistency. It can detect subtle linguistic cues often
                    associated with misleading information.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Computer Vision</h3>
                  <p className="text-gray-300">
                    Our image analysis capabilities can detect manipulated images, inconsistencies in visual content,
                    and cross-reference images with known verified sources to identify misleading visual information.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Cross-Referencing</h3>
                  <p className="text-gray-300">
                    Truth Guardian AI constantly updates its knowledge base by cross-referencing information with
                    trusted news sources, fact-checking organizations, and verified databases to provide the most
                    accurate assessment possible.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="data-sources">
            <Card className="bg-gray-800/50 border-none backdrop-blur-md">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Database className="mr-2 h-6 w-6 text-primary" />
                  Our Data Sources
                </CardTitle>
                <CardDescription>The trusted sources that power our verification system</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3">Fact-Checking Organizations</h3>
                  <p className="text-gray-300">
                    We partner with leading fact-checking organizations worldwide, including Snopes, PolitiFact,
                    FactCheck.org, and Full Fact to maintain an up-to-date database of verified information and known
                    misinformation.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">News Databases</h3>
                  <p className="text-gray-300">
                    Our system has access to archives from reputable news sources across the political spectrum to
                    cross-reference claims and provide balanced analysis.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Academic Research</h3>
                  <p className="text-gray-300">
                    We incorporate findings from academic research on misinformation, media literacy, and cognitive
                    biases to continuously improve our detection algorithms.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">User Feedback</h3>
                  <p className="text-gray-300">
                    We use anonymized user feedback to refine our system and address emerging patterns of
                    misinformation, ensuring our AI stays current with evolving tactics.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="disclaimer">
            <Card className="bg-gray-800/50 border-none backdrop-blur-md">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertTriangle className="mr-2 h-6 w-6 text-yellow-500" />
                  Important Disclaimer
                </CardTitle>
                <CardDescription>Please read before using Truth Guardian AI</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3">Not Infallible</h3>
                  <p className="text-gray-300">
                    While Truth Guardian AI uses advanced technology to detect misinformation, no AI system is perfect.
                    Our truth scores represent probability assessments based on available data, not absolute
                    determinations of truth.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Use Critical Thinking</h3>
                  <p className="text-gray-300">
                    This tool is designed to supplement, not replace, critical thinking and media literacy. We encourage
                    users to consider multiple sources and perspectives when evaluating information.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Evolving Context</h3>
                  <p className="text-gray-300">
                    Information that appears false or misleading may later be confirmed as true as new evidence emerges.
                    Our system provides assessments based on information available at the time of analysis.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Privacy Commitment</h3>
                  <p className="text-gray-300">
                    We do not store the content you submit for verification longer than necessary to provide our
                    service. Your privacy and data security are paramount to our mission.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  )
}
