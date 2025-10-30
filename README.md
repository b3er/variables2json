# Variables2JSON - Figma Plugin

A powerful Figma plugin that exports design variables (colors, typography, effects, grids, etc.) to JSON format. Perfect for design systems and design-to-code workflows.

## 🆕 What's New (v1.0.6)

- ✨ **GitLab Support** - Create Merge Requests directly to GitLab
- 🎨 **Visual Provider Selector** - Choose between GitHub and GitLab with branded icons
- 📁 **Custom File Paths** - Configure where to save your JSON file (e.g., `src/design/tokens.json`)
- 💬 **Custom Commit Messages** - Set your own commit messages and PR/MR titles
- 🌿 **Configurable Target Branch** - Set your default target branch (main, master, develop, etc.)
- 🔀 **Custom Branch Names** - Configure PR/MR branch names (e.g., `update-design-variables`)
- ♻️ **Iterative Updates** - Push multiple commits to same branch to update existing MRs/PRs

## 🎯 Overview

Variables2JSON helps you extract and export all design variables from your Figma files into a structured JSON format. This makes it easy to:

- **Export design tokens** from Figma to your codebase
- **Synchronize design systems** across platforms
- **Automate design-to-code workflows**
- **Create GitHub Pull Requests or GitLab Merge Requests** directly from Figma
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

- **Git Provider Integration (GitHub & GitLab):**
  - Create Pull Requests (GitHub) or Merge Requests (GitLab) directly from the plugin
  - Visual provider selector with branded icons
  - Configurable file path (e.g., `src/design/variables.json`)
  - Custom commit messages
  - Configurable default branch
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

## ⚙️ Settings

Access settings through the navigation menu:

### Export Settings
- **Private Variables:** Toggle exclusion of variables with leading underscore
- **Color Format:** Choose between HEX or RGBA format

### Git Provider Settings

#### Provider Selection
Choose between **GitHub** or **GitLab** using the visual dropdown

#### Common Settings (Both Providers)
- **Default Branch:** Configure your target branch (e.g., `main`, `master`, `develop`)
- **File Path:** Specify where to save the JSON file
  - Examples: `variables.json`, `src/design/tokens.json`, `config/design-system.json`
  - Supports nested directories
- **Commit Message:** Customize the commit and PR/MR title
  - Default: `update variables.json`
  - Examples: `feat: sync Figma variables`, `update design tokens`
- **Branch Name:** Set the branch name for PRs/MRs
  - Default: `update-design-variables`
  - Examples: `feature/design-tokens`, `chore/sync-variables`
  - If branch exists, it will be updated with new changes

#### GitHub-Specific Settings
When GitHub is selected:
- **Repository:** Format `username/repo` (e.g., `acme/design-system`)
- **GitHub Token:** Personal access token with `repo` scope

#### GitLab-Specific Settings
When GitLab is selected:
- **Project Path:** Format `group/project` (e.g., `acme/design-system`)
- **GitLab Token:** Personal access token with `api` scope

### Server Sync
- Configure additional servers for automated sync
- Manage multiple sync destinations

### JSON Output Format

The plugin exports variables in the following structure:

```json
{
  "version": "1.0.6",
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

## 🔧 Git Integration Setup

### GitHub Setup

1. **Create a Personal Access Token:**
   - Go to GitHub → Settings → Developer settings → Personal access tokens
   - Click "Generate new token (classic)"
   - Select scopes: `repo` (Full control of private repositories)
   - Generate and copy the token

2. **Configure in Plugin:**
   - Open plugin settings
   - Select **GitHub** as provider
   - Enter repository: `username/repo`
   - Paste your GitHub token
   - Configure branch, file path, and commit message as needed

3. **Create Pull Request:**
   - Click the PR icon in the footer
   - Plugin creates a new branch, commits the file, and opens a PR

### GitLab Setup

1. **Create a Personal Access Token:**
   - Go to GitLab → Preferences → Access Tokens
   - Token name: `Figma Variables Plugin`
   - Select scopes: `api` (Access the authenticated user's API)
   - Create token and copy it

2. **Configure in Plugin:**
   - Open plugin settings
   - Select **GitLab** as provider
   - Enter project path: `group/project`
   - Paste your GitLab token
   - Configure branch, file path, and commit message as needed

3. **Create Merge Request:**
   - Click the PR icon in the footer
   - Plugin creates a new branch, commits the file, and opens an MR

### Advanced Configuration

**Custom File Paths:**
- Root: `variables.json`
- Nested: `src/design/variables.json`
- Multiple levels: `packages/design-tokens/src/variables.json`

**Branch Naming:**
- Configure branch name in settings (default: `update-design-variables`)
- Branch name is used exactly as configured
- If branch exists, new commits are pushed to the same branch
- Allows updating existing MRs/PRs with new changes

**Commit Messages:**
- Use conventional commits: `feat: update design tokens`
- Semantic versioning: `chore(design): sync Figma variables`
- Simple updates: `update variables.json`

## 📝 Usage Examples

### Example 1: Basic GitHub Workflow
```
1. Configure Settings:
   - Provider: GitHub
   - Repository: mycompany/design-system
   - Default Branch: main
   - File Path: variables.json
   - Commit Message: update variables.json
   - Branch Name: update-design-variables

2. Export:
   - Click PR icon → Creates PR to mycompany/design-system
   - Branch created: update-design-variables
   - File created at root: variables.json
   - PR title: "update variables.json"
```

### Example 2: GitLab with Nested Path
```
1. Configure Settings:
   - Provider: GitLab
   - Project: mygroup/design-tokens
   - Default Branch: develop
   - File Path: src/tokens/figma-variables.json
   - Commit Message: feat: sync Figma design tokens
   - Branch Name: feature/figma-sync

2. Export:
   - Click PR icon → Creates MR to mygroup/design-tokens
   - Branch created: feature/figma-sync
   - File created at: src/tokens/figma-variables.json
   - MR title: "feat: sync Figma design tokens"
```

### Example 3: Updating Existing MR/PR
```
Workflow:
1. First export → Creates branch "update-design-variables" with MR/PR
2. Make changes in Figma
3. Second export → Pushes new commit to same branch
4. Existing MR/PR is automatically updated with new changes

Benefits:
- No need to create multiple MRs/PRs for iterative updates
- Clean git history with single branch per feature
- Easy review process with all changes in one MR/PR
```

## 🐛 Troubleshooting

### Common Issues

**Q: "Failed to create pull request: 404"**
- Verify repository/project path is correct
- Check token has proper permissions (`repo` for GitHub, `api` for GitLab)
- Ensure repository/project exists and you have access

**Q: "Syntax error on line 1: Unexpected token"**
- Clear browser cache and reload plugin
- Rebuild the plugin: `npm run build`

**Q: Branch already exists error**
- The plugin uses the configured branch name
- If branch exists, it will push new commits to update it
- To create a new branch, either:
  - Delete the existing branch in GitHub/GitLab first
  - Change the branch name in settings

**Q: Provider dropdown not showing icons**
- Make sure you've rebuilt after updating: `npm run build`
- Reload the plugin in Figma

**Q: Settings not persisting**
- Settings are saved automatically to Figma's client storage
- If not persisting, try closing and reopening the plugin

### GitLab Self-Hosted Instances
Currently, the plugin uses `https://gitlab.com/api/v4`. For self-hosted GitLab:
1. Update `baseURL` in `src/ui/helpers.ts` → `createGitLabMR` function
2. Rebuild: `npm run build`

## 🔧 Configuration Files

### manifest.json

The plugin manifest defines:
- Plugin name and ID
- Entry points (`code.js` and `index.html`)
- Capabilities (inspect mode)
- Network access (GitHub API, GitLab API)
- Supported editor types (Figma, Dev Mode)

## 🤝 Contributing

### Development Mode

```bash
# Install dependencies
npm install

# Start development (watch mode)
npm start

# Build for production
npm run build

# Lint and format
npm run lint
npm run format
```

### Creating Releases

The project uses GitHub Actions to automate releases.

#### Automatic Release (Recommended)

1. Update version in `manifest.json` if needed
2. Commit your changes
3. Create and push a version tag:
   ```bash
   git tag v1.0.0
   git push origin v1.0.0
   ```
4. GitHub Action automatically:
   - Builds the plugin
   - Creates a zip file with `manifest.json` and `dist/`
   - Creates a GitHub release with the zip attached
   - Generates release notes from commits

#### Manual Release

1. Go to **Actions** tab in GitHub
2. Select **Manual Release** workflow
3. Click **Run workflow**
4. Enter version number (e.g., `1.0.0`)
5. Click **Run workflow** button

The release package (`variables2json-v*.zip`) contains:
- `manifest.json` - Plugin manifest
- `dist/` - Built plugin files
  - `code.js` - Backend code
  - `index.html` - UI bundle

Users can download the zip, extract it, and load it in Figma via **Plugins → Development → Import plugin from manifest**.

Built with:
- Vue 3
- TypeScript
- Vite
- Axios
