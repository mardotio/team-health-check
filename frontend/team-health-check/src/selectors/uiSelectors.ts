import { RootState } from '../store';

const selectModalId = (state: RootState) => state.ui.modalId;

export default selectModalId;
