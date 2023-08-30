import { defineConfig } from 'vite'
import getConfig from './common'

export default defineConfig(getConfig('rabbit', true))
