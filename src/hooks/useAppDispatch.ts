import { useDispatch } from 'react-redux'
import { AppDispatch } from '../redux/store'

// Use throughout your app instead of plain `useDispatch`
const useAppDispatch = () => useDispatch<AppDispatch>()

export { useAppDispatch }
