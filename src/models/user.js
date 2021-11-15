export class User{
    constructor(username, password, firstName, lastName,phoneNumber, emailAddress, role, id, token) {
        this.username = username;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
        this.emailAddress = emailAddress;
        this.role = role;
        this.id = id;
        this.token = token;
    }
}