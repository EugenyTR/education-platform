"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Award, BookOpen, Clock, Star, Trophy, Edit, TrendingUp, ArrowLeft } from "lucide-react"
import Link from "next/link"

// Mock user data
const userData = {
  id: "1",
  firstName: "Анна",
  lastName: "Петрова",
  patronymic: "Сергеевна",
  nickname: "anna_dev",
  showRealName: true,
  email: "anna.petrova@example.com",
  phone: "+7 (999) 123-45-67",
  registrationDate: "2024-01-15",
  avatar: "/user-avatar-anna-petrova.jpg",
  totalPoints: 2450,
  level: "Продвинутый",
  completedCourses: 8,
  totalWatchTime: "45ч 30м",
  averageScore: 87,
  certificates: 5,
  achievements: [
    {
      id: "1",
      title: "Первые шаги",
      description: "Завершите свой первый курс",
      icon: "🎯",
      earned: true,
      earnedDate: "2024-01-20",
      points: 50,
      progress: 100,
    },
    {
      id: "2",
      title: "Знаток",
      description: "Завершите 5 курсов",
      icon: "📚",
      earned: true,
      earnedDate: "2024-03-15",
      points: 150,
      progress: 100,
    },
    {
      id: "3",
      title: "Мастер",
      description: "Завершите 10 курсов",
      icon: "🏆",
      earned: false,
      earnedDate: null,
      points: 300,
      progress: 80,
    },
    {
      id: "4",
      title: "Полная регистрация",
      description: "Заполните все поля профиля",
      icon: "✅",
      earned: true,
      earnedDate: "2024-01-15",
      points: 25,
      progress: 100,
    },
    {
      id: "5",
      title: "Социальная активность",
      description: "Подпишитесь на все соцсети",
      icon: "🌐",
      earned: false,
      earnedDate: null,
      points: 75,
      progress: 60,
    },
    {
      id: "6",
      title: "Друг платформы",
      description: "Пригласите 3 друзей",
      icon: "👥",
      earned: false,
      earnedDate: null,
      points: 200,
      progress: 33,
    },
  ],
  courseStats: [
    {
      id: "1",
      title: "Основы веб-разработки",
      progress: 100,
      score: 92,
      timeSpent: "12ч 45м",
      completedDate: "2024-02-10",
      certificate: true,
      rank: 15,
    },
    {
      id: "2",
      title: "JavaScript для начинающих",
      progress: 100,
      score: 88,
      timeSpent: "8ч 20м",
      completedDate: "2024-03-05",
      certificate: true,
      rank: 23,
    },
    {
      id: "3",
      title: "React основы",
      progress: 75,
      score: 85,
      timeSpent: "6ч 15м",
      completedDate: null,
      certificate: false,
      rank: null,
    },
    {
      id: "4",
      title: "CSS Grid и Flexbox",
      progress: 100,
      score: 94,
      timeSpent: "5ч 30м",
      completedDate: "2024-01-28",
      certificate: true,
      rank: 8,
    },
  ],
}

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState(userData)

  const earnedAchievements = userData.achievements.filter((a) => a.earned)
  const pendingAchievements = userData.achievements.filter((a) => !a.earned)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Главная
                </Button>
              </Link>
              <h1 className="text-2xl font-bold text-primary">Профиль пользователя</h1>
            </div>
            <Button variant="outline" onClick={() => setIsEditing(!isEditing)}>
              <Edit className="w-4 h-4 mr-2" />
              {isEditing ? "Сохранить" : "Редактировать"}
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Profile Header */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
                <div className="relative">
                  <img
                    src={userData.avatar || "/placeholder.svg?height=120&width=120&query=user avatar"}
                    alt="Аватар пользователя"
                    className="w-24 h-24 rounded-full object-cover border-4 border-accent/20"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-accent text-accent-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                    {userData.level.charAt(0)}
                  </div>
                </div>

                <div className="flex-1 space-y-2">
                  <div className="flex items-center space-x-3">
                    <h2 className="text-2xl font-bold">
                      {userData.showRealName
                        ? `${userData.firstName} ${userData.lastName} ${userData.patronymic}`
                        : userData.nickname}
                    </h2>
                    <Badge variant="secondary">{userData.level}</Badge>
                  </div>
                  <p className="text-muted-foreground">
                    На платформе с {new Date(userData.registrationDate).toLocaleDateString("ru-RU")}
                  </p>
                  <div className="flex items-center space-x-6 text-sm">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-accent" />
                      <span>{userData.totalPoints} баллов</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <BookOpen className="w-4 h-4 text-accent" />
                      <span>{userData.completedCourses} курсов</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4 text-accent" />
                      <span>{userData.totalWatchTime}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Award className="w-4 h-4 text-accent" />
                      <span>{userData.certificates} сертификатов</span>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <div className="text-3xl font-bold text-accent">{userData.averageScore}</div>
                  <div className="text-sm text-muted-foreground">Средний балл</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="achievements" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="achievements">Достижения</TabsTrigger>
              <TabsTrigger value="courses">Курсы</TabsTrigger>
              <TabsTrigger value="statistics">Статистика</TabsTrigger>
              <TabsTrigger value="settings">Настройки</TabsTrigger>
            </TabsList>

            {/* Achievements Tab */}
            <TabsContent value="achievements" className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-4">Полученные достижения</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {earnedAchievements.map((achievement) => (
                    <Card
                      key={achievement.id}
                      className="relative overflow-hidden bg-gradient-to-br from-accent/10 to-secondary/10 border-accent/20"
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-3">
                          <div className="text-2xl">{achievement.icon}</div>
                          <div className="flex-1">
                            <h4 className="font-semibold">{achievement.title}</h4>
                            <p className="text-sm text-muted-foreground">{achievement.description}</p>
                            <div className="flex items-center justify-between mt-2">
                              <Badge variant="default">+{achievement.points} баллов</Badge>
                              <span className="text-xs text-muted-foreground">
                                {new Date(achievement.earnedDate).toLocaleDateString("ru-RU")}
                              </span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">В процессе</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {pendingAchievements.map((achievement) => (
                    <Card key={achievement.id} className="relative overflow-hidden opacity-75">
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-3">
                          <div className="text-2xl grayscale">{achievement.icon}</div>
                          <div className="flex-1">
                            <h4 className="font-semibold">{achievement.title}</h4>
                            <p className="text-sm text-muted-foreground">{achievement.description}</p>
                            <div className="mt-2 space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-xs text-muted-foreground">Прогресс</span>
                                <span className="text-xs font-medium">{achievement.progress}%</span>
                              </div>
                              <Progress value={achievement.progress} className="h-2" />
                              <Badge variant="outline">+{achievement.points} баллов</Badge>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Courses Tab */}
            <TabsContent value="courses" className="space-y-6">
              <h3 className="text-xl font-semibold">Статистика по курсам</h3>
              <div className="space-y-4">
                {userData.courseStats.map((course) => (
                  <Card key={course.id}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h4 className="font-semibold text-lg">{course.title}</h4>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <span>Время: {course.timeSpent}</span>
                            {course.completedDate && (
                              <span>Завершен: {new Date(course.completedDate).toLocaleDateString("ru-RU")}</span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          {course.certificate && (
                            <Badge variant="default">
                              <Award className="w-3 h-3 mr-1" />
                              Сертификат
                            </Badge>
                          )}
                          {course.rank && (
                            <Badge variant="secondary">
                              <Trophy className="w-3 h-3 mr-1" />#{course.rank}
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm text-muted-foreground">Прогресс</span>
                            <span className="text-sm font-medium">{course.progress}%</span>
                          </div>
                          <Progress value={course.progress} className="h-2" />
                        </div>

                        <div className="text-center">
                          <div className="text-2xl font-bold text-accent">{course.score}</div>
                          <div className="text-sm text-muted-foreground">Балл</div>
                        </div>

                        <div className="flex justify-end">
                          <Link href={`/course/${course.id}`}>
                            <Button variant="outline" size="sm">
                              Перейти к курсу
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Statistics Tab */}
            <TabsContent value="statistics" className="space-y-6">
              <h3 className="text-xl font-semibold">Общая статистика</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Всего курсов</CardTitle>
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{userData.completedCourses}</div>
                    <p className="text-xs text-muted-foreground">завершено</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Общее время</CardTitle>
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{userData.totalWatchTime}</div>
                    <p className="text-xs text-muted-foreground">обучения</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Средний балл</CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{userData.averageScore}</div>
                    <p className="text-xs text-muted-foreground">из 100</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Баллы</CardTitle>
                    <Star className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{userData.totalPoints}</div>
                    <p className="text-xs text-muted-foreground">накоплено</p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Активность по месяцам</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-muted-foreground">
                    График активности (здесь будет диаграмма)
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Личная информация</CardTitle>
                  <CardDescription>Управляйте своими личными данными и настройками приватности</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Имя</Label>
                      <Input
                        id="firstName"
                        value={profileData.firstName}
                        onChange={(e) => setProfileData((prev) => ({ ...prev, firstName: e.target.value }))}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Фамилия</Label>
                      <Input
                        id="lastName"
                        value={profileData.lastName}
                        onChange={(e) => setProfileData((prev) => ({ ...prev, lastName: e.target.value }))}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="patronymic">Отчество</Label>
                      <Input
                        id="patronymic"
                        value={profileData.patronymic}
                        onChange={(e) => setProfileData((prev) => ({ ...prev, patronymic: e.target.value }))}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="nickname">Никнейм</Label>
                    <Input
                      id="nickname"
                      value={profileData.nickname}
                      onChange={(e) => setProfileData((prev) => ({ ...prev, nickname: e.target.value }))}
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Отображение в статистике</Label>
                      <p className="text-sm text-muted-foreground">Показывать настоящее имя или никнейм в рейтингах</p>
                    </div>
                    <Switch
                      checked={profileData.showRealName}
                      onCheckedChange={(checked) => setProfileData((prev) => ({ ...prev, showRealName: checked }))}
                      disabled={!isEditing}
                    />
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h4 className="font-semibold">Контактная информация</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={profileData.email}
                          onChange={(e) => setProfileData((prev) => ({ ...prev, email: e.target.value }))}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Телефон</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={profileData.phone}
                          onChange={(e) => setProfileData((prev) => ({ ...prev, phone: e.target.value }))}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Настройки уведомлений</CardTitle>
                  <CardDescription>Управляйте тем, какие уведомления вы хотите получать</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Новые курсы</Label>
                      <p className="text-sm text-muted-foreground">Уведомления о новых курсах и скидках</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Достижения</Label>
                      <p className="text-sm text-muted-foreground">Уведомления о полученных достижениях</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Напоминания</Label>
                      <p className="text-sm text-muted-foreground">Напоминания о продолжении обучения</p>
                    </div>
                    <Switch />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
