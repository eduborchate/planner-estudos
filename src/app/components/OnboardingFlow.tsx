"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { GraduationCap, Brain, TrendingUp, Target, ChevronRight, ChevronLeft } from "lucide-react"

interface OnboardingFlowProps {
  onComplete: () => void
}

export function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [step, setStep] = useState(0)

  const screens = [
    {
      icon: GraduationCap,
      title: "Master Study Planner",
      description: "Aprenda com acompanhamento real de rendimento!",
      gradient: "from-purple-500 to-blue-500"
    },
    {
      icon: Brain,
      title: "Planejamento Inteligente",
      description: "Nossa IA cria o plano perfeito baseado no seu edital e tempo disponível",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: TrendingUp,
      title: "Acompanhamento em Tempo Real",
      description: "Monitore seu progresso com métricas detalhadas e insights personalizados",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: Target,
      title: "Foque no que Importa",
      description: "Receba lembretes, acompanhe seu rendimento e alcance seus objetivos com eficiência",
      gradient: "from-pink-500 to-orange-500"
    }
  ]

  const currentScreen = screens[step]
  const Icon = currentScreen.icon

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-2xl p-8 space-y-8">
          {/* Icon */}
          <div className="flex justify-center">
            <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${currentScreen.gradient} flex items-center justify-center shadow-lg`}>
              <Icon className="w-12 h-12 text-white" />
            </div>
          </div>

          {/* Content */}
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold text-gray-900">
              {currentScreen.title}
            </h1>
            <p className="text-lg text-gray-600">
              {currentScreen.description}
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            {step === screens.length - 1 ? (
              <Button 
                onClick={onComplete}
                className="w-full h-12 text-lg bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
              >
                Começar Agora
                <ChevronRight className="ml-2 w-5 h-5" />
              </Button>
            ) : (
              <Button 
                onClick={() => setStep(step + 1)}
                className="w-full h-12 text-lg bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
              >
                Próximo
                <ChevronRight className="ml-2 w-5 h-5" />
              </Button>
            )}

            {step > 0 && (
              <Button 
                onClick={() => setStep(step - 1)}
                variant="ghost"
                className="w-full"
              >
                <ChevronLeft className="mr-2 w-4 h-4" />
                Voltar
              </Button>
            )}
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2">
            {screens.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all ${
                  index === step 
                    ? "w-8 bg-gradient-to-r from-purple-500 to-blue-500" 
                    : "w-2 bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
