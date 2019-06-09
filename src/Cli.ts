#!/usr/bin/env node

import * as readline from "readline";
import {ClientEventHandler} from "./cli/ClientEventHandler";

readline.emitKeypressEvents(process.stdin);
const prompter = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'Matrix: ',
    historySize: 1
});

const handler = new ClientEventHandler(prompter);

process.stdin.on('keypress', (str, key) => {
    handler.handleKeypress(key.name);
});

prompter.on('line', (line) => {
    handler.handlePrompt(line);
    prompter.prompt();
}).on('close', () => {
    console.log("See you");
    process.exit(0);
});

prompter.prompt();
