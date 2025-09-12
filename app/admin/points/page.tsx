"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth } from "@/contexts/auth-context"
import { Coins, Gift, Settings } from "lucide-react"
import Link from "next/link"

export default function AdminPointsPage() {
  const { user } = useAuth()
  const [manualForm, setManualForm] = useState({
    userId: "",
    amount: "",
    description: "",
    type: "manual_admin" as const,
  })

  const [giftForm, setGiftForm] = useState({
    userId: "",
    courseId: "",
    reason: "",
  })

  // Mock admin check - in real app would check user roles
  if (!user || !user.email.includes("admin")) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle>Доступ запрещен</CardTitle>
            <CardDescription>Только администраторы могут управлять баллами</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Link href="/">
              <Button>На главную</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  const handleManualPoints = (e: React.FormEvent) => {
    e.preventDefault()
    const amount = Number.parseInt(manualForm.amount)
    if (amount && manualForm.userId) {
      // In real app, would call API to add points to user
      const currentPoints = localStorage.getItem(`points_${manualForm.userId}`) || "0"
      const currentTransactions = JSON.parse(localStorage.getItem(`transactions_${manualForm.userId}`) || "[]")

      const newTransaction = {
        id: Date.now().toString(),
        userId: manualForm.userId,
        type: "manual_admin",
        amount: amount,
        description: manualForm.description || "Начислено администратором",
        timestamp: new Date(),
      }

      localStorage.setItem(`points_${manualForm.userId}`, (Number.parseInt(currentPoints) + amount).toString())
      localStorage.setItem(
        `transactions_${manualForm.userId}`,
        JSON.stringify([newTransaction, ...currentTransactions]),
      )

      setManualForm({ userId: "", amount: "", description: "", type: "manual_admin" })
      alert("Баллы успешно начислены!")
    }
  }

  const handleGiftCourse = (e: React.FormEvent) => {
    e.preventDefault()
    if (giftForm.userId && giftForm.courseId) {
      // In real app, would call API to grant course access
      alert(`Курс ${giftForm.courseId} подарен пользователю ${giftForm.userId}`)
      setGiftForm({ userId: "", courseId: "", reason: "" })
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/admin">
              <h1 className="text-2xl font-bold text-primary">Админ панель - Управление баллами</h1>
            </Link>
            <div className="flex items-center space-x-4">
              <Link href="/admin">
                <Button variant="outline">Назад к админке</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Управление баллами</h1>
            <p className="text-muted-foreground">Начисляйте баллы пользователям и дарите курсы</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Manual Points Assignment */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Coins className="w-5 h-5" />
                  <span>Начислить баллы</span>
                </CardTitle>
                <CardDescription>Вручную начислите баллы пользователю</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleManualPoints} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="userId">ID пользователя</Label>
                    <Input
                      id="userId"
                      value={manualForm.userId}
                      onChange={(e) => setManualForm((prev) => ({ ...prev, userId: e.target.value }))}
                      placeholder="Введите ID пользователя"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="amount">Количество баллов</Label>
                    <Input
                      id="amount"
                      type="number"
                      value={manualForm.amount}
                      onChange={(e) => setManualForm((prev) => ({ ...prev, amount: e.target.value }))}
                      placeholder="Введите количество (может быть отрицательным)"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Описание</Label>
                    <Textarea
                      id="description"
                      value={manualForm.description}
                      onChange={(e) => setManualForm((prev) => ({ ...prev, description: e.target.value }))}
                      placeholder="Причина начисления баллов..."
                      rows={3}
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    <Coins className="w-4 h-4 mr-2" />
                    Начислить баллы
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Gift Course */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Gift className="w-5 h-5" />
                  <span>Подарить курс</span>
                </CardTitle>
                <CardDescription>Предоставьте доступ к курсу конкретному пользователю</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleGiftCourse} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="giftUserId">ID пользователя</Label>
                    <Input
                      id="giftUserId"
                      value={giftForm.userId}
                      onChange={(e) => setGiftForm((prev) => ({ ...prev, userId: e.target.value }))}
                      placeholder="Введите ID пользователя"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="courseId">Курс</Label>
                    <Select
                      value={giftForm.courseId}
                      onValueChange={(value) => setGiftForm((prev) => ({ ...prev, courseId: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите курс" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Основы веб-разработки</SelectItem>
                        <SelectItem value="2">Практическое программирование</SelectItem>
                        <SelectItem value="3">Продвинутые техники</SelectItem>
                        <SelectItem value="4">Мастерство разработки</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reason">Причина</Label>
                    <Textarea
                      id="reason"
                      value={giftForm.reason}
                      onChange={(e) => setGiftForm((prev) => ({ ...prev, reason: e.target.value }))}
                      placeholder="Причина предоставления доступа (акция, подарок, и т.д.)"
                      rows={3}
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    <Gift className="w-4 h-4 mr-2" />
                    Подарить курс
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Points Configuration */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="w-5 h-5" />
                <span>Настройки баллов</span>
              </CardTitle>
              <CardDescription>Конфигурация системы начисления баллов</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold">Баллы за активность</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Просмотр видео</span>
                      <Input className="w-20" defaultValue="5" />
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Правильный ответ</span>
                      <Input className="w-20" defaultValue="2" />
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Прохождение теста</span>
                      <Input className="w-20" defaultValue="20" />
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-semibold">Баллы за покупки (%)</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Покупка курса</span>
                      <Input className="w-20" defaultValue="5" />
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Донат</span>
                      <Input className="w-20" defaultValue="10" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <Button>
                  <Settings className="w-4 h-4 mr-2" />
                  Сохранить настройки
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
