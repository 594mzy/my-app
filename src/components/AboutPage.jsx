import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import ItemList from './itemList';

function BlindBoxDetailPage() {
  const { id } = useParams();
  const [blindBox, setBlindBox] = useState(null);
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [drawResult, setDrawResult] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);

    // 获取盲盒物品列表
    fetch('http://127.0.0.1:7001/blind-box/admin/list', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ID: id }),
    })
      .then(res => {
        if (!res.ok) throw new Error('获取盲盒物品失败');
        return res.json();
      })
      .then(data => {
        setBlindBox(data);
        setItems(data.items || []);
      })
      .catch(() => setError('盲盒物品加载失败'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleDraw = async () => {
    try {
      const username = localStorage.getItem('username') || '';
      const res = await fetch('http://127.0.0.1:7001/blind-box/draw', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ boxID: id, username }),
      });
      const data = await res.json();
      if (data.item) {
        // 可选：刷新库存
        setItems(items =>
          items.map(item =>
            item.id === data.item.id
              ? { ...item, stock: (item.stock || 1) - 1 }
              : item
          )
        );
        setBlindBox(box => box ? { ...box, stock: (box.stock || 1) - 1 } : box);
        alert(`抽取成功，获得：${data.item.itemName}`);
      } else {
        setDrawResult(data.msg || '抽取失败');
      }
    } catch (err) {
      setDrawResult('抽取失败，请重试');
    }
  };

  if (loading) {
    return <div className="text-gray-400 text-lg mt-20">加载中...</div>;
  }

  if (error) {
    return <div className="text-red-400 text-lg mt-20">{error}</div>;
  }

  if (!blindBox) {
    return <div className="text-gray-400 text-lg mt-20">盲盒不存在</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100 flex flex-col items-center">
      <h1 className="text-2xl font-bold mt-10">{blindBox.name}</h1>
      <img
        src={blindBox.img}
        alt={blindBox.name}
        className="w-60 h-60 object-cover mt-4"
        width={240}
        height={240}
      />
      <ItemList items={items} />
      <button
        onClick={handleDraw}
        className="mt-6 px-4 py-2 bg-sky-500 text-white rounded hover:bg-sky-600 transition font-semibold"
      >
        抽取盲盒
      </button>
      <button
        onClick={() => navigate('/HomePage')}
        className="mt-4 px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400 transition"
      >
        返回列表
      </button>
    </div>
  );
}

export default BlindBoxDetailPage;