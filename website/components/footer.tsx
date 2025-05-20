import Link from "next/link"
import { Shield, Github, Twitter, Linkedin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 py-12 mt-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="flex items-center mb-6 md:mb-0">
            <Shield className="h-8 w-8 text-primary mr-2" />
            <span className="font-bold text-xl">Truth Guardian</span>
          </div>

          <div className="flex space-x-6">
            <Link
              href="https://github.com/colddsam"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-primary transition-colors"
            >
              <Github className="h-5 w-5" />
            </Link>
            <Link
              href="https://x.com/colddsam"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-primary transition-colors"
            >
              <Twitter className="h-5 w-5" />
            </Link>
            <Link
              href="https://www.linkedin.com/in/colddsam/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-primary transition-colors"
            >
              <Linkedin className="h-5 w-5" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-semibold mb-4">About</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-primary transition-colors">
                  Our Mission
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-primary transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-primary transition-colors">
                  Data Sources
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/verify/text" className="text-gray-400 hover:text-primary transition-colors">
                  Text Verification
                </Link>
              </li>
              <li>
                <Link href="/verify/image" className="text-gray-400 hover:text-primary transition-colors">
                  Image Analysis
                </Link>
              </li>
              <li>
                <Link href="/verify/social" className="text-gray-400 hover:text-primary transition-colors">
                  Social Media Check
                </Link>
              </li>
            </ul>
          </div>

          

          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="https://github.com/colddsam/TRUTH-GUARDIAN-/blob/main/LICENSE" className="text-gray-400 hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="https://github.com/colddsam/TRUTH-GUARDIAN-/blob/main/LICENSE" className="text-gray-400 hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="https://github.com/colddsam/TRUTH-GUARDIAN-/blob/main/LICENSE" className="text-gray-400 hover:text-primary transition-colors">
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="text-center text-gray-500 text-sm pt-8 border-t border-gray-800">
          <p>&copy; {new Date().getFullYear()} Truth Guardian AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
