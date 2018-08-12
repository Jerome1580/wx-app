
const {mysql} = require('../qcloud')

module.exports = async ctx =>{
    const {id} = ctx.request.query
    const detail = await mysql('books')
                            .select()
                            .where('id',id)
                            .first()

    await mysql('books')
            .where('id',id)
            .increment('count',1)

    ctx.state.data = Object.assign({},detail,{
        tags:detail.tags.split(','),
        summary:detail.summary.split('\n')
    })
}