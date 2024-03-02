const express = require("express");
const dotenv = require("dotenv");
const { OpenAI } = require("openai");

dotenv.config();

const router = express.Router();

const openai = new OpenAI(process.env.OPENAI_API_KEY);

router.post("/chat", async (req, res) => {
  const { prompt } = req.body;
  console.log("Received prompt:", prompt);
  const variable = "give me just posible disease and bullet point";
  const charDoctor =
    "you are speacialist doctor in all the fields and you are analysizing a patient on the basis of allersis medical history ";

  try {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error("Missing OPENAI_API_KEY environment variable");
    }

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "assistant",
          content: prompt + variable,
        },
      ],
      temperature: 1,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    res.send(response.choices[0].message.content);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Interval Server Error");
  }
});

module.exports = router;
