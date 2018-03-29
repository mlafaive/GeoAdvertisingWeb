ads = new Vue({
    el: "#dash",
    data: {
        company: "Blue's Bakery",
        current_ads: [
            {
                ID: 100020,
                title: "$2 off dozen donuts",
                message: "test in progress",
                start: "3/20/2018",
                end: "4/10/2018"
            }
        ],
        past_ads: [
            {
                ID: 100022,
                title: "$10 off all baking classes",
                message: "test in progress",
                start: "3/11/2018",
                end: "3/21/2018"
            },
            {
                ID: 100024,
                title: "Valentine's day sale",
                message: "yay",
                start: "2/14/2018",
                end: "2/15/2018"
            },
            {
                ID: 100026,
                title: "$5 off cake purchases	",
                message: "yay",
                start: "1/4/2018",
                end: "1/24/2018"
            }
        ]
    },

    methods: {
        seeAd: function (id) {
            console.log(id);
        },

        searchMusic: function (e) {
            console.log("searching for music...")
            this.$http.get('http://itunes.apple.com/search', {
                params: {
                    "term": this.query,
                    "limit": 12
                }
            }).then(response => {
                this.music_results = response.body.results;
            }, response => {
                console.log("error");
                // error callback
            });
        }
    }
})
