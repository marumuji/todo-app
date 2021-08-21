import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: () => ({
      todos: [
        { content: 'hogehoge', created: '2019-03-31 15:30', state: '作業前' },
        { content: 'fugafuga', created: '2019-03-31 16:00', state: '作業中' }
      ],
      options: [
        { id: 0, label: '作業前' },
        { id: 1, label: '作業中' },
        { id: 2, label: '完了' }
      ]
    }),
    mutations: {
      insert (state, obj) {
        const d = new Date()
        const fmt = d.getFullYear() +
                            '-' + ('00' + (d.getMonth() + 1)).slice(-2) +
                            '-' + ('00' + d.getDate()).slice(-2) +
                            ' ' + ('00' + d.getHours()).slice(-2) +
                            ':' + ('00' + d.getMinutes()).slice(-2)
        state.todos.unshift({
          content: obj.content,
          created: fmt,
          state: '作業前'
        })
      },
      remove (state, obj) {
        for (let i = 0; i < state.todos.length; i++) {
          const ob = state.todos[i]
          if (ob.content === obj.content && ob.created === obj.created) {
            alert('remove ' + '"' + ob.content + '"')
            state.todos.splice(i, 1)
            return
          }
        }
      },
      changeState (state, obj) {
        for (let i = 0; i < state.todos.length; i++) {
          const ob = state.todos[i]
          if (ob.content === obj.content && ob.created === obj.created && ob.state === obj.state) {
            let nowState
            for (let j = 0; j < state.options.length; j++) {
              if (state.options[j].label === ob.state) {
                nowState = state.options[j].id
              }
            }
            nowState = (nowState + 1) % state.options.length
            obj.state = state.options[nowState].label
            return
          }
        }
      }
    }
  })
}

export default createStore
