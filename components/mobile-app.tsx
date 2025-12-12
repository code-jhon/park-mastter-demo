"use client"

import { useState } from "react"
import { HomeScreen } from "./screens/home-screen"
import { NotificationsScreen } from "./screens/notifications-screen"
import { ViolationsScreen } from "./screens/violations-screen"
import { VehicleScreen } from "./screens/vehicle-screen"
import { PaymentsScreen } from "./screens/payments-screen"
import { DashboardScreen } from "./screens/dashboard-screen"
import { BottomNavigation } from "./navigation/bottom-navigation"
import { FilterSheet } from "./sheets/filter-sheet"
import { QrScannerSheet } from "./sheets/qr-scanner-sheet"
import { VehicleDetailSheet } from "./sheets/vehicle-detail-sheet"
import { PaymentSheet } from "./sheets/payment-sheet"

export type Screen = "home" | "notifications" | "violations" | "vehicle" | "payments" | "dashboard"

export function MobileApp() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("home")
  const [filterOpen, setFilterOpen] = useState(false)
  const [qrScannerOpen, setQrScannerOpen] = useState(false)
  const [vehicleDetailOpen, setVehicleDetailOpen] = useState(false)
  const [paymentOpen, setPaymentOpen] = useState(false)
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null)

  const handleVehicleSelect = (plate: string) => {
    setSelectedVehicle(plate)
    setVehicleDetailOpen(true)
  }

  const renderScreen = () => {
    switch (currentScreen) {
      case "home":
        return (
          <HomeScreen
            onFilterOpen={() => setFilterOpen(true)}
            onQrScan={() => setQrScannerOpen(true)}
            onVehicleSelect={handleVehicleSelect}
          />
        )
      case "notifications":
        return <NotificationsScreen />
      case "violations":
        return <ViolationsScreen onVehicleSelect={handleVehicleSelect} />
      case "vehicle":
        return <VehicleScreen onVehicleSelect={handleVehicleSelect} onPayment={() => setPaymentOpen(true)} />
      case "payments":
        return <PaymentsScreen onPayment={() => setPaymentOpen(true)} />
      case "dashboard":
        return <DashboardScreen />
      default:
        return (
          <HomeScreen
            onFilterOpen={() => setFilterOpen(true)}
            onQrScan={() => setQrScannerOpen(true)}
            onVehicleSelect={handleVehicleSelect}
          />
        )
    }
  }

  return (
    <div className="flex flex-col h-dvh bg-background overflow-hidden">
      <main className="flex-1 overflow-hidden">{renderScreen()}</main>

      <BottomNavigation currentScreen={currentScreen} onScreenChange={setCurrentScreen} />

      <FilterSheet open={filterOpen} onOpenChange={setFilterOpen} />
      <QrScannerSheet open={qrScannerOpen} onOpenChange={setQrScannerOpen} />
      <VehicleDetailSheet
        open={vehicleDetailOpen}
        onOpenChange={setVehicleDetailOpen}
        plate={selectedVehicle}
        onPayment={() => {
          setVehicleDetailOpen(false)
          setPaymentOpen(true)
        }}
      />
      <PaymentSheet open={paymentOpen} onOpenChange={setPaymentOpen} />
    </div>
  )
}
