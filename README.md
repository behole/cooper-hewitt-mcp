# Cooper Hewitt Model Context Protocol (MCP) Server

## Description
A Model Context Protocol (MCP) server for interacting with the Cooper Hewitt Museum's collection API. This tool allows searching and retrieving detailed information about museum objects programmatically.

<a href="https://glama.ai/mcp/servers/hwkfkqvpq7"><img width="380" height="200" src="https://glama.ai/mcp/servers/hwkfkqvpq7/badge" alt="cooper-hewitt-mcp MCP server" /></a>

## Prerequisites
- Node.js (version 16+ recommended)
- npm (Node Package Manager)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/behole/cooper-hewitt-mcp.git
cd cooper-hewitt-mcp
```

2. Install dependencies:
```bash
npm install
```

3. Set up API Token
   - Create a `.env` file in the project root
   - Obtain an API token from the [Cooper Hewitt API](https://collection.cooperhewitt.org/api/)
   - Add your token to the `.env` file:
   ```
   COOPER_HEWITT_API_TOKEN=your_api_token_here
   ```
4. Update your claude_desktop_config.json
```bash
"cooper-hewitt": {
      "command": "node",
      "args": ["path to your index.js"]
    }
```

## Available Tools

### Search Objects
- **Name**: `search-objects`
- **Description**: Search for objects in the Cooper Hewitt collection
- **Parameters**:
  - `query` (string, required): Search terms
  - `page` (number, optional): Page number of results
  - `perPage` (number, optional): Number of results per page

### Get Object Details
- **Name**: `get-object`
- **Description**: Retrieve detailed information about a specific museum object
- **Parameters**:
  - `id` (string, required): Unique identifier of the museum object

## Running the Server
```bash
node index.js
```

## Development
- Ensure all dependencies are installed
- Run tests (if applicable)
- Check code formatting

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## To-Do's (Very Much a WIP) ->
- Fix image handingling in the artifacts on Claude Desktop

## License
Specify your license - e.g., MIT, Apache 2.0

## Contact
[]

## Acknowledgments
- Cooper Hewitt, Smithsonian Design Museum
- Model Context Protocol SDK
