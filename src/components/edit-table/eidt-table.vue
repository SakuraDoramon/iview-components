<template>
  <div>
    <Table :columns="insideColumns" :data="value" border></Table>
  </div>
</template>

<script>
import clonedeep from 'clonedeep'
export default {
  name: 'EditTable',
  data () {
    return {
      insideColumns: [],
      editingId: '',
      editingContent: ''
    }
  },
  props: {
    columns: {
      type: Array,
      default: () => []
    },
    value: {
      type: Array,
      default: () => []
    }
  },
  watch: {
    columns () {
      this.handleColumns()
    }
  },
  mounted () {
    this.handleColumns()
  },
  methods: {
    handleColumns () {
      const insideColumns = this.columns.map(item => {
        // 没有render函数且是可编辑项
        if (!item.render && item.editable) {
          item.render = (h, { row, index, column }) => {
            const isEditting = this.editingId === `${column.key}_${index}`
            return (
              <div>
                {isEditting ? <i-input value={row[column.key]} style="width: 50px;" on-input={this.handleInput}></i-input> : <span>{row[column.key]}</span>}
                {isEditting ? <icon type="ios-checkmark" size="20" color="#2d5db5" on-click={this.handleClick.bind(this, { row, index, column })}/> : <icon size="20" color="#2d5db5" type="ios-create-outline" on-click={this.handleClick.bind(this, { row, index, column })}/>}
              </div>
            )
          }
          return item
        } else return item
      })
      this.insideColumns = insideColumns
    },
    handleInput (newValue) {
      this.editingContent = newValue
    },
    handleClick ({ row, index, column }) {
      if (this.editingId === `${column.key}_${index}`) {
        // 深度拷贝
        let tableData = clonedeep(this.value)
        // 防止点击编辑后没有编辑，导致数据丢失
        this.editingContent = this.editingContent ? this.editingContent : tableData[index][column.key]
        // 给tabledata的编辑项赋值
        tableData[index][column.key] = this.editingContent
        this.$emit('input', tableData)
        this.$emit('on-edit', { row, index, column, newValue: this.editingContent })
        // 用后既焚，为了下次编辑使用
        this.editingId = ''
        this.editingContent = ''
      } else {
        this.editingId = `${column.key}_${index}`
      }
    }
  }
}
</script>

<style scoped>

</style>
