"use client"

import { motion } from "framer-motion"
import { ArrowLeft, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function PrivacyPolicyPage() {
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
          <h1 className="text-2xl md:text-3xl font-bold">Privacy Policy</h1>
        </div>

        <Card className="bg-gray-800/50 border-none backdrop-blur-md mb-8">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <Lock className="h-5 w-5 text-primary mr-2" />
              Truth Guardian AI Privacy Policy
            </CardTitle>
            <p className="text-sm text-gray-400">Last Updated: May 22, 2025</p>
          </CardHeader>
          <CardContent className="pt-4">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger
                  value="overview"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-pink-500"
                >
                  Overview
                </TabsTrigger>
                <TabsTrigger
                  value="data"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-pink-500"
                >
                  Data Practices
                </TabsTrigger>
                <TabsTrigger
                  value="rights"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-pink-500"
                >
                  Your Rights
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <section>
                  <h2 className="text-xl font-semibold mb-3">1. Introduction</h2>
                  <p className="text-gray-300 mb-4">
                    At Truth Guardian AI, we are committed to protecting your privacy and ensuring the security of your
                    personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your
                    information when you use our fake news detection and content verification services.
                  </p>
                  <p className="text-gray-300">
                    By accessing or using our services, you consent to the data practices described in this Privacy
                    Policy. If you do not agree with our policies and practices, please do not use our services.
                  </p>
                </section>

                <Separator className="my-6 bg-gray-700" />

                <section>
                  <h2 className="text-xl font-semibold mb-3">2. Information We Collect</h2>
                  <p className="text-gray-300 mb-4">
                    We collect several types of information from and about users of our services, including:
                  </p>
                  <h3 className="text-lg font-medium mb-2">2.1 Personal Information</h3>
                  <ul className="list-disc pl-6 space-y-2 text-gray-300 mb-4">
                    <li>
                      <span className="font-medium">Account Information:</span> When you register for an account, we
                      collect your name, email address, and password.
                    </li>
                    <li>
                      <span className="font-medium">Payment Information:</span> When you purchase credits, we collect
                      payment information, which may include credit card details, billing address, and transaction
                      history.
                    </li>
                    <li>
                      <span className="font-medium">Profile Information:</span> Information you provide in your user
                      profile, such as profile pictures or biographical information.
                    </li>
                  </ul>

                  <h3 className="text-lg font-medium mb-2">2.2 Content Information</h3>
                  <ul className="list-disc pl-6 space-y-2 text-gray-300 mb-4">
                    <li>
                      <span className="font-medium">Verification Submissions:</span> Text, images, URLs, or other
                      content you submit for verification.
                    </li>
                    <li>
                      <span className="font-medium">Verification Results:</span> The results of our analysis, including
                      truth scores, verdicts, and supporting evidence.
                    </li>
                    <li>
                      <span className="font-medium">Shared Content:</span> Information about content you share through
                      our platform.
                    </li>
                  </ul>

                  <h3 className="text-lg font-medium mb-2">2.3 Usage Information</h3>
                  <ul className="list-disc pl-6 space-y-2 text-gray-300">
                    <li>
                      <span className="font-medium">Log Data:</span> Information about your use of our services,
                      including access times, pages viewed, and the routes by which you access our services.
                    </li>
                    <li>
                      <span className="font-medium">Device Information:</span> Information about the device you use to
                      access our services, including hardware model, operating system, unique device identifiers, and
                      mobile network information.
                    </li>
                    <li>
                      <span className="font-medium">Cookies and Similar Technologies:</span> Information collected
                      through cookies, web beacons, and other tracking technologies.
                    </li>
                  </ul>
                </section>

                <Separator className="my-6 bg-gray-700" />

                <section>
                  <h2 className="text-xl font-semibold mb-3">3. How We Collect Information</h2>
                  <p className="text-gray-300 mb-4">We collect information through:</p>
                  <ul className="list-disc pl-6 space-y-2 text-gray-300">
                    <li>
                      <span className="font-medium">Direct Interactions:</span> Information you provide when creating an
                      account, purchasing credits, submitting content for verification, or communicating with us.
                    </li>
                    <li>
                      <span className="font-medium">Automated Technologies:</span> As you navigate through our services,
                      we may use cookies, server logs, and similar technologies to collect usage information
                      automatically.
                    </li>
                    <li>
                      <span className="font-medium">Third Parties:</span> We may receive information about you from
                      third parties, such as social media platforms, if you choose to link your accounts or share our
                      content.
                    </li>
                  </ul>
                </section>
              </TabsContent>

              <TabsContent value="data" className="space-y-6">
                <section>
                  <h2 className="text-xl font-semibold mb-3">4. How We Use Your Information</h2>
                  <p className="text-gray-300 mb-4">
                    We use the information we collect for various purposes, including:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-gray-300">
                    <li>
                      <span className="font-medium">Providing Our Services:</span> To operate, maintain, and improve our
                      fake news detection and content verification services.
                    </li>
                    <li>
                      <span className="font-medium">Processing Transactions:</span> To process payments, manage credits,
                      and fulfill purchases.
                    </li>
                    <li>
                      <span className="font-medium">User Authentication:</span> To verify your identity, manage your
                      account, and maintain security.
                    </li>
                    <li>
                      <span className="font-medium">Personalization:</span> To personalize your experience and deliver
                      content relevant to your interests.
                    </li>
                    <li>
                      <span className="font-medium">Communication:</span> To communicate with you about your account,
                      respond to inquiries, and provide customer support.
                    </li>
                    <li>
                      <span className="font-medium">Analytics:</span> To analyze usage patterns, track user engagement,
                      and improve our services.
                    </li>
                    <li>
                      <span className="font-medium">Research and Development:</span> To enhance our AI algorithms and
                      develop new features and services.
                    </li>
                    <li>
                      <span className="font-medium">Legal Compliance:</span> To comply with applicable laws,
                      regulations, and legal processes.
                    </li>
                  </ul>
                </section>

                <Separator className="my-6 bg-gray-700" />

                <section>
                  <h2 className="text-xl font-semibold mb-3">5. How We Share Your Information</h2>
                  <p className="text-gray-300 mb-4">We may share your information in the following circumstances:</p>
                  <ul className="list-disc pl-6 space-y-2 text-gray-300">
                    <li>
                      <span className="font-medium">Service Providers:</span> With third-party service providers who
                      perform services on our behalf, such as payment processing, data analysis, email delivery,
                      hosting, and customer service.
                    </li>
                    <li>
                      <span className="font-medium">Business Transfers:</span> In connection with a merger, acquisition,
                      reorganization, or sale of assets, in which case your information may be transferred as a business
                      asset.
                    </li>
                    <li>
                      <span className="font-medium">Legal Requirements:</span> When required by law, regulation, or
                      legal process, or to protect our rights, property, or safety, or those of our users or others.
                    </li>
                    <li>
                      <span className="font-medium">With Your Consent:</span> In other cases where we have your explicit
                      consent to share your information.
                    </li>
                    <li>
                      <span className="font-medium">Aggregated or De-identified Data:</span> We may share aggregated or
                      de-identified information that cannot reasonably be used to identify you.
                    </li>
                  </ul>
                </section>

                <Separator className="my-6 bg-gray-700" />

                <section>
                  <h2 className="text-xl font-semibold mb-3">6. Data Retention</h2>
                  <p className="text-gray-300 mb-4">
                    We retain your personal information for as long as necessary to fulfill the purposes outlined in
                    this Privacy Policy, unless a longer retention period is required or permitted by law.
                  </p>
                  <p className="text-gray-300 mb-4">
                    Content submitted for verification is retained only as long as necessary to provide our verification
                    services, typically for a period of 30 days, after which it is deleted from our active systems.
                    However, verification results may be retained for longer periods in anonymized or aggregated form
                    for research and improvement of our services.
                  </p>
                  <p className="text-gray-300">
                    You can request deletion of your account and associated personal information at any time, subject to
                    certain exceptions required by law.
                  </p>
                </section>

                <Separator className="my-6 bg-gray-700" />

                <section>
                  <h2 className="text-xl font-semibold mb-3">7. Data Security</h2>
                  <p className="text-gray-300 mb-4">
                    We implement appropriate technical and organizational measures to protect your personal information
                    against unauthorized access, alteration, disclosure, or destruction.
                  </p>
                  <p className="text-gray-300 mb-4">
                    Our security measures include encryption of sensitive data, regular security assessments, access
                    controls, and secure data storage practices.
                  </p>
                  <p className="text-gray-300">
                    However, no method of transmission over the Internet or electronic storage is 100% secure. While we
                    strive to use commercially acceptable means to protect your personal information, we cannot
                    guarantee its absolute security.
                  </p>
                </section>
              </TabsContent>

              <TabsContent value="rights" className="space-y-6">
                <section>
                  <h2 className="text-xl font-semibold mb-3">8. Your Rights and Choices</h2>
                  <p className="text-gray-300 mb-4">
                    Depending on your location, you may have certain rights regarding your personal information,
                    including:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-gray-300">
                    <li>
                      <span className="font-medium">Access:</span> The right to request access to the personal
                      information we hold about you.
                    </li>
                    <li>
                      <span className="font-medium">Correction:</span> The right to request correction of inaccurate or
                      incomplete personal information.
                    </li>
                    <li>
                      <span className="font-medium">Deletion:</span> The right to request deletion of your personal
                      information, subject to certain exceptions.
                    </li>
                    <li>
                      <span className="font-medium">Restriction:</span> The right to request restriction of processing
                      of your personal information.
                    </li>
                    <li>
                      <span className="font-medium">Data Portability:</span> The right to receive your personal
                      information in a structured, commonly used, and machine-readable format.
                    </li>
                    <li>
                      <span className="font-medium">Objection:</span> The right to object to processing of your personal
                      information.
                    </li>
                  </ul>
                  <p className="text-gray-300 mt-4">
                    To exercise these rights, please contact us using the information provided in the "Contact Us"
                    section below.
                  </p>
                </section>

                <Separator className="my-6 bg-gray-700" />

                <section>
                  <h2 className="text-xl font-semibold mb-3">9. Account Settings and Preferences</h2>
                  <p className="text-gray-300 mb-4">
                    You can update your account information and preferences at any time by accessing the "Profile" or
                    "Settings" section of your account. You can also:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-gray-300">
                    <li>Manage your communication preferences</li>
                    <li>Update your payment information</li>
                    <li>View your verification history</li>
                    <li>Delete shared verification results</li>
                  </ul>
                </section>

                <Separator className="my-6 bg-gray-700" />

                <section>
                  <h2 className="text-xl font-semibold mb-3">10. Children's Privacy</h2>
                  <p className="text-gray-300 mb-4">
                    Our services are not intended for children under the age of 16, and we do not knowingly collect
                    personal information from children under 16. If we learn that we have collected personal information
                    from a child under 16, we will take steps to delete that information as quickly as possible.
                  </p>
                  <p className="text-gray-300">
                    If you believe we might have any information from or about a child under 16, please contact us
                    immediately.
                  </p>
                </section>

                <Separator className="my-6 bg-gray-700" />

                <section>
                  <h2 className="text-xl font-semibold mb-3">11. International Data Transfers</h2>
                  <p className="text-gray-300 mb-4">
                    We are based in [Country], and your information may be processed and stored in [Country] and other
                    countries where our service providers maintain facilities. These countries may have data protection
                    laws that are different from those in your country.
                  </p>
                  <p className="text-gray-300">
                    By using our services, you consent to the transfer of your information to countries outside your
                    country of residence, including [Country], which may have different data protection rules than those
                    in your country.
                  </p>
                </section>

                <Separator className="my-6 bg-gray-700" />

                <section>
                  <h2 className="text-xl font-semibold mb-3">12. Changes to This Privacy Policy</h2>
                  <p className="text-gray-300 mb-4">
                    We may update this Privacy Policy from time to time to reflect changes in our practices or for other
                    operational, legal, or regulatory reasons. We will notify you of any material changes by posting the
                    updated Privacy Policy on our website and updating the "Last Updated" date.
                  </p>
                  <p className="text-gray-300">
                    Your continued use of our services after the effective date of the updated Privacy Policy
                    constitutes your acceptance of the changes. We encourage you to review this Privacy Policy
                    periodically.
                  </p>
                </section>

                <Separator className="my-6 bg-gray-700" />

                <section>
                  <h2 className="text-xl font-semibold mb-3">13. Contact Us</h2>
                  <p className="text-gray-300 mb-4">
                    If you have any questions, concerns, or requests regarding this Privacy Policy or our data
                    practices, please contact us at:
                  </p>
                  <p className="text-gray-300">
                    <span className="font-medium">Email:</span> privacy@truthguardian.ai
                    <br />
                    <span className="font-medium">Address:</span> 123 AI Boulevard, Tech City, TC 12345
                    <br />
                    <span className="font-medium">Data Protection Officer:</span> dpo@truthguardian.ai
                  </p>
                </section>

                <Separator className="my-6 bg-gray-700" />

                <section>
                  <h2 className="text-xl font-semibold mb-3">14. Specific Regional Privacy Rights</h2>
                  <h3 className="text-lg font-medium mb-2">14.1 California Privacy Rights</h3>
                  <p className="text-gray-300 mb-4">
                    If you are a California resident, you have specific rights under the California Consumer Privacy Act
                    (CCPA) and the California Privacy Rights Act (CPRA), including the right to know what personal
                    information we collect, the right to delete your personal information, the right to opt-out of the
                    sale of your personal information, and the right to non-discrimination for exercising your privacy
                    rights.
                  </p>

                  <h3 className="text-lg font-medium mb-2">14.2 European Economic Area (EEA) Privacy Rights</h3>
                  <p className="text-gray-300 mb-4">
                    If you are in the European Economic Area (EEA), you have rights under the General Data Protection
                    Regulation (GDPR). In addition to the rights outlined in Section 8, you have the right to lodge a
                    complaint with a supervisory authority if you believe our processing of your personal information
                    violates applicable law.
                  </p>

                  <h3 className="text-lg font-medium mb-2">14.3 Legal Basis for Processing (EEA)</h3>
                  <p className="text-gray-300">
                    If you are in the EEA, we process your personal information based on one or more of the following
                    legal grounds: (a) your consent; (b) performance of a contract with you; (c) compliance with a legal
                    obligation; or (d) our legitimate interests, provided they do not override your fundamental rights
                    and freedoms.
                  </p>
                </section>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="flex justify-center">
          <Button asChild>
            <Link href="/terms">View Terms and Conditions</Link>
          </Button>
        </div>
      </motion.div>
    </div>
  )
}
