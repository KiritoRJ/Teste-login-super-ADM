
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getPersonalizedGreeting = async (name: string, role: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Gere uma mensagem de boas-vindas curta e inspiradora em português para o usuário ${name} que possui o cargo de ${role}. A mensagem deve ser profissional mas calorosa. Máximo de 2 frases.`,
    });
    return response.text || "Bem-vindo ao sistema! Estamos felizes em ter você aqui.";
  } catch (error) {
    console.error("Gemini Greeting Error:", error);
    return `Olá ${name}, seja bem-vindo ao nosso sistema de gestão corporativa.`;
  }
};
