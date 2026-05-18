<template>
    <transition name="yh-setting-fade">
        <div class="setting" :class="{ settingShow: settingShow }" v-show="settingShow">
            <div class="setting_dislog" @click="settingShow = false">

            </div>
            <div class="setting_inner">
                <div class="setting_header">
                    设置
                </div>
                <div class="setting_body">
                    <!-- <div class="left_shu"> 实时监测</div> -->
                    <div class="left_shu"> 全局设置</div> 
                      <div class="setting_item">
                        <span class="setting_label">
                            是否进行自动适配<span class="setting_label_tip">(默认分辨率1920*1080)</span>: 
                        </span>
                        <div class="setting_content">
                            <el-radio-group v-model="isScaleradio" @change="(val) => radiochange(val, 'isScale')">
                                <el-radio :label="true">是</el-radio>
                                <el-radio :label="false">否</el-radio>
                            </el-radio-group>

                        </div>
                    </div>
<!--                    <div class="left_shu"> 实时监测</div>-->
<!--                    <div class="setting_item">-->
<!--                        <span class="setting_label">-->
<!--                            设备提醒自动轮询: <span class="setting_label_tip"></span>-->
<!--                        </span>-->
<!--                        <div class="setting_content">-->
<!--                            <el-radio-group v-model="sbtxradio" @change="(val) => radiochange(val, 'sbtxSwiper')">-->
<!--                                <el-radio :label="true">是</el-radio>-->
<!--                                <el-radio :label="false">否</el-radio>-->
<!--                            </el-radio-group>-->

<!--                        </div>-->
<!--                    </div>-->
<!--                    <div class="setting_item">-->
<!--                        <span class="setting_label">-->
<!--                            实时预警轮播:-->
<!--                        </span>-->
<!--                        <div class="setting_content">-->
<!--                            <el-radio-group v-model="ssyjradio" @change="(val) => radiochange(val, 'ssyjSwiper')">-->
<!--                                <el-radio :label="true">是</el-radio>-->
<!--                                <el-radio :label="false">否</el-radio>-->
<!--                            </el-radio-group>-->
<!--                        </div>-->
<!--                    </div>-->
                    <div class="flex justify-center">
                        <!-- <el-button type="primary" round size="mini">确定</el-button> -->
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>

export default {
    components: {},
    data() {
        return {
            settingShow: false,
            sbtxradio:true,
            ssyjradio: true,
            isScaleradio:true,
        };
    },
    computed: {},
    methods: {
        init() {
            this.settingShow = true
        },
        radiochange(val, type) {
            this.$store.commit('setting/updateSwiper', { val, type })
            if(type==='isScale'){
                // this.$router.go(0)
                // location.reload()
                // window.location.href=window.location.href+"?t="+Date.now()
            }
        },
    },
    created() {
        this.$store.commit('setting/initSwipers')
        this.sbtxradio = this.$store.state.setting.sbtxSwiper,
        this.ssyjradio = this.$store.state.setting.ssyjSwiper,
        this.isScaleradio = this.$store.state.setting.isScale;
    },
    mounted() {
        document.body.appendChild(this.$el);
    },
    beforeDestroy() {
    },
    destroyed() {
        if (this.$el && this.$el.parentNode) {
            this.$el.parentNode.removeChild(this.$el);
        }
    }
}
</script>

<style lang='scss' scoped>
.setting {
  position: fixed; top: 0; left: 0; right: 0; bottom: 0; z-index: 9999;
}
.setting_dislog {
  position: absolute; top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.6);
}
.setting_inner {
  position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
  width: 480px; background: var(--color-surface); border: 1px solid var(--color-hairline);
  border-radius: var(--radius-lg); box-shadow: var(--shadow-elevated);
}
.setting_header {
  padding: 16px 24px; font-size: var(--font-display-lg); font-weight: var(--font-weight-heading);
  color: var(--color-on-canvas); border-bottom: 1px solid var(--color-hairline);
}
.setting_body {
  padding: 20px 24px;
}
.setting_item {
  margin-bottom: var(--spacing-md);
  display: flex; align-items: center; justify-content: space-between;
}
.left_shu {
  color: var(--color-accent-cyan); font-size: var(--font-body); font-weight: var(--font-weight-heading);
  margin-bottom: var(--spacing-md); padding-left: 8px;
  border-left: 2px solid var(--color-accent-cyan);
}
.setting_label {
  color: var(--color-on-canvas-mute); font-size: var(--font-body);
}
.setting_label_tip {
  color: var(--color-on-canvas-dim); font-size: var(--font-caption);
}
.yh-setting-fade-enter-active, .yh-setting-fade-leave-active {
  transition: opacity 0.3s ease;
}
.yh-setting-fade-enter, .yh-setting-fade-leave-to {
  opacity: 0;
}
:deep(.el-radio__label) { color: var(--color-on-canvas-mute); }
:deep(.el-radio__input.is-checked + .el-radio__label) { color: var(--color-accent-cyan); }
</style>