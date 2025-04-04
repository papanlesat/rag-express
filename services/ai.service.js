const { Ollama } = require('@langchain/community/llms/ollama');
const { PromptTemplate } = require('@langchain/core/prompts');

class AIService {
  constructor() {
    this.llm = new Ollama({
      baseUrl: process.env.OLLAMA_HOST || 'http://localhost:11434',
      model: process.env.OLLAMA_MODEL || 'llama2',
    });

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