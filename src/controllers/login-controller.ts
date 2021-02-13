class LoginController {
  default() {
    return {
      text: `You've reached the ${this.constructor.name} default method`
    };
  }
}

export =  new LoginController();
