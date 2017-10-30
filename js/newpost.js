Vue.component('newpost', {
    template: `
        <div id="new-post">
            <input type="file" id="input-file" @change="upload" ref="inputFile">
            <div>
            <nav class="level">
                <div class="level-left">
                    <i class="level-item is-size-5 fa fa-file-image-o" @click="initiateUpload('img')"></i>
                    <i class="level-item is-size-5 fa fa-file-video-o" @click="initiateUpload('video')"></i>
                    <i class="level-item is-size-5 fa fa-file-audio-o" @click="initiateUpload('audio')"></i>
                    <i class="level-item is-size-5 fa fa-file-o" @click="initiateUpload('file')"></i>
                    <i class="level-item is-size-5 fa fa-header" @click="insertTags('<h1></h1>')"></i>
                    <i class="level-item is-size-5 fa fa-paragraph" @click="insertTags('<p></p>')"></i>
                    <i class="level-item is-size-5 fa fa-italic" @click="insertTags('<i></i>')"></i>
                    <i class="level-item is-size-5 fa fa-bold" @click="insertTags('<b></b>')"></i>
                    <i class="level-item is-size-5 fa fa-strikethrough" @click="insertTags('<strike></strike>')"></i>
                    <i class="level-item is-size-5 fa fa-list-ol" @click="insertTags('ol')"></i>
                    <i class="level-item is-size-5 fa fa-list-ul" @click="insertTags('ul')"></i>
                    <i class="level-item is-size-5 fa fa-external-link" @click="insertTags('a')"></i>
                    <i class="level-item is-size-5 fa fa-code" @click="insertTags('<code></code>')"></i>
                    <i class="level-item is-size-5 fa" @click="insertTags('<br>')">↵</i>
                </div>
                <div class="level-right">
                    <button class="level-item button" type="button" @click="addPost">Save</button>
                </div>
            </div>
            <textarea class="is-size-6" ref="text"></textarea>
        </div>
    `,

    data() {
        return {
            filename: null,
            filetype: null
        }
    },

    methods: {
        initiateUpload(type) {
            this.filetype = type
            this.$refs.inputFile.click()
        },

        upload(event) {
            let file = this.$refs.inputFile.files[0]
            poster.uploadFile(file)
            this.filename = file.name
            this.createLink()
        },

        createLink() {
            if (this.filetype == 'img') {
                this.$refs.text.value += '<img src="uploads/' + this.filename + '">'
            } else if (this.filetype == 'video') {
                let type = null
                if (this.filename.toLowerCase().endsWith('mp4')) type = 'video/mp4'
                if (this.filename.toLowerCase().endsWith('webm')) type = 'video/webm'
                if (this.filename.toLowerCase().endsWith('ogg')) type = 'video/ogg'
                this.$refs.text.value += '<video width="320" height="240" controls>\n'
                this.$refs.text.value += '<source src="uploads/' + this.filename + '" type="' + type + '">\n'
                this.$refs.text.value += '</video>'
            } else if (this.filetype == 'audio') {
                let type = null
                if (this.filename.toLowerCase().endsWith('mp3')) type = 'audio/mpeg'
                if (this.filename.toLowerCase().endsWith('ogg')) type = 'audio/ogg'
                if (this.filename.toLowerCase().endsWith('wav')) type = 'audio/wav'
                this.$refs.text.value += '<audio controls>\n'
                this.$refs.text.value += '<source src="uploads/' + this.filename + '" type="' + type + '">\n'
                this.$refs.text.value += '</audio>'
            } else if (this.filetype == 'file') {
                this.$refs.text.value += '<a href="uploads/' + this.filename + '" target="_blanc">' + this.filename + '</a>'
            }
            this.filename = null
            this.filetype = null
        },

        insertTags(tags) {
            if (tags == 'ol') {
                this.$refs.text.value += "<ol>\n<li></li>\n<li></li>\n</ol>"
            } else if (tags == 'ul') {
                this.$refs.text.value += "<ul>\n<li></li>\n<li></li>\n</ul>"
            } else if (tags == 'a') {
                this.$refs.text.value += '<a href=""></a>'
            } else {
                this.$refs.text.value += tags
            }
        },

        addPost() {
            poster.addPost(this.$refs.text.value)
            this.$refs.text.value = ''
        }
    }
})
