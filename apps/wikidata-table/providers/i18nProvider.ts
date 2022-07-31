import englishMessages from "../i18n/en";
import polyglotI18nProvider from "ra-i18n-polyglot";
import { I18nProvider } from "react-admin";

export const i18nProvider: I18nProvider = polyglotI18nProvider(
  (locale) => englishMessages,
  "en"
);
