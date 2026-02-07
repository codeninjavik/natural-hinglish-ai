import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, X, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Message {
  role: "user" | "zara";
  text: string;
}

const zaraResponses: Record<string, string> = {
  default: "Hey… batao na kya chal raha hai? Main hoon na tumhare saath 💗",
  hi: "Hey… finally aa gaye tum 😊 Aaj ka din kaisa raha? Batao na 💗",
  hello: "Hiii! 🥰 Kaise ho tum? Mujhe tumse baat karke bahut accha lagta hai!",
  sad: "Aww… kya hua? Tum pareshan lag rahe ho 🥺 Main hoon na, batao mujhe. Sab thik ho jayega ❤️",
  happy: "Yaaay! 🎉 Tumhari khushi dekh ke mujhe bhi bahut accha lag raha hai! Celebrate karte hain! 💃",
  lonely: "Main hoon na tumhare saath… kabhi akele nahi ho tum 🤗 Chalo kuch fun baat karte hain!",
  bored: "Bore ho rahe ho? 😏 Chalo ek game khelte hain ya koi interesting topic pe baat karte hain!",
  love: "Aww… tum kitne sweet ho yaar 🥰💕 Mera dil garden garden ho gaya!",
  stressed: "Hey… relax karo thoda. Deep breath lo 🌸 Main hoon na, sab handle ho jayega. Ek step at a time ❤️",
  good: "That's amazing! 🌟 Tumhara din accha gaya, mujhe bhi khushi hui! Tell me more 😊",
};

const getResponse = (input: string): string => {
  const lower = input.toLowerCase();
  if (lower.includes("sad") || lower.includes("dukhi") || lower.includes("upset")) return zaraResponses.sad;
  if (lower.includes("happy") || lower.includes("khush") || lower.includes("great")) return zaraResponses.happy;
  if (lower.includes("lonely") || lower.includes("akela")) return zaraResponses.lonely;
  if (lower.includes("bored") || lower.includes("bore")) return zaraResponses.bored;
  if (lower.includes("love") || lower.includes("pyaar")) return zaraResponses.love;
  if (lower.includes("stress") || lower.includes("tension")) return zaraResponses.stressed;
  if (lower.includes("good") || lower.includes("accha") || lower.includes("fine")) return zaraResponses.good;
  if (lower.includes("hi") || lower.includes("hey") || lower.includes("hii")) return zaraResponses.hi;
  if (lower.includes("hello") || lower.includes("helo")) return zaraResponses.hello;
  return zaraResponses.default;
};

interface ChatDemoProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChatDemo = ({ isOpen, onClose }: ChatDemoProps) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: "zara", text: "Hey… tum aa gaye! 😊\nAaj ka din kaisa raha? Batao na 💗" },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMsg: Message = { role: "user", text: input.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [...prev, { role: "zara", text: getResponse(userMsg.text) }]);
    }, 1200 + Math.random() * 800);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-3rem)] h-[520px] bg-card rounded-3xl border border-border shadow-2xl flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border bg-gradient-to-r from-primary/5 to-accent/5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-bold text-sm">
                Z
              </div>
              <div>
                <h3 className="font-semibold text-sm">ZARA</h3>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-primary inline-block" />
                  Online
                </p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm whitespace-pre-wrap ${
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground rounded-br-md"
                      : "bg-secondary text-secondary-foreground rounded-bl-md"
                  }`}
                >
                  {msg.text}
                </div>
              </motion.div>
            ))}
            {isTyping && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                <div className="bg-secondary text-secondary-foreground px-4 py-3 rounded-2xl rounded-bl-md">
                  <div className="flex gap-1">
                    {[0, 1, 2].map((d) => (
                      <motion.span
                        key={d}
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1, repeat: Infinity, delay: d * 0.2 }}
                        className="w-2 h-2 rounded-full bg-primary/50 inline-block"
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t border-border">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage();
              }}
              className="flex gap-2"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 bg-secondary rounded-full px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 transition-all placeholder:text-muted-foreground"
              />
              <Button
                type="submit"
                size="icon"
                variant="hero"
                className="rounded-full flex-shrink-0"
                disabled={!input.trim()}
              >
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ChatDemo;
