import { useState, useEffect } from 'react'
import HomePage from './HomePage'

function ManagementPage() {
    // 盲盒管理相关状态
    const [boxName, setBoxName] = useState('')
    const [boxImg, setBoxImg] = useState('')
    const [boxStock, setBoxStock] = useState(0)
    const [selectedBoxId, setSelectedBoxId] = useState('')
    const [boxes, setBoxes] = useState([])
    const [boxMsg, setBoxMsg] = useState('')

    // 物品管理相关状态
    const [itemName, setItemName] = useState('')
    const [itemImg, setItemImg] = useState('')
    const [itemProbability, setItemProbability] = useState(0)
    const [itemStock, setItemStock] = useState(0)
    const [selectedItemId, setSelectedItemId] = useState('')
    const [items, setItems] = useState([])
    const [itemMsg, setItemMsg] = useState('')
    const [itemRarity, setItemRarity] = useState('')

    // 获取盲盒列表
    const fetchBoxes = async () => {
        const res = await fetch('http://127.0.0.1:7001/blind-box/admin/list')
        const data = await res.json()
        setBoxes(data)
    }

    // 获取选中盲盒的物品
    const fetchItems = async (boxId) => {
        if (!boxId) {
            setItems([])
            return
        }
        const res = await fetch('http://127.0.0.1:7001/blind-box/admin/item/list', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ID: boxId }),
        })
        const data = await res.json()
        setItems(data)
    }

    useEffect(() => {
        fetchBoxes()
    }, [])

    useEffect(() => {
        if (selectedBoxId) {
            fetchItems(selectedBoxId)
        } else {
            setItems([])
        }
    }, [selectedBoxId])

    // 盲盒操作
    const handleCreateBox = async (e) => {
        e.preventDefault()
        setBoxMsg('')
        const res = await fetch('http://127.0.0.1:7001/blind-box/admin/create', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: boxName, img: boxImg, stock: Number(boxStock) }),
        })
        if (res.ok) {
            setBoxMsg('新增盲盒成功')
            setBoxName('')
            setBoxImg('')
            setBoxStock(0)
            fetchBoxes()
        } else {
            setBoxMsg('新增盲盒失败')
        }
    }

    const handleUpdateBox = async (e) => {
        e.preventDefault()
        setBoxMsg('')
        if (!selectedBoxId) return setBoxMsg('请选择盲盒')
        const res = await fetch('http://127.0.0.1:7001/blind-box/admin/update', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: selectedBoxId, name: boxName, img: boxImg, stock: Number(boxStock) }),
        })
        if (res.ok) {
            setBoxMsg('更新盲盒成功')
            fetchBoxes()
        } else {
            setBoxMsg('更新盲盒失败')
        }
    }

    const handleDeleteBox = async (e) => {
        e.preventDefault()
        setBoxMsg('')
        if (!selectedBoxId) return setBoxMsg('请选择盲盒')
        const res = await fetch('http://127.0.0.1:7001/blind-box/admin/delete', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ID: selectedBoxId }),
        })
        if (res.ok) {
            setBoxMsg('删除盲盒成功')
            setSelectedBoxId('')
            fetchBoxes()
        } else {
            setBoxMsg('删除盲盒失败')
        }
    }

    // 物品操作
    const handleCreateItem = async (e) => {
        e.preventDefault()
        setItemMsg('')
        if (!selectedBoxId) return setItemMsg('请先选择盲盒')
        const res = await fetch('http://127.0.0.1:7001/blind-box/admin/item/create', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                itemName: itemName,
                img: itemImg,
                stock: Number(itemStock),
                rarity: itemRarity,
                probability: Number(itemProbability),
                blindBoxId: selectedBoxId,
            }),
        })
        if (res.ok) {
            setItemMsg('新增物品成功')
            setItemName('')
            setItemImg('')
            setItemProbability(0)
            setItemStock(0)
            fetchItems(selectedBoxId)
        } else {
            setItemMsg('新增物品失败')
        }
    }

    const handleUpdateItem = async (e) => {
        e.preventDefault()
        setItemMsg('')
        if (!selectedItemId) return setItemMsg('请选择物品')
        const res = await fetch('http://127.0.0.1:7001/blind-box/admin/item/update', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: selectedItemId,
                itemName: itemName,
                img: itemImg,
                probability: Number(itemProbability),
                stock: Number(itemStock),
            }),
        })
        if (res.ok) {
            setItemMsg('更新物品成功')
            fetchItems(selectedBoxId)
        } else {
            setItemMsg('更新物品失败')
        }
    }

    const handleDeleteItem = async (e) => {
        e.preventDefault()
        setItemMsg('')
        if (!selectedItemId) return setItemMsg('请选择物品')
        const res = await fetch('http://127.0.0.1:7001/blind-box/admin/item/delete', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ID: selectedItemId }),
        })
        if (res.ok) {
            setItemMsg('删除物品成功')
            setSelectedItemId('')
            fetchItems(selectedBoxId)
        } else {
            setItemMsg('删除物品失败')
        }
    }

    // 选择盲盒时自动填充表单
    const handleBoxSelect = (e) => {
        const boxId = e.target.value
        setSelectedBoxId(boxId)
        const box = boxes.find(b => String(b.id) === String(boxId))
        if (box) {
            setBoxName(box.name)
            setBoxImg(box.img)
            setBoxStock(box.stock)
        } else {
            setBoxName('')
            setBoxImg('')
            setBoxStock(0)
        }
        setSelectedItemId('')
        setItemName('')
        setItemImg('')
        setItemProbability(0)
        setItemStock(0)
        setItems([])
    }

    // 选择物品时自动填充表单
    const handleItemSelect = (e) => {
        const itemId = e.target.value
        setSelectedItemId(itemId)
        const item = items.find(i => String(i.id) === String(itemId))
        if (item) {
            setItemName(item.itemName)
            setItemImg(item.img)
            setItemProbability(item.probability)
            setItemStock(item.stock)
            setItemRarity(item.rarity)
        } else {
            setItemName('')
            setItemImg('')
            setItemProbability(0)
            setItemStock(0)
            setItemRarity('')
        }
    }

    return (
        <div>
            <HomePage />
            <div className="flex flex-col items-center mt-10 mb-20">
                {/* 盲盒管理表单 */}
                <div className="bg-white rounded-2xl shadow-lg max-w-md w-full px-12 py-10 flex flex-col items-center mb-10">
                    <h2 className="text-2xl font-bold text-black mb-6">盲盒管理</h2>
                    <select
                        value={selectedBoxId}
                        onChange={handleBoxSelect}
                        className="w-full border-b border-gray-300 bg-transparent px-2 py-3 focus:outline-none focus:border-blue-400 text-lg mb-4"
                    >
                        <option value="">选择盲盒（可编辑/删除）</option>
                        {boxes.map(box => (
                            <option key={box.id} value={box.id}>{box.name}</option>
                        ))}
                    </select>
                    <form className="w-full flex flex-col gap-4">
                        <input
                            type="text"
                            value={boxName}
                            onChange={e => setBoxName(e.target.value)}
                            className="border-b border-gray-300 bg-transparent px-2 py-3 focus:outline-none focus:border-blue-400 text-lg"
                            placeholder="盲盒名称"
                            required
                        />
                        <input
                            type="text"
                            value={boxImg}
                            onChange={e => setBoxImg(e.target.value)}
                            className="border-b border-gray-300 bg-transparent px-2 py-3 focus:outline-none focus:border-blue-400 text-lg"
                            placeholder="盲盒图片URL"
                            required
                        />
                        <input
                            type="number"
                            value={boxStock}
                            onChange={e => setBoxStock(e.target.value)}
                            className="border-b border-gray-300 bg-transparent px-2 py-3 focus:outline-none focus:border-blue-400 text-lg"
                            placeholder="库存"
                            min={0}
                            required
                        />
                        <div className="flex gap-2 mt-2">
                            <button
                                onClick={handleCreateBox}
                                className="flex-1 py-2 rounded-md font-bold text-white bg-gradient-to-r from-pink-300 to-blue-300 shadow hover:from-pink-400 hover:to-blue-400 transition-all"
                            >
                                新增盲盒
                            </button>
                            <button
                                onClick={handleUpdateBox}
                                className="flex-1 py-2 rounded-md font-bold text-white bg-gradient-to-r from-blue-300 to-pink-300 shadow hover:from-blue-400 hover:to-pink-400 transition-all"
                            >
                                更新盲盒
                            </button>
                            <button
                                onClick={handleDeleteBox}
                                className="flex-1 py-2 rounded-md font-bold text-white bg-gradient-to-r from-red-300 to-pink-300 shadow hover:from-red-400 hover:to-pink-400 transition-all"
                            >
                                删除盲盒
                            </button>
                        </div>
                    </form>
                    {boxMsg && <div className="mt-4 text-red-500 text-sm">{boxMsg}</div>}
                </div>

                {/* 物品管理表单 */}
                <div className="bg-white rounded-2xl shadow-lg max-w-md w-full px-12 py-10 flex flex-col items-center">
                    <h2 className="text-2xl font-bold text-black mb-6">盲盒物品管理</h2>
                    <select
                        value={selectedBoxId}
                        onChange={handleBoxSelect}
                        className="w-full border-b border-gray-300 bg-transparent px-2 py-3 focus:outline-none focus:border-blue-400 text-lg mb-4"
                    >
                        <option value="">选择盲盒（可编辑/删除）</option>
                        {boxes.map(box => (
                            <option key={box.id} value={box.id}>{box.name}</option>
                        ))}
                    </select>
                    <select
                        value={selectedItemId}
                        onChange={handleItemSelect}
                        className="w-full border-b border-gray-300 bg-transparent px-2 py-3 focus:outline-none focus:border-blue-400 text-lg mb-4"
                        disabled={!selectedBoxId}
                    >
                        <option value="">选择物品（可编辑/删除）</option>
                        {items.map(item => (
                            <option key={item.id} value={item.id}>{item.itemName}</option>
                        ))}
                    </select>
                    <form className="w-full flex flex-col gap-4">
                        <input
                            type="text"
                            value={itemName}
                            onChange={e => setItemName(e.target.value)}
                            className="border-b border-gray-300 bg-transparent px-2 py-3 focus:outline-none focus:border-blue-400 text-lg"
                            placeholder="物品名称"
                            required
                            disabled={!selectedBoxId}
                        />
                        <input
                            type="text"
                            value={itemImg}
                            onChange={e => setItemImg(e.target.value)}
                            className="border-b border-gray-300 bg-transparent px-2 py-3 focus:outline-none focus:border-blue-400 text-lg"
                            placeholder="物品图片URL"
                            required
                            disabled={!selectedBoxId}
                        />
                        <input
                            type="text"
                            value={itemRarity}
                            onChange={e => setItemRarity(e.target.value)}
                            className="border-b border-gray-300 bg-transparent px-2 py-3 focus:outline-none focus:border-blue-400 text-lg"
                            placeholder="物品稀有度"
                            required
                            disabled={!selectedBoxId}
                        />
                        <input
                            type="number"
                            value={itemProbability}
                            onChange={e => setItemProbability(e.target.value)}
                            className="border-b border-gray-300 bg-transparent px-2 py-3 focus:outline-none focus:border-blue-400 text-lg"
                            placeholder="概率（0~1）"
                            min={0}
                            max={1}
                            step={0.01}
                            required
                            disabled={!selectedBoxId}
                        />
                        <input
                            type="number"
                            value={itemStock}
                            onChange={e => setItemStock(e.target.value)}
                            className="border-b border-gray-300 bg-transparent px-2 py-3 focus:outline-none focus:border-blue-400 text-lg"
                            placeholder="库存"
                            min={0}
                            required
                            disabled={!selectedBoxId}
                        />
                        <div className="flex gap-2 mt-2">
                            <button
                                onClick={handleCreateItem}
                                className="flex-1 py-2 rounded-md font-bold text-white bg-gradient-to-r from-pink-300 to-blue-300 shadow hover:from-pink-400 hover:to-blue-400 transition-all"
                                disabled={!selectedBoxId}
                            >
                                新增物品
                            </button>
                            <button
                                onClick={handleUpdateItem}
                                className="flex-1 py-2 rounded-md font-bold text-white bg-gradient-to-r from-blue-300 to-pink-300 shadow hover:from-blue-400 hover:to-pink-400 transition-all"
                                disabled={!selectedBoxId || !selectedItemId}
                            >
                                更新物品
                            </button>
                            <button
                                onClick={handleDeleteItem}
                                className="flex-1 py-2 rounded-md font-bold text-white bg-gradient-to-r from-red-300 to-pink-300 shadow hover:from-red-400 hover:to-pink-400 transition-all"
                                disabled={!selectedBoxId || !selectedItemId}
                            >
                                删除物品
                            </button>
                        </div>
                    </form>
                    {itemMsg && <div className="mt-4 text-red-500 text-sm">{itemMsg}</div>}
                </div>
            </div>
        </div>
    )
}

export default ManagementPage