"use client"

import type React from "react"

import { TrendingUp, TrendingDown, Car, DollarSign, AlertTriangle, Calendar, Users, Clock } from "lucide-react"
import { cn } from "@/lib/utils"

interface StatCard {
  title: string
  value: string
  change: number
  icon: React.ElementType
  color: string
}

const stats: StatCard[] = [
  {
    title: "Ocupación",
    value: "78%",
    change: 5.2,
    icon: Car,
    color: "text-chart-1",
  },
  {
    title: "Ingresos hoy",
    value: "$1,245",
    change: 12.5,
    icon: DollarSign,
    color: "text-success",
  },
  {
    title: "Infracciones",
    value: "12",
    change: -8.3,
    icon: AlertTriangle,
    color: "text-destructive",
  },
  {
    title: "Reservas",
    value: "34",
    change: 15.0,
    icon: Calendar,
    color: "text-chart-5",
  },
]

const hourlyData = [
  { hour: "6AM", occupancy: 20 },
  { hour: "8AM", occupancy: 65 },
  { hour: "10AM", occupancy: 85 },
  { hour: "12PM", occupancy: 90 },
  { hour: "2PM", occupancy: 78 },
  { hour: "4PM", occupancy: 82 },
  { hour: "6PM", occupancy: 60 },
  { hour: "8PM", occupancy: 35 },
]

const recentActivity = [
  { type: "entry", plate: "ABC-123", time: "Hace 5 min", space: "A2" },
  { type: "exit", plate: "XYZ-789", time: "Hace 12 min", space: "B4" },
  { type: "payment", plate: "DEF-456", time: "Hace 20 min", amount: "$8.50" },
  { type: "violation", plate: "GHI-012", time: "Hace 35 min", space: "C1" },
]

export function DashboardScreen() {
  const maxOccupancy = Math.max(...hourlyData.map((d) => d.occupancy))

  return (
    <div className="h-full overflow-y-auto safe-area-inset-top">
      {/* Header */}
      <header className="bg-card border-b border-border px-4 pt-4 pb-3 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-foreground">Panel</h1>
            <p className="text-sm text-muted-foreground">Hoy, 4 Dic 2025</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="size-10 bg-success/20 rounded-full flex items-center justify-center">
              <Users className="size-5 text-success" />
            </div>
          </div>
        </div>
      </header>

      <div className="p-4 space-y-4">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          {stats.map((stat) => {
            const Icon = stat.icon
            const isPositive = stat.change > 0
            return (
              <div key={stat.title} className="bg-card rounded-xl border border-border p-3 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <Icon className={cn("size-5", stat.color)} />
                  <div
                    className={cn(
                      "flex items-center gap-0.5 text-xs font-medium",
                      isPositive ? "text-success" : "text-destructive",
                    )}
                  >
                    {isPositive ? <TrendingUp className="size-3" /> : <TrendingDown className="size-3" />}
                    {Math.abs(stat.change)}%
                  </div>
                </div>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.title}</p>
              </div>
            )
          })}
        </div>

        {/* Occupancy Chart */}
        <div className="bg-card rounded-xl border border-border p-4 shadow-sm">
          <h3 className="font-semibold text-foreground mb-3">Ocupación por hora</h3>
          <div className="flex items-end justify-between gap-1 h-32">
            {hourlyData.map((data) => (
              <div key={data.hour} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full bg-primary rounded-t-sm transition-all duration-500"
                  style={{
                    height: `${(data.occupancy / maxOccupancy) * 100}%`,
                    opacity: data.occupancy > 80 ? 1 : 0.7,
                  }}
                />
                <span className="text-[9px] text-muted-foreground">{data.hour}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Revenue Overview */}
        <div className="bg-card rounded-xl border border-border p-4 shadow-sm">
          <h3 className="font-semibold text-foreground mb-3">Resumen de ingresos</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Esta semana</span>
              <span className="font-semibold text-foreground">$8,450.00</span>
            </div>
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <div className="h-full w-[75%] bg-success rounded-full" />
            </div>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Meta: $11,200</span>
              <span>75% completado</span>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-card rounded-xl border border-border p-4 shadow-sm">
          <h3 className="font-semibold text-foreground mb-3">Actividad reciente</h3>
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center gap-3">
                <div
                  className={cn(
                    "size-8 rounded-full flex items-center justify-center",
                    activity.type === "entry"
                      ? "bg-success/10"
                      : activity.type === "exit"
                        ? "bg-primary/10"
                        : activity.type === "payment"
                          ? "bg-chart-1/10"
                          : "bg-destructive/10",
                  )}
                >
                  {activity.type === "entry" ? (
                    <Car className="size-4 text-success" />
                  ) : activity.type === "exit" ? (
                    <Car className="size-4 text-primary" />
                  ) : activity.type === "payment" ? (
                    <DollarSign className="size-4 text-chart-1" />
                  ) : (
                    <AlertTriangle className="size-4 text-destructive" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{activity.plate}</p>
                  <p className="text-xs text-muted-foreground">
                    {activity.type === "entry"
                      ? `Entrada - Espacio ${activity.space}`
                      : activity.type === "exit"
                        ? `Salida - Espacio ${activity.space}`
                        : activity.type === "payment"
                          ? `Pago - ${activity.amount}`
                          : `Infracción - Espacio ${activity.space}`}
                  </p>
                </div>
                <span className="text-xs text-muted-foreground">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-card rounded-xl border border-border p-3 text-center">
            <Clock className="size-5 mx-auto text-muted-foreground mb-1" />
            <p className="text-lg font-bold text-foreground">2.4h</p>
            <p className="text-[10px] text-muted-foreground">Tiempo promedio</p>
          </div>
          <div className="bg-card rounded-xl border border-border p-3 text-center">
            <Users className="size-5 mx-auto text-muted-foreground mb-1" />
            <p className="text-lg font-bold text-foreground">156</p>
            <p className="text-[10px] text-muted-foreground">Visitas hoy</p>
          </div>
          <div className="bg-card rounded-xl border border-border p-3 text-center">
            <Car className="size-5 mx-auto text-muted-foreground mb-1" />
            <p className="text-lg font-bold text-foreground">45</p>
            <p className="text-[10px] text-muted-foreground">Disponibles</p>
          </div>
        </div>
      </div>
    </div>
  )
}
