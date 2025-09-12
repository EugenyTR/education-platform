"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Users, Search, TrendingUp, Award, Clock, BookOpen, ArrowLeft, Eye, Edit, Gift, Coins } from "lucide-react"
import Link from "next/link"

// Mock user data
const mockUsers = [
  {
    id: "1",
    name: "Анна Петрова",
    email: "anna.petrova@example.com",
    registrationDate: "2024-01-15",
    totalPoints: 1250,
    coursesEnrolled: 3,
    coursesCompleted: 1,
    certificatesEarned: 1,
    lastActivity: "2024-02-20",
    progress: [
      { courseId: "1", courseName: "Основы веб-разработки", progress: 100, status: "completed" },
      { courseId: "2", courseName: "JavaScript для начинающих", progress: 65, status: "in_progress" },
      { courseId: "3", courseName: "React разработка", progress: 20, status: "in_progress" },
    ],
    achievements: ["first_course", "early_bird", "quiz_master"],
    status: "active",
  },
  {
    id: "2",
    name: "Петр Иванов",
    email: "petr.ivanov@example.com",
    registrationDate: "2024-02-01",
    totalPoints: 850,
    coursesEnrolled: 2,
    coursesCompleted: 0,
    certificatesEarned: 0,
    lastActivity: "2024-02-18",
    progress: [
      { courseId: "1", courseName: "Основы веб-разработки", progress: 45, status: "in_progress" },
      { courseId: "4", courseName: "CSS мастерство", progress: 30, status: "in_progress" },
    ],
    achievements: ["first_login"],
    status: "active",
  },
  {
    id: "3",
    name: "Мария Сидорова",
    email: "maria.sidorova@example.com",
    registrationDate: "2024-01-20",
    totalPoints: 2100,
    coursesEnrolled: 5,
    coursesCompleted: 3,
    certificatesEarned: 3,
    lastActivity: "2024-02-21",
    progress: [
      { courseId: "1", courseName: "Основы веб-разработки", progress: 100, status: "completed" },
      { courseId: "2", courseName: "JavaScript для начинающих", progress: 100, status: "completed" },
      { courseId: "3", courseName: "React разработка", progress: 100, status: "completed" },
      { courseId: "5", courseName: "Node.js Backend", progress: 80, status: "in_progress" },
      { courseId: "6", courseName: "Базы данных", progress: 25, status: "in_progress" },
    ],
    achievements: ["first_course", "completionist", "quiz_master", "social_butterfly"],
    status: "premium",
  },
]

export default function AdminUsersPage() {
  const [users, setUsers] = useState(mockUsers)
  const [selectedUser, setSelectedUser] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [showUserDialog, setShowUserDialog] = useState(false)

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || user.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleAwardPoints = (userId: string, points: number, reason: string) => {
    setUsers((prev) =>
      prev.map((user) => (user.id === userId ? { ...user, totalPoints: user.totalPoints + points } : user)),
    )
  }

  const handleGiftCourse = (userId: string, courseId: string) => {
    // Implementation for gifting course
    console.log(`Gifting course ${courseId} to user ${userId}`)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/admin">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Админ панель
                </Button>
              </Link>
              <h1 className="text-2xl font-bold text-primary">Управление пользователями</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Обзор</TabsTrigger>
            <TabsTrigger value="users">Пользователи</TabsTrigger>
            <TabsTrigger value="progress">Прогресс</TabsTrigger>
            <TabsTrigger value="analytics">Аналитика</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Всего пользователей</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{users.length}</div>
                  <p className="text-xs text-muted-foreground">+12% за месяц</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Активных пользователей</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {users.filter((u) => u.status === "active" || u.status === "premium").length}
                  </div>
                  <p className="text-xs text-muted-foreground">85% от общего числа</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Завершенных курсов</CardTitle>
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {users.reduce((sum, user) => sum + user.coursesCompleted, 0)}
                  </div>
                  <p className="text-xs text-muted-foreground">Средний показатель: 1.3</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Выдано сертификатов</CardTitle>
                  <Award className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {users.reduce((sum, user) => sum + user.certificatesEarned, 0)}
                  </div>
                  <p className="text-xs text-muted-foreground">+3 за неделю</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Поиск пользователей..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-80"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все статусы</SelectItem>
                    <SelectItem value="active">Активные</SelectItem>
                    <SelectItem value="premium">Премиум</SelectItem>
                    <SelectItem value="inactive">Неактивные</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              {filteredUsers.map((user) => (
                <Card key={user.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-3">
                          <h3 className="font-semibold text-lg">{user.name}</h3>
                          <Badge variant={user.status === "premium" ? "default" : "outline"}>
                            {user.status === "premium" ? "Премиум" : "Обычный"}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                        <div className="flex items-center space-x-6 text-sm">
                          <div className="flex items-center space-x-1">
                            <Coins className="w-4 h-4" />
                            <span>{user.totalPoints} баллов</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <BookOpen className="w-4 h-4" />
                            <span>
                              {user.coursesCompleted}/{user.coursesEnrolled} курсов
                            </span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Award className="w-4 h-4" />
                            <span>{user.certificatesEarned} сертификатов</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>Активность: {new Date(user.lastActivity).toLocaleDateString("ru-RU")}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4 mr-2" />
                              Подробнее
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle>Профиль пользователя: {user.name}</DialogTitle>
                              <DialogDescription>Детальная информация о прогрессе и активности</DialogDescription>
                            </DialogHeader>
                            <UserDetailView
                              user={user}
                              onAwardPoints={handleAwardPoints}
                              onGiftCourse={handleGiftCourse}
                            />
                          </DialogContent>
                        </Dialog>
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Progress Tab */}
          <TabsContent value="progress" className="space-y-6">
            <h2 className="text-2xl font-bold">Прогресс обучения</h2>
            <div className="space-y-4">
              {users.map((user) => (
                <Card key={user.id}>
                  <CardHeader>
                    <CardTitle className="text-lg">{user.name}</CardTitle>
                    <CardDescription>Прогресс по курсам</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {user.progress.map((course) => (
                        <div key={course.courseId} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">{course.courseName}</span>
                            <div className="flex items-center space-x-2">
                              <Badge variant={course.status === "completed" ? "default" : "outline"}>
                                {course.status === "completed" ? "Завершен" : "В процессе"}
                              </Badge>
                              <span className="text-sm text-muted-foreground">{course.progress}%</span>
                            </div>
                          </div>
                          <Progress value={course.progress} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <h2 className="text-2xl font-bold">Аналитика пользователей</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Распределение по статусам</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Активные пользователи</span>
                      <span className="font-medium">{users.filter((u) => u.status === "active").length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Премиум пользователи</span>
                      <span className="font-medium">{users.filter((u) => u.status === "premium").length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Неактивные</span>
                      <span className="font-medium">{users.filter((u) => u.status === "inactive").length}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Средние показатели</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Курсов на пользователя</span>
                      <span className="font-medium">
                        {(users.reduce((sum, user) => sum + user.coursesEnrolled, 0) / users.length).toFixed(1)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Завершенных курсов</span>
                      <span className="font-medium">
                        {(users.reduce((sum, user) => sum + user.coursesCompleted, 0) / users.length).toFixed(1)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Баллов на пользователя</span>
                      <span className="font-medium">
                        {Math.round(users.reduce((sum, user) => sum + user.totalPoints, 0) / users.length)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

// User Detail View Component
function UserDetailView({ user, onAwardPoints, onGiftCourse }) {
  const [pointsForm, setPointsForm] = useState({ amount: "", reason: "" })
  const [giftForm, setGiftForm] = useState({ courseId: "", reason: "" })

  const handleAwardPoints = (e) => {
    e.preventDefault()
    if (pointsForm.amount && pointsForm.reason) {
      onAwardPoints(user.id, Number.parseInt(pointsForm.amount), pointsForm.reason)
      setPointsForm({ amount: "", reason: "" })
    }
  }

  const handleGiftCourse = (e) => {
    e.preventDefault()
    if (giftForm.courseId) {
      onGiftCourse(user.id, giftForm.courseId)
      setGiftForm({ courseId: "", reason: "" })
    }
  }

  return (
    <div className="space-y-6">
      {/* User Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="text-center p-4 bg-muted/50 rounded-lg">
          <div className="text-2xl font-bold text-primary">{user.totalPoints}</div>
          <div className="text-sm text-muted-foreground">Баллов</div>
        </div>
        <div className="text-center p-4 bg-muted/50 rounded-lg">
          <div className="text-2xl font-bold text-primary">{user.coursesCompleted}</div>
          <div className="text-sm text-muted-foreground">Завершено курсов</div>
        </div>
        <div className="text-center p-4 bg-muted/50 rounded-lg">
          <div className="text-2xl font-bold text-primary">{user.certificatesEarned}</div>
          <div className="text-sm text-muted-foreground">Сертификатов</div>
        </div>
        <div className="text-center p-4 bg-muted/50 rounded-lg">
          <div className="text-2xl font-bold text-primary">{user.achievements.length}</div>
          <div className="text-sm text-muted-foreground">Достижений</div>
        </div>
      </div>

      {/* Course Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Прогресс по курсам</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {user.progress.map((course) => (
              <div key={course.courseId} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{course.courseName}</span>
                  <div className="flex items-center space-x-2">
                    <Badge variant={course.status === "completed" ? "default" : "outline"}>
                      {course.status === "completed" ? "Завершен" : "В процессе"}
                    </Badge>
                    <span className="text-sm text-muted-foreground">{course.progress}%</span>
                  </div>
                </div>
                <Progress value={course.progress} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Admin Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Coins className="w-5 h-5" />
              <span>Начислить баллы</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAwardPoints} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="points-amount">Количество баллов</Label>
                <Input
                  id="points-amount"
                  type="number"
                  value={pointsForm.amount}
                  onChange={(e) => setPointsForm((prev) => ({ ...prev, amount: e.target.value }))}
                  placeholder="Введите количество"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="points-reason">Причина</Label>
                <Input
                  id="points-reason"
                  value={pointsForm.reason}
                  onChange={(e) => setPointsForm((prev) => ({ ...prev, reason: e.target.value }))}
                  placeholder="Причина начисления"
                />
              </div>
              <Button type="submit" className="w-full">
                <Coins className="w-4 h-4 mr-2" />
                Начислить
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Gift className="w-5 h-5" />
              <span>Подарить курс</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleGiftCourse} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="gift-course">Курс</Label>
                <Select
                  value={giftForm.courseId}
                  onValueChange={(value) => setGiftForm((prev) => ({ ...prev, courseId: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите курс" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Основы веб-разработки</SelectItem>
                    <SelectItem value="2">JavaScript для начинающих</SelectItem>
                    <SelectItem value="3">React разработка</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="gift-reason">Причина</Label>
                <Input
                  id="gift-reason"
                  value={giftForm.reason}
                  onChange={(e) => setGiftForm((prev) => ({ ...prev, reason: e.target.value }))}
                  placeholder="Причина подарка"
                />
              </div>
              <Button type="submit" className="w-full">
                <Gift className="w-4 h-4 mr-2" />
                Подарить
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
