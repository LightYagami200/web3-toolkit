"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Imports
const figlet_1 = __importDefault(require("figlet"));
const commander_1 = require("commander");
const constants_1 = require("./plugins/constants");
const nfts_1 = require("./commands/nfts");
// Init
const program = new commander_1.Command();
console.log(figlet_1.default.textSync(constants_1.APP_NAME));
program
    .version("0.0.1")
    .description("A toolkit for solana web3 development")
    .option("-n, --nfts <value>", "List NFTs for a given candy machine")
    .parse(process.argv);
const options = program.opts();
// Main
if (options.nfts)
    (0, nfts_1.getNFTs)(options.nfts);
//# sourceMappingURL=index.js.map