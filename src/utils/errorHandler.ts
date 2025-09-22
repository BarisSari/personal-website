export interface AppError {
  message: string
  code?: string
  details?: any
  timestamp: Date
}

export class ErrorHandler {
  private static errors: AppError[] = []
  private static listeners: ((error: AppError) => void)[] = []

  static addError(message: string, code?: string, details?: any): AppError {
    const error: AppError = {
      message,
      code,
      details,
      timestamp: new Date()
    }
    
    this.errors.push(error)
    
    // Notify listeners
    this.listeners.forEach(listener => listener(error))
    
    // Log to console in development
    if (import.meta.env.DEV) {
      console.error('App Error:', error)
    }
    
    return error
  }

  static getErrors(): AppError[] {
    return [...this.errors]
  }

  static clearErrors(): void {
    this.errors = []
  }

  static onError(callback: (_error: AppError) => void): () => void {
    this.listeners.push(callback)
    
    // Return unsubscribe function
    return () => {
      const index = this.listeners.indexOf(callback)
      if (index > -1) {
        this.listeners.splice(index, 1)
      }
    }
  }

  static handleMarkdownError(filePath: string, error: any): void {
    this.addError(
      `Failed to process markdown file: ${filePath}`,
      'MARKDOWN_PROCESSING_ERROR',
      { filePath, originalError: error }
    )
  }

  static handleRouteError(error: any): void {
    this.addError(
      'Failed to create dynamic routes',
      'ROUTE_CREATION_ERROR',
      { originalError: error }
    )
  }

  static handleImageError(imageSrc: string, error: any): void {
    this.addError(
      `Failed to load image: ${imageSrc}`,
      'IMAGE_LOAD_ERROR',
      { imageSrc, originalError: error }
    )
  }

  static handleAppInitializationError(_error: any): void {
    this.addError(
      'Application initialization failed',
      'APP_INIT_ERROR',
      { originalError: _error }
    )
  }
}

// Helper function to create user-friendly error messages
export function getUserFriendlyMessage(error: AppError): string {
  switch (error.code) {
    case 'MARKDOWN_PROCESSING_ERROR':
      return 'There was an issue loading some content. Please refresh the page.'
    case 'ROUTE_CREATION_ERROR':
      return 'Navigation setup failed. Some pages may not be accessible.'
    case 'IMAGE_LOAD_ERROR':
      return 'Some images failed to load. This may affect the visual experience.'
    case 'APP_INIT_ERROR':
      return 'Application failed to start properly. Please refresh the page.'
    default:
      return error.message || 'An unexpected error occurred. Please try again.'
  }
}
