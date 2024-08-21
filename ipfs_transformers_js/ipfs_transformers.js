import path from 'path';
import fs from 'fs';
import http from 'http';
import querystring from 'querystring';
import url from 'url';
import { pipeline, env } from '@huggingface/transformers';
import { ipfsModelManager } from 'ipfs_model_manager_js';
import { requireConfig } from '../config/config.js';

export class ipfsTransformersJs {
    constructor(resources = null, meta = {}) {
        this.thisDir = path.dirname(import.meta.url);
        if (this.thisDir.startsWith("file://")) {
            this.thisDir = this.thisDir.replace("file://", "");
        }
        this.parentDir = path.dirname(this.thisDir);
        if (fs.existsSync(path.join(this.parentDir, "config", "config.toml"))) {
            this.config = new requireConfig({config: path.join(this.parentDir, "config", "config.toml")});
            this.s3cfg = this.config.s3;
            meta.s3cfg = this.s3cfg;
        }
        else{
            // this.config = new requireConfig();
        }
        for (let key in this.config){
            meta[key] = this.config[key];
        }
        this.hf_pipeline = pipeline;
        this.hf_env = env;
        this.hf_env.cacheDir = this.config.paths.localPath;
        this.hf_env.localModelPath = this.config.paths.localPath;
        this.hf_env.allowRemoteModels = false;
        this.ipfsModelManager = new ipfsModelManager(resources, meta);
    }

    async init() {
        this.ipfsModelManager.init();
        this.ipfsModelManager.loadCollectionCache();
        // await this.state();
        await this.state({src: "local"});
        // await this.state({src: "ipfs"});
        // await this.state({src: "https"});
        await this.loadCollectionCache();
    }

    async pipeline(task, model, options) {
        await this.init();
        await this.ipfsModelManager.downloadModel(model);
        const pipeline = await this.hf_pipeline(task, model, options);
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