"use client"

import { useState } from "react"
import { X, CreditCard, Check, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface PaymentSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

type PaymentMethod = "card" | "apple" | "google" | "paypal"

const paymentMethods: { id: PaymentMethod; label: string; icon: string }[] = [
  { id: "apple", label: "Apple Pay", icon: "🍎" },
  { id: "google", label: "Google Pay", icon: "🤖" },
  { id: "card", label: "Tarjeta", icon: "💳" },
  { id: "paypal", label: "PayPal", icon: "💰" },
]

export function PaymentSheet({ open, onOpenChange }: PaymentSheetProps) {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>("card")
  const [processing, setProcessing] = useState(false)
  const [completed, setCompleted] = useState(false)

  const amount = 18.75
  const plate = "ABC-123"

  const handlePayment = () => {
    setProcessing(true)
    setTimeout(() => {
      setProcessing(false)
      setCompleted(true)
      setTimeout(() => {
        setCompleted(false)
        onOpenChange(false)
      }, 2000)
    }, 1500)
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-foreground/20 backdrop-blur-sm"
        onClick={() => !processing && onOpenChange(false)}
      />
      <div className="absolute bottom-0 left-0 right-0 bg-card rounded-t-3xl max-h-[90vh] overflow-y-auto safe-area-inset-bottom animate-in slide-in-from-bottom duration-300">
        {completed ? (
          <div className="p-8 flex flex-col items-center justify-center min-h-[400px]">
            <div className="size-20 bg-success rounded-full flex items-center justify-center mb-4 animate-in zoom-in duration-300">
              <Check className="size-10 text-success-foreground" />
            </div>
            <h2 className="text-xl font-bold text-foreground mb-2">¡Pago exitoso!</h2>
            <p className="text-muted-foreground text-center">
              El pago de ${amount.toFixed(2)} ha sido procesado correctamente.
            </p>
          </div>
        ) : (
          <div className="p-4">
            {/* Handle */}
            <div className="w-10 h-1 bg-border rounded-full mx-auto mb-4" />

            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-foreground">Checkout</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onOpenChange(false)}
                className="size-8"
                disabled={processing}
              >
                <X className="size-5" />
              </Button>
            </div>

            {/* Amount Summary */}
            <div className="bg-secondary rounded-xl p-4 mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-muted-foreground">Vehículo</span>
                <span className="font-semibold text-foreground">{plate}</span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-muted-foreground">Tiempo</span>
                <span className="text-foreground">3h 45m</span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-border">
                <span className="font-semibold text-foreground">Total a pagar</span>
                <span className="text-2xl font-bold text-success">${amount.toFixed(2)}</span>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-foreground mb-3">Método de pago</h3>
              <div className="grid grid-cols-2 gap-2">
                {paymentMethods.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setSelectedMethod(method.id)}
                    disabled={processing}
                    className={cn(
                      "flex items-center gap-3 p-3 rounded-xl border-2 transition-colors touch-manipulation",
                      selectedMethod === method.id ? "border-primary bg-primary/5" : "border-border bg-card",
                    )}
                  >
                    <span className="text-2xl">{method.icon}</span>
                    <span className="text-sm font-medium text-foreground">{method.label}</span>
                    {selectedMethod === method.id && <Check className="size-4 text-primary ml-auto" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Card Form (when card is selected) */}
            {selectedMethod === "card" && (
              <div className="space-y-3 mb-6">
                <div>
                  <label className="text-sm text-muted-foreground mb-1.5 block">Número de tarjeta</label>
                  <div className="relative">
                    <Input placeholder="4242 4242 4242 4242" className="pr-10" disabled={processing} />
                    <CreditCard className="absolute right-3 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm text-muted-foreground mb-1.5 block">Fecha de expiración</label>
                    <Input placeholder="MM/AA" disabled={processing} />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground mb-1.5 block">CVC</label>
                    <Input placeholder="123" disabled={processing} />
                  </div>
                </div>
              </div>
            )}

            {/* Pay Button */}
            <Button
              onClick={handlePayment}
              disabled={processing}
              className="w-full h-14 text-lg font-semibold bg-success hover:bg-success/90 text-success-foreground"
              size="lg"
            >
              {processing ? (
                <div className="flex items-center gap-2">
                  <div className="size-5 border-2 border-success-foreground/30 border-t-success-foreground rounded-full animate-spin" />
                  Procesando...
                </div>
              ) : (
                <>
                  <Lock className="size-5 mr-2" />
                  Pagar ${amount.toFixed(2)}
                </>
              )}
            </Button>

            {/* Security Badge */}
            <div className="flex items-center justify-center gap-2 mt-4 text-xs text-muted-foreground">
              <Lock className="size-3" />
              <span>Pago seguro con encriptación SSL</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
