// ... (previous imports remain the same)

// Add debugging console logs in the CallToolRequestSchema handler
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    if (name === "search-objects") {
      const { query, page = 1, perPage = 10 } = SearchObjectsSchema.parse(args);
      
      console.error('Searching for:', query);  // Debug log
      const response = await makeApiRequest<SearchResponse>("cooperhewitt.search.collection", {
        query,
        page: page.toString(),
        per_page: perPage.toString(),
      });

      const objects = response.objects || [];
      console.error('Found objects:', objects.length);  // Debug log
      console.error('First object:', objects[0]);  // Debug log

      // Return both the text content and the React component
      return {
        content: [
          {
            type: "text",
            text: `Found ${objects.length} objects matching "${query}". First object title: ${objects[0]?.title || 'None'}`
          }
        ],
        artifact: {
          type: "application/vnd.ant.react",
          content: {
            component: "ObjectsGrid",
            props: { objects }
          }
        }
      };
    }
    // ... (rest of the handler)
  }