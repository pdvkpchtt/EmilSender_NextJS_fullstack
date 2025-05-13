"use server";

import { getStats } from "@/server/stats/getStats";

const { default: Stats } = require("@/components/stats/Stats");

const StatsPage = async () => {
  const data = await getStats();

  return <Stats data={data} />;
};

export default StatsPage;
