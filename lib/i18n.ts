import id from "./locales/id";
import en from "./locales/en";

export type Language = "id" | "en";

const translations: Record<Language, Record<string, string>> = {
  id,
  en,
};

export const useTranslation = (language: Language) => {
  return {
    t: (key: string) => translations[language][key] || key,
    language,
  };
};
