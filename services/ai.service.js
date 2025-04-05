const { Ollama } = require('@langchain/community/llms/ollama');
const { PromptTemplate } = require('@langchain/core/prompts');
const { ChatOpenAI } = require('@langchain/openai');

class AIService {
  constructor() {

    this.llm = this.initializeLLM();

    this.vectorService = null;

    this.ragPrompt = new PromptTemplate({
      template: `Context: {context}\nQuestion: {question}\nAnswer:`,
      inputVariables: ["context", "question"],
    });

    this.defaultPrompt = new PromptTemplate({
      template: `Answer the question: {question}`,
      inputVariables: ["question"],
    });
  }

  initializeLLM() {
    const provider = process.env.LLM_PROVIDER?.toLowerCase() || 'ollama';

    switch (provider) {
      case 'openai':
        console.log('use model openAI')
        return new ChatOpenAI({
          modelName: process.env.OPENAI_MODEL || 'gpt-3.5-turbo',
          temperature: 0.7,
          openAIApiKey: process.env.OPENAI_API_KEY,
        });

      case 'deepseek':
        console.log('use model DeepSeek')
        // Placeholder: DeepSeek may require a custom wrapper
        throw new Error("DeepSeek provider integration is not yet implemented");

      case 'ollama':
      default:
        console.log('use model Ollama')
        return new Ollama({
          baseUrl: process.env.OLLAMA_HOST || 'http://localhost:11434',
          model: process.env.OLLAMA_MODEL || 'llama2',
        });
    }
  }

  enableRAG(vectorService) {
    this.vectorService = vectorService;
  }

  disableRAG() {
    this.vectorService = null;
  }

  async askQuestion(question) {
    let context = '';
    if (this.vectorService) {
      context = await this.vectorService.getRelevantContext(question);
    }

    const prompt = this.vectorService ? this.ragPrompt : this.defaultPrompt;
    const formattedPrompt = await prompt.format({
      context,
      question
    });

    return this.llm.invoke(formattedPrompt);
  }

  async askStream(question, callback) {
    let context = '';
    if (this.vectorService) {
      context = await this.vectorService.getRelevantContext(question);
    }

    const prompt = this.vectorService ? this.ragPrompt : this.defaultPrompt;
    const formattedPrompt = await prompt.format({
      context,
      question
    });

    const stream = await this.llm.stream(formattedPrompt);
    for await (const chunk of stream) {
      callback(chunk);
    }
  }
}

module.exports = new AIService();