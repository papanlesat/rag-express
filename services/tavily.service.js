const { TavilySearchResults } = require("@langchain/community/tools/tavily_search");
const { Ollama } = require("@langchain/community/llms/ollama");
const { PromptTemplate } = require("@langchain/core/prompts");

class TavilyService {
    constructor() {
        this.tavilyTool = new TavilySearchResults({
            apiKey: process.env.TAVILY_API_KEY,
            searchDepth: "basic",
            includeAnswer: false,
            includeRawContent: true,
            maxResults: 5
        });

        this.llm = new Ollama({
            baseUrl: process.env.OLLAMA_HOST || "http://localhost:11434",
            model: process.env.OLLAMA_MODEL || "llama2",
        });

        this.searchPrompt = new PromptTemplate({
            template: `Analyze these search results and provide a concise answer:
      
      Question: {question}
      
      Search Results:
      {results}
      
      Final Answer:`,
            inputVariables: ["question", "results"],
        });
    }

    async search(question) {
        try {

            const searchResponse = await this.tavilyTool.invoke({
                input: question
            });

            if (!searchResponse) {
                throw new Error('No results in API response');
            }

            const parsedResults = JSON.parse(searchResponse);

            const formattedResults = parsedResults
                .filter(result => result.url && (result.content || result.title))
                .map((result, index) => {
                    return [
                        `[Source ${index + 1}] ${result.url}`,
                        result.title && `Title: ${result.title}`,
                        result.content && `Content: ${result.content.substring(0, 500)}...`,
                        result.score && `Score: ${result.score.toFixed(2)}`
                    ]
                        .filter(Boolean)
                        .join('\n');
                })
                .join('\n\n');

            const prompt = await this.searchPrompt.format({
                question,
                results: formattedResults
            });

            const answer = await this.llm.invoke(prompt);

            return {
                question,
                answer,
                sources: parsedResults.map(r => r.url).filter(Boolean)
            };

        } catch (error) {
            console.error("Search Error:", error);
            throw new Error(`Search failed: ${error.message}`);
        }
    }
}

module.exports = new TavilyService();