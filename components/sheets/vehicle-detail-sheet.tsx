"use client"

import { X, Car, Clock, MapPin, DollarSign, History, Plus, LogOut, Receipt } from "lucide-react"
import { Button } from "@/components/ui/button"

interface VehicleDetailSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  plate: string | null
  onPayment: () => void
}

const mockVehicleDetails = {
  plate: "ABC-123",
  space: "A2",
  entryTime: "10:30 AM",
  duration: "3h 45m",
  accumulatedFee: 18.75,
  ratePerHour: 5.0,
  history: [
    { date: "2 Dic 2025", duration: "2h 30m", amount: 12.5 },
    { date: "28 Nov 2025", duration: "4h 00m", amount: 20.0 },
    { date: "25 Nov 2025", duration: "1h 15m", amount: 6.25 },
  ],
}

export function VehicleDetailSheet({ open, onOpenChange, plate, onPayment }: VehicleDetailSheetProps) {
  if (!open || !plate) return null

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-foreground/20 backdrop-blur-sm" onClick={() => onOpenChange(false)} />
      <div className="absolute bottom-0 left-0 right-0 bg-card rounded-t-3xl max-h-[90vh] overflow-y-auto safe-area-inset-bottom animate-in slide-in-from-bottom duration-300">
        <div className="p-4">
          {/* Handle */}
          <div className="w-10 h-1 bg-border rounded-full mx-auto mb-4" />

          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="size-14 bg-primary/10 rounded-full flex items-center justify-center">
                <Car className="size-7 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground">{mockVehicleDetails.plate}</h2>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <MapPin className="size-3" />
                  Espacio {mockVehicleDetails.space}
                </p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={() => onOpenChange(false)} className="size-8">
              <X className="size-5" />
            </Button>
          </div>

          {/* Current Session */}
          <div className="bg-secondary rounded-xl p-4 mb-4">
            <h3 className="text-sm font-semibold text-foreground mb-3">Sesión actual</h3>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <div className="flex items-center gap-1 text-muted-foreground mb-1">
                  <Clock className="size-3.5" />
                  <span className="text-xs">Entrada</span>
                </div>
                <p className="font-semibold text-foreground">{mockVehicleDetails.entryTime}</p>
              </div>
              <div>
                <div className="flex items-center gap-1 text-muted-foreground mb-1">
                  <History className="size-3.5" />
                  <span className="text-xs">Duración</span>
                </div>
                <p className="font-semibold text-foreground">{mockVehicleDetails.duration}</p>
              </div>
              <div>
                <div className="flex items-center gap-1 text-muted-foreground mb-1">
                  <DollarSign className="size-3.5" />
                  <span className="text-xs">Acumulado</span>
                </div>
                <p className="font-semibold text-success">${mockVehicleDetails.accumulatedFee.toFixed(2)}</p>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-border">
              <p className="text-xs text-muted-foreground">Tarifa: ${mockVehicleDetails.ratePerHour.toFixed(2)}/hora</p>
            </div>
          </div>

          {/* Actions */}
          <div className="grid grid-cols-3 gap-2 mb-6">
            <Button variant="outline" className="flex flex-col h-auto py-3 gap-1 bg-transparent">
              <LogOut className="size-5" />
              <span className="text-xs">Registrar salida</span>
            </Button>
            <Button variant="outline" className="flex flex-col h-auto py-3 gap-1 bg-transparent">
              <Plus className="size-5" />
              <span className="text-xs">Extender tiempo</span>
            </Button>
            <Button
              className="flex flex-col h-auto py-3 gap-1 bg-success hover:bg-success/90 text-success-foreground"
              onClick={onPayment}
            >
              <Receipt className="size-5" />
              <span className="text-xs">Generar pago</span>
            </Button>
          </div>

          {/* History */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">Historial de visitas</h3>
            <div className="space-y-2">
              {mockVehicleDetails.history.map((visit, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-secondary rounded-xl">
                  <div>
                    <p className="font-medium text-foreground">{visit.date}</p>
                    <p className="text-xs text-muted-foreground">{visit.duration}</p>
                  </div>
                  <p className="font-semibold text-foreground">${visit.amount.toFixed(2)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
