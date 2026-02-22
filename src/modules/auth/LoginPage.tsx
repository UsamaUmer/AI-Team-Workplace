import { useState } from "react";

import { useAppStore } from "../../app/store";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const store = useAppStore.getState();

  function handleSubmit(e: any) {
    e.preventDefault();
    store.login(email, password);
    console.log(store.currentUser);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Enter your Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {email}
      <input
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {password}
      <button type="submit">Submit</button>
    </form>
  );
}

export default LoginPage;
