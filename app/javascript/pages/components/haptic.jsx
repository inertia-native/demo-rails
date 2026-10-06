import { Head } from '@inertiajs/react'
import { useState } from 'react'

import { useBridgeHaptic } from '../../bridge/useBridgeHaptic'

const FEEDBACKS = ['success', 'warning', 'error']

export default function ComponentHaptic() {
  const { vibrate } = useBridgeHaptic()
  const [played, setPlayed] = useState(null)

  const play = (feedback) => {
    vibrate(feedback)
    setPlayed(feedback)
  }

  return (
    <>
      <Head title="Haptic Component" />

      <div className="top-level-container">
        <h1 className="hide@native margin-bs-xl text-large-title">Haptic Component</h1>
        <p>Each button asks the native side to play a piece of haptic feedback. Nothing is reported back — the feedback either plays or the device cannot play it. In a regular browser these fall back to <code>navigator.vibrate</code>, which only Android browsers have.</p>

        {FEEDBACKS.map((feedback) => (
          <button key={feedback} type="button" className="button margin-be" onClick={() => play(feedback)}>
            Play {feedback}
          </button>
        ))}

        <div className="margin-bs-l text-title">
          {played ? `Played ${played}` : null}
        </div>

        <p className="margin-bs-l">Simulators and emulators do not vibrate, and neither does a device with system haptics turned off. If you feel nothing, check there before checking the wiring.</p>
      </div>
    </>
  )
}
