const { createApp } = Vue;

createApp({
    data() {
        return {
            user:{
                username:"",
                password:""
            }
        }
    },
    methods: {
        login() {
            const url = "https://vue3-course-api.hexschool.io/v2/admin/signin";
            axios.post(url, this.user)
                .then((res) => {
                    const {token, expired}=res.data;
                    //存取cookie
                    document.cookie = `yokumoku=${token}; expires=${expired}`;
                    location.href="products.html";
                })
                .catch((err) => {
                    alert("登入錯誤");
                })
        }
    }
}).mount('#app')



