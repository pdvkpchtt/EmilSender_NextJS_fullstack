"use client";

import { usePathname, useRouter } from "next/navigation";

import EmailIcon from "@/shared/icons/EmailIcon";
import StatsIcon from "@/shared/icons/StatsIcon";

const SettingsNav = () => {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <>
      <div
        className={`bg-white dark:bg-[#181d23] flex flex-row gap-[6px] p-[12px] rounded-[20px] items-center cursor-pointer`}
        onClick={() => router.push("/settings")}
      >
        <EmailIcon active={pathname === "/settings"} />

        <p
          className={`break-words font-medium text-[14px] leading-[20px] ${
            pathname === "/settings" ? "text-[#00afff]" : "text-[#fff]"
          }`}
        >
          Рассылка
        </p>
      </div>

      <div
        className={`bg-white dark:bg-[#181d23] flex flex-row gap-[6px] p-[12px] rounded-[20px] items-center cursor-pointer`}
        onClick={() => router.push("/stats")}
      >
        <StatsIcon active={pathname === "/stats"} />

        <p
          className={`break-words font-medium text-[14px] leading-[20px] ${
            pathname === "/stats" ? "text-[#00afff]" : "text-[#fff]"
          }`}
        >
          Статистика
        </p>
      </div>
    </>
  );
};

export default SettingsNav;
