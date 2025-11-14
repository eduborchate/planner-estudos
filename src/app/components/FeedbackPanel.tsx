"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { MessageSquare, Send, ThumbsUp } from "lucide-react"
import { toast } from "sonner"

export function FeedbackPanel() {
  const [showFeedback, setShowFeedback] = useState(false)
  const [feedbackType, setFeedbackType] = useState<"bug" | "suggestion" | "other">("suggestion")
  const [feedbackText, setFeedbackText] = useState("")
  const [email, setEmail] = useState("")

  const handleSubmit = () => {
    if (!feedbackText.trim()) {
      toast.error("Por favor, descreva seu feedback")
      return
    }

    // Aqui você pode integrar com um backend para salvar o feedback
    console.log({
      type: feedbackType,
      text: feedbackText,
      email: email || "anônimo",
      timestamp: new Date()
    })

    toast.success("Obrigado pelo feedback! Vamos analisar sua sugestão.", {
      description: "Sua opinião é muito importante para melhorarmos."
    })

    setFeedbackText("")
    setEmail("")
    setShowFeedback(false)
  }

  return (
    <div className="space-y-4">
      {/* Toggle Button */}
      <Button
        onClick={() => setShowFeedback(!showFeedback)}
        variant="outline"
        className="w-full border-blue-200 hover:bg-blue-50"
      >
        <MessageSquare className="w-4 h-4 mr-2" />
        {showFeedback ? "Fechar Feedback" : "Enviar Feedback"}
      </Button>

      {showFeedback && (
        <Card className="p-4 space-y-4 bg-blue-50/50 border-blue-200">
          <div className="flex items-center gap-2">
            <ThumbsUp className="w-5 h-5 text-blue-600" />
            <h3 className="font-semibold text-slate-900">
              Ajude-nos a melhorar!
            </h3>
          </div>

          <div className="space-y-3">
            {/* Feedback Type */}
            <div className="space-y-2">
              <Label>Tipo de Feedback</Label>
              <RadioGroup value={feedbackType} onValueChange={(value: any) => setFeedbackType(value)}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="suggestion" id="suggestion" />
                  <label htmlFor="suggestion" className="text-sm cursor-pointer">
                    💡 Sugestão de Melhoria
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="bug" id="bug" />
                  <label htmlFor="bug" className="text-sm cursor-pointer">
                    🐛 Reportar Problema
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="other" id="other" />
                  <label htmlFor="other" className="text-sm cursor-pointer">
                    💬 Outro
                  </label>
                </div>
              </RadioGroup>
            </div>

            {/* Feedback Text */}
            <div className="space-y-2">
              <Label>Descreva seu feedback</Label>
              <Textarea
                placeholder="Conte-nos o que você pensa..."
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
                className="min-h-[120px] bg-white"
              />
            </div>

            {/* Email (optional) */}
            <div className="space-y-2">
              <Label>Email (opcional)</Label>
              <Input
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white"
              />
              <p className="text-xs text-slate-600">
                Deixe seu email se quiser receber uma resposta
              </p>
            </div>

            {/* Submit Button */}
            <Button
              onClick={handleSubmit}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              <Send className="w-4 h-4 mr-2" />
              Enviar Feedback
            </Button>
          </div>
        </Card>
      )}
    </div>
  )
}
