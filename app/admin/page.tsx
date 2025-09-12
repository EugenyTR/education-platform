"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { Settings, Plus, Edit, Trash2, Eye, EyeOff, Clock, DollarSign, Users, FileText, Award } from "lucide-react"
import Link from "next/link"

// Mock data for courses
const mockCourses = [
  {
    id: "1",
    title: "Основы веб-разработки",
    status: "active",
    isComingSoon: false,
    is18Plus: false,
    hasTimer: false,
    timerDate: null,
    freeAccess: true,
    purchaseAvailable: true,
    price: 4999,
    hasDiscount: true,
    discountPrice: 3499,
    discountEndDate: "2024-12-31",
    certificateThreshold: 80,
    bonusPoints: 150,
    totalVideos: 12,
    totalQuestions: 40,
    description: "Изучите основы веб-разработки с нуля",
    coverImage: "/course-web-development-cover.jpg",
  },
  {
    id: "2",
    title: "Продвинутый JavaScript",
    status: "draft",
    isComingSoon: true,
    hasTimer: true,
    timerDate: "2024-12-15",
    freeAccess: false,
    purchaseAvailable: true,
    price: 7999,
    hasDiscount: false,
    discountPrice: null,
    discountEndDate: null,
    certificateThreshold: 85,
    bonusPoints: 200,
    totalVideos: 8,
    totalQuestions: 35,
    description: "Углубленное изучение JavaScript",
    coverImage: "/course-javascript-cover.jpg",
  },
]

// Mock data for teachers
const mockTeachers = [
  {
    id: "1",
    name: "Анна Петрова",
    description: "Ведущий разработчик с 10-летним опытом в веб-технологиях",
    photo: "/professional-instructor-portrait-.jpg",
    specialization: "Frontend разработка",
    experience: "10 лет",
  },
  {
    id: "2",
    name: "Михаил Сидоров",
    description: "Эксперт по backend разработке и архитектуре систем",
    photo: "/professional-instructor-portrait-.jpg",
    specialization: "Backend разработка",
    experience: "8 лет",
  },
]

export default function AdminPage() {
  const [courses, setCourses] = useState(mockCourses)
  const [teachers, setTeachers] = useState(mockTeachers)
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [selectedTeacher, setSelectedTeacher] = useState(null)
  const [showCourseDialog, setShowCourseDialog] = useState(false)
  const [showTeacherDialog, setShowTeacherDialog] = useState(false)
  const [showUploadDialog, setShowUploadDialog] = useState(false)
  const [homePageSettings, setHomePageSettings] = useState({
    introVideoUrl: "/educational-video-preview-with-play-button.jpg",
    introVideoTitle: "Добро пожаловать на нашу платформу",
    introVideoDescription: "Изучайте новые навыки с лучшими преподавателями",
  })

  const [videos, setVideos] = useState([
    {
      id: "1",
      title: "Введение в HTML",
      courseId: "1",
      duration: "15:30",
      uploadStatus: "completed",
      is18Plus: false,
      questions: 3,
      views: 245,
      uploadDate: "2024-02-10",
    },
    {
      id: "2",
      title: "CSS Основы",
      courseId: "1",
      duration: "22:15",
      uploadStatus: "processing",
      is18Plus: false,
      questions: 2,
      views: 0,
      uploadDate: "2024-02-15",
    },
  ])

  const [uploadForm, setUploadForm] = useState({
    courseId: "",
    title: "",
    description: "",
    is18Plus: false,
    file: null,
  })

  const handleEditCourse = (course) => {
    setSelectedCourse(course)
    setShowCourseDialog(true)
  }

  const handleEditTeacher = (teacher) => {
    setSelectedTeacher(teacher)
    setShowTeacherDialog(true)
  }

  const handleVideoUpload = (e: React.FormEvent) => {
    e.preventDefault()
    if (uploadForm.file && uploadForm.title && uploadForm.courseId) {
      const newVideo = {
        id: Date.now().toString(),
        title: uploadForm.title,
        courseId: uploadForm.courseId,
        duration: "00:00",
        uploadStatus: "uploading",
        is18Plus: uploadForm.is18Plus,
        questions: 0,
        views: 0,
        uploadDate: new Date().toISOString().split("T")[0],
      }

      setVideos((prev) => [newVideo, ...prev])
      setUploadForm({ courseId: "", title: "", description: "", is18Plus: false, file: null })
      setShowUploadDialog(false)

      // Simulate upload process
      setTimeout(() => {
        setVideos((prev) => prev.map((v) => (v.id === newVideo.id ? { ...v, uploadStatus: "processing" } : v)))
      }, 2000)

      setTimeout(() => {
        setVideos((prev) =>
          prev.map((v) => (v.id === newVideo.id ? { ...v, uploadStatus: "completed", duration: "18:45" } : v)),
        )
      }, 5000)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  ← Главная
                </Button>
              </Link>
              <h1 className="text-2xl font-bold text-primary">Панель администратора</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary">Администратор</Badge>
              <Button variant="outline">Выйти</Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="courses" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="courses">Курсы</TabsTrigger>
            <TabsTrigger value="videos">Видео</TabsTrigger>
            <TabsTrigger value="teachers">Преподаватели</TabsTrigger>
            <TabsTrigger value="homepage">Главная страница</TabsTrigger>
            <TabsTrigger value="certificates">Сертификаты</TabsTrigger>
            <TabsTrigger value="analytics">Аналитика</TabsTrigger>
          </TabsList>

          {/* Courses Management */}
          <TabsContent value="courses" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold">Управление курсами</h2>
              <Dialog open={showCourseDialog} onOpenChange={setShowCourseDialog}>
                <DialogTrigger asChild>
                  <Button onClick={() => setSelectedCourse(null)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Добавить курс
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>{selectedCourse ? "Редактировать курс" : "Добавить курс"}</DialogTitle>
                    <DialogDescription>Настройте параметры курса, доступность и условия прохождения</DialogDescription>
                  </DialogHeader>
                  <CourseSettingsForm course={selectedCourse} onClose={() => setShowCourseDialog(false)} />
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <Card key={course.id} className="relative">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{course.title}</CardTitle>
                      <div className="flex items-center space-x-2">
                        {course.status === "active" ? (
                          <Eye className="w-4 h-4 text-green-600" />
                        ) : (
                          <EyeOff className="w-4 h-4 text-muted-foreground" />
                        )}
                        {course.isComingSoon && <Badge variant="outline">Скоро</Badge>}
                        {course.is18Plus && <Badge variant="destructive">18+</Badge>}
                        {course.hasTimer && <Clock className="w-4 h-4 text-orange-500" />}
                      </div>
                    </div>
                    <CardDescription>
                      {course.totalVideos} видео • {course.totalQuestions} вопросов
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Цена:</span>
                      <div className="text-right">
                        {course.hasDiscount ? (
                          <div>
                            <span className="font-bold text-accent">{course.discountPrice} ₽</span>
                            <span className="text-sm text-muted-foreground line-through ml-2">{course.price} ₽</span>
                          </div>
                        ) : (
                          <span className="font-bold">{course.price} ₽</span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Бесплатный доступ:</span>
                      <Badge variant={course.freeAccess ? "default" : "outline"}>
                        {course.freeAccess ? "Доступен" : "Недоступен"}
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Сертификат:</span>
                      <span className="text-sm font-medium">{course.certificateThreshold}%</span>
                    </div>

                    <Separator />

                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 bg-transparent"
                        onClick={() => handleEditCourse(course)}
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Редактировать
                      </Button>
                      <Button variant="outline" size="sm">
                        <Settings className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Video Management */}
          <TabsContent value="videos" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold">Управление видео</h2>
              <div className="flex space-x-2">
                <Button onClick={() => setShowUploadDialog(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Добавить видео
                </Button>
                <Link href="/admin/users">
                  <Button variant="outline">
                    <Users className="w-4 h-4 mr-2" />
                    Управление пользователями
                  </Button>
                </Link>
              </div>
            </div>
            <VideoManagement
              videos={videos}
              setVideos={setVideos}
              uploadForm={uploadForm}
              setUploadForm={setUploadForm}
            />
          </TabsContent>

          <TabsContent value="teachers" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold">Управление преподавателями</h2>
              <Dialog open={showTeacherDialog} onOpenChange={setShowTeacherDialog}>
                <DialogTrigger asChild>
                  <Button onClick={() => setSelectedTeacher(null)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Добавить преподавателя
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>
                      {selectedTeacher ? "Редактировать преподавателя" : "Добавить преподавателя"}
                    </DialogTitle>
                    <DialogDescription>Управление информацией о преподавателях</DialogDescription>
                  </DialogHeader>
                  <TeacherForm teacher={selectedTeacher} onClose={() => setShowTeacherDialog(false)} />
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {teachers.map((teacher) => (
                <Card key={teacher.id}>
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <img
                        src={teacher.photo || "/placeholder.svg"}
                        alt={teacher.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div>
                        <CardTitle className="text-lg">{teacher.name}</CardTitle>
                        <CardDescription>{teacher.specialization}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">{teacher.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Опыт:</span>
                      <span className="text-sm font-medium">{teacher.experience}</span>
                    </div>
                    <Separator />
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 bg-transparent"
                        onClick={() => handleEditTeacher(teacher)}
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Редактировать
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="homepage" className="space-y-6">
            <h2 className="text-3xl font-bold">Управление главной страницей</h2>

            <Card>
              <CardHeader>
                <CardTitle>Вступительное видео</CardTitle>
                <CardDescription>Управление видео на главной странице</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="intro-video">Видео файл</Label>
                  <Input id="intro-video" type="file" accept="video/*" />
                  <p className="text-xs text-muted-foreground">Текущее видео: {homePageSettings.introVideoUrl}</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="video-title">Заголовок видео</Label>
                  <Input
                    id="video-title"
                    value={homePageSettings.introVideoTitle}
                    onChange={(e) => setHomePageSettings((prev) => ({ ...prev, introVideoTitle: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="video-description">Описание видео</Label>
                  <Textarea
                    id="video-description"
                    value={homePageSettings.introVideoDescription}
                    onChange={(e) =>
                      setHomePageSettings((prev) => ({ ...prev, introVideoDescription: e.target.value }))
                    }
                    rows={3}
                  />
                </div>

                <Button>Сохранить изменения</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Настройки главной страницы</CardTitle>
                <CardDescription>Дополнительные настройки отображения</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="platform-title">Название платформы</Label>
                  <Input id="platform-title" defaultValue="Образовательная платформа" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="platform-description">Описание платформы</Label>
                  <Textarea
                    id="platform-description"
                    defaultValue="Изучайте новые навыки с лучшими преподавателями"
                    rows={3}
                  />
                </div>

                <Button>Сохранить настройки</Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Certificate Management */}
          <TabsContent value="certificates" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold">Управление сертификатами</h2>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Создать шаблон
              </Button>
            </div>
            <CertificateManagement />
          </TabsContent>

          {/* Analytics */}
          <TabsContent value="analytics" className="space-y-6">
            <h2 className="text-3xl font-bold">Аналитика</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Всего курсов</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">24</div>
                  <p className="text-xs text-muted-foreground">+2 за месяц</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Активных студентов</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,234</div>
                  <p className="text-xs text-muted-foreground">+15% за месяц</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Доход</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">₽45,231</div>
                  <p className="text-xs text-muted-foreground">+20% за месяц</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Сертификатов выдано</CardTitle>
                  <Award className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">89</div>
                  <p className="text-xs text-muted-foreground">+12 за неделю</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

function CourseSettingsForm({ course, onClose }) {
  const [courseSettings, setCourseSettings] = useState({
    isActive: course?.status === "active" || false,
    isComingSoon: course?.isComingSoon || false,
    is18Plus: course?.is18Plus || false,
    hasTimer: course?.hasTimer || false,
    timerDate: course?.timerDate || "",
    title: course?.title || "",
    description: course?.description || "",
    coverImage: course?.coverImage || "",
    freeAccess: course?.freeAccess || false,
    purchaseAvailable: course?.purchaseAvailable || true,
    freeAccessConditions: [],
    hasConditions: false,
    price: course?.price?.toString() || "",
    hasDiscount: course?.hasDiscount || false,
    discountPrice: course?.discountPrice?.toString() || "",
    discountEndDate: course?.discountEndDate || "",
    freeUserDiscount: "",
    certificateThreshold: course?.certificateThreshold || 80,
    bonusPoints: course?.bonusPoints || 100,
    videoPrice: "",
  })

  const handleSave = () => {
    console.log("[v0] Saving course:", courseSettings)
    // Here you would typically save to your backend
    onClose()
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic Settings */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Основные настройки</h3>

          <div className="space-y-2">
            <Label htmlFor="course-title">Название курса</Label>
            <Input
              id="course-title"
              value={courseSettings.title}
              onChange={(e) => setCourseSettings((prev) => ({ ...prev, title: e.target.value }))}
              placeholder="Введите название курса"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="course-description">Описание курса</Label>
            <Textarea
              id="course-description"
              value={courseSettings.description}
              onChange={(e) => setCourseSettings((prev) => ({ ...prev, description: e.target.value }))}
              placeholder="Описание курса"
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="course-cover">Обложка курса</Label>
            <Input id="course-cover" type="file" accept="image/*" />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="course-active">Курс активен</Label>
            <Switch
              id="course-active"
              checked={courseSettings.isActive}
              onCheckedChange={(checked) => setCourseSettings((prev) => ({ ...prev, isActive: checked }))}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="course-coming-soon">Скоро</Label>
            <Switch
              id="course-coming-soon"
              checked={courseSettings.isComingSoon}
              onCheckedChange={(checked) => setCourseSettings((prev) => ({ ...prev, isComingSoon: checked }))}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="course-18plus">18+ контент</Label>
            <Switch
              id="course-18plus"
              checked={courseSettings.is18Plus}
              onCheckedChange={(checked) => setCourseSettings((prev) => ({ ...prev, is18Plus: checked }))}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="course-timer">Таймер активации</Label>
            <Switch
              id="course-timer"
              checked={courseSettings.hasTimer}
              onCheckedChange={(checked) => setCourseSettings((prev) => ({ ...prev, hasTimer: checked }))}
            />
          </div>

          {courseSettings.hasTimer && (
            <div className="space-y-2">
              <Label htmlFor="timer-date">Дата активации</Label>
              <Input
                id="timer-date"
                type="datetime-local"
                value={courseSettings.timerDate}
                onChange={(e) => setCourseSettings((prev) => ({ ...prev, timerDate: e.target.value }))}
              />
            </div>
          )}
        </div>

        {/* Access & Pricing */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Доступ и цены</h3>

          <div className="flex items-center justify-between">
            <Label htmlFor="free-access">Бесплатный доступ</Label>
            <Switch
              id="free-access"
              checked={courseSettings.freeAccess}
              onCheckedChange={(checked) => setCourseSettings((prev) => ({ ...prev, freeAccess: checked }))}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="purchase-available">Возможность покупки</Label>
            <Switch
              id="purchase-available"
              checked={courseSettings.purchaseAvailable}
              onCheckedChange={(checked) => setCourseSettings((prev) => ({ ...prev, purchaseAvailable: checked }))}
            />
          </div>

          {courseSettings.purchaseAvailable && (
            <>
              <div className="space-y-2">
                <Label htmlFor="course-price">Цена курса (₽)</Label>
                <Input
                  id="course-price"
                  type="number"
                  value={courseSettings.price}
                  onChange={(e) => setCourseSettings((prev) => ({ ...prev, price: e.target.value }))}
                  placeholder="0"
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="has-discount">Скидка</Label>
                <Switch
                  id="has-discount"
                  checked={courseSettings.hasDiscount}
                  onCheckedChange={(checked) => setCourseSettings((prev) => ({ ...prev, hasDiscount: checked }))}
                />
              </div>

              {courseSettings.hasDiscount && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="discount-price">Цена со скидкой (₽)</Label>
                    <Input
                      id="discount-price"
                      type="number"
                      value={courseSettings.discountPrice}
                      onChange={(e) => setCourseSettings((prev) => ({ ...prev, discountPrice: e.target.value }))}
                      placeholder="0"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="discount-end">Окончание скидки</Label>
                    <Input
                      id="discount-end"
                      type="date"
                      value={courseSettings.discountEndDate}
                      onChange={(e) => setCourseSettings((prev) => ({ ...prev, discountEndDate: e.target.value }))}
                    />
                  </div>
                </>
              )}
            </>
          )}

          <Separator />

          <div className="space-y-2">
            <Label htmlFor="certificate-threshold">Порог для сертификата (%)</Label>
            <Input
              id="certificate-threshold"
              type="number"
              min="0"
              max="100"
              value={courseSettings.certificateThreshold}
              onChange={(e) =>
                setCourseSettings((prev) => ({ ...prev, certificateThreshold: Number.parseInt(e.target.value) }))
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bonus-points">Бонусные баллы</Label>
            <Input
              id="bonus-points"
              type="number"
              min="0"
              value={courseSettings.bonusPoints}
              onChange={(e) => setCourseSettings((prev) => ({ ...prev, bonusPoints: Number.parseInt(e.target.value) }))}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="video-price">Стоимость видео в баллах</Label>
            <Input
              id="video-price"
              type="number"
              min="0"
              value={courseSettings.videoPrice}
              onChange={(e) => setCourseSettings((prev) => ({ ...prev, videoPrice: e.target.value }))}
              placeholder="0"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <Button variant="outline" onClick={onClose}>
          Отмена
        </Button>
        <Button onClick={handleSave}>{course ? "Сохранить изменения" : "Создать курс"}</Button>
      </div>
    </div>
  )
}

function TeacherForm({ teacher, onClose }) {
  const [teacherData, setTeacherData] = useState({
    name: teacher?.name || "",
    description: teacher?.description || "",
    specialization: teacher?.specialization || "",
    experience: teacher?.experience || "",
    photo: teacher?.photo || "",
  })

  const handleSave = () => {
    console.log("[v0] Saving teacher:", teacherData)
    // Here you would typically save to your backend
    onClose()
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="teacher-name">Имя преподавателя</Label>
        <Input
          id="teacher-name"
          value={teacherData.name}
          onChange={(e) => setTeacherData((prev) => ({ ...prev, name: e.target.value }))}
          placeholder="Введите имя преподавателя"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="teacher-specialization">Специализация</Label>
        <Input
          id="teacher-specialization"
          value={teacherData.specialization}
          onChange={(e) => setTeacherData((prev) => ({ ...prev, specialization: e.target.value }))}
          placeholder="Например: Frontend разработка"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="teacher-experience">Опыт работы</Label>
        <Input
          id="teacher-experience"
          value={teacherData.experience}
          onChange={(e) => setTeacherData((prev) => ({ ...prev, experience: e.target.value }))}
          placeholder="Например: 5 лет"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="teacher-description">Описание</Label>
        <Textarea
          id="teacher-description"
          value={teacherData.description}
          onChange={(e) => setTeacherData((prev) => ({ ...prev, description: e.target.value }))}
          placeholder="Краткое описание преподавателя"
          rows={4}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="teacher-photo">Фотография</Label>
        <Input id="teacher-photo" type="file" accept="image/*" />
      </div>

      <div className="flex justify-end space-x-4">
        <Button variant="outline" onClick={onClose}>
          Отмена
        </Button>
        <Button onClick={handleSave}>{teacher ? "Сохранить изменения" : "Добавить преподавателя"}</Button>
      </div>
    </div>
  )
}

// Certificate Management Component
function CertificateManagement() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Шаблон сертификата</CardTitle>
          <CardDescription>Настройте дизайн и содержание сертификатов</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="certificate-image">Изображение сертификата</Label>
            <Input id="certificate-image" type="file" accept="image/*" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="certificate-text">Текст сертификата</Label>
            <Textarea
              id="certificate-text"
              placeholder="Введите текст, который будет отображаться на сертификате"
              rows={6}
              defaultValue="Настоящим подтверждается, что [ФИО] успешно прошел(а) курс '[НАЗВАНИЕ КУРСА]' и продемонстрировал(а) высокий уровень знаний в данной области."
            />
          </div>

          <div className="p-4 bg-muted/50 rounded-lg">
            <div className="text-sm font-medium mb-2">Автоматические поля:</div>
            <div className="text-sm text-muted-foreground space-y-1">
              <div>• [ФИО] - автоматически заполняется из профиля пользователя</div>
              <div>• [НАЗВАНИЕ КУРСА] - название текущего курса</div>
              <div>• [ДАТА] - дата получения сертификата</div>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h4 className="font-semibold">Условия выдачи</h4>
            <div className="text-sm text-muted-foreground">
              Сертификат выдается автоматически при выполнении всех условий:
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <input type="checkbox" checked readOnly />
                <span>Прохождение курса на установленный процент</span>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" checked readOnly />
                <span>Полная регистрация с указанием ФИО и email</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Сертификат за базовый курс</CardTitle>
          <CardDescription>Специальный сертификат за прохождение всей базовой программы</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="base-certificate">Шаблон базового сертификата</Label>
            <Input id="base-certificate" type="file" accept="image/*" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="base-certificate-text">Текст базового сертификата</Label>
            <Textarea id="base-certificate-text" placeholder="Текст для сертификата за базовый курс" rows={4} />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Video Management Component
function VideoManagement({ videos, setVideos, uploadForm, setUploadForm }) {
  const [showUploadDialog, setShowUploadDialog] = useState(false)

  const handleVideoUpload = (e: React.FormEvent) => {
    e.preventDefault()
    if (uploadForm.file && uploadForm.title && uploadForm.courseId) {
      const newVideo = {
        id: Date.now().toString(),
        title: uploadForm.title,
        courseId: uploadForm.courseId,
        duration: "00:00",
        uploadStatus: "uploading",
        is18Plus: uploadForm.is18Plus,
        questions: 0,
        views: 0,
        uploadDate: new Date().toISOString().split("T")[0],
      }

      setVideos((prev) => [newVideo, ...prev])
      setUploadForm({ courseId: "", title: "", description: "", is18Plus: false, file: null })
      setShowUploadDialog(false)

      // Simulate upload process
      setTimeout(() => {
        setVideos((prev) => prev.map((v) => (v.id === newVideo.id ? { ...v, uploadStatus: "processing" } : v)))
      }, 2000)

      setTimeout(() => {
        setVideos((prev) =>
          prev.map((v) => (v.id === newVideo.id ? { ...v, uploadStatus: "completed", duration: "18:45" } : v)),
        )
      }, 5000)
    }
  }

  return (
    <div className="space-y-6">
      <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
        <DialogTrigger asChild>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Загрузить видео
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Загрузка нового видео</DialogTitle>
            <DialogDescription>Загрузите видео и настройте его параметры</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleVideoUpload} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="video-course">Курс</Label>
              <Select
                value={uploadForm.courseId}
                onValueChange={(value) => setUploadForm((prev) => ({ ...prev, courseId: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Выберите курс" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Основы веб-разработки</SelectItem>
                  <SelectItem value="2">Продвинутый JavaScript</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="video-title">Название видео</Label>
              <Input
                id="video-title"
                value={uploadForm.title}
                onChange={(e) => setUploadForm((prev) => ({ ...prev, title: e.target.value }))}
                placeholder="Введите название видео"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="video-description">Описание</Label>
              <Textarea
                id="video-description"
                value={uploadForm.description}
                onChange={(e) => setUploadForm((prev) => ({ ...prev, description: e.target.value }))}
                placeholder="Краткое описание видео"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="video-file">Видео файл</Label>
              <Input
                id="video-file"
                type="file"
                accept="video/*"
                onChange={(e) => setUploadForm((prev) => ({ ...prev, file: e.target.files[0] }))}
                required
              />
              <p className="text-xs text-muted-foreground">Поддерживаемые форматы: MP4, WebM, AVI (макс. 2GB)</p>
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="video-18plus">18+ контент</Label>
              <Switch
                id="video-18plus"
                checked={uploadForm.is18Plus}
                onCheckedChange={(checked) => setUploadForm((prev) => ({ ...prev, is18Plus: checked }))}
              />
            </div>

            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={() => setShowUploadDialog(false)}>
                Отмена
              </Button>
              <Button type="submit">Загрузить видео</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Video List */}
      <div className="space-y-4">
        {videos.map((video) => (
          <Card key={video.id}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-medium">{video.title}</h4>
                    {video.is18Plus && (
                      <Badge variant="destructive" className="text-xs">
                        18+
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span>Длительность: {video.duration}</span>
                    <span>Просмотров: {video.views}</span>
                    <span>Вопросов: {video.questions}</span>
                    <span>Загружено: {video.uploadDate}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge
                    variant={
                      video.uploadStatus === "completed"
                        ? "default"
                        : video.uploadStatus === "processing"
                          ? "secondary"
                          : video.uploadStatus === "uploading"
                            ? "outline"
                            : "destructive"
                    }
                  >
                    {video.uploadStatus === "completed"
                      ? "Готово"
                      : video.uploadStatus === "processing"
                        ? "Обработка"
                        : video.uploadStatus === "uploading"
                          ? "Загрузка"
                          : "Ошибка"}
                  </Badge>
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4 mr-2" />
                    Редактировать
                  </Button>
                  <Button variant="outline" size="sm">
                    <Settings className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Video Analytics */}
      <Card>
        <CardHeader>
          <CardTitle>Аналитика видео</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold">24</div>
              <div className="text-sm text-muted-foreground">Всего видео</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">1,234</div>
              <div className="text-sm text-muted-foreground">Общие просмотры</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">18:30</div>
              <div className="text-sm text-muted-foreground">Средняя длительность</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">85%</div>
              <div className="text-sm text-muted-foreground">Завершаемость</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
