import { useTranslation } from "react-i18next";
import Flag from "react-world-flags";

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const languages = [
    { lang: "en", name: "English", code: "GB" },
    { lang: "fr", name: "French", code: "FR" },
    { lang: "dt", name: "German", code: "DE" },
  ];

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <div className="dropdown ms-3">
      <button
        className="btn btn-secondary dropdown-toggle"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        🌐 Language
      </button>
      <ul className="dropdown-menu">
        {languages.map((language) => (
          <li key={language.lang}>
            <button
              className="dropdown-item d-flex align-items-center gap-2"
              onClick={() => changeLanguage(language.lang)}
            >
              <Flag code={language.code} style={{ width: 24, height: 16 }} />
              {language.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LanguageSelector;
