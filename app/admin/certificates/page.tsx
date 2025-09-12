"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Eye, Save, ArrowLeft, Award, Settings } from "lucide-react"
import Link from "next/link"

export default function AdminCertificatesPage() {
  const [certificateTemplate, setCertificateTemplate] = useState({
    backgroundImage: null,
    title: "СЕРТИФИКАТ",
    subtitle: "о прохождении курса",
    bodyText: `Настоящим подтверждается, что [ФИО] успешно прошел(а) курс "[НАЗВАНИЕ КУРСА]" и продемонстрировал(а) высокий уровень знаний в данной области.

Данный сертификат подтверждает компетенции, полученные в ходе обучения, и может быть использован для подтверждения квалификации.`,
    footerText: "Образовательная платформа",
  })

  const [baseCourseTemplate, setBaseCourseTemplate] = useState({
    backgroundImage: null,
    title: "СЕРТИФИКАТ МАСТЕРА",
    subtitle: "о прохождении базового курса",
    bodyText: `Настоящим подтверждается, что [ФИО] успешно завершил(а) полный базовый курс программирования и достиг(ла) высокого уровня мастерства в области разработки.

Данный сертификат подтверждает глубокие знания и практические навыки, полученные в ходе комплексного обучения.`,
    footerText: "Образовательная платформа • Базовый курс",
  })

  const [issuedCertificates] = useState([
    {
      id: "1",
      studentName: "Петрова Анна Сергеевна",
      courseName: "Основы веб-разработки",
      issueDate: "2024-02-10",
      certificateNumber: "EDU-2024-001",
      score: 92,
      email: "anna.petrova@example.com",
      status: "sent",
    },
    {
      id: "2",
      studentName: "Иванов Петр Михайлович",
      courseName: "JavaScript для начинающих",
      issueDate: "2024-02-15",
      certificateNumber: "EDU-2024-002",
      score: 88,
      email: "petr.ivanov@example.com",
      status: "generated",
    },
  ])

  const handleImageUpload = (event, templateType) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        if (templateType === "regular") {
          setCertificateTemplate((prev) => ({ ...prev, backgroundImage: e.target.result }))
        } else {
          setBaseCourseTemplate((prev) => ({ ...prev, backgroundImage: e.target.result }))
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSaveTemplate = (templateType) => {
    // Save template logic
    console.log(`Saving ${templateType} template`)
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
              <h1 className="text-2xl font-bold text-primary">Управление сертификатами</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="templates" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="templates">Шаблоны</TabsTrigger>
            <TabsTrigger value="issued">Выданные</TabsTrigger>
            <TabsTrigger value="settings">Настройки</TabsTrigger>
          </TabsList>

          {/* Templates Tab */}
          <TabsContent value="templates" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Regular Certificate Template */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Award className="w-5 h-5" />
                    <span>Обычный сертификат</span>
                  </CardTitle>
                  <CardDescription>Шаблон для сертификатов по отдельным курсам</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="regular-bg">Фон сертификата</Label>
                    <Input
                      id="regular-bg"
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, "regular")}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="regular-title">Заголовок</Label>
                    <Input
                      id="regular-title"
                      value={certificateTemplate.title}
                      onChange={(e) => setCertificateTemplate((prev) => ({ ...prev, title: e.target.value }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="regular-subtitle">Подзаголовок</Label>
                    <Input
                      id="regular-subtitle"
                      value={certificateTemplate.subtitle}
                      onChange={(e) => setCertificateTemplate((prev) => ({ ...prev, subtitle: e.target.value }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="regular-body">Основной текст</Label>
                    <Textarea
                      id="regular-body"
                      value={certificateTemplate.bodyText}
                      onChange={(e) => setCertificateTemplate((prev) => ({ ...prev, bodyText: e.target.value }))}
                      rows={6}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="regular-footer">Подпись</Label>
                    <Input
                      id="regular-footer"
                      value={certificateTemplate.footerText}
                      onChange={(e) => setCertificateTemplate((prev) => ({ ...prev, footerText: e.target.value }))}
                    />
                  </div>

                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-2" />
                      Предпросмотр
                    </Button>
                    <Button size="sm" onClick={() => handleSaveTemplate("regular")}>
                      <Save className="w-4 h-4 mr-2" />
                      Сохранить
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Base Course Certificate Template */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Award className="w-5 h-5 text-accent" />
                    <span>Сертификат базового курса</span>
                  </CardTitle>
                  <CardDescription>Специальный шаблон за прохождение всей базовой программы</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="base-bg">Фон сертификата</Label>
                    <Input id="base-bg" type="file" accept="image/*" onChange={(e) => handleImageUpload(e, "base")} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="base-title">Заголовок</Label>
                    <Input
                      id="base-title"
                      value={baseCourseTemplate.title}
                      onChange={(e) => setBaseCourseTemplate((prev) => ({ ...prev, title: e.target.value }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="base-subtitle">Подзаголовок</Label>
                    <Input
                      id="base-subtitle"
                      value={baseCourseTemplate.subtitle}
                      onChange={(e) => setBaseCourseTemplate((prev) => ({ ...prev, subtitle: e.target.value }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="base-body">Основной текст</Label>
                    <Textarea
                      id="base-body"
                      value={baseCourseTemplate.bodyText}
                      onChange={(e) => setBaseCourseTemplate((prev) => ({ ...prev, bodyText: e.target.value }))}
                      rows={6}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="base-footer">Подпись</Label>
                    <Input
                      id="base-footer"
                      value={baseCourseTemplate.footerText}
                      onChange={(e) => setBaseCourseTemplate((prev) => ({ ...prev, footerText: e.target.value }))}
                    />
                  </div>

                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-2" />
                      Предпросмотр
                    </Button>
                    <Button size="sm" onClick={() => handleSaveTemplate("base")}>
                      <Save className="w-4 h-4 mr-2" />
                      Сохранить
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Template Variables Info */}
            <Card>
              <CardHeader>
                <CardTitle>Автоматические переменные</CardTitle>
                <CardDescription>
                  Используйте эти переменные в тексте для автоматической подстановки данных
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    <div>
                      <code className="bg-muted px-2 py-1 rounded">[ФИО]</code> - Полное имя студента
                    </div>
                    <div>
                      <code className="bg-muted px-2 py-1 rounded">[НАЗВАНИЕ КУРСА]</code> - Название курса
                    </div>
                    <div>
                      <code className="bg-muted px-2 py-1 rounded">[ДАТА]</code> - Дата выдачи сертификата
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <code className="bg-muted px-2 py-1 rounded">[БАЛЛ]</code> - Итоговый балл студента
                    </div>
                    <div>
                      <code className="bg-muted px-2 py-1 rounded">[НОМЕР]</code> - Номер сертификата
                    </div>
                    <div>
                      <code className="bg-muted px-2 py-1 rounded">[ГОД]</code> - Текущий год
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Issued Certificates Tab */}
          <TabsContent value="issued" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Выданные сертификаты</h2>
              <Badge variant="secondary">{issuedCertificates.length} всего</Badge>
            </div>

            <div className="space-y-4">
              {issuedCertificates.map((certificate) => (
                <Card key={certificate.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <h3 className="font-semibold">{certificate.studentName}</h3>
                        <p className="text-sm text-muted-foreground">{certificate.courseName}</p>
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                          <span>№{certificate.certificateNumber}</span>
                          <span>{new Date(certificate.issueDate).toLocaleDateString("ru-RU")}</span>
                          <span>Балл: {certificate.score}%</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Badge variant={certificate.status === "sent" ? "default" : "outline"}>
                          {certificate.status === "sent" ? "Отправлен" : "Сгенерирован"}
                        </Badge>
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-2" />
                          Просмотр
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="w-5 h-5" />
                  <span>Настройки автоматической выдачи</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Условия выдачи сертификатов:</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between p-3 bg-muted/50 rounded">
                        <span>Минимальный процент прохождения курса</span>
                        <Input type="number" defaultValue="80" className="w-20" />
                      </div>
                      <div className="flex items-center justify-between p-3 bg-muted/50 rounded">
                        <span>Требовать полную регистрацию (ФИО + email)</span>
                        <input type="checkbox" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between p-3 bg-muted/50 rounded">
                        <span>Автоматическая отправка на email</span>
                        <input type="checkbox" defaultChecked />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Email настройки:</h4>
                    <div className="space-y-2">
                      <div className="space-y-1">
                        <Label>Тема письма</Label>
                        <Input defaultValue="Ваш сертификат готов!" />
                      </div>
                      <div className="space-y-1">
                        <Label>Текст письма</Label>
                        <Textarea
                          defaultValue="Поздравляем! Ваш сертификат о прохождении курса готов. Вы можете скачать его во вложении или в личном кабинете."
                          rows={3}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <Button>
                  <Save className="w-4 h-4 mr-2" />
                  Сохранить настройки
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
