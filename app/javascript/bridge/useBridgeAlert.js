import { useCallback, useRef } from 'react'
import { useBridgeComponent } from 'inertia-native/react'

/**
 * Wraps the native `alert` bridge component. Call `show` to present a native
 * confirmation dialog; `onConfirm` runs only if the confirming action is
 * tapped. Outside of Hotwire Native it falls back to `window.confirm`, so the
 * caller never has to branch — `supported` is returned for pages that would
 * rather render their own dialog.
 *
 * @returns {{ supported: boolean, show: (options: { title: string, description?: string, destructive?: boolean, confirm?: string, dismiss?: string }, onConfirm?: () => void) => void }}
 */
export function useBridgeAlert() {
  const { supported, send } = useBridgeComponent('alert')

  // A dismissed alert is answered with silence, so its callback is never
  // invoked and would sit in the bridge's map until the page unmounts. Dropping
  // the previous one before each show keeps at most one outstanding.
  const pendingId = useRef(null)

  const show = useCallback(
    (options, onConfirm) => {
      const { title, description, destructive = false, confirm = 'OK', dismiss = 'Cancel' } = options

      if (!supported) {
        if (window.confirm([title, description].filter(Boolean).join('\n\n'))) onConfirm?.()
        return
      }

      if (pendingId.current) window.HotwireNative?.web?.removeCallback(pendingId.current)

      pendingId.current = send('show', { title, description, destructive, confirm, dismiss }, () => {
        pendingId.current = null
        onConfirm?.()
      })
    },
    [supported, send]
  )

  return { supported, show }
}
