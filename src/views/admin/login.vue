<template>
  <div class="login-container">
    <div class="login-bg-deco"></div>
    <div class="login-box">
      <h2 class="login-title">云南省GDP可视化系统</h2>
      <p class="login-subtitle">后台管理</p>
      <el-form :model="loginForm" :rules="loginRules" ref="loginFormRef" class="login-form">
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" placeholder="用户名" prefix-icon="el-icon-user"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" type="password" placeholder="密码"
            prefix-icon="el-icon-lock" @keyup.enter.native="handleLogin"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleLogin" :loading="loading" class="login-btn">登录</el-button>
        </el-form-item>
      </el-form>
      <div class="login-tip">
        <p>默认账号: admin / admin123</p>
        <p><a href="#/" class="back-link">返回可视化大屏</a></p>
      </div>
    </div>
  </div>
</template>
<script>
import { adminLogin } from '@/api/modules'
export default {
  name: 'AdminLogin',
  data() {
    return {
      loginForm: { username: '', password: '' },
      loginRules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      },
      loading: false
    }
  },
  methods: {
    handleLogin() {
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) return;
        this.loading = true;
        try {
          const res = await adminLogin(this.loginForm);
          if (res.success) {
            localStorage.setItem('adminToken', res.data.token);
            localStorage.setItem('adminUser', JSON.stringify(res.data.user || {}));
            this.$router.push('/admin/dashboard');
          } else {
            this.$message.error(res.msg || '登录失败');
          }
        } catch (e) {
          this.$message.error('登录请求失败');
        } finally { this.loading = false; }
      });
    }
  }
}
</script>
<style scoped>
.login-container {
  min-height: 100vh; background: var(--admin-login-bg);
  display: flex; align-items: center; justify-content: center;
  position: relative; overflow: hidden;
}
.login-bg-deco {
  position: absolute; top: 0; left: 0; right: 0; height: 400px;
  background: radial-gradient(ellipse at 50% 0%, rgba(59,130,246,0.08) 0%, transparent 70%);
}
.login-box {
  width: 400px; background: var(--admin-login-card-bg);
  border: 1px solid var(--color-hairline);
  border-radius: var(--radius-lg);
  padding: 48px var(--spacing-xl) var(--spacing-xl);
  box-shadow: var(--shadow-elevated);
  position: relative; z-index: 1;
}
.login-title {
  text-align: center; font-size: 24px; font-weight: var(--font-weight-display);
  background: var(--color-primary-gradient); -webkit-background-clip: text;
  background-clip: text; -webkit-text-fill-color: transparent; margin-bottom: 4px;
}
.login-subtitle {
  text-align: center; color: var(--color-on-canvas-dim); font-size: var(--font-body);
  margin-bottom: var(--spacing-xl);
}
.login-form { margin-top: var(--spacing-md); }
.login-btn { width: 100%; }
.login-tip { text-align: center; margin-top: var(--spacing-lg); color: var(--color-on-canvas-mute); font-size: var(--font-caption); }
.login-tip p { margin: 4px 0; }
.back-link { color: var(--color-primary-soft); }
</style>
