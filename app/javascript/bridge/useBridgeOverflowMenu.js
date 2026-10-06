import { useEffect, useRef } from 'react'
import { useBridgeComponent } from 'inertia-native/react'

/**
 * Registers the native `overflow-menu` component: shows a 3-dot button in the
 * app bar that runs `onTap` when pressed. Pass `enabled: false` to skip
 * registration. Returns `supported` (true only when enabled and the native
 * component is available) so the page can hide its web button.
 *
 * @param {object} options
 * @param {boolean} [options.enabled] - Whether to register the button.
 * @param {string} options.label - Label for the native button.
 * @param {() => void} options.onTap - Called when the native button is tapped.
 * @returns {{ supported: boolean }}
 */
export function useBridgeOverflowMenu({ enabled = true, label, onTap }) {
  const { supported, send } = useBridgeComponent('overflow-menu')
  const active = enabled && supported
  const onTapRef = useRef(onTap)
  onTapRef.current = onTap

  // Register the native 3-dot button; its tap runs the latest onTap.
  useEffect(() => {
    if (!active) return
    send('connect', { label }, () => onTapRef.current?.())
  }, [active, label, send])

  return { supported: active }
}
