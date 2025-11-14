"use client"

import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { TrendingUp } from "lucide-react"

interface ProgressBarsProps {
  weekProgress: number
  courseProgress: number
  weekHoursCompleted: number
  weekHoursTotal: number
  courseHoursCompleted: number
  courseHoursTotal: number
}

export function ProgressBars({
  weekProgress,
  courseProgress,
  weekHoursCompleted,
  weekHoursTotal,
  courseHoursCompleted,
  courseHoursTotal
}: ProgressBarsProps) {
  return (
    <Card className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
      <div className="space-y-4">
        {/* Weekly Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-slate-700">📅 Progresso da Semana</span>
            </div>
            <span className="text-sm font-bold text-purple-600">
              {weekHoursCompleted}h / {weekHoursTotal}h
            </span>
          </div>
          <div className="relative">
            <Progress value={weekProgress} className="h-3 bg-white/50" />
            <span className="absolute right-2 top-0 text-xs font-bold text-purple-700">
              {weekProgress}%
            </span>
          </div>
        </div>

        {/* Course Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-slate-700">🎯 Progresso do Curso</span>
              <TrendingUp className="w-4 h-4 text-green-600" />
            </div>
            <span className="text-sm font-bold text-blue-600">
              {courseHoursCompleted}h / {courseHoursTotal}h
            </span>
          </div>
          <div className="relative">
            <Progress value={courseProgress} className="h-3 bg-white/50" />
            <span className="absolute right-2 top-0 text-xs font-bold text-blue-700">
              {courseProgress}%
            </span>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="flex items-center justify-between pt-2 border-t border-purple-200">
          <span className="text-xs text-slate-600">
            {courseProgress >= 75 ? "🔥 Excelente ritmo!" : courseProgress >= 50 ? "💪 Continue assim!" : "📚 Foco nos estudos!"}
          </span>
          <span className="text-xs font-medium text-slate-700">
            {Math.round(100 - courseProgress)}% restante
          </span>
        </div>
      </div>
    </Card>
  )
}
