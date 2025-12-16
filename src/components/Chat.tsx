"use client";
import { Button } from "@/components/ui/button";
import { ArrowUpLeft, Calendar } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { contactContent } from "@/lib/constants/pages/contact";

export default function Chat() {
  const chatRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  // const [isTyping, setIsTyping] = useState(false); // Removed unused state
  const [messages, setMessages] = useState<
    Array<{ text: string; sender: "user" | "bot" }>
  >([]);

  // ... (lines 19-36 omitted)

  const shouldShowCalendlyButton = (text: string) => {
    return text.toLowerCase().includes('schedule') || text.toLowerCase().includes('call');
  };

  const handleSend = async () => {
    if (message.trim()) {
      const userMessage = message.trim();
      setMessage("");

      // Add user message to the conversation
      const updatedMessages = [...messages, { text: userMessage, sender: "user" as const }];
      setMessages(updatedMessages);
      // setIsTyping(true); // Removed

      try {
        // ... fetch code ...
      } catch (error) {
        console.error(error);
        // ... error handling ...
      } finally {
        // setIsTyping(false); // Removed
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
    // setIsTyping(e.target.value.length > 0); // Removed
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-50 " ref={chatRef}>
      {/* Chat Dialog */}
      <div
        className={`absolute bottom-0 right-0 transition-all duration-500 ease-out origin-bottom-right
          ${isOpen
            ? "scale-100 opacity-100 translate-y-0"
            : "scale-0 opacity-0 translate-y-4 pointer-events-none"
          }`}
      >
        <div className="w-[calc(100vw-32px)] sm:w-[380px] backdrop-blur-lg bg-background/80 rounded-3xl shadow-2xl border border-border overflow-hidden">
          {/* Header with Close Button */}
          <div className="flex items-center justify-between p-4 border-b border-border/50">
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-full bg-primary text-primary-foreground 
                        flex items-center justify-center shadow-sm
                        transition-all duration-200 hover:scale-110 hover:shadow-md
                        focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              <ArrowUpLeft className="w-4 h-4 rotate-180" />
            </button>
            <h3 className="text-sm font-medium text-foreground">Chat</h3>
            <div className="w-8 h-8"></div> {/* Spacer for centering */}
          </div>

          {/* Messages Area */}
          <div className="w-full h-[60vh] sm:h-[400px] flex flex-col">
            {messages.length > 0 ? (
              <div className="flex-1 p-4 overflow-y-auto space-y-3 scrollbar-hide">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
                  >
                    <div
                      className={`p-3 rounded-2xl text-sm max-w-[80%] sm:max-w-[280px] transition-all duration-300 
                        ${msg.sender === "user"
                          ? "bg-primary text-primary-foreground rounded-br-md"
                          : "bg-muted text-muted-foreground rounded-bl-md"
                        }`}
                    >
                      {msg.text}
                    </div>
                    {/* Show Calendly button for bot messages that mention scheduling */}
                    {msg.sender === "bot" && shouldShowCalendlyButton(msg.text) && (
                      <a
                        href={contactContent.calendly}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-flex items-center gap-2 px-4 py-2 
                                  bg-primary text-primary-foreground text-xs font-medium
                                  rounded-xl shadow-sm
                                  hover:shadow-md hover:scale-105
                                  transition-all duration-200
                                  focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                      >
                        <Calendar className="w-3.5 h-3.5" />
                        Schedule a Call
                      </a>
                    )}
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center p-8">
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mx-auto">
                    <ArrowUpLeft className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <p className="text-sm text-muted-foreground">Start a conversation</p>
                </div>
              </div>
            )}

            {/* Input Area */}
            <div className="p-4 border-t border-border/50">
              <div className="relative flex items-center gap-2">
                <input
                  type="text"
                  value={message}
                  onChange={handleChange}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 p-3 rounded-2xl text-sm 
                            bg-background/60 border border-border
                            transition-all duration-200
                            focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent
                            placeholder:text-muted-foreground"
                  autoFocus={isOpen}
                />
                <Button
                  onClick={handleSend}
                  disabled={!message.trim()}
                  className="h-10 w-10 p-0 rounded-xl shrink-0"
                >
                  <ArrowUpLeft className="w-4 h-4 rotate-45" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <div
        className={`transition-all duration-500 ease-out
          ${isOpen
            ? "scale-0 opacity-0 pointer-events-none"
            : "scale-100 opacity-100"
          }`}
      >
        <button
          className={`w-14 h-14 rounded-full bg-primary text-primary-foreground 
                      flex items-center justify-center shadow-lg
                      transition-all duration-300 hover:scale-110 hover:shadow-xl
                      focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2
                      ${isHovered ? "shadow-xl" : ""}`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => setIsOpen(true)}
        >
          <ArrowUpLeft className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}