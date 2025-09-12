"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/contexts/auth-context"
import Link from "next/link"

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    surname: "",
    patronymic: "",
    nickname: "",
  })
  const [error, setError] = useState("")
  const { register, isLoading } = useAuth()
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (formData.password !== formData.confirmPassword) {
      setError("Пароли не совпадают")
      return
    }

    if (formData.password.length < 6) {
      setError("Пароль должен содержать минимум 6 символов")
      return
    }

    const success = await register({
      email: formData.email,
      password: formData.password,
      name: formData.name,
      surname: formData.surname,
      patronymic: formData.patronymic,
      nickname: formData.nickname,
    })

    if (success) {
      router.push("/")
    } else {
      setError("Ошибка регистрации. Попробуйте еще раз.")
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Регистрация</CardTitle>
          <CardDescription>Создайте аккаунт для доступа к образовательной платформе</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Имя *</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Анна"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="surname">Фамилия *</Label>
                <Input
                  id="surname"
                  name="surname"
                  value={formData.surname}
                  onChange={handleChange}
                  placeholder="Петрова"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="patronymic">Отчество</Label>
              <Input
                id="patronymic"
                name="patronymic"
                value={formData.patronymic}
                onChange={handleChange}
                placeholder="Сергеевна"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="nickname">Никнейм</Label>
              <Input
                id="nickname"
                name="nickname"
                value={formData.nickname}
                onChange={handleChange}
                placeholder="anna_p"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Пароль *</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Минимум 6 символов"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Подтвердите пароль *</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Повторите пароль"
                required
              />
            </div>
            {error && <div className="text-destructive text-sm">{error}</div>}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Регистрация..." : "Зарегистрироваться"}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Уже есть аккаунт?{" "}
            <Link href="/login" className="text-primary hover:underline">
              Войти
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
