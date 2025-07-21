"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { BrandButton } from "@/components/ui/brand-button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus } from "lucide-react"
import { useFitnessStore } from "@/lib/store"
import { useTranslation } from "@/lib/i18n"
import { BrandCard } from "@/components/ui/brand-card"

export function ProgressModal() {
  const { addProgress, language, isDarkMode } = useFitnessStore()
  const { t } = useTranslation(language)
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
    if (!formData.week) newErrors.week = language === "id" ? "Harus diisi" : "Required"
    if (!formData.weight) newErrors.weight = language === "id" ? "Harus diisi" : "Required"
    if (!formData.armSize) newErrors.armSize = language === "id" ? "Harus diisi" : "Required"

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

  const inputClassName = `${
    isDarkMode
      ? "border-gray-600 bg-gray-700 text-gray-200 focus:border-orange-500"
      : "border-orange-200 focus:border-orange-500"
  }`

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <BrandButton variant="primary" className="gap-2">
          <Plus className="w-4 h-4" />
          {t("addProgress")}
        </BrandButton>
      </DialogTrigger>
      <DialogContent
        className={`sm:max-w-md ${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}
      >
        <DialogHeader>
          <DialogTitle className={`text-xl font-bold ${isDarkMode ? "text-orange-400" : "text-orange-800"}`}>
            📊 {t("addProgress")} {language === "id" ? "Mingguan" : "Weekly"}
          </DialogTitle>
        </DialogHeader>

        <BrandCard variant="gradient" className="mt-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="week" className={`font-medium ${isDarkMode ? "text-orange-400" : "text-orange-800"}`}>
                  {t("week")} {language === "id" ? "ke-" : ""}
                </Label>
                <Input
                  id="week"
                  type="number"
                  placeholder="1"
                  value={formData.week}
                  onChange={(e) => handleInputChange("week", e.target.value)}
                  className={`${inputClassName} ${errors.week ? "border-red-500" : ""}`}
                />
                {errors.week && <p className="text-sm text-red-500">{errors.week}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="weight" className={`font-medium ${isDarkMode ? "text-orange-400" : "text-orange-800"}`}>
                  {t("weight")} ({t("kg")})
                </Label>
                <Input
                  id="weight"
                  type="number"
                  step="0.1"
                  placeholder="70.5"
                  value={formData.weight}
                  onChange={(e) => handleInputChange("weight", e.target.value)}
                  className={`${inputClassName} ${errors.weight ? "border-red-500" : ""}`}
                />
                {errors.weight && <p className="text-sm text-red-500">{errors.weight}</p>}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="armSize"
                  className={`font-medium ${isDarkMode ? "text-orange-400" : "text-orange-800"}`}
                >
                  {t("arm")} ({t("cm")})
                </Label>
                <Input
                  id="armSize"
                  type="number"
                  step="0.1"
                  placeholder="32.0"
                  value={formData.armSize}
                  onChange={(e) => handleInputChange("armSize", e.target.value)}
                  className={`${inputClassName} ${errors.armSize ? "border-red-500" : ""}`}
                />
                {errors.armSize && <p className="text-sm text-red-500">{errors.armSize}</p>}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="chestSize"
                  className={`font-medium ${isDarkMode ? "text-orange-400" : "text-orange-800"}`}
                >
                  {t("chest")} ({t("cm")})
                </Label>
                <Input
                  id="chestSize"
                  type="number"
                  step="0.1"
                  placeholder="95.0"
                  value={formData.chestSize}
                  onChange={(e) => handleInputChange("chestSize", e.target.value)}
                  className={inputClassName}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="waistSize"
                className={`font-medium ${isDarkMode ? "text-orange-400" : "text-orange-800"}`}
              >
                {t("waist")} ({t("cm")})
              </Label>
              <Input
                id="waistSize"
                type="number"
                step="0.1"
                placeholder="80.0"
                value={formData.waistSize}
                onChange={(e) => handleInputChange("waistSize", e.target.value)}
                className={inputClassName}
              />
            </div>

            <div className="flex gap-3 pt-4">
              <BrandButton type="submit" variant="primary" className="flex-1">
                💾 {t("save")} {t("progress")}
              </BrandButton>
              <BrandButton type="button" variant="outline" onClick={() => setIsOpen(false)} className="flex-1">
                ❌ {t("cancel")}
              </BrandButton>
            </div>
          </form>
        </BrandCard>
      </DialogContent>
    </Dialog>
  )
}
