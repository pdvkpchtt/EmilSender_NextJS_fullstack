"use server";

import { auth } from "@/auth";
import { prisma } from "../db";

function formatDate(dateStr) {
  const date = new Date(dateStr);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Месяцы с 0
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
}

export const getStats = async () => {
  const session = await auth();

  const data = await prisma.Runs.findMany({
    where: {
      userId: session?.user?.id,
    },
  });

  // Шаг 1: Группировка по дате
  const grouped = data.reduce((acc, item) => {
    const label = formatDate(item.createdAt);
    if (!acc[label]) {
      acc[label] = { success: 0, fail: 0 };
    }
    if (item.success) {
      acc[label].success += 1;
    } else {
      acc[label].fail += 1;
    }
    return acc;
  }, {});

  // Шаг 2: Сортировка по дате
  const sortedDates = Object.keys(grouped).sort(
    (a, b) =>
      new Date(a.split(".").reverse().join("-")) -
      new Date(b.split(".").reverse().join("-"))
  );

  // Шаг 3: Формирование labels и data
  const labels = sortedDates;
  const dataset1Data = sortedDates.map((date) => grouped[date].fail); // Dataset 1 — fail count
  const dataset2Data = sortedDates.map((date) => grouped[date].success); // Dataset 2 — success count

  const dataChart = {
    labels,
    datasets: [
      {
        label: "Отправлено",
        data: dataset2Data,
        borderColor: "rgb(35, 204, 74, 0.8)",
        backgroundColor: "rgba(35, 204, 74, 0.5)",
      },
      {
        label: "Не отправлено",
        data: dataset1Data,
        borderColor: "rgb(250, 52, 52, 0.8)",
        backgroundColor: "rgba(250, 52, 52, 0.5)",
      },
    ],
  };

  return dataChart;
};
