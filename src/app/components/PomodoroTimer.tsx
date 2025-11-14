"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X, Play, Pause, RotateCcw, Volume2, VolumeX } from "lucide-react"
import { Progress } from "@/components/ui/progress"

interface PomodoroTimerProps {
  session: any
  onClose: () => void
}

export function PomodoroTimer({ session, onClose }: PomodoroTimerProps) {
  const [minutes, setMinutes] = useState(25)
  const [seconds, setSeconds] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [isBreak, setIsBreak] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(true)

  const totalSeconds = isBreak ? 5 * 60 : 25 * 60
  const currentSeconds = minutes * 60 + seconds
  const progress = ((totalSeconds - currentSeconds) / totalSeconds) * 100

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isRunning) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            // Timer finished
            setIsRunning(false)
            if (soundEnabled) {
              // Play sound (would need audio file)
              console.log("Timer finished!")
            }
            if (!isBreak) {
              setIsBreak(true)
              setMinutes(5)
            } else {
              setIsBreak(false)
              setMinutes(25)
            }
          } else {
            setMinutes(minutes - 1)
            setSeconds(59)
          }
        } else {
          setSeconds(seconds - 1)
        }
      }, 1000)
    }

    return () => clearInterval(interval)
  }, [isRunning, minutes, seconds, isBreak, soundEnabled])

  const handleReset = () => {
    setIsRunning(false)
    setMinutes(isBreak ? 5 : 25)
    setSeconds(0)
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 space-y-6 relative">
        <Button
          onClick={onClose}
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4"
        >
          <X className="w-5 h-5" />
        </Button>

        {/* Header */}
        <div className="text-center space-y-2">
          <div className="text-3xl">{session.icon}</div>
          <h2 className="text-xl font-bold text-gray-900">
            {isBreak ? "⏸️ Pausa" : "⏱️ Modo Foco"}
          </h2>
          <p className="text-sm text-gray-600">{session.subject}</p>
        </div>

        {/* Timer Display */}
        <div className="text-center space-y-4">
          <div className="text-7xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Status */}
        <div className="text-center space-y-2">
          {isRunning && (
            <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              {isBreak ? "Descanse um pouco" : "Foco total ativado"}
            </div>
          )}
          {!isRunning && !isBreak && (
            <div className="text-sm text-gray-600">
              🎯 Pronto para começar?
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-3">
          <Button
            onClick={() => setIsRunning(!isRunning)}
            size="lg"
            className="w-32 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
          >
            {isRunning ? (
              <>
                <Pause className="w-5 h-5 mr-2" />
                Pausar
              </>
            ) : (
              <>
                <Play className="w-5 h-5 mr-2" />
                Iniciar
              </>
            )}
          </Button>

          <Button onClick={handleReset} size="lg" variant="outline">
            <RotateCcw className="w-5 h-5" />
          </Button>

          <Button
            onClick={() => setSoundEnabled(!soundEnabled)}
            size="lg"
            variant="outline"
          >
            {soundEnabled ? (
              <Volume2 className="w-5 h-5" />
            ) : (
              <VolumeX className="w-5 h-5" />
            )}
          </Button>
        </div>

        {/* Info */}
        <div className="text-center text-xs text-gray-500 space-y-1">
          <p>🔕 Notificações silenciadas</p>
          <p>💡 Mantenha o foco até o fim do timer</p>
        </div>
      </Card>
    </div>
  )
}
