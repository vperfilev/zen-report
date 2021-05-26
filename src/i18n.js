import i18n from "i18next"
import LanguageDetector from "i18next-browser-languagedetector"
import { initReactI18next } from "react-i18next"

const resources = {
  en: {
    translation: {
      "file-load": "Load file",
      "file-clear": "Clear data",
      "incomes": "Earned",
      "other": "Rest transactions",
      "savings": "Savings",
      "outcome": "Outcome",
      "income": "Income", 
      "add": "Add",
      "delete": "Delete",
      "outcomes": "Spent",
      "total-income": "Earned",
      "total-outcome": "Spent",
      "total-balance": "Balance",
      "accounts": "Accounts",
      "details": "Transaction details",
      "date": "Date",
      "amount": "Amount",
      "category": "Category",
      "subcategory": "Subcategory",
      "place": "Place",
      "commentary": "Commentary",
      "transactions": "Transactions",
      "source": "Source",
      "copy": "Copy as a MD table",
      "sum": "Total amount"
    }
  },
  ru: {
    translation: {
      "file-load": "Загрузить",
      "file-clear": "Очистить",
      "incomes": "Доходы",
      "other": "Прочее",
      "savings": "Сбережения",
      "outcome": "Расход", 
      "income": "Доход", 
      "add": "Добавить",
      "delete": "Удалить",
      "outcomes": "Расходы",
      "total-income": "Доход",
      "total-outcome": "Расход",
      "total-balance": "Баланс",
      "accounts": "Счета",
      "details": "Детали",
      "date": "Дата",
      "amount": "Сумма",
      "category": "Категория",
      "subcategory": "Счет",
      "place": "Место",
      "commentary": "Коментарий",
      "transactions": "Транзакции",
      "source": "Источник",
      "copy": "Скопировать как MD таблицу",
      "sum": "Итог"
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next) 
  .init({resources,
    fallbackLng: "en",
    detection: {
      order: ["localStorage", "cookie"],
      cache: ["cookie"]
    },
    keySeparator: false, 

    interpolation: {
      escapeValue: false 
    }
  });

  export default i18n;
