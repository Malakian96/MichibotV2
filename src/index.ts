import { start as startBot } from "./bot";
import { start as startApi } from "./api";
import ClientHelper from "./helpers/clientHelper";

const startSingletons = async () => {
  await ClientHelper.login();
};

(async () => {
  try {
    startSingletons();
    startBot();
    startApi();
  } catch (error) {
    console.error("Fatal ERROR on ini", error);
  }
})();
