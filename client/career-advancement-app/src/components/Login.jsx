import "./login.css";

const Login = () => {
  return (
    <div className="login-container">
      <div className="form-container">
        <div className="form-header-buttons text-center">
          <button className="btn btn-primary mx-2">Faculty</button>
          <button className="btn btn-secondary mx-2">Admin</button>
        </div>
        <form className="p-4">
          <h2 className="text-center mb-4">Login</h2>
          <div className="form-group mb-2">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter email"
            />
          </div>
          <div className="form-group mb-2">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
            />
          </div>
          <div className="form-footer-buttons text-center mt-4">
            <button type="submit" className="btn btn-success mx-2">
              Login
            </button>
            <button type="button" className="btn btn-danger mx-2">
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
