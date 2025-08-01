import { useState, useEffect } from 'react'
import { NavLink } from 'react-router'

// 假设登录后用户名存储在localStorage
const getUsername = () => localStorage.getItem('username') || ''

function MyOrderPage() {
  const [search, setSearch] = useState('')
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // 获取订单列表
  useEffect(() => {
    const username = getUsername()
    if (!username) {
      setError('请先登录')
      setLoading(false)
      return
    }
    setLoading(true)
    fetch('http://127.0.0.1:7001/order/list', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username }),
    })
      .then(res => {
        if (!res.ok) throw new Error('获取订单失败')
        return res.json()
      })
      .then(data => setOrders(data))
      .catch(() => setError('订单加载失败'))
      .finally(() => setLoading(false))
  }, [])

  // 搜索过滤
  const filteredOrders = search.trim()
    ? orders.filter(order =>
        order.item &&
        order.item.toLowerCase().includes(search.trim().toLowerCase())
      )
    : orders

  // 搜索框事件
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') e.preventDefault()
  }
  const handleChange = (e) => setSearch(e.target.value)

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100">
      {/* 顶部导航栏 */}
      <nav className="flex justify-center gap-12 py-6 bg-white shadow">
        <NavLink
          to="/HomePage"
          className={({ isActive }) =>
            'text-lg font-semibold transition ' +
            (isActive ? 'text-sky-600' : 'text-gray-700 hover:text-sky-500')
          }
        >
          盲盒列表
        </NavLink>
        <NavLink
          to="/MyOrderPage"
          className={({ isActive }) =>
            'text-lg font-semibold transition ' +
            (isActive ? 'text-sky-600' : 'text-gray-700 hover:text-sky-500')
          }
        >
          我的订单
        </NavLink>
        <NavLink
          to="/show"
          className={({ isActive }) =>
            'text-lg font-semibold transition ' +
            (isActive ? 'text-sky-600' : 'text-gray-700 hover:text-sky-500')
          }
        >
          玩家秀
        </NavLink>
      </nav>

      {/* 搜索区 */}
      <div className="flex justify-center mt-10 mb-8">
        <input
          type="text"
          value={search}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="请输入物品名称搜索"
          className="w-80 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:border-sky-400 text-lg bg-white"
        />
        <button
          onClick={() => setSearch(search)}
          className="px-6 py-2 bg-sky-500 text-white rounded-r-md font-semibold hover:bg-sky-600 transition"
        >
          搜索
        </button>
        {search && (
          <button
            onClick={() => setSearch('')}
            className="ml-2 px-3 py-2 text-gray-400 hover:text-gray-600"
            title="清空"
          >
            ×
          </button>
        )}
      </div>

      {/* 订单列表 */}
      <div className="flex flex-col gap-y-4 w-full items-center mt-6">
        {loading ? (
          <div className="text-gray-400 text-lg mt-20">加载中...</div>
        ) : error ? (
          <div className="text-red-400 text-lg mt-20">{error}</div>
        ) : filteredOrders.length === 0 ? (
          <div className="text-gray-400 text-lg mt-20">暂无相关订单</div>
        ) : (
          filteredOrders.map(order => (
            <div
              key={order.id}
              className="w-1/2 h-[10vh] flex items-center border border-gray-300 rounded-lg p-3 bg-white shadow-md hover:shadow-lg transition duration-200"
            >
              {/* 左侧文字 */}
              <div className="ml-3 flex flex-col justify-center">
                <div className="font-semibold text-sm">{order.username}</div>
                <div className="font-semibold text-sm">{order.item}</div>
              </div>
              {/* 右侧文字 */}
              <div className="ml-3 flex flex-col justify-center ml-auto">
                <div className="text-xs text-gray-600">订单编号：{order.orderID}</div>
                <div className="text-xs text-gray-600">下单时间：{order.createdAt ? order.createdAt : ''}</div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default MyOrderPage