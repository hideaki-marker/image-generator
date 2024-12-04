import { useState } from "react"


function App() {
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState("");

  const apiHost = "https://api.stability.ai";
  const engineId = "stable-diffusion-v1-6";
  const apiKey= import.meta.env.VITE_STABLITY_API_KEY;
  const handleGenerateImage = async () => {
    const response = await fetch(
      `${apiHost}/v1/generation/${engineId}/text-to-image`,
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      text_prompts: [
        {
          text: prompt,
        },
      ],
      cfg_scale: 7,
      height: 1024,
      width: 1024,
      steps: 30,
      samples: 1,
    }),
  }
    );
    if(!response.ok){
      throw Error('Failed to generate image');
    }
    const responseJson = await response.json();
    const base64Image = responseJson.artifacts[0].base64;
    setGeneratedImage(`data:image/png;base64,${base64Image}`);
  }
  return (
    <>
        <div>
          <input type="text"  className="border" value={prompt} onChange={(e) => setPrompt(e.target.value)}/>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={handleGenerateImage}>
            生成
          </button>
          {generatedImage &&(
            <img src={generatedImage} alt="生成された画像" />
          )}
          
        </div>
    </>
  )
}

export default App
