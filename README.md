# Variables2JSON - Figma Plugin

A powerful Figma plugin that exports design variables (colors, typography, effects, grids, etc.) to JSON format. Perfect for design systems and design-to-code workflows.

## 🎯 Overview

Variables2JSON helps you extract and export all design variables from your Figma files into a structured JSON format. This makes it easy to:

- **Export design tokens** from Figma to your codebase
- **Synchronize design systems** across platforms
- **Automate design-to-code workflows**
- **Create GitHub Pull Requests** directly from Figma
- **Maintain consistency** between design and development

## ✨ Features

- **Export all variable types:**
  - Colors (with HEX or RGBA format support)
  - Typography styles
  - Effects (shadows, blur)
  - Layout grids
  - Numbers, Strings, and Booleans

- **Advanced export options:**
  - Exclude private variables (leading underscore)
  - Choose color format (HEX/RGBA)
  - Support for variable aliases/references
  - Multiple modes support

- **GitHub Integration:**
  - Create Pull Requests directly from the plugin
  - Automatically commit `variables.json` to your repository
  - Streamline design-to-code handoff

- **Flexible UI:**
  - List view for browsing variables
  - JSON preview before export
  - Download JSON files locally
  - Server sync capabilities

## 📋 Requirements

- **Node.js** version 14 or higher
- **npm** or **yarn** package manager
- **Figma Desktop App** (for development mode)

## 🚀 Installation & Setup

### 1. Clone or Download the Project

```bash
git clone <repository-url>
cd variables2json
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Build the Plugin

**For production:**
```bash
npm run build
```

This creates optimized production files in the `dist/` folder:
- `dist/code.js` - Plugin backend code
- `dist/index.html` - Plugin UI

### 4. Load the Plugin in Figma

1. **Open Figma Desktop App**
2. Go to **Menu** → **Plugins** → **Development** → **Import plugin from manifest...**
3. Navigate to the plugin folder and select the `manifest.json` file
4. The plugin will now appear in **Plugins** → **Development** → **variables2json**

### 5. Run the Plugin

1. Open any Figma file
2. Go to **Menu** → **Plugins** → **Development** → **variables2json**
3. The plugin UI will open and display your file's variables

### Exporting Variables

1. **List View:**
   - Browse all variables organized by collections
   - Expand/collapse collections
   - View variable details (type, value, modes)

2. **JSON View:**
   - Preview the generated JSON
   - Copy to clipboard or download as file
   - See the exact output before exporting

### Settings

Access settings through the navigation menu:

- **Export Settings:**
  - Toggle private variable exclusion
  - Choose color format (HEX/RGBA)
  
- **GitHub Integration:**
  - Set repository name (format: `username/repo`)
  - Add GitHub personal access token
  - Create PRs with exported variables

- **Server Sync:**
  - Configure servers for automated sync
  - Manage multiple sync destinations

### JSON Output Format

The plugin exports variables in the following structure:

```json
{
  "version": "1.0.5",
  "metadata": {},
  "collections": [
    {
      "name": "Collection Name",
      "modes": [
        {
          "name": "Mode Name",
          "variables": [
            {
              "name": "variable-name",
              "type": "color",
              "isAlias": false,
              "value": "#FF0000",
              "description": "Description text"
            }
          ]
        }
      ]
    }
  ]
}
```

## 🔧 Configuration

### manifest.json

The plugin manifest defines:
- Plugin name and ID
- Entry points (`code.js` and `index.html`)
- Capabilities (inspect mode)
- Network access (GitHub API)
- Supported editor types (Figma, Dev Mode)

### GitHub Integration Setup

To use GitHub PR creation:

1. Create a GitHub Personal Access Token:
   - Go to GitHub → Settings → Developer settings → Personal access tokens
   - Generate new token with `repo` scope
   
2. In the plugin settings:
   - Enter your repository (e.g., `username/my-design-system`)
   - Paste your GitHub token
   
3. The plugin will create PRs with `variables.json` in the root
