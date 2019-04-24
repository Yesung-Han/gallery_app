<template>
  <v-app>
    <v-toolbar app style="height: fit-content;">
      <v-layout row wrap>
        <v-flex md8 xs12 style="align-self: center; padding: 10px 0px;" >
          <v-toolbar-title class="headline text-uppercase">
            <router-link :to="{name: 'home'}">
              <span>Kim yong suk &nbsp;</span>
              <span class="font-weight-light">Gallery</span>
            </router-link>
          </v-toolbar-title>
        </v-flex>
        <v-layout md4 xs12 style="align-self: center; ">
          <v-flex xs4 style="text-align: center">
            <router-link class="text-uppercase" :to="{name: 'profile'}">
                <span>Profile&nbsp;</span>
            </router-link>
          </v-flex>
          <v-flex xs4 style="text-align: center">
            <router-link class="text-uppercase" :to="{name: 'gallery'}">
                <span>Gallery&nbsp;</span>
            </router-link>
          </v-flex>
          <v-flex xs4 style="text-align: center">
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
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data () {
    return {
      //
    }
  }
}
</script>

<style>
  .v-toolbar__content {
    height: fit-content !important;
  }

  #content{
    margin-top: 73px;
    padding-top: 0px !important;
  }
  @media screen and (min-width: 960px) {
    #content {
      margin-top: 52px;
    }
  }

  a {
    text-decoration: none;
    color: black !important;
  }
</style>