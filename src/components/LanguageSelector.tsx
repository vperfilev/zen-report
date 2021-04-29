import react, { FC } from "react";
import { useTranslation } from "react-i18next";

interface Props {}

export const LanguageSelector: FC<Props> = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
  };

  const isRu = i18n.language === "ru";

  return (
    <div className="flex absolute right-0 top-1">
      <button onClick={() => changeLanguage("en")} className={"mr-1 rounded-full focus:outline-none w-9 h-9 shadow-md "  + 
      (isRu ? "bg-blue-100 text-blue-700 opacity-50" : "bg-blue-700 text-blue-100")}>
        EN
      </button>
      <button onClick={() => changeLanguage("ru")} className={"mr-1 rounded-full focus:outline-none w-9 h-9 shadow-md "  + 
      (!isRu ? "bg-blue-100 text-blue-700 opacity-50" : "bg-blue-700 text-blue-100")}>
        RU
      </button>
    </div>
  );
};
