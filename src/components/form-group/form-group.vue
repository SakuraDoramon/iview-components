<template>
  <Form ref="form" v-if="Object.keys(valueList).length" :label-width="labelWidth" :model="valueList" :rules="rules">
    <FormItem
      v-for="(item, index) in list"
      :label="item.label"
      :prop="item.name"
      :error="errorStore[item.name]"
      label-position="left"
      :key="`${_uid}_${index}`"
      @click.native="handleClick(item.name)"
    >
      <component :is="item.type" :range="item.range" v-model="valueList[item.name]">
        <template v-if="item.children">
          <component
            v-for="(child, i) in item.children.list"
            :is="item.children.type"
            :key="`${_uid}_${index}_${i}`"
            :lable="child.label"
            :value="child.value"
          >{{ child.title }}</component>
        </template>
      </component>
    </FormItem>
    <FormItem>
      <Button @click="handleSubmit" type="primary">提交</Button>
      <Button @click="handleReset">重置</Button>
    </FormItem>
  </Form>
</template>

<script>
import clonedeep from 'clonedeep'
export default {
  name: 'FormGroup',
  data () {
    return {
      initValueList: [],
      valueList: {},
      rules: {},
      errorStore: {}
    }
  },
  props: {
    list: {
      type: Array,
      default: () => []
    },
    labelWidth: {
      type: Number,
      default: 100
    }
  },
  watch: {
    list () {
      this.setInitValue()
    }
  },
  mounted () {
    this.setInitValue()
  },
  methods: {
    setInitValue () {
      let rules = {}
      let valueList = {}
      let initValueList = []
      let errorStore = {}
      this.list.forEach(n => {
        rules[n.name] = n.rule
        valueList[n.name] = n.value
        initValueList[n.name] = n.value
        errorStore[n.name] = ''
      })
      this.rules = rules
      this.valueList = valueList
      this.initValueList = initValueList
      this.errorStore = errorStore
    },
    handleSubmit () {
      this.$refs.form.validate(valid => {
        if (valid) {
          // 如果请求成功
          this.$emit('on-submit-success', valid)
          // 如果请求失败
          // this.$emit('on-submit-error', err)
          // for (const key in err) {
          //   this.errorStore[key] = err[key]
          // }
        }
      })
    },
    handleReset () {
      this.valueList = clonedeep(this.initValueList)
    },
    handleClick (name) {
      this.errorStore[name] = ''
    }
  }
}
</script>

<style scoped>

</style>
