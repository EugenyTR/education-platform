"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Play,
  BookOpen,
  Users,
  Award,
  ExternalLink,
  Mail,
  Phone,
  MapPin,
  User,
  LogOut,
  Coins,
  Menu,
  X,
} from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { usePoints } from "@/contexts/points-context"
import { useState } from "react"

export default function HomePage() {
  const { user, logout } = useAuth()
  const { userPoints } = usePoints()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img src="/logo.svg" alt="#go НА ТРЕНЬКУ" className="h-8 md:h-10 w-auto" />
              {/* <h1 className="text-lg md:text-2xl font-bold text-primary hidden sm:block">#go НА ТРЕНЬКУ</h1> */}
            </div>

            <nav className="hidden lg:flex items-center space-x-6">
              <a href="#courses" className="text-muted-foreground hover:text-primary transition-colors">
                Курсы
              </a>
              <a href="#instructors" className="text-muted-foreground hover:text-primary transition-colors">
                Преподаватели
              </a>
              <a href="#about" className="text-muted-foreground hover:text-primary transition-colors">
                О нас
              </a>
              {user ? (
                <div className="flex items-center space-x-4">
                  <Link href="/points">
                    <div className="flex items-center space-x-2 bg-accent/10 px-3 py-1 rounded-lg hover:bg-accent/20 transition-colors">
                      <Coins className="w-4 h-4 text-accent" />
                      <span className="font-semibold">{userPoints}</span>
                    </div>
                  </Link>
                  <Link href="/profile">
                    <Button variant="outline" size="sm" className="flex items-center space-x-2 bg-transparent">
                      <User className="w-4 h-4" />
                      <span className="hidden xl:inline">{user.name}</span>
                    </Button>
                  </Link>
                  {user.email === "admin@platform.ru" && (
                    <Link href="/admin">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center space-x-2 bg-accent/10 border-accent"
                      >
                        <Award className="w-4 h-4" />
                        <span className="hidden xl:inline">Админ</span>
                      </Button>
                    </Link>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={logout}
                    className="flex items-center space-x-2 bg-transparent"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="hidden xl:inline">Выйти</span>
                  </Button>
                </div>
              ) : (
                <>
                  <Link href="/login">
                    <Button variant="outline">Войти</Button>
                  </Link>
                  <Link href="/register">
                    <Button>Регистрация</Button>
                  </Link>
                </>
              )}
            </nav>

            <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>

          {mobileMenuOpen && (
            <div className="lg:hidden mt-4 pb-4 border-t pt-4">
              <nav className="flex flex-col space-y-4">
                <a
                  href="#courses"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Курсы
                </a>
                <a
                  href="#instructors"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Преподаватели
                </a>
                <a
                  href="#about"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  О нас
                </a>
                {user ? (
                  <div className="flex flex-col space-y-3 pt-2 border-t">
                    <Link href="/points" onClick={() => setMobileMenuOpen(false)}>
                      <div className="flex items-center space-x-2 bg-accent/10 px-3 py-2 rounded-lg hover:bg-accent/20 transition-colors w-fit">
                        <Coins className="w-4 h-4 text-accent" />
                        <span className="font-semibold">У вас {userPoints} баллов</span>
                      </div>
                    </Link>
                    <Link href="/profile" onClick={() => setMobileMenuOpen(false)}>
                      <Button variant="outline" size="sm" className="flex items-center space-x-2 bg-transparent w-fit">
                        <User className="w-4 h-4" />
                        <span>{user.name}</span>
                      </Button>
                    </Link>
                    {user.email === "admin@platform.ru" && (
                      <Link href="/admin" onClick={() => setMobileMenuOpen(false)}>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center space-x-2 bg-accent/10 border-accent w-fit"
                        >
                          <Award className="w-4 h-4" />
                          <span>Админ панель</span>
                        </Button>
                      </Link>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        logout()
                        setMobileMenuOpen(false)
                      }}
                      className="flex items-center space-x-2 bg-transparent w-fit"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Выйти</span>
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col space-y-3 pt-2 border-t">
                    <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                      <Button variant="outline" className="w-fit bg-transparent">
                        Войти
                      </Button>
                    </Link>
                    <Link href="/register" onClick={() => setMobileMenuOpen(false)}>
                      <Button className="w-fit">Регистрация</Button>
                    </Link>
                  </div>
                )}
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main>
        {user && (
          <section className="py-3 md:py-4 bg-accent/10">
            <div className="container mx-auto px-4">
              <div className="text-center">
                <p className="text-foreground text-sm md:text-base">
                  Добро пожаловать, {user.name} {user.surname}!
                  {user.isTestUser && (
                    <Badge variant="secondary" className="ml-2">
                      Тестовый аккаунт
                    </Badge>
                  )}
                  <Link href="/points" className="ml-2 md:ml-4 text-foreground hover:underline font-medium">
                    У вас {userPoints} баллов
                  </Link>
                </p>
              </div>
            </div>
          </section>
        )}

        {/* 1. Intro Video Section */}
        <section className="py-8 md:py-16 bg-gradient-to-b from-card to-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-2xl md:text-4xl font-bold mb-4 md:mb-6 text-balance">
                Добро пожаловать на нашу образовательную платформу
              </h2>
              <div className="relative aspect-video bg-muted rounded-lg mb-4 md:mb-6 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Button size="lg" className="rounded-full w-16 h-16 md:w-20 md:h-20">
                    <Play className="w-6 h-6 md:w-8 md:h-8" />
                  </Button>
                </div>
                <img
                  src="/educational-video-preview-with-play-button.jpg"
                  alt="Вступительное видео"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* 2. Video Description */}
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                Откройте для себя мир знаний с нашими интерактивными курсами. Изучайте новые навыки, получайте
                сертификаты и развивайтесь вместе с лучшими преподавателями.
              </p>
            </div>
          </div>
        </section>

        {/* 3. Main Course Tree */}
        <section id="courses" className="py-8 md:py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12">Основная программа обучения</h2>
            <div className="max-w-6xl mx-auto">
              {/* Course Tree Visualization */}
              <div className="relative">
                {/* Tree branches - decorative SVG lines */}
                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none hidden md:block"
                  style={{ zIndex: 0 }}
                >
                  <defs>
                    <pattern id="dots" patternUnits="userSpaceOnUse" width="20" height="20">
                      <circle cx="10" cy="10" r="1" fill="currentColor" className="text-border" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#dots)" opacity="0.3" />
                </svg>

                {/* Course nodes */}
                <div
                  className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 py-4 md:py-8"
                  style={{ zIndex: 1 }}
                >
                  {[
                    { title: "Основы", icon: BookOpen, level: 1, status: "completed", id: "1" },
                    { title: "Практика", icon: Users, level: 2, status: "current", id: "2" },
                    { title: "Продвинутый", icon: Award, level: 3, status: "locked", id: "3" },
                    { title: "Мастерство", icon: Award, level: 4, status: "locked", id: "4" },
                  ].map((course, index) => (
                    <Link key={index} href={`/course/${course.id}`}>
                      <Card
                        className={`relative cursor-pointer transition-all hover:scale-105 ${
                          course.status === "completed"
                            ? "bg-accent/10 border-accent"
                            : course.status === "current"
                              ? "bg-secondary/10 border-secondary"
                              : "bg-muted/20 border-muted"
                        }`}
                      >
                        <CardHeader className="text-center pb-2">
                          <div
                            className={`w-12 h-12 md:w-16 md:h-16 mx-auto rounded-full flex items-center justify-center mb-3 ${
                              course.status === "completed"
                                ? "bg-accent text-accent-foreground"
                                : course.status === "current"
                                  ? "bg-secondary text-secondary-foreground"
                                  : "bg-muted text-muted-foreground"
                            }`}
                          >
                            <course.icon className="w-6 h-6 md:w-8 md:h-8" />
                          </div>
                          <CardTitle className="text-base md:text-lg">{course.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="text-center">
                          <Badge
                            variant={
                              course.status === "completed"
                                ? "default"
                                : course.status === "current"
                                  ? "secondary"
                                  : "outline"
                            }
                            className="text-xs"
                          >
                            {course.status === "completed"
                              ? "Завершено"
                              : course.status === "current"
                                ? "В процессе"
                                : "Заблокировано"}
                          </Badge>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Instructors Section */}
        <section id="instructors" className="py-8 md:py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12">Наши преподаватели</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
              {[
                { name: "Анна Петрова", specialty: "Веб-разработка", experience: "10+ лет" },
                { name: "Михаил Сидоров", specialty: "Дизайн", experience: "8+ лет" },
                { name: "Елена Козлова", specialty: "Маркетинг", experience: "12+ лет" },
                { name: "Дмитрий Волков", specialty: "Аналитика", experience: "7+ лет" },
                { name: "Ольга Морозова", specialty: "Управление", experience: "15+ лет" },
                { name: "Алексей Новиков", specialty: "ИИ", experience: "5+ лет" },
              ].map((instructor, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-accent/20 to-secondary/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <img
                        src={`/professional-instructor-portrait-.jpg?height=96&width=96&query=professional instructor portrait ${instructor.name}`}
                        alt={instructor.name}
                        className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover"
                      />
                    </div>
                    <CardTitle className="text-lg md:text-xl">{instructor.name}</CardTitle>
                    <CardDescription className="text-accent font-medium">{instructor.specialty}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4 text-sm md:text-base">Опыт: {instructor.experience}</p>
                    <Button variant="outline" size="sm">
                      Подробнее
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* 6. Partners Section */}
        <section className="py-8 md:py-16 bg-card">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12">Наши партнеры</h2>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4 md:gap-8 max-w-6xl mx-auto">
              {Array.from({ length: 10 }, (_, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center p-3 md:p-6 bg-background rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                >
                  <img
                    src={`/company-logo-partner-.jpg?height=80&width=120&query=company logo partner ${index + 1}`}
                    alt={`Партнер ${index + 1}`}
                    className="max-w-full h-8 md:h-12 object-contain opacity-70 hover:opacity-100 transition-opacity"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 7. About Us / Contact Section */}
        <section id="about" className="py-8 md:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12">О нас</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                <div>
                  <h3 className="text-lg md:text-xl font-semibold mb-4">Наша миссия</h3>
                  <p className="text-muted-foreground leading-relaxed mb-6 text-sm md:text-base">
                    Мы создаем доступное и качественное образование для всех. Наша платформа объединяет лучших
                    преподавателей и современные технологии для эффективного обучения.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Mail className="w-4 h-4 md:w-5 md:h-5 text-accent flex-shrink-0" />
                      <span className="text-sm md:text-base">info@education-platform.ru</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="w-4 h-4 md:w-5 md:h-5 text-accent flex-shrink-0" />
                      <span className="text-sm md:text-base">+7 (495) 123-45-67</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <MapPin className="w-4 h-4 md:w-5 md:h-5 text-accent flex-shrink-0" />
                      <span className="text-sm md:text-base">Москва, ул. Образования, 123</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-semibold mb-4">Лицензии и сертификаты</h3>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-start space-x-3">
                      <Award className="w-4 h-4 md:w-5 md:h-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-sm md:text-base">Лицензия на образовательную деятельность №12345</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Award className="w-4 h-4 md:w-5 md:h-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-sm md:text-base">ISO 9001:2015 Система менеджмента качества</span>
                    </div>
                  </div>
                  <h4 className="font-semibold mb-3 text-sm md:text-base">Мы в социальных сетях:</h4>
                  <div className="flex flex-wrap gap-2 md:gap-4">
                    {["VK", "Telegram", "YouTube", "Instagram"].map((social) => (
                      <Button
                        key={social}
                        variant="outline"
                        size="sm"
                        className="flex items-center space-x-2 bg-transparent text-xs md:text-sm"
                      >
                        <ExternalLink className="w-3 h-3 md:w-4 md:h-4" />
                        <span>{social}</span>
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-6 md:py-8">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-sm md:text-base">&copy; 2024 #go НА ТРЕНЬКУ. Все права защищены.</p>
            <div className="mt-4">
              <Button variant="link" className="text-primary-foreground hover:text-accent text-sm md:text-base">
                Поддержать проект
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
