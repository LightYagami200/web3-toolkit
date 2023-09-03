import axios from "axios";
import { writeFile } from "fs/promises";
import { RPC_URL } from "../plugins/constants";

export async function getNFTs(creator: string) {
  let assets: any = [];
  let totalPages = Infinity;
  let totalItems = 0;
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const fetchPage = async (page: number) => {
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
      const response = await axios.post(RPC_URL, data, config);
      assets = [...assets, ...response.data.result.assets];
      totalPages = response.data.result.totalPages;
      totalItems = response.data.result.totalItems;
    } catch (err) {
      console.log(err);
    }
  };

  const startTime = Date.now();
  for (let i = 1; i <= totalPages; i++) {
    console.log(
      `Fetching page ${i} of ${totalPages < Infinity ? totalPages : "?"}`
    );
    await fetchPage(i);
  }
  const endTime = Date.now();
  const totalTime = (endTime - startTime) / 1000;

  console.log(`Fetched ${assets.length} NFTs in ${totalTime} seconds`);

  // Save to disk
  try {
    await writeFile("nfts.json", JSON.stringify(assets));
    console.log(`Saved ${assets.length} NFTs to nfts.json 🎉`);
  } catch (err) {
    console.error("Error writing file", err);
  }
}
