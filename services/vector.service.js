const { Document } = require('@langchain/core/documents');
const { RecursiveCharacterTextSplitter } = require('langchain/text_splitter');
const { OllamaEmbeddings } = require('@langchain/community/embeddings/ollama');
const { FaissStore } = require('@langchain/community/vectorstores/faiss');

class VectorService {
  constructor() {
    this.embeddings = new OllamaEmbeddings({
      model: process.env.OLLAMA_MODEL || 'llama2',
      baseUrl: process.env.OLLAMA_HOST || 'http://localhost:11434',
    });
    this.vectorStore = null;
  }

  async prepareDocuments(documents, chunkSize = 1000, chunkOverlap = 200) {
    const splitter = new RecursiveCharacterTextSplitter({ 
      chunkSize, 
      chunkOverlap 
    });

    const docs = await splitter.splitDocuments(
      documents.map(content => new Document({ pageContent: content }))
    );

    this.vectorStore = await FaissStore.fromDocuments(
      docs,
      this.embeddings
    );
  }

  async getRelevantContext(question) {
    if (!this.vectorStore) {
      throw new Error('Vector store not initialized. Call prepareDocuments() first.');
    }
    
    const results = await this.vectorStore.similaritySearch(question, 3);
    return results.map(doc => doc.pageContent).join('\n\n');
  }
}

module.exports = new VectorService();