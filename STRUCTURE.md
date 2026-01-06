# Project Structure

```
kaist-companion-webapp/
├── app/                          # Next.js App Router
│   ├── page.tsx                 # Home page with Quick Actions
│   ├── layout.tsx               # Root layout with navigation
│   ├── globals.css              # Global styles
│   ├── dining/
│   │   └── page.tsx            # Dining page
│   ├── transport/
│   │   └── page.tsx            # Transportation page
│   ├── map/
│   │   └── page.tsx            # Campus map page
│   └── guide/
│       └── page.tsx            # Newcomer guide page
│
├── components/                   # React components
│   ├── navigation/
│   │   └── Navigation.tsx      # Main navigation bar
│   ├── dining/
│   │   └── DailyMenuDisplay.tsx    # Menu display with tabs
│   ├── transport/
│   │   └── ShuttleTracker.tsx  # Real-time shuttle tracking
│   ├── map/
│   │   └── InteractiveMap.tsx  # Building search & map
│   └── guide/
│       └── NewcomerChecklist.tsx   # Interactive checklist
│
├── data/                         # Static JSON data files
│   ├── transportation.json      # Shuttle schedules & routes
│   ├── dining.json             # Cafeteria information
│   ├── campus.json             # Building directory & emergency contacts
│   └── newcomer.json           # Onboarding checklist items
│
├── backend/                      # Backend services
│   ├── scraper/
│   │   ├── menu_scraper.py     # Python web scraper
│   │   └── README.md           # Scraper documentation
│   └── requirements.txt        # Python dependencies
│
├── public/                       # Static assets
│
├── lib/                          # Utility functions (optional)
│
├── package.json                  # Node.js dependencies & scripts
├── tsconfig.json                 # TypeScript configuration
├── tailwind.config.js           # Tailwind CSS configuration
├── next.config.js               # Next.js configuration
├── postcss.config.js            # PostCSS configuration
├── .gitignore                   # Git ignore rules
└── README.md                    # Project documentation
```

## Key Files Explained

### Frontend Structure

- **app/**: Next.js 14 App Router structure
  - Each route has its own folder with a `page.tsx`
  - `layout.tsx` wraps all pages with navigation and footer

- **components/**: Reusable React components
  - Organized by feature (dining, transport, map, guide)
  - All components use TypeScript and Tailwind CSS

- **data/**: Static JSON files
  - Pre-populated with information from KAIST Handbook
  - Imported directly into components
  - Can be replaced with API calls in production

### Backend Structure

- **backend/scraper/**: Web scraping service
  - `menu_scraper.py`: Scrapes KAIST dining menu
  - Outputs JSON that can be consumed by frontend
  - Includes fallback mock data

## Component Architecture

### ShuttleTracker
- Calculates real-time shuttle arrivals based on schedules
- Shows countdown timers for next departures
- Highlights urgent departures (< 5 minutes)
- Displays full route information

### DailyMenuDisplay
- Tabbed interface for 3 cafeterias
- Loads menu data from scraper or API
- Highlights current meal time
- Shows operating hours and facilities

### InteractiveMap
- Searchable building directory
- Category filtering (Dining, Services, Medical, etc.)
- Building detail modal with facilities
- Emergency contacts section

### NewcomerChecklist
- 10-step onboarding checklist
- Progress tracking with localStorage
- Expandable items with detailed instructions
- Required documents and location info
- External links to resources

## Data Flow

1. **Static Data**: JSON files in `/data` imported directly
2. **Dynamic Data**: Python scraper generates JSON → API endpoint → Frontend
3. **User Data**: localStorage for checklist progress

## Styling

- Tailwind CSS for utility-first styling
- Custom KAIST brand colors:
  - Primary Blue: #004098
  - Light Blue: #0066CC
  - Accent Red: #E31937

## Type Safety

- Full TypeScript implementation
- Interfaces defined inline in components
- Type-safe data imports from JSON files
