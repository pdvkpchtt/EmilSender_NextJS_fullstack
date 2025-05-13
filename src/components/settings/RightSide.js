"use client";

import { ResetPasswordSchema } from "@/schema";
import TextMain from "@/shared/text/TextMain";
import TextSecondary from "@/shared/text/TextSecondary";
import Card from "@/shared/ui/Card";
import { useState } from "react";
import * as XLSX from "xlsx";
import ParsedDataBlock from "./ParsedDataBlock";
import { ButtonPrimary } from "@/shared/ui/Button";
import { sendMainMail } from "@/server/mails/sendMainMail";
import HtmlInputForm from "./HtmlInputForm";
import { setStatsRun } from "@/server/mails/setStatsRun";

const RightSide = () => {
  const [data, setData] = useState([]);
  const [labels, setLabels] = useState({ contact: "", company: "" });
  const [error, setError] = useState(null);
  const [stats, setStats] = useState([]);
  const [emailHTML, setEmailHTML] = useState(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) {
      setError("No file selected.");
      return;
    }

    if (!file.name.endsWith(".xlsx") && !file.name.endsWith(".xls")) {
      setError("Please upload a valid Excel file (.xlsx or .xls).");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const binaryString = event.target.result;
        const workbook = XLSX.read(binaryString, { type: "binary" });

        if (!workbook.SheetNames || workbook.SheetNames.length === 0) {
          setError("The file does not contain any sheets.");
          return;
        }

        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        const parsedData = XLSX.utils.sheet_to_json(sheet, { header: 0 });
        setData(parsedData);
        setError(null);
      } catch (err) {
        setError(
          "Failed to parse the file. Please ensure it is a valid Excel file."
        );
        console.error("Error parsing file:", err);
      }
    };

    reader.onerror = () => {
      setError("Failed to read the file.");
    };

    reader.readAsBinaryString(file);
  };

  const handleSend = () => {
    setStats([]);

    data?.map(async (i) => {
      const validatedFields = ResetPasswordSchema.safeParse({
        email: i[labels.contact]?.replaceAll("\\n", "")?.replaceAll("\\r", ""),
      });

      if (!validatedFields.success) {
        setStats((stats) => [
          ...stats,
          {
            label: `ValidateError: ${i[labels?.company]} - ${
              i[labels?.contact]
            }`,
            status: "error",
          },
        ]);
        await setStatsRun(false);
      } else {
        try {
          await sendMainMail(
            i[labels.contact]?.replaceAll("\\n", "")?.replaceAll("\\r", ""),
            i[labels.company]?.replaceAll("\\n", "")?.replaceAll("\\r", ""),
            emailHTML
          );

          await setStatsRun(true);

          setStats((stats) => [
            ...stats,
            {
              label: `Succes: ${i[labels?.company]} - ${i[labels?.contact]}`,
              status: "success",
            },
          ]);
        } catch (err) {
          await setStatsRun(false);
          setStats((stats) => [
            ...stats,
            {
              label: `UexpectedError: ${i[labels?.company]} - ${
                i[labels?.contact]
              }`,
              status: "error",
            },
          ]);
        }
      }
    });
  };

  return (
    <div className="flex flex-col gap-[12px] [@media(hover)]:ml-[262.77px] w-full">
      {/* file */}
      <Card style="flex flex-col gap-[12px]">
        <TextMain text="Настройка рассылки" style="font-medium" />

        <div className="flex flex-col">
          <TextSecondary
            text={"Файл"}
            style="font-medium text-[12px] select-none leading-[14px] mb-[6px]"
          />
          <input
            type="file"
            accept=".xlsx, .xls"
            className={`px-[12px] p-[12px] ${
              data?.length === 0
                ? "text-[#8f8f8f]"
                : "text-[#2c2c2c] dark:text-white "
            } text-[14px] bg-[#f6f6f8] border-[0.5px] border-[#00afff] dark:bg-[#181d23] placeholder:text-[#bfbfbf] placeholder:select-none dark:placeholder:text-[#8f8f8f] transition duration-[250ms] placeholder:font-normal leading-[18px] tracking-[-0.015em] placeholder:leading-[18px] placeholder:tracking-[-0.015em] rounded-[8px] cursor-pointer w-full`}
            onChange={handleFileUpload}
          />
          {error && (
            <p className="text-[12px] select-none leading-[14px] mt-[3px] text-[#F0BB31]">
              {error}
            </p>
          )}
        </div>
      </Card>
      {/* file */}

      {/* column names */}
      {data?.length > 0 && (
        <ParsedDataBlock data={data} labels={labels} setLabels={setLabels} />
      )}
      {/* column names */}

      {/* html */}
      {labels?.company?.length > 0 && labels?.contact?.length > 0 && (
        <HtmlInputForm setFile={setEmailHTML} file={emailHTML} />
      )}
      {/* html */}

      {labels?.company?.length > 0 &&
        labels?.contact?.length > 0 &&
        data?.length !== 0 &&
        !!emailHTML && <ButtonPrimary text="Запуск" onClick={handleSend} />}

      {/* console */}
      {stats.length > 0 && (
        <div className="w-full rounded-[20px] p-[12px] flex flex-col gap-[12px] bg-black">
          {stats.map((i) => (
            <p
              className={`text-[12px] leading-[14px] ${
                i?.status === "error" ? "text-red-600" : "text-green-600"
              }`}
            >
              {">"} {i?.label}
            </p>
          ))}
        </div>
      )}
      {/* console */}
    </div>
  );
};

export default RightSide;
