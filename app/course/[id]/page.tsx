"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  Play,
  ShoppingCart,
  Users,
  Clock,
  Award,
  Star,
  Lock,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
  Eye,
  Trophy,
} from "lucide-react"
import Link from "next/link"

// Mock data - in real app this would come from API/database
const courseData = {
  id: "1",
  title: "Основы веб-разработки",
  description:
    "Полный курс по изучению современной веб-разработки с нуля. Изучите HTML, CSS, JavaScript и создайте свой первый сайт.",
  coverImage: "/course-web-development-cover.jpg",
  price: 4999,
  discountPrice: 3499,
  hasDiscount: true,
  discountEndDate: "2024-12-31",
  freeAccessAvailable: true,
  freeAccessConditions: [
    { course: "Введение в программирование", completed: true },
    { course: "Основы компьютерной грамотности", completed: true },
    { course: "Логика и алгоритмы", completed: false },
  ],
  statistics: {
    totalViews: 15420,
    userProgress: 65,
    userRank: 23,
    topRanks: [
      { name: "Алексей К.", score: 98, time: "2:15:30" },
      { name: "Мария С.", score: 97, time: "2:18:45" },
      { name: "Дмитрий В.", score: 96, time: "2:22:10" },
    ],
  },
  instructor: "Анна Петрова",
  duration: "8 недель",
  lessons: 24,
  certificateThreshold: 80,
  bonusPoints: 150,
}

export default function CoursePage({ params }: { params: { id: string } }) {
  const [showFreeAccessDialog, setShowFreeAccessDialog] = useState(false)
  const [showPaidAccessDialog, setShowPaidAccessDialog] = useState(false)

  const incompletedConditions = courseData.freeAccessConditions.filter((c) => !c.completed)
  const canAccessFree = incompletedConditions.length === 0

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Назад к курсам
              </Button>
            </Link>
            <Separator orientation="vertical" className="h-6" />
            <h1 className="text-xl font-semibold text-primary">Детали курса</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Course Header */}
              <div>
                <h1 className="text-3xl font-bold mb-4 text-balance">{courseData.title}</h1>
                <div className="flex items-center space-x-4 text-muted-foreground mb-6">
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>{courseData.statistics.totalViews.toLocaleString()} просмотров</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{courseData.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Play className="w-4 h-4" />
                    <span>{courseData.lessons} уроков</span>
                  </div>
                </div>
              </div>

              {/* Course Cover */}
              <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
                <img
                  src={courseData.coverImage || "/placeholder.svg"}
                  alt={courseData.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <Button size="lg" className="rounded-full w-16 h-16">
                    <Play className="w-6 h-6" />
                  </Button>
                </div>
              </div>

              {/* Course Description */}
              <Card>
                <CardHeader>
                  <CardTitle>Описание курса</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{courseData.description}</p>
                  <div className="mt-4 flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Award className="w-5 h-5 text-accent" />
                      <span className="text-sm">Сертификат при {courseData.certificateThreshold}%</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Star className="w-5 h-5 text-accent" />
                      <span className="text-sm">{courseData.bonusPoints} бонусных баллов</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Course Statistics */}
              <Card>
                <CardHeader>
                  <CardTitle>Статистика курса</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Ваш прогресс</span>
                      <span className="text-sm text-muted-foreground">{courseData.statistics.userProgress}%</span>
                    </div>
                    <Progress value={courseData.statistics.userProgress} className="h-2" />
                  </div>

                  {courseData.statistics.userRank && (
                    <div className="flex items-center justify-between p-3 bg-accent/10 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Trophy className="w-5 h-5 text-accent" />
                        <span className="font-medium">Ваше место в рейтинге</span>
                      </div>
                      <Badge variant="secondary">#{courseData.statistics.userRank}</Badge>
                    </div>
                  )}

                  <div>
                    <h4 className="font-medium mb-3">Топ-10 участников</h4>
                    <div className="space-y-2">
                      {courseData.statistics.topRanks.map((rank, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-muted/50 rounded">
                          <div className="flex items-center space-x-3">
                            <Badge
                              variant="outline"
                              className="w-8 h-8 rounded-full p-0 flex items-center justify-center"
                            >
                              {index + 1}
                            </Badge>
                            <span className="font-medium">{rank.name}</span>
                          </div>
                          <div className="text-right text-sm text-muted-foreground">
                            <div>{rank.score}%</div>
                            <div>{rank.time}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Pricing Card */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Доступ к курсу</CardTitle>
                    {courseData.hasDiscount && <Badge variant="destructive">Скидка!</Badge>}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Pricing */}
                  <div className="text-center">
                    {courseData.hasDiscount ? (
                      <div>
                        <div className="text-2xl font-bold text-accent">
                          {courseData.discountPrice.toLocaleString()} ₽
                        </div>
                        <div className="text-sm text-muted-foreground line-through">
                          {courseData.price.toLocaleString()} ₽
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">Скидка до {courseData.discountEndDate}</div>
                      </div>
                    ) : (
                      <div className="text-2xl font-bold">{courseData.price.toLocaleString()} ₽</div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    {/* Free Access Button */}
                    {courseData.freeAccessAvailable && (
                      <Dialog open={showFreeAccessDialog} onOpenChange={setShowFreeAccessDialog}>
                        <DialogTrigger asChild>
                          <Button variant="outline" className="w-full bg-transparent" disabled={!canAccessFree}>
                            {canAccessFree ? (
                              <>
                                <Play className="w-4 h-4 mr-2" />
                                Начать бесплатный просмотр
                              </>
                            ) : (
                              <>
                                <Lock className="w-4 h-4 mr-2" />
                                Бесплатный доступ заблокирован
                              </>
                            )}
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>
                              {canAccessFree ? "Бесплатный доступ" : "Условия бесплатного доступа"}
                            </DialogTitle>
                            <DialogDescription>
                              {canAccessFree ? (
                                <div>
                                  <div className="flex items-center space-x-2 text-green-600 mb-3">
                                    <CheckCircle className="w-5 h-5" />
                                    <span className="font-medium">Все условия выполнены!</span>
                                  </div>
                                  <p className="text-sm text-muted-foreground">
                                    Просмотреть все видео в семинаре и пройти тест можно только один раз. При начале
                                    прохождения все остальные видео будут недоступны (кроме купленных).
                                  </p>
                                </div>
                              ) : (
                                <div>
                                  <div className="flex items-center space-x-2 text-orange-600 mb-3">
                                    <AlertCircle className="w-5 h-5" />
                                    <span className="font-medium">Необходимо выполнить условия:</span>
                                  </div>
                                  <div className="space-y-2">
                                    {incompletedConditions.map((condition, index) => (
                                      <div key={index} className="flex items-center space-x-2 text-sm">
                                        <Lock className="w-4 h-4 text-muted-foreground" />
                                        <span>Завершить курс: {condition.course}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </DialogDescription>
                          </DialogHeader>
                        </DialogContent>
                      </Dialog>
                    )}

                    {/* Purchase Button */}
                    <Dialog open={showPaidAccessDialog} onOpenChange={setShowPaidAccessDialog}>
                      <DialogTrigger asChild>
                        <Button className="w-full">
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          Купить курс
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Покупка курса</DialogTitle>
                          <DialogDescription>
                            <div className="space-y-4">
                              <div className="flex items-center space-x-2 text-green-600 mb-3">
                                <CheckCircle className="w-5 h-5" />
                                <span className="font-medium">Преимущества покупки:</span>
                              </div>
                              <ul className="space-y-2 text-sm text-muted-foreground">
                                <li className="flex items-center space-x-2">
                                  <Eye className="w-4 h-4" />
                                  <span>Все видео доступны без ограничений</span>
                                </li>
                                <li className="flex items-center space-x-2">
                                  <Award className="w-4 h-4" />
                                  <span>Дополнительная возможность пройти тест</span>
                                </li>
                                <li className="flex items-center space-x-2">
                                  <Star className="w-4 h-4" />
                                  <span>Пожизненный доступ к материалам</span>
                                </li>
                                <li className="flex items-center space-x-2">
                                  <Trophy className="w-4 h-4" />
                                  <span>Участие в рейтинге без ограничений</span>
                                </li>
                              </ul>
                              <div className="mt-4 p-3 bg-accent/10 rounded-lg">
                                <div className="text-center">
                                  <div className="text-lg font-bold text-accent">
                                    {courseData.hasDiscount ? courseData.discountPrice : courseData.price} ₽
                                  </div>
                                  {courseData.hasDiscount && (
                                    <div className="text-sm text-muted-foreground">
                                      Экономия: {courseData.price - courseData.discountPrice} ₽
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </DialogDescription>
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>
                  </div>

                  {/* Course Info */}
                  <Separator />
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Преподаватель:</span>
                      <span className="font-medium">{courseData.instructor}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Продолжительность:</span>
                      <span className="font-medium">{courseData.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Количество уроков:</span>
                      <span className="font-medium">{courseData.lessons}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Free Access Conditions */}
              {courseData.freeAccessAvailable && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Условия бесплатного доступа</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {courseData.freeAccessConditions.map((condition, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          {condition.completed ? (
                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                          ) : (
                            <Lock className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                          )}
                          <span
                            className={`text-sm ${condition.completed ? "text-foreground" : "text-muted-foreground"}`}
                          >
                            {condition.course}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                      <p className="text-xs text-muted-foreground">
                        Выполните все условия для получения бесплатного доступа к курсу
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
