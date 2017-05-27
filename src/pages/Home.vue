<template>
	<div id="ele" @scroll="scrollEvent">
		<homeHeader
			:weather="weather" 
    		:hotSearch="hotSearch"
    		:positionInfo="positionInfo">
    	</homeHeader>
		<Slider :sliderArray="sliderArray"></Slider>
		<div class="blank"></div>
		
		<!--店铺-->
		<main class="content" v-if="loadComplete">
			<div class="top">推荐商家</div>
			
			<ResList :list="recommendArray"></ResList>
			
			<load-more tip="正在加载" style="margin: 4px auto;"></load-more>
		</main>
		
		<div v-else style="text-align: center;">
    		<img src="../../static/img/loading.gif"/>
    	</div>
    	
		<nav class="back-top" v-show="isShow" @click="topClick">
			<p></p>
			<span class=" fa fa-arrow-up "></span>
		</nav>
	</div>
</template>

<script>
	import bus from "../utils/bus.js";
	import Geohash from '../utils/geohash.js'
	import HomeHeader from '../components/HomeHeader.vue'
	import Slider from '../components/Slider.vue'
	import ResList from '../components/ResList.vue'
	import {Scroller,LoadMore} from 'vux';
	
	export default({
		components:{
			HomeHeader,
			Slider,
			ResList,
			Scroller,
			LoadMore
		},
		data(){
			https://mainsite-restapi.ele.me/bgs/poi/reverse_geo_coding?latitude=34.74725&longitude=113.624931
			return{
				latitude:34.74725,
				longitude:113.624931,
				positionInfo:{},
				weather:{},
				hotSearch:[],
				geohash:'',
				sliderArray:[],
				recommendArray:[],
				loading:false,
				loadComplete:false,
				backTop:'',
				isShow:false	
			}
		},
		
		mounted(){
			bus.latitude = this.latitude;
			bus.longitude = this.longitude;
			console.log(bus.latitude)
			//请求数据
//			this.getPosition()
			this.positionAjax()
			this.weatherAjax()
			this.hotSearchAjax()
			this.sliderAjax()
			this.recommendAjax();

			var height = window.innerHeight
			this.$el.style.height = height + "px"
			
		},
		computed:{
			//计算geohash
			geoHash:function(){
				this.geohash = Geohash.encode(this.latitude,this.longitude,12);
				return this.geohash
			},
//			//获取当前位置的经纬度
//			getPosition(){
//				navigator.geolocation.getCurrentPosition(function(pos){
//					this.latitude = pos.coords.latitude
//					console.log(this.latitude)
//					this.longitude = pos.coords.longitude
//					console.log(this.longitude)
//				})
//			},
		},
		methods:{
			
			//获取当前位置
			positionAjax(){
				var url = '/ele/v2/pois/'+this.geoHash
				this.$http.get(url)
				.then(function(res){
					this.positionInfo = res.data
//					console.log(this.positionInfo)
				}.bind(this))
			},
			
			//天气请求
			weatherAjax(){
				this.$http.get("/ele/bgs/weather/current",{
					params:{
						latitude:this.latitude,
						longitude:this.longitude
					}
				})
				.then(function(res){
					this.weather = res.data;
				}.bind(this));
			},
			
			//热搜请求
			hotSearchAjax(){
				this.$http.get("ele/shopping/v3/hot_search_words",{
					params:{
						latitude:this.latitude,
						longitude:this.longitude
					}
				})
				.then(function(res){
					this.hotSearch = res.data;
				}.bind(this));
			},
			
			//轮播图请求
			sliderAjax(){
				this.$http.get("ele/shopping/v2/entries",{
					params:{
						latitude:this.latitude,
						longitude:this.longitude,
						templates:['main_template']
					}
				})
				.then(function(res){
//					console.dir(res.data[0].entries)
					this.sliderArray = res.data[0].entries
				}.bind(this))
			},
			
			//推荐商家请求
			//https://mainsite-restapi.ele.me/shopping/restaurants?latitude=31.02414&longitude=121.28697&offset=60&limit=20&extras[]=activities&
			recommendAjax(){
				if(this.loading){
					return;
				}
				this.loading = true;
				this.$http.get("ele/shopping/restaurants",{
					params:{
						latitude:this.latitude,
						longitude:this.longitude,
						limit:20,
						offset:this.recommendArray.length,
						"extras": ['activities'],
						terminal:"h5"
					}
				})
				.then(function(res){
					this.recommendArray = this.recommendArray.concat(res.data)
					this.loading = false
					this.loadComplete = true
//					console.log(this.recommendArray)
				}.bind(this))
			},
			
			//监听页面的滚动事件
			scrollEvent(e){
				
				var o = e.target.scrollTop;
				
				//元素本身高度
				var h = e.target.clientHeight ;
				
				//元素的内容高度
				var ch = e.target.scrollHeight;
				if( o + h >= ch - 40){
					console.log(1111)
					this.recommendAjax();
				}
				
				if(o>400){
					this.isShow = true;
				}else{
					this.isShow = false;
				}
			},
			//回到顶部
			topClick:function(){
				this.$el.scrollTop = 0;
			},
		}
	})
</script>

<style scoped>
	#ele{
		overflow: scroll;
		/*height: 736px;*/
	}
	.slider{
		height: 194px;
		border: 1px solid lightgray;
	}
	.blank{
		height: 12px;
		background-color: rgb(244,244,244);
	}
	nav{
		height: 57px;
		border-top: 1px solid gray;
		position: fixed;
		z-index: 9;
	}
	main .top{
		width: 100%;
		height: 40px;
		font-size: 16px;
		font-weight: bold;
		line-height: 40px;
		padding-left: 15px;
		border-bottom: 1px solid #eeeeee;
	}
	.back-top{
		width: 40px;
		height: 40px;
		position: fixed;
		bottom: 82px;
		right: 20px;
		border: solid 1px grey;
		border-radius: 50%;
		text-align: center;
		color: grey;
		padding-top: 2px;
		background: #EEEEEE;
	}
	.back-top span{
		display: block;
		width: 100%;
		height: 100%;
		line-height: 30px;
		font-size: 16px;
		font-weight: bold;
	} 
	.back-top p{
		position: relative;
		top: 8px;
		left: 9px;
		width: 20px;
		height: 5px;
		border: 1px solid gray;
		border-radius: 3px;
		background-color: #999999;
		font-size: 20px;
	}
</style>