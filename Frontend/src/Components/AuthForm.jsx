import React, { useState } from "react";

const AuthForm = ({ mode = "login", onSubmit }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = { email, password };
        if (mode === "signup") formData.username = username;
        onSubmit(formData);
    };
    return (
        <form onSubmit={handleSubmit}>
            <h2>{mode === "login" ? "Login" : "SignUp"}</h2>
            {
                mode === "signup" && (
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                )
            }
            <input type="text"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">{mode === "login" ? "Login" : "SignUp"}</button>
        </form>
    )
}

export default AuthForm;