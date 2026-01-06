# KAIST Menu Scraper

This Python script scrapes the daily menu from the official KAIST website and exports it as JSON.

## Installation

```bash
pip install -r requirements.txt
```

## Usage

```bash
python menu_scraper.py
```

This will create/update `menu_data.json` with the latest menu information.

## Output Format

```json
{
  "lastUpdated": "2026-01-07T10:30:00",
  "source": "https://www.kaist.ac.kr/en/html/campus/053001.html",
  "cafeterias": {
    "north": {
      "name": "North Cafeteria (Kaimaru N11)",
      "breakfast": [...],
      "lunch": [...],
      "dinner": [...]
    }
  }
}
```

## Integration

The generated JSON file can be:
1. Served via an API endpoint (e.g., `/api/menus`)
2. Copied to the frontend's public directory
3. Stored in a database

## Scheduling

To run automatically, set up a cron job (Linux/Mac) or Task Scheduler (Windows):

### Linux/Mac Cron
```bash
# Run every day at 6 AM
0 6 * * * cd /path/to/backend/scraper && python menu_scraper.py
```

### Windows Task Scheduler
Create a task that runs `python menu_scraper.py` daily at 6 AM.

## Notes

- The scraper uses mock data as a fallback if the KAIST website structure changes
- Adjust HTML selectors in the script based on actual website structure
- The KAIST website may require authentication or have rate limiting
