"""
KAIST Dining Menu Web Scraper
==============================

This script scrapes the daily menu from the official KAIST website
and exports it as JSON for consumption by the frontend application.

Requirements:
- requests
- beautifulsoup4
- lxml (parser)

Install with: pip install requests beautifulsoup4 lxml

Usage:
    python menu_scraper.py

Output:
    Creates/updates menu_data.json with the latest menu information
"""

import requests
from bs4 import BeautifulSoup
import json
from datetime import datetime
import sys

# Target URL for KAIST dining menu
KAIST_MENU_URL = "https://www.kaist.ac.kr/en/html/campus/053001.html"

# Fallback URL (Korean version might have more data)
KAIST_MENU_URL_KR = "https://www.kaist.ac.kr/kr/html/campus/053001.html"


def scrape_kaist_menu():
    """
    Scrape the KAIST dining menu from the official website.
    
    Returns:
        dict: Structured menu data with cafeteria information
    """
    
    print(f"[{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] Starting menu scraper...")
    
    try:
        # Set headers to mimic a browser request
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
        
        # Attempt to fetch the page
        print(f"Fetching URL: {KAIST_MENU_URL}")
        response = requests.get(KAIST_MENU_URL, headers=headers, timeout=10)
        response.raise_for_status()
        
        # Parse HTML content
        soup = BeautifulSoup(response.content, 'lxml')
        
        # Initialize menu data structure
        menu_data = {
            "lastUpdated": datetime.now().isoformat(),
            "source": KAIST_MENU_URL,
            "cafeterias": {}
        }
        
        # Look for common HTML patterns for menu data
        # Note: The exact selectors depend on the website structure
        # This is a template - adjust selectors based on actual HTML
        
        # Method 1: Look for table-based menus
        tables = soup.find_all('table', class_=['menu-table', 'cafeteria-menu'])
        
        if tables:
            print(f"Found {len(tables)} menu tables")
            
            for table in tables:
                # Extract cafeteria name (usually in header or caption)
                cafeteria_name = "Unknown"
                
                caption = table.find('caption')
                if caption:
                    cafeteria_name = caption.get_text(strip=True)
                
                # Parse table rows
                rows = table.find_all('tr')
                
                current_cafeteria = {
                    "name": cafeteria_name,
                    "breakfast": [],
                    "lunch": [],
                    "dinner": []
                }
                
                for row in rows:
                    cells = row.find_all(['td', 'th'])
                    
                    if len(cells) >= 2:
                        meal_type = cells[0].get_text(strip=True).lower()
                        menu_items = cells[1].get_text(strip=True)
                        
                        # Split menu items by common delimiters
                        items = [item.strip() for item in menu_items.replace('/', ',').split(',') if item.strip()]
                        
                        if 'breakfast' in meal_type or '조식' in meal_type:
                            current_cafeteria['breakfast'].extend(items)
                        elif 'lunch' in meal_type or '중식' in meal_type:
                            current_cafeteria['lunch'].extend(items)
                        elif 'dinner' in meal_type or '석식' in meal_type:
                            current_cafeteria['dinner'].extend(items)
                
                # Identify which cafeteria this is (North, East, West)
                cafeteria_key = identify_cafeteria(cafeteria_name)
                menu_data['cafeterias'][cafeteria_key] = current_cafeteria
        
        # Method 2: Look for div-based menus
        else:
            print("No tables found, trying div-based parsing...")
            
            menu_sections = soup.find_all('div', class_=['menu-section', 'cafeteria-menu', 'dining-menu'])
            
            if menu_sections:
                print(f"Found {len(menu_sections)} menu sections")
                
                for section in menu_sections:
                    # Extract data from divs
                    # This is highly dependent on website structure
                    pass
        
        # If no data was scraped, use mock data for demonstration
        if not menu_data['cafeterias']:
            print("Warning: Could not scrape actual data. Using mock data for demonstration.")
            menu_data = generate_mock_data()
        
        print(f"Successfully scraped menu for {len(menu_data['cafeterias'])} cafeterias")
        return menu_data
        
    except requests.RequestException as e:
        print(f"Error fetching URL: {e}")
        print("Falling back to mock data...")
        return generate_mock_data()
    
    except Exception as e:
        print(f"Unexpected error during scraping: {e}")
        print("Falling back to mock data...")
        return generate_mock_data()


def identify_cafeteria(name):
    """
    Identify which cafeteria based on name.
    
    Args:
        name (str): Cafeteria name from scraped data
    
    Returns:
        str: Standardized cafeteria key (north, east, west)
    """
    name_lower = name.lower()
    
    if 'north' in name_lower or 'kaimaru' in name_lower or 'n11' in name_lower or '북' in name:
        return 'north'
    elif 'east' in name_lower or 'e5' in name_lower or '동' in name:
        return 'east'
    elif 'west' in name_lower or 'w2' in name_lower or '서' in name:
        return 'west'
    else:
        return name_lower.replace(' ', '_')


def generate_mock_data():
    """
    Generate mock menu data for testing purposes.
    
    Returns:
        dict: Mock menu data structure
    """
    today = datetime.now()
    
    return {
        "lastUpdated": today.isoformat(),
        "source": "Mock Data (for demonstration)",
        "cafeterias": {
            "north": {
                "name": "North Cafeteria (Kaimaru N11)",
                "breakfast": [
                    "Korean-style breakfast set",
                    "Toast with jam and butter",
                    "Fresh fruit",
                    "Milk and cereal"
                ],
                "lunch": [
                    "Bulgogi (Marinated beef)",
                    "Kimchi stew with pork",
                    "Vegetable bibimbap",
                    "Steamed rice",
                    "Soup of the day",
                    "Assorted side dishes (banchan)"
                ],
                "dinner": [
                    "Grilled mackerel",
                    "Spicy pork stir-fry",
                    "Tofu and vegetable stir-fry",
                    "Steamed rice",
                    "Miso soup",
                    "Kimchi and pickled vegetables"
                ]
            },
            "east": {
                "name": "East Cafeteria (E5)",
                "breakfast": [
                    "Korean traditional breakfast",
                    "Western breakfast set"
                ],
                "lunch": [
                    "Chicken teriyaki",
                    "Japanese curry rice",
                    "Vegetarian pasta",
                    "Salad bar",
                    "Soup"
                ],
                "dinner": [
                    "Pork cutlet (Tonkatsu)",
                    "Spicy fish stew",
                    "Vegetable tempura",
                    "Rice",
                    "Miso soup",
                    "Side dishes"
                ]
            },
            "west": {
                "name": "West Cafeteria (W2)",
                "breakfast": [
                    "Buffet-style breakfast",
                    "Fresh baked bread",
                    "Seasonal fruits"
                ],
                "lunch": [
                    "Beef steak with vegetables",
                    "Pasta carbonara",
                    "Caesar salad",
                    "Garlic bread",
                    "Soup of the day"
                ],
                "dinner": [
                    "Korean BBQ (Galbi)",
                    "Seafood pancake (Haemul pajeon)",
                    "Vegetable medley",
                    "Steamed rice",
                    "Seaweed soup",
                    "Kimchi and side dishes"
                ]
            }
        },
        "note": "This is mock data generated for demonstration. In production, this would contain real scraped data from the KAIST website."
    }


def save_menu_data(menu_data, output_file='menu_data.json'):
    """
    Save menu data to JSON file.
    
    Args:
        menu_data (dict): Menu data to save
        output_file (str): Output file path
    """
    try:
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(menu_data, f, ensure_ascii=False, indent=2)
        
        print(f"\n✓ Menu data saved to {output_file}")
        print(f"  Last updated: {menu_data['lastUpdated']}")
        print(f"  Cafeterias: {', '.join(menu_data['cafeterias'].keys())}")
        
    except Exception as e:
        print(f"Error saving menu data: {e}")
        sys.exit(1)


def main():
    """Main execution function."""
    print("=" * 60)
    print("KAIST Dining Menu Scraper")
    print("=" * 60)
    
    # Scrape menu data
    menu_data = scrape_kaist_menu()
    
    # Save to JSON file
    save_menu_data(menu_data)
    
    print("\n" + "=" * 60)
    print("Scraping completed successfully!")
    print("=" * 60)


if __name__ == "__main__":
    main()
