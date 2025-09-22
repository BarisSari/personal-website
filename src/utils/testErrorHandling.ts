// This file is for testing error handling functionality
// It can be imported and used to simulate errors for testing

import { ErrorHandler } from './errorHandler'

export function testErrorHandling() {
  console.log('Testing error handling system...')
  
  // Test different types of errors
  ErrorHandler.addError('This is a test error message', 'TEST_ERROR')
  ErrorHandler.handleMarkdownError('/test/file.md', new Error('Test markdown error'))
  ErrorHandler.handleImageError('/test/image.jpg', new Error('Test image error'))
  ErrorHandler.handleRouteError(new Error('Test route error'))
  ErrorHandler.handleAppInitializationError(new Error('Test app init error'))
  
  console.log('Error handling test completed. Check the error notification component.')
}

// Uncomment the line below to run the test
// testErrorHandling()
