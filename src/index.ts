import { start as startBot } from "./bot";
import { start as startApi } from "./api";
import ClientHelper from "./helpers/clientHelper";

const startSingletons = async () => {
    await ClientHelper.login();
}

(async () => {
    startSingletons();
    startBot();
    startApi();
})();

