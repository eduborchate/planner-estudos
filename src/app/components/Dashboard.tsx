"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { 
  Calendar, 
  Clock, 
  BookOpen,
  Plus,
  Settings,
  RotateCcw,
  Edit3,
  Timer
} from "lucide-react"
import { CreatePlanDialog } from "./CreatePlanDialog"
import { DailyAgenda } from "./DailyAgenda"
import { WeeklyView } from "./WeeklyView"
import { StudyTimer } from "./StudyTimer"
import { ProgressBars } from "./ProgressBars"
import { NotesPanel } from "./NotesPanel"
import { FeedbackPanel } from "./FeedbackPanel"

export function Dashboard() {
  const [showCreatePlan, setShowCreatePlan] = useState(false)
  const [currentView, setCurrentView] = useState<"home" | "daily" | "weekly" | "timer">("home")
  const [hasPlan, setHasPlan] = useState(false)

  // Dados de progresso (em produção, viriam de um estado global ou API)
  const weekProgress = 57 // 57% da semana concluída
  const courseProgress = 42 // 42% do curso concluído
  const weekHoursCompleted = 17
  const weekHoursTotal = 30
  const courseHoursCompleted = 342
  const courseHoursTotal = 814

  if (!hasPlan) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-8 space-y-6 text-center">
          <div className="flex justify-center">
            <div className="w-16 h-16 rounded-xl bg-slate-900 flex items-center justify-center">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
          </div>
          
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-slate-900">
              Master Study Planner
            </h2>
            <p className="text-slate-600">
              Aprenda com acompanhamento real de rendimento
            </p>
          </div>

          <Button 
            onClick={() => setShowCreatePlan(true)}
            size="lg"
            className="w-full h-12 bg-slate-900 hover:bg-slate-800"
          >
            <Plus className="mr-2 w-5 h-5" />
            Criar Plano
          </Button>

          <CreatePlanDialog 
            open={showCreatePlan} 
            onOpenChange={setShowCreatePlan}
            onComplete={() => {
              setHasPlan(true)
              setShowCreatePlan(false)
            }}
          />
        </Card>
      </div>
    )
  }

  if (currentView === "daily") {
    return <DailyAgenda onBack={() => setCurrentView("home")} />
  }

  if (currentView === "weekly") {
    return <WeeklyView onBack={() => setCurrentView("home")} />
  }

  if (currentView === "timer") {
    return <StudyTimer onBack={() => setCurrentView("home")} />
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-slate-900">
            Master Study Planner
          </h1>
          <div className="flex items-center gap-2">
            <Button 
              onClick={() => setShowCreatePlan(true)}
              variant="ghost" 
              size="sm"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Refazer Plano
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 py-6 space-y-6">
        {/* Progress Bars - DESTAQUE NO TOPO */}
        <ProgressBars
          weekProgress={weekProgress}
          courseProgress={courseProgress}
          weekHoursCompleted={weekHoursCompleted}
          weekHoursTotal={weekHoursTotal}
          courseHoursCompleted={courseHoursCompleted}
          courseHoursTotal={courseHoursTotal}
        />

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Button 
            onClick={() => setCurrentView("daily")}
            variant="outline" 
            className="h-24 flex-col gap-2 bg-white hover:bg-slate-50"
          >
            <Calendar className="w-6 h-6 text-slate-700" />
            <span className="text-sm font-medium">Hoje</span>
          </Button>

          <Button 
            onClick={() => setCurrentView("weekly")}
            variant="outline" 
            className="h-24 flex-col gap-2 bg-white hover:bg-slate-50"
          >
            <BookOpen className="w-6 h-6 text-slate-700" />
            <span className="text-sm font-medium">Semana</span>
          </Button>

          <Button 
            onClick={() => setCurrentView("timer")}
            variant="outline" 
            className="h-24 flex-col gap-2 bg-white hover:bg-slate-50"
          >
            <Timer className="w-6 h-6 text-slate-700" />
            <span className="text-sm font-medium">Cronômetro</span>
          </Button>

          <Button 
            onClick={() => setShowCreatePlan(true)}
            variant="outline" 
            className="h-24 flex-col gap-2 bg-white hover:bg-slate-50"
          >
            <Edit3 className="w-6 h-6 text-slate-700" />
            <span className="text-sm font-medium">Editar</span>
          </Button>
        </div>

        {/* Today Summary */}
        <Card className="p-6 bg-white">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-slate-900">Hoje - Segunda, 15/01</h2>
            <span className="text-sm text-slate-600">6h programadas</span>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-slate-600" />
                <div>
                  <div className="font-medium text-slate-900">08:00 - 10:00</div>
                  <div className="text-sm text-slate-600">Português - Interpretação</div>
                </div>
              </div>
              <Button size="sm" className="bg-slate-900 hover:bg-slate-800">
                Iniciar
              </Button>
            </div>

            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-slate-600" />
                <div>
                  <div className="font-medium text-slate-900">10:15 - 12:00</div>
                  <div className="text-sm text-slate-600">Matemática - Equações</div>
                </div>
              </div>
              <Button size="sm" variant="outline">
                Aguardando
              </Button>
            </div>

            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-slate-600" />
                <div>
                  <div className="font-medium text-slate-900">14:00 - 16:00</div>
                  <div className="text-sm text-slate-600">Direito - Princípios</div>
                </div>
              </div>
              <Button size="sm" variant="outline">
                Aguardando
              </Button>
            </div>
          </div>

          <Button 
            onClick={() => setCurrentView("daily")}
            variant="ghost" 
            className="w-full mt-4"
          >
            Ver agenda completa
          </Button>
        </Card>

        {/* Week Overview */}
        <Card className="p-6 bg-white">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-slate-900">Esta Semana</h2>
            <Button 
              onClick={() => setCurrentView("weekly")}
              variant="ghost" 
              size="sm"
            >
              Ver detalhes
            </Button>
          </div>
          
          <div className="grid grid-cols-7 gap-2">
            {[
              { day: "Seg", status: "completed" },
              { day: "Ter", status: "completed" },
              { day: "Qua", status: "current" },
              { day: "Qui", status: "pending" },
              { day: "Sex", status: "pending" },
              { day: "Sáb", status: "pending" },
              { day: "Dom", status: "rest" }
            ].map((item, index) => (
              <div 
                key={index}
                className={`text-center p-3 rounded-lg ${
                  item.status === "completed" ? "bg-green-100 text-green-700" :
                  item.status === "current" ? "bg-blue-100 text-blue-700" :
                  item.status === "rest" ? "bg-slate-100 text-slate-400" :
                  "bg-slate-50 text-slate-600"
                }`}
              >
                <div className="text-xs font-medium mb-1">{item.day}</div>
                <div className="text-lg font-bold">
                  {item.status === "completed" ? "✓" : 
                   item.status === "current" ? "•" : 
                   item.status === "rest" ? "-" : ""}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Notes Panel */}
        <NotesPanel />

        {/* Feedback Panel */}
        <FeedbackPanel />
      </main>

      <CreatePlanDialog 
        open={showCreatePlan} 
        onOpenChange={setShowCreatePlan}
        onComplete={() => setShowCreatePlan(false)}
      />
    </div>
  )
}
