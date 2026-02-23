"use client";

import { useState } from "react";
import { conversations, sampleMessages } from "@/data/mock-data";
import type { Conversation } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, ArrowLeft, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

function formatMessageTime(iso: string) {
  const d = new Date(iso);
  return d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
}

function formatConvTime(iso: string) {
  const d = new Date(iso);
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  if (diffHours < 1) return "Just now";
  if (diffHours < 24) return `${diffHours}h ago`;
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

interface ConvItemProps {
  conv: Conversation;
  isActive: boolean;
  onClick: () => void;
}

function ConvItem({ conv, isActive, onClick }: ConvItemProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full text-left p-3 flex items-start gap-3 rounded-lg transition-colors duration-100",
        isActive ? "bg-primary/8" : "hover:bg-muted/60"
      )}
    >
      {/* Avatar */}
      <div className="relative shrink-0">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
          <span className="text-primary text-xs font-semibold">{conv.participantAvatar}</span>
        </div>
        {conv.isOnline && (
          <Circle className="absolute -bottom-0.5 -right-0.5 w-3 h-3 fill-[color:var(--success)] text-[color:var(--success)]" />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <span className={cn("text-sm font-medium truncate", isActive && "text-primary")}>
            {conv.participantName}
          </span>
          <span className="text-xs text-muted-foreground shrink-0 ml-1">
            {formatConvTime(conv.lastMessageTime)}
          </span>
        </div>
        <div className="flex items-center justify-between mt-0.5">
          <p className="text-xs text-muted-foreground truncate">{conv.lastMessage}</p>
          {conv.unreadCount > 0 && (
            <span className="ml-2 shrink-0 bg-primary text-primary-foreground text-[10px] font-medium w-4 h-4 rounded-full flex items-center justify-center">
              {conv.unreadCount}
            </span>
          )}
        </div>
      </div>
    </button>
  );
}

export default function MessagesPage() {
  const [activeConvId, setActiveConvId] = useState<string | null>("conv-001");
  const [message, setMessage] = useState("");
  const [showThread, setShowThread] = useState(false);

  const activeConv = conversations.find((c) => c.id === activeConvId);

  // Messages to display: use sampleMessages for conv-001, generate placeholders for others
  const displayedMessages =
    activeConvId === "conv-001"
      ? sampleMessages
      : activeConv
      ? [
          {
            id: "m-placeholder",
            senderId: "other",
            senderName: activeConv.participantName,
            content: activeConv.lastMessage,
            timestamp: activeConv.lastMessageTime,
            isOwn: false,
          },
        ]
      : [];

  function handleSelectConv(id: string) {
    setActiveConvId(id);
    setShowThread(true);
  }

  return (
    <div className="p-4 md:p-6 animate-tab-fade h-full flex flex-col gap-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Messages</h1>
        <p className="text-sm text-muted-foreground mt-1">
          {conversations.filter((c) => c.unreadCount > 0).length} unread conversations
        </p>
      </div>

      {/* Split layout */}
      <div className="linear-card p-0 flex overflow-hidden flex-1 min-h-0" style={{ height: "calc(100vh - 260px)", minHeight: 400 }}>
        {/* Conversation list */}
        <div
          className={cn(
            "flex flex-col border-r border-border/60 w-full md:w-72 shrink-0",
            showThread && "hidden md:flex"
          )}
        >
          <div className="p-3 border-b border-border/60">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Conversations
            </span>
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-0.5">
            {conversations.map((conv) => (
              <ConvItem
                key={conv.id}
                conv={conv}
                isActive={activeConvId === conv.id}
                onClick={() => handleSelectConv(conv.id)}
              />
            ))}
          </div>
        </div>

        {/* Message thread */}
        <div
          className={cn(
            "flex flex-col flex-1 min-w-0",
            !showThread && "hidden md:flex"
          )}
        >
          {activeConv ? (
            <>
              {/* Thread header */}
              <div className="p-3 border-b border-border/60 flex items-center gap-3">
                <button
                  className="md:hidden p-1 rounded-md hover:bg-muted/60 transition-colors duration-100"
                  onClick={() => setShowThread(false)}
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <div className="relative">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary text-xs font-semibold">{activeConv.participantAvatar}</span>
                  </div>
                  {activeConv.isOnline && (
                    <Circle className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 fill-[color:var(--success)] text-[color:var(--success)]" />
                  )}
                </div>
                <div>
                  <div className="text-sm font-medium">{activeConv.participantName}</div>
                  <div className={cn("text-xs", activeConv.isOnline ? "text-[color:var(--success)]" : "text-muted-foreground")}>
                    {activeConv.isOnline ? "Online" : "Offline"}
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {displayedMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={cn("flex", msg.isOwn ? "justify-end" : "justify-start")}
                  >
                    <div
                      className={cn(
                        "max-w-[75%] rounded-lg px-3 py-2 text-sm",
                        msg.isOwn
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-foreground"
                      )}
                    >
                      <p className="leading-relaxed">{msg.content}</p>
                      <p
                        className={cn(
                          "text-[10px] mt-1",
                          msg.isOwn ? "text-primary-foreground/60 text-right" : "text-muted-foreground"
                        )}
                      >
                        {formatMessageTime(msg.timestamp)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Input */}
              <div className="p-3 border-t border-border/60 flex items-center gap-2">
                <Input
                  placeholder="Type a message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && message.trim()) {
                      setMessage("");
                    }
                  }}
                  className="flex-1"
                />
                <Button
                  size="sm"
                  className="shrink-0"
                  onClick={() => setMessage("")}
                  disabled={!message.trim()}
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-sm text-muted-foreground">
              Select a conversation to start messaging
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
