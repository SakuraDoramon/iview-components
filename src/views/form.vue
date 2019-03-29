<template>
  <div class="form-container">
    <form-group :list=formList @on-submit-success="onSubmitSuccess"></form-group>
  </div>
</template>

<script>
import FormGroup from '@/components/form-group'
export default {
  components: {
    FormGroup
  },
  data () {
    return {
      formList: [
        {
          name: 'name',
          type: 'i-input',
          value: '',
          label: '姓名',
          rule: [
            { required: true, message: 'The name cannot be empty', trigger: 'blur' }
          ]
        },
        {
          name: 'range',
          type: 'slider',
          value: [10, 40],
          range: true,
          label: '范围'
        },
        {
          name: 'sex',
          type: 'i-select',
          value: '',
          label: '性别',
          children: {
            type: 'i-option',
            list: [
              { value: 1, title: '本科' },
              { value: 2, title: '研究生' },
              { value: 3, title: '博士' }
            ]
          }
        },
        {
          name: 'education',
          type: 'radio-group',
          value: '',
          label: '学历',
          children: {
            type: 'radio',
            list: [
              { label: 1, title: '本科' },
              { label: 2, title: '研究生' },
              { label: 3, title: '博士' }
            ]
          }
        },
        {
          name: 'skill',
          type: 'checkbox-group',
          value: [],
          label: '技能',
          children: {
            type: 'checkbox',
            list: [
              { label: 1, title: 'Vue' },
              { label: 2, title: 'Nodejs' },
              { label: 3, title: 'Ts' }
            ]
          }
        },
        {
          name: 'inWork',
          type: 'i-switch',
          value: true,
          label: '在职'
        }
      ]
    }
  },
  methods: {
    onSubmitSuccess (response) {
      console.log(response, 'response')
    }
  }
}
</script>

<style scoped>
.form-container {
  padding-top: 50px;
  width: 50%;
  text-align: left;
}
</style>
