import { Component, type ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-lg w-full">
            <div className="text-center">
              <div className="text-6xl mb-4">😵</div>
              <h1 className="text-2xl font-bold text-gray-800 mb-2">Something went wrong</h1>
              <p className="text-gray-600 mb-6">An unexpected error occurred.</p>
              <details className="text-left bg-gray-50 rounded-lg p-4 mb-6">
                <summary className="cursor-pointer text-sm font-medium text-gray-700">
                  Error Details
                </summary>
                <pre className="mt-2 text-xs text-red-600 overflow-auto whitespace-pre-wrap">
                  {this.state.error?.message}
                  {'\n\n'}
                  {this.state.error?.stack}
                </pre>
              </details>
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                Reload Page
              </button>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
