# 🚀 KAIST Companion - Quick Reference Card

## ⚡ Quick Start Commands

```bash
# Install everything
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Run scraper
python backend/scraper/menu_scraper.py
```

---

## 📂 Key File Locations

| What you need | Where to find it |
|---------------|------------------|
| **Add shuttle route** | `data/transportation.json` |
| **Add building info** | `data/campus.json` |
| **Add cafeteria** | `data/dining.json` |
| **Add checklist item** | `data/newcomer.json` |
| **Change colors** | `tailwind.config.js` |
| **Edit home page** | `app/page.tsx` |
| **Update navigation** | `components/navigation/Navigation.tsx` |

---

## 🎯 Component Quick Links

| Component | File Path | Purpose |
|-----------|-----------|---------|
| **Shuttle Tracker** | `components/transport/ShuttleTracker.tsx` | Real-time countdown |
| **Menu Display** | `components/dining/DailyMenuDisplay.tsx` | Cafeteria menus |
| **Building Finder** | `components/map/InteractiveMap.tsx` | Search buildings |
| **Checklist** | `components/guide/NewcomerChecklist.tsx` | Onboarding steps |
| **Navigation** | `components/navigation/Navigation.tsx` | Top nav bar |

---

## 🎨 Brand Colors

```css
Primary Blue:   #004098  (kaist-blue)
Light Blue:     #0066CC  (kaist-light-blue)
Accent Red:     #E31937  (kaist-red)
```

Usage in components:
```tsx
<div className="bg-kaist-blue text-white">
<button className="hover:bg-kaist-light-blue">
<span className="text-kaist-red">
```

---

## 📊 Data Structure Examples

### Add a Shuttle Route
```json
// data/transportation.json
{
  "shuttleRoutes": {
    "newRoute": {
      "name": "New Shuttle",
      "operatingDays": ["Monday", "Tuesday"],
      "schedule": {
        "weekdays": [{"time": "09:00"}]
      },
      "stops": [
        {"code": "N1", "name": "Stop 1", "order": 1}
      ]
    }
  }
}
```

### Add a Building
```json
// data/campus.json
{
  "buildings": [
    {
      "code": "N99",
      "name": "New Building",
      "category": "Academic",
      "facilities": ["Lab", "Classroom"],
      "coordinates": {"lat": 36.37, "lng": 127.36},
      "searchKeywords": ["lab", "class"]
    }
  ]
}
```

### Add Checklist Item
```json
// data/newcomer.json
{
  "checklistItems": [
    {
      "id": "new-step",
      "title": "New Step",
      "description": "Complete this task",
      "category": "orientation",
      "priority": 11,
      "estimatedTime": "1 hour",
      "steps": ["Do this", "Then that"],
      "requiredDocuments": ["ID"],
      "location": "W2"
    }
  ]
}
```

---

## 🔧 Common Customizations

### Change Navigation Links
Edit: `components/navigation/Navigation.tsx`
```tsx
const navItems = [
  { href: '/custom', label: 'Custom Page', icon: YourIcon },
  // Add more items here
]
```

### Add New Page
1. Create: `app/your-page/page.tsx`
2. Add navigation link in `Navigation.tsx`
3. Create component in `components/your-page/`

### Modify Shuttle Calculation
Edit: `components/transport/ShuttleTracker.tsx`
```tsx
// Look for calculateNextShuttles() function
// Modify the time calculation logic
```

### Update Emergency Contacts
Edit: `data/campus.json`
```json
{
  "emergencyContacts": [
    {
      "name": "New Contact",
      "phone": "123-456-7890",
      "location": "W2",
      "available": "24/7"
    }
  ]
}
```

---

## 🐛 Troubleshooting Quick Fixes

| Problem | Solution |
|---------|----------|
| Port 3000 in use | `npx kill-port 3000` or change port in package.json |
| Module not found | `rm -rf node_modules && npm install` |
| TypeScript errors | Check imports and interface definitions |
| Scraper fails | Check Python version (need 3.8+) and dependencies |
| Data not showing | Check JSON syntax with a validator |
| Styles not applying | Run `npm run dev` to rebuild Tailwind |

---

## 📱 Testing Checklist

- [ ] Home page loads
- [ ] All navigation links work
- [ ] Shuttle tracker updates every second
- [ ] Menu tabs switch correctly
- [ ] Building search returns results
- [ ] Checklist saves progress
- [ ] Mobile view responsive
- [ ] All emergency contacts display

---

## 🚀 Deployment Checklist

### Before Deploy
- [ ] Run `npm run build` successfully
- [ ] Test production build locally (`npm run start`)
- [ ] Update environment variables
- [ ] Test all routes
- [ ] Verify mobile responsiveness

### Vercel Deployment
1. Push to GitHub
2. Import project in Vercel
3. Configure: Framework = Next.js
4. Deploy
5. Test live URL

### Scraper Setup
- [ ] Set up cron job OR
- [ ] Configure GitHub Actions OR
- [ ] Deploy as serverless function

---

## 💡 Pro Tips

1. **Development:** Use Chrome DevTools React extension
2. **Styling:** Install Tailwind CSS IntelliSense VSCode extension
3. **Types:** Let TypeScript guide you - read error messages
4. **Data:** Validate JSON at jsonlint.com before editing
5. **Git:** Commit often with clear messages
6. **Performance:** Use Next.js Image component for images
7. **SEO:** Update metadata in each page.tsx file
8. **Accessibility:** Test with keyboard navigation

---

## 📞 Support Resources

- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

## 🎓 Project Stats

| Metric | Value |
|--------|-------|
| **Total Components** | 5 |
| **Total Pages** | 5 |
| **Data Files** | 4 |
| **Buildings Cataloged** | 11 |
| **Shuttle Routes** | 3 |
| **Checklist Items** | 10 |
| **Emergency Contacts** | 4 |

---

## ⚡ Performance Tips

1. **Images:** Put in `/public` folder and use Next.js Image
2. **Data:** Consider moving large JSON to API routes
3. **localStorage:** Clear old data periodically
4. **Build:** Use `npm run build` to see bundle size

---

## 🔐 Security Notes

- Never commit `.env` files
- Use environment variables for API keys
- Validate user input if adding forms
- Keep dependencies updated: `npm audit fix`

---

## 🎉 Quick Wins

**Want to make a quick change?**

1. **Change welcome message** → Edit `app/page.tsx`
2. **Add emergency contact** → Edit `data/campus.json`
3. **Update brand colors** → Edit `tailwind.config.js`
4. **Add café hours** → Edit `data/dining.json`

---

**Last Updated:** January 7, 2026  
**Version:** 1.0.0  
**Status:** Production Ready ✅
