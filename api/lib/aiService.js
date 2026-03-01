const { OpenAI } = require('openai');

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

exports.analyzeIssue = async (imageUrl, description) => {
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                {
                    role: "system",
                    content: "You are a civic action intelligence assistant. Answer only in valid JSON format."
                },
                {
                    role: "user",
                    content: [
                        {
                            type: "text", text: `Analyze this civic issue: ${description}. Provide categorization, severity, and a 3-level action plan.
            JSON Schema:
            {
              "category": "Pollution" | "Tree Cutting" | "Road Damage" | "Waste",
              "severity": "Low" | "Medium" | "High",
              "aiGuidance": {
                "level1": "string (Immediate safe local action)",
                "level2": "string (Legal complaint steps)",
                "level3": "string (Escalation strategy)"
              }
            }` },
                        {
                            type: "image_url",
                            image_url: {
                                "url": imageUrl,
                            },
                        },
                    ],
                },
            ],
            response_format: { type: "json_object" },
        });

        return JSON.parse(response.choices[0].message.content);
    } catch (error) {
        console.error('AI Analysis Error:', error);
        return {
            category: 'Waste',
            severity: 'Medium',
            aiGuidance: {
                level1: 'Secure the area and alert neighbors.',
                level2: 'Contact local sanitation department.',
                level3: 'Organize a community cleanup and petition.'
            }
        };
    }
};
