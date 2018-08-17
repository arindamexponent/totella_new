<template>
	<div>
    <section class="searchpage cloffer mrgEx1">
		
		<div class="container">
		
			<div class="row row_10">
				<div class="col-lg-9 col-md-9 col-sm-9 searColLeft">
					<ol v-if="nodata!=null" data-v-4e75714d="" class="breadcrumb paddlr15lll pull-left">
						<!-- <li data-v-4e75714d="">Emploi</li>
						<li data-v-4e75714d="">Permanent</li> -->
						<li data-v-4e75714d="">{{from}}-{{to}} of {{total}} {{this.$route.name}} </li>
					</ol>
					<div class="pull-right filtersec">
						<button  class="btn btn-warning btn-md" type="button" data-toggle="modal" data-target=".filtermodal" >Filter</button>
					</div>
					<div class="clearfix"></div>
					<div class="tabbox">
						<!-- <div class="clearfix menubrd">
						  <ul class="nav nav-tabs pull-left" role="tablist">
						    <li role="presentation" class="active"><a href="#tab_1" aria-controls="tab_1" role="tab" data-toggle="tab" aria-expanded="true"><span>All</span> {{totalPostRecords}}</a></li>
						    <li role="presentation" class=""><a href="#tab_2" aria-controls="tab_2" role="tab" data-toggle="tab" aria-expanded="false"><span>Particular</span> 654 057</a></li>
						    <li role="presentation" class=""><a href="#tab_2" aria-controls="tab_2" role="tab" data-toggle="tab" aria-expanded="false"><span>Professional</span> 654 057</a></li>
						  </ul>

							<div class="filterdata">
									<div class="filterload" v-if="filterLoad">
										<img src="assets/images/paginate-load.gif" alt="image">
									</div>
									<div class="sortbybtn pull-right clearfix">
										<span>Sort By :</span>
										<select class="form-control" @change="changeFilter($event)">
											<option value="date">Date</option>
											<option value="priceL">Low to High</option>
											<option value="priceH">High to Low</option>
										</select>
									</div>
							</div>
						  
						</div> -->

					  <!-- Tab panes -->
					  <div class="tab-content">
					    <div role="tabpanel" class="tab-pane active" id="tab_1">
					    	<div class="panel-body">

								<!-- <h5 v-if="postList.length == 0">{{nodata}}</h5> -->
								<div v-if="nodata==null" >
									<img src="assets/images/loader2.gif" >
								</div>

								<div v-if="nodata" class="no_data_found">
									<img src="assets/images/no_data.png" class="img-responsive">
								</div>

					    		<ul v-else class="listOffer list-unstyled">

					    			<li v-for="post in postList" :key="post.id">
					    				<div class="row">

					    					<figure class="col-sm-3" v-if="post.photos.length > 0">
					    						<a href="javascript:void(0);">
														<img :src="imgUrl + post.photos[0].save_name" class="img-responsive">
													</a>
					    						<span class="coutfig">{{post.photos.length}}</span>
					    					</figure>
												<figure class="col-sm-3" v-else>
					    						<a href="javascript:void(0);">
														<img :src="post.category_image" class="img-responsive">
													</a>
					    					</figure>

					    					<div class="cont col-sm-9">
					    						<h3 class="loftitle">
													<router-link :to="{ name: 'ad-details', query: { my_ad: post.id }}">
														<strong>{{post.title}}</strong>
													</router-link>
												</h3>
					    						<span class="addate block"><i class="fa fa-map-marker" aria-hidden="true"></i> {{post.address}}</span>
					    						<span class="text-muted txt12 block">{{post.category_title}}</span>
					    						<span class="pricebig block"><strong>{{post.price}}€</strong></span>
					    						<span class="oftime block text-muted">{{post.updated_at | moment("MMM Do YY")}}</span>
					    					</div>	
					    				</div>
					    				<a class="whishlistof" :class="['fav-' + post.id, {'active': post.favourite == 1 }]" @click="addToFav(post.id, post.favourite)" href="javascript:void(0);">
												<i class="fa fa-heart"></i>
											</a>
					    			</li>

					    		</ul>
					    		<div id="paginationcs" class="paginationcs clearfix pull-right">
										<pagination :records="totalPostRecords" :per-page="per_page" @paginate="setPage"></pagination>
					    			<div class="pagiload" v-if="pagiload">
											<img src="assets/images/paginate-load.gif" alt="image">
										</div>
										<!-- <span>...</span>
					    			<a href="javascript:void(0);">1</a>
					    			<a href="javascript:void(0);">2</a>
					    			<a class="bigpagi" href="javascript:void(0);">3</a>
					    			<a class="active" href="javascript:void(0);">4</a>
					    			<a class="bigpagi" href="javascript:void(0);">5</a>
					    			<a href="javascript:void(0);">6</a>
					    			<a href="javascript:void(0);">7</a>
					    			<span>...</span> -->
					    		</div>
					    		<div class="clearfix"></div>
					    	</div>
					    </div>
					    <div role="tabpanel" class="tab-pane" id="tab_2">...</div>
					  </div>

					</div>
				</div>


				<div class="serrightCol col-sm-3">
					<div class="rightpanel panel-body">

						<h3 class="rptitle">featured ads</h3>
						
                        <left-side-featured-ad-widget></left-side-featured-ad-widget>

					</div>
                    <center>
                        <img src="assets/images/add-1.png" class="img-responsive">
                    </center>
				</div>
			</div>
			

		</div>
		
	</section>


	<div class="modal fade modaleditprofile filtermodal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel">
  <div class="modal-dialog modal-md" role="document">
    <div class="modal-content">
    	 <button type="button" class="close btnclosenew" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h3 class="modal_title text-center">Filter</h3>
	    

		<div class="formeditp">
			<div class="row row_5">
				<div class="col-sm-6 form-group">
					<label>Price</label>
					 <div class="input-group">
						<div class="input-group-addon">$</div>
						<input type="number" class="form-control date" placeholder="Min" name="" v-model="min_price">
					</div>
				</div>
				<div class="col-sm-6 form-group">
					<label>&nbsp;</label>
					
					 <div class="input-group">
						<div class="input-group-addon">$</div>
						<input type="number"  v-model="max_price" class="form-control date" placeholder="Max" name="">
					</div>					
				</div>
			</div>
			<div class="row row_5">
				<div class="col-sm-6 form-group">
					<label>Date</label>
					 <div class="input-group">
						<div class="input-group-addon"><i class="fa fa-calendar"></i></div>
						
						  <datepicker placeholder="Date From" class="form-control addatepicker" v-model="dateFrom" id="df"></datepicker>
					</div>					
				</div>
				<div class="col-sm-6 form-group">
					<label>&nbsp;</label>					
					 <div class="input-group">
						<div class="input-group-addon"><i class="fa fa-calendar"></i></div>
						<datepicker placeholder="Date From" class="form-control addatepicker" v-model="dateTo"></datepicker>
					</div>
				</div>
			</div>
			<div class="text-center">
				<input type="button" v-on:click="filtermethod" class="btn btn-warning btn-block btn-lg" value="Filter" disabled id="filterbutton">
			</div>
		</div>


    </div>
  </div>
</div>
	</div>

</template>

<script>
import {HTTP, TOKEN, AUTH_DATA} from '../../http';
import { config } from '../../config';
import LeftSideFeaturedAdWidget from '@/components/LeftSideFeaturedAdWidget';
import { Pagination } from 'vue-pagination-2';
import Datepicker from 'vuejs-datepicker';

export default {
    name: 'ClassifiedSearch',
    components: {
        'left-side-featured-ad-widget': LeftSideFeaturedAdWidget,
				Pagination,
				Datepicker
    },
    data () {
        return {
					searchPost: {
						orderBy: 'updated_at',
						orderType: 'DESC',
						searchTxt: '',
						category: '',
						type: '',
						lat:"",
						lng:"",
						distance:"",
							min_price:"",
					max_price:"",
					from_date:"",
					to_date:"",
					},
					min_price:"",
					max_price:"",
					dateFrom:"",
					dateTo:"",
					to:"",
					from:"",
					total:"",
					pagiload: false,
					filterLoad: false,
					currentPage: 1,
					postList: [],
					totalPostRecords: 0,
					per_page: 10,
					nodata: null,
					imgUrl: config.ad_images,
					filtering: false,
					city:""
					// searchQuery: '',
					// catgId: '',
					// catgType: ''
        }
    },
    created() {
		
			this.searchPost.searchTxt = this.$route.query.search_query;
			this.searchPost.category = this.$route.query.catg_i;
			this.searchPost.type = this.$route.query.type == 'S' ? 2 : 1;
			this.searchPost.lat=this.$route.query.lat;
				this.searchPost.lng=this.$route.query.lng;
				this.searchPost.distance=this.$route.query.distance;
				this.searchPost.min_price=this.$route.query.min_price;
					this.searchPost.max_price=this.$route.query.max_price;
					this.searchPost.to_date=this.$route.query.to_date;
					this.searchPost.from_date=this.$route.query.from_date;
				
			this.fetchServiceAndOffer(TOKEN, this.searchPost, this.currentPage)
    },
    mounted() {
		
$(document).on('hidden.bs.modal', '.modaleditprofile', () => {
        this.max_price="";
						this.min_price="";
						this.dateFrom="";
						this.dateTo=""
     });
			// console.log(this.searchPost)
	},
	// filters:{
	// 	spl(value){
	// 		return value.split("T");
	// 	}
	// },
    methods: {
			fetchServiceAndOffer(token, postObj, pageNumber){

				HTTP.post(`search-requests?page=${pageNumber}&api_token=${token}`, postObj)
					.then(response => {
						// console.log(response.data)
						this.postList = response.data.data;
						this.totalPostRecords = response.data.total;
						this.total=response.data.total;
						this.from=response.data.from;
						this.to=response.data.to;
						if(this.postList.length == 0){
							this.nodata = true;
						}
						else{
								this.nodata = false;
						}

						this.pagiload = false;
						this.filterLoad = false;
						window.scrollTo(0,0)
						this.$store.state.savebuttonvisible=true;
						this.$store.state.searchparam=this.searchPost;
						
						this.$store.state.searchparam.from_date=this.dateFrom;
						this.$store.state.searchparam.to_date=this.dateTo;
						this.$store.state.searchparam.min_price="";
						this.$store.state.searchparam.max_price="";
						console.log(this.$store.state.searchparam);
						$(".modaleditprofile ").modal("hide");
						this.max_price="";
						this.min_price="";
						this.dateFrom="";
						this.dateTo=""
					})
					.catch(e => {
							console.log(e);
							alert('Something went wrong!');
							this.filterLoad = false;
							this.pagiload = false;
					})
			},
			setPage(page){
				this.pagiload = true;
				this.currentPage = page;
				this.fetchServiceAndOffer(TOKEN, this.searchPost, this.currentPage)
			},
			changeFilter($event){
				this.filterLoad = true;
				// console.log($event.target.value)
				if($event.target.value == 'date'){
					this.currentPage = 1;
					this.searchPost.orderBy = 'updated_at';
					this.searchPost.orderType = 'DESC';

					this.fetchServiceAndOffer(TOKEN, this.searchPost, this.currentPage)
				}

				if($event.target.value == 'priceL'){
					this.currentPage = 1;
					this.searchPost.orderBy = 'price';
					this.searchPost.orderType = 'ASC';

					this.fetchServiceAndOffer(TOKEN, this.searchPost, this.currentPage)
				}

				if($event.target.value == 'priceH'){
					this.currentPage = 1;
					this.searchPost.orderBy = 'price';
					this.searchPost.orderType = 'DESC';

					this.fetchServiceAndOffer(TOKEN, this.searchPost, this.currentPage)
				}


			},
			addToFav(id, fav){
				// console.log(id, fav);
					if(fav == 0){
						$(`.fav-${id}`).addClass('active');
						HTTP.post(`add-favourite?api_token=${TOKEN}`, {id: id})
						.then(response => {
							let msg = 'Added to your favourite list';
							this.$notify.success({
									content: msg,
									transition: 'zoom'
							});
							$(`.fav-${id}`).addClass('active');
							this.fetchServiceAndOffer(TOKEN, this.searchPost, this.currentPage)
						})
						.catch(e => {
								console.log(e);
						})
					} else {
						$(`.fav-${id}`).removeClass('active');
						HTTP.post(`remove-favourite?api_token=${TOKEN}`, {id: id})
						.then(response => {
							let msg = 'Removed from your favourite list';
							this.$notify.success({
									content: msg,
									transition: 'zoom'
							});
							$(`.fav-${id}`).removeClass('active');
							this.fetchServiceAndOffer(TOKEN, this.searchPost, this.currentPage)
						})
						.catch(e => {
								console.log(e);
						})
					}
			},

			filtermethod(value){
				// alert();
				
					$("#filterbutton").attr("disabled", false);
						this.filtering=true;
				 this.searchPost.min_price=this.min_price;
				 this.searchPost.max_price=this.max_price;
				 
			this.fetchServiceAndOffer(TOKEN, this.searchPost, this.currentPage)
			}	
				
	},
	updated(){
			if(this.min_price!="" ||  this.max_price!="" || this.dateFrom!="" || this.dateTo!="")
				{
					$("#filterbutton").attr("disabled", false);
			
			}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.filterdata{
	float: right;
}
.filterload{
	width: 30px;
	float: left;
	margin: 15px 10px;
}

</style>
