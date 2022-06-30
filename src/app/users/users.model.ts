export class Users {
  public userID!: number;
  public userName!: string;
  public userStatus!: string;
  public userAge!: number;
  public userJob!: string;
  public userCourses!: {
    courseName: string;
    measuredAT: number;
    completedAT: string;
  }[];

  constructor(
    userID: number,
    userName: string,
    userStatus: string,
    userAge: number,
    userJob: string,
    userCourses: {
      courseName: string;
      measuredAT: number;
      completedAT: string;
    }[]
  ) {
    this.userID = userID;
    this.userName = userName;
    this.userStatus = userStatus;
    this.userAge = userAge;
    this.userJob = userJob;
    this.userCourses = userCourses;
  }
}
