import React from 'react';

const ItemList = ({ items }) => {
  return (
    <div className="flex flex-col gap-y-4 w-full items-center mt-6">
      {items.map(item => (
        <div
          key={item.id}
          className="w-1/2 h-[10vh] flex items-center border border-gray-300 rounded-lg p-3 bg-white shadow-md hover:shadow-lg transition duration-200"
        >
          {/* 左侧图片 */}
          <img
            src={item.img}
            alt={item.name}
            className="h-full object-contain"
          />

          {/* 右侧文字 */}
          <div className="ml-3 flex flex-col justify-center ml-auto">
            <div className="font-semibold text-sm">{item.itemName}</div>
            <div className="text-xs text-gray-600">概率：{item.probability}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemList;