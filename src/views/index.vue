<template>
  <a-card>
    <div class="sunAnimation">
      <div class="sun" />
      <div class="text"><h1 class="h1">欢迎使用</h1></div>
      <div class="text">{{ showedTime }}</div>
    </div>
  </a-card>
</template>

<script>
import moment from 'moment'
export default {
  name: 'HomePage',
  data() {
    return {
      flag: null, // 定时器
      time: moment().unix(),
    }
  },
  methods: {
    start() {
      this.flag = setInterval(() => {
        this.time = this.time + 1
      }, 1000)
    },
    end() {
      clearInterval(this.flag)
    },
  },
  computed: {
    showedTime() {
      return moment(this.time * 1000).format('YYYY-MM-DD HH:mm:ss')
    },
  },
  mounted() {
    this.start()
  },
  beforeDestroy() {
    this.end()
  },
}
</script>

<style scoped>
.sunAnimation {
  width: 100%;
  height: 450px;
  padding: 50px;
  background-image: linear-gradient(to right, #4facfe 0%, #00f2fe 100%);
}
.sun {
  position: relative;
  width: 150px;
  height: 150px;
}
.sun::before {
  position: absolute;
  top: 75px;
  left: 75px;
  width: 75px;
  height: 75px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  animation: sun 2s infinite;
  content: '';
}
.sun::after {
  position: absolute;
  top: 75px;
  left: 75px;
  width: 120px;
  height: 120px;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  animation: sun 2s infinite;
  content: '';
}
@keyframes sun {
  0%,
  100% {
    box-shadow: 0 0 5px rgba(255, 255, 255, 0.7);
    transform: translate(-50%, -50%) scale(1);
  }
  50% {
    box-shadow: 0 0 30px rgba(255, 255, 255, 0.5);
    transform: translate(-50%, -50%) scale(1.1);
  }
}

.text {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  height: 50px;
  margin-top: 50px;
}
.h1 {
  color: white;
  font-size: 32px;
  font-style: italic;
  text-align: center;
}
</style>
