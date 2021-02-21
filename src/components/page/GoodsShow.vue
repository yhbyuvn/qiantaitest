<template>
    <div>
      <div>
        <el-form :inline="true" :model="tochaGoods" class="demo-form-inline">
          <el-form-item label="名字">
            <el-input v-model="tochaGoods.name"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="chaGoods(1)">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div>
        <el-table
          :data="GoodsData"
          border
          style="width: 100%">

          <el-table-column
            prop="id"
            label="序号"
            >
          </el-table-column>

          <el-table-column
            prop="name"
            label="名字"
            >
          </el-table-column>

          <el-table-column
            prop="title"
            label="标题"
            >
          </el-table-column>

          <el-table-column
            prop="brandid"
            label="品牌"
            :formatter="brandshow">
          </el-table-column>

          <el-table-column
            prop="imgpath"
            label="图片"
            >
            <template slot-scope="scope">
              <img height="50px" :src="scope.row.imgpath"/>
            </template>
          </el-table-column>

          <el-table-column
            prop="productdecs"
            label="简介"
            >
          </el-table-column>

          <el-table-column
            prop="price"
            label="价格"
            >
          </el-table-column>

          <el-table-column
            prop="stocks"
            label="存货"
           >
          </el-table-column>

          <el-table-column
            prop="typeid"
            label="类型"
            :formatter="proty"
            >
          </el-table-column>

          <el-table-column
            label="操作"
            width="180">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="toupGoods(scope.$index, scope.row)"
              >编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="delGoods(scope.$index, scope.row)">删除</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="toupGoodsValue(scope.$index, scope.row)">属性值编辑</el-button>
            </template>
          </el-table-column>

        </el-table>
        <el-pagination
          @size-change="sc"
          @current-change="cc"
          :page-sizes="sizes"
          :page-size="limit"
          layout="total, sizes, prev, pager, next, jumper"
          :total="count">
        </el-pagination>
      </div>

      <div>
        <el-dialog title="修改" :visible.sync="toupGoodsyc">
          <el-form ref="form" :model="formGoodsUp" label-width="80px">
            <el-form-item label="商品名称">
              <el-input v-model="formGoodsUp.name"></el-input>
            </el-form-item>
            <el-form-item label="商品标题">
              <el-input v-model="formGoodsUp.title"></el-input>
            </el-form-item>
            <el-form-item label="品牌" align="left">
              <el-select  v-model="formGoodsUp.brandid" placeholder="请选择">
                <el-option
                  v-for="item in brandData"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="商品介绍">
              <el-input type="textarea" v-model="formGoodsUp.productdecs"></el-input>
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
              <el-input v-model="formGoodsUp.price"></el-input>
            </el-form-item>

            <el-form-item label="库存">
              <el-input v-model="formGoodsUp.stocks"></el-input>
            </el-form-item>

            <el-form-item label="排序">
              <el-input v-model="formGoodsUp.sortnum"></el-input>
            </el-form-item>

          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="toupGoodsyc = false">取 消</el-button>
            <el-button type="primary" @click="upGoods">确 定</el-button>
          </div>
        </el-dialog>
      </div>

      <div>
        <el-dialog title="属性值编辑" :visible.sync="toupGoodsValueyc">
          <el-form ref="form" :model="formGoodsAdd2" label-width="80px">
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
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.storcks"></el-input>
                  </template>

                </el-table-column>
                <el-table-column
                  label="价格"
                  width="150">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.price"></el-input>
                  </template>
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

                <el-input v-if="p1.type==0" v-model="p1.ischks"></el-input>

                <el-radio-group v-if="p1.type==1" v-model="p1.ischks">
                  <el-radio v-for="p2 in p1.values" :label="p2.valuech" :key="p2.id" ></el-radio>
                </el-radio-group>

                <el-checkbox-group v-if="p1.type==2" v-model="p1.ischks">
                  <el-checkbox v-for="p2 in p1.values" :label="p2.valuech" :key="p2.id"></el-checkbox>
                </el-checkbox-group>

                <el-select  placeholder="请选择" v-model="p1.ischks" v-if="p1.type==3">
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
              <el-button type="primary" @click="upGoodsValue">提交</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
      </div>

    </div>
</template>

<script>
    export default {
        name: "GoodsShow",
      data(){
          return{
            sizes:[2,5,8],
            limit:2,
            count:0,
            page:1,
            GoodsData:[],
            protypes:[],
            protype:[],
            brandData:[],
            tochaGoods:{
              name:""
            },
            toupGoodsyc:false,
            toupGoodsValueyc:false,
            formGoodsUp:{
              id:"",
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
            formGoodsAdd2:{
              typeid:"",
              goodsid:""
            },
            proTypeName:"",
            proData:[],
            skuData:[],
            chkyos:false,
            arr:[],
            arr1:[],
            arr2:[],
            arr3:[],
            cols:[],
            formGoodsUps:{
              goodid:""
            }
          }
      },created:function () {
        this.chaGoods(1);
        this.chatype();
        this.chaBrand();
      },methods:{
        chaGoods:function (page) {
          var data=this.$qs.stringify(this.tochaGoods);
          this.$axios.post("http://localhost:8080/api/type/chaGoods?page="+page+"&limit="+this.limit,data).then(dd=>{
            this.GoodsData=dd.data.data.data;
            this.count=dd.data.data.count;
          }).catch(function () {
            alert("error")
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
        proty:function (e,r) {
          for (let i = 0; i <this.protype.length ; i++) {
            if (e.typeid==this.protype[i].id) {
              return this.protype[i].name;
            }
          }
        },chaBrand:function (page) {
          this.$axios.post("http://localhost:8080/api/type/chaBrand?page="+1+"&limit="+1000).then(dd=>{
            this.brandData=dd.data.data.data;
          }).catch(function () {
            alert("erer")
          })
        },
        brandshow:function (e,r) {
          for (let i = 0; i <this.brandData.length ; i++) {
            if (e.brandid==this.brandData[i].id){
              return this.brandData[i].name;
            }
          }
        },
        sc:function (limit) {
          this.limit=limit;
          this.chaGoods(1);
        },
        cc:function (page) {
          this.chaGoods(page);
        },
        toupGoods:function (index,row) {
          this.toupGoodsyc=true;
          this.formGoodsUp.id=row.id;
          this.formGoodsUp.name=row.name;
          this.formGoodsUp.title=row.title;
          this.formGoodsUp.brandid=row.brandid;
          this.formGoodsUp.productdecs=row.productdecs;
          this.formGoodsUp.price=row.price;
          this.formGoodsUp.stocks=row.stocks;
          this.formGoodsUp.sortnum=row.sortnum;
          this.formGoodsUp.typeid=row.typeid;
          this.formGoodsUp.imgpath=row.imgpath;
        },
        uploadGoods:function () {
          this.upform.imgpath=response.data;
        },
        upGoods:function () {
          var data=this.$qs.stringify(this.formGoodsUp);
          this.$axios.post("http://localhost:8080/api/type/upGoods",data).then(dd=>{
            alert("ok");
            this.toupGoodsyc=false;
            this.chaGoods(1);
          }).catch(function () {
            alert("error")
          })
        },
        delGoods:function (index,row) {
          this.$axios.delete("http://localhost:8080/api/type/delGoods?id="+row.id).then(dd=>{
            alert("ok");
            this.chaGoods(1);
          }).catch(function () {
            alert("error")
          })
        },

        toupGoodsValue:function (index,row) {
          this.toupGoodsValueyc=true;
          this.formGoodsUps.goodid=row.id;
          this.formGoodsAdd2.typeid=row.typeid;
          this.chaProByTypeid(this.formGoodsAdd2.typeid)
          this.chaProByTypeid2(this.formGoodsAdd2.typeid,row.id)
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
                      prodatas[i].ischks=[];
                      this.proData.push(prodatas[i]);
                    })
                  }else {
                    prodatas[i].ischks=[];
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
        chaProByTypeid2:function (typeid,goodid) {
          this.$axios.post("http://localhost:8080/api/type/chaGoodsValue?goodid="+goodid).then(dd=>{
            let datas=dd.data.data;
            this.$axios.post("http://localhost:8080/api/type/chaProByTypeid?typeid="+typeid).then(dd=>{
              this.chkyos=false,
                this.proData=[];
                this.skuData=[];
              var prodatas=dd.data.data;
              if (prodatas.length>0){
                for (let i = 0; i <prodatas.length ; i++) {
                  if (prodatas[i].issku==1){
                    if (prodatas[i].type!=0){
                      if (prodatas[i].type==2) {
                        if (this.getGoodskv(prodatas[i].name,datas)==""){
                          prodatas[i].ischks=[];
                        }else {
                          prodatas[i].ischks=this.getGoodskv(prodatas[i].name,datas);
                        }
                      }else {
                        prodatas[i].ischks=this.getGoodskv(prodatas[i].name,datas);
                      }
                      this.$axios.post("http://localhost:8080/api/type/chaProValue?proid="+prodatas[i].id).then(dd=>{
                        prodatas[i].values=dd.data.data;
                        prodatas[i].ischks=this.getGoodskv(prodatas[i].name,datas);
                        this.skuData.push(prodatas[i])
                      })
                    }else {
                      prodatas[i].ischks=this.getGoodskv(prodatas[i].name,datas);
                      this.skuData.push(prodatas[i])
                    }

                  }else {
                    if (prodatas[i].type!=0) {
                      //回显
                      if (prodatas[i].type==2) {
                        if (this.getGoodskv(prodatas[i].name,datas)==""){
                          prodatas[i].ischks=[];
                        }else {
                          prodatas[i].ischks=this.getGoodskv(prodatas[i].name,datas);
                        }
                      }else {
                          prodatas[i].ischks=this.getGoodskv(prodatas[i].name,datas);
                      }

                      this.$axios.post("http://localhost:8080/api/type/chaProValue?proid="+prodatas[i].id).then(dd=>{
                        prodatas[i].values=dd.data.data;
                        prodatas[i].ischks=this.getGoodskv(prodatas[i].name,datas);
                        this.proData.push(prodatas[i]);
                      })
                    }else {
                      prodatas[i].ischks=this.getGoodskv(prodatas[i].name,datas);
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
          }).catch(function () {
            alert(("error"))
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
          }
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
              if (typeof this.arr1[i]=="object"){
                for (let j = 0; j <this.arr1[i].length ; j++) {
                  let key=this.cols[j].name;
                  tableValue[key]=this.arr1[i][j];
                  //var opop='"'+this.arr1[i][j]+'"'
                  //this.arr3.push(JSON.parse("{"+'"z'+i+j+'"'+':'+opop+"}"))
                  //console.log('"z'+i+j+'"')
                  //this.arr2.push('z'+i+j+'');
                }
              } else {
                let key=this.cols[0].name;
                tableValue[key]=this.arr1[i];
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
        getGoodskv:function (key,data) {
          let arrvalue=[];
          for (let i = 0; i <data.length ; i++) {
            let objval=JSON.parse(data[i].goodvalue)
            if (objval[key]!=null){
              if (data[i].storcks!=null){
                if (arrvalue.indexOf(objval[key])==-1){
                  arrvalue.push(objval[key])
                }
              }else {
                return objval[key];
              }
            }
          }
          return arrvalue;
        },
        upGoodsValue:function () {
          this.formGoodsUps.typeid=this.formGoodsAdd2.typeid;
          let pros=[];
          for (let i = 0; i <this.proData.length ; i++) {
            let proda={};
            proda[this.proData[i].name]=this.proData[i].ischks;
            pros.push(proda);
          }
          this.formGoodsUps.pros=JSON.stringify(pros);
          this.formGoodsUps.sku=JSON.stringify(this.arr3);
          console.log(this.formGoodsUps)
          var data=this.$qs.stringify(this.formGoodsUps);
          this.$axios.post("http://localhost:8080/api/type/upGoodsValue",data).then(dd=>{
            alert("eee")
            this.toupGoodsValueyc=false;
          }).catch(function () {
            alert("error")
          })
          //console.log(this.arr3);
          //console.log(this.proData);

        }
        }

    }
</script>

<style scoped>

</style>
