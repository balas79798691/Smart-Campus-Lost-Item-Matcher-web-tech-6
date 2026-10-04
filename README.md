# Smart Campus Lost-Item Matcher

## Problem Statement
Lost-and-found systems usually depend on manually searching through reports. A student may describe a lost item differently from the way another student describes a found item.

## Objective
To build a browser-based application that compares lost and found reports and calculates a simple matching score using item category, color, location, and name similarity.

## Features
- Add lost or found reports
- Store item category, color, location, date, and description
- Search reports
- Compare lost and found items
- Calculate a potential match score
- Display likely matches

## Technologies
- HTML5
- CSS3
- JavaScript

## Matching Logic
The application assigns points when:
- Category matches: 25 points
- Color matches: 20 points
- Location matches: 25 points
- Common words in item names: up to 30 points

Reports with a score of 45 or above are displayed as potential matches.

## Project Structure
```text
smart-campus-lost-item-matcher/
├── index.html
├── style.css
├── script.js
├── README.md
└── .gitignore
```

## How to Run
Open `index.html` in any modern web browser.

## Future Enhancements
- Image-based item matching
- Firebase database
- User authentication
- Email notifications
- Better text similarity using NLP
