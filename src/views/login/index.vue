<template>
  <div class="login">
    <el-form class="login-form" ref="form" :model="form" :rules="rules" label-width="80px" label-position="top">
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button :loading="loading" class="login-btn" type="primary" @click="onSubmit">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Form } from 'element-ui'
import { login } from '@/services/user'

export default Vue.extend({
  name: 'LoginIndex',
  data () {
    return {
      loading: false,
      form: {
        // 手机号
        phone: '18201288771',
        // 密码
        password: '111111'
      },
      // 表单验证规则
      rules: {
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^1\d{10}$/, message: '请输入合法手机号', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    }
  },
  methods: {
    async onSubmit () {
      this.loading = true
      try {
        // 1. 表单验证
        await (this.$refs.form as Form).validate()
        // 2. 验证通过 => 提交表单
        const { data } = await login(this.form)
        console.log(data)
        // 3. 处理请求结果
        //    失败 => 提示
        if (data.state !== 1) {
          return this.$message.error(data.message)
        }
        this.$store.commit('setUser', data.content)
        //    成功 => 跳转首页
        this.$message.success('登录成功')
        await this.$router.push(this.$route.query.redirect || '/')
      } catch (e) {
        console.log('登录失败', e)
      } finally {
        this.loading = false
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.login {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  .login-form {
    width: 300px;
    background-color: #fff;
    padding: 20px 30px;
    border-radius: 5px;

    .login-btn {
      width: 100%;
    }
  }
}

</style>
