const axios = require('axios');
const fs = require('fs');
const path = require('path');

class ContentGenerator {
    constructor(apiKey, provider = 'openrouter') {
        this.apiKey = apiKey;
        this.provider = provider;
        this.systemPrompt = `You are a viral LinkedIn content strategist. 
        Your goal is to create engaging, professional, and potentially viral posts.
        Focus on:
        - Hook: A strong opening line.
        - Value: Actionable advice or unique insight.
        - Formatting: Clean, easy to read, use of emojis.
        - Call to Action: Encourage engagement.
        - Hashtags: Relevant and high-traffic.`;
    }

    async generatePost(topic, context = "") {
        console.log(`Generating content for topic: ${topic}`);
        
        // Example implementation for OpenRouter (which can route to DeepSeek, GPT-4, etc.)
        const payload = {
            model: "openai/gpt-4-turbo", // Default, can be changed to deepseek/deepseek-chat
            messages: [
                { role: "system", content: this.systemPrompt },
                { role: "user", content: `Write a LinkedIn post about: ${topic}. Additional context: ${context}` }
            ]
        };

        try {
            const response = await axios.post("https://openrouter.ai/api/v1/chat/completions", payload, {
                headers: {
                    "Authorization": `Bearer ${this.apiKey}`,
                    "Content-Type": "application/json"
                }
            });

            if (response.data && response.data.choices && response.data.choices.length > 0) {
                return response.data.choices[0].message.content;
            } else {
                throw new Error("No content generated");
            }
        } catch (error) {
            console.error("Error generating post:", error.message);
            return null;
        }
    }
}

module.exports = ContentGenerator;
