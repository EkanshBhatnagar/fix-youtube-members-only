# YouTube Member-Only Video Remover

A Chrome extension that automatically removes member-only videos from YouTube suggestions, including the homepage and sidebar recommendations.

## Installation

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode" using the toggle in the top right
3. Click "Load unpacked"
4. Select this directory (`fix-youtube-crap`)
5. The extension should now be active

## How It Works

The extension:
- Monitors YouTube pages for video elements
- Identifies videos marked as "Members only" or "Members first"
- Automatically removes them from the DOM
- Works seamlessly with both old and new YouTube layouts
- Handles dynamically loaded content

## Features

- Removes member-only videos from homepage grid
- Removes member-only videos from sidebar recommendations
- Supports new YouTube sidebar layout (yt-lockup-view-model)
- Works on homepage, sidebar, search results, and playlists
- Lightweight and runs silently in the background
- No configuration needed - works automatically
