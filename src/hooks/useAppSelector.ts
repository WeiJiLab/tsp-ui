import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { RootState } from '../redux/store';

// Use throughout your app instead of plain `useSelector`
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export { useAppSelector };
