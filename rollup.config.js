import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import copy from 'rollup-plugin-copy';
import commonjs from '@rollup/plugin-commonjs';
import {glob} from 'glob';

const inputFiles = glob.sync('./src/*.ts'); 

export default {
    input: inputFiles,
    output: {
        dir: 'public/assets/js',
        format: 'esm',
        sourcemap: false,
        preserveModules: false, // Flatten JS output to avoid nested src/ structure
    },
    plugins: [
        copy({
            targets: [
                // Flatten styles into assets/css
                { src: 'src/assets/css/*.css', dest: 'public/assets/css', flatten: true },
                // Flatten images into assets/img
                { src: 'src/assets/img/*', dest: 'public/assets/img', flatten: true },
            ],
            verbose: true
        }),
        typescript({
            tsconfig: './tsconfig.json'
        }),
        nodeResolve(),
        commonjs()
    ]
}