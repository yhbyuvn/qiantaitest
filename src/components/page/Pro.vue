<template>
    <div>

      <div>
        <el-dialog title="属性值表" :visible.sync="todoProValue">
          <el-table
            :data="proValueData"
            border
            style="width: 100%">

            <el-table-column
              prop="id"
              label="序号"
              width="150">
            </el-table-column>

            <el-table-column
              prop="value"
              label="属性值名"
              width="150">
            </el-table-column>

            <el-table-column
              prop="valuech"
              label="属性值中文名"
              width="150">
            </el-table-column>

            <el-table-column
              prop="proid"
              label="属性id"
              width="150">
            </el-table-column>

            <el-table-column
              label="操作"
              width="200">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="gotoupProVal(scope.$index, scope.row)"
                >编辑</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="delProVal(scope.$index, scope.row)"
                >删除</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="gotoaddProVal(scope.$index, scope.row)"
                >新增</el-button>
              </template>
            </el-table-column>

          </el-table>
        </el-dialog>

      </div>


      <div>
        <el-dialog title="属性值新增" :visible.sync="toaddProVal">
          <el-form :model="addPvform">
            <el-form-item label="属性值名称" >
              <el-input v-model="addPvform.value" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="属性值中文名称" >
              <el-input v-model="addPvform.valuech" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="toaddProVal = false">取 消</el-button>
            <el-button type="primary" @click="addProVal">确 定</el-button>
          </div>
        </el-dialog>
      </div>


      <div>
        <el-dialog title="属性值修改" :visible.sync="toupProVal">
          <el-form :model="upPvform">
            <el-form-item label="属性值名称" >
              <el-input v-model="upPvform.value" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="属性值中文名称" >
              <el-input v-model="upPvform.valuech" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="toupProVal = false">取 消</el-button>
            <el-button type="primary" @click="upProVal">确 定</el-button>
          </div>
        </el-dialog>
      </div>



      <div>
        <el-dialog title="新增" :visible.sync="toaddPro">
          <el-form :model="addform">
            <el-form-item label="名称" >
              <el-input v-model="addform.name" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item label="中文名称" >
              <el-input v-model="addform.namech" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item label="类型" >
              <el-select v-model="addform.typeid" placeholder="请选择">
                <el-option
                  v-for="item in protype"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="输入类型" >
              <el-radio-group v-model="addform.type">
                <el-radio :label="0">输入框</el-radio>
                <el-radio :label="1">单选框</el-radio>
                <el-radio :label="2">多选框</el-radio>
                <el-radio :label="3">下拉框</el-radio>
              </el-radio-group>
            </el-form-item>

          <el-form-item label="是否为sku属性" >
              <el-radio-group v-model="addform.issku">
                <el-radio :label="0">否</el-radio>
                <el-radio :label="1">是</el-radio>
              </el-radio-group>
            </el-form-item>

          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="toaddPro = false">取 消</el-button>
            <el-button type="primary" @click="addPro">确 定</el-button>
          </div>
        </el-dialog>
      </div>

      <div>
        <el-dialog title="修改" :visible.sync="toupProb">
          <el-form :model="upform">
            <el-form-item label="名称" >
              <el-input v-model="upform.name" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item label="中文名称" >
              <el-input v-model="upform.namech" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item label="类型" >
              <el-select v-model="upform.typeid" placeholder="请选择">
                <el-option
                  v-for="item in protype"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>


            <el-form-item label="输入类型" >
              <el-radio-group v-model="upform.type">
                <el-radio :label="0">输入框</el-radio>
                <el-radio :label="1">单选框</el-radio>
                <el-radio :label="2">多选框</el-radio>
                <el-radio :label="3">下拉框</el-radio>
              </el-radio-group>
            </el-form-item>

          <el-form-item label="是否为sku属性" >
              <el-radio-group v-model="upform.issku">
                <el-radio :label="0">否</el-radio>
                <el-radio :label="1">是</el-radio>
              </el-radio-group>
            </el-form-item>

          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="toupProb = false">取 消</el-button>
            <el-button type="primary" @click="upPro">确 定</el-button>
          </div>
        </el-dialog>
      </div>


        <div>
          <el-form :inline="true" :model="tochaPro" class="demo-form-inline">
            <el-form-item label="名字">
              <el-input v-model="tochaPro.name"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="chaPro(1)">查询</el-button>
              <el-button type="primary" @click="toaddPro=true" >新增</el-button>
            </el-form-item>
          </el-form>
        </div>

        <div>
          <el-table
            :data="proData"
            border
            style="width: 100%">

            <el-table-column
              prop="id"
              label="序号"
              width="150">
            </el-table-column>

            <el-table-column
              prop="name"
              label="属性名"
              width="150">
            </el-table-column>

            <el-table-column
              prop="namech"
              label="属性中文名"
              width="150">
            </el-table-column>

            <el-table-column
              prop="typeid"
              label="类型id"
              :formatter="typeproh"
              width="150">
            </el-table-column>

            <el-table-column
              prop="type"
              label="类型"
              :formatter="inputType"
              width="150">
            </el-table-column>

            <el-table-column
              prop="issku"
              label="是否为sku属性"
              :formatter="skuyos"
              width="150">
            </el-table-column>

            <el-table-column
              label="操作"
              width="300">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="toupPro(scope.$index, scope.row)"
                >编辑</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="delPro(scope.$index, scope.row)"
                  >删除</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="doProValue(scope.$index, scope.row)"
                  >属性值操作</el-button>
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
        name: "Pro",
        data(){
          return{
            toaddPro:false,
            proData:[],
            tochaPro:{
              name:""
            },
            count:0,
            sizes:[2,5,8],
            limit:2,
            page:1,
            protype:[],
            addform:{
              name:"",
              namech:"",
              typeid:"请选择",
              type:"",
              issku:""
            },
            upform:{
              name:"",
              namech:"",
              typeid:"请选择",
              type:"",
              issku:"",
              isdel:0
            },
            toupProb:false,
            todoProValue:false,
            toaddProVal:false,
            toupProVal:false,
            proValueData:[],
            addPvform:{
              value:"",
              valuech:"",
              proid:"",
              isdel:0
            },
            upPvform:{
              value:"",
              valuech:"",
              proid:"",
              isdel:0,
              id:""
            }
          }

        },
      created:function () {
        this.chaPro(1);
        this.chatype();
      },
      methods:{
        chaPro:function (page) {
          var data=this.$qs.stringify(this.tochaPro);
          this.$axios.post("http://localhost:8080/api/type/chaPro?page="+page+"&limit="+this.limit,data).then(dd=>{
            this.proData=dd.data.data.data;
            this.count=dd.data.data.count;
          }).catch(function () {
            alert("erer")
          })
        },
        sc:function (limit) {
          this.limit=limit;
          this.chaPro(1);
        },
        cc:function (page) {
          this.chaPro(page);
        },
        chatype:function () {
          this.$axios.get("http://localhost:8080/api/type/getData").then(dd=>{
            this.protype=dd.data.data;
          }).catch(function () {
            alert("error")
          })
        },
        typeproh:function (e,r) {

          for (let i = 0; i <this.protype.length ; i++) {
            if (e.typeid==this.protype[i].id) {
              return this.protype[i].name;
            }
          }

        },
        inputType:function (e,r) {
          if (e.type==0){
            return "输入框";
          }  if (e.type==1){
            return "单选框";
          }  if (e.type==2){
            return "多选框";
          }  if (e.type==3){
            return "下拉框";
          }
        },
        skuyos:function (e,r) {
          if (e.issku==0){
            return "否"
          } if (e.issku==1){
            return "是"
          }
        },
        addPro:function () {
          var data=this.$qs.stringify(this.addform);
          this.$axios.post("http://localhost:8080/api/type/addPro",data).then(dd=>{
            alert("ok");
            location.reload();
            this.toaddPro=false;
            this.addform={
              name:"",
              namech:"",
              typeid:"请选择",
              type:"",
              issku:""
            }
          }).catch(function () {
            alert("err")
          })
        },
        toupPro:function (index,row) {
          this.toupProb=true;
          this.upform.id=row.id;
          this.upform.name=row.name;
          this.upform.namech=row.namech;
          this.upform.typeid=row.typeid;
          this.upform.type=row.type;
          this.upform.issku=row.issku;
        },
        upPro:function () {
          var data=this.$qs.stringify(this.upform);
          this.$axios.post("http://localhost:8080/api/type/upPro",data).then(dd=>{
            alert("ok");
            location.reload();
            this.toupProb=false;
          }).catch(function () {
            alert("err")
          })
        },
        delPro:function (index,row) {
          this.upform.id=row.id;
          this.upform.name=row.name;
          this.upform.namech=row.namech;
          this.upform.typeid=row.typeid;
          this.upform.type=row.type;
          this.upform.issku=row.issku;
          this.upform.isdel=1;
          var data=this.$qs.stringify(this.upform);
          this.$axios.post("http://localhost:8080/api/type/upPro",data).then(dd=>{
            alert("ok");
            location.reload();
          }).catch(function () {
            alert("err")
          })
        },
        doProValue:function (index,row) {
          console.log(row.id)
          this.todoProValue=true;
          this.$axios.post("http://localhost:8080/api/type/chaProValue?proid="+row.id).then(dd=>{
            this.proValueData=dd.data.data;
          }).catch(function () {
            alert("erer")
          })
        },
        gotoaddProVal:function(index,row){
          this.toaddProVal=true;
          this.addPvform.proid=row.proid;
        },
        gotoupProVal:function(index,row){
          this.toupProVal=true;
          this.upPvform.proid=row.proid;
          this.upPvform.value=row.value;
          this.upPvform.valuech=row.valuech;
          this.upPvform.id=row.id;
        },
        addProVal:function () {
          var data=this.$qs.stringify(this.addPvform);
          this.$axios.post("http://localhost:8080/api/type/addProValue",data).then(dd=>{
            this.toaddProVal=false;
          }).catch(function () {
            alert("erer")
          })
        },
        upProVal:function () {
          var data=this.$qs.stringify(this.upPvform);
          this.$axios.post("http://localhost:8080/api/type/upProValue",data).then(dd=>{
            this.toupProVal=false;
          }).catch(function () {
            alert("erer")
          })
        },

      }
    }
</script>

<style scoped>

</style>
