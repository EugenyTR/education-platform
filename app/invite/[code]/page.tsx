"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Gift, UserPlus, BookOpen, Award } from "lucide-react"
import Link from "next/link"

export default function InvitePage({ params }: { params: { code: string } }) {
  const [isRegistering, setIsRegistering] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  })

  // Mock referrer data
  const referrer = {
    name: "Анна Петрова",
    coursesCompleted: 8,
    level: "Продвинутый",
  }

  const handleRegister = () => {
    setIsRegistering(true)
    // Registration logic here
    setTimeout(() => {
      // Redirect to first free course
      window.location.href = "/course/1?free=true"
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-6">
        {/* Welcome Card */}
        <Card className="text-center">
          <CardHeader>
            <div className="text-4xl mb-4">🎉</div>
            <CardTitle className="text-2xl">Добро пожаловать!</CardTitle>
            <CardDescription>{referrer.name} пригласил(а) вас на нашу образовательную платформу</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <BookOpen className="w-4 h-4" />
                <span>{referrer.coursesCompleted} курсов</span>
              </div>
              <Badge variant="secondary">{referrer.level}</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Bonus Card */}
        <Card className="bg-gradient-to-br from-accent/10 to-secondary/10 border-accent/20">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Gift className="w-5 h-5 text-accent" />
              <CardTitle className="text-lg">Специальный бонус</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center">
                  <BookOpen className="w-4 h-4 text-accent" />
                </div>
                <div>
                  <div className="font-medium">Первый курс бесплатно</div>
                  <div className="text-sm text-muted-foreground">Полный доступ ко всем материалам</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center">
                  <Award className="w-4 h-4 text-accent" />
                </div>
                <div>
                  <div className="font-medium">Возможность получить сертификат</div>
                  <div className="text-sm text-muted-foreground">При успешном прохождении</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Registration Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <UserPlus className="w-5 h-5" />
              <span>Регистрация</span>
            </CardTitle>
            <CardDescription>Создайте аккаунт, чтобы получить бонус</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">Имя</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => setFormData((prev) => ({ ...prev, firstName: e.target.value }))}
                  placeholder="Ваше имя"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Фамилия</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => setFormData((prev) => ({ ...prev, lastName: e.target.value }))}
                  placeholder="Ваша фамилия"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                placeholder="your@email.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Пароль</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
                placeholder="Создайте пароль"
              />
            </div>

            <Button onClick={handleRegister} className="w-full" disabled={isRegistering}>
              {isRegistering ? "Регистрируем..." : "Зарегистрироваться и получить бонус"}
            </Button>

            <div className="text-center">
              <Link href="/" className="text-sm text-muted-foreground hover:text-primary">
                Уже есть аккаунт? Войти
              </Link>
            </div>
          </CardContent>
        </Card>

        <div className="text-center text-xs text-muted-foreground">Реферальный код: {params.code}</div>
      </div>
    </div>
  )
}
