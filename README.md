# ⚡ Sundeep's Developer Portfolio — GitHub Pages Website

A modern, responsive, high-performance personal developer portfolio website designed for instantaneous deployment on **GitHub Pages**.

Built with pure **HTML5**, modern **CSS3 (Custom Properties & Glassmorphism)**, and vanilla **JavaScript (ES6+)** with **zero build step or third-party dependencies required**.

---

## ✨ Features

- 🌓 **Dark & Light Mode**: Built-in toggle with automatic system theme detection and `localStorage` persistence.
- 📱 **Fully Responsive**: Mobile-first design looking sharp across smartphones, tablets, and desktop displays.
- ⚡ **Zero Build Step**: Native static files ready to be hosted directly on GitHub Pages.
- ✍️ **Dynamic Typing Animation**: Interactive hero section highlighting your developer roles.
- 📂 **Featured Projects Showcase**: Project cards equipped with tech stack badges, GitHub links, and live demo buttons.
- 🛠️ **Skill Badges & Milestones**: Organized tech stack matrix and career/education timeline.
- 📬 **Interactive Contact Form**: Client-side validated contact form and direct email/social links.

---

## 🚀 How to Deploy to GitHub Pages

### Option A: User Site (Recommended: `username.github.io`)
If your GitHub username is `Sandys101`:
1. Create a new public repository on GitHub named: **`Sandys101.github.io`**
2. In your terminal inside this folder, run:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio commit"
   git branch -M main
   git remote add origin https://github.com/Sandys101/Sandys101.github.io.git
   git push -u origin main
   ```
3. Your website will be live automatically at: **`https://Sandys101.github.io`** within 1–2 minutes!

---

### Option B: Project Site (e.g., `portfolio` or `my-website`)
If you prefer a repository named `portfolio`:
1. Create a repository named `portfolio` on GitHub.
2. Push your code:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio commit"
   git branch -M main
   git remote add origin https://github.com/Sandys101/portfolio.git
   git push -u origin main
   ```
3. On GitHub, go to your repository:
   - Click **Settings** > **Pages** (in the left sidebar).
   - Under **Build and deployment** > **Source**, choose **Deploy from a branch**.
   - Under **Branch**, select `main` and folder `/ (root)`, then click **Save**.
4. Your website will be published at: **`https://Sandys101.github.io/portfolio/`**

---

## 💻 Local Preview

You can open the website locally anytime:
- Simply double-click `index.html` in your file explorer to open it directly in your browser.
- Or use any local static server:
  ```powershell
  # Using Python:
  python -m http.server 8000
  ```
  Then open `http://localhost:8000` in your web browser.

---

## 🎨 Customizing the Website

1. **Personal Information**:
   - Open `index.html` and search for `Sundeep` or `Sandys101` to update your name, bio, and social media handles.
2. **Projects**:
   - Edit the `<article class="project-card">` blocks inside the `#projects` section of `index.html` to showcase your actual projects, live links, and GitHub repositories.
3. **Roles in Typing Animation**:
   - Open `script.js` and edit the `roles` array in `initTypingEffect()` to change the rotating titles in the hero section.
4. **Colors & Themes**:
   - Open `style.css` and tweak `--accent-primary` or the background variables in `:root` to personalize your color theme.
