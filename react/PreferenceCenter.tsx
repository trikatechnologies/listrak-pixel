import React, { FunctionComponent } from 'react'

const PreferenceCenter: FunctionComponent = () => {
  if (!window.__listrak_pref_center) {
    console.error(
      'No Preference Center Name is defined. Please configure it in the apps admin.'
    )
    return null
  }
  return <div data-ltk-prefcenter={window.__listrak_pref_center}></div>
}

export default PreferenceCenter
