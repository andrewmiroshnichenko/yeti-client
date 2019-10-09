import { format, subDays } from 'date-fns'
import { isNil } from 'lodash'

export const formatTableDate = dateStr => !isNil(dateStr) ? format(new Date(Date.parse(dateStr)), 'yyyy-MM-dd hh:mm:ss') : ''

export const formatPickerDate = dateStr => dateStr ? format(dateStr, 'yyyy-MM-dd hh:mm') : dateStr

export const getLast24Hours = () => ({ startDate: new Date(Date.now()), endDate: subDays(new Date(Date.now()), 1) })