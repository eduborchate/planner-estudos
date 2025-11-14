"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Edit3, Check, X, ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface WeeklyViewProps {
  onBack: () => void
}

interface Session {
  time: string
  subject: string
  duration: string
  completed?: boolean
}

interface DayData {
  day: string
  date: string
  sessions: Session[]
  completed?: boolean
  current?: boolean
  rest?: boolean
}

interface WeekPlan {
  weekNumber: number
  startDate: string
  endDate: string
  days: DayData[]
}

export function WeeklyView({ onBack }: WeeklyViewProps) {
  const [editMode, setEditMode] = useState(false)
  const [editingSession, setEditingSession] = useState<{ weekIndex: number; dayIndex: number; sessionIndex: number } | null>(null)
  const [currentWeekIndex, setCurrentWeekIndex] = useState(2) // Semana atual (índice 2 = Semana 3)
  const [selectedDayForStudy, setSelectedDayForStudy] = useState<number | null>(null)

  // Lista de matérias disponíveis
  const availableSubjects = [
    "Português",
    "Matemática",
    "Direito",
    "Direito Adm",
    "Direito Penal",
    "Direito Const",
    "Informática",
    "Raciocínio",
    "História",
    "Geografia",
    "Inglês",
    "Física",
    "Química",
    "Biologia",
    "Revisão"
  ]

  // Plano completo de todas as semanas (exemplo com 12 semanas)
  const [allWeeks, setAllWeeks] = useState<WeekPlan[]>([
    {
      weekNumber: 1,
      startDate: "01/01",
      endDate: "07/01/2024",
      days: [
        {
          day: "Seg",
          date: "01/01",
          sessions: [
            { time: "08:00", subject: "Português", duration: "2h", completed: false },
            { time: "14:00", subject: "Matemática", duration: "2h", completed: false }
          ],
          completed: true
        },
        {
          day: "Ter",
          date: "02/01",
          sessions: [
            { time: "08:00", subject: "Direito", duration: "2h", completed: false },
            { time: "14:00", subject: "Informática", duration: "2h", completed: false }
          ],
          completed: true
        },
        {
          day: "Qua",
          date: "03/01",
          sessions: [
            { time: "08:00", subject: "Matemática", duration: "2h", completed: false },
            { time: "14:00", subject: "Português", duration: "2h", completed: false }
          ],
          completed: true
        },
        {
          day: "Qui",
          date: "04/01",
          sessions: [
            { time: "08:00", subject: "Direito Const", duration: "2h", completed: false },
            { time: "14:00", subject: "Raciocínio", duration: "2h", completed: false }
          ],
          completed: true
        },
        {
          day: "Sex",
          date: "05/01",
          sessions: [
            { time: "08:00", subject: "Português", duration: "2h", completed: false },
            { time: "14:00", subject: "Direito Adm", duration: "2h", completed: false }
          ],
          completed: true
        },
        {
          day: "Sáb",
          date: "06/01",
          sessions: [
            { time: "09:00", subject: "Matemática", duration: "2h", completed: false },
            { time: "14:00", subject: "Revisão", duration: "2h", completed: false }
          ],
          completed: true
        },
        {
          day: "Dom",
          date: "07/01",
          sessions: [],
          rest: true
        }
      ]
    },
    {
      weekNumber: 2,
      startDate: "08/01",
      endDate: "14/01/2024",
      days: [
        {
          day: "Seg",
          date: "08/01",
          sessions: [
            { time: "08:00", subject: "Direito Penal", duration: "2h", completed: false },
            { time: "14:00", subject: "Inglês", duration: "2h", completed: false }
          ],
          completed: true
        },
        {
          day: "Ter",
          date: "09/01",
          sessions: [
            { time: "08:00", subject: "Matemática", duration: "2h", completed: false },
            { time: "14:00", subject: "Português", duration: "2h", completed: false }
          ],
          completed: true
        },
        {
          day: "Qua",
          date: "10/01",
          sessions: [
            { time: "08:00", subject: "Direito Const", duration: "2h", completed: false },
            { time: "14:00", subject: "Informática", duration: "2h", completed: false }
          ],
          completed: true
        },
        {
          day: "Qui",
          date: "11/01",
          sessions: [
            { time: "08:00", subject: "Raciocínio", duration: "2h", completed: false },
            { time: "14:00", subject: "Direito Adm", duration: "2h", completed: false }
          ],
          completed: true
        },
        {
          day: "Sex",
          date: "12/01",
          sessions: [
            { time: "08:00", subject: "Português", duration: "2h", completed: false },
            { time: "14:00", subject: "Matemática", duration: "2h", completed: false }
          ],
          completed: true
        },
        {
          day: "Sáb",
          date: "13/01",
          sessions: [
            { time: "09:00", subject: "Direito", duration: "2h", completed: false },
            { time: "14:00", subject: "Revisão", duration: "2h", completed: false }
          ],
          completed: true
        },
        {
          day: "Dom",
          date: "14/01",
          sessions: [],
          rest: true
        }
      ]
    },
    {
      weekNumber: 3,
      startDate: "15/01",
      endDate: "21/01/2024",
      days: [
        {
          day: "Seg",
          date: "15/01",
          sessions: [
            { time: "08:00", subject: "Português", duration: "2h", completed: false },
            { time: "14:00", subject: "Matemática", duration: "2h", completed: false }
          ],
          completed: true
        },
        {
          day: "Ter",
          date: "16/01",
          sessions: [
            { time: "08:00", subject: "Direito", duration: "2h", completed: false },
            { time: "14:00", subject: "Informática", duration: "2h", completed: false }
          ],
          completed: true
        },
        {
          day: "Qua",
          date: "17/01",
          sessions: [
            { time: "08:00", subject: "Matemática", duration: "2h", completed: false },
            { time: "14:00", subject: "Português", duration: "2h", completed: false }
          ],
          completed: false,
          current: true
        },
        {
          day: "Qui",
          date: "18/01",
          sessions: [
            { time: "08:00", subject: "Direito Const", duration: "2h", completed: false },
            { time: "14:00", subject: "Raciocínio", duration: "2h", completed: false }
          ],
          completed: false
        },
        {
          day: "Sex",
          date: "19/01",
          sessions: [
            { time: "08:00", subject: "Português", duration: "2h", completed: false },
            { time: "14:00", subject: "Direito Adm", duration: "2h", completed: false }
          ],
          completed: false
        },
        {
          day: "Sáb",
          date: "20/01",
          sessions: [
            { time: "09:00", subject: "Matemática", duration: "2h", completed: false },
            { time: "14:00", subject: "Revisão", duration: "2h", completed: false }
          ],
          completed: false
        },
        {
          day: "Dom",
          date: "21/01",
          sessions: [],
          rest: true
        }
      ]
    },
    {
      weekNumber: 4,
      startDate: "22/01",
      endDate: "28/01/2024",
      days: [
        {
          day: "Seg",
          date: "22/01",
          sessions: [
            { time: "08:00", subject: "História", duration: "2h", completed: false },
            { time: "14:00", subject: "Geografia", duration: "2h", completed: false }
          ],
          completed: false
        },
        {
          day: "Ter",
          date: "23/01",
          sessions: [
            { time: "08:00", subject: "Português", duration: "2h", completed: false },
            { time: "14:00", subject: "Matemática", duration: "2h", completed: false }
          ],
          completed: false
        },
        {
          day: "Qua",
          date: "24/01",
          sessions: [
            { time: "08:00", subject: "Direito Penal", duration: "2h", completed: false },
            { time: "14:00", subject: "Inglês", duration: "2h", completed: false }
          ],
          completed: false
        },
        {
          day: "Qui",
          date: "25/01",
          sessions: [
            { time: "08:00", subject: "Informática", duration: "2h", completed: false },
            { time: "14:00", subject: "Raciocínio", duration: "2h", completed: false }
          ],
          completed: false
        },
        {
          day: "Sex",
          date: "26/01",
          sessions: [
            { time: "08:00", subject: "Direito Const", duration: "2h", completed: false },
            { time: "14:00", subject: "Português", duration: "2h", completed: false }
          ],
          completed: false
        },
        {
          day: "Sáb",
          date: "27/01",
          sessions: [
            { time: "09:00", subject: "Matemática", duration: "2h", completed: false },
            { time: "14:00", subject: "Revisão", duration: "2h", completed: false }
          ],
          completed: false
        },
        {
          day: "Dom",
          date: "28/01",
          sessions: [],
          rest: true
        }
      ]
    },
    {
      weekNumber: 5,
      startDate: "29/01",
      endDate: "04/02/2024",
      days: [
        {
          day: "Seg",
          date: "29/01",
          sessions: [
            { time: "08:00", subject: "Física", duration: "2h", completed: false },
            { time: "14:00", subject: "Química", duration: "2h", completed: false }
          ],
          completed: false
        },
        {
          day: "Ter",
          date: "30/01",
          sessions: [
            { time: "08:00", subject: "Biologia", duration: "2h", completed: false },
            { time: "14:00", subject: "Português", duration: "2h", completed: false }
          ],
          completed: false
        },
        {
          day: "Qua",
          date: "31/01",
          sessions: [
            { time: "08:00", subject: "Matemática", duration: "2h", completed: false },
            { time: "14:00", subject: "Direito", duration: "2h", completed: false }
          ],
          completed: false
        },
        {
          day: "Qui",
          date: "01/02",
          sessions: [
            { time: "08:00", subject: "Inglês", duration: "2h", completed: false },
            { time: "14:00", subject: "História", duration: "2h", completed: false }
          ],
          completed: false
        },
        {
          day: "Sex",
          date: "02/02",
          sessions: [
            { time: "08:00", subject: "Geografia", duration: "2h", completed: false },
            { time: "14:00", subject: "Informática", duration: "2h", completed: false }
          ],
          completed: false
        },
        {
          day: "Sáb",
          date: "03/02",
          sessions: [
            { time: "09:00", subject: "Raciocínio", duration: "2h", completed: false },
            { time: "14:00", subject: "Revisão", duration: "2h", completed: false }
          ],
          completed: false
        },
        {
          day: "Dom",
          date: "04/02",
          sessions: [],
          rest: true
        }
      ]
    },
    {
      weekNumber: 6,
      startDate: "05/02",
      endDate: "11/02/2024",
      days: [
        {
          day: "Seg",
          date: "05/02",
          sessions: [
            { time: "08:00", subject: "Português", duration: "2h", completed: false },
            { time: "14:00", subject: "Matemática", duration: "2h", completed: false }
          ],
          completed: false
        },
        {
          day: "Ter",
          date: "06/02",
          sessions: [
            { time: "08:00", subject: "Direito Penal", duration: "2h", completed: false },
            { time: "14:00", subject: "Direito Adm", duration: "2h", completed: false }
          ],
          completed: false
        },
        {
          day: "Qua",
          date: "07/02",
          sessions: [
            { time: "08:00", subject: "Direito Const", duration: "2h", completed: false },
            { time: "14:00", subject: "Português", duration: "2h", completed: false }
          ],
          completed: false
        },
        {
          day: "Qui",
          date: "08/02",
          sessions: [
            { time: "08:00", subject: "Matemática", duration: "2h", completed: false },
            { time: "14:00", subject: "Informática", duration: "2h", completed: false }
          ],
          completed: false
        },
        {
          day: "Sex",
          date: "09/02",
          sessions: [
            { time: "08:00", subject: "Raciocínio", duration: "2h", completed: false },
            { time: "14:00", subject: "Inglês", duration: "2h", completed: false }
          ],
          completed: false
        },
        {
          day: "Sáb",
          date: "10/02",
          sessions: [
            { time: "09:00", subject: "História", duration: "2h", completed: false },
            { time: "14:00", subject: "Revisão", duration: "2h", completed: false }
          ],
          completed: false
        },
        {
          day: "Dom",
          date: "11/02",
          sessions: [],
          rest: true
        }
      ]
    },
    {
      weekNumber: 7,
      startDate: "12/02",
      endDate: "18/02/2024",
      days: [
        {
          day: "Seg",
          date: "12/02",
          sessions: [
            { time: "08:00", subject: "Geografia", duration: "2h", completed: false },
            { time: "14:00", subject: "Física", duration: "2h", completed: false }
          ],
          completed: false
        },
        {
          day: "Ter",
          date: "13/02",
          sessions: [
            { time: "08:00", subject: "Química", duration: "2h", completed: false },
            { time: "14:00", subject: "Biologia", duration: "2h", completed: false }
          ],
          completed: false
        },
        {
          day: "Qua",
          date: "14/02",
          sessions: [
            { time: "08:00", subject: "Português", duration: "2h", completed: false },
            { time: "14:00", subject: "Matemática", duration: "2h", completed: false }
          ],
          completed: false
        },
        {
          day: "Qui",
          date: "15/02",
          sessions: [
            { time: "08:00", subject: "Direito", duration: "2h", completed: false },
            { time: "14:00", subject: "Informática", duration: "2h", completed: false }
          ],
          completed: false
        },
        {
          day: "Sex",
          date: "16/02",
          sessions: [
            { time: "08:00", subject: "Raciocínio", duration: "2h", completed: false },
            { time: "14:00", subject: "Inglês", duration: "2h", completed: false }
          ],
          completed: false
        },
        {
          day: "Sáb",
          date: "17/02",
          sessions: [
            { time: "09:00", subject: "Português", duration: "2h", completed: false },
            { time: "14:00", subject: "Revisão", duration: "2h", completed: false }
          ],
          completed: false
        },
        {
          day: "Dom",
          date: "18/02",
          sessions: [],
          rest: true
        }
      ]
    },
    {
      weekNumber: 8,
      startDate: "19/02",
      endDate: "25/02/2024",
      days: [
        {
          day: "Seg",
          date: "19/02",
          sessions: [
            { time: "08:00", subject: "Matemática", duration: "2h", completed: false },
            { time: "14:00", subject: "Direito Penal", duration: "2h", completed: false }
          ],
          completed: false
        },
        {
          day: "Ter",
          date: "20/02",
          sessions: [
            { time: "08:00", subject: "Direito Adm", duration: "2h", completed: false },
            { time: "14:00", subject: "Direito Const", duration: "2h", completed: false }
          ],
          completed: false
        },
        {
          day: "Qua",
          date: "21/02",
          sessions: [
            { time: "08:00", subject: "Português", duration: "2h", completed: false },
            { time: "14:00", subject: "História", duration: "2h", completed: false }
          ],
          completed: false
        },
        {
          day: "Qui",
          date: "22/02",
          sessions: [
            { time: "08:00", subject: "Geografia", duration: "2h", completed: false },
            { time: "14:00", subject: "Informática", duration: "2h", completed: false }
          ],
          completed: false
        },
        {
          day: "Sex",
          date: "23/02",
          sessions: [
            { time: "08:00", subject: "Raciocínio", duration: "2h", completed: false },
            { time: "14:00", subject: "Matemática", duration: "2h", completed: false }
          ],
          completed: false
        },
        {
          day: "Sáb",
          date: "24/02",
          sessions: [
            { time: "09:00", subject: "Português", duration: "2h", completed: false },
            { time: "14:00", subject: "Revisão", duration: "2h", completed: false }
          ],
          completed: false
        },
        {
          day: "Dom",
          date: "25/02",
          sessions: [],
          rest: true
        }
      ]
    },
    {
      weekNumber: 9,
      startDate: "26/02",
      endDate: "03/03/2024",
      days: [
        {
          day: "Seg",
          date: "26/02",
          sessions: [
            { time: "08:00", subject: "Inglês", duration: "2h", completed: false },
            { time: "14:00", subject: "Física", duration: "2h", completed: false }
          ],
          completed: false
        },
        {
          day: "Ter",
          date: "27/02",
          sessions: [
            { time: "08:00", subject: "Química", duration: "2h", completed: false },
            { time: "14:00", subject: "Biologia", duration: "2h", completed: false }
          ],
          completed: false
        },
        {
          day: "Qua",
          date: "28/02",
          sessions: [
            { time: "08:00", subject: "Direito", duration: "2h", completed: false },
            { time: "14:00", subject: "Português", duration: "2h", completed: false }
          ],
          completed: false
        },
        {
          day: "Qui",
          date: "29/02",
          sessions: [
            { time: "08:00", subject: "Matemática", duration: "2h", completed: false },
            { time: "14:00", subject: "Informática", duration: "2h", completed: false }
          ],
          completed: false
        },
        {
          day: "Sex",
          date: "01/03",
          sessions: [
            { time: "08:00", subject: "Raciocínio", duration: "2h", completed: false },
            { time: "14:00", subject: "História", duration: "2h", completed: false }
          ],
          completed: false
        },
        {
          day: "Sáb",
          date: "02/03",
          sessions: [
            { time: "09:00", subject: "Geografia", duration: "2h", completed: false },
            { time: "14:00", subject: "Revisão", duration: "2h", completed: false }
          ],
          completed: false
        },
        {
          day: "Dom",
          date: "03/03",
          sessions: [],
          rest: true
        }
      ]
    },
    {
      weekNumber: 10,
      startDate: "04/03",
      endDate: "10/03/2024",
      days: [
        {
          day: "Seg",
          date: "04/03",
          sessions: [
            { time: "08:00", subject: "Português", duration: "2h", completed: false },
            { time: "14:00", subject: "Matemática", duration: "2h", completed: false }
          ],
          completed: false
        },
        {
          day: "Ter",
          date: "05/03",
          sessions: [
            { time: "08:00", subject: "Direito Penal", duration: "2h", completed: false },
            { time: "14:00", subject: "Direito Adm", duration: "2h", completed: false }
          ],
          completed: false
        },
        {
          day: "Qua",
          date: "06/03",
          sessions: [
            { time: "08:00", subject: "Direito Const", duration: "2h", completed: false },
            { time: "14:00", subject: "Inglês", duration: "2h", completed: false }
          ],
          completed: false
        },
        {
          day: "Qui",
          date: "07/03",
          sessions: [
            { time: "08:00", subject: "Informática", duration: "2h", completed: false },
            { time: "14:00", subject: "Raciocínio", duration: "2h", completed: false }
          ],
          completed: false
        },
        {
          day: "Sex",
          date: "08/03",
          sessions: [
            { time: "08:00", subject: "Português", duration: "2h", completed: false },
            { time: "14:00", subject: "Matemática", duration: "2h", completed: false }
          ],
          completed: false
        },
        {
          day: "Sáb",
          date: "09/03",
          sessions: [
            { time: "09:00", subject: "História", duration: "2h", completed: false },
            { time: "14:00", subject: "Revisão", duration: "2h", completed: false }
          ],
          completed: false
        },
        {
          day: "Dom",
          date: "10/03",
          sessions: [],
          rest: true
        }
      ]
    },
    {
      weekNumber: 11,
      startDate: "11/03",
      endDate: "17/03/2024",
      days: [
        {
          day: "Seg",
          date: "11/03",
          sessions: [
            { time: "08:00", subject: "Geografia", duration: "2h", completed: false },
            { time: "14:00", subject: "Física", duration: "2h", completed: false }
          ],
          completed: false
        },
        {
          day: "Ter",
          date: "12/03",
          sessions: [
            { time: "08:00", subject: "Química", duration: "2h", completed: false },
            { time: "14:00", subject: "Biologia", duration: "2h", completed: false }
          ],
          completed: false
        },
        {
          day: "Qua",
          date: "13/03",
          sessions: [
            { time: "08:00", subject: "Português", duration: "2h", completed: false },
            { time: "14:00", subject: "Matemática", duration: "2h", completed: false }
          ],
          completed: false
        },
        {
          day: "Qui",
          date: "14/03",
          sessions: [
            { time: "08:00", subject: "Direito", duration: "2h", completed: false },
            { time: "14:00", subject: "Informática", duration: "2h", completed: false }
          ],
          completed: false
        },
        {
          day: "Sex",
          date: "15/03",
          sessions: [
            { time: "08:00", subject: "Raciocínio", duration: "2h", completed: false },
            { time: "14:00", subject: "Inglês", duration: "2h", completed: false }
          ],
          completed: false
        },
        {
          day: "Sáb",
          date: "16/03",
          sessions: [
            { time: "09:00", subject: "Português", duration: "2h", completed: false },
            { time: "14:00", subject: "Revisão", duration: "2h", completed: false }
          ],
          completed: false
        },
        {
          day: "Dom",
          date: "17/03",
          sessions: [],
          rest: true
        }
      ]
    },
    {
      weekNumber: 12,
      startDate: "18/03",
      endDate: "24/03/2024",
      days: [
        {
          day: "Seg",
          date: "18/03",
          sessions: [
            { time: "08:00", subject: "Revisão Geral", duration: "3h", completed: false },
            { time: "14:00", subject: "Simulado", duration: "3h", completed: false }
          ],
          completed: false
        },
        {
          day: "Ter",
          date: "19/03",
          sessions: [
            { time: "08:00", subject: "Revisão Geral", duration: "3h", completed: false },
            { time: "14:00", subject: "Simulado", duration: "3h", completed: false }
          ],
          completed: false
        },
        {
          day: "Qua",
          date: "20/03",
          sessions: [
            { time: "08:00", subject: "Revisão Geral", duration: "3h", completed: false },
            { time: "14:00", subject: "Simulado", duration: "3h", completed: false }
          ],
          completed: false
        },
        {
          day: "Qui",
          date: "21/03",
          sessions: [
            { time: "08:00", subject: "Revisão Geral", duration: "3h", completed: false },
            { time: "14:00", subject: "Descanso", duration: "2h", completed: false }
          ],
          completed: false
        },
        {
          day: "Sex",
          date: "22/03",
          sessions: [
            { time: "08:00", subject: "Revisão Leve", duration: "2h", completed: false },
            { time: "14:00", subject: "Descanso", duration: "2h", completed: false }
          ],
          completed: false
        },
        {
          day: "Sáb",
          date: "23/03",
          sessions: [
            { time: "09:00", subject: "Descanso", duration: "4h", completed: false }
          ],
          completed: false
        },
        {
          day: "Dom",
          date: "24/03",
          sessions: [],
          rest: true
        }
      ]
    }
  ])

  const currentWeek = allWeeks[currentWeekIndex]

  // Função para marcar uma sessão como concluída
  const toggleSessionCompletion = (weekIndex: number, dayIndex: number, sessionIndex: number) => {
    const newAllWeeks = [...allWeeks]
    const session = newAllWeeks[weekIndex].days[dayIndex].sessions[sessionIndex]
    session.completed = !session.completed
    
    // Verificar se todas as sessões do dia foram concluídas
    const allSessionsCompleted = newAllWeeks[weekIndex].days[dayIndex].sessions.every(s => s.completed)
    if (allSessionsCompleted) {
      newAllWeeks[weekIndex].days[dayIndex].completed = true
    } else {
      newAllWeeks[weekIndex].days[dayIndex].completed = false
    }
    
    setAllWeeks(newAllWeeks)
  }

  // Função para alterar matéria de uma sessão específica
  const changeSessionSubject = (weekIndex: number, dayIndex: number, sessionIndex: number, newSubject: string) => {
    const newAllWeeks = [...allWeeks]
    newAllWeeks[weekIndex].days[dayIndex].sessions[sessionIndex].subject = newSubject
    setAllWeeks(newAllWeeks)
    setEditingSession(null)
  }

  // Navegação entre semanas
  const goToPreviousWeek = () => {
    if (currentWeekIndex > 0) {
      setCurrentWeekIndex(currentWeekIndex - 1)
      setEditMode(false)
      setEditingSession(null)
      setSelectedDayForStudy(null)
    }
  }

  const goToNextWeek = () => {
    if (currentWeekIndex < allWeeks.length - 1) {
      setCurrentWeekIndex(currentWeekIndex + 1)
      setEditMode(false)
      setEditingSession(null)
      setSelectedDayForStudy(null)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button onClick={onBack} variant="ghost" size="icon">
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-xl font-bold text-slate-900">Semana {currentWeek.weekNumber}</h1>
                <p className="text-sm text-slate-600">{currentWeek.startDate} a {currentWeek.endDate}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                onClick={() => {
                  setEditMode(!editMode)
                  setEditingSession(null)
                  setSelectedDayForStudy(null)
                }}
                variant={editMode ? "default" : "outline"}
                size="sm"
                className={editMode ? "bg-green-600 hover:bg-green-700" : ""}
              >
                {editMode ? (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Concluir
                  </>
                ) : (
                  <>
                    <Edit3 className="w-4 h-4 mr-2" />
                    Editar Manualmente
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Edit Mode Banner */}
      {editMode && (
        <div className="bg-blue-50 border-b border-blue-200">
          <div className="max-w-6xl mx-auto px-4 py-3">
            <p className="text-sm text-blue-800 text-center">
              ✏️ <strong>Modo de Edição Ativo:</strong> Clique em qualquer sessão para alterar a matéria
            </p>
          </div>
        </div>
      )}

      {/* Week Navigation */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Button
              onClick={goToPreviousWeek}
              disabled={currentWeekIndex === 0}
              variant="outline"
              size="sm"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Semana Anterior
            </Button>
            
            <div className="text-sm text-slate-600">
              Semana {currentWeekIndex + 1} de {allWeeks.length}
            </div>

            <Button
              onClick={goToNextWeek}
              disabled={currentWeekIndex === allWeeks.length - 1}
              variant="outline"
              size="sm"
            >
              Próxima Semana
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
      </div>

      {/* Flexible Study Mode Banner */}
      {selectedDayForStudy !== null && (
        <div className="bg-purple-50 border-b border-purple-200">
          <div className="max-w-6xl mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <p className="text-sm text-purple-800">
                📚 <strong>Modo Flexível:</strong> Estudando matérias de <strong>{currentWeek.days[selectedDayForStudy].day}</strong>. Marque as aulas conforme concluir!
              </p>
              <Button
                onClick={() => setSelectedDayForStudy(null)}
                variant="ghost"
                size="sm"
                className="text-purple-700 hover:text-purple-900"
              >
                <X className="w-4 h-4 mr-1" />
                Cancelar
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-7 gap-3">
          {currentWeek.days.map((day, dayIndex) => (
            <Card 
              key={dayIndex}
              className={`p-4 ${
                day.completed ? "bg-green-50 border-green-200" :
                day.current ? "bg-blue-50 border-blue-200 border-2" :
                day.rest ? "bg-slate-100" :
                selectedDayForStudy === dayIndex ? "bg-purple-50 border-purple-300 border-2" :
                "bg-white"
              }`}
            >
              {/* Day Header */}
              <div className="text-center mb-3 pb-3 border-b border-slate-200">
                <div className="text-sm font-bold text-slate-900">{day.day}</div>
                <div className="text-xs text-slate-600">{day.date}</div>
                {day.completed && (
                  <div className="text-lg mt-1">✓</div>
                )}
                {day.current && (
                  <div className="text-xs text-blue-600 font-medium mt-1">Hoje</div>
                )}
                {day.rest && (
                  <div className="text-lg mt-1">-</div>
                )}
                {selectedDayForStudy === dayIndex && (
                  <div className="text-xs text-purple-600 font-medium mt-1">Estudando</div>
                )}
              </div>

              {/* Sessions */}
              <div className="space-y-2">
                {day.sessions.map((session, sessionIndex) => {
                  const isEditing = editingSession?.weekIndex === currentWeekIndex && 
                                   editingSession?.dayIndex === dayIndex && 
                                   editingSession?.sessionIndex === sessionIndex
                  
                  return (
                    <div 
                      key={sessionIndex}
                      className={`p-2 bg-white rounded text-xs transition-all relative ${
                        editMode && !isEditing ? "cursor-pointer hover:bg-blue-50 hover:border-blue-300 border-2 border-transparent" : ""
                      } ${
                        isEditing ? "border-2 border-blue-500" : ""
                      } ${
                        session.completed ? "bg-green-50 border-green-300 border" : ""
                      }`}
                      onClick={() => {
                        if (editMode && !isEditing) {
                          setEditingSession({ weekIndex: currentWeekIndex, dayIndex, sessionIndex })
                        }
                      }}
                    >
                      {/* Checkbox para marcar como concluída */}
                      {!editMode && !isEditing && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            toggleSessionCompletion(currentWeekIndex, dayIndex, sessionIndex)
                          }}
                          className="absolute top-1 right-1 w-5 h-5 flex items-center justify-center rounded hover:bg-slate-100 transition-colors"
                        >
                          {session.completed ? (
                            <CheckCircle2 className="w-4 h-4 text-green-600" />
                          ) : (
                            <div className="w-4 h-4 border-2 border-slate-300 rounded" />
                          )}
                        </button>
                      )}

                      <div className="font-medium text-slate-900">{session.time}</div>
                      
                      {isEditing ? (
                        <div className="mt-1 space-y-2">
                          <Select
                            value={session.subject}
                            onValueChange={(value) => changeSessionSubject(currentWeekIndex, dayIndex, sessionIndex, value)}
                          >
                            <SelectTrigger className="h-8 text-xs">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {availableSubjects.map((subject) => (
                                <SelectItem key={subject} value={subject} className="text-xs">
                                  {subject}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="w-full h-6 text-xs"
                            onClick={(e) => {
                              e.stopPropagation()
                              setEditingSession(null)
                            }}
                          >
                            <X className="w-3 h-3 mr-1" />
                            Cancelar
                          </Button>
                        </div>
                      ) : (
                        <>
                          <div className={`truncate pr-6 ${session.completed ? "text-slate-500 line-through" : "text-slate-600"}`}>
                            {session.subject}
                          </div>
                          <div className="text-slate-500">{session.duration}</div>
                        </>
                      )}
                    </div>
                  )
                })}
                {day.rest && (
                  <div className="text-center text-xs text-slate-500 py-4">
                    Descanso
                  </div>
                )}
              </div>

              {/* Botão para estudar matérias deste dia */}
              {!day.rest && day.sessions.length > 0 && !editMode && (
                <div className="mt-3">
                  <Button 
                    onClick={() => setSelectedDayForStudy(selectedDayForStudy === dayIndex ? null : dayIndex)}
                    variant={selectedDayForStudy === dayIndex ? "default" : "outline"}
                    size="sm" 
                    className={`w-full h-8 text-xs ${
                      selectedDayForStudy === dayIndex 
                        ? "bg-purple-600 hover:bg-purple-700" 
                        : "hover:bg-purple-50 hover:text-purple-700"
                    }`}
                  >
                    {selectedDayForStudy === dayIndex ? "Estudando" : "Estudar Hoje"}
                  </Button>
                </div>
              )}
            </Card>
          ))}
        </div>

        {/* Summary */}
        <Card className="mt-6 p-6 bg-white">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-slate-900">24h</div>
              <div className="text-sm text-slate-600">Total programado</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">
                {currentWeek.days.reduce((acc, day) => 
                  acc + day.sessions.filter(s => s.completed).length * 2, 0
                )}h
              </div>
              <div className="text-sm text-slate-600">Concluído</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">
                {24 - currentWeek.days.reduce((acc, day) => 
                  acc + day.sessions.filter(s => s.completed).length * 2, 0
                )}h
              </div>
              <div className="text-sm text-slate-600">Restante</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900">
                {Math.round((currentWeek.days.reduce((acc, day) => 
                  acc + day.sessions.filter(s => s.completed).length, 0
                ) / (currentWeek.days.reduce((acc, day) => 
                  acc + day.sessions.length, 0
                ) || 1)) * 100)}%
              </div>
              <div className="text-sm text-slate-600">Progresso</div>
            </div>
          </div>
        </Card>

        {/* All Weeks Overview */}
        <Card className="mt-6 p-6 bg-white">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">📅 Visão Geral do Plano Completo</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {allWeeks.map((week, index) => {
              const totalSessions = week.days.reduce((acc, day) => acc + day.sessions.length, 0)
              const completedSessions = week.days.reduce((acc, day) => 
                acc + day.sessions.filter(s => s.completed).length, 0
              )
              const weekProgress = totalSessions > 0 ? Math.round((completedSessions / totalSessions) * 100) : 0

              return (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentWeekIndex(index)
                    setEditMode(false)
                    setEditingSession(null)
                    setSelectedDayForStudy(null)
                  }}
                  className={`p-4 rounded-lg border-2 transition-all text-left ${
                    index === currentWeekIndex 
                      ? "border-blue-500 bg-blue-50" 
                      : weekProgress === 100
                      ? "border-green-200 bg-green-50 hover:border-green-300"
                      : "border-slate-200 bg-white hover:border-slate-300"
                  }`}
                >
                  <div className="text-sm font-bold text-slate-900">Semana {week.weekNumber}</div>
                  <div className="text-xs text-slate-600 mt-1">{week.startDate}</div>
                  <div className="text-xs text-slate-500 mt-1">
                    {weekProgress === 100 ? "✓ Concluída" : `${weekProgress}% concluído`}
                  </div>
                </button>
              )
            })}
          </div>
        </Card>
      </main>
    </div>
  )
}
