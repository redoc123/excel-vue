<template>
  <div>
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="Name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="Accumulator">
        <el-select v-model="form.accumulator" placeholder="Accumulator" style="width:100%">
          <el-option
            v-for="(item, index) in accumulatorTypes"
            :key="index"
            :label="item.key"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="Reducer">
        <el-input v-model="form.formula" type="textarea" :rows="2" placeholder="Reducer Function. eg: (accumulator, item, op) => {return eval(`${accumulator}${op}${item}`);}" />
      </el-form-item>
      <el-form-item label="Example">
        <el-input v-model="form.example" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Create</el-button>
        <el-button>Cancel</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
export default {
  data() {
    return {
      accumulatorTypes: [{ val: 0, key: '0 - For Sum/Diff' }, { val: 1, key: '1 - For Multiply / Divide' }],

      form: {
        name: '',
        accumulator: '',
        reducer: '',
        example: ''
      }
    }
  },
  methods: {
    onSubmit() {
      // alert('done')
      this.$$emit('close')
    },
    closeDialoague() {
      this.$emit('close')
    }
  }
}
</script>

<style>

</style>
