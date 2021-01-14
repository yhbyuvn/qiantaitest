<template>
    <div>
      <el-tree
        :data="data"
        :props="dp"
        accordion
        show-checkbox
        :expand-on-click-node="false" >
        <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <span>
          <el-button
            type="text"
            size="mini"
            @click="() => append(data)">
            Append
          </el-button>
          <el-button
            type="text"
            size="mini"
            @click="() => remove(node, data)">
            Delete
          </el-button>
          <el-button
            type="text"
            size="mini"
            @click="() => update(node, data)">
            update
          </el-button>
        </span>
      </span>
      </el-tree>
      <el-dialog title="新增" :visible.sync="toadd">
        <el-form :model="addform">
          <el-form-item label="修改节点名称" >
            <el-input v-model="addform.pname" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="新增节点名称">
            <el-input v-model="addform.name" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="toadd = false">取 消</el-button>
          <el-button type="primary" @click="addType">确 定</el-button>
        </div>
      </el-dialog>
      <el-dialog title="修改" :visible.sync="toupType">
        <el-form :model="upform">
          <el-form-item label="修改节点名称" >
            <el-input v-model="upform.name" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="toupType = false">取 消</el-button>
          <el-button type="primary" @click="upType">确 定</el-button>
        </div>
      </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "Fenlei",
        data(){
          return{
            data:[],
            axdata:[],
            jsonst:"",
            dp:{},
            toadd:false,
            toupType:false,
          addform:{
              pname:"",
              name:"",
              pid:""
          },
            upform:{
              id:"",
              name:""
          }
          }
        },
      created:function () {
        this.$axios.get("http://localhost:8080/api/type/getData").then(dd=>{
          this.axdata=dd.data.data;
          this.chaType();
        }).catch(function () {
          alert("error")
        })
      },
      methods:{
        chaType:function () {
          for (let i = 0; i <this.axdata.length ; i++) {
            if (this.axdata[i].pid==0){
              this.dgNode(this.axdata[i]);
              break;
            }
          }
          this.data.push(JSON.parse(this.jsonst))
        },
        dgNode:function (node) {
          var isp=this.isParent(node);
          if (isp==true){
            this.jsonst+='{"id":'+node.id+',"label":"'+node.name+'","children":[';
            let count=0;
            for (let i = 0; i <this.axdata.length ; i++) {
              if (node.id==this.axdata[i].pid) {
                count++;
                this.dgNode(this.axdata[i]);
                this.jsonst+=",";
              }
            }
            if (count!=0){
              this.jsonst=this.jsonst.substr(0,this.jsonst.length-1);
            }
            this.jsonst+=']}';
          }else {
            this.jsonst+='{"id":'+node.id+',"label":"'+node.name+'"}';
          }

        },
        isParent:function (node) {
          for (let i = 0; i <this.axdata.length ; i++) {
              if (node.id==this.axdata[i].pid) {
                return true;
              }
          }
          return false;
        },
        append:function (data) {
          this.toadd=true;
          console.log(data)
          this.addform.pname=data.label;
          this.addform.pid=data.id;
        },
        addType:function () {
          var data=this.$qs.stringify({"pid":this.addform.pid,"name":this.addform.name})
          this.$axios.post("http://localhost:8080/api/type/add",data).then(dd=>{
            alert("ok");
            this.toadd=false;
            location.reload();
          }).catch(function () {
            alert("err")
          })
        },
        update:function (data) {
          this.toupType=true;
          console.log(data.data.id)
          this.upform.id=data.data.id;
          this.upform.name=data.label;
        },
        upType:function () {
      var data=this.$qs.stringify({"id":this.upform.id,"name":this.upform.name,"isdel":0})
      this.$axios.post("http://localhost:8080/api/type/update",data).then(dd=>{
        alert("ok");
        this.toupType=false;
        location.reload();
      }).catch(function () {
        alert("err")
      })
    },
        remove:function (data) {
          console.log(data.label)
          console.log(data.data.id)
          var data=this.$qs.stringify({"id":data.data.id,"name":data.label,"isdel":1});
          this.$axios.post("http://localhost:8080/api/type/update",data).then(dd=>{
            alert("ok");
            this.toupType=false;
            location.reload();
          }).catch(function () {
            alert("err")
          })

        }
      }
    }
</script>

<style scoped>

</style>
