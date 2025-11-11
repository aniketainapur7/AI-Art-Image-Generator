import OpenAI from 'openai'

export const client = new OpenAI({
    baseURL: 'https://api.studio.nebius.com/v1/',
    apiKey: import.meta.env.VITE_NEBIUS_API_KEY,
    dangerouslyAllowBrowser: true
});


export async function generateImage(prompt) {
    const response = await client.images.generate({
    "model": "black-forest-labs/flux-schnell",
    "response_format": "url",
    "response_extension": "png",
    "width": 1024,
    "height": 1024,
    "num_inference_steps": 4,
    "negative_prompt": "",
    "seed": -1,
    "loras": null,
    "prompt": prompt
})

    return response;
}
