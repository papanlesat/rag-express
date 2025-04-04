const aiService = require('../services/ai.service');
const vectorService = require('../services/vector.service');
const tavilyService = require("../services/tavily.service");

class AIController {
    async ask(req, res) {
        try {
            const { question } = req.body;
            if (!question) return res.status(400).json({ error: 'Question is required' });

            const answer = await aiService.askQuestion(question);
            res.json({ question, answer });

        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ error: error.message });
        }
    }

    async askStream(req, res) {
        try {
            const { question } = req.body;
            if (!question) return res.status(400).json({ error: 'Question is required' });

            res.setHeader('Content-Type', 'text/plain');
            await aiService.askStream(question, (chunk) => res.write(chunk));
            res.end();

        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ error: error.message });
        }
    }

    async prepareRAG(req, res) {
        try {
            const { documents } = req.body;
            if (!documents) return res.status(400).json({ error: 'Documents are required' });

            await vectorService.prepareDocuments(documents);
            aiService.enableRAG(vectorService);
            res.json({ status: 'RAG initialized successfully' });

        } catch (error) {
            console.error('RAG Error:', error);
            res.status(500).json({ error: error.message });
        }
    }

    async toggleRAG(req, res) {
        try {
            const { enabled } = req.body;
            if (enabled) {
                aiService.enableRAG(vectorService);
            } else {
                aiService.disableRAG();
            }
            res.json({ status: `RAG ${enabled ? 'enabled' : 'disabled'}` });
        } catch (error) {
            console.error('Toggle Error:', error);
            res.status(500).json({ error: error.message });
        }
    }

    async searchWeb(req, res) {
        try {
            const { question } = req.body;
            const result = await tavilyService.search(question);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new AIController();