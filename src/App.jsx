import AppRouter from '../routing/AppRouting'
import { FullScreenProvider } from '../shared/full-screen/FullScreen'


function App() {
  return (
    <FullScreenProvider>
      <AppRouter></AppRouter>
    </FullScreenProvider>
  )
}

export default App
