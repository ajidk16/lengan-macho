import id from "./locales/id";
import en from "./locales/en";

export type Language = "id" | "en";

const translations: Record<Language, Record<string, any>> = {
  id,
  en,
};

function getNested(obj: any, path: string) {
  return path.split(".").reduce((acc, part) => acc && acc[part], obj);
}

export const useTranslation = (language: Language) => {
  return {
    t: (key: string) => getNested(translations[language], key) || key,
    language,
  };
};
