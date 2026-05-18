<!--
 * @Author: daidai
 * @Date: 2022-02-28 16:16:42
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-08-07 17:12:07
 * @FilePath: \web-pc\src\pages\big-screen\view\indexs\left-top.vue
-->
<template>
    <ul class="user_Overview flex" v-if="pageflag">
        <li class="user_Overview-item card-gdp">
            <div class="card-ring">
                <dv-digital-flop :config="config" style="width:100%;height:100%;" />
            </div>
            <p>GDP</p>
        </li>
        <li class="user_Overview-item card-primary">
            <div class="card-ring">
                <dv-digital-flop :config="onlineconfig" style="width:100%;height:100%;" />
            </div>
            <p>第一产业</p>
        </li>
        <li class="user_Overview-item card-secondary">
            <div class="card-ring">
                <dv-digital-flop :config="offlineconfig" style="width:100%;height:100%;" />
            </div>
            <p>第二产业</p>
        </li>
        <li class="user_Overview-item card-tertiary">
            <div class="card-ring">
                <dv-digital-flop :config="laramnumconfig" style="width:100%;height:100%;" />
            </div>
            <p>第三产业</p>
        </li>
    </ul>
    <Reacquire v-else @onclick="getData" line-height="200px">
        重新获取
    </Reacquire>
</template>

<script>
import { currentGET } from '@/api/modules'
let style = {
    fontSize: 20,
}
export default {
    data() {
        return {
            options: {},
            userOverview: {
                alarmNum: 0,
                offlineNum: 0,
                onlineNum: 0,
                totalNum: 0,
            },
            pageflag: true,
            timer: null,
            config: {
                number: [100],
                content: '{nt}',
                style: { ...style, fill: "#00eaff" },
            },
            onlineconfig: {
                number: [0],
                content: '{nt}',
                style: { ...style, fill: "#10b981" },
            },
            offlineconfig: {
                number: [0],
                content: '{nt}',
                style: { ...style, fill: "#f59e0b" },
            },
            laramnumconfig: {
                number: [0],
                content: '{nt}',
                style: { ...style, fill: "#f43f5e" },
            }

        };
    },
    filters: {
        numsFilter(msg) {
            return msg || 0;
        },
    },
    created() {
        this.getData()
    },
    mounted() {
    },
    beforeDestroy() {
        this.clearData()
    },
    methods: {
        clearData() {
            if (this.timer) {
                clearInterval(this.timer)
                this.timer = null
            }
        },
        getData() {
            this.pageflag = true;
            currentGET("big2").then((res) => {
                if (!this.timer) {
                }
                if (res.success) {
                    this.userOverview = res.data;
                    this.onlineconfig = {
                        ...this.onlineconfig,
                        number: [res.data[0].primaryIndustry]
                    }
                    this.config = {
                        ...this.config,
                        number: [res.data[0].regionalGdp]
                    }
                    this.offlineconfig = {
                        ...this.offlineconfig,
                        number: [res.data[0].secondaryIndustry]
                    }
                    this.laramnumconfig = {
                        ...this.laramnumconfig,
                        number: [res.data[0].tertiaryIndustry]
                    }
                } else {
                    this.pageflag = false;
                    this.$Message.warning(res.msg);
                }
            });
        },
    },
};
</script>
<style lang='scss' scoped>
.user_Overview {
    li {
        flex: 1;

        p {
            text-align: center;
            height: 16px;
            font-size: var(--font-body);
            color: var(--color-on-canvas-mute);
            margin-top: var(--spacing-md);
        }

        .card-ring {
            width: 100px;
            height: 100px;
            text-align: center;
            line-height: 100px;
            margin: 40px auto 0;
            position: relative;
            border-radius: var(--radius-pill);
        }
    }
}

.card-gdp .card-ring {
    background: var(--color-surface-elevated);
    box-shadow: 0 0 20px rgba(0,234,255,0.12), inset 0 0 20px rgba(0,234,255,0.05);
    border: 1px solid var(--color-hairline-glow);
}

.card-primary .card-ring {
    background: var(--color-surface-elevated);
    box-shadow: 0 0 20px rgba(16,185,129,0.12), inset 0 0 20px rgba(16,185,129,0.05);
    border: 1px solid rgba(16,185,129,0.2);
}

.card-secondary .card-ring {
    background: var(--color-surface-elevated);
    box-shadow: 0 0 20px rgba(245,158,11,0.12), inset 0 0 20px rgba(245,158,11,0.05);
    border: 1px solid rgba(245,158,11,0.2);
}

.card-tertiary .card-ring {
    background: var(--color-surface-elevated);
    box-shadow: 0 0 20px rgba(244,62,94,0.12), inset 0 0 20px rgba(244,62,94,0.05);
    border: 1px solid rgba(244,62,94,0.2);
}
</style>
