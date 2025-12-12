"use client"

import { useState } from "react"
import { X, QrCode, Camera, Flashlight, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface QrScannerSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function QrScannerSheet({ open, onOpenChange }: QrScannerSheetProps) {
  const [mode, setMode] = useState<"entry" | "exit">("entry")
  const [flashOn, setFlashOn] = useState(false)
  const [scanned, setScanned] = useState(false)

  const handleScan = () => {
    setScanned(true)
    setTimeout(() => {
      setScanned(false)
      onOpenChange(false)
    }, 2000)
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 bg-background">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-10 p-4 safe-area-inset-top">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onOpenChange(false)}
            className="size-10 bg-foreground/10 backdrop-blur-sm rounded-full text-foreground"
          >
            <X className="size-5" />
          </Button>
          <div className="flex gap-2">
            <button
              onClick={() => setMode("entry")}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                mode === "entry"
                  ? "bg-success text-success-foreground"
                  : "bg-foreground/10 text-foreground backdrop-blur-sm",
              )}
            >
              Entrada
            </button>
            <button
              onClick={() => setMode("exit")}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                mode === "exit"
                  ? "bg-destructive text-destructive-foreground"
                  : "bg-foreground/10 text-foreground backdrop-blur-sm",
              )}
            >
              Salida
            </button>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setFlashOn(!flashOn)}
            className={cn(
              "size-10 rounded-full",
              flashOn ? "bg-warning text-warning-foreground" : "bg-foreground/10 backdrop-blur-sm text-foreground",
            )}
          >
            <Flashlight className="size-5" />
          </Button>
        </div>
      </header>

      {/* Scanner View */}
      <div className="h-full flex flex-col items-center justify-center bg-muted">
        {scanned ? (
          <div className="flex flex-col items-center gap-4 animate-in zoom-in duration-300">
            <div className="size-24 bg-success rounded-full flex items-center justify-center">
              <CheckCircle2 className="size-12 text-success-foreground" />
            </div>
            <p className="text-xl font-bold text-foreground">
              {mode === "entry" ? "Entrada registrada" : "Salida registrada"}
            </p>
            <p className="text-muted-foreground">Placa: ABC-123</p>
          </div>
        ) : (
          <>
            {/* Scanner Frame */}
            <div className="relative w-64 h-64 mb-8">
              {/* Corner decorations */}
              <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-primary rounded-tl-2xl" />
              <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-primary rounded-tr-2xl" />
              <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-primary rounded-bl-2xl" />
              <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-primary rounded-br-2xl" />

              {/* Scanning line animation */}
              <div className="absolute inset-4 overflow-hidden">
                <div
                  className="h-0.5 bg-primary/50 animate-pulse"
                  style={{
                    animation: "scan 2s ease-in-out infinite",
                  }}
                />
              </div>

              {/* QR placeholder */}
              <div className="absolute inset-8 flex items-center justify-center">
                <QrCode className="size-24 text-muted-foreground/30" />
              </div>
            </div>

            <p className="text-foreground font-medium mb-2">Escanea el código QR</p>
            <p className="text-sm text-muted-foreground text-center px-8">
              Posiciona el código QR dentro del marco para registrar {mode === "entry" ? "la entrada" : "la salida"}
            </p>

            {/* Demo scan button */}
            <Button onClick={handleScan} className="mt-8" size="lg">
              <Camera className="size-5 mr-2" />
              Simular escaneo
            </Button>
          </>
        )}
      </div>

      <style jsx>{`
        @keyframes scan {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(200px); }
        }
      `}</style>
    </div>
  )
}
