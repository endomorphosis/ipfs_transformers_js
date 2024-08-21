//import { pipeline } from '@endomorphosis/ipfs_transformers_js';
import ipfsTransformersJs from '../ipfs_transformers_js/ipfs_transformers.js';

class testPipeline {
  constructor() {
  }

  async test() {
    const test = new ipfsTransformersJs();
    
    return await test.pipeline('text-classification', 'Xenova/distilbert-base-uncased-finetuned-sst-2-english', { progress_callback: null }).then((pipeline) => {
        pipeline.predict('This is a test').then((result) => {
            console.log(result);
        });
    });
  }
}

export default testPipeline;


if (require.main === module) {
  const test = new testPipeline();
  test.test();
}