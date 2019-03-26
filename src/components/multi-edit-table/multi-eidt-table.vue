<template>
  <div>
    <Table :columns="insideColumns" :data="value" border></Table>
  </div>
</template>

<script>
import clonedeep from 'clonedeep'
export default {
  name: 'multiEditTable',
  data () {
    return {
      insideColumns: [],
      insideData: [],
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
    },
    value () {
      this.handleColumns()
    }
  },
  mounted () {
    this.handleColumns()
  },
  methods: {
    handleColumns () {
      this.insideData = clonedeep(this.value)
      const insideColumns = this.columns.map(item => {
        // 没有render函数且是可编辑项
        if (!item.render && item.editable) {
          item.render = (h, { row, index, column }) => {
            const keyArr = this.insideData[index] ? this.insideData[index].edittingKeyArr : []
            return (
              <div>
                {keyArr && keyArr.indexOf(column.key) > -1
                  ? <i-input value={row[column.key]} style="width: 50px;" on-input={this.handleInput.bind(this, row, index, column)}></i-input>
                  : <span>{row[column.key]}</span>}

                {keyArr && keyArr.indexOf(column.key) > -1
                  ? <icon type="ios-checkmark" size="20" color="#2d5db5" on-click={this.handleClick.bind(this, { row, index, column })}/>
                  : <icon size="20" color="#2d5db5" type="ios-create-outline" on-click={this.handleClick.bind(this, { row, index, column })}/>}
              </div>
            )
          }
          return item
        } else return item
      })
      this.insideColumns = insideColumns
    },
    handleInput (row, index, column, newValue) {
      this.insideData[index][column.key] = newValue
    },
    handleClick ({ row, index, column }) {
      let keyIndex = this.insideData[index].edittingKeyArr ? this.insideData[index].edittingKeyArr.indexOf(column.key) : -1
      let rowObj = this.insideData[index]
      if (keyIndex > -1) {
        rowObj.edittingKeyArr.splice(keyIndex, 1)
        this.insideData.splice(index, 1, rowObj)
        console.log(this.insideData)
        this.$emit('input', this.insideData)
        this.$emit('on-edit', { row, index, column, newValue: this.insideData[index][column.key] })
      } else {
        rowObj.edittingKeyArr = (row.edittingKeyArr) ? [...rowObj.edittingKeyArr, column.key] : [column.key]
        this.insideData.splice(index, 1, rowObj)
      }
    }
  }
}
</script>

<style scoped>

</style>
