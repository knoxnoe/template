#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _cli = require("./lib/cli");
(0, _cli.runCLI)().catch((error)=>{
    console.error('Error:', error);
    process.exit(1);
});

//# sourceMappingURL=index.js.map