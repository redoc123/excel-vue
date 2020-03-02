<template>
  <div>
    <el-row>
      <em style="color:red">** This is incompete! Idea is to make the formulas available for data</em>
    </el-row>

    <el-row type="flex" align="middle" justify="center">
      <el-col :span="12">
        <h2>Formulas</h2>
      </el-col>
      <el-col :span="12">
        <el-button type="primary" icon="el-icon-plus" size="mini" @click="newDialogue=true">New</el-button>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12" class="ref-values">
        <h3 class="label">A: </h3>
        <el-input v-model="valA" placeholder="A" class="input" />
      </el-col>
      <el-col :span="12" class="ref-values">
        <h3 class="label">B: </h3>
        <el-input v-model="valB" placeholder="B" class="input" />
      </el-col>
    </el-row>

    <el-row>
      <el-table :data="formulas" border stripe>
        <el-table-column
          prop="name"
          label="Name"
          width="180"
        />
        <el-table-column
          prop="formula"
          label="Formula"
          width="180"
        />
        <el-table-column
          prop="type"
          label="Type"
          width="180"
        />
        <el-table-column
          label="Example"
        >
          <template slot-scope="scope">{{ scope.row.example }} = {{ evaluate(scope.row) }}</template>
        </el-table-column>
      </el-table>

    </el-row>
    <el-dialog
      title="New Formula"
      :visible.sync="newDialogue"
      width="40%"
      @close="newDialogue=false"
    >
      <New />

    </el-dialog>

  </div>
</template>

<script>
import New from './new'
export default {
  components: { New },
  data() {
    return {
      valA: 10,
      valB: 10,
      newDialogue: false,
      formulas: [
        { name: 'Add', formula: '+', type: 'Arithemeric', example: 'a+b' },
        { name: 'Subtract', formula: '-', type: 'Arithemeric', example: 'a-b' },
        { name: 'Devide', formula: '/', type: 'Arithemeric', example: 'a/b' },
        { name: 'Multiply', formula: '*', type: 'Arithemeric', example: 'a*b' }
      ]
    }
  },
  methods: {
    evaluate: function(row) {
      let val = -1
      try {
        val = eval(`${this.valA}${row.formula}${this.valB}`)
      } catch (error) {
        val = `cant be evaluated`
      }
      return val
    }
  }
}
</script>

<style scoped lang="scss">
  .ref-values{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin: 20px 0px;
    .input{
      width: 50% ;
      margin-left: 20px !important;

    }
    .label {
      color: grey;
    }
  }
</style>
