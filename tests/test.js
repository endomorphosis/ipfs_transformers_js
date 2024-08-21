//import { pipeline } from '@endomorphosis/ipfs_transformers_js';
import ipfsTransformersJs from '../ipfs_transformers_js/ipfs_transformers.js';

class testIpfsTransformersJs {
  constructor() {
  }

  async init() {
    let meta = {};
    this.thisDir = path.dirname(import.meta.url);
    if (this.thisDir.startsWith("file://")) {
        this.thisDir = this.thisDir.replace("file://", "");
    }
    this.parentDir = path.dirname(this.thisDir);
    if (fs.existsSync(path.join(this.parentDir, "config", "config.toml"))) {
        this.config = new requireConfig({config: path.join(this.parentDir, "config", "config.toml")});
    }
    else{
        // this.config = new requireConfig();
    }
    for (let key in this.config) {
        this[key] = meta[key];
    }
    this.test = new ipfsTransformersJs(null, meta);
    
  }

  async test() {
    
    return await test.pipeline('text-classification', 'Xenova/distilbert-base-uncased-finetuned-sst-2-english', { progress_callback: null }).then((pipeline) => {
        pipeline.predict('This is a test').then((result) => {
            console.log(result);
        });
    });
  }
}

export default testIpfsTransformersJs;


if (require.main === module) {
  const test = new testPipeline();
  try{
    test.init();
    test.test();
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}