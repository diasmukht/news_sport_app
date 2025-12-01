// src/components/AuthForm.jsx
import { useState } from "react";
import { useAuth } from "./AuthContext";

export default function AuthForm({ mode = "login" }) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");
  const [load, setLoad] = useState(false);
  const { login, register } = useAuth();

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    setLoad(true);
    const res = mode === "login" ? await login(email, pass) : await register(email, pass);
    if (!res.success) setErr(res.error);
    setLoad(false);
  };

  return (
    <div style={{ minHeight:"100vh", display:"grid", placeItems:"center", background:"#f5f5f5" }}>
      <form onSubmit={submit} style={{ background:"white", padding:"40px 30px", borderRadius:16, width:"90%", maxWidth:400, boxShadow:"0 10px 30px rgba(0,0,0,.1)" }}>
        <h2 style={{textAlign:"center", marginBottom:24}}>{mode==="login"?"Вход":"Регистрация"}</h2>
        <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required style={{width:"90%", padding:16, marginBottom:16, borderRadius:12, border:"1px solid #ddd"}} />
        <input type="password" placeholder="Пароль" value={pass} onChange={e=>setPass(e.target.value)} required style={{width:"90%", padding:16, marginBottom:16, borderRadius:12, border:"1px solid #ddd"}} />
        {err && <p style={{color:"red", textAlign:"center"}}>{err}</p>}
        <button type="submit" disabled={load} style={{width:"100%", padding:16, background:"#ff6060", color:"white", border:"none", borderRadius:12, fontSize:18}}>
          {load ? "Ждём..." : mode==="login"?"Войти":"Зарегистрироваться"}
        </button>
        <p style={{textAlign:"center", marginTop:20}}>
          <a href={mode==="login"?"/register":"/login"}>
            {mode==="login"?"Нет аккаунта? Регистрация":"Уже есть аккаунт? Вход"}
          </a>
        </p>
      </form>
    </div>
  );
}