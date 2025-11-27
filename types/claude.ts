// types/claude.ts

export interface ClaudeChatRequest {
  message: string;
  history?: { role: 'user' | 'assistant'; content: string }[];
}

export interface ClaudeChatResponse {
  response: string;
}

export interface CustomPath {
  modules: {
    id: string;
    title: string;
    description: string;
  }[];
}
