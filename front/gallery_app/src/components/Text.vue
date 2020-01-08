<template>
    <v-container>
    <div style="min-height: 83vh; text-align: center; padding: 0px 10%;" 
         v-if="this.$store.getters.note">
        <br>
        <br>
        <p class="main_comment_box_title">{{this.$store.getters.note.title}}</p>
        <p class="main_comment_sub_title">{{this.$store.getters.note.subTitle}}</p>
        <br>

        <br>
        <pre class="main_comment_box_comment" 
            style="white-space: pre-wrap; text-align: left;"
        >{{this.$store.getters.note.content}}
        </pre>
    </div>
    <div v-else style="text-align:center;">
        <br>
        새 작가노트를 등록해주세요.
    </div>
    <v-btn class="plus_btn"
        fab dark large color="cyan"
        v-on:click="openDialog"
        v-if="this.$store.getters.user">
        <v-icon dark>mdi-pencil</v-icon>
    </v-btn>

    <v-dialog v-model="dialog" persistent max-width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">작가노트 수정하기</span>
          </v-card-title>
          <v-card-text>
            <v-container>
                <v-form
                    ref="form"
                    v-model="valid"
                    lazy-validation
                    >
                    <v-text-field
                        v-model="newNote.main_title"
                        :counter="25"
                        :rules="nameRules"
                        label="제목"
                        required
                    ></v-text-field>
                    <v-text-field
                        v-model="newNote.sub_title"
                        :counter="25"
                        :rules="nameRules"
                        label="부제"
                        required
                    ></v-text-field>
                    <v-textarea
                        v-model="newNote.main_comment"
                        label="내용"
                        :counter="20000"
                        :rules="textRules"
                        full-width
                        single-line
                    ></v-textarea>
                </v-form>  
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text v-on:click="dialog=false">닫기</v-btn>
            <v-btn color="blue darken-1" text v-on:click="sendData">수정</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
</template>

<script>
export default {
    data: () => ({
        dialog: false,
        valid: false,
        nameRules: [
            v => !!v || '해당 란을 입력해주세요.',
            v => (v && v.length <= 25) || '작품명은 25자 미만으로 입력해주세요.',
        ],
        textRules: [
            v => !!v || '해당 란을 입력해주세요.',
            v => (v && v.length <= 20000) || '20000자 미만으로 입력해주세요.',
        ],
        newNote: {
            main_title: "",
            sub_title: "",
            main_comment:""
        }
    }),
    methods:{
        openDialog(){
            if(this.$store.getters.note){
                this.newNote.main_title = this.$store.getters.note.title;
                this.newNote.sub_title = this.$store.getters.note.subTitle;
                this.newNote.main_comment = this.$store.getters.note.content;
            }
            this.dialog = true;
        },
        sendData(){
            if(this.$refs.form.validate()){
                let payload = {
                    title: this.newNote.main_title,
                    subTitle: this.newNote.sub_title,
                    content: this.newNote.main_comment,
                }
                this.$store.dispatch('updateNote',payload)
                    .then(()=>{
                        this.dialog = false;
                        location.reload(true);
                    })
            }
        }
    },
    mounted() {
    },
}
</script>

<style>
    .main_comment_box_title{
        font-family: 'Oswald', sans-serif;
        font-size: 36px;
        line-height: 44px;
        font-style: normal;
        font-weight: 400;
        text-transform: uppercase;
    }
    .main_comment_sub_title{
        font-family: Open Sans, sans-serif;
        font-size: 20px;
        line-height: 26px;
        letter-spacing: 0px;
        font-weight: 400;
        font-style: normal;
        text-transform: none;
        color: rgb(50,50,50);
    }

    .main_comment_box_comment{
        font-family: Open Sans, sans-serif;
        font-size: 20px;
        line-height: 26px;
        letter-spacing: 0px;
        font-weight: 400;
        font-style: normal;
        text-transform: none;
        color: rgb(50,50,50);
    }
</style>