<template>
  <div>
    <el-row>
      Columns
      <ul style="list-style-type: none;">
        <li v-for="(col, index) in columns" :key="index" style="float:left; min-width: 20px; font-face:bold; text-align: center; padding:5px; margin:10px;">
          {{ col.label }}
        </li>
      </ul>
    </el-row>
    <el-row>
      <el-form ref="form" :model="form" label-position="top" size="small" :rules="rules">
        <el-form-item label="New Colum Name" prop="newColName">
          <el-input v-model="form.newColName" placeholder="New Column Name" />
        </el-form-item>
        <el-form-item label="Formula" prop="formula">
          <el-input v-model="form.formula" placeholder="Create Foumula. Eg: A+B" />
          <em>*Allowed operators: <strong>+  -  *  / </strong></em>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="save()">Save</el-button>
          <el-button @click="close()">Cancel</el-button>
        </el-form-item>
      </el-form>
    </el-row>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data() {
    const self = this
    const validateFormula = function(rule, value, callback) {
      console.log('params', rule, value, callback)
      if (!value || value.length === 0) {
        callback(new Error('Formula is required'))
      }
      const valueArr = value.split('')
      const cols = valueArr.filter((e, i) => { if (i % 2 === 0) return e })
      const ops = valueArr.filter((e, i) => { if (i % 2 !== 0) return e })

      let validOps = true
      for (let i = 0; i < ops.length; i++) {
        if (!self.refOps.includes(ops[i])) {
          validOps = false
          break
        }
      }
      if (!validOps) { callback(new Error('Formula is invalid. Check column names/ops')) }
      const refCols = self.columns.map(c => c.label)

      let validCols = true
      for (let i = 0; i < cols.length; i++) {
        if (!refCols.includes(cols[i])) {
          validCols = false
          break
        }
      }
      if (!validCols) { callback(new Error('Formula is invalid. Check column names/ops')) }
      if (self.refOps.includes(valueArr[valueArr.length - 1])) {
        callback(new Error('Formula is invalid. Cant end with operation'))
      }

      const evalExpression = valueArr.map(v => {
        if (self.refOps.includes(v)) {
          return v
        } else {
          return `item.${v}`
        }
      }).join('')
      self.evalExpression = evalExpression

      callback()
    }
    return {
      refOps: ['+', '-', '*', '/'],
      //   refCols: this.columns.map(c => c.label),
      evalExpression: '',
      form: {
        newColName: '',
        formulaType: 'Row',
        cols: [],
        formula: ''
      },
      rules: {
        newColName: [
          { required: true, message: 'Column Name is required', trigger: 'blur' }
        ],
        formula: [
          { validator: validateFormula, trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters(['columns'])
  },
  methods: {
    ...mapActions['addColumn'],
    save() {
      const self = this
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$store.dispatch('data/addColumn', { label: self.form.newColName, type: 'derivative', evalExpression: self.evalExpression })
          this.$emit('close')
          this.$refs.form.resetFields()
        } else {
          return false
        }
      })
    },
    close() {
      this.$emit('close')
      this.$refs.form.resetFields()
    }
  }
}
</script>

<style>

</style>
