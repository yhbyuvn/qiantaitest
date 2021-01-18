<template>
    <div>

      <div>
        <el-form :inline="true" :model="tochaBrand" class="demo-form-inline">
          <el-form-item label="名字">
            <el-input v-model="tochaBrand.name"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="chaBrand(1)">查询</el-button>
            <el-button type="primary" @click="toaddBrand=true">新增</el-button>
          </el-form-item>
        </el-form>
      </div>

      <div>
        <el-dialog title="新增" :visible.sync="toaddBrand">
          <el-form :model="addform" :rules="addBrandRules">
            <el-form-item label="名称" prop="name">
              <el-input v-model="addform.name" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item label="顺序" prop="ord">
              <el-input v-model.number="addform.ord" autocomplete="off"></el-input>
            </el-form-item>

            <el-upload
              class="upload-demo"
              action="http://localhost:8080/api/type/upload"
              name="imgpath"
              :on-success="uploadBr"
              list-type="picture">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>

            <el-form-item label="简介" >
              <el-input
                type="textarea"
                maxlength="50"
                show-word-limit
                :rows="2"
                placeholder="请输入内容"
                v-model="addform.banddesc">
              </el-input>

            </el-form-item>

          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="toaddBrand = false">取 消</el-button>
            <el-button type="primary" @click="addBrand">确 定</el-button>
          </div>
        </el-dialog>
      </div>
      <div>
        <el-dialog title="修改" :visible.sync="toupBrandyc">
          <el-form :model="upform">
            <el-form-item label="名称" >
              <el-input v-model="upform.name" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item label="顺序" >
              <el-input v-model="upform.ord" autocomplete="off"></el-input>
            </el-form-item>

            <el-upload
              class="upload-demo"
              action="http://localhost:8080/api/type/upload"
              name="imgpath"
              :on-success="uploadBrup"
              list-type="picture">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>

            <el-form-item label="简介" >
              <el-input
                type="textarea"
                maxlength="50"
                show-word-limit
                :rows="2"
                placeholder="请输入内容"
                v-model="upform.banddesc">
              </el-input>

            </el-form-item>

          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="toupBrandyc = false">取 消</el-button>
            <el-button type="primary" @click="upBrand">确 定</el-button>
          </div>
        </el-dialog>
      </div>

      <el-table
        :data="brandData"
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
          prop="bande"
          label="首字母"
          width="180">
        </el-table-column>

        <el-table-column
          prop="ord"
          label="排序"
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
          prop="banddesc"
          label="简介"
          width="180">
        </el-table-column>

        <el-table-column
          label="操作"
          width="180">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="toupBrand(scope.$index, scope.row)"
            >编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="delBrand(scope.$index, scope.row)">删除</el-button>
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
</template>

<script>
    export default {
        name: "Brand",
        data(){
          return{
            brandData:[],
            sizes:[2,5,8],
            count:0,
            limit:2,
            page:1,
            toaddBrand:false,
            toupBrandyc:false,
            tochaBrand:{
              name:""
            },
            addform:{
              name:"",
              imgpath:"",
              banddesc:"",
              bande:"",
              ord:0
            },
            upform:{
              id:"",
              name:"",
              imgpath:"",
              banddesc:"",
              bande:"",
              isdel:0,
              ord:0
            },
            addBrandRules:{
              name:[
                { required: true, message: '请输入名称', trigger: 'blur' },
                { min: 2, max: 15, message: '长度在 2 到 15 个字符', trigger: 'blur' }
              ],
              ord:[
                { required: true, message: '顺序值不能为空'},
                { type: 'number', message: '必须为数字值'}
              ]
            }
          }
        },
      created:function () {
          this.chaBrand(1);
      },
      methods:{
        chaBrand:function (page) {
          var data=this.$qs.stringify(this.tochaBrand);
          this.$axios.post("http://localhost:8080/api/type/chaBrand?page="+page+"&limit="+this.limit,data).then(dd=>{
            this.brandData=dd.data.data.data;
            this.count=dd.data.data.count;
          }).catch(function () {
            alert("erer")
          })
        },
        sc:function (limit) {
          this.limit=limit;
          this.chaBrand(1);
        },
        cc:function (page) {
          this.chaBrand(page);
        },
        uploadBr:function (response,imgpath,images) {
          this.addform.imgpath=response.data;
        },
        uploadBrup:function (response,imgpath,images) {
          this.upform.imgpath=response.data;
        },
        addBrand:function () {
          this.addform.bande=this.addform.name.substr(0,1);
          var data=this.$qs.stringify(this.addform);
          this.$axios.post("http://localhost:8080/api/type/addBrand",data).then(dd=>{
            alert("ok");
            this.addform={
              name:"",
              imgpath:"",
              banddesc:"",
              bande:"",
              ord:0
            }
            location.reload();
            this.toaddBrand=false;
          }).catch(function () {
            alert("err")
          })
        },
      toupBrand:function (index,row) {
        this.toupBrandyc=true;
        console.log(row);
        this.upform.id=row.id;
        this.upform.banddesc=row.banddesc;
        this.upform.name=row.name;
        this.upform.imgpath=row.imgpath;
        this.upform.ord=row.ord;
      },
        upBrand:function () {
          this.upform.bande=this.upform.name.substr(0,1);
          var data=this.$qs.stringify(this.upform);
          this.$axios.post("http://localhost:8080/api/type/upBrand",data).then(dd=>{
            alert("ok");
            location.reload();
            this.toupBrandyc=false;
          }).catch(function () {
            alert("err")
          })
        },
        delBrand:function (index,row) {
          this.upform.id=row.id;
          this.upform.banddesc=row.banddesc;
          this.upform.name=row.name;
          this.upform.imgpath=row.imgpath;
          this.upform.bande=row.bande;
          this.upform.isdel=1;
          this.upform.ord=row.ord;
          var data=this.$qs.stringify(this.upform);
          this.$axios.post("http://localhost:8080/api/type/upBrand",data).then(dd=>{
            alert("ok");
            location.reload();
            this.toupBrandyc=false;
          }).catch(function () {
            alert("err")
          })
        }
      }
    }
</script>

<style scoped>

</style>
