"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import {
	FiSend,
	FiCpu,
	FiTerminal,
	FiMessageSquare,
	FiUser,
	FiActivity,
} from "react-icons/fi";
import CyberCard from "@/components/ui/CyberCard";
import SplitText from "@/components/ui/SplitText";

// --- Types ---
interface Message {
	id: string;
	role: "user" | "assistant";
	content: string;
	timestamp: Date;
}

// --- Animation Variants ---
const containerVariants: Variants = {
	hidden: { opacity: 0 },
	show: {
		opacity: 1,
		transition: { staggerChildren: 0.1 },
	},
};

const messageVariants: Variants = {
	hidden: { opacity: 0, y: 20, scale: 0.95 },
	show: {
		opacity: 1,
		y: 0,
		scale: 1,
		transition: { type: "spring", stiffness: 50, damping: 15 },
	},
};

const SPLIT_TITLES = [
	"SECURE_CHANNEL",
	"AI_UPLINK",
	"NEURAL_BRIDGE",
	"LIVE_FEED",
	"INTERLINK_ACTIVE",
];

// --- Helper: Generate Custom Session ID ---
// Format: 3 Random Chars + YYYYMMDDHHmmssSSS
const generateSessionId = () => {
	const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
	let prefix = "";
	for (let i = 0; i < 3; i++) {
		prefix += chars.charAt(Math.floor(Math.random() * chars.length));
	}

	const now = new Date();
	const timestamp =
		now.getFullYear().toString() +
		(now.getMonth() + 1).toString().padStart(2, "0") +
		now.getDate().toString().padStart(2, "0") +
		now.getHours().toString().padStart(2, "0") +
		now.getMinutes().toString().padStart(2, "0") +
		now.getSeconds().toString().padStart(2, "0") +
		now.getMilliseconds().toString().padStart(3, "0");

	return `${prefix}${timestamp}`;
};

export default function ChatContent() {
	const [input, setInput] = useState("");
	const [messages, setMessages] = useState<Message[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [titleIndex, setTitleIndex] = useState(0);
	const [sessionId] = useState(() => {
		if (typeof window !== "undefined") {
			// Check local storage or generate new for this session
			const stored = sessionStorage.getItem("chat_session_id");
			if (stored) return stored;
			const newId = generateSessionId();
			sessionStorage.setItem("chat_session_id", newId);
			return newId;
		}
		return generateSessionId();
	});

	const messagesEndRef = useRef<HTMLDivElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);

	// --- Auto Scroll ---
	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	};

	useEffect(() => {
		scrollToBottom();
	}, [messages]);

	// --- Title Animation ---
	useEffect(() => {
		const interval = setInterval(() => {
			setTitleIndex((prev) => (prev + 1) % SPLIT_TITLES.length);
		}, 4000);
		return () => clearInterval(interval);
	}, []);

	// --- Helper: Parse Stream Data ---
	// Menangani format pseudo-JSON (Python dict string) yang menggunakan single quote
	const parseStreamLine = (line: string) => {
		try {
			// Coba parsing JSON standar dulu
			return JSON.parse(line);
		} catch {
			// Fallback: Manual parsing untuk format {'key': 'value'}
			// Hati-hati: Regex ini sederhana dan mungkin butuh penyesuaian jika content mengandung quote
			try {
				// Ganti single quotes pembungkus key/value menjadi double quotes
				// Ini agak tricky, jadi kita coba ambil value content-nya saja via Regex
				const typeMatch = line.match(/'type':\s*'([^']*)'/);
				const contentMatch = line.match(/'content':\s*'((?:[^'\\]|\\.)*)'/);

				if (typeMatch) {
					return {
						type: typeMatch[1],
						content: contentMatch ? contentMatch[1] : "",
					};
				}
				return null;
			} catch {
				return null;
			}
		}
	};

	// --- Handle Submit ---
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!input.trim() || isLoading) return;

		const userMsg: Message = {
			id: Date.now().toString(),
			role: "user",
			content: input,
			timestamp: new Date(),
		};

		setMessages((prev) => [...prev, userMsg]);
		setInput("");
		setIsLoading(true);

		// Placeholder message for streaming
		const botMsgId = (Date.now() + 1).toString();
		setMessages((prev) => [
			...prev,
			{
				id: botMsgId,
				role: "assistant",
				content: "",
				timestamp: new Date(),
			},
		]);

		try {
			const response = await fetch(
				"https://graxya-bot.vercel.app/api/v1/chat/",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						accept: "application/json",
					},
					mode: "cors",
					body: JSON.stringify({
						message: userMsg.content,
						session_id: sessionId,
						stream: true,
					}),
				}
			);

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			if (!response.body) throw new Error("No response body");

			const reader = response.body.getReader();
			const decoder = new TextDecoder();
			let done = false;
			let accumulatedContent = "";

			while (!done) {
				const { value, done: doneReading } = await reader.read();
				done = doneReading;
				const chunkValue = decoder.decode(value, { stream: true });

				// Data stream biasanya dipisahkan oleh 'data: '
				const lines = chunkValue.split("\n");

				for (const line of lines) {
					if (line.startsWith("data: ")) {
						const jsonStr = line.replace("data: ", "").trim();
						if (jsonStr === "{'type': 'done'}" || jsonStr === "[DONE]") {
							done = true;
							break;
						}

						const parsed = parseStreamLine(jsonStr);

						if (parsed && parsed.type === "content") {
							accumulatedContent += parsed.content;
							setMessages((prev) =>
								prev.map((msg) =>
									msg.id === botMsgId
										? { ...msg, content: accumulatedContent }
										: msg
								)
							);
						}
					}
				}
			}
		} catch (error) {
			console.error("Chat Error:", error);
			setMessages((prev) => [
				...prev,
				{
					id: Date.now().toString(),
					role: "assistant",
					content:
						"CONNECTION_ERR: Uplink failed. Unable to reach neural core. Try again later.",
					timestamp: new Date(),
				},
			]);
		} finally {
			setIsLoading(false);
			setTimeout(() => inputRef.current?.focus(), 100);
		}
	};

	return (
		<div className="h-full flex flex-col bg-[#030303] text-gray-300 font-mono overflow-hidden relative">
			{/* --- CINEMATIC AMBIENCE --- */}
			<div className="absolute inset-0 opacity-[0.03] pointer-events-none z-50 mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
			<div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
				<div className="absolute top-[20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-purple-900/10 blur-[120px]" />
				<div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-cyan-900/10 blur-[100px]" />
			</div>

			{/* --- HEADER SECTION --- */}
			<div className="shrink-0 px-6 md:px-10 py-5 border-b border-white/5 bg-[#030303]/90 backdrop-blur-md sticky top-0 z-20 shadow-2xl flex flex-col md:flex-row justify-between items-end gap-6 relative">
				<div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent opacity-50" />

				<div className="flex-1 w-full">
					<div className="flex items-center gap-2 mb-2">
						<FiCpu className="text-purple-500 w-3 h-3 animate-pulse" />
						<span className="text-[10px] font-mono tracking-[0.2em] text-purple-400/80 uppercase">
							// NEURAL_INTERFACE
						</span>
					</div>

					<div className="h-10 md:h-12 flex items-center overflow-hidden w-full">
						<SplitText
							text={SPLIT_TITLES[titleIndex]}
							className="text-2xl md:text-3xl font-black text-white tracking-widest"
							targetClassName="text-white"
						/>
					</div>

					<div className="flex items-center gap-4 mt-2">
						<p className="text-[10px] text-cyan-400/80 font-mono tracking-[0.1em] uppercase">
							SESSION_ID: <span className="text-white">{sessionId}</span>
						</p>
						<div className="flex items-center gap-1.5">
							<span
								className={`w-1.5 h-1.5 rounded-full ${
									isLoading ? "bg-yellow-500 animate-ping" : "bg-green-500"
								}`}
							/>
							<span className="text-[9px] text-gray-500">
								{isLoading ? "TRANSMITTING..." : "ONLINE"}
							</span>
						</div>
					</div>
				</div>
			</div>

			{/* --- CHAT AREA --- */}
			<div className="flex-1 overflow-y-auto p-4 md:p-6 custom-scrollbar relative scroll-smooth z-10 flex flex-col gap-6">
				{messages.length === 0 ? (
					<div className="h-full flex flex-col items-center justify-center text-center opacity-50 space-y-4 min-h-[300px]">
						<div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
							<FiTerminal className="w-8 h-8 text-gray-500" />
						</div>
						<div>
							<h3 className="text-lg font-bold text-gray-400">SYSTEM READY</h3>
							<p className="text-sm text-gray-600 max-w-xs mx-auto mt-2">
								Initiate protocol. Ask me anything about Gratia, tech stack, or
								projects.
							</p>
						</div>
					</div>
				) : (
					<AnimatePresence mode="popLayout">
						<motion.div
							variants={containerVariants}
							initial="hidden"
							animate="show"
							className="space-y-6 pb-4"
						>
							{messages.map((msg) => (
								<motion.div
									key={msg.id}
									variants={messageVariants}
									layout
									className={`flex ${
										msg.role === "user" ? "justify-end" : "justify-start"
									}`}
								>
									<div
										className={`max-w-[85%] md:max-w-[75%] ${
											msg.role === "user" ? "w-auto" : "w-full md:w-auto"
										}`}
									>
										{msg.role === "assistant" ? (
											<CyberCard className="w-full">
												<div className="p-4 relative z-10">
													<div className="flex items-center gap-2 mb-3 border-b border-white/5 pb-2">
														<FiCpu className="w-3 h-3 text-cyan-500" />
														<span className="text-[10px] font-bold text-cyan-500 tracking-wider">
															GRAXYA_AI
														</span>
														<span className="text-[9px] text-gray-600 ml-auto">
															{msg.timestamp.toLocaleTimeString()}
														</span>
													</div>
													<div className="prose prose-invert prose-sm max-w-none">
														<p className="text-sm text-gray-300 leading-relaxed whitespace-pre-wrap font-light">
															{msg.content}
															{msg.id === messages[messages.length - 1].id &&
																isLoading && (
																	<span className="inline-block w-1.5 h-3 ml-1 bg-cyan-500 animate-pulse align-middle" />
																)}
														</p>
													</div>
												</div>
											</CyberCard>
										) : (
											<div className="bg-white/5 border border-white/10 rounded-2xl rounded-tr-sm px-5 py-3 backdrop-blur-sm">
												<p className="text-sm text-white font-medium">
													{msg.content}
												</p>
												<div className="text-[9px] text-right text-gray-500 mt-1 flex items-center justify-end gap-1">
													<FiUser className="w-2.5 h-2.5" />
													YOU • {msg.timestamp.toLocaleTimeString()}
												</div>
											</div>
										)}
									</div>
								</motion.div>
							))}
						</motion.div>
					</AnimatePresence>
				)}
				<div ref={messagesEndRef} />
			</div>

			{/* --- INPUT AREA --- */}
			<div className="shrink-0 p-4 md:p-6 bg-[#030303]/95 border-t border-white/10 z-30">
				<form onSubmit={handleSubmit} className="relative max-w-4xl mx-auto">
					<div className="relative group">
						<div className="absolute -inset-[1px] bg-gradient-to-r from-purple-600 via-cyan-500 to-purple-600 rounded-lg opacity-30 group-hover:opacity-100 transition-opacity duration-500 blur-[2px]" />
						<div className="relative flex items-center bg-[#0a0a0c] rounded-lg border border-white/10 overflow-hidden">
							<div className="pl-4 pr-2 text-gray-500">
								<FiTerminal className="w-4 h-4" />
							</div>
							<input
								ref={inputRef}
								type="text"
								value={input}
								onChange={(e) => setInput(e.target.value)}
								placeholder="Enter command or query..."
								disabled={isLoading}
								className="flex-1 bg-transparent border-none text-white text-sm px-2 py-4 focus:ring-0 focus:outline-none placeholder-gray-600 font-mono"
								autoComplete="off"
							/>
							<button
								type="submit"
								disabled={!input.trim() || isLoading}
								className="px-4 py-2 mr-2 text-xs font-bold bg-white/5 hover:bg-white/10 text-cyan-500 rounded disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
							>
								{isLoading ? (
									<FiActivity className="w-4 h-4 animate-spin" />
								) : (
									<>
										SEND <FiSend className="w-3 h-3" />
									</>
								)}
							</button>
						</div>
					</div>
					<div className="absolute -bottom-4 left-0 right-0 flex justify-between px-1">
						<span className="text-[9px] text-gray-600 font-mono">
							ENCRYPTED_CHANNEL::ACTIVE
						</span>
						<span className="text-[9px] text-gray-600 font-mono">
							v1.0.4-beta
						</span>
					</div>
				</form>
			</div>
		</div>
	);
}
