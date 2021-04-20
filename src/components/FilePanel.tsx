import * as React from "react";
import { State } from "../redux/reducer";
import { connect } from "react-redux";
import { AnyAction, bindActionCreators, Dispatch } from "redux";

import { PrimaryButton, SecondaryButton } from "./elements";
import { PutTransactions } from "./../redux/actionCreators";
import { Transaction } from "./../models";

const mapStateToProps = (state: State) => ({});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators({ PutTransactions }, dispatch);

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

function FilePanel({ PutTransactions }: Props) {
  return (
    <div className="flex-grow flex self-end mb-3 ml-6">
      <div className="flex-grow border-2 border-gray-300 mr-1 ml-32 align-middle p-2">
        fileName.csv
      </div>
      <div className="w-64 flex">
        <PrimaryButton text="Загрузить" onClick={() => PutTransactions(fakeData)} />
        <SecondaryButton text="Очистить" onClick={() => PutTransactions([])} />
      </div>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(FilePanel);

const fakeData: Transaction[] = [
  {
    category: "Зарплата",
    subCategory: "",
    time: 44263,
    amount: 18000,
    account: "Кредитка",
    place: "Е+",
    comment: "Зарплата",
    id: "1",
    reportId: undefined,
  },
  {
    category: "Зарплата",
    subCategory: "",
    time: 44280,
    amount: 12000,
    account: "Кредитка",
    place: "Е+",
    comment: "Зарплата (аванс)",
    id: "2",
    reportId: undefined,
  },
  {
    category: "Зарплата",
    subCategory: "Переработки",
    time: 44281,
    amount: 1250,
    account: "Наличные",
    place: "",
    comment: "",
    id: "3",
    reportId: undefined,
  },
  {
    category: "Зарплата",
    subCategory: "Переработки",
    time: 44282,
    amount: 5570,
    account: "Наличные",
    place: "",
    comment: "",
    id: "4",
    reportId: undefined,
  },
  {
    category: "",
    subCategory: "",
    time: 44282,
    amount: 5570,
    account: "Наличные",
    place: "",
    comment: "Без категорий",
    id: "115",
    reportId: undefined,
  },
  {
    category: "",
    subCategory: "",
    time: 44282,
    amount: 5570,
    account: "Наличные",
    place: "",
    comment: "Без категорий",
    id: "114",
    reportId: undefined,
  },
  {
    category: "Без под категорий",
    subCategory: "",
    time: 44282,
    amount: 5570,
    account: "Наличные",
    place: "",
    comment: "Без под категорий",
    id: "125",
    reportId: undefined,
  },
  {
    category: "Без под категорий",
    subCategory: "",
    time: 44282,
    amount: 5570,
    account: "Наличные",
    place: "",
    comment: "Без под категорий",
    id: "124",
    reportId: undefined,
  },
  {
    category: "Зарплата",
    subCategory: "Премии",
    time: 44283,
    amount: 28000,
    account: "VTB",
    place: "",
    comment: "",
    id: "5",
    reportId: undefined,
  },
  {
    category: "Зарплата",
    subCategory: "Премии",
    time: 44284,
    amount: 1000,
    account: "VTB",
    place: "",
    comment: "",
    id: "6",
    reportId: undefined,
  },
  {
    category: "Прочее",
    subCategory: "Таксовал",
    time: 44285,
    amount: 1500,
    account: "Наличные",
    place: "",
    comment: "",
    id: "7",
    reportId: undefined,
  },
  {
    category: "Прочее",
    subCategory: "Озвучки",
    time: 44282,
    amount: 7000,
    account: "Наличные",
    place: "Олег Чупиков",
    comment: "Первый том Атланта",
    id: "8",
    reportId: undefined,
  },
  {
    category: "Второстепенно",
    subCategory: "Всякие фигульки",
    time: 44257,
    amount: -500,
    account: "Наличные",
    place: "",
    comment: "",
    id: "9",
    reportId: undefined,
  },
  {
    category: "Второстепенно",
    subCategory: "Всякие фигульки",
    time: 44264,
    amount: -500,
    account: "Наличные",
    place: "",
    comment: "",
    id: "10",
    reportId: undefined,
  },
  {
    category: "Второстепенно",
    subCategory: "Всякие фигульки",
    time: 44271,
    amount: -500,
    account: "Наличные",
    place: "",
    comment: "",
    id: "11",
    reportId: undefined,
  },
  {
    category: "Второстепенно",
    subCategory: "Всякие фигульки",
    time: 44278,
    amount: -500,
    account: "Наличные",
    place: "",
    comment: "",
    id: "12",
    reportId: undefined,
  },
  {
    category: "Второстепенно",
    subCategory: "Всякие фигульки",
    time: 44285,
    amount: -500,
    account: "Наличные",
    place: "",
    comment: "",
    id: "13",
    reportId: undefined,
  },
  {
    category: "Первостепенно",
    subCategory: "Детки",
    time: 44276,
    amount: -1500,
    account: "Наличные",
    place: "",
    comment: "Подарок саше",
    id: "14",
    reportId: undefined,
  },
  {
    category: "Первостепенно",
    subCategory: "Детки",
    time: 44276,
    amount: -600,
    account: "Наличные",
    place: "",
    comment: "Школа",
    id: "15",
    reportId: undefined,
  },
  {
    category: "Второстепенно",
    subCategory: "Кафе и рестораны",
    time: 44263,
    amount: -150,
    account: "VTB",
    place: "",
    comment: "Ланч",
    id: "16",
    reportId: undefined,
  },
  {
    category: "Второстепенно",
    subCategory: "Кафе и рестораны",
    time: 44264,
    amount: -150,
    account: "VTB",
    place: "",
    comment: "Ланч",
    id: "17",
    reportId: undefined,
  },
  {
    category: "Второстепенно",
    subCategory: "Кафе и рестораны",
    time: 44265,
    amount: -150,
    account: "VTB",
    place: "",
    comment: "Ланч",
    id: "18",
    reportId: undefined,
  },
  {
    category: "Второстепенно",
    subCategory: "Кафе и рестораны",
    time: 44266,
    amount: -150,
    account: "VTB",
    place: "",
    comment: "Ланч",
    id: "19",
    reportId: undefined,
  },
  {
    category: "Второстепенно",
    subCategory: "Кафе и рестораны",
    time: 44267,
    amount: -150,
    account: "Наличные",
    place: "",
    comment: "Ланч",
    id: "20",
    reportId: undefined,
  },
  {
    category: "Второстепенно",
    subCategory: "Кафе и рестораны",
    time: 44270,
    amount: -150,
    account: "Наличные",
    place: "",
    comment: "Ланч",
    id: "21",
    reportId: undefined,
  },
  {
    category: "Второстепенно",
    subCategory: "Кафе и рестораны",
    time: 44271,
    amount: -150,
    account: "Наличные",
    place: "",
    comment: "Ланч",
    id: "22",
    reportId: undefined,
  },
  {
    category: "Второстепенно",
    subCategory: "Кафе и рестораны",
    time: 44272,
    amount: -150,
    account: "VTB",
    place: "",
    comment: "Ланч",
    id: "23",
    reportId: undefined,
  },
  {
    category: "Второстепенно",
    subCategory: "Кафе и рестораны",
    time: 44273,
    amount: -150,
    account: "Наличные",
    place: "",
    comment: "Ланч",
    id: "24",
    reportId: undefined,
  },
  {
    category: "Второстепенно",
    subCategory: "Кафе и рестораны",
    time: 44274,
    amount: -150,
    account: "Наличные",
    place: "",
    comment: "Ланч",
    id: "25",
    reportId: undefined,
  },
  {
    category: "Второстепенно",
    subCategory: "Кафе и рестораны",
    time: 44277,
    amount: -150,
    account: "Наличные",
    place: "",
    comment: "Ланч",
    id: "26",
    reportId: undefined,
  },
  {
    category: "Второстепенно",
    subCategory: "Кафе и рестораны",
    time: 44278,
    amount: -150,
    account: "VTB",
    place: "",
    comment: "Ланч",
    id: "27",
    reportId: undefined,
  },
  {
    category: "Второстепенно",
    subCategory: "Кафе и рестораны",
    time: 44279,
    amount: -150,
    account: "Наличные",
    place: "",
    comment: "Ланч",
    id: "28",
    reportId: undefined,
  },
  {
    category: "Второстепенно",
    subCategory: "",
    time: 44280,
    amount: -150,
    account: "Наличные",
    place: "",
    comment: "Ланч",
    id: "29",
    reportId: undefined,
  },
  {
    category: "Второстепенно",
    subCategory: "",
    time: 44281,
    amount: -150,
    account: "Наличные",
    place: "",
    comment: "Ланч",
    id: "30",
    reportId: undefined,
  },
  {
    category: "",
    subCategory: "",
    time: 44284,
    amount: -150,
    account: "Наличные",
    place: "",
    comment: "Ланч",
    id: "31",
    reportId: undefined,
  },
  {
    category: "",
    subCategory: "",
    time: 44285,
    amount: -150,
    account: "Наличные",
    place: "",
    comment: "Ланч",
    id: "32",
    reportId: undefined,
  },
  {
    category: "Второстепенно",
    subCategory: "Кафе и рестораны",
    time: 44286,
    amount: -150,
    account: "Наличные",
    place: "",
    comment: "Ланч",
    id: "33",
    reportId: undefined,
  },
  {
    category: "Первостепенно",
    subCategory: "Машина",
    time: 44279,
    amount: -1520,
    account: "Кредитка",
    place: "",
    comment: "бензин",
    id: "34",
    reportId: undefined,
  },
  {
    category: "Первостепенно",
    subCategory: "Платежи, комиссии",
    time: 44266,
    amount: -2100,
    account: "Кредитка",
    place: "",
    comment: "ТСЖ (свет+жкх)",
    id: "35",
    reportId: undefined,
  },
  {
    category: "Первостепенно",
    subCategory: "Платежи, комиссии",
    time: 44283,
    amount: -450,
    account: "Кредитка",
    place: "анНет",
    comment: "Инет",
    id: "36",
    reportId: undefined,
  },
  {
    category: "Первостепенно",
    subCategory: "Продукты",
    time: 44274,
    amount: -1445,
    account: "Кредитка",
    place: "Остров",
    comment: "Продукты",
    id: "37",
    reportId: undefined,
  },
  {
    category: "Первостепенно",
    subCategory: "Продукты",
    time: 44282,
    amount: -3460,
    account: "Наличные",
    place: "Остров",
    comment: "Продукты",
    id: "38",
    reportId: undefined,
  },
];
