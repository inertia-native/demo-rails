import { Head } from '@inertiajs/react'
import { useState } from 'react'

import { useBridgeAlert } from '../../bridge/useBridgeAlert'

export default function ComponentAlert() {
  const { show } = useBridgeAlert()
  const [outcome, setOutcome] = useState(null)

  const confirmDelete = () => {
    show(
      {
        title: 'Delete this file?',
        description: 'This cannot be undone.',
        destructive: true,
        confirm: 'Delete',
        dismiss: 'Keep',
      },
      () => setOutcome('deleted')
    )
  }

  const confirmPlain = () => {
    show({ title: 'Are you sure?' }, () => setOutcome('confirmed'))
  }

  return (
    <>
      <Head title="Alert Component" />

      <div className="top-level-container">
        <h1 className="hide@native margin-bs-xl text-large-title">Alert Component</h1>
        <p>Each button asks the native side for a confirmation dialog and only acts if you confirm it. Dismissing reports nothing back, so nothing happens. In a regular browser the same buttons fall back to the browser&rsquo;s own confirm dialog.</p>

        <button type="button" className="button" onClick={confirmDelete}>
          Delete a file
        </button>

        <button type="button" className="button margin-bs" onClick={confirmPlain}>
          Confirm with the defaults
        </button>

        <div className="margin-bs-l text-title">
          {outcome === 'deleted' ? 'File deleted' : null}
          {outcome === 'confirmed' ? 'Confirmed' : null}
        </div>
      </div>
    </>
  )
}
