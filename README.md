# Interactive Kanban Board Application

This project is an **interactive Kanban board** built using **React.js**. It allows users to organize and manage tasks dynamically, providing options for grouping and sorting tickets based on different criteria. The application fetches data from an external API and maintains user preferences across sessions.

## Features

- **Dynamic Grouping**: Group tickets by:
  - **Status** (e.g., Todo, In Progress, Done, Cancelled)
  - **User** (assigned to specific users)
  - **Priority** (Urgent, High, Medium, Low, No priority)
  
- **Sorting Options**: Sort tickets by:
  - **Priority** (descending order)
  - **Title** (ascending order)

- **Persistent State**: The application saves user preferences for grouping and sorting, ensuring consistency across page reloads.

- **Responsive Design**: The layout adapts to different screen sizes for optimal user experience.

- **Pure CSS Styling**: The application uses only pure CSS and Styled JSX for styling, without relying on external CSS libraries.

## API

The application interacts with the following API to fetch task data:

- **API URL**: [Quicksell API](https://api.quicksell.co/v1/internal/frontend-assignment)

## Installation

To set up the project locally, follow these steps:

### Prerequisites

Ensure you have the following installed:

- **Node.js** (v12 or higher)
- **npm** (Node Package Manager)

### Steps

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Hansadhwaja/kanbanboard.git
