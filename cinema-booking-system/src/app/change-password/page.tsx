export default function Home() {
    return (
        <div className="container">
          <h1>Change Password</h1>
          <div className="email block">
            <label htmlFor="frm-email">Current Password</label>
            <input
              id="inp"
              type="email"
              name="email"
              //value={email}
              //onChange={handleEmailChange}
              autoComplete="email"
              required
            />
          </div>
          <div className="password block">
            <label htmlFor="frm-password">New Password</label>
            <input
              id="inp"
              type="password"
              name="password"
              //value={password}
              //onChange={handlePasswordChange}
              autoComplete="current-password"
              required
            />
          </div>
          <div className="password block">
            <label htmlFor="frm-password">Re-enter New Password</label>
            <input
              id="inp"
              type="password"
              name="password"
              //value={password}
              //onChange={handlePasswordChange}
              autoComplete="current-password"
              required
            />
          </div>
          <div className="sign-in button block">
            <button type="submit">Save Changes</button>
          </div>
        </div>
      );
}