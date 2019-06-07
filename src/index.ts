#!/usr/bin/env node

import * as readline from "readline";
import logger from "./logging/Logger";

console.log("Hi");
let prompt = 'OHAI>';

readline.emitKeypressEvents(process.stdin);
const prompter = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'OHAI> ',
    historySize: 1
});

process.stdin.on('keypress', (str, key) => {
  // console.log(`Pressed str: ${str} and key: ${key.name}`);
});


prompter.prompt();

prompter.on('line', (line) => {
  switch (line.trim()) {
      case 'hello' :
          console.log("Hi to you as well");
          logger.info("Wut");
          break;
      case 'clear' :
          console.log("Clearing");
          console.clear();
          break;
      case 'ohai' :
          prompt = `OHAI${prompt}`;
          prompter.setPrompt(prompt);
          break;
      case 'stop' :
          console.log("RUDE");
          process.exit(1);
          break;
  }
  prompter.prompt();
}).on('close', () => {
    console.log("Farewell!");
    process.exit(0);
});