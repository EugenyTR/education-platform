"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Award, Star, Share2, CheckCircle, ArrowLeft, Copy, Gift, TrendingUp } from "lucide-react"
import Link from "next/link"

// Achievement data with different types and conditions
const achievementsData = [
  {
    id: "first_course",
    title: "Первые шаги",
    description: "Завершите свой первый курс полностью",
    type: "course_completion",
    icon: "🎯",
    points: 50,
    condition: {
      type: "courses_completed",
      target: 1,
      current: 1,
    },
    status: "earned",
    earnedDate: "2024-01-20",
    isNew: false,
  },
  {
    id: "knowledge_seeker",
    title: "Знаток",
    description: "Завершите 5 курсов с оценкой выше 80%",
    type: "course_completion",
    icon: "📚",
    points: 150,
    condition: {
      type: "courses_completed",
      target: 5,
      current: 3,
    },
    status: "in_progress",
    earnedDate: null,
    isNew: false,
  },
  {
    id: "master",
    title: "Мастер обучения",
    description: "Завершите 10 курсов и получите средний балл 85+",
    type: "course_completion",
    icon: "🏆",
    points: 300,
    condition: {
      type: "courses_completed",
      target: 10,
      current: 3,
    },
    status: "locked",
    earnedDate: null,
    isNew: false,
  },
  {
    id: "full_registration",
    title: "Полная регистрация",
    description: "Заполните все поля в профиле",
    type: "profile",
    icon: "✅",
    points: 25,
    condition: {
      type: "profile_complete",
      target: 100,
      current: 100,
    },
    status: "earned",
    earnedDate: "2024-01-15",
    isNew: false,
  },
  {
    id: "social_butterfly",
    title: "Социальная активность",
    description: "Подпишитесь на все наши социальные сети",
    type: "social",
    icon: "🌐",
    points: 75,
    condition: {
      type: "social_subscriptions",
      target: 4,
      current: 2,
    },
    status: "in_progress",
    earnedDate: null,
    isNew: false,
  },
  {
    id: "friend_inviter_1",
    title: "Пригласи друга",
    description: "Пригласите 1 друга на платформу",
    type: "referral",
    icon: "👤",
    points: 100,
    condition: {
      type: "friends_invited",
      target: 1,
      current: 0,
    },
    status: "locked",
    earnedDate: null,
    isNew: false,
  },
  {
    id: "friend_inviter_3",
    title: "Командный игрок",
    description: "Пригласите 3 друзей на платформу",
    type: "referral",
    icon: "👥",
    points: 250,
    condition: {
      type: "friends_invited",
      target: 3,
      current: 0,
    },
    status: "locked",
    earnedDate: null,
    isNew: false,
  },
  {
    id: "friend_inviter_10",
    title: "Амбассадор",
    description: "Пригласите 10 друзей на платформу",
    type: "referral",
    icon: "🌟",
    points: 500,
    condition: {
      type: "friends_invited",
      target: 10,
      current: 0,
    },
    status: "locked",
    earnedDate: null,
    isNew: false,
  },
  {
    id: "big_spender",
    title: "Инвестор в знания",
    description: "Потратьте 10,000 рублей на курсы и донаты",
    type: "purchase",
    icon: "💎",
    points: 200,
    condition: {
      type: "total_spent",
      target: 10000,
      current: 3500,
    },
    status: "in_progress",
    earnedDate: null,
    isNew: false,
  },
  {
    id: "generous_supporter",
    title: "Щедрый покровитель",
    description: "Потратьте 25,000 рублей на курсы и донаты",
    type: "purchase",
    icon: "👑",
    points: 400,
    condition: {
      type: "total_spent",
      target: 25000,
      current: 3500,
    },
    status: "locked",
    earnedDate: null,
    isNew: false,
  },
]

export default function AchievementsPage() {
  const [selectedAchievement, setSelectedAchievement] = useState(null)
  const [showInviteDialog, setShowInviteDialog] = useState(false)
  const [inviteCode] = useState("ANNA2024")
  const [newAchievementDialog, setNewAchievementDialog] = useState(false)

  const earnedAchievements = achievementsData.filter((a) => a.status === "earned")
  const inProgressAchievements = achievementsData.filter((a) => a.status === "in_progress")
  const lockedAchievements = achievementsData.filter((a) => a.status === "locked")

  const totalPoints = earnedAchievements.reduce((sum, achievement) => sum + achievement.points, 0)

  // Simulate new achievement notification
  useEffect(() => {
    const timer = setTimeout(() => {
      // This would normally be triggered by actual achievement logic
      // setNewAchievementDialog(true)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  const getAchievementCardClass = (achievement) => {
    switch (achievement.status) {
      case "earned":
        return achievement.isNew
          ? "bg-gradient-to-br from-accent/20 to-secondary/20 border-accent shadow-lg animate-pulse"
          : "bg-gradient-to-br from-accent/10 to-secondary/10 border-accent/50"
      case "in_progress":
        return "bg-gradient-to-br from-muted/50 to-background border-muted"
      case "locked":
        return "bg-muted/20 border-muted opacity-60"
      default:
        return "bg-card"
    }
  }

  const getProgressPercentage = (achievement) => {
    if (achievement.status === "earned") return 100
    return Math.round((achievement.condition.current / achievement.condition.target) * 100)
  }

  const copyInviteCode = () => {
    navigator.clipboard.writeText(`https://education-platform.ru/invite/${inviteCode}`)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/profile">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Профиль
                </Button>
              </Link>
              <h1 className="text-2xl font-bold text-primary">Достижения</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-sm text-muted-foreground">Заработано баллов</div>
                <div className="text-xl font-bold text-accent">{totalPoints}</div>
              </div>
              <Button onClick={() => setShowInviteDialog(true)}>
                <Share2 className="w-4 h-4 mr-2" />
                Пригласить друга
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Achievement Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <Award className="w-8 h-8 text-accent mx-auto mb-2" />
                <div className="text-2xl font-bold">{earnedAchievements.length}</div>
                <div className="text-sm text-muted-foreground">Получено</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <TrendingUp className="w-8 h-8 text-secondary mx-auto mb-2" />
                <div className="text-2xl font-bold">{inProgressAchievements.length}</div>
                <div className="text-sm text-muted-foreground">В процессе</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Star className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                <div className="text-2xl font-bold">{lockedAchievements.length}</div>
                <div className="text-sm text-muted-foreground">Заблокировано</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Gift className="w-8 h-8 text-accent mx-auto mb-2" />
                <div className="text-2xl font-bold">{totalPoints}</div>
                <div className="text-sm text-muted-foreground">Баллов получено</div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="all" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">Все</TabsTrigger>
              <TabsTrigger value="earned">Получены</TabsTrigger>
              <TabsTrigger value="progress">В процессе</TabsTrigger>
              <TabsTrigger value="locked">Заблокированы</TabsTrigger>
            </TabsList>

            {/* All Achievements */}
            <TabsContent value="all" className="space-y-6">
              <AchievementGrid
                achievements={achievementsData}
                onSelect={setSelectedAchievement}
                getCardClass={getAchievementCardClass}
                getProgress={getProgressPercentage}
              />
            </TabsContent>

            {/* Earned Achievements */}
            <TabsContent value="earned" className="space-y-6">
              <AchievementGrid
                achievements={earnedAchievements}
                onSelect={setSelectedAchievement}
                getCardClass={getAchievementCardClass}
                getProgress={getProgressPercentage}
              />
            </TabsContent>

            {/* In Progress */}
            <TabsContent value="progress" className="space-y-6">
              <AchievementGrid
                achievements={inProgressAchievements}
                onSelect={setSelectedAchievement}
                getCardClass={getAchievementCardClass}
                getProgress={getProgressPercentage}
              />
            </TabsContent>

            {/* Locked */}
            <TabsContent value="locked" className="space-y-6">
              <AchievementGrid
                achievements={lockedAchievements}
                onSelect={setSelectedAchievement}
                getCardClass={getAchievementCardClass}
                getProgress={getProgressPercentage}
              />
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Achievement Detail Dialog */}
      {selectedAchievement && (
        <Dialog open={!!selectedAchievement} onOpenChange={() => setSelectedAchievement(null)}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <div className="flex items-center space-x-3 mb-4">
                <div className="text-4xl">{selectedAchievement.icon}</div>
                <div>
                  <DialogTitle>{selectedAchievement.title}</DialogTitle>
                  <Badge variant={selectedAchievement.status === "earned" ? "default" : "outline"}>
                    +{selectedAchievement.points} баллов
                  </Badge>
                </div>
              </div>
              <DialogDescription className="text-left">{selectedAchievement.description}</DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              {selectedAchievement.status !== "earned" && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Прогресс</span>
                    <span className="text-sm text-muted-foreground">
                      {selectedAchievement.condition.current} / {selectedAchievement.condition.target}
                    </span>
                  </div>
                  <Progress value={getProgressPercentage(selectedAchievement)} className="h-2" />
                </div>
              )}

              {selectedAchievement.status === "earned" && (
                <div className="flex items-center space-x-2 text-green-600">
                  <CheckCircle className="w-5 h-5" />
                  <span className="text-sm">
                    Получено {new Date(selectedAchievement.earnedDate).toLocaleDateString("ru-RU")}
                  </span>
                </div>
              )}

              {selectedAchievement.type === "referral" && (
                <div className="p-3 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    Приглашенные друзья получают первый семинар бесплатно!
                  </p>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Invite Friend Dialog */}
      <Dialog open={showInviteDialog} onOpenChange={setShowInviteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Пригласить друга</DialogTitle>
            <DialogDescription>
              Поделитесь ссылкой с друзьями и получите баллы за каждого зарегистрировавшегося
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Ваша реферальная ссылка</Label>
              <div className="flex space-x-2">
                <Input value={`https://education-platform.ru/invite/${inviteCode}`} readOnly className="flex-1" />
                <Button onClick={copyInviteCode} size="sm">
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="p-4 bg-accent/10 rounded-lg">
              <h4 className="font-semibold mb-2">Награды за приглашения:</h4>
              <div className="space-y-1 text-sm">
                <div>• 1 друг = 100 баллов</div>
                <div>• 3 друга = 250 баллов</div>
                <div>• 10 друзей = 500 баллов</div>
              </div>
            </div>

            <div className="p-4 bg-secondary/10 rounded-lg">
              <h4 className="font-semibold mb-2">Бонус для друзей:</h4>
              <p className="text-sm text-muted-foreground">
                Каждый приглашенный друг получает первый семинар полностью бесплатно!
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* New Achievement Notification */}
      <Dialog open={newAchievementDialog} onOpenChange={setNewAchievementDialog}>
        <DialogContent className="max-w-md">
          <div className="text-center space-y-4">
            <div className="text-6xl animate-bounce">🎉</div>
            <DialogTitle className="text-2xl">Новое достижение!</DialogTitle>
            <div className="space-y-2">
              <div className="text-4xl">🎯</div>
              <h3 className="text-xl font-semibold">Первые шаги</h3>
              <p className="text-muted-foreground">Вы завершили свой первый курс!</p>
              <Badge variant="default" className="text-lg px-4 py-2">
                +50 баллов
              </Badge>
            </div>
            <Button onClick={() => setNewAchievementDialog(false)} className="w-full">
              Отлично!
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

// Achievement Grid Component
function AchievementGrid({ achievements, onSelect, getCardClass, getProgress }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {achievements.map((achievement) => (
        <Card
          key={achievement.id}
          className={`cursor-pointer transition-all hover:scale-105 ${getCardClass(achievement)}`}
          onClick={() => onSelect(achievement)}
        >
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <div className={`text-3xl ${achievement.status === "locked" ? "grayscale" : ""}`}>{achievement.icon}</div>
              <div className="flex-1 space-y-2">
                <div>
                  <h3 className="font-semibold">{achievement.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{achievement.description}</p>
                </div>

                {achievement.status !== "earned" && (
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">Прогресс</span>
                      <span className="text-xs font-medium">{getProgress(achievement)}%</span>
                    </div>
                    <Progress value={getProgress(achievement)} className="h-1" />
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <Badge variant={achievement.status === "earned" ? "default" : "outline"}>
                    +{achievement.points} баллов
                  </Badge>
                  {achievement.status === "earned" && <CheckCircle className="w-4 h-4 text-green-600" />}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
