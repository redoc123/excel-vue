const state = {
  columns: [
    { label: 'A', type: 'numeric' },
    { label: 'B', type: 'numeric' }
  ],
  // NOTE: Pull from DB.
  data: [
    { A: 1, B: 10 },
    { A: 2, B: 4 },
    { A: 3, B: 3 },
    { A: 4, B: 2 },
    { A: 5, B: 6 },
    { A: 6, B: 4 },
    { A: 7, B: 5 },
    { A: 8, B: 3 },
    { A: 9, B: 6 },
    { A: 10, B: 1 }]
}

const mutations = {
  ADD_COLUMN: (state, column) => {
    state.columns.push(column)
    // NOTE: this works only if this field is persistant. Else do it in component for display purposes
    state.data.forEach(item => {
      item[column.label] = eval(column.evalExpression)
    })
  }
}

const actions = {
  addColumn({ commit }, column) {
    commit('ADD_COLUMN', column)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

