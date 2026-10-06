import { createInertiaApp } from '@inertiajs/react'

import Layout from '../components/Layout'
import { initHotwireNative } from 'inertia-native'

// Install the Hotwire Native bridge (window.Turbo shim). Inert in a regular
// browser; connects to the native turbo.js adapter inside Hotwire Native.
// Debug logging is on in dev builds and inside the native web view (where the
// build is "production" but the bridge trace is still useful).
initHotwireNative({ debug: true })

createInertiaApp({
  pages: "../pages",

  strictMode: true,

  resolve: (name) => {
    const pages = import.meta.glob('../pages/**/*.jsx')
    return pages[`../pages/${name}.jsx`]().then((page) => {
      // Apply the shared layout to every page unless the page opts out.
      page.default.layout ||= (pageContent) => <Layout>{pageContent}</Layout>
      return page
    })
  },

  defaults: {
    form: {
      forceIndicesArrayFormatInFormData: false,
      withAllErrors: true,
    },
    visitOptions: () => {
      return { queryStringArrayFormat: "brackets" }
    },
  },
}).catch((error) => {
  // This ensures this entrypoint is only loaded on Inertia pages
  // by checking for the presence of the root element (#app by default).
  if (document.getElementById("app")) {
    throw error
  } else {
    console.error("Missing root element. Inertia.js was loaded on a non-Inertia page.")
  }
})
