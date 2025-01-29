import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";
import fetch from 'node-fetch';
import { CooperHewittObject } from './types.js';

const API_TOKEN = "358020d16d8de46af1aeac1e96be3cf2";
const API_BASE = "https://api.collection.cooperhewitt.org/rest";

interface SearchResponse {
  objects: CooperHewittObject[];
}

interface ObjectResponse {
  object: CooperHewittObject;
}

// Create server instance
const server = new Server(
  {
    name: "cooper-hewitt",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Define validation schemas
const SearchObjectsSchema = z.object({
  query: z.string(),
  page: z.number().optional(),
  perPage: z.number().optional(),
});

const GetObjectSchema = z.object({
  id: z.string(),
});

async function makeApiRequest<T>(method: string, params: Record<string, any>): Promise<T> {
  const urlParams = new URLSearchParams({
    access_token: API_TOKEN,
    method,
    ...params,
  });

  const response = await fetch(`${API_BASE}/?${urlParams}`);
  if (!response.ok) {
    throw new Error(`API request failed: ${response.statusText}`);
  }

  return response.json() as Promise<T>;
}

// List available tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "search-objects",
        description: "Search for objects in the Cooper Hewitt collection",
        inputSchema: {
          type: "object",
          properties: {
            query: {
              type: "string",
              description: "Search query",
            },
            page: {
              type: "number",
              description: "Page number (optional)",
            },
            perPage: {
              type: "number",
              description: "Results per page (optional)",
            },
          },
          required: ["query"],
        },
      },
      {
        name: "get-object",
        description: "Get detailed information about a specific object",
        inputSchema: {
          type: "object",
          properties: {
            id: {
              type: "string",
              description: "Object ID",
            },
          },
          required: ["id"],
        },
      },
    ],
  };
});

// Handle tool execution
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    if (name === "search-objects") {
      const { query, page = 1, perPage = 10 } = SearchObjectsSchema.parse(args);
      
      const response = await makeApiRequest<SearchResponse>("cooperhewitt.search.collection", {
        query,
        page: page.toString(),
        per_page: perPage.toString(),
      });

      const objects = response.objects || [];

      // Return search results using ObjectsGrid component
      return {
        artifact: {
          type: "application/vnd.ant.react",
          content: {
            component: "ObjectsGrid",
            props: { objects }
          }
        },
        content: [
          {
            type: "text",
            text: `Found ${objects.length} objects matching "${query}"`,
          },
        ],
      };
    }

    if (name === "get-object") {
      const { id } = GetObjectSchema.parse(args);
      
      const response = await makeApiRequest<ObjectResponse>("cooperhewitt.objects.getInfo", {
        object_id: id,
      });

      const object = response.object;

      // Return object details using ObjectDisplay component
      return {
        artifact: {
          type: "application/vnd.ant.react",
          content: {
            component: "ObjectDisplay",
            props: { object }
          }
        },
        content: [
          {
            type: "text",
            text: `Details for object: ${object.title}`,
          },
        ],
      };
    }

    throw new Error(`Unknown tool: ${name}`);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(
        `Invalid arguments: ${error.errors
          .map((e) => `${e.path.join(".")}: ${e.message}`)
          .join(", ")}`
      );
    }
    throw error;
  }
});

// Start the server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Cooper Hewitt MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});