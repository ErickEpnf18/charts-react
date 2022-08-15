import '../styles/globals.css'
import Script from 'next/script'

function MyApp({ Component, pageProps }) {
  return (
<div>
<Script src="https://unpkg.com/frappe-charts@1.2.4/dist/frappe-charts.min.iife.js" />

    <Component {...pageProps} />
</div>

  );
}

export default MyApp
