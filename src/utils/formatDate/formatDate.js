import { format } from 'date-fns'
import { isNil } from 'lodash'

export const formatDate = dateStr => !isNil(dateStr) ? format(new Date(Date.parse(dateStr)), 'yyyy-MM-dd hh:mm:ss') : ''
