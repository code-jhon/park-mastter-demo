"use client"

import { useState } from "react"
import { Clock, AlertTriangle, ChevronRight, DollarSign, Car } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ViolationsScreenProps {
  onVehicleSelect: (plate: string) => void
}

interface Violation {
  id: string
  plate: string
  space: string
  minutesExceeded: number
  suggestedFine: number
  status: "pending" | "resolved" | "charged"
  timestamp: string
}

const mockViolations: Violation[] = [
  {
    id: "v1",
    plate: "ABC-123",
    space: "A2",
    minutesExceeded: 45,
    suggestedFine: 25.0,
    status: "pending",
    timestamp: "Hoy, 14:30",
  },
  {
    id: "v2",
    plate: "XYZ-789",
    space: "B1",
    minutesExceeded: 30,
    suggestedFine: 15.0,
    status: "pending",
    timestamp: "Hoy, 13:45",
  },
  {
    id: "v3",
    plate: "DEF-456",
    space: "B3",
    minutesExceeded: 60,
    suggestedFine: 35.0,
    status: "charged",
    timestamp: "Hoy, 11:20",
  },
  {
    id: "v4",
    plate: "GHI-012",
    space: "C3",
    minutesExceeded: 15,
    suggestedFine: 10.0,
    status: "resolved",
    timestamp: "Ayer, 16:00",
  },
  {
    id: "v5",
    plate: "JKL-345",
    space: "C5",
    minutesExceeded: 90,
    suggestedFine: 50.0,
    status: "pending",
    timestamp: "Ayer, 10:30",
  },
]

const statusLabels: Record<string, string> = {
  pending: "Pendiente",
  resolved: "Resuelto",
  charged: "Cobrado",
}

const statusColors: Record<string, string> = {
  pending: "bg-warning text-warning-foreground",
  resolved: "bg-success text-success-foreground",
  charged: "bg-primary text-primary-foreground",
}

export function ViolationsScreen({ onVehicleSelect }: ViolationsScreenProps) {
  const [filter, setFilter] = useState<"all" | "pending" | "resolved" | "charged">("all")
  const [violations, setViolations] = useState(mockViolations)

  const filteredViolations = filter === "all" ? violations : violations.filter((v) => v.status === filter)

  const pendingCount = violations.filter((v) => v.status === "pending").length
  const totalFines = violations.filter((v) => v.status === "pending").reduce((sum, v) => sum + v.suggestedFine, 0)

  const handleResolve = (id: string) => {
    setViolations((prev) => prev.map((v) => (v.id === id ? { ...v, status: "resolved" as const } : v)))
  }

  const handleCharge = (id: string) => {
    setViolations((prev) => prev.map((v) => (v.id === id ? { ...v, status: "charged" as const } : v)))
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <header className="bg-card border-b border-border px-4 pt-4 pb-3 safe-area-inset-top">
        <h1 className="text-xl font-bold text-foreground mb-2">Infracciones</h1>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-warning/10 rounded-xl p-3">
            <div className="flex items-center gap-2 text-warning mb-1">
              <AlertTriangle className="size-4" />
              <span className="text-sm font-medium">Pendientes</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{pendingCount}</p>
          </div>
          <div className="bg-success/10 rounded-xl p-3">
            <div className="flex items-center gap-2 text-success mb-1">
              <DollarSign className="size-4" />
              <span className="text-sm font-medium">Por cobrar</span>
            </div>
            <p className="text-2xl font-bold text-foreground">${totalFines.toFixed(2)}</p>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2">
          {(["all", "pending", "resolved", "charged"] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={cn(
                "px-3 py-1.5 rounded-full text-sm font-medium transition-colors touch-manipulation",
                filter === status ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground",
              )}
            >
              {status === "all" ? "Todas" : statusLabels[status]}
            </button>
          ))}
        </div>
      </header>

      {/* Violations List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {filteredViolations.map((violation) => (
          <div key={violation.id} className="bg-card rounded-xl border border-border p-4 shadow-sm">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="size-12 bg-destructive/10 rounded-full flex items-center justify-center">
                  <Car className="size-6 text-destructive" />
                </div>
                <div>
                  <p className="font-bold text-lg text-foreground">{violation.plate}</p>
                  <p className="text-sm text-muted-foreground">Espacio {violation.space}</p>
                </div>
              </div>
              <span className={cn("px-2.5 py-1 rounded-full text-xs font-medium", statusColors[violation.status])}>
                {statusLabels[violation.status]}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-secondary rounded-lg p-2.5">
                <div className="flex items-center gap-1.5 text-muted-foreground mb-0.5">
                  <Clock className="size-3.5" />
                  <span className="text-xs">Tiempo excedido</span>
                </div>
                <p className="font-semibold text-foreground">{violation.minutesExceeded} min</p>
              </div>
              <div className="bg-secondary rounded-lg p-2.5">
                <div className="flex items-center gap-1.5 text-muted-foreground mb-0.5">
                  <DollarSign className="size-3.5" />
                  <span className="text-xs">Multa sugerida</span>
                </div>
                <p className="font-semibold text-foreground">${violation.suggestedFine.toFixed(2)}</p>
              </div>
            </div>

            <p className="text-xs text-muted-foreground mb-3">{violation.timestamp}</p>

            {violation.status === "pending" && (
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 bg-transparent"
                  onClick={() => handleResolve(violation.id)}
                >
                  Resolver
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  className="flex-1 bg-success hover:bg-success/90 text-success-foreground"
                  onClick={() => handleCharge(violation.id)}
                >
                  Cobrar
                </Button>
                <Button variant="ghost" size="sm" onClick={() => onVehicleSelect(violation.plate)}>
                  <ChevronRight className="size-4" />
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
