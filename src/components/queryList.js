

/** クエリを取得するオブジェクトです。 */
class Query {
    constructor(...parames) {
    /**
     * @param {string} parames パラメータのkey
     */
        this.parames = parames
    }

    /**
     * @param {string} theArgsValue パラメータのvalue
     * @return {string} クエリパラメータを返す
     */
    queryList(...theArgsValue) {
        let query = ['?']
        for (let i = 0; i < theArgsValue.length; i++) {
            if (i === theArgsValue.length - 1) {
                query.push(`${this.parames[i]}=${theArgsValue[i]}`)
            } else {
                query.push(`${this.parames[i]}=${theArgsValue[i]}&`)
            }
        }

        return query.join('')
    }
}


export default Query
