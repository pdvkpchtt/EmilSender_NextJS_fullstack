import { motion, AnimatePresence } from "framer-motion";

import TextMain from "@/shared/text/TextMain";
import TextSecondary from "@/shared/text/TextSecondary";

const HtmlInputForm = ({ setFile = () => {}, file = null }) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`bg-white dark:bg-[#181d23] rounded-[20px] p-[12px] flex w-full flex-col gap-[12px]`}
      >
        <TextMain text="HTML файл письма" style="font-medium" />

        <div className="flex flex-col">
          <TextSecondary
            text={"HTML файл"}
            style="font-medium text-[12px] select-none leading-[14px] mb-[6px]"
          />
          <input
            type="file"
            accept=".html"
            className={`px-[12px] p-[12px] ${
              !file ? "text-[#8f8f8f]" : "text-[#2c2c2c] dark:text-white "
            } text-[14px] bg-[#f6f6f8] border-[0.5px] border-[#00afff] dark:bg-[#181d23] placeholder:text-[#bfbfbf] placeholder:select-none dark:placeholder:text-[#8f8f8f] transition duration-[250ms] placeholder:font-normal leading-[18px] tracking-[-0.015em] placeholder:leading-[18px] placeholder:tracking-[-0.015em] rounded-[8px] cursor-pointer w-full`}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (!file) return;

              const reader = new FileReader();

              reader.onload = (event) => {
                const htmlContent = event.target?.result;

                const formData = new FormData();
                formData.append("htmlContent", htmlContent || "");

                setFile(formData);
              };

              reader.readAsText(file);
            }}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default HtmlInputForm;
