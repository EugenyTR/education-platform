"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { usePoints } from "@/contexts/points-context"
import { useAuth } from "@/contexts/auth-context"
import { Coins, Send, Download, History, Gift } from "lucide-react"
import Link from "next/link"

export default function PointsPage() {
  const { user } = useAuth()
  const { userPoints, transactions, sharePoints, requestPoints, canAfford } = usePoints()
  const [shareForm, setShareForm] = useState({ recipientId: "", amount: "", message: "" })
  const [requestForm, setRequestForm] = useState({ fromUserId: "", amount: "", message: "" })

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle>Доступ ограничен</CardTitle>
            <CardDescription>Войдите в систему для управления баллами</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Link href="/login">
              <Button>Войти</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  const handleSharePoints = async (e: React.FormEvent) => {
    e.preventDefault()
    const amount = Number.parseInt(shareForm.amount)
    if (amount > 0 && shareForm.recipientId) {
      const success = await sharePoints(shareForm.recipientId, amount, shareForm.message)
      if (success) {
        setShareForm({ recipientId: "", amount: "", message: "" })
        alert("Баллы успешно отправлены!")
      } else {
        alert("Недостаточно баллов или ошибка отправки")
      }
    }
  }

  const handleRequestPoints = async (e: React.FormEvent) => {
    e.preventDefault()
    const amount = Number.parseInt(requestForm.amount)
    if (amount > 0 && requestForm.fromUserId) {
      const success = await requestPoints(requestForm.fromUserId, amount, requestForm.message)
      if (success) {
        setRequestForm({ fromUserId: "", amount: "", message: "" })
        alert("Запрос отправлен!")
      }
    }
  }

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "video_watch":
        return "📺"
      case "correct_answer":
        return "✅"
      case "donation":
        return "💝"
      case "purchase":
        return "🛒"
      case "shared_received":
        return "📥"
      case "shared_sent":
        return "📤"
      case "manual_admin":
        return "⚙️"
      default:
        return "💰"
    }
  }

  const getTransactionColor = (amount: number) => {
    return amount > 0 ? "text-green-600" : "text-red-600"
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <h1 className="text-2xl font-bold text-primary">Образовательная Платформа</h1>
            </Link>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-accent/10 px-4 py-2 rounded-lg">
                <Coins className="w-5 h-5 text-accent" />
                <span className="font-semibold text-lg">{userPoints}</span>
                <span className="text-sm text-muted-foreground">баллов</span>
              </div>
              <Link href="/profile">
                <Button variant="outline">Профиль</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Система баллов</h1>
            <p className="text-muted-foreground">Зарабатывайте баллы за обучение и используйте их для покупки курсов</p>
          </div>

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Обзор</TabsTrigger>
              <TabsTrigger value="share">Поделиться</TabsTrigger>
              <TabsTrigger value="request">Запросить</TabsTrigger>
              <TabsTrigger value="history">История</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Текущий баланс</CardTitle>
                    <Coins className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{userPoints}</div>
                    <p className="text-xs text-muted-foreground">баллов</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Заработано всего</CardTitle>
                    <Gift className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {transactions.filter((t) => t.amount > 0).reduce((sum, t) => sum + t.amount, 0)}
                    </div>
                    <p className="text-xs text-muted-foreground">баллов</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Потрачено всего</CardTitle>
                    <Send className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {Math.abs(transactions.filter((t) => t.amount < 0).reduce((sum, t) => sum + t.amount, 0))}
                    </div>
                    <p className="text-xs text-muted-foreground">баллов</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Транзакций</CardTitle>
                    <History className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{transactions.length}</div>
                    <p className="text-xs text-muted-foreground">операций</p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Как заработать баллы</CardTitle>
                  <CardDescription>Различные способы получения баллов на платформе</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3 p-3 bg-accent/5 rounded-lg">
                      <span className="text-2xl">📺</span>
                      <div>
                        <h4 className="font-semibold">Просмотр видео</h4>
                        <p className="text-sm text-muted-foreground">5-10 баллов за видео</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-accent/5 rounded-lg">
                      <span className="text-2xl">✅</span>
                      <div>
                        <h4 className="font-semibold">Правильные ответы</h4>
                        <p className="text-sm text-muted-foreground">2-5 баллов за ответ</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-accent/5 rounded-lg">
                      <span className="text-2xl">🛒</span>
                      <div>
                        <h4 className="font-semibold">Покупки курсов</h4>
                        <p className="text-sm text-muted-foreground">5% от суммы покупки</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-accent/5 rounded-lg">
                      <span className="text-2xl">💝</span>
                      <div>
                        <h4 className="font-semibold">Донаты</h4>
                        <p className="text-sm text-muted-foreground">10% от суммы доната</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="share" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Поделиться баллами</CardTitle>
                  <CardDescription>Отправьте баллы другому пользователю</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSharePoints} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="recipientId">ID получателя</Label>
                      <Input
                        id="recipientId"
                        value={shareForm.recipientId}
                        onChange={(e) => setShareForm((prev) => ({ ...prev, recipientId: e.target.value }))}
                        placeholder="Введите ID пользователя"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="shareAmount">Количество баллов</Label>
                      <Input
                        id="shareAmount"
                        type="number"
                        min="1"
                        max={userPoints}
                        value={shareForm.amount}
                        onChange={(e) => setShareForm((prev) => ({ ...prev, amount: e.target.value }))}
                        placeholder="Введите количество"
                        required
                      />
                      <p className="text-sm text-muted-foreground">Доступно: {userPoints} баллов</p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="shareMessage">Сообщение (необязательно)</Label>
                      <Textarea
                        id="shareMessage"
                        value={shareForm.message}
                        onChange={(e) => setShareForm((prev) => ({ ...prev, message: e.target.value }))}
                        placeholder="Добавьте сообщение..."
                        rows={3}
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={!canAfford(Number.parseInt(shareForm.amount) || 0)}
                      className="w-full"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Отправить баллы
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="request" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Запросить баллы</CardTitle>
                  <CardDescription>Попросите баллы у другого пользователя</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleRequestPoints} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="fromUserId">ID пользователя</Label>
                      <Input
                        id="fromUserId"
                        value={requestForm.fromUserId}
                        onChange={(e) => setRequestForm((prev) => ({ ...prev, fromUserId: e.target.value }))}
                        placeholder="Введите ID пользователя"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="requestAmount">Количество баллов</Label>
                      <Input
                        id="requestAmount"
                        type="number"
                        min="1"
                        value={requestForm.amount}
                        onChange={(e) => setRequestForm((prev) => ({ ...prev, amount: e.target.value }))}
                        placeholder="Введите количество"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="requestMessage">Сообщение (необязательно)</Label>
                      <Textarea
                        id="requestMessage"
                        value={requestForm.message}
                        onChange={(e) => setRequestForm((prev) => ({ ...prev, message: e.target.value }))}
                        placeholder="Объясните, зачем нужны баллы..."
                        rows={3}
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      <Download className="w-4 h-4 mr-2" />
                      Отправить запрос
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="history" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>История транзакций</CardTitle>
                  <CardDescription>Все операции с баллами</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {transactions.length === 0 ? (
                      <p className="text-center text-muted-foreground py-8">История транзакций пуста</p>
                    ) : (
                      transactions.map((transaction) => (
                        <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center space-x-3">
                            <span className="text-2xl">{getTransactionIcon(transaction.type)}</span>
                            <div>
                              <p className="font-medium">{transaction.description}</p>
                              <p className="text-sm text-muted-foreground">
                                {transaction.timestamp.toLocaleString("ru-RU")}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className={`font-semibold ${getTransactionColor(transaction.amount)}`}>
                              {transaction.amount > 0 ? "+" : ""}
                              {transaction.amount}
                            </p>
                            <p className="text-sm text-muted-foreground">баллов</p>
                          </div>
                        </div>
                      ))
                    )}
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
