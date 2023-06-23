import _SingleTreeSelect from './single'
import _MultipleTreeSelect from './multiple'
import { withMultipleTreeProvider, withSingleTreeProvider } from '../tree/provider'

import './index.scss'

export const SingleTreeSelect = withSingleTreeProvider(_SingleTreeSelect)
export const MultipleTreeSelect = withMultipleTreeProvider(_MultipleTreeSelect)
