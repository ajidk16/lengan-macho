"use client";

import { BrandButton } from "@/components/ui/brand-button";
import { Button } from "@/components/ui/button";
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
  Expand,
  ChevronsRightLeft,
  ChevronsLeftRight,
  Shrink,
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

const navLabels: Record<string, string> = {
  dashboard: "dashboard",
  tracker: "progress",
  meals: "mealPlan",
  workout: "workout",
  tips: "tipsNotes",
  calculator: "calculator",
};

function getNavigationLabel(id: string, t: (key: string) => string) {
  return t(navLabels[id] ?? id);
}

function NavButtons({
  showLabel,
  onClick,
  currentView,
  isDarkMode,
  t,
}: {
  showLabel?: boolean;
  onClick?: (id: string) => void;
  currentView: string;
  isDarkMode: boolean;
  t: (key: string) => string;
}) {
  return (
    <>
      {navigationItems.map(({ id, icon: Icon, color }) => {
        const isActive = currentView === id;
        return (
          <BrandButton
            key={id}
            variant={isActive ? "primary" : "ghost"}
            onClick={() => onClick?.(id)}
            className={cn(
              "w-full justify-start gap-3 h-12 items-center px-4 transition-all duration-200 group bg-orange-50 text-orange-500 dark:bg-gray-800 dark:text-orange-400 hover:bg-orange-100 dark:hover:bg-gray-700",
              isActive &&
                "bg-orange-600 text-white shadow-lg shadow-orange-500/25"
            )}
          >
            <Icon
              size={16}
              className={cn("w-5 h-5", isActive ? "text-white" : color)}
            />
            {showLabel && (
              <span
                className={cn(
                  "transition-all duration-200 opacity-0 group-hover:opacity-100 ml-0 group-hover:ml-2",
                  isActive
                    ? "text-white font-medium"
                    : isDarkMode
                    ? "text-gray-300"
                    : "text-gray-700"
                )}
              >
                {getNavigationLabel(id, t)}
              </span>
            )}
          </BrandButton>
        );
      })}
    </>
  );
}

export function Navigation() {
  const { currentView, setCurrentView, isDarkMode, language } =
    useFitnessStore();
  const { t } = useTranslation(language);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Tablet */}
      <BrandCard
        variant="gradient"
        className={cn(
          "hidden md:block fixed left-2 top-1/2 -translate-y-1/2 z-50 w-20 transition-all duration-300 shadow-xl shadow-orange-500/20 group",
          isMobileMenuOpen && "w-64"
        )}
      >
        <div className="space-y-3">
          <div className="flex flex-col gap-2">
            <Button
              variant="ghost"
              size="lg"
              className="p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <Shrink size={24} className="text-orange-500" />
              ) : (
                <Expand size={24} className="text-orange-500" />
              )}
            </Button>

            <div
              className={cn(
                "flex items-center justify-center gap-2 text-center transition-all duration-300",
                isMobileMenuOpen ? "block" : "hidden"
              )}
            >
              <h2
                className={cn(
                  "text-lg font-bold text-center",
                  isDarkMode ? "text-orange-400" : "text-orange-800"
                )}
              >
                💪 <span className="block">LenganMacho</span>
              </h2>
              <p
                className={`text-sm ${
                  isDarkMode ? "text-orange-300" : "text-orange-600"
                }`}
              >
                Fitness Tracker
              </p>
            </div>
            <div
              className={cn(
                "flex items-center justify-center gap-2 transition-all duration-300",
                !isMobileMenuOpen ? "flex-col" : "flex-row"
              )}
            >
              <ThemeToggle />
              <LanguageToggle />
            </div>
          </div>
          <div className="w-full h-px bg-gradient-to-r from-transparent via-orange-300 to-transparent" />
          <nav className="flex flex-col gap-2">
            {navigationItems.map(({ id, icon: Icon, color }) => {
              const isActive = currentView === id;
              return (
                <BrandButton
                  key={id}
                  variant={isActive ? "primary" : "ghost"}
                  size="sm"
                  onClick={() => setCurrentView(id as any)}
                  className={cn(
                    "w-full justify-start gap-3 h-12 items-center px-4 transition-all duration-200 group bg-orange-50 text-orange-500 dark:bg-gray-800 dark:text-orange-400 hover:bg-orange-100 dark:hover:bg-gray-700",
                    isActive &&
                      "bg-orange-600 text-white shadow-lg shadow-orange-500/25"
                  )}
                >
                  <Icon
                    className={`w-5 h-5 ${isActive ? "text-white" : color}`}
                  />
                  {isMobileMenuOpen && (
                    <span
                      className={cn(
                        "transition-all duration-200 opacity-100 ml-2 ",
                        isActive
                          ? "text-white font-medium"
                          : isDarkMode
                          ? "text-gray-300"
                          : "text-gray-700"
                      )}
                    >
                      {getNavigationLabel(id, t)}
                    </span>
                  )}
                </BrandButton>
              );
            })}
          </nav>
        </div>
      </BrandCard>

      {/* Mobile */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 shadow-lg">
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
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
        <BrandCard
          variant="gradient"
          className={`fixed left-4 top-20 z-50 w-64 shadow-xl shadow-orange-500/20 transition-transform duration-300 ${
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="space-y-4">
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
              <div className="flex justify-center gap-2">
                <ThemeToggle />
                <LanguageToggle />
              </div>
            </div>
            <nav className="space-y-1">
              {navigationItems.map(({ id, icon: Icon, color }) => {
                const isActive = currentView === id;
                return (
                  <BrandButton
                    key={id}
                    variant={isActive ? "primary" : "ghost"}
                    onClick={() => {
                      setCurrentView(id as any);
                      setIsMobileMenuOpen(false);
                    }}
                    // className="w-full justify-start gap-3 h-12"
                    className={cn(
                      "w-full justify-start gap-3 h-12 items-center px-4 transition-all duration-200 group bg-orange-50 text-orange-500 dark:bg-gray-800 dark:text-orange-400 hover:bg-orange-100 dark:hover:bg-gray-700",
                      isActive &&
                        "bg-orange-600 text-white shadow-lg shadow-orange-500/25"
                    )}
                  >
                    <Icon
                      className={`w-5 h-5 ${isActive ? "text-white" : color}`}
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
                      {getNavigationLabel(id, t)}
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
