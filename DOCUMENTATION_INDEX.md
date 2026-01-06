# 📚 Documentation Index

Welcome to the KAIST Companion WebApp documentation! This index will help you find what you need quickly.

## 🚀 Getting Started (New Users Start Here!)

1. **[README.md](README.md)** - Project overview and quick introduction
2. **[SETUP.md](SETUP.md)** - Complete installation and setup instructions
3. **[QUICK_REFERENCE.md](QUICK_REFERENCE.md)** - Quick commands and common tasks

## 📖 Comprehensive Documentation

### Architecture & Design
- **[STRUCTURE.md](STRUCTURE.md)** - Detailed file structure and component architecture
- **[DOCUMENTATION.md](DOCUMENTATION.md)** - Complete technical reference
- **[VISUAL_GUIDE.md](VISUAL_GUIDE.md)** - Visual diagrams and user flow maps

### Project Overview
- **[PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)** - Executive summary and feature list

## 🎯 Documentation by Purpose

### I want to...

#### **Install and run the app**
→ Read: [SETUP.md](SETUP.md)
- Installation steps
- Development server
- Production build
- Deployment guide

#### **Understand the codebase**
→ Read: [STRUCTURE.md](STRUCTURE.md) and [DOCUMENTATION.md](DOCUMENTATION.md)
- Component architecture
- Data flow
- File organization
- Technical specifications

#### **Make quick changes**
→ Read: [QUICK_REFERENCE.md](QUICK_REFERENCE.md)
- Common customizations
- Data structure examples
- Troubleshooting
- Pro tips

#### **See the big picture**
→ Read: [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)
- Feature list
- Statistics
- Success metrics
- Next steps

#### **Understand user experience**
→ Read: [VISUAL_GUIDE.md](VISUAL_GUIDE.md)
- User journeys
- Screen mockups
- Component interactions
- Application flow

## 📂 Code Documentation

### Frontend Components

#### Navigation
- **File:** `components/navigation/Navigation.tsx`
- **Purpose:** Top navigation bar with responsive menu
- **Used in:** All pages via `app/layout.tsx`

#### Transport Module
- **File:** `components/transport/ShuttleTracker.tsx`
- **Purpose:** Real-time shuttle countdown tracking
- **Data Source:** `data/transportation.json`
- **Key Feature:** 1-second interval updates with color-coded urgency

#### Dining Module
- **File:** `components/dining/DailyMenuDisplay.tsx`
- **Purpose:** Tabbed cafeteria menu display
- **Data Source:** Scraper API or mock data
- **Key Feature:** Current meal time highlighting

#### Map Module
- **File:** `components/map/InteractiveMap.tsx`
- **Purpose:** Searchable building directory
- **Data Source:** `data/campus.json`
- **Key Feature:** Multi-field search with instant results

#### Guide Module
- **File:** `components/guide/NewcomerChecklist.tsx`
- **Purpose:** Interactive onboarding checklist
- **Data Source:** `data/newcomer.json`
- **Key Feature:** Progress tracking with localStorage persistence

### Pages (Next.js App Router)

| Route | File | Component Used |
|-------|------|----------------|
| `/` | `app/page.tsx` | Home dashboard |
| `/transport` | `app/transport/page.tsx` | ShuttleTracker |
| `/dining` | `app/dining/page.tsx` | DailyMenuDisplay |
| `/map` | `app/map/page.tsx` | InteractiveMap |
| `/guide` | `app/guide/page.tsx` | NewcomerChecklist |

### Data Files

| File | Purpose | Format |
|------|---------|--------|
| `data/transportation.json` | Shuttle schedules and routes | JSON |
| `data/dining.json` | Cafeteria and café information | JSON |
| `data/campus.json` | Building directory and emergency contacts | JSON |
| `data/newcomer.json` | Onboarding checklist items | JSON |

### Backend

| File | Purpose | Language |
|------|---------|----------|
| `backend/scraper/menu_scraper.py` | Web scraper for daily menus | Python |
| `backend/requirements.txt` | Python dependencies | Text |
| `backend/scraper/README.md` | Scraper documentation | Markdown |

## 🎓 Learning Path

### For Frontend Developers
1. Start with [STRUCTURE.md](STRUCTURE.md) - Understand architecture
2. Read [DOCUMENTATION.md](DOCUMENTATION.md) - Technical details
3. Check [QUICK_REFERENCE.md](QUICK_REFERENCE.md) - Common patterns
4. Explore component files with inline comments

### For Backend Developers
1. Check `backend/scraper/README.md` - Scraper overview
2. Read `backend/scraper/menu_scraper.py` - Implementation
3. See [SETUP.md](SETUP.md) - Integration with frontend

### For UX Designers
1. Read [VISUAL_GUIDE.md](VISUAL_GUIDE.md) - User flows and mockups
2. Check [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) - Feature overview
3. Review color scheme in `tailwind.config.js`

### For Project Managers
1. Start with [README.md](README.md) - High-level overview
2. Read [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) - Complete deliverables
3. Check statistics and metrics sections

## 🔍 Finding Specific Information

### Configuration
- **Next.js:** `next.config.js`
- **TypeScript:** `tsconfig.json`
- **Tailwind CSS:** `tailwind.config.js`
- **PostCSS:** `postcss.config.js`
- **Dependencies:** `package.json`
- **Git:** `.gitignore`

### Styling
- **Global styles:** `app/globals.css`
- **Tailwind config:** `tailwind.config.js`
- **Component styles:** Inline with className

### Data Management
- **Static data:** `/data` directory (JSON files)
- **User data:** localStorage (in components)
- **Dynamic data:** Python scraper output

## 📝 Code Comments Guide

All components include:
- **File header:** Purpose and overview
- **Function comments:** What each function does
- **Complex logic:** Inline explanations
- **Props/interfaces:** Type definitions with descriptions

## 🔄 Update History

| Date | Version | Changes |
|------|---------|---------|
| 2026-01-07 | 1.0.0 | Initial release - All features implemented |

## 🎯 Quick Links by Task

### Development Tasks
- **Add new page:** See "Add New Page" in [QUICK_REFERENCE.md](QUICK_REFERENCE.md)
- **Modify shuttle logic:** Edit `components/transport/ShuttleTracker.tsx`
- **Update menu display:** Edit `components/dining/DailyMenuDisplay.tsx`
- **Change navigation:** Edit `components/navigation/Navigation.tsx`

### Data Tasks
- **Add building:** Edit `data/campus.json`
- **Add shuttle route:** Edit `data/transportation.json`
- **Add checklist item:** Edit `data/newcomer.json`
- **Add cafeteria:** Edit `data/dining.json`

### Deployment Tasks
- **Deploy frontend:** See "Deploy to Vercel" in [SETUP.md](SETUP.md)
- **Setup scraper:** See "Backend Scraper Deployment" in [DOCUMENTATION.md](DOCUMENTATION.md)
- **Environment config:** Create `.env.local` file

## 🆘 Getting Help

### Common Issues
See "Troubleshooting" section in:
- [SETUP.md](SETUP.md#troubleshooting) - Installation issues
- [QUICK_REFERENCE.md](QUICK_REFERENCE.md) - Quick fixes
- [DOCUMENTATION.md](DOCUMENTATION.md) - Technical issues

### External Resources
- Next.js: https://nextjs.org/docs
- React: https://react.dev
- Tailwind CSS: https://tailwindcss.com/docs
- TypeScript: https://www.typescriptlang.org/docs

## 📊 Documentation Statistics

| Metric | Count |
|--------|-------|
| **Total Docs** | 8 markdown files |
| **Code Files** | 30+ files |
| **Data Files** | 4 JSON files |
| **Components** | 5 React components |
| **Pages** | 5 Next.js pages |

## ✅ Documentation Completeness

- [x] Installation guide
- [x] Architecture documentation
- [x] Component API reference
- [x] Data structure examples
- [x] Visual user flow diagrams
- [x] Troubleshooting guide
- [x] Deployment instructions
- [x] Quick reference card
- [x] Code comments
- [x] This index

## 🎉 Ready to Start?

**New to the project?** → Start with [README.md](README.md)  
**Want to install?** → Go to [SETUP.md](SETUP.md)  
**Need quick answer?** → Check [QUICK_REFERENCE.md](QUICK_REFERENCE.md)  
**Deep dive?** → Read [DOCUMENTATION.md](DOCUMENTATION.md)

---

**Documentation Version:** 1.0.0  
**Last Updated:** January 7, 2026  
**Status:** Complete ✅

**Happy Coding! 🚀**
