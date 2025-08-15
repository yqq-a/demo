import React, { useState } from 'react';

interface TodoItem {
  id: number;
  text: string;
  completed: boolean;
}

const App: React.FC = () => {
  const [todos, setTodos] = useState<TodoItem[]>([
    { id: 1, text: '学习 React', completed: false },
    { id: 2, text: '学习 TypeScript', completed: true },
    { id: 3, text: '构建第一个项目', completed: false }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  const addTodo = () => {
    if (inputValue.trim()) {
      setTodos([...todos, {
        id: Date.now(),
        text: inputValue.trim(),
        completed: false
      }]);
      setInputValue('');
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const filteredTodos = todos.filter(todo => {
    switch (filter) {
      case 'active': return !todo.completed;
      case 'completed': return todo.completed;
      default: return true;
    }
  });

  const completedCount = todos.filter(todo => todo.completed).length;
  const totalCount = todos.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          📝 Todo Demo
        </h1>
        
        {/* 统计信息 */}
        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
          <div className="text-sm text-gray-600">
            总计: {totalCount} | 已完成: {completedCount} | 待办: {totalCount - completedCount}
          </div>
        </div>

        {/* 输入区域 */}
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTodo()}
            placeholder="添加新任务..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={addTodo}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            添加
          </button>
        </div>

        {/* 过滤按钮 */}
        <div className="flex gap-1 mb-4">
          {(['all', 'active', 'completed'] as const).map(filterType => (
            <button
              key={filterType}
              onClick={() => setFilter(filterType)}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                filter === filterType 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {filterType === 'all' ? '全部' : filterType === 'active' ? '待办' : '已完成'}
            </button>
          ))}
        </div>

        {/* 任务列表 */}
        <div className="space-y-2">
          {filteredTodos.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              {filter === 'all' ? '暂无任务' : 
               filter === 'active' ? '暂无待办任务' : '暂无已完成任务'}
            </div>
          ) : (
            filteredTodos.map(todo => (
              <div
                key={todo.id}
                className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${
                  todo.completed 
                    ? 'bg-green-50 border-green-200' 
                    : 'bg-white border-gray-200 hover:shadow-md'
                }`}
              >
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <span className={`flex-1 ${
                  todo.completed 
                    ? 'text-green-600 line-through' 
                    : 'text-gray-800'
                }`}>
                  {todo.text}
                </span>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  🗑️
                </button>
              </div>
            ))
          )}
        </div>

        {/* 底部信息 */}
        <div className="mt-6 text-center text-sm text-gray-500">
          使用 React + TypeScript 构建 ⚛️
        </div>
      </div>
    </div>
  );
};

export default App;
