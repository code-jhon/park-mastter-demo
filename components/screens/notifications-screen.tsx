"use client"

import type React from "react"

import { useState } from "react"
import { Bell, CreditCard, Shield, AlertTriangle, Clock, ChevronRight, Check, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type NotificationCategory = "all" | "alerts" | "payments" | "security" | "violations"

interface Notification {
  id: string
  type: NotificationCategory
  title: string
  message: string
  time: string
  read: boolean
  plate?: string
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "violations",
    title: "Exceso de tiempo",
    message: "El vehículo ABC-123 ha excedido 45 minutos",
    time: "Hace 5 min",
    read: false,
    plate: "ABC-123",
  },
  {
    id: "2",
    type: "payments",
    title: "Pago recibido",
    message: "Pago de $15.00 procesado correctamente",
    time: "Hace 15 min",
    read: false,
  },
  {
    id: "3",
    type: "security",
    title: "Alerta de seguridad",
    message: "Movimiento detectado en zona C después de horario",
    time: "Hace 30 min",
    read: true,
  },
  {
    id: "4",
    type: "alerts",
    title: "Espacio liberado",
    message: "El espacio B4 ahora está disponible",
    time: "Hace 1 hora",
    read: true,
  },
  {
    id: "5",
    type: "violations",
    title: "Multa aplicada",
    message: "Multa de $25.00 aplicada al vehículo XYZ-789",
    time: "Hace 2 horas",
    read: true,
    plate: "XYZ-789",
  },
  {
    id: "6",
    type: "payments",
    title: "Pago pendiente",
    message: "El vehículo DEF-456 tiene un pago pendiente de $8.50",
    time: "Hace 3 horas",
    read: true,
    plate: "DEF-456",
  },
]

const categories: { id: NotificationCategory; label: string; icon: React.ElementType }[] = [
  { id: "all", label: "Todas", icon: Bell },
  { id: "alerts", label: "Alertas", icon: AlertTriangle },
  { id: "payments", label: "Pagos", icon: CreditCard },
  { id: "security", label: "Seguridad", icon: Shield },
  { id: "violations", label: "Multas", icon: Clock },
]

const typeIcons: Record<NotificationCategory, React.ElementType> = {
  all: Bell,
  alerts: AlertTriangle,
  payments: CreditCard,
  security: Shield,
  violations: Clock,
}

const typeColors: Record<NotificationCategory, string> = {
  all: "bg-muted",
  alerts: "bg-warning",
  payments: "bg-success",
  security: "bg-destructive",
  violations: "bg-chart-3",
}

export function NotificationsScreen() {
  const [selectedCategory, setSelectedCategory] = useState<NotificationCategory>("all")
  const [notifications, setNotifications] = useState(mockNotifications)

  const filteredNotifications =
    selectedCategory === "all" ? notifications : notifications.filter((n) => n.type === selectedCategory)

  const unreadCount = notifications.filter((n) => !n.read).length

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <header className="bg-card border-b border-border px-4 pt-4 pb-2 safe-area-inset-top">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-xl font-bold text-foreground">Notificaciones</h1>
            {unreadCount > 0 && <p className="text-sm text-muted-foreground">{unreadCount} sin leer</p>}
          </div>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={markAllAsRead} className="text-primary">
              <Check className="size-4 mr-1" />
              Marcar todo
            </Button>
          )}
        </div>

        {/* Category Tabs */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
          {categories.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setSelectedCategory(id)}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors touch-manipulation",
                selectedCategory === id
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground",
              )}
            >
              <Icon className="size-3.5" />
              {label}
            </button>
          ))}
        </div>
      </header>

      {/* Notifications List */}
      <div className="flex-1 overflow-y-auto">
        {filteredNotifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
            <Bell className="size-12 mb-2 opacity-50" />
            <p>No hay notificaciones</p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {filteredNotifications.map((notification) => {
              const Icon = typeIcons[notification.type]
              return (
                <div
                  key={notification.id}
                  className={cn(
                    "flex items-start gap-3 px-4 py-3 transition-colors",
                    !notification.read && "bg-primary/5",
                  )}
                >
                  <div
                    className={cn(
                      "size-10 rounded-full flex items-center justify-center shrink-0",
                      typeColors[notification.type],
                    )}
                  >
                    <Icon className="size-5 text-primary-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className={cn("font-medium text-foreground", !notification.read && "font-semibold")}>
                          {notification.title}
                        </p>
                        <p className="text-sm text-muted-foreground line-clamp-2">{notification.message}</p>
                        <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                      </div>
                      {!notification.read && <div className="size-2 rounded-full bg-primary shrink-0 mt-2" />}
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      {!notification.read && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => markAsRead(notification.id)}
                          className="h-7 text-xs"
                        >
                          <Check className="size-3 mr-1" />
                          Leído
                        </Button>
                      )}
                      {notification.plate && (
                        <Button variant="outline" size="sm" className="h-7 text-xs bg-transparent">
                          Ver vehículo
                          <ChevronRight className="size-3 ml-1" />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteNotification(notification.id)}
                        className="h-7 text-xs text-destructive hover:text-destructive"
                      >
                        <Trash2 className="size-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
