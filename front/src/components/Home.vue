<template>
 <v-container>
    <v-row>
        <v-col
            cols="12" md="6">
            <carousel 
                :per-page="1" 
                style="width: 100%">
                    <slide
                        v-for="(work, i) in this.mainWorks"
                        :key="i"
                        data-index="i"
                        data-name="work.title"
                        
                        >
                        <div class="main_work">
                            <v-img
                                :src="work.url"
                                :aspect-ratio="work.width/work.height"
                            >
                            </v-img>
                        </div>
                    </slide>
            </carousel>
        </v-col>
        <v-col cols="12" md="6">
            <v-card
                class="mx-auto"
                width="100%"
                height="80vh"
                tile
                color="#CCCCCC"
                style="padding-right:20%; display: flex; flex-direction: column; justify-content: center;"
            >
                <div v-if="this.$store.getters.note">
                    <v-card-text>
                        <div>작가 노트 TEXT</div>
                        <p class="main_comment_box_title">
                            {{this.$store.getters.note.title}}
                        </p>
                        <p>{{this.$store.getters.note.subTitle}}</p>
                        <div class="main_comment_box_comment">
                            "<br>
                            {{this.mainContent}}<br>
                            "
                        </div>
                    </v-card-text>
                    <v-card-actions>
                        <router-link class="text-uppercase" :to="{name: 'text'}">
                            <v-btn
                            text
                            color="#805959"
                        >
                            More
                        </v-btn>
                        </router-link>
                    </v-card-actions>
                </div>
                <div v-else>
                    <v-card-text>
                        <div class="main_comment_box_comment">
                            <br>
                            작가 노트가 없습니다.<br>
                            
                        </div>
                    </v-card-text>
                    <v-card-actions v-if="this.$store.getters.user">
                        <router-link class="text-uppercase" :to="{name: 'text'}">
                            <v-btn
                            text
                            color="#805959"
                        >
                            등록
                        </v-btn>
                        </router-link>
                    </v-card-actions>
                </div>
            </v-card>
        </v-col>
    </v-row>
 </v-container>
</template>

<script>
export default {
    data: () => ({
       mainWorks: []
    }),
    methods:{
        getMainWorks: function(){
            this.$store.dispatch('getShowMain')
                .then((data)=>{
                    this.mainWorks = data;
                })
        }
    },
    mounted() {
        this.getMainWorks();
    },
    computed: {
        mainContent(){
            let statements = this.$store.getters.note.content.split('.');
            console.log(statements);
            if(statements.length > 1){
                return statements[0] + "." + statements[1] + ".";
            }
            else{
                return statements[0] + ".";
            }
        }
    },
}
</script>

<style>

.main_work{
    width: 100%;
    height: 80vh;
    background-color: black;
    display: flex;
    justify-content: center;
    align-self: center;
}
.VueCarousel-dot{
    background-color: rgb(210,210,210) !important;
}

.VueCarousel-dot--active{
    background-color: rgb(0,0,0) !important;
}

.VueCarousel-dot-container{
    margin-top:  0px !important;
}

.main_comment_box{
    width: 100%; 
    height: 80vh; 
    background-color: rgb(210,210,210);
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 50px;
    padding-right: 150px;
    overflow:hidden;
    word-wrap:break-word;

}

.main_comment_box_title{
    font-family: 'Oswald', sans-serif;
    font-size: 36px;
    line-height: 44px;
    font-style: normal;
    font-weight: 400;
    text-transform: uppercase;
}

.main_comment_box_comment{
    font-family: Open Sans, sans-serif;
    font-size: 13px;
    line-height: 26px;
    letter-spacing: 0px;
    font-weight: 400;
    font-style: normal;
    text-transform: none;
    color: rgb(50,50,50);
}

@media screen and (max-width: 767px) and (orientation: portrait){
    .main_comment_box_title{
        font-size: 20px;
    }

    .main_comment_box{
        height: fit-content; 
    }
}

@media screen and (max-width: 350px) and (orientation: portrait){
    .main_comment_box_title{
        font-size: 15px;
        line-height: 20px;
    }
    .main_comment_box_comment{
        font-size: 10px;
    }
    .main_comment_box{
        height: fit-content; 
    }
}
</style>