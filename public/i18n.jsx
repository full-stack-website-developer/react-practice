import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    returnObjects: true,
    ns: ["addBrand", "showBrand", "header", "footer", "sidebar", "addProduct", "common"],
    defaultNS: "common", 

    lng: "en",

    backend: {
      loadPath: (lng, namespaces) => {
        const folder = namespaces.includes("header") || namespaces.includes("common") || namespaces.includes("footer") || namespaces.includes("sidebar") ? "common" : (namespaces.includes("addProduct") ? "product" : "brand");
        return `/locale/${lng}/${folder}/${namespaces}.json`;
      },
    },

    interpolation: {
      escapeValue: false, 
    },
  });

export default i18n;
