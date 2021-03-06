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
  users: [
    new Users(0, 'Baris', 'Active', 32, 'Frontend Developer', [
      {
        courseName: 'Angular',
        measuredAT: 123456789,
        completedAT: '2021-10-26 12:15:44',
      },
      {
        courseName: 'React',
        measuredAT: 123456789,
        completedAT: '2021-10-26 12:15:44',
      },
    ]),
    new Users(1, 'Joe', 'Passive', 25, 'Backend Developer', [
      {
        courseName: 'Javascript',
        measuredAT: 123456789,
        completedAT: '2021-10-26 12:15:44',
      },
    ]),
    new Users(2, 'Tommy', 'Passive', 39, 'Soldier', [
      {
        courseName: 'Javascript',
        measuredAT: 123456789,
        completedAT: '2021-10-26 12:15:44',
      },
    ]),
    new Users(3, 'Jane', 'Active', 33, 'Farmer', [
      {
        courseName: 'Javascript',
        measuredAT: 123456789,
        completedAT: '2021-10-26 12:15:44',
      },
    ]),
    new Users(4, 'Jack', 'Active', 34, 'Glazier', [
      {
        courseName: 'Javascript',
        measuredAT: 123456789,
        completedAT: '2021-10-26 12:15:44',
      },
    ]),
    new Users(5, 'Jill', 'Passive', 35, 'Doctor', [
      {
        courseName: 'Javascript',
        measuredAT: 123456789,
        completedAT: '2021-10-26 12:15:44',
      },
    ]),
    new Users(6, 'Jone', 'Active', 36, 'Baker', [
      {
        courseName: 'Javascript',
        measuredAT: 123456789,
        completedAT: '2021-10-26 12:15:44',
      },
    ]),
    new Users(7, 'Jenny', 'Active', 37, 'Baby Sitter', [
      {
        courseName: 'Javascript',
        measuredAT: 123456789,
        completedAT: '2021-10-26 12:15:44',
      },
    ]),
    new Users(8, 'Salia', 'Active', 38, 'Frontend Developer', [
      {
        courseName: 'Javascript',
        measuredAT: 123456789,
        completedAT: '2021-10-26 12:15:44',
      },
    ]),
    new Users(9, 'Mariam', 'Passive', 39, 'Accountant', [
      {
        courseName: 'Javascript',
        measuredAT: 123456789,
        completedAT: '2021-10-26 12:15:44',
      },
    ]),
    new Users(10, 'Michael', 'Active', 30, 'Acrobat', [
      {
        courseName: 'Javascript',
        measuredAT: 123456789,
        completedAT: '2021-10-26 12:15:44',
      },
    ]),
    new Users(11, 'Brad', 'Active', 31, 'Baker', [
      {
        courseName: 'Javascript',
        measuredAT: 123456789,
        completedAT: '2021-10-26 12:15:44',
      },
    ]),
    new Users(12, 'Janet', 'Passive', 32, 'Engineer', [
      {
        courseName: 'Javascript',
        measuredAT: 123456789,
        completedAT: '2021-10-26 12:15:44',
      },
    ]),
    new Users(13, 'Tulip', 'Active', 33, 'Cashier', [
      {
        courseName: 'Javascript',
        measuredAT: 123456789,
        completedAT: '2021-10-26 12:15:44',
      },
    ]),
    new Users(14, 'Bloom', 'Passive', 34, 'Jeweller', [
      {
        courseName: 'Javascript',
        measuredAT: 123456789,
        completedAT: '2021-10-26 12:15:44',
      },
    ]),
    new Users(15, 'Kareem', 'Passive', 36, 'Jockey', [
      {
        courseName: 'Javascript',
        measuredAT: 123456789,
        completedAT: '2021-10-26 12:15:44',
      },
    ]),
  ],
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
      tableTotalPages: 0,
    },
    nonFilteredUsersTableData: [
      // new Users(8, 'Salia', 'Active', 38, 'Frontend Developer', [
      //   {
      //     courseName: 'Javascript',
      //     measuredAT: 123456789,
      //     completedAT: '2021-10-26 12:15:44',
      //   },
      // ]),
      // new Users(9, 'Mariam', 'Passive', 39, 'Accountant', [
      //   {
      //     courseName: 'Javascript',
      //     measuredAT: 123456789,
      //     completedAT: '2021-10-26 12:15:44',
      //   },
      // ]),
      // new Users(10, 'Michael', 'Active', 30, 'Acrobat', [
      //   {
      //     courseName: 'Javascript',
      //     measuredAT: 123456789,
      //     completedAT: '2021-10-26 12:15:44',
      //   },
      // ]),
      // new Users(11, 'Brad', 'Active', 31, 'Baker', [
      //   {
      //     courseName: 'Javascript',
      //     measuredAT: 123456789,
      //     completedAT: '2021-10-26 12:15:44',
      //   },
      // ]),
      // new Users(12, 'Janet', 'Passive', 32, 'Engineer', [
      //   {
      //     courseName: 'Javascript',
      //     measuredAT: 123456789,
      //     completedAT: '2021-10-26 12:15:44',
      //   },
      // ]),
      // new Users(13, 'Tulip', 'Active', 33, 'Cashier', [
      //   {
      //     courseName: 'Javascript',
      //     measuredAT: 123456789,
      //     completedAT: '2021-10-26 12:15:44',
      //   },
      // ]),
      // new Users(14, 'Bloom', 'Passive', 34, 'Jeweller', [
      //   {
      //     courseName: 'Javascript',
      //     measuredAT: 123456789,
      //     completedAT: '2021-10-26 12:15:44',
      //   },
      // ]),
      // new Users(15, 'Kareem', 'Passive', 36, 'Jockey', [
      //   {
      //     courseName: 'Javascript',
      //     measuredAT: 123456789,
      //     completedAT: '2021-10-26 12:15:44',
      //   },
      // ]),
    ],
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
        tableParameters: {
          ...state.tableParameters,
          nonFilteredUsersTableData: [...action.payload],
          tablePaginationInfo: {
            ...state.tableParameters.tablePaginationInfo,
            tableTotalPages: Math.ceil(
              action.payload.length /
                state.tableParameters.tablePaginationInfo.paginationLimit
            ),
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
            paginationOffset:
              (action.payload - 1) *
              state.tableParameters.tablePaginationInfo.paginationLimit,
          },
        },
      };
    // case UsersActions.UPDATE_TABLEPAGEOFFSET:
    //   return {
    //     ...state,
    //     tableParameters: {
    //       ...state.tableParameters,
    //       tablePaginationInfo: {
    //         ...state.tableParameters.tablePaginationInfo,
    //         paginationOffset:
    //           (state.tableParameters.tablePaginationInfo.currentPage - 1) *
    //           state.tableParameters.tablePaginationInfo.paginationLimit,
    //       },
    //     },
    //   };
    case UsersActions.FILTERING_SEARCHED_USERS:
      return {
        ...state,
        tableParameters: {
          ...state.tableParameters,
          filterTypes: {
            ...state.tableParameters.filterTypes,
            searchName: action.payload,
          },
        },
      };
    case UsersActions.FILTERING_USER_STATUSES:
      return {
        ...state,
        tableParameters: {
          ...state.tableParameters,
          filterTypes: {
            ...state.tableParameters.filterTypes,
            userStatusFilter: action.payload,
          },
        },
      };
    case UsersActions.lIMITING_TABLEPAGEROWCOUNT:
      return {
        ...state,
        tableParameters: {
          ...state.tableParameters,
          tablePaginationInfo: {
            ...state.tableParameters.tablePaginationInfo,
            paginationLimit: Number(action.payload),
            tableTotalPages: Math.ceil(
              state.tableParameters.nonFilteredUsersTableData.length /
                Number(action.payload)
            ),
          },
        },
      };
    case UsersActions.CLEAR_TABLE_FILTERS:
      return {
        ...state,
        tableParameters: {
          ...state.tableParameters,
          filterTypes: {
            ...state.tableParameters.filterTypes,
            searchName: '',
            userStatusFilter: '',
          },
          tablePaginationInfo: {
            ...state.tableParameters.tablePaginationInfo,
            paginationLimit:
              state.tableParameters.tablePaginationInfo.defaultPaginationLimit,
            tableTotalPages: Math.ceil(
              state.tableParameters.nonFilteredUsersTableData.length /
                state.tableParameters.tablePaginationInfo.defaultPaginationLimit
            ),
          },
        },
      };
    case UsersActions.ADD_USER:
      return {
        ...state,
        tableParameters: {
          ...state.tableParameters,
          nonFilteredUsersTableData: [
            ...state.tableParameters.nonFilteredUsersTableData,
            action.payload,
          ],
          tablePaginationInfo: {
            ...state.tableParameters.tablePaginationInfo,
            tableTotalPages: Math.ceil(
              (state.tableParameters.nonFilteredUsersTableData.length + 1) /
                state.tableParameters.tablePaginationInfo.paginationLimit
            ),
          },
        },
      };
    case UsersActions.UPDATE_USER:
      return {
        ...state,
        tableParameters: {
          ...state.tableParameters,
          nonFilteredUsersTableData:
            state.tableParameters.nonFilteredUsersTableData.map((user) =>
              user.userID === action.payload.id
                ? { ...user, ...action.payload.updatedUserInformations }
                : user
            ),
        },
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
        tableParameters: {
          ...state.tableParameters,
          nonFilteredUsersTableData:
            state.tableParameters.nonFilteredUsersTableData.filter(
              (user) => user.userID !== action.payload
            ),
          tablePaginationInfo: {
            ...state.tableParameters.tablePaginationInfo,
            tableTotalPages: Math.ceil(
              (state.tableParameters.nonFilteredUsersTableData.length - 1) /
                state.tableParameters.tablePaginationInfo.paginationLimit
            ),
          },
        },
      };

    default:
      return state;
  }
}
