import { Users } from '../users.model';
import * as UsersActions from './users.actions';
export interface UsersState {
  users: Users[];
  tableParameters: {
    filterTypes: {
      searchName: string;
      userStatusFilter: string;
    };
    tablePaginationInfo: {
      defaultPaginationLimit: number;
      paginationLimit: number;
      paginationOffset: number;
      currentPage: number;
      tableTotalPages: number;
    };
    nonFilteredUsersTableData: Users[];
  };
}

const initialState: UsersState = {
  users: [],
  tableParameters: {
    filterTypes: {
      searchName: '',
      userStatusFilter: '',
    },
    tablePaginationInfo: {
      defaultPaginationLimit: 6,
      paginationLimit: 6,
      paginationOffset: 0,
      currentPage: 1,
      tableTotalPages: 1,
    },
    nonFilteredUsersTableData: [],
  },
};

export function usersReducer(
  state = initialState,
  action: UsersActions.UsersActions
) {
  switch (action.type) {
    case UsersActions.SET_USERS:
      return {
        ...state,
        users: [...action.payload],
        tableParameters: {
          ...state.tableParameters,
          nonFilteredUsersTableData: [...action.payload],
        },
      };
    case UsersActions.SET_TABLEPAGINATIONCOUNTS:
      // Calculate tableTotalPages
      let calculateTableTotalPages = () => {
        return Math.ceil(
          state.tableParameters.nonFilteredUsersTableData.length /
            state.tableParameters.tablePaginationInfo.paginationLimit
        );
      };
      return {
        ...state,
        tableParameters: {
          ...state.tableParameters,
          tablePaginationInfo: {
            ...state.tableParameters.tablePaginationInfo,
            tableTotalPages: calculateTableTotalPages(),
          },
        },
      };

    case UsersActions.CHANGE_TABLECURRENTPAGE:
      return {
        ...state,
        tableParameters: {
          ...state.tableParameters,
          tablePaginationInfo: {
            ...state.tableParameters.tablePaginationInfo,
            currentPage: action.payload,
          },
        },
      };
    case UsersActions.UPDATE_TABLEPAGEOFFSET:
      return {
        ...state,
        tableParameters: {
          ...state.tableParameters,
          tablePaginationInfo: {
            ...state.tableParameters.tablePaginationInfo,
            paginationOffset:
              (state.tableParameters.tablePaginationInfo.currentPage - 1) *
              state.tableParameters.tablePaginationInfo.paginationLimit,
          },
        },
      };
    case UsersActions.ADD_USER:
      return {
        ...state,
        users: [...state.users, action.payload],
      };
    case UsersActions.UPDATE_USER:
      return {
        ...state,
        users: state.users.map((user) =>
          user.userID === action.payload.id
            ? { ...user, ...action.payload.updatedUserInformations }
            : user
        ),
      };
    /* Alternative way to update user
      const updatedUser = {
        ...state.users.find(user => user.userID === action.payload.id),
        ...action.payload.updatedUserInformations,
      };
      const updatedUsers = [...state.users];
      updatedUsers[updatedUsers.indexOf(updatedUser)] = updatedUser;
      */
    case UsersActions.DELETE_USER:
      return {
        ...state,
        users: state.users.filter((user) => user.userID !== action.payload),
      };

    default:
      return state;
  }
}
