class Auth {
  constructor() {
    this.aunthenticated = false;
  }

  login(cb) {
    this.aunthenticated = true;
    cb();
  }

  logout(cb) {
    this.aunthenticated = false;
    cb();
  }

  isAuthenticated() {
    return this.aunthenticated;
  }
}

export default new Auth();
