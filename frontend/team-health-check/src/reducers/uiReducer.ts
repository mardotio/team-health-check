import { UiActions } from '../actions/uiActions';

interface UiState {
  modalId: string | null;
}

const defaultUiState: UiState = {
  modalId: null,
};

const uiReducer = (state = defaultUiState, action: UiActions) => {
  switch (action.type) {
    case 'OPEN_MODAL':
      return {
        ...state,
        modalId: action.payload,
      };
    case 'CLOSE_MODAL':
      return {
        ...state,
        modalId: state.modalId === action.payload ? null : state.modalId,
      };
    case 'CLOSE_MODALS':
      return {
        ...state,
        modalId: null,
      };
    default:
      return state;
  }
};

export default uiReducer;
