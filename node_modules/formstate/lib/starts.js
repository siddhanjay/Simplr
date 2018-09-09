"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var starts_1 = require("starts");
starts_1.starts({
    serve: {
        dir: './docs'
    },
    run: [
        { cmd: 'npm run build -- -w', },
        { cmd: 'npm run unittest -- --watch', },
        { cmd: 'npm run docs', },
        { cmd: 'npm run demos', watch: ['src/scripts/**/*'] },
    ]
});
