# Stackoverflow Tags Explorer

## Overview

Stackoverflow Tags Explorer is a dynamic web application designed to showcase tags in a structured and interactive table format. Utilizing React + TypeScript + Vite.

## Features

- **Dynamic Data Fetching**: Leverages custom React hooks to fetch real-time data from Stack Overflow's API.
- **Interactive Table**: Users can sort by tag name or post count, navigate through paginated data, and select the number of rows to display.
- **Responsive Design**: Crafted with Material-UI, the application offers a responsive and accessible UI across various devices.

### Prerequisites

- Node.js
- npm

### Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/Adeophan/stackoverflow-tags-explorer
   ```
2. Install dependencies:
   ```bash
   npm ci
   ```
3. Start the development server:
   ```bash
   npm start
   ```

## Storybook Integration

Storybook is configured to help develop and visualize individual UI components in isolation.

### Running Storybook

To launch Storybook, run:

```bash
npm run storybook
```

Navigate to `localhost:6006` in your browser to view the Storybook UI and interact with the available components.
