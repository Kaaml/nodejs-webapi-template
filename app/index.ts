import { Init } from "./init";

(function main() {
    let init = new Init();
    init.configureServer();
    init.configureService();
})()