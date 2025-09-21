import type { RouteRecordRaw } from 'vue-router'

export interface MarkdownPost {
  title: string
  date: string
  description?: string
  tags: string[]
  type: 'tech' | 'travels'
  content: string
  slug: string
  frontmatter?: Record<string, unknown>
}

// Load markdown files using import.meta.glob with raw content
const markdownModules = import.meta.glob('/content/posts/**/*.md', { as: 'raw', eager: true })

// Simple frontmatter parser (since gray-matter is causing issues)
function parseFrontmatter(content: string) {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/
  const match = content.match(frontmatterRegex)
  
  if (!match) {
    return { data: {}, content }
  }
  
  const frontmatter = match[1]
  const markdownContent = match[2]
  
  // Simple YAML-like parsing for basic frontmatter
  const data: Record<string, unknown> = {}
  const lines = frontmatter.split('\n')
  
  for (const line of lines) {
    const colonIndex = line.indexOf(':')
    if (colonIndex > 0) {
      const key = line.substring(0, colonIndex).trim()
      let value = line.substring(colonIndex + 1).trim()
      
      // Remove quotes if present
      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1)
      }
      
      // Handle arrays (tags)
      if (key === 'tags' && value.startsWith('[') && value.endsWith(']')) {
        const arrayContent = value.slice(1, -1)
        data[key] = arrayContent.split(',').map(item => item.trim().replace(/['"]/g, ''))
      } 
      // Handle booleans
      else if (value === 'true') {
        data[key] = true
      } else if (value === 'false') {
        data[key] = false
      } else {
        data[key] = value
      }
    }
  }
  
  return { data, content: markdownContent }
}

function loadMarkdownPosts(): MarkdownPost[] {
  const posts: MarkdownPost[] = []
  
  try {
    for (const path in markdownModules) {
      try {
        const content = markdownModules[path] as string
        const { data, content: markdownContent } = parseFrontmatter(content)
        
        // Determine type based on path
        const type = path.includes('/travels/') ? 'travels' : 'tech'
        
        // Create slug from filename
        const slug = path
          .split('/')
          .pop()
          ?.replace('.md', '')
          ?.toLowerCase()
          ?.replace(/\s+/g, '-') || ''
        
        console.log(`Generated slug for ${path}: "${slug}"`)
        
        // Skip unpublished posts
        if (data.published === false) {
          console.log(`Skipping unpublished post: ${path}`)
          continue
        }
        
        posts.push({
          title: data.title,
          date: data.date || new Date().toISOString().split('T')[0],
          description: data.description,
          tags: Array.isArray(data.tags) ? data.tags : [],
          type,
          content: markdownContent,
          slug,
          frontmatter: data
        })
      } catch (error) {
        console.error(`Error processing markdown file ${path}:`, error)
        // Continue with other files
      }
    }
  } catch (error) {
    console.error('Error loading markdown posts:', error)
    return []
  }
  
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getAllPosts(): MarkdownPost[] {
  return loadMarkdownPosts()
}

export function getPostsByType(type: 'tech' | 'travels'): MarkdownPost[] {
  const posts = getAllPosts()
  return posts.filter(post => post.type === type)
}

export function getPostBySlug(slug: string, type: 'tech' | 'travels'): MarkdownPost | undefined {
  const posts = getAllPosts()
  console.log(`Looking for ${type} post with slug: "${slug}"`)
  console.log(`Total posts loaded:`, posts.length)
  console.log(`Available ${type} posts:`, posts.filter(p => p.type === type).map(p => ({ slug: p.slug, title: p.title })))
  const found = posts.find(post => post.slug === slug && post.type === type)
  console.log(`Found post:`, found ? found.title : 'Not found')
  return found
}

export function getAllTags(): string[] {
  const posts = getAllPosts()
  const tagSet = new Set<string>()
  
  posts.forEach(post => {
    post.tags.forEach(tag => tagSet.add(tag))
  })
  
  return Array.from(tagSet).sort()
}

export function getPostsByTag(tag: string): MarkdownPost[] {
  const posts = getAllPosts()
  return posts.filter(post => 
    post.tags.some(postTag => postTag.toLowerCase() === tag.toLowerCase())
  )
}

export function createMarkdownRoutes(): RouteRecordRaw[] {
  // No longer needed - routes are defined statically in routes.ts
  // This function is kept for compatibility but returns empty array
  console.log('Markdown routes are now handled statically in routes.ts')
  return []
}