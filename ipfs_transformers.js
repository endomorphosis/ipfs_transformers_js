import http from 'http';
import querystring from 'querystring';
import url from 'url';
import { pipeline, env } from '@huggingface/transformers';
import { ipfsModelManagerJs } from '@endomorphosis/ipfs_model_manager_js';
import { requireConfig } from './config/config.js';
const hf_pipeline = pipeline;
const hf_env = env;


export class ipfsTransformersJs {
    constructor() {
        env.cacheDir = './.cache';
        env.localModelPath = '/path/to/models/';
        env.allowRemoteModels = false;
    }
}

async function pipeline(task, model, options) {
    const pipeline = await hf_pipeline(task, model, options);
    return pipeline;
}

async function env() {
    return hf_env;
}

// static task = 'text-classification';
// static model = 'Xenova/distilbert-base-uncased-finetuned-sst-2-english';
// static instance = null;

// static async getInstance(progress_callback = null) {
//   if (this.instance === null) {
//     // NOTE: Uncomment this to change the cache directory
//     // env.cacheDir = './.cache';

//     this.instance = pipeline(this.task, this.model, { progress_callback });
//   }

//   return this.instance;
// }
