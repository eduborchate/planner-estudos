"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { FileText, Plus, Trash2, Clock } from "lucide-react"
import { toast } from "sonner"

interface Note {
  id: string
  subject: string
  content: string
  timestamp: Date
}

export function NotesPanel() {
  const [notes, setNotes] = useState<Note[]>([])
  const [currentNote, setCurrentNote] = useState("")
  const [currentSubject, setCurrentSubject] = useState("")
  const [showNotes, setShowNotes] = useState(false)

  const handleAddNote = () => {
    if (!currentNote.trim() || !currentSubject.trim()) {
      toast.error("Preencha a matéria e a anotação")
      return
    }

    const newNote: Note = {
      id: Date.now().toString(),
      subject: currentSubject,
      content: currentNote,
      timestamp: new Date()
    }

    setNotes([newNote, ...notes])
    setCurrentNote("")
    setCurrentSubject("")
    toast.success("Anotação salva!")
  }

  const handleDeleteNote = (id: string) => {
    setNotes(notes.filter(note => note.id !== id))
    toast.success("Anotação removida")
  }

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date)
  }

  return (
    <div className="space-y-4">
      {/* Toggle Button */}
      <Button
        onClick={() => setShowNotes(!showNotes)}
        variant="outline"
        className="w-full"
      >
        <FileText className="w-4 h-4 mr-2" />
        {showNotes ? "Ocultar Anotações" : "Minhas Anotações"} ({notes.length})
      </Button>

      {showNotes && (
        <Card className="p-4 space-y-4">
          {/* New Note Form */}
          <div className="space-y-3">
            <Input
              placeholder="Matéria (ex: Português)"
              value={currentSubject}
              onChange={(e) => setCurrentSubject(e.target.value)}
            />
            <Textarea
              placeholder="Digite sua anotação aqui..."
              value={currentNote}
              onChange={(e) => setCurrentNote(e.target.value)}
              className="min-h-[100px]"
            />
            <Button
              onClick={handleAddNote}
              className="w-full bg-slate-900 hover:bg-slate-800"
            >
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Anotação
            </Button>
          </div>

          {/* Notes List */}
          {notes.length > 0 && (
            <div className="space-y-2 pt-4 border-t">
              <h3 className="text-sm font-semibold text-slate-700">
                Anotações Recentes
              </h3>
              <ScrollArea className="h-[300px]">
                <div className="space-y-3">
                  {notes.map((note) => (
                    <Card key={note.id} className="p-3 bg-slate-50">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold text-purple-600">
                              {note.subject}
                            </span>
                            <span className="text-xs text-slate-500 flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {formatTime(note.timestamp)}
                            </span>
                          </div>
                          <p className="text-sm text-slate-700 whitespace-pre-wrap">
                            {note.content}
                          </p>
                        </div>
                        <Button
                          onClick={() => handleDeleteNote(note.id)}
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </div>
          )}

          {notes.length === 0 && (
            <div className="text-center py-8 text-slate-500 text-sm">
              Nenhuma anotação ainda. Comece a registrar seus insights!
            </div>
          )}
        </Card>
      )}
    </div>
  )
}
