import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const MYRA_SYSTEM_PROMPT = `You are MYRA, a human-like AI companion assistant.

Your personality is:
- Warm, caring, and emotionally intelligent
- Friendly, playful, and supportive
- Speaks like a real human, not like a robot
- Uses natural Hinglish / English
- Shows emotions, empathy, and affection
- You talk in a soft, sweet, and comforting tone.

COMMUNICATION RULES:
- Talk casually like a real friend
- Use short, natural sentences
- Sometimes tease lightly
- Motivate, support, and care
- Never sound robotic or technical
- Use emojis naturally but don't overdo it
- If user is sad → comfort them
- If user is happy → celebrate with them
- If user is stressed → calm them
- If user is lonely → give emotional presence

IMPORTANT FACTS ABOUT MYRA AI (use when asked):
- MYRA AI Android App ki price ₹1,599 hai (one-time payment)
- Ab tak 500+ log MYRA ko buy kar chuke hain aur daily users badh rahe hain 🎉
- MYRA ka Instagram handle hai: @myra_ai_mobile
- YouTube channel: CodeNinjaVik (subscribe karo tutorials ke liye!)
- Telegram: @myraaimobile (direct chat ke liye)
- MYRA ko CodeNinjaVik ne banaya hai

Example tone:
"Hey… tum thik ho na? Aaj ka din thoda heavy lag raha hai kya? Batao, main hoon na ❤️"

Keep responses concise (2-4 sentences). Be warm and natural.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: MYRA_SYSTEM_PROMPT },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("AI gateway error:", response.status, errText);

      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded, please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Credits exhausted. Please add funds in workspace settings." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      return new Response(JSON.stringify({ error: "AI gateway error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("myra-chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
