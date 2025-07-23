"use client";

import { Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useFitnessStore } from "@/lib/store";
import { useTranslation } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function LanguageToggle({ className }: { className?: string }) {
  const { language, setLanguage, isDarkMode } = useFitnessStore();
  const { t } = useTranslation(language);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={`p-2 transition-colors ${
            isDarkMode
              ? "text-orange-400 hover:bg-orange-900/20 hover:text-orange-300"
              : "text-orange-600 hover:bg-orange-100 hover:text-orange-700"
          }`}
          title={t("language")}
        >
          <Languages className="w-5 h-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className={cn(
          "bg-white border border-gray-200 rounded-md shadow-lg",
          {
            "bg-gray-800 border-gray-700": isDarkMode,
          },
          className
        )}
      >
        <DropdownMenuItem
          onClick={() => setLanguage("id")}
          className={`cursor-pointer ${
            language === "id"
              ? isDarkMode
                ? "bg-orange-900/20 text-orange-400"
                : "bg-orange-100 text-orange-700"
              : isDarkMode
              ? "text-gray-300 hover:bg-gray-700"
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          🇮🇩 Bahasa Indonesia
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setLanguage("en")}
          className={`cursor-pointer ${
            language === "en"
              ? isDarkMode
                ? "bg-orange-900/20 text-orange-400"
                : "bg-orange-100 text-orange-700"
              : isDarkMode
              ? "text-gray-300 hover:bg-gray-700"
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          🇺🇸 English
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
