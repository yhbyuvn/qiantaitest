<template>
  <center>
    <div style="width: 800px">
      <el-steps :active="active" finish-status="success">
        <el-step title="步骤 1"></el-step>
        <el-step title="步骤 2"></el-step>
        <el-step title="步骤 3"></el-step>
      </el-steps>
      <br><br><br><br>
      <el-form ref="form" :model="formGoodsAdd" label-width="80px" v-if="active==0">
        <el-form-item label="商品名称">
          <el-input v-model="formGoodsAdd.name"></el-input>
        </el-form-item>
        <el-form-item label="商品标题">
          <el-input v-model="formGoodsAdd.title"></el-input>
        </el-form-item>
        <el-form-item label="品牌" align="left">
          <el-select  v-model="formGoodsAdd.brandid" placeholder="请选择">
            <el-option
              v-for="item in brandData"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="商品介绍">
          <el-input type="textarea" v-model="formGoodsAdd.productdecs"></el-input>
        </el-form-item>

        <el-upload
          label="商品图片"
          class="upload-demo"
          action="http://localhost:8080/api/type/upload"
          name="imgpath"
          :on-success="uploadGoods"
          list-type="picture">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>

        <el-form-item label="价格">
          <el-input v-model="formGoodsAdd.price"></el-input>
        </el-form-item>

        <el-form-item label="库存">
          <el-input v-model="formGoodsAdd.stocks"></el-input>
        </el-form-item>

        <el-form-item label="排序">
          <el-input v-model="formGoodsAdd.sortnum"></el-input>
        </el-form-item>

        <el-form-item align="center">
          <el-button type="primary" @click="next">下一步</el-button>
        </el-form-item>
      </el-form>

      <el-form ref="form" :model="formGoodsAdd2" label-width="80px" v-if="active==1">
        <el-form-item label="类型" >
          <el-select v-model="formGoodsAdd2.typeid" placeholder="请选择" @change="chaProByTypeid">
            <el-option
              v-for="item in protypes"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-table
            :data="arr3"
            v-if="chkyos"
            border
            style="width: 100%">


            <el-table-column v-for="p1 in skuData" :key="p1.id" :label="p1.namech" :prop="p1.name">
            </el-table-column>

            <el-table-column
              label="库存"
              width="150">
              <el-input></el-input>
            </el-table-column>
            <el-table-column
              label="价格"
              width="150">
              <el-input></el-input>
            </el-table-column>

          </el-table>
        </el-form-item>

        <el-form-item label="选项" v-if="skuData.length>0">
          <el-form-item v-for="p1 in skuData" :key="p1.id" :label="p1.namech">

            <el-input v-if="p1.type==0"></el-input>

            <el-radio-group v-if="p1.type==1">
              <el-radio v-for="p2 in p1.values" :label="p2.valuech" :key="p2.id"></el-radio>
            </el-radio-group>

            <el-checkbox-group v-if="p1.type==2" v-model="p1.ischks" @change="ischk">
              <el-checkbox v-for="p2 in p1.values" :label="p2.valuech" :key="p2.id"></el-checkbox>
            </el-checkbox-group>

            <el-select  placeholder="请选择" v-if="p1.type==3">
              <el-option
                v-for="p2 in p1.values"
                :key="p2.id"
                :label="p2.valuech"
                :value="p2.id">
              </el-option>
            </el-select>

          </el-form-item>
        </el-form-item>

        <el-form-item label="商品参数" v-if="proData.length>0">
          <el-form-item v-for="p1 in proData" :key="p1.id" :label="p1.namech">

            <el-input v-if="p1.type==0"></el-input>

            <el-radio-group v-if="p1.type==1" v-model="ooo">
              <el-radio v-for="p2 in p1.values" :label="p2.valuech" :key="p2.id" ></el-radio>
            </el-radio-group>

            <el-checkbox-group v-if="p1.type==2" v-model="lpl">
              <el-checkbox v-for="p2 in p1.values" :label="p2.valuech" :key="p2.id"></el-checkbox>
            </el-checkbox-group>

            <el-select  placeholder="请选择" v-model="lol" v-if="p1.type==3">
              <el-option
                v-for="p2 in p1.values"
                :key="p2.id"
                :label="p2.valuech"
                :value="p2.id">
              </el-option>
            </el-select>

          </el-form-item>
        </el-form-item>

        <el-form-item align="center">
          <el-button type="primary" @click="rollback">上一步</el-button>
          <el-button type="primary" @click="next">下一步</el-button>
          <el-button type="primary" @click="addGoods">提交</el-button>
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
        ooo:"",
        active: 0,
        lpl:[],
        lol:[],
        formGoodsAdd2:{
          typeid:"",
          goodsid:""
        },
        formGoodsAdd:{
          name:"",
          title:"",
          brandid:"",
          productdecs:"",
          price:"",
          stocks:"",
          sortnum:"",
          typeid:"",
          imgpath:""
        },
        brandData:[],
        tiaoZhuan:1,
        nextshow:true,
        lastshow:true,
        pvDivProid:"",
        protypes:[],
        protype:[],
        proTypeName:"",
        proData:[],
        skuData:[],
        chkyos:false,
        arr:[],
        arr1:[],
        arr2:[],
        arr3:[],
        cols:[]
      }
    },
    methods:{
      next:function () {
        this.active++;
        this.tiaoZhuan+=1;

      },
      rollback:function () {
        this.active--;
        this.tiaoZhuan-=1;

      },
      uploadGoods:function (response,imgpath,images) {
        this.formGoodsAdd.imgpath=response.data;
      },
      chaBrand:function (page) {
        this.$axios.post("http://localhost:8080/api/type/chaBrand?page=" + page + "&limit=" + 1000).then(dd => {
          this.brandData = dd.data.data.data;
        }).catch(function () {
          alert("erer")
        })
      },
      chatype:function () {
        this.$axios.get("http://localhost:8080/api/type/getData").then(dd=>{
          this.protype=dd.data.data;
          this.getChildType();
          for (let i = 0; i <this.protypes.length ; i++) {
            this.proTypeName="";
            this.pushptName(this.protypes[i]);
            var qwerdf=this.proTypeName.split("/").reverse().join("/");
            this.protypes[i].name=qwerdf.substr(0,qwerdf.length-1);
          }
        }).catch(function () {
          alert("error")
        })
      },
      pushptName:function(node){
        if (node.id!=0){
          this.proTypeName+="/"+node.name;
          for (let i = 0; i <this.protype.length ; i++) {
            if (node.pid==this.protype[i].id) {
              this.pushptName(this.protype[i]);
              break;
            }
          }
        }else {
          this.proTypeName+="/"+node.name;
        }

      },
      getChildType:function(){
        for (let i = 0; i <this.protype.length ; i++) {
          var node=this.protype[i];
          this.isChildNode(node)
        }
      },
      isChildNode:function(node){
        var tof=true;
        for (let i = 0; i < this.protype.length; i++) {
          if (node.id==this.protype[i].pid) {
            tof=false;
            break;
          }
        }
        if (tof==true){
          this.protypes.push(node);
        }
      },
      chaProByTypeid:function (typeid) {
        this.$axios.post("http://localhost:8080/api/type/chaProByTypeid?typeid="+typeid).then(dd=>{
          this.chkyos=false,
          this.proData=[];
          this.skuData=[];
          var prodatas=dd.data.data;
          if (prodatas.length>0){
            for (let i = 0; i <prodatas.length ; i++) {
              if (prodatas[i].issku==1){
                if (prodatas[i].type!=0){
                  this.$axios.post("http://localhost:8080/api/type/chaProValue?proid="+prodatas[i].id).then(dd=>{
                    prodatas[i].values=dd.data.data;
                    prodatas[i].ischks=[];
                    this.skuData.push(prodatas[i])
                  })
                }else {
                  prodatas[i].ischks=[];
                  this.skuData.push(prodatas[i])
                }

                  }else {
                    if (prodatas[i].type!=0) {
                      this.$axios.post("http://localhost:8080/api/type/chaProValue?proid="+prodatas[i].id).then(dd=>{
                        prodatas[i].values=dd.data.data;
                        this.proData.push(prodatas[i]);
                      })
                    }else {
                      this.proData.push(prodatas[i]);
                    }

                }
              }
          }else {
            this.proData=[];
            this.skuData=[];
          }
        }).catch(function () {
          alert("error")
        })
      },
      ischk:function () {
        this.arr=[];
        this.cols=[];
       var qwer=true;
        for (let i = 0; i <this.skuData.length ; i++) {

          this.cols.push({"id":this.skuData[i].id,"nameCH":this.skuData[i].nameCH,"name":this.skuData[i].name});

          if (this.skuData[i].ischks.length==0){
            qwer=false;
            break;
          }
        }console.log(this.cols)
        this.chkyos=qwer;
        if (this.chkyos==true){
            this.arr=[];
            this.arr1=[];
            this.arr2=[];
            this.arr3=[];
          for (let i = 0; i <this.skuData.length ; i++) {
            this.arr.push(this.skuData[i].ischks);
          }
          this.arr1=this.doDcl(this.arr);
          for (let i = 0; i <this.arr1.length ; i++) {
            let  tableValue={};
            for (let j = 0; j <this.arr1[i].length ; j++) {
              let key=this.cols[j].name;
              tableValue[key]=this.arr1[i][j];
              //var opop='"'+this.arr1[i][j]+'"'
              //this.arr3.push(JSON.parse("{"+'"z'+i+j+'"'+':'+opop+"}"))
              //console.log('"z'+i+j+'"')
                //this.arr2.push('z'+i+j+'');
            }
            this.arr3.push(tableValue);
          }
        }

      },
      doDcl:function (arr) {
        //笛卡尔积
        var twodDscartes = function (a, b) {
          var ret = [];
          for (var i = 0; i < a.length; i++) {
            for (var j = 0; j < b.length; j++) {
              ret.push(ft(a[i], b[j]));
            }
          }
          return ret;
        }
        var ft = function (a, b) {
          if (!(a instanceof Array))
            a = [a];
          var ret = a.slice(0);
          ret.push(b);
          return ret;
        }
        //多个一起做笛卡尔积
        return (function (data) {
          var len = data.length;
          if (len == 0)
            return [];
          else if (len == 1)
            return data[0];
          else {
            var r = data[0];
            for (var i = 1; i < len; i++) {
              r = twodDscartes(r, data[i]);
            }
            return r;
          }
        })(arguments.length > 1 ? arguments : arguments[0]);
      },
      addGoods:function () {
        this.formGoodsAdd.typeid=this.formGoodsAdd2.typeid;
        var data=this.$qs.stringify(this.formGoodsAdd);
        this.$axios.post("http://localhost:8080/api/type/addGoods",data).then(dd=>{
          alert(dd.data.data);
        }).catch(function () {
          alert("error")
        })
      }
    },
    created:function(){
      this.chaBrand(1);
      this.chatype();
    }
  }
</script>

<style scoped>

</style>

