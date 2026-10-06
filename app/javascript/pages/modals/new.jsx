import { Head, router } from '@inertiajs/react'

import ListItem from '../../components/ListItem'

export default function ModalNew() {
  return (
    <>
      <Head title="Modal Navigation" />

      <div className="top-level-container">
        <h1 className="hide@native margin-bs-xl text-large-title">Modal Navigation</h1>
        <p>This screen was presented as a modal.</p>

        <div className="formatted-list formatted-list--top-level">
          <ListItem href="/navigation/second" icon="arrow-return-bold" name="Basic navigation" description="Navigate on the main stack." />
          <ListItem href="/modal" icon="arrow-right-bold" name="Modal navigation" description="Push a screen on the modal stack." />
        </div>

        <h3 className="margin-bs-xl margin-be-l text-title">Historical Navigation</h3>

        <div className="formatted-list formatted-list--top-level">
          <ListItem onClick={() => router.post('/modal/recede')} icon="arrow-down-bold" name="Recede navigation" description="Dismiss the modal." />
          <ListItem onClick={() => router.post('/modal/refresh')} icon="arrow-clockwise-bold" name="Refresh navigation" description="Refresh this screen." />
          <ListItem onClick={() => router.post('/modal/resume')} icon="stop-bold" name="Resume navigation" description="Do nothing." />
        </div>
      </div>
    </>
  )
}
