// Utility function to process GitHub Gist URLs
export function processGistUrls(content: string): string {
  return content.replace(
    /<a href="(https:\/\/gist\.github\.com\/(?:[^/]+\/)?([a-f0-9]+))"[^>]*>([^<]*)<\/a>/gi,
    '<div class="gist-embed" data-gist-id="$2"></div>'
  )
}
