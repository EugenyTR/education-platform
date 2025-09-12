"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Award, Download, Eye, ArrowLeft, FileText, CheckCircle } from "lucide-react"
import Link from "next/link"

// Mock certificate data
const userCertificates = [
  {
    id: "cert_001",
    courseTitle: "Основы веб-разработки",
    courseName: "Основы веб-разработки",
    studentName: "Петрова Анна Сергеевна",
    completionDate: "2024-02-10",
    score: 92,
    certificateNumber: "EDU-2024-001",
    status: "issued",
    downloadUrl: "/certificates/cert_001.pdf",
    emailSent: true,
  },
  {
    id: "cert_002",
    courseTitle: "JavaScript для начинающих",
    courseName: "JavaScript для начинающих",
    studentName: "Петрова Анна Сергеевна",
    completionDate: "2024-03-05",
    score: 88,
    certificateNumber: "EDU-2024-002",
    status: "issued",
    downloadUrl: "/certificates/cert_002.pdf",
    emailSent: true,
  },
  {
    id: "cert_003",
    courseTitle: "CSS Grid и Flexbox",
    courseName: "CSS Grid и Flexbox",
    studentName: "Петрова Анна Сергеевна",
    completionDate: "2024-01-28",
    score: 94,
    certificateNumber: "EDU-2024-003",
    status: "issued",
    downloadUrl: "/certificates/cert_003.pdf",
    emailSent: true,
  },
  {
    id: "cert_base",
    courseTitle: "Базовый курс программирования",
    courseName: "Базовый курс программирования",
    studentName: "Петрова Анна Сергеевна",
    completionDate: "2024-03-15",
    score: 91,
    certificateNumber: "EDU-BASE-2024-001",
    status: "available",
    downloadUrl: null,
    emailSent: false,
    isBaseCourse: true,
  },
]

export default function CertificatesPage() {
  const [selectedCertificate, setSelectedCertificate] = useState(null)
  const [showPreview, setShowPreview] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)

  const issuedCertificates = userCertificates.filter((cert) => cert.status === "issued")
  const availableCertificates = userCertificates.filter((cert) => cert.status === "available")

  const handleGenerateCertificate = async (certificate) => {
    setIsGenerating(true)
    // Simulate certificate generation
    setTimeout(() => {
      certificate.status = "issued"
      certificate.downloadUrl = `/certificates/${certificate.id}.pdf`
      certificate.emailSent = true
      setIsGenerating(false)
      setShowPreview(false)
    }, 2000)
  }

  const handleDownload = (certificate) => {
    // Simulate download
    const link = document.createElement("a")
    link.href = certificate.downloadUrl
    link.download = `certificate_${certificate.certificateNumber}.pdf`
    link.click()
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/profile">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Профиль
                </Button>
              </Link>
              <h1 className="text-2xl font-bold text-primary">Мои сертификаты</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary">{issuedCertificates.length} получено</Badge>
              {availableCertificates.length > 0 && (
                <Badge variant="outline">{availableCertificates.length} доступно</Badge>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Available Certificates */}
          {availableCertificates.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Доступные сертификаты</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {availableCertificates.map((certificate) => (
                  <Card
                    key={certificate.id}
                    className="border-accent/20 bg-gradient-to-br from-accent/5 to-secondary/5"
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{certificate.courseTitle}</CardTitle>
                        {certificate.isBaseCourse && <Badge variant="default">Базовый курс</Badge>}
                      </div>
                      <CardDescription>
                        Завершен {new Date(certificate.completionDate).toLocaleDateString("ru-RU")} • Балл:{" "}
                        {certificate.score}%
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center space-x-2 text-green-600">
                        <CheckCircle className="w-5 h-5" />
                        <span className="text-sm font-medium">Готов к выдаче</span>
                      </div>

                      <div className="flex space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" onClick={() => setSelectedCertificate(certificate)}>
                              <Eye className="w-4 h-4 mr-2" />
                              Предпросмотр
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle>Предпросмотр сертификата</DialogTitle>
                              <DialogDescription>Проверьте данные перед генерацией сертификата</DialogDescription>
                            </DialogHeader>
                            <CertificatePreview certificate={certificate} />
                            <div className="flex justify-end space-x-2 mt-4">
                              <Button onClick={() => handleGenerateCertificate(certificate)} disabled={isGenerating}>
                                {isGenerating ? "Генерируем..." : "Получить сертификат"}
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>

                        <Button
                          size="sm"
                          onClick={() => handleGenerateCertificate(certificate)}
                          disabled={isGenerating}
                        >
                          <Award className="w-4 h-4 mr-2" />
                          {isGenerating ? "Генерируем..." : "Получить"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Issued Certificates */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Полученные сертификаты</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {issuedCertificates.map((certificate) => (
                <Card key={certificate.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{certificate.courseTitle}</CardTitle>
                      <Award className="w-5 h-5 text-accent" />
                    </div>
                    <CardDescription>Сертификат №{certificate.certificateNumber}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Дата выдачи:</span>
                        <span>{new Date(certificate.completionDate).toLocaleDateString("ru-RU")}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Итоговый балл:</span>
                        <span className="font-medium">{certificate.score}%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Отправлен на email:</span>
                        <div className="flex items-center space-x-1">
                          {certificate.emailSent ? (
                            <>
                              <CheckCircle className="w-4 h-4 text-green-600" />
                              <span className="text-green-600 text-xs">Да</span>
                            </>
                          ) : (
                            <span className="text-muted-foreground text-xs">Нет</span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" onClick={() => setSelectedCertificate(certificate)}>
                            <Eye className="w-4 h-4 mr-2" />
                            Просмотр
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>Сертификат №{certificate.certificateNumber}</DialogTitle>
                          </DialogHeader>
                          <CertificatePreview certificate={certificate} />
                        </DialogContent>
                      </Dialog>

                      <Button size="sm" onClick={() => handleDownload(certificate)}>
                        <Download className="w-4 h-4 mr-2" />
                        Скачать
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Certificate Requirements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="w-5 h-5" />
                <span>Условия получения сертификатов</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Для получения сертификата необходимо:</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>Пройти курс на установленный процент (обычно 80%)</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>Заполнить полную регистрацию с ФИО и email</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>Успешно пройти итоговый тест</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Автоматическая выдача:</h4>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p>Сертификаты генерируются автоматически при выполнении всех условий.</p>
                    <p>Сертификат отправляется на указанный при регистрации email.</p>
                    <p>Специальный сертификат выдается за прохождение всего базового курса.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

// Certificate Preview Component
function CertificatePreview({ certificate }) {
  return (
    <div className="space-y-4">
      {/* Certificate Template */}
      <div className="relative bg-gradient-to-br from-blue-50 to-indigo-100 border-2 border-accent/20 rounded-lg p-8 aspect-[4/3] flex flex-col justify-center items-center text-center">
        {/* Decorative border */}
        <div className="absolute inset-4 border-2 border-accent/30 rounded-lg"></div>

        {/* Certificate content */}
        <div className="relative z-10 space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-primary">СЕРТИФИКАТ</h1>
            <p className="text-lg text-muted-foreground">о прохождении курса</p>
          </div>

          <div className="space-y-4">
            <p className="text-lg">Настоящим подтверждается, что</p>
            <div className="text-2xl font-bold text-accent border-b-2 border-accent/30 pb-2 px-4">
              {certificate.studentName}
            </div>
            <p className="text-lg">успешно прошел(а) курс</p>
            <div className="text-xl font-semibold text-primary">"{certificate.courseName}"</div>
            <p className="text-base text-muted-foreground">
              и продемонстрировал(а) высокий уровень знаний в данной области
            </p>
          </div>

          <div className="flex justify-between items-end pt-8">
            <div className="text-left">
              <div className="text-sm text-muted-foreground">Дата выдачи:</div>
              <div className="font-medium">{new Date(certificate.completionDate).toLocaleDateString("ru-RU")}</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-muted-foreground">Итоговый балл:</div>
              <div className="text-xl font-bold text-accent">{certificate.score}%</div>
            </div>
            <div className="text-right">
              <div className="text-sm text-muted-foreground">Номер сертификата:</div>
              <div className="font-medium">{certificate.certificateNumber}</div>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-accent/40"></div>
        <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-accent/40"></div>
        <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-accent/40"></div>
        <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-accent/40"></div>
      </div>

      {/* Certificate Info */}
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <span className="text-muted-foreground">Студент:</span>
          <div className="font-medium">{certificate.studentName}</div>
        </div>
        <div>
          <span className="text-muted-foreground">Курс:</span>
          <div className="font-medium">{certificate.courseName}</div>
        </div>
        <div>
          <span className="text-muted-foreground">Дата завершения:</span>
          <div className="font-medium">{new Date(certificate.completionDate).toLocaleDateString("ru-RU")}</div>
        </div>
        <div>
          <span className="text-muted-foreground">Номер сертификата:</span>
          <div className="font-medium">{certificate.certificateNumber}</div>
        </div>
      </div>
    </div>
  )
}
