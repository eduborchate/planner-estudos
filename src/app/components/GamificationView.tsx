"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Trophy, Star, Flame, Target, Lock } from "lucide-react"

interface GamificationViewProps {
  onBack: () => void
}

export function GamificationView({ onBack }: GamificationViewProps) {
  const achievements = [
    { id: 1, name: "Primeiro Passo", description: "Concluir primeiro tópico", icon: "🎯", unlocked: true, color: "green" },
    { id: 2, name: "7 Dias Consecutivos", description: "Estudar 7 dias seguidos", icon: "🔥", unlocked: true, color: "orange" },
    { id: 3, name: "10% Concluído", description: "Completar 10% do edital", icon: "⭐", unlocked: true, color: "yellow" },
    { id: 4, name: "Semana Perfeita", description: "100% da semana concluída", icon: "💯", unlocked: true, color: "purple" },
    { id: 5, name: "Maratonista", description: "Estudar 10h em um dia", icon: "🏃", unlocked: true, color: "blue" },
    { id: 6, name: "30 Dias Consecutivos", description: "Estudar 30 dias seguidos", icon: "🎖️", unlocked: false, color: "gray" },
    { id: 7, name: "50% Concluído", description: "Completar metade do edital", icon: "🎊", unlocked: false, color: "gray" },
    { id: 8, name: "Mestre da Matéria", description: "100% de uma matéria", icon: "👑", unlocked: false, color: "gray" },
  ]

  const currentLevel = {
    level: 3,
    name: "Dedicado",
    points: 3450,
    nextLevel: 5000,
    color: "purple"
  }

  const progressToNextLevel = (currentLevel.points / currentLevel.nextLevel) * 100

  const activeGoals = [
    { name: "Atingir 30h esta semana", current: 14, target: 30, unit: "h" },
    { name: "Completar Português", current: 85, target: 100, unit: "%" },
    { name: "Fazer 50 revisões", current: 23, target: 50, unit: "" }
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
            <h1 className="text-xl font-bold text-gray-900">🎯 Metas e Conquistas</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Level Card */}
        <Card className="p-6 bg-gradient-to-br from-purple-500 to-pink-500 text-white">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm opacity-90">Seu Nível</div>
                <div className="text-3xl font-bold">Nível {currentLevel.level} - {currentLevel.name}</div>
              </div>
              <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-4xl">
                🎓
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="opacity-90">Progresso para Nível 4</span>
                <span className="font-bold">{currentLevel.points} / {currentLevel.nextLevel} pts</span>
              </div>
              <Progress value={progressToNextLevel} className="h-3 bg-white/30" />
              <div className="text-xs opacity-75">
                Faltam {currentLevel.nextLevel - currentLevel.points} pontos para o próximo nível
              </div>
            </div>
          </div>
        </Card>

        {/* Streak & Points */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="p-6 space-y-2">
            <div className="flex items-center gap-2 text-orange-600">
              <Flame className="w-6 h-6" />
              <span className="font-semibold">Sequência</span>
            </div>
            <div className="text-4xl font-bold text-gray-900">7 dias</div>
            <div className="text-sm text-gray-600">
              Melhor: <span className="font-semibold">14 dias</span>
            </div>
          </Card>

          <Card className="p-6 space-y-2">
            <div className="flex items-center gap-2 text-yellow-600">
              <Star className="w-6 h-6" />
              <span className="font-semibold">Pontos</span>
            </div>
            <div className="text-4xl font-bold text-gray-900">{currentLevel.points.toLocaleString()}</div>
            <div className="text-sm text-gray-600">
              Total acumulado
            </div>
          </Card>
        </div>

        {/* Achievements */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-600" />
              Medalhas Conquistadas
            </h2>
            <span className="text-sm text-gray-600">
              {achievements.filter(a => a.unlocked).length}/{achievements.length}
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`text-center p-4 rounded-xl border-2 transition-all ${
                  achievement.unlocked
                    ? "bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-300"
                    : "bg-gray-50 border-gray-200 opacity-50"
                }`}
              >
                <div className="relative">
                  <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center text-3xl mb-2 ${
                    achievement.unlocked
                      ? "bg-gradient-to-br from-yellow-400 to-orange-500"
                      : "bg-gray-300"
                  }`}>
                    {achievement.unlocked ? achievement.icon : <Lock className="w-6 h-6 text-gray-500" />}
                  </div>
                </div>
                <div className="text-sm font-semibold text-gray-900 mb-1">
                  {achievement.name}
                </div>
                <div className="text-xs text-gray-600">
                  {achievement.description}
                </div>
              </div>
            ))}
          </div>

          <Button variant="outline" className="w-full">
            Ver Todas as Conquistas
          </Button>
        </Card>

        {/* Active Goals */}
        <Card className="p-6 space-y-4">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Target className="w-5 h-5 text-blue-600" />
            Metas Ativas
          </h2>

          <div className="space-y-4">
            {activeGoals.map((goal, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-900">{goal.name}</span>
                  <span className="text-sm font-bold text-gray-600">
                    {goal.current}/{goal.target}{goal.unit}
                  </span>
                </div>
                <Progress value={(goal.current / goal.target) * 100} className="h-2" />
              </div>
            ))}
          </div>

          <Button variant="outline" className="w-full">
            + Criar Nova Meta
          </Button>
        </Card>

        {/* Avatar Customization */}
        <Card className="p-6 space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">🎨 Seu Avatar</h2>
          
          <div className="flex items-center gap-6">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center text-6xl">
              🦉
            </div>
            <div className="flex-1 space-y-2">
              <div className="text-xl font-bold text-gray-900">Coruja Dedicada</div>
              <div className="text-sm text-gray-600">
                Nível {currentLevel.level} - Continue estudando para evoluir!
              </div>
              <Button size="sm" variant="outline">
                Customizar Avatar
              </Button>
            </div>
          </div>
        </Card>

        {/* Rewards */}
        <Card className="p-6 space-y-4 bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200">
          <h2 className="text-lg font-semibold text-gray-900">🎁 Recompensas Disponíveis</h2>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-white rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-xl">
                  🎨
                </div>
                <div>
                  <div className="font-medium text-gray-900">Tema Escuro</div>
                  <div className="text-xs text-gray-600">1.000 pontos</div>
                </div>
              </div>
              <Button size="sm" disabled>
                Desbloqueado
              </Button>
            </div>

            <div className="flex items-center justify-between p-3 bg-white rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-xl">
                  🎵
                </div>
                <div>
                  <div className="font-medium text-gray-900">Música de Foco Premium</div>
                  <div className="text-xs text-gray-600">5.000 pontos</div>
                </div>
              </div>
              <Button size="sm" className="bg-gradient-to-r from-purple-500 to-blue-500">
                Resgatar
              </Button>
            </div>

            <div className="flex items-center justify-between p-3 bg-white rounded-lg opacity-50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-xl">
                  👑
                </div>
                <div>
                  <div className="font-medium text-gray-900">Avatar Lendário</div>
                  <div className="text-xs text-gray-600">10.000 pontos</div>
                </div>
              </div>
              <Button size="sm" variant="outline" disabled>
                <Lock className="w-4 h-4 mr-2" />
                Bloqueado
              </Button>
            </div>
          </div>
        </Card>
      </main>
    </div>
  )
}
