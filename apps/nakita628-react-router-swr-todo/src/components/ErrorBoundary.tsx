import { Component, type ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className='min-h-screen bg-gradient-to-br from-red-50 to-orange-100 flex items-center justify-center p-4'>
          <div className='bg-white rounded-2xl shadow-xl p-8 max-w-lg w-full text-center'>
            <div className='text-6xl mb-4'>😵</div>
            <h1 className='text-2xl font-bold text-gray-800 mb-2'>Something went wrong</h1>
            <p className='text-gray-600 mb-6'>An unexpected error occurred.</p>
            <button
              type='button'
              onClick={() => window.location.reload()}
              className='bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors'
            >
              Reload Page
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
