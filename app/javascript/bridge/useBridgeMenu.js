import { useCallback } from 'react'
import { useBridgeComponent } from 'inertia-native/react'

/**
 * Wraps the native `menu` bridge component. Call `display` to open a native
 * bottom sheet; `onSelect` receives the index the native side reports back.
 * Check `supported` to decide between the native sheet and a web fallback.
 *
 * @returns {{ supported: boolean, display: (config: { title: string, items: Array, source: object }, onSelect: (index: number) => void) => void }}
 */
export function useBridgeMenu() {
  const { supported, send } = useBridgeComponent('menu')

  const display = useCallback(({ title, items, source }, onSelect) => {
    send('display', { title, items, source }, (message) => {
      const index = message.data?.selectedIndex
      if (index != null) onSelect?.(index)
    })
  }, [send])

  return { supported, display }
}
