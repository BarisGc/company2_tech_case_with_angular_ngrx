import { SelectedUsers } from '../../shared/selected-users.model';
import * as SelectedUsersPoolActions from './selected-users-pool.actions';

export interface SelectedUsersPoolState {
  selectedUsers: SelectedUsers[];
  editedItemId: number;
  editedItem: any;
}

const initialState: SelectedUsersPoolState = {
  selectedUsers: [],
  editedItemId: -1,
  editedItem: null,
};

export function selectedUsersPoolReducer(
  state = initialState,
  action: SelectedUsersPoolActions.SelectedUsersPoolActions
) {
  switch (action.type) {
    case SelectedUsersPoolActions.ADD_SELECTEDUSER:
      return {
        ...state,
        selectedUsers: [...state.selectedUsers, action.payload],
      };
    case SelectedUsersPoolActions.UPDATE_SELECTEDUSER:
      let findSelectedUserIndex = state.selectedUsers.findIndex(
        (selectedUser: SelectedUsers) =>
          selectedUser.userID === action.payload.userID
      );
      // Id Exists
      const updatedSelectedUser = {
        ...state.selectedUsers[findSelectedUserIndex],
        ...action.payload,
      };
      const updatedSelectedUsers = [...state.selectedUsers];
      updatedSelectedUsers[findSelectedUserIndex] = updatedSelectedUser;
      return {
        ...state,
        selectedUsers: updatedSelectedUsers,
        editedItemId: -1,
        editedItem: null,
      };
    case SelectedUsersPoolActions.DELETE_SELECTEDUSER:
      return {
        ...state,
        selectedUsers: state.selectedUsers.filter(
          (selectedUser, index) =>
            selectedUser.userID !== state.editedItem.userID
        ),
        editedItemId: -1,
        editedItem: null,
      };
    case SelectedUsersPoolActions.START_EDIT:
      console.log('starteditkontrol', {
        ...state,
        editedItemId: action.payload,
        editedItem: {
          ...state.selectedUsers.find((selectedUser) => {
            return selectedUser.userID === action.payload;
          }),
        },
      });
      return {
        ...state,
        editedItemId: action.payload,
        editedItem: {
          ...state.selectedUsers.find((selectedUser) => {
            console.log('editedItemselectedUser: ', selectedUser);
            return selectedUser.userID === action.payload;
          }),
        },
      };

    case SelectedUsersPoolActions.STOP_EDIT:
      return {
        ...state,
        editedItemId: -1,
        editedItem: null,
      };
    default:
      return state;
  }
}
