import { HfInference } from '@huggingface/inference'

export const hf = new HfInference(process.env.IMAGE_MODEL_TOKEN!)
