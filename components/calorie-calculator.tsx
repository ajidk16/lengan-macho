"use client"

import { useState } from "react"
import { BrandCard } from "@/components/ui/brand-card"
import { BrandButton } from "@/components/ui/brand-button"
import { PageHeader } from "@/components/layout/page-header"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Calculator, Target, Zap, TrendingUp, Users, Activity } from "lucide-react"

interface CalorieResult {
  bmr: number
  tdee: number
  bulking: number
  cutting: number
  maintenance: number
}

export function CalorieCalculator() {
  const [formData, setFormData] = useState({
    age: "",
    weight: "",
    height: "",
    gender: "",
    activity: "",
  })
  const [result, setResult] = useState<CalorieResult | null>(null)

  const calculateCalories = () => {
    const age = Number.parseInt(formData.age)
    const weight = Number.parseFloat(formData.weight)
    const height = Number.parseFloat(formData.height)

    // Calculate BMR using Mifflin-St Jeor Equation
    let bmr: number
    if (formData.gender === "male") {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161
    }

    // Activity multipliers
    const activityMultipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      very_active: 1.9,
    }

    const multiplier = activityMultipliers[formData.activity as keyof typeof activityMultipliers]
    const tdee = bmr * multiplier

    const calculatedResult: CalorieResult = {
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      maintenance: Math.round(tdee),
      bulking: Math.round(tdee + 300), // +300 calories for bulking
      cutting: Math.round(tdee - 500), // -500 calories for cutting
    }

    setResult(calculatedResult)
  }

  const isFormValid = formData.age && formData.weight && formData.height && formData.gender && formData.activity

  return (
    <div className="space-y-8">
      <PageHeader
        title="Kalkulator Kalori"
        subtitle="Hitung kebutuhan kalori harian berdasarkan tujuan fitness"
        icon="🧮"
      />

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Form */}
        <BrandCard title="📋 Data Pribadi" variant="bordered" className="border-l-4 border-l-orange-500">
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="age" className="text-orange-800 font-medium">
                  Usia (tahun)
                </Label>
                <Input
                  id="age"
                  type="number"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  placeholder="25"
                  className="border-orange-200 focus:border-orange-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="weight" className="text-orange-800 font-medium">
                  Berat Badan (kg)
                </Label>
                <Input
                  id="weight"
                  type="number"
                  step="0.1"
                  value={formData.weight}
                  onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                  placeholder="70"
                  className="border-orange-200 focus:border-orange-500"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="height" className="text-orange-800 font-medium">
                Tinggi Badan (cm)
              </Label>
              <Input
                id="height"
                type="number"
                value={formData.height}
                onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                placeholder="175"
                className="border-orange-200 focus:border-orange-500"
              />
            </div>

            <div className="space-y-3">
              <Label className="text-orange-800 font-medium">Jenis Kelamin</Label>
              <RadioGroup
                value={formData.gender}
                onValueChange={(value) => setFormData({ ...formData, gender: value })}
                className="flex gap-8"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="male" id="male" className="border-orange-500 text-orange-500" />
                  <Label htmlFor="male" className="text-gray-700">
                    👨 Pria
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="female" id="female" className="border-orange-500 text-orange-500" />
                  <Label htmlFor="female" className="text-gray-700">
                    👩 Wanita
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label className="text-orange-800 font-medium">Tingkat Aktivitas</Label>
              <Select
                value={formData.activity}
                onValueChange={(value) => setFormData({ ...formData, activity: value })}
              >
                <SelectTrigger className="border-orange-200 focus:border-orange-500">
                  <SelectValue placeholder="Pilih tingkat aktivitas" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sedentary">🛋️ Sedentary (tidak olahraga)</SelectItem>
                  <SelectItem value="light">🚶 Light (olahraga 1-3x/minggu)</SelectItem>
                  <SelectItem value="moderate">🏃 Moderate (olahraga 3-5x/minggu)</SelectItem>
                  <SelectItem value="active">💪 Active (olahraga 6-7x/minggu)</SelectItem>
                  <SelectItem value="very_active">🔥 Very Active (olahraga 2x/hari)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <BrandButton
              onClick={calculateCalories}
              disabled={!isFormValid}
              variant="primary"
              className="w-full h-12 text-lg"
            >
              <Calculator className="w-5 h-5 mr-2" />
              Hitung Kalori
            </BrandButton>
          </div>
        </BrandCard>

        {/* Results */}
        <BrandCard title="📊 Hasil Perhitungan" variant="bordered" className="border-l-4 border-l-green-500">
          {result ? (
            <div className="space-y-6">
              {/* BMR & TDEE */}
              <div className="grid gap-4">
                <div className="flex justify-between items-center p-4 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl border border-orange-200">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-orange-100 rounded-full">
                      <Zap className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <span className="font-semibold text-orange-800">BMR</span>
                      <p className="text-xs text-orange-600">Basal Metabolic Rate</p>
                    </div>
                  </div>
                  <span className="text-2xl font-bold text-orange-600">{result.bmr}</span>
                </div>

                <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-50 to-orange-50 rounded-xl border border-blue-200">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-full">
                      <Target className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <span className="font-semibold text-blue-800">TDEE</span>
                      <p className="text-xs text-blue-600">Total Daily Energy</p>
                    </div>
                  </div>
                  <span className="text-2xl font-bold text-blue-600">{result.tdee}</span>
                </div>
              </div>

              {/* Goal-based Recommendations */}
              <div className="space-y-4">
                <h4 className="font-bold text-lg text-gray-800 flex items-center gap-2">
                  <Target className="w-5 h-5 text-orange-500" />
                  Rekomendasi Berdasarkan Tujuan
                </h4>

                <div className="space-y-3">
                  <div className="flex justify-between items-center p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-xl border-2 border-green-200">
                    <div className="flex items-center gap-3">
                      <TrendingUp className="w-5 h-5 text-green-600" />
                      <div>
                        <span className="font-semibold text-green-800">💪 Bulking</span>
                        <p className="text-xs text-green-600">Menambah massa otot</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xl font-bold text-green-600">{result.bulking}</span>
                      <p className="text-xs text-green-600">kal/hari</p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border-2 border-blue-200">
                    <div className="flex items-center gap-3">
                      <Activity className="w-5 h-5 text-blue-600" />
                      <div>
                        <span className="font-semibold text-blue-800">⚖️ Maintenance</span>
                        <p className="text-xs text-blue-600">Mempertahankan berat</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xl font-bold text-blue-600">{result.maintenance}</span>
                      <p className="text-xs text-blue-600">kal/hari</p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center p-4 bg-gradient-to-r from-red-50 to-red-100 rounded-xl border-2 border-red-200">
                    <div className="flex items-center gap-3">
                      <Target className="w-5 h-5 text-red-600" />
                      <div>
                        <span className="font-semibold text-red-800">🔥 Cutting</span>
                        <p className="text-xs text-red-600">Mengurangi lemak</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xl font-bold text-red-600">{result.cutting}</span>
                      <p className="text-xs text-red-600">kal/hari</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Important Note */}
              <BrandCard
                variant="gradient"
                className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-200"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-yellow-100 rounded-full">
                    <Users className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-yellow-800 mb-2">📝 Catatan Penting</h5>
                    <p className="text-sm text-yellow-700 leading-relaxed">
                      Hasil ini adalah estimasi berdasarkan rumus ilmiah. Sesuaikan dengan respons tubuh Anda dan
                      konsultasikan dengan ahli gizi atau pelatih profesional untuk hasil optimal.
                    </p>
                  </div>
                </div>
              </BrandCard>
            </div>
          ) : (
            <div className="text-center py-12 space-y-4">
              <div className="p-4 bg-orange-100 rounded-full w-fit mx-auto">
                <Calculator className="w-12 h-12 text-orange-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Siap Menghitung?</h3>
                <p className="text-gray-500">Isi data pribadi Anda untuk menghitung kebutuhan kalori harian</p>
              </div>
            </div>
          )}
        </BrandCard>
      </div>
    </div>
  )
}
