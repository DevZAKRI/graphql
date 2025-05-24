# GraphQL Student Dashboard

A dynamic web application that displays student information and progress from the Zone01 school using GraphQL API.

## Features

- **Authentication System**: Secure login system using JWT tokens
- **Student Profile**: Displays student's personal information and campus details
- **Skills Visualization**: Interactive graph showing progress in different programming skills:
  - Go
  - JavaScript
  - Programming fundamentals
  - HTML
  - Backend development
  - Frontend development
- **Project History**: Bar chart showing the last 5 projects and their XP
- **Audit Ratio**: Interactive circular graph showing the ratio between audits given and received
- **XP Tracking**: Display of total XP earned and current level
- **Responsive Design**: Works on both desktop and mobile devices

## Project Structure

```
├── components/
│   ├── graphs/
│   │   ├── audit.js    # Audit ratio circular graph
│   │   ├── project.js  # Projects bar chart
│   │   └── skills.js   # Skills radar chart
│   ├── signin.js       # Login form component
│   └── headder.js      # Header component with user info
├── main.js             # Main application logic and GraphQL queries
├── profile.js          # Profile page rendering
├── index.html          # Main HTML file
└── indexe.css          # Global styles
```

## Technologies Used

- Vanilla JavaScript
- GraphQL for data fetching
- SVG for custom graphs and visualizations
- CSS3 for styling and animations
- JWT for authentication

## Setup and Installation

1. Clone the repository
2. Open `index.html` in a web browser
3. Log in with your Zone01 credentials

## Features Details

### Authentication
- Secure login using JWT tokens
- Token storage in localStorage
- Automatic redirect to login for unauthorized users

### Visualizations
- **Skills Graph**: Radar chart showing progress in different programming skills
- **Projects Graph**: Bar chart showing XP earned in recent projects
- **Audit Ratio**: Interactive circular graph with hover effects showing audit statistics

### Responsive Design
- Mobile-friendly interface
- Adaptive layout for different screen sizes
- Interactive elements optimized for both mouse and touch input

## Security Features

- JWT token-based authentication
- Secure token storage
- API endpoint protection
- No sensitive data exposure

## Error Handling

- Comprehensive null checks for all data
- Fallback displays for missing data
- Clear user feedback for errors
- Graceful degradation for non-students 