import TodoDB from './db/todo'

// 使用全局变量挂载数据库，防止被热更新
//const client = yog.redis || new RedisTodo();
//yog.redis = client;

export async function getTodos(userId) {
  let ret = await TodoDB.getByUser(userId);
  console.log('getTodosCCC',ret)
  if (ret.length === 0) {
    await setTodo(null, 'Use Redux', userId);
    ret = await TodoDB.getByUser(userId);
  }
  return ret;
}

export async function getTodo(id) {
  return await TodoDB.get(id);
}

export async function deleteTodo(id) {
  return await TodoDB.delete(id);
}

export async function addTodo(userId, text) {
  const todo = {
    completed: false,
    text,
    userId
  }
  return await TodoDB.save(todo)
}

export async function setTodo(id, text, userId) {
  if (id) {
    const todo = await getTodo(id);
    todo.text = text;
    await TodoDB.save(todo)
    return todo
  } else {
    const todo = {
      text,
      completed: false,
      userId
    }
    await TodoDB.save(todo)
    return todo
  }

}

export async function completeTodo(id) {
  const todo = await getTodo(id)
  console.log("completeTodo",todo)
  todo.completed = !todo.completed
  await TodoDB.save(todo)
  return todo
}

export async function completeAll(userId) {
  // const todos = await getTodos(userId);
  // const areAllMarked = todos.every(todo => todo.completed)
  // todos.forEach(todo => todo.completed = !areAllMarked)
  // return await setTodos(userId, todos);
}

export async function clearCompleted(userId) {
  console.log("clearCompleted")
  let todos = await TodoDB.getByUser(userId);
  todos.forEach(async function(todo){
    if (todo.completed)
      await TodoDB.delete(todo._id);
  })
  // todos = todos.filter(todo => !todo.completed)
  // const ret = await setTodos(userId, todos);
  // return todos;
}

// module.exports.getData = function(){
// 	return {
// 		title : 'FIS',
// 		message:'fuck the rain',
// 		url:'./detail',
// 		urlName:'detail link'
// 	};
// };