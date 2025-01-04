
export class UserModel {
    constructor({
      profileImage = null,
      firstName = "",
      lastName = "",
      phoneNumber = "",
      username = "",
      email = "",
      password = "",
      confirmPassword = "",
      role = "",
    }) {
      this.profileImage = profileImage;
      this.firstName = firstName;
      this.lastName = lastName;
      this.phoneNumber = phoneNumber;
      this.username = username;
      this.email = email;
      this.password = password;
      this.confirmPassword = confirmPassword;
      this.role = role;
    }
  }
  