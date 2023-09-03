#! /usr/bin/env node

// Imports
import figlet from "figlet";
import { Command } from "commander";
import { APP_NAME } from "./plugins/constants";
import { getNFTs } from "./commands/nfts";

// Init
const program = new Command();

console.log(figlet.textSync(APP_NAME));

program
  .version("0.0.1")
  .description("A toolkit for solana web3 development")
  .option("-n, --nfts <value>", "List NFTs for a given creator address")
  .parse(process.argv);

const options = program.opts();

// Main
if (options.nfts) getNFTs(options.nfts);
