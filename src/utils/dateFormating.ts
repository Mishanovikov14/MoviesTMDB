import { format, Locale } from "date-fns";
import { enUS, uk, } from "date-fns/locale";

export const formatDate = (dateString: string, locale: string = "en-US") => {
  const locales: Record<string, Locale> = {
    "en-US": enUS,
    "uk": uk,
  };

  return format(new Date(dateString), "d MMMM yyyy", {
    locale: locales[locale] || enUS,
  });
};