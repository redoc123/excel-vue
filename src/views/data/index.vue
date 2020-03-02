<template>
  <div>
    <el-row type="flex" align="middle" justify="center">
      <el-col :span="12">
        <h2>Data</h2>
      </el-col>
      <el-col :span="12">
        <el-button type="primary" icon="el-icon-plus" size="mini" @click="newDialogue=true">New</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-table :data="data" border stripe>
        <el-table-column
          v-for="(col, index) in columns"
          :key="index"
          :label="col.label"
        >
          <template slot-scope="scope">{{ scope.row[col.label] }}</template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-dialog
      title="New Column"
      :visible.sync="newDialogue"
      width="50%"
    >
      <New @close="newDialogue = false" />
    </el-dialog>

  </div>
</template>

<script>
import New from './new'
import { mapGetters } from 'vuex'
export default {
  name: 'DataGrid',
  components: { New },
  data() {
    return {
      title: 'data',
      newDialogue: false
    }
  },
  computed: {
    ...mapGetters(['columns', 'data'])
  }
}
</script>

<style>

</style>
