<template>
  <center>
    <div>
      <el-steps :active="active" finish-status="success">
        <el-step title="步骤 1"></el-step>
        <el-step title="步骤 2"></el-step>
        <el-step title="步骤 3"></el-step>
      </el-steps>
      <br><br><br><br>
      <el-form ref="form" :model="formGoodsAdd" label-width="80px" v-if="tiaoZhuan==1">
        <el-form-item label="商品名称">
          <el-input v-model="formGoodsAdd.name"></el-input>
        </el-form-item>
        <el-form-item label="商品标题">
          <el-input v-model="formGoodsAdd.title"></el-input>
        </el-form-item>
        <el-form-item label="品牌" align="left">
          <el-select  v-model="formGoodsAdd.bandId" placeholder="请选择">
            <el-option
              v-for="item in bandData"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="商品介绍">
          <el-input type="textarea" v-model="formGoodsAdd.productdecs"></el-input>
        </el-form-item>

        <el-form-item label="价格">
          <el-input v-model="formGoodsAdd.price"></el-input>
        </el-form-item>

        <el-form-item label="库存">
          <el-input v-model="formGoodsAdd.stocks"></el-input>
        </el-form-item>

        <el-form-item label="排序">
          <el-input v-model="formGoodsAdd.sortNum"></el-input>
        </el-form-item>

        <el-form-item align="center">
          <el-button type="primary" @click="next">下一步</el-button>
        </el-form-item>
      </el-form>

      <el-form ref="form" :model="formGoodsAdd" label-width="80px" v-if="tiaoZhuan==2">
        <el-form-item label="商品名称">
          <el-input v-model="formGoodsAdd.name"></el-input>
        </el-form-item>
        <el-form-item label="商品标题">
          <el-input v-model="formGoodsAdd.title"></el-input>
        </el-form-item>
        <el-form-item label="品牌">
          <el-select  v-model="formGoodsAdd.bandId" placeholder="请选择">
            <el-option
              v-for="item in bandData"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="商品介绍">
          <el-input type="textarea" v-model="formGoodsAdd.productdecs"></el-input>
        </el-form-item>

        <el-form-item label="价格">
          <el-input v-model="formGoodsAdd.price"></el-input>
        </el-form-item>

        <el-form-item label="库存">
          <el-input v-model="formGoodsAdd.stocks"></el-input>
        </el-form-item>

        <el-form-item label="排序">
          <el-input v-model="formGoodsAdd.sortNum"></el-input>
        </el-form-item>

        <el-form-item align="center">
          <el-button type="primary" @click="rollback" v-if="lastshow">上一步</el-button>
          <el-button type="primary" @click="next" v-if="nextshow">下一步</el-button>
        </el-form-item>
      </el-form>

    </div>
  </center>
</template>

<script>
  export default {
    name: "Goods",
    data(){
      return{
        active: 0,
        formGoodsAdd:{
          name:"",
          title:"",
          bandId:"",
          productdecs:"",
          price:"",
          stocks:"",
          sortNum:""
        },
        bandData:[],
        tiaoZhuan:1,
        nextshow:true,
        lastshow:true
      }
    },
    methods:{
      next:function () {
        this.active+=1;
        this.tiaoZhuan+=1;
        if (this.tiaoZhuan>=3){
          this.nextshow=false;

        }this.lastshow=true;
      },
      rollback:function () {
        this.active-=1;
        this.tiaoZhuan-=1;
        if (this.tiaoZhuan<=1){
          this.lastshow=false;

        }this.nextshow=true;
      }
    },
    created:function(){
      this.$axios.get("http://192.168.1.220:8080/BrandController/queryBrand").then(res=>{
        this.bandData=res.data.data;
      }).catch(res=>{
        alert("查询失败")
      })
    }
  }
</script>

<style scoped>

</style>

