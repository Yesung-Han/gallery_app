<template>
 <v-container>
    <v-row>
        <v-col cols="12" md="6">
            <div class="profile_box">
                <v-img
                    :src="require('../assets/profile.png')"
                    contain
                ></v-img>
                <v-row>
                    <v-col cols="12" md="4" style="align-self: center; ">
                        <div class="profile_text" style="font-weight: 600;">
                            김용숙
                        </div>
                    </v-col>
                    <v-col cols="12" md="8" style="align-self: center; ">
                        <div class="profile_text">
                            Kim Young Suk
                        </div>
                    </v-col>
                </v-row>
                <div class="profile_sap"></div>
                <v-row>
                    <v-col cols="12" md="4" style="align-self: top; ">
                        <div class="profile_content_text" style="font-weight: 600;">
                            EDUCATION
                        </div>
                    </v-col>
                    <v-col cols="12" md="8" style="align-self: center; ">
                        <div class="profile_content_text">
                            <div v-for="(content, i) in EDUCATION"
                                :key="i"
                            >
                                {{content}}<br>
                            </div>
                        </div>
                    </v-col>
                </v-row>
                <div class="profile_sap"></div>
                <v-row>
                    <v-col cols="12" md="4" style="align-self: top; ">
                        <div class="profile_content_text" style="font-weight: 600;">
                            PRESENT
                        </div>
                    </v-col>
                    <v-col cols="12" md="8" style="align-self: center; ">
                        <div class="profile_content_text">
                            <div v-for="(content, i) in PRESENT"
                                :key="i"
                            >
                                {{content}}<br>
                            </div>
                        </div>
                    </v-col>
                </v-row>
                <div class="profile_sap"></div>
                <v-row>
                    <v-col cols="12" md="4" style="align-self: top; ">
                        <div class="profile_content_text" style="font-weight: 600;">
                            AWARDS
                        </div>
                    </v-col>
                    <v-col cols="12" md="8" style="align-self: center; ">
                        <div class="profile_content_text">
                            <div v-for="(content, i) in AWARDS"
                                :key="i"
                            >
                                {{content}}<br>
                            </div>
                        </div>
                    </v-col>
                </v-row>
            </div>
        </v-col>
        <v-col cols="12" md="6">
            <div class="profile_box">
                <div class="profile_sap"></div>
                <div class="profile_content_text" style="font-weight: 600;">
                    SOLO_EXHIBITIONS
                </div><br>
                <div class="profile_content_text">
                    <div v-for="(content, i) in SOLO_EXHIBITIONS"
                        :key="i"
                    >
                        {{content}}<br>
                    </div>
                </div>
                <div class="profile_sap"></div>
                <div class="profile_content_text" style="font-weight: 600;">
                    GROUP_EXHIBITIONS
                </div><br>
                <div class="profile_content_text">
                    <div v-for="(content, i) in GROUP_EXHIBITIONS"
                        :key="i"
                    >
                        {{content}}<br>
                    </div>
                </div>
            </div>
        </v-col>
    </v-row>
 </v-container>
</template>

<script>
export default {
    data: () => ({
        EDUCATION: [
            'Hongik University Graduate School of Fine Art'
        ],
        PRESENT: [
            'Manber of Korea Association of Art/director',
            'Manber of Korea Bucheon Society of Arts',
            'Manber of Environmental Society of Arts',
            'Manber of Contemporary Art in Bucheon Artist Association', 
        ],
        AWARDS: [
            'Art contest of the Republic of Korea/winning work',
            'An art contest Mokwoo/ special work',
            'International Joint Artist Association/ excellence Artist award',
            'Land,Environment,Maritime art the target environment Exhibition/special work',
        ],
        SOLO_EXHIBITIONS: [
            '2019. Danwon Museum',
            '2019. Hongik Museum of Art',
            '2015. Sakhalin state art gallery',
            '2015. GRAND INTERCONTINENTAL SEOUL PARNAS',
            '2014. Seoul Open Art Fair (KOEX,Seoul)',
            '2014. Seokam Museum', 
            '2014. ARA ARTCENTER (Seoul,Korea)',
            '2014. Art Shopping (Louvre Museum in Frannce)',
            '2014. Living Water Baptist Church (Seoul,Korea)',
            '2011. Shanghai Art Fair (Shanghai,China)',
            '2010. Seoul Museum of Art (Seoul,Korea)',
            '2006. Seoul Museum of Art (Seoul,Korea)',
        ],
        GROUP_EXHIBITIONS: [
            '-Seoul Open Art Fair (KOEX,Seoul)',
            '-Sakhalin Arts Festival (Sakhalin State Museum of Art)',
            '-With Art Fair (Grand Inter-Continental, Seoul, Farah Nas)',
            '-ART SHOPPING (kkarujel Hall in the Louvre Museum, France)',
            '-Shanghai Art Fair (Shanghai, EXPO Exhibition Hall)',
            '-KIAF (Seoul. KOEX)',
            '-Art Fair, Daegu, Korea (Daegu, EXCO)',
            '-52th Manbers Exhibition Korea Association of Art (Hangaram Art Museum art Seoul Arts Center)',
            '-Invitational exhibition-Art of modern Emergent languages (The first gallery)',
            '-Planning and an invitation exhibit/open studio-companion (The art center Geumboseong)',
            "-Bucheon Cultural Center- The first New Year's planning Exhibition(Arisol Gallery)",
            '-43th Manbers Bucheon Cultural Center (Arisol Gallery)',
            '-Korea-Japan Joint Art Exibition (Poksagol Art Gallery)',
            '-Invitation of the 100, the author of this year,Exibition (Gallery Yesul Konggan)',
            "-NewYear's first exhibition/12  lady Artist-Flower Exhibition(Gallery Yesul Konggan)",
            '-Picture than flowers exhibition(Johyeng Gallery)',
            '-Korean art An exhibition of view(Gallery GO)',
            '-Manbers Exhibition Korea Association of Art(Danwon Art Gallery)',
            '-Seocheon 600th anniversary of the nominated exhibition(Seocheon Culture Center)',
            '-The 20th anniversary of diplomatic relations between Korea and China',
            '-Land,Environment,Maritime art the target environment Exhibition(Gyeonghui Palace Seoul Municipal Art Gallery)',
            '-China-Korea International art exhibition(Shanghai Hongchau Art Gallery)',
            '-Art contest of the Republic of Korea (Seoul Arts Center)',
            '-Goyang International Contemporary Art Festival (KINTEX, Goyang Flower EXPO)', 
            '-Kyenghyang Arts Contest (Kyenghyang Newspaper Gallery)',
            '-Haengju Arts Contest (Ilsan lake Gallery)',
            '-Na Hye-sok Arts Contest(Suwon Art Center)',
            '-Moran Museum of Modern Art World (Seongnam Arts Center) In addition 120 times',
        ]
    })
  }
</script>

<style>
.profile_box{

}
.profile_text{
    font-size: 30px;
    font-weight: 400;
    font-family: Open Sans;
    font-style: normal;
    color: #6c6965;
    margin: 0 0 0;
    line-height: 26px;
}
.profile_content_text{
    font-size: 13px;
    font-weight: 400;    
    font-family: Open Sans, sans-serif;
    font-style: normal;
    color: #6c6965;
    margin: 0 0 0;
    line-height: 26px;
}
.profile_sap{
    border-color: #dddddd;
    border-bottom-width: 1px;
    border-style: solid;
    margin: 5px 0;
}
</style>