import React, { useCallback } from 'react'

import ChangeProps, { GetFormGridItems } from '../changeProps'
import { groups, getItems } from '../styleConfig'

export default function StartStyle() {
  const getFormGridItems: GetFormGridItems = useCallback((marrow, handleChange) => {
    return getItems(marrow, ['startStyle'], handleChange)
  }, [])

  return <ChangeProps getFormGridItems={getFormGridItems} groups={groups} />
}