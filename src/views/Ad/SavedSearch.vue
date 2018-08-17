<template>
    <section class="profilepage">
		<div class="container">
			
			<div class="row row_18">
				<div class="col-lg-3 col-md-3 col-sm-4 leftdbmenucol">
					<user-profile-card></user-profile-card>

                    <left-aside-nav></left-aside-nav>
				</div>

				<div class="col-lg-9 col-md-9 col-sm-8 procolleft">
					<div class="tabProduct">
						<ul class="nav nav-tabs" role="tablist">
						    <li role="presentation" class="active"><a href="#tabpro_1" aria-controls="tabpro_1" role="tab" data-toggle="tab">My saved search</a></li>
						    <!-- <li role="presentation"><a href="#tabpro_2" aria-controls="tabpro_2" role="tab" data-toggle="tab">Requests</a></li> -->
						</ul>

						<div class="panel-body">
						    <ul class="listsavesearch list-unstyled clearfix">
						        <li v-for="(search,index) in searechlist" :key="index">
						        	<div class="ssbox">
							            <figure>
							                <a href="javascript:void(0);">
							                    <div class="prodct_ico" style="background-color:#6d67e5; ">
							                        <div class="vcenter">
							                            <img src="assets/images/savedsearhicon.png" class="img-responsive">
							                        </div>
							                    </div>
							                </a>
							            </figure>
							            <div class="cont">
							                <h3 class="loftitle"><a @click="submitSearch(search)"><strong>{{search.search_title}}</strong></a></h3>
							            </div>
							        </div>
						   </li>

						    </ul>

						</div>

					</div>
					

				</div><!-- left col ]] -->


				
			</div>
		</div>

	</section>
</template>

<script>
import LeftAsideNav from '@/components/LeftAsideNav';
import UserProfileCard from '@/components/UserProfileCard';
import { HTTP, TOKEN } from '../../http';
import { config } from '../../config';
import { Pagination } from 'vue-pagination-2';


export default {
    name: 'SavedSearch',
    components: {
		'left-aside-nav': LeftAsideNav,
		'user-profile-card': UserProfileCard,
		Pagination
    },
    data() {
        return {
			searechlist:[]
        }
	},
	created(){
	

		this.getSearchlist();
	},
    methods: {
		getSearchlist(){
			HTTP.get(`my-saved?api_token=${TOKEN}`)
				.then(response => {
					
					this.searechlist=response.data;
				})
				.catch(e => {
					console.log(e);
				})
        },
           submitSearch(data){
               let params=JSON.parse(data.params);
              
            const makeUrl = `/search?search_query=${params.searchTxt}&tok_id=${TOKEN}&catg_i=${params.category}&type=${data.params.type == 2 ? 'S' : 'O'}&lat=${params.lat}
            &lng=${params.lng} &distance=${params.distance} &max_price=${params.max_price}&min_price=${params.min_price}&from_date=${params.from_date}&to_date=${params.to_date}
            `;
            window.location.href = makeUrl;
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.catgloader.pageload {
    position: absolute;
    background: #fcfcfcdb;
    width: 100%;
    height: 100%;
    z-index: 999;
}
.catgloader.pageload .lds-double-ring {
    top: 110px;
}

</style>
