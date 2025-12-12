"use client"

import type React from "react"

import { cn } from "@/lib/utils"
import type { Screen } from "../mobile-app"
import { Map, Bell, AlertTriangle, Car, CreditCard, LayoutDashboard } from "lucide-react"

interface BottomNavigationProps {
  currentScreen: Screen
  onScreenChange: (screen: Screen) => void
}

const navItems: { screen: Screen; label: string; icon: React.ElementType }[] = [
  { screen: "home", label: "Mapa", icon: Map },
  { screen: "notifications", label: "Alertas", icon: Bell },
  { screen: "violations", label: "Multas", icon: AlertTriangle },
  { screen: "vehicle", label: "Vehículos", icon: Car },
  { screen: "payments", label: "Pagos", icon: CreditCard },
  { screen: "dashboard", label: "Panel", icon: LayoutDashboard },
]

export function BottomNavigation({ currentScreen, onScreenChange }: BottomNavigationProps) {
  return (
    <nav className="bg-card border-t border-border safe-area-inset-bottom">
      <div className="flex items-center justify-around h-16">
        {navItems.map(({ screen, label, icon: Icon }) => {
          const isActive = currentScreen === screen
          return (
            <button
              key={screen}
              onClick={() => onScreenChange(screen)}
              className={cn(
                "flex flex-col items-center justify-center gap-0.5 flex-1 h-full touch-manipulation transition-colors duration-200",
                isActive ? "text-primary" : "text-muted-foreground",
              )}
            >
              <Icon className={cn("size-5 transition-transform duration-200", isActive && "scale-110")} />
              <span className="text-[10px] font-medium">{label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
