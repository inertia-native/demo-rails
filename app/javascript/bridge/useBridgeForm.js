import { useEffect, useRef } from 'react'
import { useBridgeComponent } from 'inertia-native/react'

/**
 * Wires an Inertia form to the native `form` bridge component: asks native to
 * show its submit button (tapping it runs `onSubmit`) and reflects the
 * submitting state. Returns `supported` so the page can hide the web button.
 *
 * @param {object} options
 * @param {string} options.submitTitle - Label for the native submit button.
 * @param {boolean} options.processing - Whether a submission is in flight.
 * @param {() => void} options.onSubmit - Called when the native button is tapped.
 * @returns {{ supported: boolean }}
 */
export function useBridgeForm({ submitTitle, processing, onSubmit }) {
  const { supported, send } = useBridgeComponent('form')
  const onSubmitRef = useRef(onSubmit)
  onSubmitRef.current = onSubmit

  // Show the native submit button; its tap submits the form. Re-running this
  // effect (e.g. submitTitle changed) registers a fresh callback, so drop the
  // previous one to keep the bridge's callback map from accumulating.
  useEffect(() => {
    if (!supported) return
    const id = send('connect', { submitTitle }, () => onSubmitRef.current?.())
    return () => window.HotwireNative?.web?.removeCallback(id)
  }, [supported, submitTitle, send])

  // Enable/disable the native button while a submission is in flight.
  useEffect(() => {
    if (!supported) return
    send(processing ? 'submitDisabled' : 'submitEnabled')
  }, [supported, processing, send])

  return { supported }
}
