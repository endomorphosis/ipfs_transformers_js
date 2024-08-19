import path from 'path';
import fs from 'fs';
import http from 'http';
import querystring from 'querystring';
import url from 'url';
import { pipeline, env } from '@huggingface/transformers';
// import { ipfsModelManager } from 'ipfs_model_manager_js';
import { requireConfig } from '../config/config.js';
const hf_pipeline = pipeline;
const hf_env = env;


export class ipfsTransformersJs {
    constructor() {
        this.thisDir = path.dirname(import.meta.url);
        if (this.thisDir.startsWith("file://")) {
            this.thisDir = this.thisDir.replace("file://", "");
        }
        this.parentDir = path.dirname(this.thisDir);
        if (fs.existsSync(path.join(this.parentDir, "config", "config.toml"))) {
            this.config = new requireConfig({config: path.join(this.parentDir, "config", "config.toml")});
            this.s3cfg = this.config.s3;
        }
        else{
            // this.config = new requireConfig();
        }

        hf_env.cacheDir = './.cache';
        hf_env.localModelPath = '/path/to/models/';
        hf_env.allowRemoteModels = false;
    }

    async pipeline(task, model, options) {
        const pipeline = await hf_pipeline(task, model, options);
        return pipeline;
    }

    async env() {
        return hf_env;
    }
}

function test() {
    const test = new ipfsTransformersJs();
    test.pipeline('text-classification', 'Xenova/distilbert-base-uncased-finetuned-sst-2-english', { progress_callback: null }).then((pipeline) => {
        pipeline.predict('This is a test').then((result) => {
            console.log(result);
        });
    });
}

test();