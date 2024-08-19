import { pipeline } from '@endomorphosis/ipfs_transformers_js';

class testPipeline {
  static task = 'text-classification';
  static model = 'Xenova/distilbert-base-uncased-finetuned-sst-2-english';
  static instance = null;

  static async getInstance(progress_callback = null) {
    if (this.instance === null) {
      this.instance = pipeline(this.task, this.model, { progress_callback });
    }

    return this.instance;
  }
}
export default testPipeline;

testPipeline.getInstance().then((pipeline) => {
    pipeline.predict('This is a test').then((result) => {
        console.log(result);
    });
});


const test = async () => {
    
    return true;
}
module.exports = test;