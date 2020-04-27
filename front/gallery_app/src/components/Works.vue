<template>
    <v-container>
    <div style="min-height: 83vh">
    <v-col class="year-font" v-on:click="flags.is2019 = !flags.is2019"> 
        2019
        <img :src="require('../assets/arrow_down_black_36dp.png')" 
            width="30" 
            height="30"
            v-if="flags.is2019">
        <img :src="require('../assets/arrow_up_black_36dp.png')" 
            width="30" 
            height="30"
            v-if="!flags.is2019">
    </v-col>
        <div class="water-fall" v-if="flags.is2019"> 
            <v-card
                v-for="(work, i) in works.works_2019"
                :key="i"
                v-on:click="showDetail(work);"
                class="box"
            >
                <v-img
                        :src="work.url"
                        :aspect-ratio="work.width/work.height"
                    ></v-img>
                <v-card-text class="text--primary">
                    <div><b>{{work.title}}</b></div>
                    <div>{{work.height}}X{{work.width}}</div>
                    <div>{{work.material}}</div>
                    <div>{{work.year}}</div>
                    <div class="check-box" v-if="$store.getters.user">
                        <v-checkbox
                            v-model="work.showMain"
                            label="메인에 표시"
                            color="success"
                            hide-details
                            v-on:click.stop="updateShowMain(work)"
                        ></v-checkbox>
                    </div>
                </v-card-text>
                
            </v-card>
        </div>
        <div class="profile_sap"></div>
        <v-col class="year-font"  v-on:click="flags.is2018 = !flags.is2018"> 
        2018
        <img :src="require('../assets/arrow_down_black_36dp.png')" 
            width="30" 
            height="30"
            v-if="flags.is2018">
        <img :src="require('../assets/arrow_up_black_36dp.png')" 
            width="30" 
            height="30"
            v-if="!flags.is2018">
    </v-col>
        <div class="water-fall" v-if="flags.is2018">
            <v-card
                v-for="(work, i) in works.works_2018"
                :key="i"
                v-on:click="showDetail(work)"
                class="box"
            >
                <v-img
                        :src="work.url"
                        :aspect-ratio="work.width/work.height"
                    ></v-img>
                <v-card-text class="text--primary">
                    <div><b>{{work.title}}</b></div>
                    <div>{{work.height}}X{{work.width}}</div>
                    <div>{{work.material}}</div>
                    <div>{{work.year}}</div>
                    <div class="check-box" v-if="$store.getters.user">
                        <v-checkbox
                            v-model="work.showMain"
                            label="메인에 표시"
                            color="success"
                            hide-details
                            v-on:click.stop="updateShowMain(work)"
                        ></v-checkbox>
                    </div>
                </v-card-text>
            </v-card>
        </div>

        <v-btn class="plus_btn" 
                v-if="$store.getters.user"
               fab dark color="red"
               v-on:click="dialog = true">
            <v-icon dark>mdi-plus</v-icon>
        </v-btn>

        <v-dialog v-model="dialog" persistent max-width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">작품 추가하기</span>
          </v-card-title>
          <v-card-text>
            <v-container>
                    <v-form
                        ref="form"
                        v-model="valid"
                        lazy-validation
                        >
                        <v-text-field
                            v-model="newWork.title"
                            :counter="25"
                            :rules="nameRules"
                            label="작품명"
                            required
                        ></v-text-field>
                        <v-row>
                            <v-col cols="5">
                                <v-text-field
                                    v-model="newWork.height"
                                    :rules="numberRules"
                                    label="세로 길이(cm)"
                                    required
                                ></v-text-field>
                            </v-col>
                            <v-col cols="2" style="text-align: center; padding-top:35px;">
                            X
                            </v-col>
                            <v-col cols="5">
                                <v-text-field
                                     v-model="newWork.width"
                                    :rules="numberRules"
                                    label="가로 길이(cm)"
                                    required
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-text-field
                                    v-model="newWork.material"
                                    :rules="textRules"
                                    label="재료"
                                    required
                                ></v-text-field>

                        <v-text-field
                                    v-model="newWork.year"
                                    :rules="numberRules"
                                    label="제작 연도"
                                    required
                                ></v-text-field>

                        <br>
                        <br>
                        <v-file-input
                            v-model="file"
                            :rules="imgRules"
                            accept="image/png, image/jpeg, image/bmp"
                            placeholder="png, jpg 또는 bmp 파일 등록"
                            prepend-icon="mdi-camera"
                            label="작품 사진"
                            required
                        ></v-file-input>
                        
            <small>&nbsp;&nbsp; JPG, PNG 형식 올려주세요</small>
                        </v-form>  

            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="closeModal()">닫기</v-btn>
            <v-btn color="blue darken-1" text @click="validateAndSend()">저장</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

        <div class="detail" v-if="isDitail">
            <v-img class="clear_btn" 
                v-on:click="isDitail=false"
                :src="require('../assets/baseline_arrow_back_white_36dp.png')"></v-img>
            <v-img class="remove_btn" 
                v-if="$store.getters.user"
                v-on:click="removeWork()"
                :src="require('../assets/outline_delete_forever_white_36dp.png')"></v-img>
           
            <div class="work">
                <v-img
                        :src="selectedWork.url"
                        :aspect-ratio="selectedWork.width/selectedWork.height"
                    ></v-img>
                <div class="font">
                    <b>{{selectedWork.title}}</b> 
                    {{selectedWork.size}}
                    {{selectedWork.material}}
                    {{selectedWork.year}}
                </div>
            </div>    
        </div>

        </div>
    </v-container>
</template>

<script>
export default {
    data: () => ({
        flags:{
            is2019: true,
            is2018: true,
        },
        file: null,
        valid:true,
        isDitail: false,
        dialog: false,
        selectedWork: {},
        newWork: {
            title: "",
            height: "",
            width: "",
            material:"",
            year: "",
            link:"",
        },
        nameRules: [
            v => !!v || '해당 란을 입력해주세요.',
            v => (v && v.length <= 25) || '작품명은 25자 미만으로 입력해주세요.',
        ],
        textRules:[
            v => !!v || '해당 란을 입력해주세요.',
        ],
        numberRules:[
            v => !!v || '해당 란을 입력해주세요.',
            v => (v && !isNaN(v)) && v > 0 || '알맞은 숫자를 입력해주세요.',
        ],
        imgRules: [
            value => !value || value.size < 2000000 || '파일 크기가 2 MB 미만이어야 합니다.',
        ],
        works: {
            works_2019:[],
            works_2018:[]
        }
    }),
    methods:{
        updateShowMain: function(work){
            console.log("변경전:" + work.showMain);
            this.$store.dispatch('updateShowMain',{
                id: work.id,
                showMain: !work.showMain
            })
            .then((res)=>{
                console.log('변경 완료');
                console.log(res.data.showMain);
                work.showMain = res.data.showMain;
            })
        },
        showDetail: function(work){
            this.selectedWork = work;
            this.isDitail = true;
        },
        validateAndSend () {
            if (this.$refs.form.validate()) {
                let formData = new FormData();
                let imgFile = this.file;
                formData.append("img", imgFile);
                
                let payload = {
                    title: this.newWork.title,
                    material: this.newWork.material,
                    year: this.newWork.year,
                    height: this.newWork.height,
                    width: this.newWork.width,
                    formData: formData,
                }

                this.$store.dispatch('createWork',payload)
                .then(()=>{
                    this.$store.dispatch('getWorksByYear',payload.year)
                        .then((data)=>{
                            console.log("로드 완료 : " + payload.year);
                            if(payload.year==2019){
                                console.log("데이터 주입 완료 : " + payload.year);
                                this.works.works_2019 = data;
                            }
                            else if(payload.year==2018){
                                console.log("데이터 주입 완료 : " + payload.year);
                                this.works.works_2018 = data;
                            }
                            location.reload(true);
                            console.log(this.works)
                        })
                });
                
                this.dialog = false;
                this.$refs.form.reset()
            }
        },
        closeModal () {
            this.dialog = false;
            this.$refs.form.reset()
        },
        removeWork() {
            this.$confirm("삭제 하시겠습니까?")
            .then(()=>{    
                this.$store.dispatch('deleteWork',{
                    id: this.selectedWork.id,
                })
            })
            .then(()=>{
                console.log("삭제 완료!");
                this.$fire({
                    text: "삭제 완료",
                    icon: "success",
                    timer: 1500
                })
            })
            .then(()=>{
                location.reload(true);
            })
            .catch((err)=>{
              console.log("삭제 취소");
              console.log(err);  
            })
        },
    },
    mounted: function () {
        this.$store.dispatch('getWorksByYear',2019)
            .then((data)=>{
                this.works.works_2019 = data;
            })

        this.$store.dispatch('getWorksByYear',2018)
            .then((data)=>{
                this.works.works_2018 = data;
            })
            
    }
}
</script>

<style>

.year-font{
    font-family: "Roboto", sans-serif;
    line-height: 1.5;
    font-size: 20px;
    color: black;
    display: flex;
    justify-content: left;

}

.plus_btn{
    position: fixed;
    bottom: 20px; 
    right: 20px;
}


.detail{
    position: fixed;
    top: 0px; 
    left: 0px;
    width: 100%;
    height: 100vh;
    background-color: rgb(0,0,0, 0.9);
    display: flex;
    justify-content: center;
    align-self: center;
}

.detail .clear_btn{
    position: fixed;
    top: 10px;
    left: 10px;
    width: 50px;
    cursor: pointer;
}

.detail .remove_btn{
    position: fixed;
    bottom: 10px;
    right: 10px;
    width: 50px;
    cursor: pointer;
}

.detail .work{
    width: 35%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-self: center;
}

.detail .font{
    color: white;
    font-size: 13px;
}

.water-fall .box {
	font-size: 13px;
	display: inline-block;
    background-color: white;
	width: 100%;
	vertical-align: top;
	margin-bottom: 20px;
    font-family: Open Sans, sans-serif;
    font-style: normal;
}

.water-fall .box:hover {
	font-size: 13px;
	display: inline-block;
    background-color: rgb(220,220,220);
	width: 100%;
	vertical-align: top;
	margin-bottom: 20px;
    opacity: 0.7;
    cursor: pointer;
}

.water-fall {
	padding: 20px;
	font-size: 0;
	-moz-transition-property: all;
	-o-transition-property: all;
	-webkit-transition-property: all;
	transition-property: all;
	-moz-transition-duration: 0.4s;
	-o-transition-duration: 0.4s;
	-webkit-transition-duration: 0.4s;
	transition-duration: 0.4s;
	-webkit-column-count: 3;
	-webkit-column-gap: 35px;
	-moz-column-count: 3;
	-moz-column-gap: 35px;
	column-count: 3;
	column-gap: 35px;
}
@media screen and (max-width: 3024px) {
	.water-fall {
		-webkit-column-count: 3;
		-webkit-column-gap: 25px;
		-moz-column-count: 3;
		-moz-column-gap: 25px;
		column-count: 3;
		column-gap: 25px;
	}
}

@media screen and (orientation: portrait) {
    .detail .work{
        width: 80%;
    }
}
@media screen and (orientation: landscape) {
    .detail .work{
        width: 35%;
    }
}
@media screen and (max-width: 767px) {
	.water-fall {
		-webkit-column-count: 2;
		-webkit-column-gap: 15px;
		-moz-column-count: 2;
		-moz-column-gap: 15px;
		column-count: 2;
		column-gap: 15px;
    }
}
</style>