"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus } from "lucide-react"
import { useFitnessStore } from "@/lib/store"

export function ProgressModal() {
  const { addProgress } = useFitnessStore()
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState({
    week: "",
    weight: "",
    armSize: "",
    chestSize: "",
    waistSize: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validation
    const newErrors: Record<string, string> = {}
    if (!formData.week) newErrors.week = "Harus diisi"
    if (!formData.weight) newErrors.weight = "Harus diisi"
    if (!formData.armSize) newErrors.armSize = "Harus diisi"

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    addProgress({
      date: new Date().toISOString().split("T")[0],
      week: Number.parseInt(formData.week),
      weight: Number.parseFloat(formData.weight),
      armSize: Number.parseFloat(formData.armSize),
      chestSize: formData.chestSize ? Number.parseFloat(formData.chestSize) : undefined,
      waistSize: formData.waistSize ? Number.parseFloat(formData.waistSize) : undefined,
    })

    // Reset form
    setFormData({ week: "", weight: "", armSize: "", chestSize: "", waistSize: "" })
    setErrors({})
    setIsOpen(false)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Tambah Progress
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Tambah Progress Mingguan</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="week">Minggu ke-</Label>
              <Input
                id="week"
                type="number"
                placeholder="1"
                value={formData.week}
                onChange={(e) => handleInputChange("week", e.target.value)}
                className={errors.week ? "border-red-500" : ""}
              />
              {errors.week && <p className="text-sm text-red-500">{errors.week}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="weight">Berat (kg)</Label>
              <Input
                id="weight"
                type="number"
                step="0.1"
                placeholder="70.5"
                value={formData.weight}
                onChange={(e) => handleInputChange("weight", e.target.value)}
                className={errors.weight ? "border-red-500" : ""}
              />
              {errors.weight && <p className="text-sm text-red-500">{errors.weight}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="armSize">Lengan (cm)</Label>
              <Input
                id="armSize"
                type="number"
                step="0.1"
                placeholder="32.0"
                value={formData.armSize}
                onChange={(e) => handleInputChange("armSize", e.target.value)}
                className={errors.armSize ? "border-red-500" : ""}
              />
              {errors.armSize && <p className="text-sm text-red-500">{errors.armSize}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="chestSize">Dada (cm)</Label>
              <Input
                id="chestSize"
                type="number"
                step="0.1"
                placeholder="95.0"
                value={formData.chestSize}
                onChange={(e) => handleInputChange("chestSize", e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="waistSize">Pinggang (cm)</Label>
            <Input
              id="waistSize"
              type="number"
              step="0.1"
              placeholder="80.0"
              value={formData.waistSize}
              onChange={(e) => handleInputChange("waistSize", e.target.value)}
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" className="flex-1">
              Simpan
            </Button>
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)} className="flex-1">
              Batal
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
