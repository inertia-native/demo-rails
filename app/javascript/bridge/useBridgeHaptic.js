import { useCallback } from 'react'
import { useBridgeComponent } from 'inertia-hotwire-native/react'

// Rough web equivalents, in milliseconds. The native side has real haptics and
// picks its own feel — this only exists so the call does something in an
// Android browser.
const WEB_PATTERNS = {
  success: [12],
  warning: [12, 80, 12],
  error: [30, 80, 30],
}

/**
 * Wraps the native `haptic` bridge component. Call `vibrate` to play one piece
 * of feedback. Outside of Hotwire Native it falls back to `navigator.vibrate`
 * where the browser has it, so the caller never has to branch — `supported` is
 * returned for pages that want to hide a control that would do nothing.
 *
 * Native never answers, so there is no callback to clean up.
 *
 * @returns {{ supported: boolean, vibrate: (feedback?: 'success' | 'warning' | 'error') => void }}
 */
export function useBridgeHaptic() {
  const { supported, send } = useBridgeComponent('haptic')

  const vibrate = useCallback(
    (feedback = 'success') => {
      if (supported) {
        send('vibrate', { feedback })
        return
      }

      // Absent on iOS Safari and on desktop; present but gesture-gated on
      // Android. Nothing to do when it is missing.
      navigator.vibrate?.(WEB_PATTERNS[feedback] ?? WEB_PATTERNS.success)
    },
    [supported, send]
  )

  return { supported, vibrate }
}
