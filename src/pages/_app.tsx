import type { AppProps } from 'next/app'
import { HotelContextProvider } from '../Context/HotelContext'
 
export default function App({ Component, pageProps }: AppProps) {
  return (
    <HotelContextProvider>
        <Component {...pageProps} />
    </HotelContextProvider>
  )
}