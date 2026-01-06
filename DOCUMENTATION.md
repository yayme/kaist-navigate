# KAIST Companion WebApp - Complete Documentation

## 📋 Project Overview

The KAIST Newcomer & Visitor Companion is a full-stack web application designed to help newcomers and visitors navigate KAIST campus with ease. It provides real-time transportation tracking, dining information, an interactive campus map, and a comprehensive onboarding checklist.

## 🎯 Key Features

### 1. Transportation Module (`/transport`)
- **Real-time shuttle tracking** with countdown timers
- Three shuttle routes:
  - OLEV Shuttle (15-min intervals on weekdays)
  - Main-Munji-Hwaam Shuttle (daily fixed schedule)
  - Wolpyeong Station Shuttle (weekdays)
- Visual urgency indicators (red for <5 min, yellow for <15 min)
- Detailed route information with stops
- Airport arrival instructions

### 2. Dining Module (`/dining`)
- **Tabbed interface** for 3 main cafeterias:
  - North (Kaimaru N11)
  - East (E5)
  - West (W2)
- Dynamic menu loading from scraper
- Current meal highlighting (Breakfast/Lunch/Dinner)
- Operating hours for each facility
- Campus café directory

### 3. Interactive Campus Map (`/map`)
- **Searchable building directory** (11 key buildings)
- Search by building code, name, or facility
- Category filtering (Dining, Services, Medical, etc.)
- Building detail modals with all facilities
- Emergency contacts section
- Integration placeholder for Google Maps

### 4. Newcomer Onboarding Guide (`/guide`)
- **10-step interactive checklist** with progress tracking
- Persistent progress via localStorage
- Expandable items with:
  - Step-by-step instructions
  - Required documents lists
  - Location information
  - Estimated completion time
  - External resource links
- Progress percentage indicator
- Category-based organization

### 5. Home Dashboard
- Quick action cards for all modules
- Emergency contacts prominently displayed
- Key campus locations overview
- Welcome message and orientation info

## 🏗️ Technical Architecture

### Frontend Stack
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **State Management:** React Hooks + localStorage

### Backend Stack
- **Scraper:** Python 3.8+
- **Libraries:** Requests, BeautifulSoup4, lxml
- **Data Format:** JSON

### Data Sources
1. **Static Data:** JSON files (`/data` directory)
   - Transportation schedules
   - Building information
   - Cafeteria details
   - Onboarding checklist

2. **Dynamic Data:** Web scraper
   - Daily dining menus from KAIST website
   - Outputs JSON for API consumption

## 📁 Complete File Structure

```
kaist-companion-webapp/
│
├── app/                                    # Next.js App Router
│   ├── page.tsx                           # Home page
│   ├── layout.tsx                         # Root layout with nav
│   ├── globals.css                        # Global styles
│   ├── dining/page.tsx                    # Dining page
│   ├── transport/page.tsx                 # Transport page
│   ├── map/page.tsx                       # Map page
│   └── guide/page.tsx                     # Guide page
│
├── components/                             # React Components
│   ├── navigation/
│   │   └── Navigation.tsx                 # Top navigation bar
│   ├── dining/
│   │   └── DailyMenuDisplay.tsx          # Menu display component
│   ├── transport/
│   │   └── ShuttleTracker.tsx            # Shuttle tracking logic
│   ├── map/
│   │   └── InteractiveMap.tsx            # Building search/map
│   └── guide/
│       └── NewcomerChecklist.tsx         # Checklist with progress
│
├── data/                                   # Static JSON Data
│   ├── transportation.json                # Shuttle schedules
│   ├── dining.json                        # Cafeteria info
│   ├── campus.json                        # Buildings & emergency
│   └── newcomer.json                      # Onboarding steps
│
├── backend/                                # Backend Services
│   ├── scraper/
│   │   ├── menu_scraper.py               # Web scraper script
│   │   └── README.md                     # Scraper docs
│   └── requirements.txt                   # Python deps
│
├── public/                                 # Static assets
│
├── Configuration Files
│   ├── package.json                       # Node dependencies
│   ├── tsconfig.json                      # TypeScript config
│   ├── tailwind.config.js                # Tailwind config
│   ├── next.config.js                    # Next.js config
│   ├── postcss.config.js                 # PostCSS config
│   └── .gitignore                        # Git ignore rules
│
└── Documentation
    ├── README.md                          # Main project readme
    ├── SETUP.md                           # Installation guide
    ├── STRUCTURE.md                       # Architecture details
    └── DOCUMENTATION.md                   # This file
```

## 🎨 Design System

### Colors (from Tailwind config)
```javascript
colors: {
  'kaist-blue': '#004098',      // Primary brand
  'kaist-light-blue': '#0066CC', // Secondary/hover
  'kaist-red': '#E31937',        // Accent
}
```

### Component Patterns
- **Cards:** White background, rounded-lg, shadow-md
- **Buttons:** KAIST blue primary, hover effects
- **Navigation:** Sticky top, blue background
- **Forms:** Border focus states with KAIST blue

### Responsive Design
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px)
- Hamburger menu for mobile navigation

## 🔄 Data Flow Diagrams

### Shuttle Tracker Logic
```
Current Time (useState, 1s interval)
    ↓
Calculate Next Departures (useEffect)
    ↓
Compare with Static Schedules (JSON)
    ↓
Calculate Minutes Until Departure
    ↓
Render with Color Coding
```

### Menu Display Flow
```
User Clicks "Load Menu"
    ↓
Fetch from API/Scraper (async)
    ↓
Update State with Menu Data
    ↓
Render by Cafeteria (tabs)
    ↓
Highlight Current Meal Time
```

### Checklist Progress
```
Component Mount
    ↓
Load from localStorage
    ↓
User Toggles Item
    ↓
Update State + localStorage
    ↓
Recalculate Progress %
```

## 🔧 Component APIs

### ShuttleTracker Component
```typescript
// No props required
// Self-contained with internal state

// Key State:
- currentTime: Date
- shuttleTimes: ShuttleTime[]

// Key Functions:
- calculateNextShuttles(): void
- getStatusColor(minutes): string
- getUrgencyBadge(minutes): JSX | null
```

### DailyMenuDisplay Component
```typescript
// No props required

// Key State:
- activeTab: 'north' | 'east' | 'west'
- menuData: MenuData | null
- loading: boolean
- lastUpdated: Date | null

// Key Functions:
- loadMenuData(): Promise<void>
- getMealTime(): string
```

### InteractiveMap Component
```typescript
// No props required

// Key State:
- searchQuery: string
- selectedBuilding: Building | null
- filteredBuildings: Building[]
- activeCategory: string

// Key Functions:
- handleSearch(query: string): void
- identify_cafeteria(name: string): string
```

### NewcomerChecklist Component
```typescript
// No props required

// Key State:
- completedItems: string[]
- expandedItems: string[]

// Key Functions:
- toggleComplete(itemId: string): void
- toggleExpand(itemId: string): void
- isCompleted(itemId: string): boolean
```

## 🚀 Deployment Guide

### Frontend Deployment (Vercel)
1. Push code to GitHub
2. Connect repository to Vercel
3. Configure build settings:
   - Framework: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`
4. Deploy

### Backend Scraper Deployment

**Option 1: Cron Job (Linux Server)**
```bash
0 6 * * * cd /path/to/backend/scraper && python menu_scraper.py
```

**Option 2: GitHub Actions**
```yaml
name: Scrape Menu
on:
  schedule:
    - cron: '0 6 * * *'
jobs:
  scrape:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - run: pip install -r backend/requirements.txt
      - run: python backend/scraper/menu_scraper.py
```

**Option 3: AWS Lambda**
- Package scraper as Lambda function
- Set CloudWatch Events trigger (daily)
- Store output in S3 bucket

## 🧪 Testing Strategy

### Manual Testing Checklist
- [ ] All navigation links work
- [ ] Shuttle tracker updates every second
- [ ] Shuttle calculations are accurate
- [ ] Menu tabs switch correctly
- [ ] Building search returns correct results
- [ ] Checklist progress saves in localStorage
- [ ] Emergency contacts display
- [ ] Mobile responsive on all pages

### Automated Testing (Future)
- Unit tests with Jest
- Component tests with React Testing Library
- E2E tests with Playwright

## 🔐 Security Considerations

1. **API Rate Limiting:** Implement for menu scraper
2. **CORS:** Configure for API endpoints
3. **Data Validation:** Sanitize scraper output
4. **Local Storage:** Only store non-sensitive data

## 📈 Future Enhancements

### Phase 2 Features
- [ ] User authentication (KAIST Portal SSO)
- [ ] Personalized homepage
- [ ] Push notifications for shuttle alerts
- [ ] Weather integration
- [ ] Events calendar
- [ ] Course schedule integration

### Phase 3 Features
- [ ] Real-time shuttle GPS tracking
- [ ] Meal ratings and reviews
- [ ] Building indoor maps
- [ ] Multi-language support (Korean/English)
- [ ] Dark mode
- [ ] Mobile app (React Native)

## 🤝 Contributing

### Code Style
- Use TypeScript for type safety
- Follow ESLint rules
- Use functional components with hooks
- Keep components under 300 lines
- Comment complex logic

### Git Workflow
1. Create feature branch: `git checkout -b feature/shuttle-alerts`
2. Make changes and commit
3. Push and create pull request
4. Code review required
5. Merge to main

## 📞 Support

For issues or questions:
- Open GitHub issue
- Contact: [Your email/contact]

## 📄 License

MIT License - See LICENSE file

---

**Last Updated:** January 2026  
**Version:** 1.0.0  
**Maintainer:** KAIST Community
