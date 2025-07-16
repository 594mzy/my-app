import { useState } from 'react'

function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    // 这里可以处理登录逻辑，比如发送请求
    console.log('用户名:', username)
    console.log('密码:', password)
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="flex bg-white rounded shadow-lg overflow-hidden max-w-2xl w-full">
        {/* 左侧标题 */}
        <div className="flex items-center justify-center bg-blue-500 text-white w-1/2 p-8">
          <h2 className="text-2xl font-bold">盲盒抽盒机</h2>
        </div>
        {/* 右侧表单 */}
        <div className="w-1/2 flex items-center justify-center p-8">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full max-w-xs">
            <div className="flex items-center mb-4">
              <label className="w-20 text-right mr-2" htmlFor="username">用户名：</label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                className="border rounded px-2 py-1 flex-1"
                required
              />
            </div>
            <div className="flex items-center mb-4">
              <label className="w-20 text-right mr-2" htmlFor="password">密码：</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="border rounded px-2 py-1 flex-1"
                required
              />
            </div>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full">
              登录
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginPage