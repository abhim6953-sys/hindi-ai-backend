const express = require("express");
const OpenAI = require("openai");

const app = express();
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.get("/", (req, res) => {
  res.send("Hindi AI Backend Running 🚀");
});

app.post("/generate", async (req, res) => {
  try {
    const { topic } = req.body;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are a Hindi motivational script writer."
        },
        {
          role: "user",
          content: `Write a powerful Hindi motivational script on: ${topic}`
        }
      ],
    });

    res.json({
      script: response.choices[0].message.content
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
