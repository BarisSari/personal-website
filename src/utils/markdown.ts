import type { RouteRecordRaw } from 'vue-router'
import matter from 'gray-matter'
import { glob } from 'glob'
import fs from 'fs'
import path from 'path'

export interface MarkdownPost {
  title: string
  date: string
  description?: string
  tags: string[]
  type: 'tech' | 'travels'
  content: string
  slug: string
}

export function getAllPosts(): MarkdownPost[] {
  const posts: MarkdownPost[] = []
  
  // Get tech posts
  const techFiles = glob.sync('content/posts/*.md')
  techFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf-8')
    const { data, content: markdownContent } = matter(content)
    const slug = path.basename(file, '.md')
    
    posts.push({
      title: data.title || slug,
      date: data.date || new Date().toISOString(),
      description: data.description,
      tags: data.tags || [],
      type: 'tech',
      content: markdownContent,
      slug
    })
  })

  // Get travel posts
  const travelFiles = glob.sync('content/posts/travels/*.md')
  travelFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf-8')
    const { data, content: markdownContent } = matter(content)
    const slug = path.basename(file, '.md')
    
    posts.push({
      title: data.title || slug,
      date: data.date || new Date().toISOString(),
      description: data.description,
      tags: data.tags || [],
      type: 'travels',
      content: markdownContent,
      slug
    })
  })

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPostsByType(type: 'tech' | 'travels'): MarkdownPost[] {
  return getAllPosts().filter(post => post.type === type)
}

export function getPostBySlug(slug: string, type: 'tech' | 'travels'): MarkdownPost | undefined {
  return getAllPosts().find(post => post.slug === slug && post.type === type)
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
  return getAllPosts().filter(post => post.tags.includes(tag))
}

export function createMarkdownRoutes(): RouteRecordRaw[] {
  const posts = getAllPosts()
  const routes: RouteRecordRaw[] = []
  
  // Create dynamic routes for each post
  posts.forEach(post => {
    const routePath = post.type === 'tech' 
      ? `/blog/tech/${post.slug}`
      : `/blog/travels/${post.slug}`
    
    routes.push({
      path: routePath,
      name: `${post.type}Post-${post.slug}`,
      component: () => import(`../templates/${post.type === 'tech' ? 'Post' : 'TravelPost'}.vue`),
      props: { post }
    })
  })
  
  return routes
}
