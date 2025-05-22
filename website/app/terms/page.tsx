"use client"

import { motion } from "framer-motion"
import { ArrowLeft, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <div className="flex items-center mb-6">
          <Button variant="ghost" asChild className="mr-4">
            <Link href="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Link>
          </Button>
          <h1 className="text-2xl md:text-3xl font-bold">Terms and Conditions</h1>
        </div>

        <Card className="bg-gray-800/50 border-none backdrop-blur-md mb-8">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <Shield className="h-5 w-5 text-primary mr-2" />
              Truth Guardian AI Terms of Service
            </CardTitle>
            <p className="text-sm text-gray-400">Last Updated: May 22, 2025</p>
          </CardHeader>
          <CardContent className="pt-4">
            <Tabs defaultValue="terms" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger
                  value="terms"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-pink-500"
                >
                  Terms Overview
                </TabsTrigger>
                <TabsTrigger
                  value="user"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-pink-500"
                >
                  User Guidelines
                </TabsTrigger>
                <TabsTrigger
                  value="legal"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-pink-500"
                >
                  Legal Provisions
                </TabsTrigger>
              </TabsList>

              <TabsContent value="terms" className="space-y-6">
                <section>
                  <h2 className="text-xl font-semibold mb-3">1. Acceptance of Terms</h2>
                  <p className="text-gray-300 mb-4">
                    Welcome to Truth Guardian AI. By accessing or using our website, mobile applications, or any of our
                    services, you agree to be bound by these Terms and Conditions. If you do not agree to all of these
                    terms, you may not access or use our services.
                  </p>
                  <p className="text-gray-300">
                    These Terms constitute a legally binding agreement between you and Truth Guardian AI regarding your
                    use of our fake news detection and content verification services.
                  </p>
                </section>

                <Separator className="my-6 bg-gray-700" />

                <section>
                  <h2 className="text-xl font-semibold mb-3">2. Description of Services</h2>
                  <p className="text-gray-300 mb-4">
                    Truth Guardian AI provides artificial intelligence-powered tools designed to help users detect
                    potential misinformation and verify the authenticity of content across various media formats,
                    including text, images, and social media posts.
                  </p>
                  <p className="text-gray-300 mb-4">Our services include, but are not limited to:</p>
                  <ul className="list-disc pl-6 space-y-2 text-gray-300">
                    <li>Text content verification</li>
                    <li>Image analysis and verification</li>
                    <li>Social media content verification</li>
                    <li>Truth score assessment</li>
                    <li>Source credibility evaluation</li>
                  </ul>
                </section>

                <Separator className="my-6 bg-gray-700" />

                <section>
                  <h2 className="text-xl font-semibold mb-3">3. Account Registration</h2>
                  <p className="text-gray-300 mb-4">
                    To access certain features of our services, you may be required to register for an account. You
                    agree to provide accurate, current, and complete information during the registration process and to
                    update such information to keep it accurate, current, and complete.
                  </p>
                  <p className="text-gray-300">
                    You are responsible for safeguarding your password and for all activities that occur under your
                    account. You agree to notify us immediately of any unauthorized use of your account or any other
                    breach of security.
                  </p>
                </section>

                <Separator className="my-6 bg-gray-700" />

                <section>
                  <h2 className="text-xl font-semibold mb-3">4. Credit System and Payments</h2>
                  <p className="text-gray-300 mb-4">
                    Our services operate on a credit-based system. Users may purchase credits to access verification
                    services, with each verification consuming a specified number of credits.
                  </p>
                  <p className="text-gray-300 mb-4">
                    All payments are processed securely through our payment processors. By making a purchase, you
                    represent and warrant that you have the legal right to use the payment method provided.
                  </p>
                  <p className="text-gray-300">
                    Prices for our services may change at any time, and we do not provide price protection or refunds in
                    the event of a price reduction or promotional offering.
                  </p>
                </section>
              </TabsContent>

              <TabsContent value="user" className="space-y-6">
                <section>
                  <h2 className="text-xl font-semibold mb-3">5. User Conduct and Responsibilities</h2>
                  <p className="text-gray-300 mb-4">When using our services, you agree not to:</p>
                  <ul className="list-disc pl-6 space-y-2 text-gray-300">
                    <li>Use our services for any illegal purpose or in violation of any laws</li>
                    <li>Infringe upon the intellectual property rights of others</li>
                    <li>Upload or transmit viruses, malware, or other malicious code</li>
                    <li>Attempt to gain unauthorized access to our systems or user accounts</li>
                    <li>Interfere with or disrupt the integrity or performance of our services</li>
                    <li>Harass, abuse, or harm another person through use of our services</li>
                    <li>Submit content that is defamatory, obscene, or otherwise objectionable</li>
                    <li>Attempt to deceive or mislead other users or our verification systems</li>
                  </ul>
                </section>

                <Separator className="my-6 bg-gray-700" />

                <section>
                  <h2 className="text-xl font-semibold mb-3">6. Content Submission</h2>
                  <p className="text-gray-300 mb-4">
                    When you submit content for verification through our services, you grant us a non-exclusive,
                    worldwide, royalty-free license to use, store, and process that content for the purpose of providing
                    our verification services.
                  </p>
                  <p className="text-gray-300">
                    You represent and warrant that you own or have the necessary rights to the content you submit, and
                    that such content does not violate the rights of any third party, including intellectual property
                    rights, privacy rights, or publicity rights.
                  </p>
                </section>

                <Separator className="my-6 bg-gray-700" />

                <section>
                  <h2 className="text-xl font-semibold mb-3">7. Sharing and Social Features</h2>
                  <p className="text-gray-300 mb-4">
                    Our services may include features that allow you to share verification results with others. You are
                    solely responsible for any content you choose to share and the consequences of sharing such content.
                  </p>
                  <p className="text-gray-300">
                    When sharing verification results, you agree not to misrepresent our findings or present them in a
                    misleading context. Truth Guardian AI reserves the right to disable sharing features for any user
                    who violates these terms.
                  </p>
                </section>

                <Separator className="my-6 bg-gray-700" />

                <section>
                  <h2 className="text-xl font-semibold mb-3">8. Termination</h2>
                  <p className="text-gray-300 mb-4">
                    We may terminate or suspend your account and access to our services immediately, without prior
                    notice or liability, for any reason, including if you breach these Terms and Conditions.
                  </p>
                  <p className="text-gray-300">
                    Upon termination, your right to use our services will immediately cease. All provisions of these
                    Terms which by their nature should survive termination shall survive, including ownership
                    provisions, warranty disclaimers, indemnity, and limitations of liability.
                  </p>
                </section>
              </TabsContent>

              <TabsContent value="legal" className="space-y-6">
                <section>
                  <h2 className="text-xl font-semibold mb-3">9. Intellectual Property</h2>
                  <p className="text-gray-300 mb-4">
                    The Truth Guardian AI service, including its name, logo, software, algorithms, user interface, and
                    content (excluding user-submitted content), are owned by or licensed to Truth Guardian AI and are
                    protected by copyright, trademark, and other intellectual property laws.
                  </p>
                  <p className="text-gray-300">
                    You may not use, copy, reproduce, distribute, transmit, broadcast, display, sell, license, or
                    otherwise exploit any content from our services for any purpose without our prior written consent.
                  </p>
                </section>

                <Separator className="my-6 bg-gray-700" />

                <section>
                  <h2 className="text-xl font-semibold mb-3">10. Disclaimer of Warranties</h2>
                  <p className="text-gray-300 mb-4">
                    OUR SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS
                    OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
                    PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
                  </p>
                  <p className="text-gray-300 mb-4">
                    We do not guarantee that our services will be uninterrupted, secure, or error-free, or that defects
                    will be corrected. We do not warrant the accuracy, completeness, or reliability of any verification
                    results or other content provided through our services.
                  </p>
                  <p className="text-gray-300">
                    Our verification technology is designed to provide probability assessments based on available data,
                    not absolute determinations of truth. Users should exercise their own judgment and critical thinking
                    when evaluating information.
                  </p>
                </section>

                <Separator className="my-6 bg-gray-700" />

                <section>
                  <h2 className="text-xl font-semibold mb-3">11. Limitation of Liability</h2>
                  <p className="text-gray-300 mb-4">
                    TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, TRUTH GUARDIAN AI AND ITS OFFICERS, DIRECTORS,
                    EMPLOYEES, AND AGENTS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR
                    PUNITIVE DAMAGES, INCLUDING LOSS OF PROFITS, DATA, OR GOODWILL, ARISING OUT OF OR IN CONNECTION WITH
                    YOUR USE OF OUR SERVICES.
                  </p>
                  <p className="text-gray-300">
                    IN NO EVENT SHALL OUR TOTAL LIABILITY TO YOU FOR ALL CLAIMS EXCEED THE AMOUNT PAID BY YOU, IF ANY,
                    FOR ACCESSING OUR SERVICES DURING THE TWELVE (12) MONTHS PRECEDING THE CLAIM.
                  </p>
                </section>

                <Separator className="my-6 bg-gray-700" />

                <section>
                  <h2 className="text-xl font-semibold mb-3">12. Indemnification</h2>
                  <p className="text-gray-300 mb-4">
                    You agree to defend, indemnify, and hold harmless Truth Guardian AI and its officers, directors,
                    employees, and agents from and against any claims, liabilities, damages, losses, and expenses,
                    including reasonable attorneys' fees, arising out of or in any way connected with your access to or
                    use of our services, your violation of these Terms, or your violation of any rights of another.
                  </p>
                </section>

                <Separator className="my-6 bg-gray-700" />

                <section>
                  <h2 className="text-xl font-semibold mb-3">13. Governing Law and Dispute Resolution</h2>
                  <p className="text-gray-300 mb-4">
                    These Terms shall be governed by and construed in accordance with the laws of [Jurisdiction],
                    without regard to its conflict of law provisions.
                  </p>
                  <p className="text-gray-300 mb-4">
                    Any dispute arising from or relating to these Terms or our services shall first be attempted to be
                    resolved through informal negotiation. If the dispute cannot be resolved through negotiation, it
                    shall be submitted to binding arbitration in accordance with the rules of [Arbitration Association].
                  </p>
                </section>

                <Separator className="my-6 bg-gray-700" />

                <section>
                  <h2 className="text-xl font-semibold mb-3">14. Changes to Terms</h2>
                  <p className="text-gray-300 mb-4">
                    We reserve the right to modify these Terms at any time. We will provide notice of significant
                    changes by posting the updated Terms on our website and updating the "Last Updated" date at the top
                    of these Terms.
                  </p>
                  <p className="text-gray-300">
                    Your continued use of our services after such changes constitutes your acceptance of the new Terms.
                    If you do not agree to the modified terms, you should discontinue your use of our services.
                  </p>
                </section>

                <Separator className="my-6 bg-gray-700" />

                <section>
                  <h2 className="text-xl font-semibold mb-3">15. Contact Information</h2>
                  <p className="text-gray-300 mb-4">
                    If you have any questions about these Terms, please contact us at:
                  </p>
                  <p className="text-gray-300">
                    Email: legal@truthguardian.ai
                    <br />
                    Address: 123 AI Boulevard, Tech City, TC 12345
                  </p>
                </section>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="flex justify-center">
          <Button asChild>
            <Link href="/privacy">View Privacy Policy</Link>
          </Button>
        </div>
      </motion.div>
    </div>
  )
}
