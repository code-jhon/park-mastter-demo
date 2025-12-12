"use client"

import { useState } from "react"
import { Search, Car, Clock, MapPin, DollarSign, History, ChevronRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface VehicleScreenProps {
  onVehicleSelect: (plate: string) => void
  onPayment: () => void
}

interface Vehicle {
  plate: string
  space: string
  entryTime: string
  duration: string
  accumulatedFee: number
  status: "parked" | "overtime" | "paid"
}

const mockVehicles: Vehicle[] = [
  {
    plate: "ABC-123",
    space: "A2",
    entryTime: "10:30 AM",
    duration: "3h 45m",
    accumulatedFee: 18.75,
    status: "overtime",
  },
  {
    plate: "XYZ-789",
    space: "B1",
    entryTime: "11:00 AM",
    duration: "3h 15m",
    accumulatedFee: 16.25,
    status: "parked",
  },
  {
    plate: "DEF-456",
    space: "B3",
    entryTime: "09:45 AM",
    duration: "4h 30m",
    accumulatedFee: 22.5,
    status: "overtime",
  },
  {
    plate: "GHI-012",
    space: "C3",
    entryTime: "12:00 PM",
    duration: "2h 15m",
    accumulatedFee: 11.25,
    status: "parked",
  },
  {
    plate: "JKL-345",
    space: "C5",
    entryTime: "08:30 AM",
    duration: "5h 45m",
    accumulatedFee: 28.75,
    status: "overtime",
  },
  {
    plate: "MNO-678",
    space: "D4",
    entryTime: "13:15 PM",
    duration: "1h 00m",
    accumulatedFee: 5.0,
    status: "paid",
  },
]

const statusColors: Record<string, string> = {
  parked: "bg-success text-success-foreground",
  overtime: "bg-destructive text-destructive-foreground",
  paid: "bg-primary text-primary-foreground",
}

const statusLabels: Record<string, string> = {
  parked: "Estacionado",
  overtime: "Excedido",
  paid: "Pagado",
}

export function VehicleScreen({ onVehicleSelect, onPayment }: VehicleScreenProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredVehicles = mockVehicles.filter(
    (v) =>
      v.plate.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.space.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const parkedCount = mockVehicles.filter((v) => v.status === "parked").length
  const overtimeCount = mockVehicles.filter((v) => v.status === "overtime").length
  const totalRevenue = mockVehicles.reduce((sum, v) => sum + v.accumulatedFee, 0)

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <header className="bg-card border-b border-border px-4 pt-4 pb-3 safe-area-inset-top">
        <h1 className="text-xl font-bold text-foreground mb-3">Vehículos</h1>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            placeholder="Buscar placa o espacio..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 h-10"
          />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-success/10 rounded-lg p-2 text-center">
            <p className="text-lg font-bold text-success">{parkedCount}</p>
            <p className="text-xs text-muted-foreground">Activos</p>
          </div>
          <div className="bg-destructive/10 rounded-lg p-2 text-center">
            <p className="text-lg font-bold text-destructive">{overtimeCount}</p>
            <p className="text-xs text-muted-foreground">Excedidos</p>
          </div>
          <div className="bg-primary/10 rounded-lg p-2 text-center">
            <p className="text-lg font-bold text-primary">${totalRevenue.toFixed(0)}</p>
            <p className="text-xs text-muted-foreground">Ingresos</p>
          </div>
        </div>
      </header>

      {/* Vehicle List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {filteredVehicles.map((vehicle) => (
          <div key={vehicle.plate} className="bg-card rounded-xl border border-border overflow-hidden shadow-sm">
            <div className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "size-12 rounded-full flex items-center justify-center",
                      vehicle.status === "overtime"
                        ? "bg-destructive/10"
                        : vehicle.status === "paid"
                          ? "bg-primary/10"
                          : "bg-success/10",
                    )}
                  >
                    <Car
                      className={cn(
                        "size-6",
                        vehicle.status === "overtime"
                          ? "text-destructive"
                          : vehicle.status === "paid"
                            ? "text-primary"
                            : "text-success",
                      )}
                    />
                  </div>
                  <div>
                    <p className="font-bold text-lg text-foreground">{vehicle.plate}</p>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="size-3" />
                      <span>Espacio {vehicle.space}</span>
                    </div>
                  </div>
                </div>
                <span className={cn("px-2.5 py-1 rounded-full text-xs font-medium", statusColors[vehicle.status])}>
                  {statusLabels[vehicle.status]}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 mb-3">
                <div className="bg-secondary rounded-lg p-2">
                  <div className="flex items-center gap-1 text-muted-foreground mb-0.5">
                    <Clock className="size-3" />
                    <span className="text-[10px]">Entrada</span>
                  </div>
                  <p className="text-sm font-medium text-foreground">{vehicle.entryTime}</p>
                </div>
                <div className="bg-secondary rounded-lg p-2">
                  <div className="flex items-center gap-1 text-muted-foreground mb-0.5">
                    <History className="size-3" />
                    <span className="text-[10px]">Duración</span>
                  </div>
                  <p className="text-sm font-medium text-foreground">{vehicle.duration}</p>
                </div>
                <div className="bg-secondary rounded-lg p-2">
                  <div className="flex items-center gap-1 text-muted-foreground mb-0.5">
                    <DollarSign className="size-3" />
                    <span className="text-[10px]">Tarifa</span>
                  </div>
                  <p className="text-sm font-medium text-foreground">${vehicle.accumulatedFee.toFixed(2)}</p>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 bg-transparent"
                  onClick={() => onVehicleSelect(vehicle.plate)}
                >
                  Detalles
                  <ChevronRight className="size-4 ml-1" />
                </Button>
                {vehicle.status !== "paid" && (
                  <Button
                    size="sm"
                    className="flex-1 bg-success hover:bg-success/90 text-success-foreground"
                    onClick={onPayment}
                  >
                    <DollarSign className="size-4 mr-1" />
                    Cobrar
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
