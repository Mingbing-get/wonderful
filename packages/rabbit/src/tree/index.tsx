import _SingleTree from './single'
import _MultipleTree from './multiple'
import { withSingleTreeProvider, withMultipleTreeProvider } from './provider'
import './index.scss'

export const SingleTree = withSingleTreeProvider(_SingleTree)
export const MultipleTree = withMultipleTreeProvider(_MultipleTree)
