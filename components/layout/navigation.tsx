"use client";

import { BrandButton } from "@/components/ui/brand-button";
import { BrandCard } from "@/components/ui/brand-card";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { LanguageToggle } from "@/components/ui/language-toggle";
import { useFitnessStore } from "@/lib/store";
import { useTranslation } from "@/lib/i18n";
import {
  Home,
  TrendingUp,
  Utensils,
  Dumbbell,
  Lightbulb,
  Calculator,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const navigationItems = [
  {
    id: "dashboard",
    icon: Home,
    color: "text-orange-600 dark:text-orange-400",
  },
  {
    id: "tracker",
    icon: TrendingUp,
    color: "text-orange-500 dark:text-orange-300",
  },
  {
    id: "meals",
    icon: Utensils,
    color: "text-yellow-600 dark:text-yellow-400",
  },
  {
    id: "workout",
    icon: Dumbbell,
    color: "text-orange-700 dark:text-orange-500",
  },
  {
    id: "tips",
    icon: Lightbulb,
    color: "text-yellow-500 dark:text-yellow-300",
  },
  {
    id: "calculator",
    icon: Calculator,
    color: "text-orange-600 dark:text-orange-400",
  },
] as const;

export function Navigation() {
  const { currentView, setCurrentView, isDarkMode, language } =
    useFitnessStore();
  const { t } = useTranslation(language);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const getNavigationLabel = (id: string) => {
    switch (id) {
      case "dashboard":
        return t("dashboard");
      case "tracker":
        return t("progress");
      case "meals":
        return t("mealPlan");
      case "workout":
        return t("workout");
      case "tips":
        return t("tipsNotes");
      case "calculator":
        return t("calculator");
      default:
        return id;
    }
  };

  return (
    <>
      {/* Desktop Navigation */}
      <BrandCard
        variant="gradient"
        className="hidden lg:block fixed left-2 top-1/2 -translate-y-1/2 z-50 w-20 hover:w-64 transition-all duration-300 shadow-xl shadow-orange-500/20 group"
      >
        <div className="space-y-4">
          {/* Header with controls */}
          <div className="text-center space-y-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none group-hover:pointer-events-auto">
            <div>
              <h2
                className={`text-lg font-bold ${
                  isDarkMode ? "text-orange-400" : "text-orange-800"
                }`}
              >
                💪 LenganMacho
              </h2>
              <p
                className={`text-sm ${
                  isDarkMode ? "text-orange-300" : "text-orange-600"
                }`}
              >
                Fitness Tracker
              </p>
            </div>

            {/* Theme and Language controls */}
            <div className="flex justify-center gap-2">
              <ThemeToggle />
              <LanguageToggle />
            </div>
          </div>

          <nav className="space-y-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <BrandButton
                  key={item.id}
                  variant={isActive ? "primary" : "ghost"}
                  onClick={() => setCurrentView(item.id as any)}
                  className={cn(
                    "w-full justify-start gap-3 h-12  items-center text-white",
                    isActive ? "px-6" : "px-4"
                  )}
                >
                  <Icon
                    size={16}
                    className={`${isActive ? "text-white" : item.color}`}
                  />
                  <span
                    className={`transition-all duration-200 ${
                      isActive
                        ? "text-white font-medium"
                        : isDarkMode
                        ? "text-gray-300"
                        : "text-gray-700"
                    } opacity-0 group-hover:opacity-100 ml-0 group-hover:ml-2`}
                  >
                    {getNavigationLabel(item.id)}
                  </span>
                </BrandButton>
              );
            })}
          </nav>
        </div>
      </BrandCard>

      {/* Tablet Navigation */}
      <BrandCard
        variant="gradient"
        className="hidden md:block lg:hidden fixed left-4 top-1/2 -translate-y-1/2 z-50 shadow-xl shadow-orange-500/20"
      >
        <div className="space-y-3">
          {/* Controls */}
          <div className="flex flex-col gap-2">
            <ThemeToggle />
            <LanguageToggle />
          </div>

          <div className="w-full h-px bg-gradient-to-r from-transparent via-orange-300 to-transparent" />

          <nav className="flex flex-col gap-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <BrandButton
                  key={item.id}
                  variant={isActive ? "primary" : "ghost"}
                  size="sm"
                  onClick={() => setCurrentView(item.id as any)}
                  className="w-12 h-12 p-0"
                >
                  <Icon
                    className={`w-5 h-5 ${
                      isActive ? "text-white" : item.color
                    }`}
                  />
                </BrandButton>
              );
            })}
          </nav>
        </div>
      </BrandCard>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        {/* Mobile Menu Button */}
        <BrandButton
          variant="primary"
          size="sm"
          className="fixed top-4 left-4 z-50 w-12 h-12 p-0 shadow-lg"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </BrandButton>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        {/* Mobile Menu */}
        <BrandCard
          variant="gradient"
          className={`fixed left-4 top-20 z-50 w-64 shadow-xl shadow-orange-500/20 transition-transform duration-300 ${
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="space-y-4">
            {/* Header with controls */}
            <div className="text-center space-y-3">
              <div>
                <h2
                  className={`text-lg font-bold ${
                    isDarkMode ? "text-orange-400" : "text-orange-800"
                  }`}
                >
                  💪 LenganMacho
                </h2>
                <p
                  className={`text-sm ${
                    isDarkMode ? "text-orange-300" : "text-orange-600"
                  }`}
                >
                  Fitness Tracker
                </p>
              </div>

              {/* Theme and Language controls */}
              <div className="flex justify-center gap-2">
                <ThemeToggle />
                <LanguageToggle />
              </div>
            </div>

            <nav className="space-y-1">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentView === item.id;
                return (
                  <BrandButton
                    key={item.id}
                    variant={isActive ? "primary" : "ghost"}
                    onClick={() => {
                      setCurrentView(item.id as any);
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full justify-start gap-3 h-12"
                  >
                    <Icon
                      className={`w-5 h-5 ${
                        isActive ? "text-white" : item.color
                      }`}
                    />
                    <span
                      className={
                        isActive
                          ? "text-white font-medium"
                          : isDarkMode
                          ? "text-gray-300"
                          : "text-gray-700"
                      }
                    >
                      {getNavigationLabel(item.id)}
                    </span>
                  </BrandButton>
                );
              })}
            </nav>
          </div>
        </BrandCard>
      </div>
    </>
  );
}
