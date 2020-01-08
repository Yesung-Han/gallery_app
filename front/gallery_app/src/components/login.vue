<template>
 <v-container>
    <div>
        <v-card v-if="!this.$store.getters.user">
          <v-card-title>
            <span class="headline">관리자 로그인</span>
          </v-card-title>
          <v-card-text>
            <v-container>
                    <v-form
                        ref="form"
                        v-model="valid"
                        lazy-validation
                        >
                        <v-text-field
                            v-model="userData.ID"
                            :rules="textRules"
                            label="ID"
                            required
                        ></v-text-field>
                        <v-text-field
                        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                            :type="show1 ? 'text' : 'password'"
                            v-model="userData.PWD"
                            :rules="textRules"
                            label="Password"
                            required
                            @click:append="show1 = !show1"
                        ></v-text-field>
            <br>
            <small>&nbsp;&nbsp; 관리자 계정 문의: 930805hys@naver.com</small>
                        </v-form>  

            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text v-on:click="login()">로그인</v-btn>
          </v-card-actions>
        </v-card>
		<v-card v-else>
			<v-card-title>
				관리자 로그인
			</v-card-title>
			<v-card-text>
				이미 로그인 되어 있습니다.
			</v-card-text>
      <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text v-on:click="logout()">로그아웃</v-btn>
      </v-card-actions>
		</v-card>
    </div>
 </v-container>
</template>

<script>
export default {
    data: () => ({
        valid:true,
        show1: false,
        userData: {
            ID: "",
            PWD: ""
        },
        textRules:[
            v => !!v || '해당 란을 입력해주세요.',
        ],
    }),
    methods:{
      login(){
        if (this.$refs.form.validate()) {
          console.log('로그인 버튼 누름!');
          let payload = {
            'id-field': this.userData.ID,
            'password-field': this.userData.PWD
          }
          
          this.$store.dispatch('login', payload).then((res)=>{
            if(res.data.result === true)
            {
              console.log('로그인 성공');
              this.$fire({
                    text: "관리자 로그인 성공",
                    icon: "success",
                    timer: 3000
              })
              
              location.reload(true);
            }
            else{
              console.log('로그인 실패');
              this.$fire({
                    text: "아이디나 비밀번호가 틀립니다.",
                    icon: "error",
                    timer: 5000
                })
            }
          })
        }
      },
      logout(){
          this.$store.dispatch('logout')
          .then(()=>{
            location.reload(true);
          });

      }, 
    },
    mounted() {
        

    },
}
</script>

<style>

</style>