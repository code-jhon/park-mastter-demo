"use client"

import type React from "react"

import { useState } from "react"
import { CreditCard, Smartphone, DollarSign, Check, Clock, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface PaymentsScreenProps {
  onPayment: () => void
}

interface Payment {
  id: string
  plate: string
  amount: number
  method: "card" | "apple" | "google" | "paypal" | "cash"
  status: "completed" | "pending" | "failed"
  time: string
}

const mockPayments: Payment[] = [
  {
    id: "p1",
    plate: "MNO-678",
    amount: 5.0,
    method: "apple",
    status: "completed",
    time: "Hace 15 min",
  },
  {
    id: "p2",
    plate: "ABC-123",
    amount: 18.75,
    method: "card",
    status: "pending",
    time: "Hace 30 min",
  },
  {
    id: "p3",
    plate: "XYZ-789",
    amount: 12.5,
    method: "google",
    status: "completed",
    time: "Hace 1 hora",
  },
  {
    id: "p4",
    plate: "DEF-456",
    amount: 8.0,
    method: "paypal",
    status: "completed",
    time: "Hace 2 horas",
  },
  {
    id: "p5",
    plate: "GHI-012",
    amount: 15.0,
    method: "cash",
    status: "completed",
    time: "Hace 3 horas",
  },
]

const methodIcons: Record<string, React.ElementType> = {
  card: CreditCard,
  apple: Smartphone,
  google: Smartphone,
  paypal: DollarSign,
  cash: DollarSign,
}

const methodLabels: Record<string, string> = {
  card: "Tarjeta",
  apple: "Apple Pay",
  google: "Google Pay",
  paypal: "PayPal",
  cash: "Efectivo",
}

const statusColors: Record<string, string> = {
  completed: "bg-success text-success-foreground",
  pending: "bg-warning text-warning-foreground",
  failed: "bg-destructive text-destructive-foreground",
}

const statusLabels: Record<string, string> = {
  completed: "Completado",
  pending: "Pendiente",
  failed: "Fallido",
}

export function PaymentsScreen({ onPayment }: PaymentsScreenProps) {
  const [filter, setFilter] = useState<"all" | "completed" | "pending">("all")

  const filteredPayments = filter === "all" ? mockPayments : mockPayments.filter((p) => p.status === filter)

  const todayTotal = mockPayments.filter((p) => p.status === "completed").reduce((sum, p) => sum + p.amount, 0)

  const pendingTotal = mockPayments.filter((p) => p.status === "pending").reduce((sum, p) => sum + p.amount, 0)

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <header className="bg-card border-b border-border px-4 pt-4 pb-3 safe-area-inset-top">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold text-foreground">Pagos</h1>
          <Button onClick={onPayment} size="sm" className="bg-success hover:bg-success/90 text-success-foreground">
            <DollarSign className="size-4 mr-1" />
            Nuevo pago
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-success/10 rounded-xl p-3">
            <div className="flex items-center gap-2 text-success mb-1">
              <Check className="size-4" />
              <span className="text-sm font-medium">Hoy</span>
            </div>
            <p className="text-2xl font-bold text-foreground">${todayTotal.toFixed(2)}</p>
          </div>
          <div className="bg-warning/10 rounded-xl p-3">
            <div className="flex items-center gap-2 text-warning mb-1">
              <Clock className="size-4" />
              <span className="text-sm font-medium">Pendiente</span>
            </div>
            <p className="text-2xl font-bold text-foreground">${pendingTotal.toFixed(2)}</p>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2">
          {(["all", "completed", "pending"] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={cn(
                "px-3 py-1.5 rounded-full text-sm font-medium transition-colors touch-manipulation",
                filter === status ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground",
              )}
            >
              {status === "all" ? "Todos" : statusLabels[status]}
            </button>
          ))}
        </div>
      </header>

      {/* Payment Methods Quick Access */}
      <div className="px-4 py-3 border-b border-border">
        <p className="text-sm font-medium text-muted-foreground mb-2">Métodos de pago</p>
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {[
            { icon: "💳", label: "Tarjeta" },
            { icon: "🍎", label: "Apple Pay" },
            { icon: "🤖", label: "Google Pay" },
            { icon: "💰", label: "PayPal" },
          ].map((method) => (
            <button
              key={method.label}
              onClick={onPayment}
              className="flex items-center gap-2 px-4 py-2 bg-secondary rounded-xl whitespace-nowrap touch-manipulation hover:bg-muted transition-colors"
            >
              <span className="text-lg">{method.icon}</span>
              <span className="text-sm font-medium text-foreground">{method.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Payments List */}
      <div className="flex-1 overflow-y-auto">
        <div className="divide-y divide-border">
          {filteredPayments.map((payment) => {
            const Icon = methodIcons[payment.method]
            return (
              <div key={payment.id} className="flex items-center gap-3 px-4 py-3">
                <div className="size-12 bg-secondary rounded-full flex items-center justify-center">
                  <Icon className="size-5 text-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-foreground">{payment.plate}</p>
                    <p className="font-bold text-lg text-foreground">${payment.amount.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">
                      {methodLabels[payment.method]} · {payment.time}
                    </p>
                    <span
                      className={cn("px-2 py-0.5 rounded-full text-[10px] font-medium", statusColors[payment.status])}
                    >
                      {statusLabels[payment.status]}
                    </span>
                  </div>
                </div>
                <ChevronRight className="size-5 text-muted-foreground" />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
