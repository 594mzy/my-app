import { useState } from 'react'
import '../css/LoginPage.css'
import { Link } from 'react-router'

function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('http://127.0.0.1:7001/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      })
      if (!res.ok) {
        const data = await res.json()
        setError(data.message || '登录失败')
      } else {
        // 登录成功后的处理
        localStorage.setItem('username', username) // 存储用户名
        window.location.href = '/HomePage'
      }
    } catch (err) {
      setError('网络错误，请稍后重试')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex justify-center items-center min-h-[95vh] bg-gradient-to-br from-pink-200 via-purple-100 to-blue-200">
      <div className="bg-white rounded-2xl shadow-lg max-w-md w-full px-12 py-14 flex flex-col items-center">
        <h2 className="text-3xl font-bold text-black mb-10">盲盒抽盒机</h2>
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
          <input
            id="username"
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            className="border-b border-gray-300 bg-transparent px-2 py-3 focus:outline-none focus:border-blue-400 text-lg mb-2"
            required
            placeholder="用户名"
          />
          <input
            id="password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="border-b border-gray-300 bg-transparent px-2 py-3 focus:outline-none focus:border-blue-400 text-lg mb-2"
            required
            placeholder="密码"
          />
          <button
            type="submit"
            className="w-full py-2 rounded-md font-bold text-white bg-gradient-to-r from-pink-300 to-blue-300 mt-2 shadow hover:from-pink-400 hover:to-blue-400 transition-all"
          >
            {loading ? '登录中...' : '登录'}
          </button>
        </form>
        {error && (
          <div className="mt-4 text-red-500 text-sm">{error}</div>
        )}
        <div className="mt-6 w-full text-center text-base">
          <span className="text-black">无账号？</span>
          <Link to="/RegisterPage" className="text-blue-400 font-semibold ml-2 hover:underline">注册</Link>
        </div>
        <div className="mt-6 w-full text-center text-base">
          <Link to="/ManagementLogin" className="text-blue-400 font-semibold ml-2 hover:underline">以管理员身份登录</Link>
        </div>
      </div>
    </div>
  )
}

export default LoginPage