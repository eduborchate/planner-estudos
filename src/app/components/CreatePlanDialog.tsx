"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { FileText, Camera, Edit, ChevronRight, ChevronLeft, Sparkles, BookOpen } from "lucide-react"
import { toast } from "sonner"

interface CreatePlanDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onComplete: () => void
}

export function CreatePlanDialog({ open, onOpenChange, onComplete }: CreatePlanDialogProps) {
  const [step, setStep] = useState(1)
  const [inputMethod, setInputMethod] = useState<"paste" | "photo" | "manual" | null>(null)
  const [editalText, setEditalText] = useState("")
  const [concursoName, setConcursoName] = useState("")
  const [banca, setBanca] = useState("")
  const [hoursPerDay, setHoursPerDay] = useState([6])
  const [selectedDays, setSelectedDays] = useState({
    seg: true,
    ter: true,
    qua: true,
    qui: true,
    sex: true,
    sab: false,
    dom: false
  })
  const [level, setLevel] = useState("intermediario")
  const [strategy, setStrategy] = useState("blocos")
  const [examDate, setExamDate] = useState("")

  const totalWeeklyHours = hoursPerDay[0] * Object.values(selectedDays).filter(Boolean).length

  const handleNext = () => {
    if (step === 1 && !inputMethod) {
      toast.error("Escolha um método de entrada")
      return
    }
    if (step === 2 && inputMethod === "paste" && !editalText.trim()) {
      toast.error("Cole o texto do edital")
      return
    }
    if (step === 2 && inputMethod === "manual" && !concursoName.trim()) {
      toast.error("Informe o nome do concurso")
      return
    }
    if (step === 3 && !examDate) {
      toast.error("Defina a data da prova")
      return
    }
    setStep(step + 1)
  }

  const handleComplete = () => {
    toast.success("🎉 Plano criado com sucesso!", {
      description: "Seu cronograma está pronto e será atualizado automaticamente!"
    })
    onComplete()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            Criar Plano de Estudos ({step}/5)
          </DialogTitle>
        </DialogHeader>

        {/* Step 1: Input Method */}
        {step === 1 && (
          <div className="space-y-4">
            <p className="text-gray-600">Como você quer adicionar seu edital?</p>
            
            <div className="grid gap-4">
              <button
                onClick={() => setInputMethod("paste")}
                className={`p-6 border-2 rounded-xl text-left transition-all hover:border-purple-500 ${
                  inputMethod === "paste" ? "border-purple-500 bg-purple-50" : "border-gray-200"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                    <FileText className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">📝 Colar Texto</h3>
                    <p className="text-sm text-gray-600">Cole o edital completo - IA organiza automaticamente</p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => setInputMethod("photo")}
                className={`p-6 border-2 rounded-xl text-left transition-all hover:border-blue-500 ${
                  inputMethod === "photo" ? "border-blue-500 bg-blue-50" : "border-gray-200"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <Camera className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">📸 Tirar Foto</h3>
                    <p className="text-sm text-gray-600">Fotografe o edital - IA extrai e organiza</p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => setInputMethod("manual")}
                className={`p-6 border-2 rounded-xl text-left transition-all hover:border-green-500 ${
                  inputMethod === "manual" ? "border-green-500 bg-green-50" : "border-gray-200"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                    <Edit className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">✏️ Criar Manualmente</h3>
                    <p className="text-sm text-gray-600">Monte seu plano personalizado do zero</p>
                  </div>
                </div>
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Input Content */}
        {step === 2 && (
          <div className="space-y-4">
            {inputMethod === "paste" && (
              <>
                <div className="space-y-2">
                  <Label>Nome do Concurso</Label>
                  <Input 
                    placeholder="Ex: Concurso TRF 2024" 
                    value={concursoName}
                    onChange={(e) => setConcursoName(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Banca Organizadora (opcional)</Label>
                  <Input 
                    placeholder="Ex: CESPE, FCC, FGV" 
                    value={banca}
                    onChange={(e) => setBanca(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Cole o texto do edital</Label>
                  <Textarea
                    value={editalText}
                    onChange={(e) => setEditalText(e.target.value)}
                    placeholder="Cole aqui o conteúdo do edital...&#10;&#10;Exemplo:&#10;LÍNGUA PORTUGUESA&#10;1. Compreensão e interpretação de textos&#10;2. Tipologia textual&#10;&#10;MATEMÁTICA&#10;1. Operações com números reais&#10;2. Equações do 1º e 2º graus"
                    className="min-h-[300px] font-mono text-sm"
                  />
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <BookOpen className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-blue-900">
                      <p className="font-semibold mb-1">🤖 IA Inteligente</p>
                      <p className="text-blue-700">
                        Nossa IA vai identificar automaticamente as matérias, tópicos e criar um cronograma 
                        que se atualiza sozinho conforme você avança, seguindo TODO o conteúdo do edital até o fim!
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}

            {inputMethod === "photo" && (
              <div className="text-center py-12 space-y-4">
                <div className="w-20 h-20 mx-auto rounded-full bg-blue-100 flex items-center justify-center">
                  <Camera className="w-10 h-10 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Funcionalidade em Desenvolvimento</h3>
                  <p className="text-gray-600">
                    Em breve você poderá fotografar seu edital e nossa IA vai processar automaticamente!
                  </p>
                </div>
                <Button onClick={() => setInputMethod("paste")} variant="outline">
                  Usar Método de Colar Texto
                </Button>
              </div>
            )}

            {inputMethod === "manual" && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Nome do Concurso/Prova</Label>
                  <Input 
                    placeholder="Ex: Concurso TRF 2024" 
                    value={concursoName}
                    onChange={(e) => setConcursoName(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Banca Organizadora (opcional)</Label>
                  <Input 
                    placeholder="Ex: CESPE, FCC, FGV" 
                    value={banca}
                    onChange={(e) => setBanca(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Adicione suas matérias (uma por linha)</Label>
                  <Textarea
                    placeholder="Língua Portuguesa&#10;Matemática&#10;Direito Constitucional&#10;Informática&#10;Raciocínio Lógico"
                    className="min-h-[200px]"
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step 3: Exam Date & Availability */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label>📅 Data da Prova</Label>
              <Input 
                type="date" 
                value={examDate}
                onChange={(e) => setExamDate(e.target.value)}
              />
            </div>

            <div className="space-y-3">
              <Label>⏰ Quantas horas por dia?</Label>
              <div className="flex items-center gap-4">
                <Slider
                  value={hoursPerDay}
                  onValueChange={setHoursPerDay}
                  min={1}
                  max={12}
                  step={1}
                  className="flex-1"
                />
                <span className="text-2xl font-bold text-purple-600 w-16 text-right">
                  {hoursPerDay[0]}h
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <Label>📆 Quais dias você vai estudar?</Label>
              <div className="grid grid-cols-4 gap-3">
                {Object.entries(selectedDays).map(([day, checked]) => (
                  <div key={day} className="flex items-center space-x-2">
                    <Checkbox
                      id={day}
                      checked={checked}
                      onCheckedChange={(checked) =>
                        setSelectedDays({ ...selectedDays, [day]: checked as boolean })
                      }
                    />
                    <label
                      htmlFor={day}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 capitalize"
                    >
                      {day}
                    </label>
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-600">
                Total: <span className="font-semibold text-purple-600">{totalWeeklyHours}h por semana</span>
              </p>
            </div>
          </div>
        )}

        {/* Step 4: Level & Strategy */}
        {step === 4 && (
          <div className="space-y-6">
            <div className="space-y-3">
              <Label>🎓 Qual seu nível?</Label>
              <RadioGroup value={level} onValueChange={setLevel}>
                <div className="flex items-center space-x-2 p-4 border rounded-lg">
                  <RadioGroupItem value="iniciante" id="iniciante" />
                  <label htmlFor="iniciante" className="flex-1 cursor-pointer">
                    <div className="font-medium">Iniciante</div>
                    <div className="text-sm text-gray-500">Começando agora, preciso de mais tempo</div>
                  </label>
                </div>
                <div className="flex items-center space-x-2 p-4 border rounded-lg">
                  <RadioGroupItem value="intermediario" id="intermediario" />
                  <label htmlFor="intermediario" className="flex-1 cursor-pointer">
                    <div className="font-medium">Intermediário</div>
                    <div className="text-sm text-gray-500">Já estudei antes, ritmo padrão</div>
                  </label>
                </div>
                <div className="flex items-center space-x-2 p-4 border rounded-lg">
                  <RadioGroupItem value="avancado" id="avancado" />
                  <label htmlFor="avancado" className="flex-1 cursor-pointer">
                    <div className="font-medium">Avançado</div>
                    <div className="text-sm text-gray-500">Domino o conteúdo, foco em revisão</div>
                  </label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-3">
              <Label>📚 Estratégia de Estudo</Label>
              <RadioGroup value={strategy} onValueChange={setStrategy}>
                <div className="flex items-center space-x-2 p-4 border rounded-lg">
                  <RadioGroupItem value="ciclo" id="ciclo" />
                  <label htmlFor="ciclo" className="flex-1 cursor-pointer">
                    <div className="font-medium">Ciclo de Estudos</div>
                    <div className="text-sm text-gray-500">Rodízio diário de matérias</div>
                  </label>
                </div>
                <div className="flex items-center space-x-2 p-4 border rounded-lg">
                  <RadioGroupItem value="blocos" id="blocos" />
                  <label htmlFor="blocos" className="flex-1 cursor-pointer">
                    <div className="font-medium">Blocos Temáticos</div>
                    <div className="text-sm text-gray-500">Semanas dedicadas por matéria</div>
                  </label>
                </div>
                <div className="flex items-center space-x-2 p-4 border rounded-lg">
                  <RadioGroupItem value="hibrido" id="hibrido" />
                  <label htmlFor="hibrido" className="flex-1 cursor-pointer">
                    <div className="font-medium">Híbrido</div>
                    <div className="text-sm text-gray-500">Principais + rodízio de secundárias</div>
                  </label>
                </div>
              </RadioGroup>
            </div>
          </div>
        )}

        {/* Step 5: Summary */}
        {step === 5 && (
          <div className="space-y-6">
            <div className="text-center py-4">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                <Sparkles className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Plano Pronto!</h3>
              <p className="text-gray-600">Seu cronograma personalizado está pronto</p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-6 space-y-4">
              <h4 className="font-semibold text-lg">📊 Resumo do Plano</h4>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-gray-600">Concurso</div>
                  <div className="font-semibold">{concursoName || "Não informado"}</div>
                </div>
                <div>
                  <div className="text-gray-600">Banca</div>
                  <div className="font-semibold">{banca || "Não informada"}</div>
                </div>
                <div>
                  <div className="text-gray-600">Data da Prova</div>
                  <div className="font-semibold">{examDate || "Não definida"}</div>
                </div>
                <div>
                  <div className="text-gray-600">Horas/Semana</div>
                  <div className="font-semibold">{totalWeeklyHours}h</div>
                </div>
                <div>
                  <div className="text-gray-600">Nível</div>
                  <div className="font-semibold capitalize">{level}</div>
                </div>
                <div>
                  <div className="text-gray-600">Estratégia</div>
                  <div className="font-semibold capitalize">{strategy}</div>
                </div>
              </div>

              <div className="pt-4 border-t border-purple-200">
                <div className="text-sm text-gray-600 mb-2">🤖 Sistema Inteligente:</div>
                <ul className="space-y-1 text-sm">
                  <li>• <span className="font-semibold">Atualização automática</span> conforme você avança</li>
                  <li>• <span className="font-semibold">Cobertura completa</span> de todo o edital</li>
                  <li>• <span className="font-semibold">Acompanhamento em tempo real</span> do seu rendimento</li>
                  <li>• ✅ <span className="font-semibold text-green-600">Plano adaptativo</span> às suas necessidades</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex gap-3 pt-4 border-t">
          {step > 1 && (
            <Button onClick={() => setStep(step - 1)} variant="outline" className="flex-1">
              <ChevronLeft className="mr-2 w-4 h-4" />
              Voltar
            </Button>
          )}
          
          {step < 5 ? (
            <Button onClick={handleNext} className="flex-1 bg-gradient-to-r from-purple-500 to-blue-500">
              Continuar
              <ChevronRight className="ml-2 w-4 h-4" />
            </Button>
          ) : (
            <Button onClick={handleComplete} className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500">
              🚀 Começar Agora!
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
