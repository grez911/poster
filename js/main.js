class Page extends ZeroFrame {
    constructor(url) {
        super(url)
        this.site_info = null
    }

    onRequest(cmd, message) {
        bus.$emit('update', cmd, message)
    }

    writePublish(inner_path, data) {
        let json_raw = unescape(encodeURIComponent(JSON.stringify(data, undefined, '    ')))
        page.cmdp('fileWrite', [inner_path, btoa(json_raw)]).then(() => {
            bus.$emit('update')
            if (inner_path == 'data/data.json') {
                return page.cmdp('sitePublish', ['stored'])
            } else {
                return page.cmdp('sitePublish', [undefined, inner_path])
            }
        })
    }
}

let page = new Page()
let bus = new Vue()
let app = new Vue({
    el: '#root',
    template: `
        <div>
            <top></top>
            <div class="container">
                <posts v-if="post_id == ''"></posts>
                <post v-if="post_id != ''" :post_id="post_id"></post>
            </div>
        </div>
    `,

    data() {
        return {
            post_id: ''
        }
    },

    mounted() {
        this.post_id = window.location.search.substring(1)
            .replace(/[&?]*wrapper_nonce=[A-Za-z0-9]+/, '')
        this.post_id = this.post_id.replace(/post=/, '')
        bus.$emit('update')
    }
})
