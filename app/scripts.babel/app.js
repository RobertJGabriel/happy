'use strict';

const rssFeed = 'https://www.reddit.com/r/MadeMeSmile.json?limit=100';

function sleep(time) {
	const d1 = new Date().getTime();
	let d2 = new Date().getTime();
	while (d2 < d1 + time) {
		d2 = new Date().getTime();
	}
}

new Vue({
	el: '#app',
	data: {
		posts: [],
    numberOfPosts: 0,
    currentNumber:0,
    title: '',
    isVideo: false,
    videoURL:'',
    thumbnail:'https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/200w_d.gif',
    permalink:''
	},
	beforeCompile: function beforeCompile() {
		sleep(3000);
	},
	mounted() {
		this.fetchPosts();
	},
	methods: {
		fetchPosts() {
			this.$http.get(rssFeed).then(response => {
        this.posts = (response.body).data.children;
        this.numberOfPosts = response.body.data.children.length;
        this.currentNumber = Math.floor(Math.random() * this.numberOfPosts); // Gets the list in
        this.title = this.posts[this.currentNumber].data.title;
        this.thumbnail = this.posts[this.currentNumber].data.thumbnail;
        this.permalink = this.posts[this.currentNumber].data.permalink;

        if (this.posts[this.currentNumber].data.is_video === true) {
          this.isVideo = true;
          console.log(this.posts[this.currentNumber].data.media.reddit_video.fallback_url);
          this.videoURL =  this.posts[this.currentNumber].data.media.reddit_video.fallback_url
        }else{
          this.isVideo = false;
        }
          



			}, response => {
			});
    }
	}
});
Vue.use(VueMarkdown);
Vue.config.productionTip = false;
