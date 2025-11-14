"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Play, Pause, RotateCcw, Save } from "lucide-react"

interface StudyTimerProps {
  onBack: () => void
}

interface SubjectTime {
  subject: string
  time: number
}

export function StudyTimer({ onBack }: StudyTimerProps) {
  const [time, setTime] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [selectedSubject, setSelectedSubject] = useState("")
  const [savedTimes, setSavedTimes] = useState<SubjectTime[]>([])

  const subjects = [
    "Português",
    "Matemática",
    "Direito Constitucional",
    "Direito Administrativo",
    "Informática",
    "Raciocínio Lógico",
    "Outro"
  ]

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1)
      }, 1000)
    } else if (interval) {
      clearInterval(interval)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isRunning])

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const handleSave = () => {
    if (!selectedSubject || time === 0) return

    const existingIndex = savedTimes.findIndex(st => st.subject === selectedSubject)
    
    if (existingIndex >= 0) {
      const updated = [...savedTimes]
      updated[existingIndex].time += time
      setSavedTimes(updated)
    } else {
      setSavedTimes([...savedTimes, { subject: selectedSubject, time }])
    }

    setTime(0)
    setIsRunning(false)
    setSelectedSubject("")
  }

  const handleReset = () => {
    setTime(0)
    setIsRunning(false)
  }

  const getTotalTime = () => {
    return savedTimes.reduce((acc, st) => acc + st.time, 0)
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Button onClick={onBack} variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-xl font-bold text-slate-900">Cronômetro de Estudos</h1>
              <p className="text-sm text-slate-600">Registre suas horas líquidas</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Timer Display */}
        <Card className="p-8 bg-white text-center">
          <div className="text-6xl font-mono font-bold text-slate-900 mb-6">
            {formatTime(time)}
          </div>

          {/* Subject Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Matéria
            </label>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="w-full p-3 border border-slate-300 rounded-lg text-slate-900 bg-white"
              disabled={isRunning}
            >
              <option value="">Selecione uma matéria</option>
              {subjects.map((subject) => (
                <option key={subject} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
          </div>

          {/* Controls */}
          <div className="flex gap-3 justify-center">
            <Button
              onClick={() => setIsRunning(!isRunning)}
              size="lg"
              className="bg-slate-900 hover:bg-slate-800"
              disabled={!selectedSubject}
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

            <Button
              onClick={handleReset}
              size="lg"
              variant="outline"
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              Zerar
            </Button>

            <Button
              onClick={handleSave}
              size="lg"
              variant="outline"
              disabled={time === 0 || !selectedSubject}
            >
              <Save className="w-5 h-5 mr-2" />
              Salvar
            </Button>
          </div>
        </Card>

        {/* Today's Summary */}
        <Card className="p-6 bg-white">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-slate-900">Hoje</h2>
            <div className="text-2xl font-bold text-slate-900">
              {formatTime(getTotalTime())}
            </div>
          </div>

          {savedTimes.length === 0 ? (
            <p className="text-center text-slate-500 py-8">
              Nenhum tempo registrado ainda
            </p>
          ) : (
            <div className="space-y-3">
              {savedTimes.map((st, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"
                >
                  <span className="font-medium text-slate-900">{st.subject}</span>
                  <span className="text-slate-600 font-mono">
                    {formatTime(st.time)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Instructions */}
        <Card className="p-6 bg-slate-100">
          <h3 className="font-semibold text-slate-900 mb-3">Como usar</h3>
          <ul className="space-y-2 text-sm text-slate-700">
            <li>• Selecione a matéria que vai estudar</li>
            <li>• Clique em "Iniciar" para começar a cronometrar</li>
            <li>• Pause quando fizer intervalos</li>
            <li>• Clique em "Salvar" para registrar o tempo estudado</li>
            <li>• O tempo é acumulado por matéria automaticamente</li>
          </ul>
        </Card>
      </main>
    </div>
  )
}
