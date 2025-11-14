"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, TrendingUp, Calendar, Clock, Target } from "lucide-react"

interface ProgressViewProps {
  onBack: () => void
}

export function ProgressView({ onBack }: ProgressViewProps) {
  const subjects = [
    { name: "Português", progress: 85, icon: "📘", color: "purple" },
    { name: "Matemática", progress: 45, icon: "🔢", color: "blue" },
    { name: "Direito", progress: 23, icon: "⚖️", color: "green" },
    { name: "Atualidades", progress: 67, icon: "🌍", color: "cyan" },
    { name: "Informática", progress: 89, icon: "💻", color: "pink" }
  ]

  const weeklyProgress = [
    { week: "Sem 1", progress: 100 },
    { week: "Sem 2", progress: 100 },
    { week: "Sem 3", progress: 57 },
    { week: "Sem 4", progress: 0 },
    { week: "Sem 5", progress: 0 }
  ]

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Button onClick={onBack} variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-xl font-bold text-gray-900">📊 Progresso Geral</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Overall Progress */}
        <Card className="p-6 bg-gradient-to-br from-purple-500 to-blue-500 text-white">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Target className="w-6 h-6" />
              <h2 className="text-2xl font-bold">Progresso Total</h2>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-end gap-2">
                <div className="text-6xl font-bold">42%</div>
                <div className="text-xl opacity-90 mb-2">concluído</div>
              </div>
              <Progress value={42} className="h-3 bg-white/30" />
              <div className="text-sm opacity-90">
                156 de 370 tópicos concluídos
              </div>
            </div>
          </div>
        </Card>

        {/* Time Info */}
        <Card className="p-6 space-y-4">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-purple-600" />
            Tempo Restante
          </h2>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="text-sm text-gray-600">Data da Prova</div>
              <div className="text-xl font-bold text-gray-900">15/12/2024</div>
            </div>
            <div className="space-y-1">
              <div className="text-sm text-gray-600">Faltam</div>
              <div className="text-xl font-bold text-purple-600">38 semanas</div>
            </div>
            <div className="space-y-1">
              <div className="text-sm text-gray-600">Previsão</div>
              <div className="text-xl font-bold text-green-600">10/12/2024 ✅</div>
            </div>
            <div className="space-y-1">
              <div className="text-sm text-gray-600">Margem</div>
              <div className="text-xl font-bold text-blue-600">5 dias</div>
            </div>
          </div>

          <div className="pt-4 border-t">
            <div className="flex items-center gap-2 text-sm text-green-600">
              <TrendingUp className="w-4 h-4" />
              <span className="font-medium">Você está no caminho certo! Continue assim.</span>
            </div>
          </div>
        </Card>

        {/* Progress by Subject */}
        <Card className="p-6 space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">📚 Progresso por Matéria</h2>
          
          <div className="space-y-4">
            {subjects.map((subject, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{subject.icon}</span>
                    <span className="font-medium text-gray-900">{subject.name}</span>
                  </div>
                  <span className="text-lg font-bold text-gray-900">{subject.progress}%</span>
                </div>
                <Progress value={subject.progress} className="h-2" />
              </div>
            ))}
          </div>
        </Card>

        {/* Weekly Progress */}
        <Card className="p-6 space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">📈 Evolução Semanal</h2>
          
          <div className="space-y-3">
            {weeklyProgress.map((week, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="w-16 text-sm font-medium text-gray-600">{week.week}</div>
                <div className="flex-1">
                  <Progress value={week.progress} className="h-3" />
                </div>
                <div className="w-16 text-right">
                  {week.progress > 0 ? (
                    <span className={`text-sm font-bold ${week.progress === 100 ? "text-green-600" : "text-blue-600"}`}>
                      {week.progress}%
                    </span>
                  ) : (
                    <span className="text-sm text-gray-400">-</span>
                  )}
                </div>
                <div className="w-8">
                  {week.progress === 100 && <span className="text-xl">✅</span>}
                  {week.progress > 0 && week.progress < 100 && <span className="text-xl">⏳</span>}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Statistics */}
        <Card className="p-6 space-y-4">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-600" />
            Estatísticas
          </h2>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-purple-50 rounded-lg">
              <div className="text-sm text-gray-600 mb-1">Total Estudado</div>
              <div className="text-3xl font-bold text-purple-600">342h</div>
            </div>
            
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="text-sm text-gray-600 mb-1">Média Diária</div>
              <div className="text-3xl font-bold text-blue-600">5.2h</div>
            </div>
            
            <div className="p-4 bg-orange-50 rounded-lg">
              <div className="text-sm text-gray-600 mb-1">Sequência Atual</div>
              <div className="text-3xl font-bold text-orange-600">7 dias</div>
            </div>
            
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="text-sm text-gray-600 mb-1">Melhor Semana</div>
              <div className="text-3xl font-bold text-green-600">32h</div>
            </div>
          </div>
        </Card>

        {/* Insights */}
        <Card className="p-6 space-y-3">
          <h2 className="text-lg font-semibold text-gray-900">💡 Insights</h2>
          
          <div className="space-y-2">
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-sm">
              <span className="font-medium text-green-900">✅ Parabéns!</span>
              <span className="text-green-700"> Você está 20% à frente em Português.</span>
            </div>
            
            <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg text-sm">
              <span className="font-medium text-orange-900">⚠️ Atenção:</span>
              <span className="text-orange-700"> Você está 15% atrás em Matemática. Sugestão: adicione 1h extra nos próximos 3 dias.</span>
            </div>
            
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm">
              <span className="font-medium text-blue-900">💡 Dica:</span>
              <span className="text-blue-700"> Você estuda melhor pela manhã. Considere realocar matérias difíceis para esse período.</span>
            </div>
          </div>
        </Card>

        {/* Action Button */}
        <Button className="w-full h-12 bg-gradient-to-r from-purple-500 to-blue-500">
          📄 Gerar Relatório Completo
        </Button>
      </main>
    </div>
  )
}
