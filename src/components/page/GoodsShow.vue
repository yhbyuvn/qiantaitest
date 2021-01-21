<template>
    <div>
      <div>
        <el-table
          :data="GoodsData"
          border
          style="width: 100%">

          <el-table-column
            prop="id"
            label="序号"
            width="180">
          </el-table-column>

          <el-table-column
            prop="name"
            label="名字"
            width="180">
          </el-table-column>

          <el-table-column
            prop="title"
            label="标题"
            width="180">
          </el-table-column>

          <el-table-column
            prop="brandid"
            label="品牌"
            width="180"
            :formatter="brandshow">
          </el-table-column>

          <el-table-column
            prop="imgpath"
            label="图片"
            width="180">
            <template slot-scope="scope">
              <img height="50px" :src="scope.row.imgpath"/>
            </template>
          </el-table-column>

          <el-table-column
            prop="productdecs"
            label="简介"
            width="180">
          </el-table-column>

          <el-table-column
            prop="price"
            label="价格"
            width="180">
          </el-table-column>

          <el-table-column
            prop="stocks"
            label="存货"
            width="180">
          </el-table-column>

          <el-table-column
            prop="typeid"
            label="类型"
            :formatter="proty"
            width="180">
          </el-table-column>

          <el-table-column
            label="操作"
            width="180">
            <template slot-scope="scope">
              <el-button
                size="mini"

              >编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                >删除</el-button>
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
            brandData:[]
          }
      },created:function () {
        this.chaGoods(1);
        this.chatype();
        this.chaBrand();
      },methods:{
        chaGoods:function (page) {
          this.$axios.post("http://localhost:8080/api/type/chaGoods?page="+page+"&limit="+this.limit).then(dd=>{
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
        }
      }
    }
</script>

<style scoped>

</style>
