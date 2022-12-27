import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const generateAction = async (req, res) => {
  const basePromptPrefix = 
`Create a rhymed story with beginning, middle and end in the style of Julia Donaldson on the given topic.

Topic: Mouse takes a stroll.
Story:
A mouse took a stroll through the deep dark wood.
A fox saw the mouse and the mouse looked good.
Where are you going to little brown mouse?
Come and have lunch in my underground house.

Topic: ${req.body.userInput}
Story: 
`;
  // Run first prompt
  console.log(`API: ${basePromptPrefix}${req.body.userInput}`)

  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    //prompt: `${basePromptPrefix}${req.body.userInput}\n`,
    prompt: basePromptPrefix,
    temperature: 0.7,
    max_tokens: 250,
  });
  
  const basePromptOutput = baseCompletion.data.choices.pop();

  res.status(200).json({ output: basePromptOutput });
};

export default generateAction;