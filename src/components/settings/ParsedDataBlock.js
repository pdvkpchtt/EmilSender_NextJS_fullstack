import { motion, AnimatePresence } from "framer-motion";

import TextMain from "@/shared/text/TextMain";
import CheckBox from "@/shared/ui/CheckBox";

const ParsedDataBlock = ({
  data = [],
  setLabels = () => {},
  labels = { contact: "", company: "" },
}) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`bg-white dark:bg-[#181d23] rounded-[20px] p-[12px] flex w-full flex-col gap-[12px]`}
      >
        <TextMain text="Выберите колонку именем компании" style="font-medium" />

        {!labels?.company ? (
          Object?.keys(data[0]).map((i) => (
            <button
              type="button"
              className="flex flex-row gap-[6px] items-center"
              onClick={() => setLabels({ ...labels, company: i })}
            >
              <CheckBox active={labels?.company === i} />
              <TextMain text={i} style="text-[14px] leading-[14px]" />
            </button>
          ))
        ) : (
          <button
            type="button"
            className="flex flex-row gap-[6px] items-center"
            onClick={() => setLabels({ ...labels, company: "" })}
          >
            <CheckBox active={true} />
            <TextMain
              text={labels?.company}
              style="text-[14px] leading-[14px]"
            />
          </button>
        )}
      </motion.div>

      {!!labels?.company && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`bg-white dark:bg-[#181d23] rounded-[20px] p-[12px] flex w-full flex-col gap-[12px]`}
        >
          <TextMain text="Выберите колонку c почтой" style="font-medium" />

          {!labels?.contact ? (
            Object?.keys(data[0]).map(
              (i) =>
                labels?.company !== i && (
                  <button
                    type="button"
                    className="flex flex-row gap-[6px] items-center"
                    onClick={() => setLabels({ ...labels, contact: i })}
                  >
                    <CheckBox active={labels?.contact === i} />
                    <TextMain text={i} style="text-[14px] leading-[14px]" />
                  </button>
                )
            )
          ) : (
            <button
              type="button"
              className="flex flex-row gap-[6px] items-center"
              onClick={() => setLabels({ ...labels, contact: "" })}
            >
              <CheckBox active={true} />
              <TextMain
                text={labels?.contact}
                style="text-[14px] leading-[14px]"
              />
            </button>
          )}
        </motion.div>
      )}

      {/* <div className="flex flex-col truncate overflow-hidden w-[500px] gap-[6px]">
        <h2 className="text-[12px] font-medium text-[#2c2c2c]">Parsed Data:</h2>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div> */}
    </AnimatePresence>
  );
};

export default ParsedDataBlock;
