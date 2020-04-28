<template>
  <v-app>
    <v-toolbar app style="height: fit-content; flex: 0 0 auto;">
      <v-layout row wrap>
        <v-flex md6 xs12 style="align-self: center; padding: 10px 15px;" >
          <v-toolbar-title class="headline text-uppercase">
            <router-link :to="{name: 'home'}" >
              <span style="left: 10px;"> <span>김&nbsp;&nbsp;&nbsp;용&nbsp;&nbsp;&nbsp;숙</span> <br>Kim yong suk</span>
            </router-link>
          </v-toolbar-title>
        </v-flex>
        <v-layout md6 xs12 style="align-self: center; ">
          <v-flex xs2.4 style="text-align: center">
            <router-link class="text-uppercase" :to="{name: 'home'}">
                <span>Home&nbsp;</span>
            </router-link>
          </v-flex>
          <v-flex xs2.4 style="text-align: center">
            <router-link class="text-uppercase" :to="{name: 'profile'}">
                <span>Profile&nbsp;</span>
            </router-link>
          </v-flex>
          <v-flex xs2.4 style="text-align: center">
            <router-link class="text-uppercase" :to="{name: 'works'}">
                <span>Works&nbsp;</span>
            </router-link>
          </v-flex>
          <v-flex xs2.4 style="text-align: center">
            <router-link class="text-uppercase" :to="{name: 'gallery'}">
                <span>Gallery&nbsp;</span>
            </router-link>
          </v-flex>
          <v-flex xs2.4 style="text-align: center">
            <router-link class="text-uppercase" :to="{name: 'contact'}">
                <span>contact&nbsp;</span>
            </router-link>
          </v-flex>
        </v-layout>
      </v-layout>
    </v-toolbar>
    <v-content id="content">
      <router-view></router-view>
    </v-content>
    <v-row class="app_footer_cpr" style="padding: 0px;">
      <v-col cols="10" style="text-align:left; padding: 0px; padding-left: 20px;">
        Copyright © Kim Young Suk 2019. All Rights Reserved
      </v-col>
      <v-col cols="2" style="text-align:right; padding: 0px; padding-right: 20px;" v-if="this.$store.getters.user">
        <a v-on:click="logout">로그아웃</a>        
      </v-col>
    </v-row>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data () {
    return {
      nowUser:"",
    }
  },
  methods: {
    logout(){
      this.$store.dispatch('logout')
      .then(()=>{
        location.reload(true);
      });
    },    
  },
  mounted() {
    this.$store.dispatch('isLoggedIn')
      .then((data)=>{
        this.nowUser = data;
      });
    
    this.$store.dispatch('getNote');

  },
 
}
</script>

<style>
  .v-toolbar__content {
    height: fit-content !important;
  }

  #content{
    margin-top: 10px;
    padding-top: 0px !important;
  }

  @media screen and (min-width: 960px) {
    #content {
      margin-top: 10px;
    }
  }

  a {
    text-decoration: none;
    color: black !important;
  }

  @media (min-width: 1904px){
    .container {
      max-width: 1185px !important; 
    }
  }

  .app_footer_cpr{
    bottom: 0px;
    font-size: 13px !important;
    font-weight: 400;    
    font-family: Open Sans, sans-serif;
    font-style: normal;
    color: #6c6965;
    margin-left: 10px;
    line-height: 26px;
    padding: 0px;
  }
  
</style>