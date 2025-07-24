import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router'

// 示例数据，可替换为实际数据源
const blindBoxList = [
  {
    id: 1,
    name: '动漫盲盒',
    img: 'https://img.example.com/box1.jpg',
    left: 12,
  },
  {
    id: 2,
    name: '潮玩盲盒',
    img: 'https://img.example.com/box2.jpg',
    left: 5,
  },
  {
    id: 3,
    name: '手办盲盒',
    img: 'https://img.example.com/box3.jpg',
    left: 20,
  },
  // ...可继续添加
]

function HomePage() {
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  // 过滤逻辑
  const filteredList = search.trim()
    ? blindBoxList.filter(item =>
        item.name.toLowerCase().includes(search.trim().toLowerCase())
      )
    : blindBoxList

  // 输入框回车搜索
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      // 这里不需要额外处理，受控输入已自动过滤
    }
  }

  // 清空输入框时恢复全部
  const handleChange = (e) => {
    setSearch(e.target.value)
  }

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
          to="/orders"
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
          placeholder="请输入盲盒名称搜索"
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

      {/* 盲盒卡片列表 */}
      <ul className="flex flex-wrap gap-6 justify-center px-4 pb-16">
        {filteredList.length === 0 ? (
          <div className="text-gray-400 text-lg mt-20">暂无相关盲盒</div>
        ) : (
          filteredList.map(item => (
            <li
              key={item.id}
              className="w-60 bg-white rounded-lg shadow-md overflow-hidden flex flex-col items-center"
            >
              <img
                src={item.img}
                alt={item.name}
                className="w-60 h-60 object-cover"
                width={240}
                height={240}
              />
              <div className="w-full px-4 py-3 flex flex-col items-start">
                <div className="text-lg font-bold text-gray-800 mb-1">{item.name}</div>
                <div className="text-sm text-gray-500 mb-4">剩余数量：{item.left}</div>
                <button
                  onClick={() => navigate(`/detail/${item.id}`)}
                  className="mt-auto px-4 py-1 bg-sky-500 text-white rounded hover:bg-sky-600 transition font-semibold"
                >
                  查看详情
                </button>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  )
}
export default HomePage