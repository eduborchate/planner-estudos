"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Clock, CheckCircle2, Play } from "lucide-react"

interface DailyAgendaProps {
  onBack: () => void
}

export function DailyAgenda({ onBack }: DailyAgendaProps) {
  const sessions = [
    {
      id: 1,
      time: "08:00 - 10:00",
      duration: "2h",
      subject: "Português",
      topic: "Interpretação de Textos",
      completed: false
    },
    {
      id: 2,
      time: "10:15 - 12:00",
      duration: "1h45",
      subject: "Matemática",
      topic: "Equações do 2º Grau",
      completed: false
    },
    {
      id: 3,
      time: "14:00 - 16:00",
      duration: "2h",
      subject: "Direito Constitucional",
      topic: "Princípios Fundamentais",
      completed: false
    },
    {
      id: 4,
      time: "16:15 - 17:00",
      duration: "45min",
      subject: "Revisão",
      topic: "Português - Semana 2",
      completed: false
    }
  ]

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
              <h1 className="text-xl font-bold text-slate-900">Segunda, 15 de Janeiro</h1>
              <p className="text-sm text-slate-600">6h programadas</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-6 space-y-4">
        {sessions.map((session) => (
          <SessionCard key={session.id} session={session} />
        ))}
      </main>
    </div>
  )
}

function SessionCard({ session }: { session: any }) {
  const [completed, setCompleted] = useState(session.completed)

  return (
    <Card className={`p-6 ${completed ? "bg-green-50 border-green-200" : "bg-white"}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-4 h-4 text-slate-600" />
            <span className="text-sm font-medium text-slate-600">
              {session.time} ({session.duration})
            </span>
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-1">{session.subject}</h3>
          <p className="text-sm text-slate-600">{session.topic}</p>
        </div>

        <div className="flex gap-2">
          {!completed ? (
            <>
              <Button 
                size="sm" 
                className="bg-slate-900 hover:bg-slate-800"
              >
                <Play className="w-4 h-4 mr-2" />
                Iniciar
              </Button>
              <Button 
                onClick={() => setCompleted(true)}
                size="sm" 
                variant="outline"
              >
                <CheckCircle2 className="w-4 h-4" />
              </Button>
            </>
          ) : (
            <div className="flex items-center gap-2 text-green-600">
              <CheckCircle2 className="w-5 h-5" />
              <span className="font-medium">Concluído</span>
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}
