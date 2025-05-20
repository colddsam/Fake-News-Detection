"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import { auth, db } from "@/lib/firebase"
import { collection, query, orderBy, limit, getDocs,addDoc,where } from "firebase/firestore"

import {
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth"
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  serverTimestamp
} from "firebase/firestore"

type User = {
  id: string
  name: string
  email: string
  credits: number
  avatar?: string
}

type AuthContextType = {
  user: User | null
  isLoading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signInWithGoogle: () => Promise<void>
  signUp: (name: string, email: string, password: string) => Promise<void>
  signOut: () => void
  deductCredits: (amount: number) => Promise<boolean>
  addCredits: (amount: number) => void
  updateProfile: (updates: { name?: string; avatar?: string }) => Promise<void>
  saveVerification: (response: any) => Promise<void>
  fetchUserVerifications: (userId: string) => Promise<any[]>  
}


const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const userDocRef = doc(db, "users", firebaseUser.uid)
        const userDoc = await getDoc(userDocRef)

        if (userDoc.exists()) {
          const userData = userDoc.data()
          setUser({
            id: firebaseUser.uid,
            name: userData.name,
            email: userData.email,
            credits: userData.credits,
            avatar: firebaseUser.photoURL || userData.avatar || undefined,
          })
        } else {
          setUser(null)
        }
      } else {
        setUser(null)
      }
      setIsLoading(false)
    })
    return () => unsubscribe()
  }, [])

  useEffect(() => {
    if (user) {
      localStorage.setItem("credits", String(user.credits))
    }
  }, [user])

  const saveVerification = async (response: any): Promise<void> => {
    if (!user) return
    try {
      const verificationsRef = collection(db, "verifications")
      await addDoc(verificationsRef, {
        userId: user.id,
        ...response,
        timestamp: serverTimestamp(),
      })
    } catch (error: any) {
      console.error("Error saving verification:", error.message)
    }
  }
  


  const fetchUserVerifications = async (userId: string): Promise<any[]> => {
    try {
      const verificationsRef = collection(db, "verifications")
      const q = query(
        verificationsRef,
        where("userId", "==", userId),
        orderBy("timestamp", "desc"),
        limit(10)
      )
      const querySnapshot = await getDocs(q)
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    } catch (error: any) {
      console.error("Error fetching verifications:", error.message)
      return []
    }
  }
  
  


  const updateProfile = async (updates: { name?: string; avatar?: string }) => {
    if (!user) return

    const updatedUser = {
      ...user,
      name: updates.name || user.name,
      avatar: updates.avatar || user.avatar,
    }

    const userDocRef = doc(db, "users", user.id)
    await updateDoc(userDocRef, {
      name: updatedUser.name,
      ...(updates.avatar && { avatar: updates.avatar }),
    })

    setUser(updatedUser)

    toast({
      title: "Profile updated",
      description: "Your profile has been updated successfully.",
    })
  }

  const signIn = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      await setPersistence(auth, browserLocalPersistence)

      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      const firebaseUser = userCredential.user

      const userDocRef = doc(db, "users", firebaseUser.uid)
      const userDoc = await getDoc(userDocRef)

      if (userDoc.exists()) {
        const userData = userDoc.data()
        setUser({
          id: firebaseUser.uid,
          name: userData.name,
          email: userData.email,
          credits: userData.credits,
          avatar: firebaseUser.photoURL || userData.avatar || undefined,
        })
        toast({ title: "Signed in", description: "Welcome back!" })
        router.push("/")
      } else {
        throw new Error("User data not found in Firestore")
      }
    } catch (error: any) {
      toast({
        title: "Sign in failed",
        description: error.message,
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  const signInWithGoogle = async () => {
    setIsLoading(true)
    try {
      const provider = new GoogleAuthProvider()
      await setPersistence(auth, browserLocalPersistence)

      const result = await signInWithPopup(auth, provider)
      const user = result.user
      const userDocRef = doc(db, "users", user.uid)
      const userDoc = await getDoc(userDocRef)

      let credits = 15

      if (!userDoc.exists()) {
        await setDoc(userDocRef, {
          id: user.uid,
          name: user.displayName || "Google User",
          email: user.email || "",
          credits,
          avatar: user.photoURL || "",
        })
      } else {
        const data = userDoc.data()
        credits = data.credits
      }

      setUser({
        id: user.uid,
        name: user.displayName || "Google User",
        email: user.email || "",
        credits,
        avatar: user.photoURL || undefined,
      })

      toast({
        title: "Signed in with Google",
        description: `Welcome, ${user.displayName || "Google User"}`
      })
      router.push("/")
    } catch (error: any) {
      toast({
        title: "Google Sign in failed",
        description: error.message,
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  const signUp = async (name: string, email: string, password: string) => {
    setIsLoading(true)
    try {
      await setPersistence(auth, browserLocalPersistence)

      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const firebaseUser = userCredential.user
      const credits = 15

      const userDocRef = doc(db, "users", firebaseUser.uid)
      await setDoc(userDocRef, {
        id: firebaseUser.uid,
        name,
        email,
        credits,
        avatar: "",
      })

      setUser({ id: firebaseUser.uid, name, email, credits })
      toast({ title: "Account created", description: "Welcome aboard!" })
      router.push("/")
    } catch (error: any) {
      toast({ title: "Sign up failed", description: error.message, variant: "destructive" })
    } finally {
      setIsLoading(false)
    }
  }

  const signOut = () => {
    firebaseSignOut(auth)
    setUser(null)
    toast({ title: "Signed out", description: "See you again!" })
    router.push("/")
  }

  const deductCredits = async (amount: number) => {
    if (!user || user.credits < amount) {
      toast({
        title: "Insufficient credits",
        description: "Please add more credits.",
        variant: "destructive",
      })
      return false
    }

    const newCredits = user.credits - amount
    setUser({ ...user, credits: newCredits })

    const userDocRef = doc(db, "users", user.id)
    await updateDoc(userDocRef, { credits: newCredits })

    return true
  }

  const addCredits = async (amount: number) => {
    if (!user) return

    const newCredits = user.credits + amount
    setUser({ ...user, credits: newCredits })

    const userDocRef = doc(db, "users", user.id)
    await updateDoc(userDocRef, { credits: newCredits })

    toast({ title: "Credits added", description: `+${amount} credits` })
  }

  return (
    <AuthContext.Provider
  value={{
    user,
    isLoading,
    signIn,
    signInWithGoogle,
    signUp,
    signOut,
    deductCredits,
    addCredits,
    updateProfile,
    saveVerification,
    fetchUserVerifications, 
  }}
>

      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error("useAuth must be used within AuthProvider")
  return context
}
