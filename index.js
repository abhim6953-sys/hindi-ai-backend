const express = require("express");
const OpenAI = require("openai");
const cors = require("cors"); // नई लाइन: सुरक्षा अनुमति के लिए

const app = express();
app.use(express.json());
app.use(cors()); // नई लाइन: आपके फ्रंटएंड को जुड़ने की अनुमति देने के लिए

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.get("/", (req, res) => {
  res.send("Hindi AI Backend Running");
});

app.post("/generate", async (req, res) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "user", content: "लिखें एक प्रेरणादायक हिंदी विचार (Hindi Motivational Quote) जो इंस्टाग्राम रील के लिए छोटा और प्रभावशाली हो।" }
      ]
    });
    res.json({ result: response.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: "OpenAI Error" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
