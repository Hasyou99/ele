<!--//主页头部组件-->

<template>
	<div class="pri-com-root">
		<div class="title-box">
			<div class="addr-label">
				<span class="fa fa-map-marker"></span>
				<span>{{positionInfo.name}}</span>
			</div>
			<div class="weather-box">
				<div>
					<p>{{weather.temperature}}°</p>
					<p>{{weather.description}}</p>
				</div>
				<img :src="this.weather.image_hash|isf"/>
			</div>
		</div>
		
		<input type="text" class="search-box" placeholder="搜索商家、商品"/>
		
		<scroller lock-y scrollbar-x v-if="hotSearch.length>0">
			<div class="hot-search-content">
				<span v-for="item in hotSearch" class="hot-search-item">{{item.word}}</span>
			</div>
		</scroller>
		
	</div>
</template>

<script>
	import {Scroller} from 'vux';
	export default {
		props:["weather","hotSearch","positionInfo"],
		components:{
			Scroller
		}
	}
</script>

<style scoped>
	.pri-com-root{
		background-color: #0096ff;
		padding: 10px;
	}
	.title-box{
		display: flex;
		color: white;
		font-size: 18px;
		margin-top: 10px;
		justify-content: space-between;
	}
	.addr-label{
		flex-basis: 60%;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	
	.weather-box{
		display: flex;
	}
	
	.weather-box p{
		font-size: 10px;
		margin: 0;
	}
	
	.weather-box img{
		margin-left: 8px;
		width: 30px;
		height: 30px;
	}
	
	.search-box{
		margin: 8px 0;
		height: 36px;
		width: 100%;
		border-radius: 18px;
		border: none;
		text-align: center;
		font-size: 14px;
	}
	
	.hot-search-content{
		white-space: nowrap;
		display: inline-block;
	}
	
	.hot-search-item{
		color: white;
		margin: 0 8px;
		font-size: 12px;
	}
</style>