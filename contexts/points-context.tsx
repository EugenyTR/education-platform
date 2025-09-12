"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useAuth } from "./auth-context"

interface PointTransaction {
  id: string
  userId: string
  type: "video_watch" | "correct_answer" | "donation" | "purchase" | "shared_received" | "shared_sent" | "manual_admin"
  amount: number
  description: string
  timestamp: Date
  relatedId?: string // course/video/user ID
}

interface PointsContextType {
  userPoints: number
  transactions: PointTransaction[]
  addPoints: (type: PointTransaction["type"], amount: number, description: string, relatedId?: string) => void
  sharePoints: (recipientId: string, amount: number, message?: string) => Promise<boolean>
  requestPoints: (fromUserId: string, amount: number, message?: string) => Promise<boolean>
  getPointsHistory: () => PointTransaction[]
  canAfford: (amount: number) => boolean
}

const PointsContext = createContext<PointsContextType | undefined>(undefined)

export function PointsProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  const [userPoints, setUserPoints] = useState(0)
  const [transactions, setTransactions] = useState<PointTransaction[]>([])

  useEffect(() => {
    if (user) {
      // Load user points and transactions from localStorage
      const savedPoints = localStorage.getItem(`points_${user.id}`)
      const savedTransactions = localStorage.getItem(`transactions_${user.id}`)

      if (savedPoints) {
        setUserPoints(Number.parseInt(savedPoints))
      }

      if (savedTransactions) {
        setTransactions(JSON.parse(savedTransactions))
      } else {
        // Give new users some starting points
        const welcomeTransaction: PointTransaction = {
          id: Date.now().toString(),
          userId: user.id,
          type: "manual_admin",
          amount: 100,
          description: "Добро пожаловать! Стартовые баллы",
          timestamp: new Date(),
        }
        setTransactions([welcomeTransaction])
        setUserPoints(100)
      }
    }
  }, [user])

  useEffect(() => {
    if (user) {
      localStorage.setItem(`points_${user.id}`, userPoints.toString())
      localStorage.setItem(`transactions_${user.id}`, JSON.stringify(transactions))
    }
  }, [userPoints, transactions, user])

  const addPoints = (type: PointTransaction["type"], amount: number, description: string, relatedId?: string) => {
    if (!user) return

    const transaction: PointTransaction = {
      id: Date.now().toString(),
      userId: user.id,
      type,
      amount,
      description,
      timestamp: new Date(),
      relatedId,
    }

    setTransactions((prev) => [transaction, ...prev])
    setUserPoints((prev) => prev + amount)
  }

  const sharePoints = async (recipientId: string, amount: number, message?: string): Promise<boolean> => {
    if (!user || userPoints < amount) return false

    // Deduct points from sender
    const sendTransaction: PointTransaction = {
      id: Date.now().toString(),
      userId: user.id,
      type: "shared_sent",
      amount: -amount,
      description: `Отправлено пользователю ${recipientId}${message ? `: ${message}` : ""}`,
      timestamp: new Date(),
      relatedId: recipientId,
    }

    setTransactions((prev) => [sendTransaction, ...prev])
    setUserPoints((prev) => prev - amount)

    // Add points to recipient (simplified - in real app would be server-side)
    const recipientPoints = localStorage.getItem(`points_${recipientId}`) || "0"
    const recipientTransactions = JSON.parse(localStorage.getItem(`transactions_${recipientId}`) || "[]")

    const receiveTransaction: PointTransaction = {
      id: (Date.now() + 1).toString(),
      userId: recipientId,
      type: "shared_received",
      amount: amount,
      description: `Получено от ${user.name} ${user.surname}${message ? `: ${message}` : ""}`,
      timestamp: new Date(),
      relatedId: user.id,
    }

    localStorage.setItem(`points_${recipientId}`, (Number.parseInt(recipientPoints) + amount).toString())
    localStorage.setItem(`transactions_${recipientId}`, JSON.stringify([receiveTransaction, ...recipientTransactions]))

    return true
  }

  const requestPoints = async (fromUserId: string, amount: number, message?: string): Promise<boolean> => {
    // In a real app, this would send a notification to the target user
    // For now, we'll just create a pending request record
    console.log(`Запрос ${amount} баллов от пользователя ${fromUserId}: ${message}`)
    return true
  }

  const getPointsHistory = () => transactions

  const canAfford = (amount: number) => userPoints >= amount

  return (
    <PointsContext.Provider
      value={{
        userPoints,
        transactions,
        addPoints,
        sharePoints,
        requestPoints,
        getPointsHistory,
        canAfford,
      }}
    >
      {children}
    </PointsContext.Provider>
  )
}

export function usePoints() {
  const context = useContext(PointsContext)
  if (context === undefined) {
    throw new Error("usePoints must be used within a PointsProvider")
  }
  return context
}
