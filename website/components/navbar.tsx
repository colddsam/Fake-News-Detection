"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { Shield, Menu, X, User, LogOut, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"



export default function Navbar() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, signOut } = useAuth()
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  const navItems = [
    { name: "About", path: "/about" },
    { name: "Pricing", path: "/pricing" },
    { name: "Verify Text", path: "/verify/text" },
    { name: "Verify social", path: "/verify/social" },
    { name: "Verify Image", path: "/verify/image" },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-lg border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center">
            <Shield className="h-8 w-8 text-primary mr-2" />
            <span className="font-bold text-xl">Truth Guardian</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary relative group",
                  pathname === item.path ? "text-primary" : "text-gray-300",
                )}
              >
                {item.name}
                <motion.span
                  className={cn(
                    "absolute -bottom-1 left-0 h-[2px] bg-primary",
                    pathname === item.path ? "w-full" : "w-0",
                  )}
                  initial={false}
                  animate={{ width: pathname === item.path ? "100%" : "0%" }}
                  transition={{ duration: 0.3 }}
                />
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center">
                <div className="mr-4 flex items-center">
                  <span className="text-sm font-medium text-gray-300 mr-2">Credits:</span>
                  <span className="text-sm font-bold text-primary">{user.credits}</span>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                        <AvatarFallback className="bg-primary/20 text-primary">
                          {user.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user.name}</p>
                        <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/profile">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/pricing">
                      <CreditCard className="mr-2 h-4 w-4" />
                      <span>Buy Credits</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={signOut}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <Button
                asChild
                className="bg-gradient-to-r from-primary to-pink-500 hover:shadow-lg hover:shadow-primary/50"
              >
                <Link href="/sign-in">Sign In</Link>
              </Button>
            )}
          </div>
          <div className="flex md:hidden items-center space-x-4">
          {user && (
  <div className="mr-4 flex items-center">
    <span className="text-sm font-medium text-gray-300 mr-2">Credits:</span>
    <span className="text-sm font-bold text-primary">{user.credits}</span>
  </div>
)}

          <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMenu}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
            </div>
        </div>
      </div>

      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden bg-gray-900/80 backdrop-blur-md border-b border-white/10"
        >
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary p-2 rounded-md",
                    pathname === item.path ? "bg-gray-800/50 text-primary" : "text-gray-300",
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              {user ? (
                <>
                  <div className="pt-2 border-t border-gray-700">
                    <div className="flex items-center p-2">
                      <Avatar className="h-8 w-8 mr-2">
                        <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                        <AvatarFallback className="bg-primary/20 text-primary">
                          {user.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{user.name}</p>
                        <p className="text-xs text-gray-400">{user.email}</p>
                      </div>
                    </div>
                  </div>
                  <Link
                    href="/profile"
                    className="flex items-center p-2 text-gray-300 hover:text-primary hover:bg-gray-800/50 rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                  <Link
                    href="/pricing"
                    className="flex items-center p-2 text-gray-300 hover:text-primary hover:bg-gray-800/50 rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <CreditCard className="mr-2 h-4 w-4" />
                    Buy Credits
                  </Link>
                  <Button
                    variant="ghost"
                    className="justify-start px-2 text-red-400 hover:text-red-300 hover:bg-red-900/20"
                    onClick={() => {
                      signOut()
                      setIsMenuOpen(false)
                    }}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </Button>
                </>
              ) : (
                <div className="pt-2 border-t border-gray-700">
                  <Button
                    asChild
                    className="w-full bg-gradient-to-r from-primary to-pink-500 hover:shadow-lg hover:shadow-primary/50"
                  >
                    <Link href="/sign-in" onClick={() => setIsMenuOpen(false)}>
                      Sign In
                    </Link>
                  </Button>
                </div>
              )}
            </nav>
          </div>
        </motion.div>
      )}
    </header>
  )
}
