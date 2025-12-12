"use client"

import { useState } from "react"
import { X, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface FilterSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const spotTypes = [
  { id: "available", label: "Disponibles", color: "bg-success" },
  { id: "occupied", label: "Ocupados", color: "bg-destructive" },
  { id: "reserved", label: "Reservados", color: "bg-chart-5" },
  { id: "electric", label: "Eléctricos", color: "bg-electric" },
  { id: "disabled", label: "Discapacitados", color: "bg-primary" },
]

const zones = ["A", "B", "C", "D"]

export function FilterSheet({ open, onOpenChange }: FilterSheetProps) {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([
    "available",
    "occupied",
    "reserved",
    "electric",
    "disabled",
  ])
  const [selectedZones, setSelectedZones] = useState<string[]>(["A", "B", "C", "D"])

  const toggleType = (id: string) => {
    setSelectedTypes((prev) => (prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]))
  }

  const toggleZone = (zone: string) => {
    setSelectedZones((prev) => (prev.includes(zone) ? prev.filter((z) => z !== zone) : [...prev, zone]))
  }

  const resetFilters = () => {
    setSelectedTypes(["available", "occupied", "reserved", "electric", "disabled"])
    setSelectedZones(["A", "B", "C", "D"])
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-foreground/20 backdrop-blur-sm" onClick={() => onOpenChange(false)} />
      <div className="absolute bottom-0 left-0 right-0 bg-card rounded-t-3xl safe-area-inset-bottom animate-in slide-in-from-bottom duration-300">
        <div className="p-4">
          {/* Handle */}
          <div className="w-10 h-1 bg-border rounded-full mx-auto mb-4" />

          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-foreground">Filtros</h2>
            <Button variant="ghost" size="icon" onClick={() => onOpenChange(false)} className="size-8">
              <X className="size-5" />
            </Button>
          </div>

          {/* Spot Types */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-foreground mb-3">Tipo de espacio</h3>
            <div className="flex flex-wrap gap-2">
              {spotTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => toggleType(type.id)}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-xl border transition-colors touch-manipulation",
                    selectedTypes.includes(type.id) ? "border-primary bg-primary/10" : "border-border bg-secondary",
                  )}
                >
                  <div className={cn("size-3 rounded", type.color)} />
                  <span className="text-sm text-foreground">{type.label}</span>
                  {selectedTypes.includes(type.id) && <Check className="size-4 text-primary" />}
                </button>
              ))}
            </div>
          </div>

          {/* Zones */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-foreground mb-3">Zonas</h3>
            <div className="flex gap-2">
              {zones.map((zone) => (
                <button
                  key={zone}
                  onClick={() => toggleZone(zone)}
                  className={cn(
                    "size-12 rounded-xl font-bold transition-colors touch-manipulation",
                    selectedZones.includes(zone)
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground",
                  )}
                >
                  {zone}
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1 bg-transparent" onClick={resetFilters}>
              Restablecer
            </Button>
            <Button className="flex-1" onClick={() => onOpenChange(false)}>
              Aplicar filtros
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
