<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png">, -->
    <section>
      <h1>可编辑表格-单个单元格编辑</h1>
      <edit-table :columns="columns" v-model="tabeData" @on-edit="handleEdit"></edit-table>

      <h1>可编辑表格-多个单元格编辑</h1>
      <multi-edit-table :columns="multiColumns" v-model="multiTabeData" @on-edit="handleMultiEdit"></multi-edit-table>
    </section>
  </div>
</template>

<script>
import EditTable from '../components/edit-table'
import multiEditTable from '../components/multi-edit-table'
export default {
  name: 'home',
  components: {
    EditTable,
    multiEditTable
  },
  data () {
    return {
      columns: [
        {
          key: 'name',
          title: '姓名'
        },
        {
          key: 'age',
          title: '年龄',
          editable: true
        },
        {
          key: 'email',
          title: '邮箱',
          editable: true
        }
      ],
      tabeData: [
        {
          name: '潇潇',
          age: '18',
          email: '116079@qq.com'
        },
        {
          name: '西青',
          age: '19',
          email: '299999@qq.com'
        },
        {
          name: '许建',
          age: '22',
          email: '978999@qq.com'
        },
        {
          name: '李鹏程',
          age: '88',
          email: '122333@qq.com'
        },
        {
          name: '曾志聪',
          age: '8',
          email: '578900@qq.com'
        }
      ],
      multiColumns: [
        {
          key: 'name',
          title: '姓名'
        },
        {
          key: 'age',
          title: '年龄',
          editable: true
        },
        {
          key: 'email',
          title: '邮箱',
          editable: true
        }
      ],
      multiTabeData: [
        {
          name: '潇潇',
          age: '18',
          email: '116079@qq.com'
        },
        {
          name: '西青',
          age: '19',
          email: '299999@qq.com'
        },
        {
          name: '许建',
          age: '22',
          email: '978999@qq.com'
        },
        {
          name: '李鹏程',
          age: '88',
          email: '122333@qq.com'
        },
        {
          name: '曾志聪',
          age: '8',
          email: '578900@qq.com'
        }
      ]
    }
  },
  methods: {
    handleEdit ({ row, index, column, newValue }) {
      console.log(row, index, column, newValue)
    },
    handleMultiEdit ({ row, index, column, newValue }) {
      console.log(row, index, column, newValue)
    }
  }
}
</script>

<style lang="less">
.home {
  padding: 0 60px;
  h1 {
    line-height: 3.0;
  }
}
</style>
