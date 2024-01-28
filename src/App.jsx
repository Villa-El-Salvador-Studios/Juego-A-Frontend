import AppRouter from './routing/AppRouting'
import { FullScreenProvider } from './shared/full-screen/FullScreen'

const App = () => {

  return (
    <FullScreenProvider>
      <AppRouter></AppRouter>
    </FullScreenProvider>
  )
}

export default App
