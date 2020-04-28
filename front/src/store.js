import Vuex from 'vuex'
import Vue from 'vue'
import Axios from 'axios'

Vue.use(Vuex);

Axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

export const store = new Vuex.Store({
    //this.$store.state.변수명 으로 접근
    state: {
        mainWork: [],
        user:"",
        note: null,
    },

    //this.$store.getters.변수명 으로 접근
    getters:{
        // getCounter: function (state) {
        //     return state.counter;
        // }

        mainWork: function(state){
            return state.mainWork;
        },
        user: function(state){
            return state.user;
        },
        note: function(state){
            return state.note;
        }

    },

    //동기적 로직 수행 setter역할 
    //this.$store.commit('', payload)
    mutations:{
        // addCounter: function (state, payload) {
        //     state.counter = payload.value;
        // }
        addMainWork: (state,payload)=>{
            state.mainWork.push(payload);
        },
        deleteMainWork: (state,payload)=>{
            state.mainWork.splice(state.mainWork.findIndex(x => x.id === payload.id),1);
        },
        setNote:(state, payload)=>{
            state.note = payload;
        }
    },

    //비동기 로직 수행 this.$store.dispatch('addCounter');
    actions:{
        getNote:(context)=>{
            return new Promise(()=>{
                Axios.get('http://localhost:8001/note',{
                    withCredentials: true,
                })
                .then(res=>{
                    console.log(res.data);
                    if(res.data.result){
                        context.commit('setNote',res.data.data);
                    }
                })
                .catch(err=>{
                    console.log(err);
                })
            })
        },
        updateNote:(context, payload)=>{
            return new Promise((resolve, reject)=>{
                Axios.post('http://localhost:8001/note',payload,{
                    withCredentials: true,
                })
                .then((res)=>{
                    console.log(res);
                    resolve(res);
                })
                .catch((err)=>{
                    console.log(err);
                    reject(err);
                })
            })
        },
        isLoggedIn:(context)=>{
            return new Promise((resolve,reject)=>{
                Axios.get('http://localhost:8001/auth',{
                    withCredentials: true,
                })
                .then((res)=>{
                    console.log(res.data);
                    context.state.user = res.data.id;
                    console.log(context.state.user);

                    resolve(res.data.id);
                })
                .catch((err)=>{
                    console.log(err);

                    reject(err);
                })
            })
        },
        logout:(context)=>{
            return new Promise((resolve, reject)=>{
                Axios.get('http://localhost:8001/auth/logout', {
                    withCredentials: true,
                })
                .then(res=>{
                    if(res.data.result === true){
                        console.log("로그아웃 성공");
                        context.state.user = "";
                    }
                    resolve(res);
                })
                .catch(err=>{
                    reject(err);
                })
            })
        },
        login:(context, payload)=>{
            return new Promise((resolve, reject)=>{
                console.log(payload);
                Axios.post('http://localhost:8001/auth/login', payload, {
                    withCredentials: true,
                })
                .then((res)=>{
                    console.log(res);
                    resolve(res);
                })
                .catch((err)=>{
                    console.log(err);
                    reject(err);
                })
            })
        },
        getWorksByYear:(context, payload)=>{
            return new Promise((resolve, reject)=>{                
                Axios.get('http://localhost:8001/work/', {
                    params: {
                        year: payload,
                    }
                })
                .then((res)=>{
                    resolve(res.data);
                })
                .catch((err)=>{
                    console.log(err)
                    reject(err);
                })
            });
        },
        uploadImg: (context, payload)=>{
            return new Promise((resolve, reject)=>{                
                Axios.post('http://localhost:8001/upload', payload, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                .then((res)=>{
                    resolve(res);
                })
                .catch((res)=>{
                    reject(res);
                })
            });
        },

        //동기방식으로 변경해야할듯
        createWork: (context, payload)=>{
            return new Promise((resolve, reject)=>{
                context.dispatch('uploadImg', payload.formData)
                    .then((res)=>{
                        console.log(res);

                        let newWork = {
                            title: payload.title,
                            material: payload.material,
                            year: payload.year,
                            height: payload.height,
                            width: payload.width,
                            url: res.data.url,
                            key: res.data.key,
                        }
                        
                        console.log(newWork);

                        Axios.post('http://localhost:8001/work',newWork);
                    })
                    .then((res)=>{
                        resolve(res);
                    })
                    .catch((err)=>{
                        reject(err);
                    })
            });
        },
        updateShowMain: (context, payload)=>{
            return new Promise((resolve, reject)=>{
                Axios.patch('http://localhost:8001/work/',payload, {
                    params: {
                        id: payload.id,
                    }
                })
                .then((res)=>{
                    resolve(res);
                })
                .catch((err)=>{
                    reject(err);
                });
            });
        },
        getShowMain:()=>{
            return new Promise((resolve, reject)=>{
                Axios.get('http://localhost:8001/work/showMain')
                .then((res)=>{
                    resolve(res.data);
                })
                .catch((err)=>{
                    reject(err);
                });
            });
        },
        deleteWork: (context, payload)=>{
            return new Promise((resolve, reject)=>{
                Axios.delete('http://localhost:8001/work/', {
                    params: {
                        id: payload.id,
                    }
                })
                .then((res)=>{
                    resolve(res);
                })
                .catch((err)=>{
                    console.log(err)
                    reject(err);
                })
            })
        }
    },

})