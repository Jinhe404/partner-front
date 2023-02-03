<template>
  <div style="height: 100vh;overflow: hidden;background-image: linear-gradient(to right, #fa709a 0%, #fee140 100%); position: relative;background-color: #eee">
    <div class="form-box">
      <el-form ref="ruleFormRef"  :model="form" :rules="rules" status-icon>
        <h2 style="text-align: center;">注 册</h2>
        <el-form-item prop="username">
          <el-input v-model="form.username"  placeholder="请输入账号" :prefix-icon="User"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="form.password" show-password  placeholder="请输入密码" :prefix-icon="Lock"
                    autocomplete="new-password"></el-input>
        </el-form-item>
        <el-form-item prop="confirm">
          <el-input v-model="form.confirm" show-password  placeholder="请确认密码" :prefix-icon="Lock"
                    autocomplete="new-password"></el-input>
        </el-form-item>
        <div style="margin-bottom: 0.83em">
          <el-button style="width: 100%" type="primary" @click="login">注册</el-button>
        </div>
        <div style="text-align: right">
          <el-button type="primary" link @click="router.push('/login')">已有账号! 请登录</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import {reactive, ref} from "vue";
import router from "../router";
const form = reactive({})
// import { FormInstance, FormRules } from 'element-plus'
import {User ,Lock} from '@element-plus/icons-vue'
import request from "../utils/request";
import {ElMessage} from "element-plus";
import {useUserStore} from "../stores/user";

const ruleFormRef = ref()


const confirmPassword = (rule,value,callback) => {
  if (value === '') {
    callback(new Error('请确认密码'))
  }
  if (form.password !== value){
    callback(new Error('两次输入的密码不一致'))
  }
  callback()
}

const rules = reactive({
  username: [
    {required: true, message: '请输入账号', trigger: 'blur'},
  ],
  password: [
    {required: true, message: '请输入密码', trigger: 'blur'},
  ],
  confirm: [
    {validator: confirmPassword, trigger: 'blur'},
  ],
})
const store = useUserStore()
const login = () => {
  console.log(ruleFormRef)
  ruleFormRef.value.validate(valid =>{
    // 当 valid === true 就可以调用登录接口
    if (valid){
      request.post("/login",form).then(res => {
        console.log(res)
        if (res.code === '200'){
          // store.$patch({user:res.data})   // res.data 是后台返回的用户数据，存储到缓存里面
          store.setUser(res.data)
          ElMessage.success("登录成功")
          router.push('/')
        }else {
          ElMessage.error(res.msg)
        }
      })
    }

  })
}
console.log(store.user)
</script>

<style scoped>
.form-box{
  width: 300px;
  border-radius: 10px;
  margin: 0 auto;
  box-shadow: 0 0 10px -2px rgba(0,0,0,.5);
  background-image: linear-gradient(to top, #fbc2eb 0%, #a6c1ee 100%);
  padding: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
}
</style>