<template>
    <div>

      <div>
        <el-dialog :title="pvDivName" :visible.sync="todoProValue">
          <el-button type="primary" @click="gotoaddProVal" >新增</el-button>
          <el-table
            v-if="!toaddProVal"
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
              :formatter="pvpro"
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
              </template>
            </el-table-column>

          </el-table>

          <div v-if="toaddProVal">
            <el-form :model="addPvform"  :rules="ptrules">
              <el-form-item label="属性" >
                <el-input v-model="addPvform.pvname" autocomplete="off" disabled></el-input>
              </el-form-item>
              <el-form-item label="属性值名称" prop="value">
                <el-input v-model="addPvform.value" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="属性值中文名称" prop="valuech">
                <el-input v-model="addPvform.valuech" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="toaddProVal = false">取 消</el-button>
              <el-button type="primary" @click="addProVal">确 定</el-button>
            </div>
          </div>


        </el-dialog>

      </div>




      <div>
        <el-dialog title="属性值修改" :visible.sync="toupProVal">
          <el-form :model="upPvform">
            <el-form-item label="属性" >
              <el-input v-model="upPvform.pvname" autocomplete="off" disabled></el-input>
            </el-form-item>
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
          <el-form :model="addform" :rules="addProRules">
            <el-form-item label="名称" prop="name">
              <el-input v-model="addform.name" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item label="中文名称" prop="namech">
              <el-input v-model="addform.namech" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item label="类型" >
              <el-select v-model="addform.typeid" placeholder="请选择">
                <el-option
                  v-for="item in protypes"
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
                  v-for="item in protypes"
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
              <el-button type="primary" @click="gotoaddPro" >新增</el-button>
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
                  v-if="scope.row.type!=0"
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
          var checkValue = (rule, value, callback) => {
            if (/^[a-zA-Z]+$/.test(value)) {
              callback();
            }else {
              callback(new Error('只能输入英文字母'));
            }
          };
          var checkValuech = (rule, value, callback) => {
            if (/^[\u4e00-\u9fa5]+$/i.test(value)) {
              callback();
            }else {
              callback(new Error('只能输入汉字'));
            }
          };
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
              isdel:0,
              pvname:""
            },
            upPvform:{
              value:"",
              valuech:"",
              proid:"",
              isdel:0,
              id:"",
              pvname:""
            },
            pvDivName:"",
            addProRules:{
              name:[
                { required: true, message: '请输入名称', trigger: 'blur' },
                { min: 2, max: 15, message: '长度在 2 到 15 个字符', trigger: 'blur' }
              ],
              namech:[
                { required: true, message: '请输入中文名称', trigger: 'blur' },
                { min: 2, max: 15, message: '长度在 2 到 15 个字符', trigger: 'blur' }
              ]
            },
            ptrules:{
              value:[
                { required: true, message: '请输入', trigger: 'blur' },
              ],
              valuech:[
                { required: true, message: '请输入', trigger: 'blur' },
              ]
            },
            pvDivProid:"",
            protypes:[],
            proTypeName:""
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
        typeproh:function (e,r) {

          for (let i = 0; i <this.protype.length ; i++) {
            if (e.typeid==this.protype[i].id) {
              return this.protype[i].name;
            }
          }

        },
        pvpro:function(e,r){
          var da=this;
          for (let i = 0; i <this.proData.length ; i++) {
            if (e.proid==this.proData[i].id) {
              for (let j = 0; j <da.protype.length ; j++) {
                if (this.proData[i].typeid==da.protype[j].id) {
                  return da.protype[j].name;
                }
              }
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
          this.todoProValue=true;

          this.pvDivName=row.name+"的相关操作";
          this.pvDivProid=row.id;
          this.gotochaPv(this.pvDivProid);
        },
        gotochaPv:function(proid){
          this.$axios.post("http://localhost:8080/api/type/chaProValue?proid="+proid).then(dd=>{
            this.proValueData=dd.data.data;
          }).catch(function () {
            alert("erer")
          })
        },
        gotoaddProVal:function(){
          var th=this;
          this.toaddProVal=true;
          this.addPvform={
            value:"",
              valuech:"",
              proid:"",
              isdel:0,
              pvname:""
          }
          this.addPvform.proid=this.pvDivProid;
          for (let i = 0; i <th.proData.length ; i++) {
            if (this.pvDivProid==th.proData[i].id) {
              this.addPvform.pvname=th.proData[i].namech;
            }
          }
        },
        gotoupProVal:function(index,row){
          var th=this;
          this.toupProVal=true;
          this.upPvform.proid=row.proid;
          this.upPvform.value=row.value;
          this.upPvform.valuech=row.valuech;
          this.upPvform.id=row.id;
          for (let i = 0; i <th.proData.length ; i++) {
            if (row.proid==th.proData[i].id) {
              this.upPvform.pvname=th.proData[i].namech;
            }
          }
        },
        addProVal:function () {
          var data=this.$qs.stringify(this.addPvform);
          this.$axios.post("http://localhost:8080/api/type/addProValue",data).then(dd=>{
            this.toaddProVal=false;
            this.gotochaPv(this.pvDivProid);
            this.addPvform={
              value:"",
                valuech:"",
                proid:"",
                isdel:0,
                pvname:""
            }
          }).catch(function () {
            alert("erer")
          })
        },
        upProVal:function () {
          var data=this.$qs.stringify(this.upPvform);
          this.$axios.post("http://localhost:8080/api/type/upProValue",data).then(dd=>{
            this.toupProVal=false;
            this.gotochaPv(this.pvDivProid);
          }).catch(function () {
            alert("erer")
          })
        },
        delProVal:function (index,row) {
          this.upPvform.proid=row.proid;
          this.upPvform.value=row.value;
          this.upPvform.valuech=row.valuech;
          this.upPvform.id=row.id;
          this.upPvform.isdel=1;
          var data=this.$qs.stringify(this.upPvform);
          this.$axios.post("http://localhost:8080/api/type/upProValue",data).then(dd=>{
            alert("ok");
            this.gotochaPv(this.pvDivProid);
          }).catch(function () {
            alert("erer")
          })
        },
        gotoaddPro:function () {
          this.toaddPro=true;
          this.addform={
            name:"",
            namech:"",
            typeid:"请选择",
            type:"",
            issku:""
          }
        }
      }
    }
</script>

<style scoped>

</style>
