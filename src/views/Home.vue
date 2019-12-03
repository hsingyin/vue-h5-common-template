<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/images/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <mt-button type="primary" size="small" @click="testVuex">{{ btnText }}</mt-button>
    <mt-button type="danger" size="small" @click="testClearVuex">{{ cancelText }}</mt-button>
    <mt-button type="default" size="small">{{ token || 'null' }}</mt-button>
    <mt-button type="primary" size="small" @click="getList">测试请求</mt-button>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import { mapGetters } from 'vuex'
export default {
  name: 'home',
  components: {
    HelloWorld
  },
  data() {
    return {
      btnText: 'commit',
      cancelText: '清除vuex'
    }
  },
  computed: {
    ...mapGetters({
      token: 'token'
    })
  },
  created() {},
  methods: {
    testVuex() {
      console.log('commit')
      this.$store.commit('setToken', '123456')
      this.$toast('操作成功，F12查看持久化数据')
    },
    testClearVuex() {
      this.$store.commit('setToken', '')
    },
    getList() {
      this.$http.login().then(res => {
        console.log('res')
      })
    }
  }
}
</script>
