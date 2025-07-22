"use client";

import { useState } from "react";
import { BrandCard } from "@/components/ui/brand-card";
import { BrandButton } from "@/components/ui/brand-button";
import { PageHeader } from "@/components/layout/page-header";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useFitnessStore } from "@/lib/store";
import { Lightbulb, Edit, Save, X, Calendar, BookOpen } from "lucide-react";

const weeklyTips = [
  {
    week: 1,
    tip: "Fokus pada form yang benar daripada beban yang berat. Mulai dengan beban ringan dan tingkatkan secara bertahap.",
    category: "Teknik",
  },
  {
    week: 2,
    tip: "Pastikan tidur 7-9 jam setiap malam. Recovery yang baik sama pentingnya dengan latihan itu sendiri.",
    category: "Recovery",
  },
  {
    week: 3,
    tip: "Konsumsi protein 1.6-2.2g per kg berat badan untuk mendukung pertumbuhan otot. Sebar konsumsi protein sepanjang hari.",
    category: "Nutrisi",
  },
  {
    week: 4,
    tip: "Lakukan progressive overload dengan menambah beban, reps, atau sets setiap minggu untuk terus berkembang.",
    category: "Progression",
  },
];

export function WeeklyTips() {
  const {
    selectedWeek,
    setSelectedWeek,
    notes,
    addNote,
    updateNote,
    deleteNote,
  } = useFitnessStore();
  const [newNote, setNewNote] = useState("");
  const [editingNote, setEditingNote] = useState<string | null>(null);
  const [editContent, setEditContent] = useState("");

  const currentTip = weeklyTips.find((tip) => tip.week === selectedWeek);
  const currentWeekNotes = notes.filter((note) => note.week === selectedWeek);

  const handleAddNote = () => {
    if (newNote.trim()) {
      addNote({
        date: new Date().toISOString().split("T")[0],
        content: newNote.trim(),
        week: selectedWeek,
      });
      setNewNote("");
    }
  };

  const startEdit = (noteId: string, content: string) => {
    setEditingNote(noteId);
    setEditContent(content);
  };

  const saveEdit = () => {
    if (editingNote) {
      updateNote(editingNote, editContent);
      setEditingNote(null);
      setEditContent("");
    }
  };

  const cancelEdit = () => {
    setEditingNote(null);
    setEditContent("");
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="Tips & Catatan"
        subtitle="Panduan mingguan dan catatan pribadi perjalanan fitness"
        icon="🧠"
      />

      {/* Week Selector */}
      <BrandCard variant="gradient" className="p-4">
        <div className="flex flex-wrap justify-center gap-2">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((week) => (
            <BrandButton
              key={week}
              variant={selectedWeek === week ? "primary" : "outline"}
              size="sm"
              onClick={() => setSelectedWeek(week)}
              className={`min-w-[70px] font-medium transition-all bg-transparent ${
                selectedWeek === week ? "shadow-md" : ""
              }`}
            >
              Week {week}
            </BrandButton>
          ))}
        </div>
      </BrandCard>

      {/* Weekly Tip */}
      {currentTip && (
        <BrandCard
          variant="bordered"
          className="border-l-4 border-l-yellow-500 bg-gradient-to-r from-yellow-50 to-orange-50 p-4"
        >
          <div className="flex items-start gap-4">
            <div className="p-2 bg-yellow-100 rounded-full flex-shrink-0">
              <Lightbulb className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-bold text-yellow-800 text-lg">
                  Tips Minggu {currentTip.week}
                </h3>
                <Badge className="bg-yellow-200 text-yellow-800 border-yellow-300">
                  {currentTip.category}
                </Badge>
              </div>
              <p className="text-gray-700 leading-relaxed text-base">
                {currentTip.tip}
              </p>
            </div>
          </div>
        </BrandCard>
      )}

      {/* Personal Notes Section */}
      <BrandCard
        variant="bordered"
        className="border-l-4 border-l-orange-500 p-4"
      >
        <div className="space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-orange-100 rounded-full flex-shrink-0">
              <BookOpen className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="font-bold text-orange-800 text-lg">
              Catatan Pribadi - Week {selectedWeek}
            </h3>
          </div>

          {/* Add New Note */}
          <div className="space-y-3">
            <Textarea
              placeholder="Tulis catatan atau refleksi untuk minggu ini..."
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              className="min-h-[100px] border-orange-200 focus:border-orange-500 bg-orange-50 dark:bg-gray-800"
            />
            <BrandButton
              onClick={handleAddNote}
              disabled={!newNote.trim()}
              variant="primary"
              className="w-full"
            >
              📝 Tambah Catatan
            </BrandButton>
          </div>

          {/* Existing Notes */}
          <div className="space-y-4">
            {currentWeekNotes.length === 0 ? (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                <BookOpen className="w-12 h-12 mx-auto mb-3 text-gray-400 dark:text-gray-500" />
                <p>Belum ada catatan untuk minggu ini</p>
                <p className="text-sm">
                  Mulai tulis refleksi dan pengalaman latihan Anda
                </p>
              </div>
            ) : (
              currentWeekNotes.map((note) => (
                <BrandCard
                  key={note.id}
                  variant="gradient"
                  className="bg-gradient-to-r from-gray-50 to-orange-50 p-4 dark:from-gray-900 dark:to-gray-800 border-2 border-orange-200 dark:border-gray-700"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-orange-500 dark:text-orange-400" />
                        <span className="text-sm text-orange-600 font-medium dark:text-orange-300">
                          {new Date(note.date).toLocaleDateString("id-ID")}
                        </span>
                      </div>
                      {editingNote !== note.id && (
                        <div className="flex gap-1">
                          <BrandButton
                            size="sm"
                            variant="ghost"
                            onClick={() => startEdit(note.id, note.content)}
                            className="p-2"
                          >
                            <Edit className="w-3 h-3" />
                          </BrandButton>
                          <BrandButton
                            size="sm"
                            variant="ghost"
                            onClick={() => deleteNote(note.id)}
                            className="p-2 text-red-500 hover:text-red-700 dark:hover:text-red-400"
                          >
                            <X className="w-3 h-3" />
                          </BrandButton>
                        </div>
                      )}
                    </div>
                    {editingNote === note.id ? (
                      <div className="space-y-3">
                        <Textarea
                          value={editContent}
                          onChange={(e) => setEditContent(e.target.value)}
                          className="min-h-[80px] border-orange-200 focus:border-orange-500 dark:bg-gray-800 outline-none transition-colors"
                        />
                        <div className="flex gap-2">
                          <BrandButton
                            size="sm"
                            onClick={saveEdit}
                            variant="primary"
                          >
                            <Save className="w-3 h-3 mr-1" />
                            Simpan
                          </BrandButton>
                          <BrandButton
                            size="sm"
                            variant="outline"
                            onClick={cancelEdit}
                          >
                            <X className="w-3 h-3 mr-1" />
                            Batal
                          </BrandButton>
                        </div>
                      </div>
                    ) : (
                      <p className="text-gray-700 leading-relaxed dark:text-gray-300">
                        {note.content}
                      </p>
                    )}
                  </div>
                </BrandCard>
              ))
            )}
          </div>
        </div>
      </BrandCard>
    </div>
  );
}
