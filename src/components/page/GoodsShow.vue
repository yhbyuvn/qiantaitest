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
            width="180">
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
      </div>
    </div>
</template>

<script>
    export default {
        name: "GoodsShow",
      data(){
          return{
            GoodsData:[]
          }
      },created:function () {
        this.chaGoods();
      },methods:{
        chaGoods:function () {
          this.$axios.post("http://localhost:8080/api/type/chaGoods?page=1&limit=2").then(dd=>{
            this.GoodsData=dd.data.data.data;
          }).catch(function () {
            alert("error")
          })
        }
      }
    }
</script>

<style scoped>

</style>
