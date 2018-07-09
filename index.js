let app = new Vue({
    el: '#app',
    data: {
        editMode : false,
        frameworks: [
            { name: 'Vue.js', votes: 0 },
            { name: 'React', votes: 0 },
            { name: 'Angular', votes: 0 }
        ]
    },
    methods: {
        toggleEditMode : function(f) {
            this.editMode = !this.editMode
        },
        voteFor: function(f) {
            f.votes += 1
            this.save()
        },
        addNew: function(event) {
            this.frameworks.push({
                name: event.target.value,
                votes: 0
            })
            event.target.value = ''
            this.save()
        },
        remove: function(f) {
            this.frameworks = this.frameworks.filter(i => i != f)
            this.save()
        },
        load: function() {
            let data = localStorage.getItem('saved')
            if (data) {
                this.frameworks = JSON.parse(data)
            }
        },
        save: function() {
            let data = JSON.stringify(this.frameworks)
            localStorage.setItem('saved', data)
        }
    },
    computed: {
        winnerString: function() {
            let scores = this.frameworks.map(f => f.votes);
            let highscore = Math.max.apply(Math, scores)
            let bestList = this.frameworks.filter(f => f.votes == highscore)
            let bestNames = bestList.map(f => f.name)
            return bestNames.join(', ')
        }
    },
    created: function() {
        this.load()
    }
})
