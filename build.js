import esbuild from "esbuild";
import fs from "fs";
import path from "path";
import pkg from './package.json' with { type: 'json' };

const dependencies = Object.keys(pkg.dependencies || {});

async function buildBackend() {

    await esbuild.build({
        entryPoints: ["src/index.ts"],
        outfile: "dist/index.js",

        platform: "node",
        target : "node26",

        bundle: true,
        sourcemap: true,
        minify: false,

        alias : {
            "@": "./src",
            "@CSS" : "./src/CSS"
        },
        external: [
            ... dependencies,
            'typescript',
            '@grpc/grpc-js',
            '@grpc/proto-loader',
            'protobufjs'
        ],
        loader : {
            ".html" : "text",
            ".ts" : "ts"
        }
    });

    console.log("Backend built");
}

await Promise.all([
    buildBackend(),
]);