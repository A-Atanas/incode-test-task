import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { Store, Dispatcher } from './store'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => Dispatcher = useDispatch
export const useAppSelector: TypedUseSelectorHook<Store> = useSelector