import { SelectedUsers } from '../../shared/selected-users.model';
import * as SelectedUsersPoolActions from './selected-users-pool.actions';

export interface SelectedUsersPoolState {
  selectedUsers: SelectedUsers[];
  editedItem: any;
  editedItemId: number;
}

const initialState: SelectedUsersPoolState = {
  selectedUsers: [],
  editedItem: null,
  editedItemId: -1,
};

export function selectedUsersPoolReducer(
  state = initialState,
  action: SelectedUsersPoolActions.SelectedUsersPoolActions
) {
  switch (action.type) {
    case SelectedUsersPoolActions.ADD_NONREGISTEREDUSER:
      return {
        ...state,
        selectedUsers: [...state.selectedUsers, action.payload],
      };

    case SelectedUsersPoolActions.ADD_REGISTEREDUSER:
      return {
        ...state,
        selectedUsers: [...state.selectedUsers, action.payload],
      };

    case SelectedUsersPoolActions.UPDATE_SELECTEDUSER:
      let findSelectedUserIndex = state.selectedUsers.findIndex(
        (selectedUser: SelectedUsers) =>
          selectedUser.userID === action.payload.userID
      );
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
        editedItem: null,
        editedItemId: -1,
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
    // Alternative, if index instead of id is used:
    // return {
    //   ...state,
    //   editedItemId: action.payload,
    //   editedItem: { ...state.selectedUsers[action.payload] }
    // };

    case SelectedUsersPoolActions.STOP_EDIT:
      return {
        ...state,
        editedItem: null,
        editedItemId: -1,
      };
    default:
      return state;
  }
}
