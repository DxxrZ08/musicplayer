# 🎵 MusicStream - Web Music Player

A beautiful, feature-rich web music player built with vanilla JavaScript, Bootstrap, and IndexedDB. No server required!

## ✨ Features

### 🎶 Music Playback
- Play/Pause/Next/Previous controls
- Real-time progress bar with seek
- Playback time display (e.g., "2:45 / 4:30")
- Player persists across page navigation
- Auto-play next song when current song ends

### 🎨 Browse & Discover
- **Home Page**: Trending songs, New Releases, Recently Played
- **Browse Page**: Filter by Artist, Language, or Genre
- **Search**: Find songs by title, artist, or language
- **Library**: Save your favorite songs
- **Artist Pages**: Click any artist to see all their songs

### 📝 Playlist Management
- Create playlists
- Create playlists with songs selected upfront
- Add/remove songs from playlists
- Rename and delete playlists

### 👨‍💼 Admin Panel
- Upload MP3 files
- Edit song metadata (title, artist, language, genre, trending status)
- Manage all songs
- Delete songs
- View upload history and statistics

### 🗂️ Local Storage
- All data stored in browser's IndexedDB (no server needed)
- Playlists saved in localStorage
- Player state saved in sessionStorage

### 🎨 User Interface
- Dark theme with beautiful gradient UI
- Responsive design (works on desktop, tablet, mobile)
- Smooth animations and transitions
- Dark modals with light text for readability

## 📋 Project Structure

```
musicplayer/
├── index.html              # Home page
├── browse.html             # Browse & filter page
├── library.html            # Liked songs
├── search.html             # Search page
├── playlist.html           # Playlists management
├── profile.html            # User profile
├── artist.html             # Artist page (click artist name)
├── admin-login.html        # Admin login
├── admin-dashboard.html    # Admin dashboard
├── admin-manage.html       # Manage songs
├── admin-upload.html       # Upload songs
├── admin-users.html        # User management
├── admin-reports.html      # Reports
├── css/
│   └── style.css          # Main stylesheet
├── js/
│   ├── main.js            # Main application logic
│   ├── dbstore.js         # IndexedDB wrapper
│   └── admin.js           # Admin utilities
├── mp3/                    # Your MP3 music files
│   ├── song1.mp3
│   ├── song2.mp3
│   └── ...
└── README.md              # This file
```

## 🚀 Getting Started

### Prerequisites
- A web browser (Chrome, Firefox, Safari, Edge)
- Web server (for local development)
- MP3 files to add to your library

### Installation

1. **Clone or download the project**
   ```bash
   git clone https://github.com/yourusername/musicplayer.git
   cd musicplayer
   ```

2. **Add your MP3 files**
   - Create a `mp3/` folder in the project root
   - Add your MP3 files to this folder
   - The app will auto-load them on startup

3. **Run a local web server**
   
   **Python 3:**
   ```bash
   python -m http.server 8000
   ```
   
   **Python 2:**
   ```bash
   python -m SimpleHTTPServer 8000
   ```
   
   **Node.js (if installed):**
   ```bash
   npx http-server
   ```
   
   **Using Live Server in VS Code:**
   - Install "Live Server" extension
   - Right-click `index.html` → "Open with Live Server"

4. **Open in browser**
   - Navigate to `http://localhost:8000`
   - Or wherever your local server is running

## 📖 How to Use

### Playing Music
1. Go to **Home**, **Browse**, or **Library**
2. Click any song card to play
3. Use player controls at the bottom
4. Click artist name to see all songs by that artist

### Creating Playlists
1. Go to **Playlists**
2. Click **"+ Create with Songs"**
3. Select songs you want
4. Enter playlist name
5. Click **"Create Playlist"**

### Uploading Songs (Admin)
1. Click **Admin** in the sidebar
2. Go to **"Uploads"**
3. Enter song details:
   - Title (required)
   - Artist (required)
   - Language (required)
   - Genre
   - Trending (yes/no)
   - Cover image (optional)
4. Select MP3 file
5. Click **"Upload"**

**Admin Credentials (Demo):**
- Username: `admin`
- Password: `password`

### Filtering Songs
- On **Browse page**, use the dropdowns:
  - **All Artists** - Filter by artist
  - **All Languages** - Filter by language
  - **All Genres** - Filter by genre

## 🛠️ Technical Details

### Database
- **IndexedDB**: Stores song metadata and audio blobs
- **localStorage**: Stores playlists
- **sessionStorage**: Stores player state, user login

### Audio Player
- HTML5 `<audio>` element
- Global audio object persists across pages
- Automatic next song on track end
- Real-time progress tracking

### File Format Support
- MP3 (primary)
- WAV, OGG, FLAC (supported if browser supports)

## 📱 Browser Support
- Chrome/Chromium 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🎯 Future Features (Optional)
- [ ] Shuffle and repeat modes
- [ ] Volume control
- [ ] Equalizer
- [ ] Lyrics display
- [ ] Album art display
- [ ] Download songs
- [ ] Share playlists
- [ ] User accounts (server-based)
- [ ] Sync across devices

## 🐛 Troubleshooting

### Songs not appearing?
- Make sure MP3 files are in `mp3/` folder
- Refresh the browser (Ctrl+R or Cmd+R)
- Check browser console for errors (F12 → Console)

### Audio won't play?
- Check if MP3 file exists in `mp3/` folder
- Try a different browser
- Check file format is MP3
- Ensure your web server is running

### Playlists disappearing?
- Check if browser localStorage is enabled
- Don't clear browser data/cache
- Use same browser to access playlists

### Modal dialogs look weird?
- Hard refresh browser (Ctrl+Shift+R)
- Clear browser cache
- Try a different browser

## 📄 License
This project is open source and available under the MIT License.

## 👤 Author
Created with ❤️ for music lovers

## 📧 Support
For issues or feature requests, please create an issue on GitHub.

---

**Enjoy your music! 🎵**
