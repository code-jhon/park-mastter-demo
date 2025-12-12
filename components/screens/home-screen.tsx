"use client"

import type React from "react"

import { useState } from "react"
import { Search, SlidersHorizontal, QrCode, MapPin, Zap, Accessibility, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface HomeScreenProps {
  onFilterOpen: () => void
  onQrScan: () => void
  onVehicleSelect: (plate: string) => void
}

type SpotType = "available" | "occupied" | "reserved" | "electric" | "disabled"

interface ParkingSpot {
  id: string
  type: SpotType
  position: { x: number; y: number }
  plate?: string
  label: string
}

const mockSpots: ParkingSpot[] = [
  { id: "A1", type: "available", position: { x: 15, y: 25 }, label: "A1" },
  { id: "A2", type: "occupied", position: { x: 30, y: 25 }, plate: "ABC-123", label: "A2" },
  { id: "A3", type: "reserved", position: { x: 45, y: 25 }, label: "A3" },
  { id: "A4", type: "electric", position: { x: 60, y: 25 }, label: "A4" },
  { id: "A5", type: "disabled", position: { x: 75, y: 25 }, label: "A5" },
  { id: "B1", type: "occupied", position: { x: 15, y: 45 }, plate: "XYZ-789", label: "B1" },
  { id: "B2", type: "available", position: { x: 30, y: 45 }, label: "B2" },
  { id: "B3", type: "occupied", position: { x: 45, y: 45 }, plate: "DEF-456", label: "B3" },
  { id: "B4", type: "available", position: { x: 60, y: 45 }, label: "B4" },
  { id: "B5", type: "reserved", position: { x: 75, y: 45 }, label: "B5" },
  { id: "C1", type: "available", position: { x: 15, y: 65 }, label: "C1" },
  { id: "C2", type: "electric", position: { x: 30, y: 65 }, label: "C2" },
  { id: "C3", type: "occupied", position: { x: 45, y: 65 }, plate: "GHI-012", label: "C3" },
  { id: "C4", type: "available", position: { x: 60, y: 65 }, label: "C4" },
  { id: "C5", type: "occupied", position: { x: 75, y: 65 }, plate: "JKL-345", label: "C5" },
  { id: "D1", type: "disabled", position: { x: 15, y: 85 }, label: "D1" },
  { id: "D2", type: "available", position: { x: 30, y: 85 }, label: "D2" },
  { id: "D3", type: "available", position: { x: 45, y: 85 }, label: "D3" },
  { id: "D4", type: "occupied", position: { x: 60, y: 85 }, plate: "MNO-678", label: "D4" },
  { id: "D5", type: "available", position: { x: 75, y: 85 }, label: "D5" },
]

const spotColors: Record<SpotType, string> = {
  available: "bg-success",
  occupied: "bg-destructive",
  reserved: "bg-chart-5",
  electric: "bg-electric",
  disabled: "bg-primary",
}

const spotIcons: Record<SpotType, React.ElementType | null> = {
  available: null,
  occupied: Clock,
  reserved: MapPin,
  electric: Zap,
  disabled: Accessibility,
}

export function HomeScreen({ onFilterOpen, onQrScan, onVehicleSelect }: HomeScreenProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSpot, setSelectedSpot] = useState<ParkingSpot | null>(null)

  const filteredSpots = searchQuery
    ? mockSpots.filter(
        (spot) =>
          spot.plate?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          spot.id.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : mockSpots

  const handleSpotPress = (spot: ParkingSpot) => {
    setSelectedSpot(spot)
    if (spot.plate) {
      onVehicleSelect(spot.plate)
    }
  }

  return (
    <div className="relative h-full flex flex-col">
      {/* Search Bar */}
      <div className="absolute top-0 left-0 right-0 z-10 p-4 safe-area-inset-top">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
          <Input
            placeholder="Buscar por placa o espacio..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 h-12 bg-card/95 backdrop-blur-sm border-border shadow-lg rounded-xl"
          />
        </div>
      </div>

      {/* Map Container */}
      <div className="flex-1 bg-secondary relative overflow-hidden">
        {/* Grid Background */}
        <div className="absolute inset-0 opacity-30">
          <svg width="100%" height="100%" className="text-border">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Parking Spots */}
        <div className="absolute inset-0 p-4">
          {filteredSpots.map((spot) => {
            const Icon = spotIcons[spot.type]
            return (
              <button
                key={spot.id}
                onClick={() => handleSpotPress(spot)}
                className={cn(
                  "absolute w-12 h-16 rounded-lg flex flex-col items-center justify-center transition-all duration-200 touch-manipulation shadow-md",
                  spotColors[spot.type],
                  selectedSpot?.id === spot.id && "ring-2 ring-foreground ring-offset-2 scale-110",
                )}
                style={{
                  left: `${spot.position.x}%`,
                  top: `${spot.position.y}%`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                {Icon && <Icon className="size-4 text-primary-foreground mb-0.5" />}
                <span className="text-[10px] font-bold text-primary-foreground">{spot.label}</span>
                {spot.plate && (
                  <span className="text-[8px] text-primary-foreground/80 truncate max-w-full px-1">{spot.plate}</span>
                )}
              </button>
            )
          })}
        </div>

        {/* Legend */}
        <div className="absolute bottom-20 left-4 bg-card/95 backdrop-blur-sm rounded-xl p-3 shadow-lg">
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center gap-2">
              <div className="size-3 rounded bg-success" />
              <span className="text-foreground">Disponible</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="size-3 rounded bg-destructive" />
              <span className="text-foreground">Ocupado</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="size-3 rounded bg-chart-5" />
              <span className="text-foreground">Reservado</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="size-3 rounded bg-electric" />
              <span className="text-foreground">Eléctrico</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="size-3 rounded bg-primary" />
              <span className="text-foreground">Discapacitado</span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Buttons */}
      <div className="absolute bottom-20 right-4 flex flex-col gap-3">
        <Button
          size="icon"
          onClick={onFilterOpen}
          className="size-14 rounded-full shadow-lg bg-card text-foreground hover:bg-secondary"
        >
          <SlidersHorizontal className="size-6" />
        </Button>
        <Button
          size="icon"
          onClick={onQrScan}
          className="size-14 rounded-full shadow-lg bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <QrCode className="size-6" />
        </Button>
      </div>
    </div>
  )
}
