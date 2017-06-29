import ArticleDB from './db/article'

// 使用全局变量挂载数据库，防止被热更新
//const client = yog.redis || new RedisTodo();
//yog.redis = client;

export async function getArticles(userId) {
  let ret = await ArticleDB.getByUser(userId)
  console.log('getArticles',ret)
  if (ret.length === 0) {
    await saveArticle(userId,{
      title: "How to have a good life",
      author: "exialym",
      userId: userId,
      date:new Date(),
      detail:"Just Work Harder",
    })
    ret = await ArticleDB.getByUser(userId)
  }
  return ret
}

export async function getArticle(id) {
  return await ArticleDB.get(id)
}

export async function deleteArticle(id) {
  return await ArticleDB.delete(id)
}

export async function saveArticle(userId, article) {
  article.userId = userId
  return await ArticleDB.save(article)
}

