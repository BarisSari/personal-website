# Baris Sari - Personal Website

A modern, responsive personal website built with Vue 3, Vite, and TypeScript. This site showcases my work as a Backend Engineer and includes both technical blog posts and travel experiences.

## 🚀 Features

- **Modern Tech Stack**: Vue 3 with Composition API, Vite, TypeScript
- **Responsive Design**: Mobile-first approach with Bootstrap 5
- **Dark/Light Theme**: Toggle between themes with persistent preference
- **Markdown Support**: Write blog posts in Markdown with syntax highlighting
- **SEO Optimized**: Meta tags, Open Graph, and structured data
- **Fast Performance**: Vite for lightning-fast development and builds
- **Type Safety**: Full TypeScript support for better development experience

## 🛠️ Tech Stack

- **Frontend**: Vue 3, TypeScript, Vite
- **Styling**: SCSS, Bootstrap 5, Custom CSS Variables
- **Build Tool**: Vite
- **Markdown**: markdown-it with Prism.js syntax highlighting
- **Deployment**: Netlify (configurable)

## 📦 Installation

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/barissari/personal-website.git
   cd personal-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 🚀 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run type-check` - Run TypeScript type checking

## 📁 Project Structure

```
src/
├── components/          # Reusable Vue components
│   ├── Author.vue      # Author profile component
│   ├── PostCard.vue    # Blog post card component
│   └── ...
├── pages/              # Page components
│   ├── Index.vue       # Homepage
│   ├── TechBlog.vue    # Tech blog listing
│   └── TravelsBlog.vue # Travel blog listing
├── templates/          # Post templates
│   ├── Post.vue        # Tech post template
│   └── TravelPost.vue  # Travel post template
├── utils/              # Utility functions
│   └── markdown.ts     # Markdown processing
├── assets/             # Static assets
│   ├── style/          # SCSS styles
│   └── icons/          # SVG icons
└── admin/              # Admin panel
```

## ✍️ Writing Blog Posts

### Tech Posts
Create markdown files in `content/posts/` with frontmatter:

```markdown
---
title: "Your Post Title"
date: "2024-01-01"
description: "Post description"
tags: ["tag1", "tag2"]
---

Your post content here...
```

### Travel Posts
Create markdown files in `content/posts/travels/` with the same frontmatter format.

### Images
- Place images in `content/posts/images/`
- Use descriptive filenames like `post-slug-front.jpg`
- Images are automatically optimized by Vite

## 🎨 Customization

### Styling
- Modify `src/assets/style/variables.scss` for color schemes and spacing
- Update `src/assets/style/index.scss` for global styles
- Component-specific styles are in each `.vue` file

### Content
- Update `src/components/Author.vue` for personal information
- Modify social links in the same component
- Update site metadata in `index.html`

### Configuration
- Vite configuration: `vite.config.js`
- TypeScript configuration: `tsconfig.json`
- ESLint configuration: `.eslintrc.js`

## 🚀 Deployment

### Netlify (Recommended)

1. **Connect your repository** to Netlify
2. **Build settings**:
   - Build command: `npm run build`
   - Publish directory: `dist`
3. **Deploy** - Netlify will automatically build and deploy

### Other Platforms

The built files in the `dist` directory can be deployed to any static hosting service:
- Vercel
- GitHub Pages
- AWS S3 + CloudFront
- Firebase Hosting

### Performance
- Vite for fast development builds
- Code splitting for optimal loading
- Image optimization
- CSS purging in production

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

- **Email**: bayrambariss@gmail.com
- **LinkedIn**: [baris-sari](https://www.linkedin.com/in/bayram-baris-sari/)
- **GitHub**: [barissari](https://github.com/barissari)
- **Website**: [barissari.com](https://barissari.com)

---

Built with ❤️ by Baris Sari