const { createApp } = Vue;

createApp({
    data() {
      return {
       products:[],
       temp: {
        imagesUrl:[]
      },
       productModal:null,
       delProductModal:null,
       isNew:false //確認是編輯或新增
      }
    },
    methods:{
       checkAdmin(){
        const url="https://vue3-course-api.hexschool.io/v2/api/user/check";
        axios.post(url)
        .then((res) => {
            this.getData();
        })
        .catch((err) => {
            alert(err.data.message);
            location.href="login.html";
        })
       } ,
       getData(){
        const url="https://vue3-course-api.hexschool.io/v2/api/likefanzi/admin/products";

        axios.get(url)
        .then((res) => {
            this.products=res.data.products;
        })
        .catch((err) => {
            alert(err.data.message);
        })
       },
       openEditModal(product){
        this.productModal.show();
        this.isNew=false;
        this.temp={...product};
       },
       openAddModal(){
        this.productModal.show();
        this.isNew=true;
        this.temp={imagesUrl:[]};
       },
       updateProduct(){
        if(this.isNew){
            axios.post("https://vue3-course-api.hexschool.io/v2/api/likefanzi/admin/product",{"data":this.temp})
            .then((res) => {
                alert(res.data.message);
                this.getData();
            })
            .catch((err) => {
                alert(err.data.message);
            })
        }else{
            axios.put(`https://vue3-course-api.hexschool.io/v2/api/likefanzi/admin/product/${this.temp.id}`,{"data":this.temp})
            .then((res) => {
                alert(res.data.message);
                this.getData();
            })
            .catch((err) => {
                alert(err.data.message);
            }) 
        }
        this.productModal.hide();
       },
       openDelModal(product){
        this.temp={...product};
        this.delProductModal.show(); 
       },

       delProduct(){
        const url=`https://vue3-course-api.hexschool.io/v2/api/likefanzi/admin/product/${this.temp.id}`

        axios.delete(url)
        .then((res) => {
            alert(res.data.message);
            this.getData();
        })
        .catch((err) => {
            alert(err.data.message);
        })
        this.delProductModal.hide(); 
       },
       addImage(){
        this.temp.imagesUrl=[];
        this.temp.imagesUrl.push("");
       }
    },
    mounted(){
        //取出cookie
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)yokumoku\s*=\s*([^;]*).*$)|^.*$/, '$1'); 
        //將cookie存入headers
        axios.defaults.headers.common.Authorization = token;
        this. checkAdmin();
        
        this.productModal = new bootstrap.Modal(document.getElementById('productModal'));
        this.delProductModal=new bootstrap.Modal(document.getElementById('delProductModal'));
    }
  }).mount('#app')