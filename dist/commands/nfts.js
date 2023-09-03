"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNFTs = void 0;
const axios_1 = __importDefault(require("axios"));
const promises_1 = require("fs/promises");
const constants_1 = require("../plugins/constants");
function getNFTs(creator) {
    return __awaiter(this, void 0, void 0, function* () {
        let assets = [];
        let totalPages = Infinity;
        let totalItems = 0;
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        const fetchPage = (page) => __awaiter(this, void 0, void 0, function* () {
            const data = {
                jsonrpc: "2.0",
                id: 1,
                method: "qn_fetchNFTsByCreator",
                params: [
                    {
                        creator: creator,
                        page: page,
                        perPage: 40,
                    },
                ],
            };
            try {
                const response = yield axios_1.default.post(constants_1.RPC_URL, data, config);
                assets = [...assets, ...response.data.result.assets];
                totalPages = response.data.result.totalPages;
                totalItems = response.data.result.totalItems;
            }
            catch (err) {
                console.log(err);
            }
        });
        const startTime = Date.now();
        for (let i = 1; i <= totalPages; i++) {
            console.log(`Fetching page ${i} of ${totalPages < Infinity ? totalPages : "?"}`);
            yield fetchPage(i);
        }
        const endTime = Date.now();
        const totalTime = (endTime - startTime) / 1000;
        console.log(`Fetched ${assets.length} NFTs in ${totalTime} seconds`);
        // Save to disk
        try {
            yield (0, promises_1.writeFile)("nfts.json", JSON.stringify(assets));
            console.log(`Saved ${assets.length} NFTs to nfts.json 🎉`);
        }
        catch (err) {
            console.error("Error writing file", err);
        }
    });
}
exports.getNFTs = getNFTs;
//# sourceMappingURL=nfts.js.map