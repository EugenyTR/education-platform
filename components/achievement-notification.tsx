"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { X, Star } from "lucide-react"

interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  points: number
}

interface AchievementNotificationProps {
  achievement: Achievement | null
  onClose: () => void
}

export function AchievementNotification({ achievement, onClose }: AchievementNotificationProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (achievement) {
      setIsVisible(true)
      const timer = setTimeout(() => {
        setIsVisible(false)
        setTimeout(onClose, 300) // Wait for animation to complete
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [achievement, onClose])

  if (!achievement) return null

  return (
    <div
      className={`fixed top-4 right-4 z-50 transition-all duration-300 ${
        isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
      }`}
    >
      <Card className="w-80 bg-gradient-to-br from-accent/20 to-secondary/20 border-accent shadow-lg">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Star className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-accent">Новое достижение!</span>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setIsVisible(false)}>
              <X className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex items-center space-x-3">
            <div className="text-2xl animate-bounce">{achievement.icon}</div>
            <div className="flex-1">
              <h4 className="font-semibold">{achievement.title}</h4>
              <p className="text-sm text-muted-foreground">{achievement.description}</p>
              <Badge variant="default" className="mt-1">
                +{achievement.points} баллов
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
