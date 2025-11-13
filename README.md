# Talent Evaluation Dashboard

An interactive web application for conducting objective talent evaluations with bias detection, specifically designed for the Marketing Organization at Sam's Club.

## Features

### 🎯 Performance Evaluation
- **Three-tier Rating System**: Exemplary, Successful, Opportunity
- **Structured Feedback Areas**: Key Priorities, Results & Impact, Collaboration & Influence, Growth & Development, Looking Ahead
- **Individual Area Ratings**: Rate performance in each specific area
- **Fiscal Year Tracking**: Built-in support for FY26 and historical fiscal years

### 🔍 Bias Detection & Quality Analysis
- **Real-time Feedback Quality Analysis**: Detect bias patterns as you type
- **Easy Rater Detection**: Identifies reluctance to point out weak areas
- **Objectivity Scoring**: Live scoring based on objective vs subjective language
- **Quality Alerts**: Visual feedback with actionable suggestions for improvement

### 📊 Analytics Dashboard
- **Evaluation Metrics**: Track total evaluations and rating distributions
- **Bias Frequency**: Monitor bias patterns across evaluations
- **Evaluation History**: View and manage completed evaluations

### 🎨 Advanced User Experience
- **Smart Progress Tracking**: Visual progress indicators with time estimates
- **AI Writing Assistant**: Context-aware suggestions for each feedback area (Ctrl+Space)
- **Auto-Save & Draft Recovery**: Never lose your work with automatic draft saving
- **Dark Mode Support**: Toggle between light and dark themes (Ctrl+D)
- **Export Capabilities**: Download evaluations as formatted text files
- **Keyboard Shortcuts**: Power user shortcuts for common actions
- **Real-time Word Counting**: Track feedback length and typing indicators
- **Floating Action Buttons**: Quick access to key features

### 🤖 AI-Powered Features
- **Context-Aware Suggestions**: Tailored writing prompts for each feedback section
- **Objective Language Promotion**: Real-time suggestions for more specific feedback
- **Comprehensive Summary Generation**: Auto-compile all sections into professional summary
- **Quality Scoring**: Per-section and overall objectivity analysis

## Quick Start

### Option 1: Simple HTML Demo (No installation required)
Open `demo.html` in any modern web browser to start using the application immediately.

### Option 2: Full React Development Setup
1. **Install Node.js** (if not already installed):
   - Download from [nodejs.org](https://nodejs.org/)
   - Or use package manager: `brew install node` (macOS)

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```

4. **Open in browser**:
   Navigate to `http://localhost:3000`

## Usage Guide

### Creating an Evaluation

1. **Performance Evaluation**: Start directly in the evaluation interface
2. **Progress Tracking**: Monitor completion with the visual progress tracker
3. **Basic Information**: Enter employee name, reviewer name, and fiscal year (defaults to FY26)
4. **Overall Rating**: Select the overall performance rating
5. **Feedback Areas**: Complete each of the five areas with AI assistance:
   - **Key Priorities**: Main goals and deliverables
   - **Results & Impact**: Business outcomes and measurable results
   - **Collaboration & Influence**: Cross-team partnerships
   - **Growth & Development**: New skills and leadership qualities
   - **Looking Ahead**: Opportunities for next year
6. **Comprehensive Summary**: Generate or manually create a complete evaluation summary

### ⚡ Power User Features

#### Keyboard Shortcuts
- **Ctrl+S / Cmd+S**: Quick save draft
- **Ctrl+D / Cmd+D**: Toggle dark mode
- **Ctrl+G / Cmd+G**: Generate summary
- **Ctrl+Space**: Show AI writing suggestions (in text areas)

#### AI Writing Assistant
- Press **Ctrl+Space** in any feedback area for context-specific suggestions
- Choose from pre-written templates tailored to each evaluation section
- Get prompts for objective, measurable feedback examples

#### Auto-Save & Recovery
- Work is automatically saved as you type
- Drafts are recovered when you return to the application
- Visual indicators show save status in real-time

### Bias Detection Features

The system automatically analyzes feedback for:
- **Easy Rater Bias**: Reluctance to provide critical feedback
- **Vague Language**: Non-specific praise without examples
- **Subjective vs Objective**: Balance of opinion vs facts
- **Missing Development Areas**: Lack of growth opportunities

### Best Practices for Objective Feedback

#### ✅ Do:
- Use specific examples and measurable outcomes
- Include concrete business impact
- Mention data points and metrics
- Provide balanced feedback with growth areas
- Focus on behaviors and results

#### ❌ Avoid:
- Personality descriptions ("nice," "friendly")
- Vague generalizations ("good," "great")
- Opinion-based language ("I think," "seems")
- Only positive feedback without development areas
- Attribution to luck or timing

### Performance Rating Guidelines

#### Exemplary
- Consistently exceeds role requirements
- Performance far above typical successful associates
- Exceptional business impact and results

#### Successful  
- Consistently meets role requirements
- Performance in range of typical successful associates
- Solid contribution and reliable results

#### Opportunity
- Consistently fails to meet role requirements
- Performance significantly below successful associates
- Requires improvement and development support

## Technical Details

### Built With
- **Frontend**: React 18 with TypeScript
- **Styling**: Modern CSS with responsive design
- **Charts**: Chart.js for data visualization
- **Storage**: Local browser storage
- **Build Tool**: Vite for fast development

### Project Structure
```
src/
├── components/          # React components
│   ├── BiasAlert.tsx   # Bias detection display
│   ├── FeedbackForm.tsx # Main evaluation form
│   └── RatingButtons.tsx # Rating selection
├── types/              # TypeScript interfaces
├── utils/              # Business logic
│   ├── biasDetection.ts # Bias analysis algorithms
│   └── storage.ts      # Local storage management
└── App.tsx             # Main application
```

### Data Storage
- Evaluations stored locally in browser
- No server required for basic functionality
- Data persists between sessions
- Export/import capability for data management

## Customization

### Adding New Bias Patterns
Edit `src/utils/biasDetection.ts` to add new bias detection rules:

```typescript
const BIAS_PATTERNS = {
  new_bias_type: {
    keywords: ['keyword1', 'keyword2'],
    phrases: ['phrase pattern'],
    severity: 'medium'
  }
};
```

### Modifying Feedback Areas
Update `src/types/index.ts` to customize evaluation areas:

```typescript
export const FEEDBACK_AREAS = [
  {
    id: 'custom_area',
    name: 'Custom Area Name',
    description: 'Description of what to evaluate'
  }
];
```

## Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - TypeScript type checking

### Contributing
1. Fork the repository
2. Create a feature branch
3. Make changes with appropriate tests
4. Submit a pull request

## License

This project is proprietary software for Sam's Club Marketing Organization.

## Support

For technical support or feature requests, please contact the development team or create an issue in the project repository.

---

**Note**: This tool is designed to supplement, not replace, human judgment in performance evaluation. Always consider individual context and circumstances when making personnel decisions.